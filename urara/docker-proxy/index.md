---
title: '通过 Docker 搭建 NaiveProxy + Hysteria 代理'
created: 2021-07-13 01:11:11
updated: 2022-04-20
tags:
  - NaiveProxy
  - Hysteria
  - Docker
summary: 去年年底买的 Virmach 水牛城 VPS，最近我终于想起来还有这么个东西闲置着；于是就有了这篇文章。
---

去年年底买的 Virmach 水牛城 VPS，最近我终于想起来还有这么个东西闲置着；于是就有了这篇文章。
本文假定读者已经有一定 Linux 使用经验。

## 准备工作

一个 VPS 和一个设置好解析的域名。
正如标题，代理都通过 Docker 容器搭建，所以搭建之前的步骤都是可选的（但我强烈推荐）。

### Debian sid

谁能拒绝在 VPS 上一个滚动更新，软件包版本接近 Arch 的 Debian 呢？

在 Debian bullseye(11) 的基础上升级，更旧的版本最好先升级到 bullseye。

```bash
apt update && apt upgrade
nano /etc/apt/sources.list
```

**删干净**。然后加一行：

```text
deb http://deb.debian.org/debian unstable main contrib non-free
```

为什么只需要一行？

- deb-src 是源代码存储库——除非你想用 Debtoo，所以不需要。
- sid/unstable 只有软件包维护者的安全更新，所以也不需要。
- 由于 sid 是滚动更新，自然也不存在什么 sid-backports, sid-update... 还是不需要。

再运行一次 `apt update && apt upgrade`，准备装 cloud 内核。

#### Linux Cloud

alpine 我用 `linux-virt`，debian 就用 `linux-image-cloud`。

一条命令安装并删除旧内核：`apt install linux-image-cloud-amd64 && apt autoremove`

`reboot` 重连后就是 sid + cloud 了。

### UFW

我很喜欢的一个防火墙工具，因为简单；
没有其他服务的话，只需要放行 SSH / HTTPS 端口。

```bash
apt install ufw
ufw limit ssh
ufw allow https
ufw enable # y 回车确认
```

## 搭建

首先安装 docker... podman / containerd 应该也行，但我没试过。

### Docker

都上 sid 了，当然是直接 apt 安装。

```bash
apt install docker.io
```

### NaiveProxy

先创建一个配置文件，使用你的参数替换掉 `{{注释}}` 的值并去掉 `#注释`：

```bash
mkdir /etc/caddy && nano /etc/caddy/Caddyfile
```

```ini filename="/etc/caddy/Caddyfile"
{ # 如果不打算使用 Hysteria 并想为 NaiveProxy 启用 HTTP/3，则使用此段。
  servers {
    protocol {
      experimental_http3
    }
  }
} # 以下是通常配置

:443, {{域名}}
tls {{邮箱}}
route {
  forward_proxy {
    basic_auth {{用户名}} {{密码}} # 如果需要多用户就按照这个格式新增一行
    hide_ip
    hide_via
    probe_resistance
  }
  reverse_proxy {{要反代的网站}} # 最省事的方法，当然也可以自建一个服务
}
```

