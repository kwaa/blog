---
title: 'Pleroma(Soapbox BE+FE) 安装笔记'
date: 2022-03-23
tags:
  - Pleroma
  - Soapbox
  - Fediverse
descr: 2022 更新！我决定装一个新的 Pleroma。
---

2022 更新！我决定装一个新的 Pleroma。

## 准备

从一个干净且装有 Docker 的 Debian bullseye(11) VPS 开始

```bash
apt update && apt upgrade
# 没安装 Docker 就运行下面的
cd /tmp && curl -fsSL https://get.docker.com -o get-docker.sh
bash get-docker.sh && cd ~
```

为之后要用到的域名设置 DNS 记录，绑定到主机 IP。

- example.com - 用于 Soapbox
- pgadmin.example.com - 用于 pgAdmin

## PostgreSQL + pgAdmin

> 为什么用 pgAdmin？因为我之后可能会整点别的服务（比如 Matrix），图个方便。如果不需要 pgAdmin，可以参考 [官方安装教程](https://soapbox.pub/install/)。

通过 Docker 部署 PostgreSQL 和 pgAdmin。

新建名为 `pgdata` 的卷和名为 `pgnetwork` 的网络：

```bash
docker volume create pgdata
docker network create pgnetwork
```

分别在 5432, 5433 端口搭建 PostgreSQL 和 pgAdmin：

```bash
docker run -d --name postgres \\
--network pgnetwork \\
-v pgdata:/data/db \\
-e POSTGRES_PASSWORD=postgres \\
-p 5432:5432 postgres

docker run -d --name pgadmin \\
--network pgnetwork \\
-e "PGADMIN_DEFAULT_EMAIL=name@example.com" \\
-e "PGADMIN_DEFAULT_PASSWORD=admin" \\
-p 5433:80 dpage/pgadmin4
```

## Caddy

这次的 Caddy 要反代本地服务，就直接用 host network 吧。
按照惯例用我自己的镜像。

```bash
docker run -d \\
--name caddy \\
--network=host \\
-v /etc/caddy/:/etc/caddy/ \\
-v /root/.local/share/caddy:/root/.local/share/caddy \\
--restart unless-stopped \\
kwaabot/caddy
```

先配置好用于 pgAdmin 的 Caddyfile：

```text title="/etc/caddy/Caddyfile"
{
  email name@example.com
}

pgadmin.example.com {
  route {
    reverse_proxy localhost:5433
  }
}
```

访问 pgadmin.example.com 用上面设置的邮箱密码登录，添加服务器，PostgreSQL 的主机名称、用户名和密码默认都是 postgres。

## Soapbox-BE + Soapbox-FE

> Soapbox-BE 是 Pleroma 的分支，具有额外的错误修复和功能。

### 安装依赖

安装 Pleroma / Soapbox 需要的依赖项并创建用户：

> 原本这里还有 `postgresql postgresql-contrib`，但上面已经通过 Docker 部署了 PostgreSQL 所以跳过。

```bash
apt install sudo git build-essential cmake libmagic-dev imagemagick ffmpeg libimage-exiftool-perl nginx certbot unzip libssl-dev automake autoconf libncurses5-dev
useradd -r -s /bin/false -m -d /var/lib/pleroma -U pleroma
```

### 下载源码

下载并进入目录，然后切换到 pleroma 用户：

> 我写到这里时最新版本是 `soapbox-v1.1.1`，参考本文自行搭建的话建议点进 gitlab 看一下最新版本。

```bash
git clone -b soapbox-v1.1.1 https://gitlab.com/soapbox-pub/soapbox-be /opt/pleroma && cd /opt/pleroma
chown -R pleroma:pleroma /opt/pleroma
sudo -Hu pleroma bash
```

### 安装 Elixir 环境

（这段应该以 pleroma 用户身份输入）

然后以推荐的方式安装 [asdf](https://asdf-vm.com/) 包管理器，并安装 Erlang 和 Elixir。

```bash
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.9.0
echo ". $HOME/.asdf/asdf.sh" >> ~/.bashrc
echo ". $HOME/.asdf/completions/asdf.bash" >> ~/.bashrc
exec bash
asdf plugin-add erlang
asdf plugin-add elixir
asdf install
```

（大约需要 15 分钟。☕）

### 编译

```bash
# 安装 hex 和 rebar3
mix local.hex --force
mix local.rebar --force
# 获取 Elixir 依赖项
mix deps.get
# 编译 Soapbox
MIX_ENV=prod mix compile
```

（大约需要 10 分钟。☕）

### 生成配置

```bash
MIX_ENV=prod mix pleroma.instance gen
mv config/generated_config.exs config/prod.secret.exs
exit
```

会按顺序询问域名、实例名称、公开邮箱、通知邮箱、是否启用搜索、数据库地址、数据库名、数据库用户和密码、服务器要监听的 IP 和端口，
重命名为有效配置后用 `exit` 回到 root 账号。

### 配置数据库

用上面设置的邮箱和密码登录 pgAdmin，在 "数据库" 下右键新建一个名为 pleroma 的数据库，一切默认。

然后右键 "pleroma" 创建三个扩展，分别是`citext`，`pg_trgm`和`uuid-ossp`，本节完成。

### 启动 Soapbox

复制 systemd 服务并启动，sleep 20 秒后看一下状态。

```bash
cp /opt/pleroma/installation/pleroma.service /etc/systemd/system/pleroma.service
systemctl enable --now pleroma && sleep 20 && curl http://localhost:4000/api/v1/instance
```

### 更新 Soapbox-FE

Soapbox-BE 自带的 FE 版本是 1.2.3，而最新版本是 1.3.0。
这显然不怎么好，所以我提供一条命令搞定这个问题。

```bash
cd /tmp && curl -L https://gitlab.com/soapbox-pub/soapbox-fe/-/jobs/artifacts/v1.3.0/download?job=build-production -o soapbox-fe.zip
busybox unzip soapbox-fe.zip -o -d /opt/pleroma/instance
```

更改将立即生效，不需要重启 Pleroma 服务。

## 设置反向代理

systemctl status pleroma 确认运行正常后，在 Caddyfile 末尾添加 pleroma 反代：

```ini title="/etc/caddy/Caddyfile" {10-15}
{
  email name@example.com
}

pgadmin.example.com {
  route {
    reverse_proxy localhost:5433
  }
}

example.com {
  route {
    reverse_proxy localhost:4000
  }
}
```

## 后记

本来还想部署一个 Matrix 服务，但 Dendrite 和 Conduit 都不支持 OpenID Connect，我又不想用 Synapse。

总之这篇文章就到这里了，欢迎 follow 我的新地址 [kwa@kwaa.moe](https://kwaa.moe/@kwa)！
