---
title: 体验 WebAssembly 虚拟机 SSVM
date: 2020-07-30 14:11:00
updated: 2020-08-03 15:40:00
categories:
  - 笔记
tags:
  - Rust
  - WebAssembly
  - WASM
  - Node.js
---

偶然看到[写 Rust 代码，领树莓派](https://www.v2ex.com/t/693807)
这种好事怎么能错过？虽然只能领到 Zero W；我本来就对 Rust 比较感兴趣，这次正好尝试一下。

<!-- more -->

先按照[教程](https://www.secondstate.io/articles/get-started-with-rust-functions-in-node-zh/)走吧：
为了省事我用的 docker，但实际上一点都不省事。
ssvm 要求 Ubuntu 20.04，对我服务器装着的纯血 Arch 不太友好。

```bash
git clone https://github.com/second-state/ssvm-nodejs-starter
cd ssvm-nodejs-starter
docker build -t ssvm-nodejs:v1 . # 需要很长时间，注意
docker run -p 3000:3000 --rm -it -v $(pwd):/app ssvm-nodejs:v1
```

进入开发环境，接下来尝试编译：
（cargo build 速度感人，这里我推荐使用 proxychains-ng）

```bash
cd /app
cargo build # 需要很长时间，注意
ssvmup build # 我前几次尝试的时候没有执行 cargo package，结果一点反应没有；引以为戒。
node node/app.js # 编译完就可以运行了
```

这是一个 Hello World 示例，跑起来大概这样：

![hello](https://cdn.jsdelivr.net/gh/kwaa/kwaa.github.io/source/_posts/ssvm-nodejs/hello.webp)

新手教程已经完成了，我也该着手修改了。
做点什么呢？Rust 和 WebAssembly 我都是第一次接触。
考虑到作为初学者不应该写的太大，这里我选择了 leetcode 的 [1374. Generate a String With Characters That Have Odd Counts](https://leetcode.com/problems/generate-a-string-with-characters-that-have-odd-counts/)。

之后我花了两天尝试用 ajaxForm 提交，不过怎么样都是失败。

![web](https://cdn.jsdelivr.net/gh/kwaa/kwaa.github.io/source/_posts/ssvm-nodejs/web.webp)

于是就有了现在下面的这个玩意... 反正只说了学习基础知识欸嘿

**lib.rs:**

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn sb(s: &str) -> String {
  let l = s.parse::<i32>().unwrap();
  let r = "a".repeat(l as usize - 1) + if l & 1 != 0 { "a" } else { "b" };
  println!("The Rust function sb() received {}", r);
  return r;
}
```

**app.js:**

```js
const { sb } = require('../pkg/ssvm_nodejs_starter_lib.js')

const http = require('http')
const url = require('url')
const hostname = '0.0.0.0'
const port = 3000

const server = http.createServer((req, res) => {
	const queryObject = url.parse(req.url, true).query
	if (!queryObject['length']) {
		res.end(`Please use command curl http://${hostname}:${port}/?length=LENGTH \n`)
	} else {
		res.end(sb(queryObject['length']) + '\n')
	}
})

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)
})
```

这次试手的源码我放在了 [GitHub](https://github.com/kwaa/ssvm-nodejs-starter) 。（然而并没有什么用）

> 顺便一提，sb 指 stringbuilder