然后需要一个包含了 forwardproxy 模块的 caddy，这里我使用自己的镜像 [kwaa/caddy](https://github.com/kwaa/caddy)。

同时这也是一个不错的自动编译模板：如果你需要在此基础上添加或删除插件，可以考虑 Fork 一份。

> 如果不打算使用 Hysteria 并想为 NaiveProxy 启用 HTTP/3，则在 `-p 443:443 \` 下新增一行：`-p 443:443/udp \`

```bash
docker run -d \\
--name caddy \\
-p 80:80 \\
-p 443:443 \\
-v /etc/caddy/:/etc/caddy/ \\
-v /root/.local/share/caddy:/root/.local/share/caddy \\
--restart unless-stopped \\
kwaabot/caddy
```

参数：

- 容器名称 caddy
- 映射容器的 80 & 443 端口到宿主机
- 映射容器的 `/etc/caddy` （配置）和 `/root/.local/share/caddy` （证书）文件夹到宿主机
- 重启策略：无论退出状态如何都始终重启容器（除非手动停止）

### Hysteria

追加内容！

如 [README](https://github.com/HyNetwork/hysteria/blob/master/README.zh.md) 所述，Hysteria 是一个功能丰富的，专为恶劣网络环境进行优化的网络工具。

这里我尝试用它来代理流量，并和 caddy 共用 443 端口。

创建一个配置文件 `/etc/hysteria.json`，在里面设置域名、证书和混淆密码。
caddy 之前已经映射了文件夹，所以只需要使用文件夹内的证书即可。
将证书文件夹映射到容器的 `/etc/hysteria/`，最简配置：

```json filename="/etc/hysteria.json"
{
  "listen": ":443",
  "cert": "/etc/hysteria/{{域名}}/{{域名}}.crt",
  "key": "/etc/hysteria/{{域名}}/{{域名}}.key",
  "obfs": "{{密码}}"
}
```

然后创建容器，Hysteria 提供了 Docker 镜像。

> 如果设置了 acme_ca，则需要修改证书目录为签发者 URL。

```bash
docker run -dt \\
--name hysteria \\
-p 443:443/udp \\
-v /etc/hysteria.json:/etc/hysteria.json \\
-v /root/.local/share/caddy/certificates/acme-v02.api.letsencrypt.org-directory/:/etc/hysteria/ \\
--restart unless-stopped \\
tobyxdd/hysteria -config /etc/hysteria.json server
```

参数：

- 容器名称 hysteria
- 映射容器的 80 & 443 端口到宿主机
- 映射 `/etc/hysteria.json` 到容器
- 映射 `/root/.local/share/caddy/certificates/acme-v02.api.letsencrypt.org-directory/`（证书）文件夹到容器的 `/etc/hysteria/`
- 重启策略：无论退出状态如何都始终重启容器（除非手动停止）

### 自动更新镜像

说实话这个用不用无所谓，但我还是用了。

```bash
docker run -dt \\
--name watchtower \\
-v /var/run/docker.sock:/var/run/docker.sock \\
--restart unless-stopped \\
containrrr/watchtower \\
--cleanup -i 86400
```

参数：

- 容器名称 watchtower
- 映射宿主机的 `/var/run/docker.sock`（Docker 守护进程）文件夹到容器
- 重启策略：无论退出状态如何都始终重启容器（除非手动停止）
- 自动清理过期镜像，每天检查一次更新

### 性能调优

总结一下：

```ini
# bbr
net.ipv4.tcp_congestion_control=bbr
net.core.default_qdisc=cake

# naiveproxy recommend
net.ipv4.tcp_slow_start_after_idle=0
net.ipv4.tcp_notsent_lowat=16384

# hysteria recommend
net.core.rmem_max=4000000
```

一条搞定。

```bash
echo -e 'net.ipv4.tcp_congestion_control=bbr\nnet.core.default_qdisc=cake\nnet.ipv4.tcp_slow_start_after_idle=0\nnet.ipv4.tcp_notsent_lowat=16384\nnet.core.rmem_max=4000000' >> /etc/sysctl.conf && sysctl -p
```

### 验证结果

NaiveProxy 客户端配置（如果使用 HTTP3 则将 https:// 改为 quic://）：

```json filename="/etc/naive/config.json"
{
  "listen": "socks://0.0.0.0:{{本地端口1}}",
  "proxy": "https://{{用户名}}:{{密码}}@{{域名}}"
}
```

Hysteria 客户端配置：

```json filename="/etc/hysteria.json"
{
  "server": "{{域名}}:443",
  "obfs": "{{密码}}",
  "socks5": {
    "listen": "0.0.0.0:{{本地端口2}}"
  }
}
```

连上互联网了，本文结束。
