---
title: 'Pleroma 安装笔记'
date: 2020-09-28 11:30:00
updated: 2020-09-28 23:57:00
categories:
  - 笔记
tags:
  - Pleroma
  - Fediverse
---

本来想搭建 Mastodon 的，但它配置要求较高——出于~~省钱~~节俭原则，我长期部署的网站基本都是零成本（不包括域名）。甲骨文提供的两台小鸡都是 1C1G，怎么办呢？
这时我看到了 [Pleroma](https://pleroma.social/)。<!-- more -->

## 在开始之前

- 推荐阅读: [What Is Pleroma?](https://blog.soykaf.com/post/what-is-pleroma/)
- 本文使用 Debian testing (bullseye) amd64 系统的 root 账户进行操作，并已先行安装 caddy v2。
- 安装方式参考 [Installing on Linux using OTP releases](https://docs-develop.pleroma.social/backend/installation/otp_en)。

为什么我不用 Twitter? 这几年 Twitter 芝麻仁越来越多了，我希望有一块能让我自由发言且没有芝麻仁的净土。

首先按照惯例更新一下系统和安装软件包。

```bash
apt update && apt full-upgrade && apt install sudo curl unzip libncurses5 postgresql postgresql-contrib
```

## 安装 Pleroma

添加新用户：

```bash
useradd -r -s /bin/false -m -d /opt/pleroma -U pleroma
```

下载并安装：

```bash
mkdir -p /opt/pleroma && chown -R pleroma /opt/pleroma
curl 'https://git.pleroma.social/api/v4/projects/2/jobs/artifacts/stable/download?job=amd64' -o /tmp/pleroma.zip && unzip /tmp/pleroma.zip -d /tmp/ && mv /tmp/release/* /opt/pleroma && rmdir /tmp/release && rm /tmp/pleroma.zip
```

创建上传，静态文件和配置文件夹：

```bash
mkdir -p /var/lib/pleroma/uploads && mkdir -p /var/lib/pleroma/static && chown -R pleroma /var/lib/pleroma
mkdir -p /etc/pleroma && chown -R pleroma /etc/pleroma
```

生成配置并确认（注意检查 PostgreSQL 密码）：

```bash
su pleroma -s $SHELL -lc "./bin/pleroma_ctl instance gen --output /etc/pleroma/config.exs --output-psql /tmp/setup_db.psql"
su postgres -s $SHELL -lc "psql -f /tmp/setup_db.psql"
su pleroma -s $SHELL -lc "./bin/pleroma_ctl migrate"
```

启动 Pleroma！之后用 curl 检测一下，有 JSON 输出的话就 OK 了。

```bash
su pleroma -s $SHELL -lc "./bin/pleroma daemon" && sleep 20 && curl http://localhost:4000/api/v1/instance
```

## Caddy 反代

怎么用 Caddy 我就不在这里说了。直接丢 Caddyfile：

```plain
:443, me.kwaa.moe
tls example@sld.tld
route {
    reverse_proxy 127.0.0.1:4000
}
```

成果就是 [me.kwaa.moe](https://me.kwaa.moe)，不知道能活到什么时候（请别打）。

## 尾声

我又接触到了一种数据库和一种语言（方言？）。
数据库这方面我已经累了；但 Elixir 有点感兴趣，以后了解一下。
本来打算装个 Soapbox-FE，但完成度不是很高就删掉了。
搭完是挺有成就感，不过感觉不太用得到？**毕竟社交力基本为零**
