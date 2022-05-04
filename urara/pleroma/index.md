---
title: 'Pleroma (Soapbox BE+FE) 安装笔记'
date: 2022-03-23
tags:
  - Pleroma
  - Soapbox
  - Fediverse
summary: 2022 更新！我决定装一个新的 Pleroma。
photo: /pleroma/pleroma_tan_cofe.avif
---

> 图片来源 / Image Source: [Releasing Pleroma 2.1.0](https://pleroma.social/blog/2020/08/28/releasing-pleroma-2-1-0/)

2022 更新！我决定装一个新的 ~~Pleroma~~ Soapbox。

- 为什么是 [Pleroma](https://pleroma.social/)?
  - 占用资源在御三家里最少，没有太多我用不到的功能。
- 为什么是 [Soapbox](https://soapbox.pub)?
  - Soapbox-FE 界面比较好看，至少看起来比较现代了。
  - 既然有 Soapbox-BE 这种西装套自然没理由不用。

## 准备

从一个干净且装有 Docker 的 Debian VPS 开始，本文默认读者有一定的 Linux 使用经验。

关于 Debian sid / linux-cloud / UFW / Docker 等基本设置可以参考 [通过 Docker 搭建 NaiveProxy + Hysteria 代理](/docker-proxy) 这篇文章。

```bash
# 开始之前先更新一下
apt update && apt upgrade
# 如果是 sid 就可以直接用 apt 安装 docker
apt install docker.io
# 不是就运行下面的
curl -fsSL https://get.docker.com | bash
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
# Postgres, 5432 端口, pgnetwork, 映射 pgdata 卷
docker run -d --name postgres \\
--network pgnetwork \\
-v pgdata:/data/db \\
-e POSTGRES_PASSWORD=postgres \\
-p 5432:5432 postgres

# pgAdmin, 5433 端口, pgnetwork
docker run -d --name pgadmin \\
--network pgnetwork \\
-e "PGADMIN_DEFAULT_EMAIL=name@example.com" \\
-e "PGADMIN_DEFAULT_PASSWORD=admin" \\
-p 5433:80 dpage/pgadmin4
```

## Caddy

这次的 Caddy 要反代本地服务，就直接用 host network 吧。
按照惯例用[我自己的镜像](https://github.com/kwaa/caddy)。

```bash
# caddy, 主机网络, 映射配置文件和证书目录
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
  reverse_proxy localhost:5433
}
```

访问 pgadmin.example.com 用上面设置的邮箱密码登录，添加服务器，PostgreSQL 的主机名称、用户名和密码默认都是 postgres。

## Soapbox-BE + Soapbox-FE

> Soapbox-BE 是 Pleroma 的分支，具有额外的错误修复和功能。

### 安装依赖

安装 Pleroma / Soapbox 需要的依赖项并创建用户：

> 原本这里还有 `postgresql postgresql-contrib`，但上面已经通过 Docker 部署了 PostgreSQL 所以跳过。

```bash
# 一把梭
apt install sudo git build-essential cmake libmagic-dev imagemagick ffmpeg libimage-exiftool-perl nginx certbot unzip libssl-dev automake autoconf libncurses5-dev
# 创建名为 pleroma 的系统用户, 不启用 Shell, 自动创建登入目录 /var/lib/pleroma
useradd -r -s /bin/false -m -d /var/lib/pleroma -U pleroma
```

### 下载源码

下载并进入目录，然后切换到 pleroma 用户：

> 我写到这里时最新版本是 `soapbox-v1.1.1`，参考本文自行搭建的话建议点进 gitlab 看一下最新版本。

```bash
# 下载 Soapbox-BE 源码到 /opt/pleroma
git clone -b soapbox-v1.1.1 https://gitlab.com/soapbox-pub/soapbox-be /opt/pleroma && cd /opt/pleroma
# 修改目录所有者为 pleroma
chown -R pleroma:pleroma /opt/pleroma
# 切换到 pleroma 用户
sudo -Hu pleroma bash
```

### 安装 Elixir 环境

（这段应该以 pleroma 用户身份输入）

以推荐的方式安装 [asdf](https://asdf-vm.com/) 包管理器、Erlang 和 Elixir。

```bash
# 安装 asdf 版本管理器, 同样建议看看有没有更新版本
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.9.0
echo ". $HOME/.asdf/asdf.sh" >> ~/.bashrc
echo ". $HOME/.asdf/completions/asdf.bash" >> ~/.bashrc
exec bash
# 安装 erlang 和 elixir
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
# 生成配置
MIX_ENV=prod mix pleroma.instance gen
# 重命名为 prod.secret.exs
mv config/generated_config.exs config/prod.secret.exs
# 退出登录并回到 root 账号
exit
```

会按顺序询问域名、实例名称、公开邮箱、通知邮箱、是否启用搜索、数据库地址、数据库名、数据库用户和密码、服务器要监听的 IP 和端口，
重命名为有效配置后用 `exit` 回到 root 账号。

### 配置数据库

用上面设置的邮箱和密码登录 pgAdmin，在 "数据库" 下右键新建一个名为 pleroma 的数据库，一切默认。

然后右键 "pleroma" 创建三个扩展，分别是 `citext`，`pg_trgm` 和 `uuid-ossp`，本节完成。

### 启动 Soapbox

复制 systemd 服务并启动，sleep 20 秒后看一下状态。

```bash
# 复制 service 文件到 systemd 目录
cp /opt/pleroma/installation/pleroma.service /etc/systemd/system/pleroma.service
# 设置开机自启并立即启动，隔 20 秒测试状态
systemctl enable --now pleroma && sleep 20 && curl http://localhost:4000/api/v1/instance
```

### 更新 Soapbox-FE 到 1.3.0

Soapbox-BE 自带的 FE 版本是 1.2.3，而最新版本是 1.3.0。
这显然不怎么好，所以我提供两条命令搞定这个问题。

```bash
# 下载到 /tmp
cd /tmp && curl -L https://gitlab.com/soapbox-pub/soapbox-fe/-/jobs/artifacts/v1.3.0/download?job=build-production -o soapbox-fe.zip
# 解压到 /opt/pleroma/instance
busybox unzip soapbox-fe.zip -o -d /opt/pleroma/instance
```

更改将立即生效，不需要重启 Pleroma 服务。

### 更新 Soapbox-FE 到 develop 分支

来自 ☆۰•¤ 黛布拉 Official¤•۰★ [(@debula@debula.ml)](https://debula.ml/@debula) 的灵感，Soapbox-FE develop 分支的变化我认为比 1.2.3 到 1.3.0 还大。

依旧是两条命令搞定，不过最好自行找一下最新版。

步骤：GitLab 存储库切换到 `develop` 分支，点进最新一条带绿勾的 commit（如果有错误或警告就换上一条，直到没有为止），找到详情里的 Pipeline 点进去，下面切换到 Jobs 选项卡、复制里面 Stage 为 `build`，Name 为 `build-production` 一项最右边按钮的链接地址。

```bash
# 下载到 /tmp
cd /tmp && curl -L https://gitlab.com/soapbox-pub/soapbox-fe/-/jobs/2386984469/artifacts/download?file_type=archive -o soapbox-fe.zip
# 解压到 /opt/pleroma/instance
busybox unzip soapbox-fe.zip -o -d /opt/pleroma/instance
```

## 设置反向代理

`systemctl status pleroma` 确认运行正常后，在 Caddyfile 末尾添加 pleroma 反代：

```ini title="/etc/caddy/Caddyfile" {8-10}
{
  email name@example.com
}

pgadmin.example.com {
  reverse_proxy localhost:5433
}

example.com {
  reverse_proxy localhost:4000
}
```

## 创建用户

创建一个管理员用户：

```text
cd /opt/pleroma
sudo -Hu pleroma bash -i -c 'MIX_ENV=prod mix pleroma.user new <username> <your@emailaddress> --admin'
```

需要注意的是 Pleroma 有个保留字列表，和下面一样的用户名都不能注册（哪怕是 admin）。

```text
[".well-known", "~", "about", "activities", "api", "auth", "check_password", "dev", "friend-requests", "inbox", "internal", "main", "media", "nodeinfo", "notice", "oauth", "objects", "ostatus_subscribe", "pleroma", "proxy", "push", "registration", "relay", "settings", "status", "tag", "user-search", "user_exists", "users", "web", "verify_credentials", "update_credentials", "relationships", "search", "confirmation_resend", "mfa"]
```

## 修改信息

绝大多数配置都可以在网页 AdminFE 修改，但有一些不能。

### 实例图标

直接替换 `/opt/pleroma/instance/static/favicon.png`，刷新就生效

### 关于页面

进入 `/opt/pleroma/instance/static/instance`，ls 一下可以看到有个 `about.example` 文件夹。重命名成 about：

```bash
mv about.example about
```

文件夹下除了 index.html 还有一些 dmca.html privacy.html tos.html，只保留自己需要的就行。（不过说实话真没什么用）

## 后记

本来还想部署一个 Matrix 服务，但 Dendrite 和 Conduit 都不支持 OpenID Connect，我又不想用 Synapse。

总之这篇文章就到这里了，欢迎 follow 我的新账号 [kwa@kwaa.moe](https://kwaa.moe/@kwa)！

TODO：这次的部署只能说是照着官方教程加了点东西，但我还想更进一步。

所以以下内容之后将有可能随机更新：

- Dockerize Pleroma
  - /opt/pleroma 里就有一个 Dockerfile，不过这次没用上。
- MinIO 分布式对象存储
  - 便于管理且能整合多台 VPS 的硬盘
