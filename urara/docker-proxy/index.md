---
title: '通过 Docker 搭建 NaiveProxy + Hysteria 代理'
date: 2021-07-13 01:11:11
lastmod: 2021-12-10
categories:
  - 笔记
tags:
  - NaiveProxy
  - Hysteria
  - Docker
descr: 去年年底买的 Virmach 水牛城 VPS，最近我终于想起来还有这么个东西闲置着；于是就有了这篇文章。
---

去年年底买的 Virmach 水牛城 VPS，最近我终于想起来还有这么个东西闲置着；于是就有了这篇文章。
本文假定读者已经有一定 Linux 基础知识，会使用 SSH 和 BASH。
趁着这个机会我顺便体验了一下 Termius... 这个界面真不错

只是干净和稳定，速度不好说。

## 准备工作

一个 VPS 和一个设置好解析的域名。
密码忘了遂重装系统——为什么都 2021 年了系统镜像还是只到 Debian 9?!
如文件名，代理都通过 Docker 容器搭建。所以下面的步骤都是可选的。

### Buster

目前的最新发行版是 Buster(10)。我以前试过 testing/bullseye 但是 Docker 安装脚本不支持？等正式版出来再更新了。

马上从 Virmach 预装的 Stretch 升级到 Buster：

```bash
apt update
sed -i 's/stretch/buster/g' /etc/apt/sources.list
apt update && apt upgrade
```

### Buster Backports

由于我并没有使用 testing，新的 Linux 内核就得通过 Backports 安装了。
不会真的有人想用 4.9 吧？

```bash
echo deb http://deb.debian.org/debian buster-backports main contrib non-free | tee /etc/apt/sources.list.d/buster-backports.list
apt update
apt -t buster-backports upgrade # 更新所有可用的软件包
reboot
```

这么一来内核版本已经到了 5.10.0。虽然也算不上最新，但考虑到这是 Debian 也就能接受了。

### UFW

我很喜欢的一个防火墙工具，因为简单；
没有其他服务的话，只需要放行 SSH / HTTPS 端口。

```bash
apt install ufw
ufw allow ssh
ufw allow https
ufw enable # y 回车确认
```

## 搭建

首先安装 docker... podman / containerd 应该也行，但我没试过。

```bash
apt install curl
curl -fsSL https://get.docker.com/ | bash
```

### NaiveProxy

先创建一个配置文件，使用你的参数替换掉 `{{注释}}` 的值并去掉 `#注释`：

```bash
mkdir /etc/caddy
nano /etc/caddy/Caddyfile # nano 不会用的话我也救不了了
```

```ini
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

```json
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

### 自动更新 Docker 镜像

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

```json
{
  "listen": "socks://0.0.0.0:{{本地端口1}}",
  "proxy": "https://{{用户名}}:{{密码}}@{{域名}}"
}
```

Hysteria 客户端配置：

```json
{
  "server": "{{域名}}:443",
  "obfs": "{{密码}}",
  "socks5": {
    "listen": "0.0.0.0:{{本地端口2}}"
  }
}
```

连上互联网了，本文结束。
