---
title: '为 nRF52840 Dongle 刷入 CanoKey 固件'
created: 2023-01-07
updated: 2023-01-07
tags:
  - YubiKey
  - CanoKey
  - nRF52840
summary: 可能是最便宜的多功能硬件密钥？
---

CanoKey 是 YubiKey 的平替。虽然我感觉都很贵... 不过最近无意间翻到 [canokey-nrf52](https://github.com/canokeys/canokey-nrf52)——这就有意思起来了。

我买了 E104-BT5040U 用来折腾，七十块两个非常便宜。买完才发现需要 J-Link 来刷 Adafruit Bootloader 遂摆烂了几个月...（YubiKey 都到了）直到现在。

开始！

## 下载

```bash
# 依赖，考虑到会看这篇文章的应该都装了 git 就没写上去
yay -S cmake gcc-arm-none-eabi-bin nrf5-sdk python

git clone https://github.com/canokeys/canokey-nrf52.git

cd canokey-nrf52

# 这里官方 README 存在问题，应该添加 --recursive 以递归安装子模块，否则会报错
git submodule update --init --recursive
```

如果不加 `--recursive`，之后编译会找不到嵌套子模块的 `CMakeLists.txt`。

```text
CMake Error at canokey-core/CMakeLists.txt:29 (add_subdirectory):
  The source directory

    canokey-nrf52/canokey-core/canokey-crypto

  does not contain a CMakeLists.txt file.
```

## 编译

编辑 `CMakeLists.txt`：

`CANOKEY_BOARD` 默认就是 nRF52840 Dongle，无需修改。

由于上面通过 AUR 安装了 `nrf5-sdk`，将 `NRF5_SDK_DIR` 改为 `/opt/nrf5-sdk`。

```diff
- set(NRF5_SDK_DIR ${BASE_DIR}/nrf_sdk/nRF5_SDK_17.1.0_ddde560)
+ set(NRF5_SDK_DIR /opt/nrf5-sdk)
```

新建 `build` 文件夹，开始编译：

> gcc-arm-none-eabi-bin 的完整路径为 `/usr/bin/arm-none-eabi-gcc`，但这里不需要写全

```bash
mkdir build

cd build

cmake \\
-DCROSS_COMPILE=/usr/bin/arm-none-eabi- \\
-DCMAKE_TOOLCHAIN_FILE=../toolchain.cmake \\
-DCMAKE_BUILD_TYPE=Release ..

make canokey_flash.uf2
```

编译完得到 `canokey.hex` 和 `canokey_flash.uf2` 两个文件。

如果你不想经历繁琐的编译过程，我提供了二进制文件可供下载：[`canokey.hex`](https://github.com/kwaa/blog/blob/main/urara/canokey-nrf52/canokey.hex)

> 可能于任何时候失效。

## 刷入

重点来了！

README 里推荐了 [Adafruit_nRF52_Bootloader](https://github.com/adafruit/Adafruit_nRF52_Bootloader)，但我可不想这么麻烦。

下载 [nRF Connect for Desktop](https://www.nordicsemi.com/Products/Development-tools/nrf-connect-for-desktop)，打开 Programmer 选中设备（正确的会正常显示 Device memory layout），把之前的 `canokey.hex` 文件扔进去点击 Write 按钮。搞定！

## 初始化和测试

> 因为我之前没安装 `ccid` 包，一直显示 Waiting for the first reader...
>
> [Arch Wiki 我的救星](https://wiki.archlinux.org/title/Smartcards)

```bash
yay -S ccid opensc pcscd pcsc_scan usbutils

sudo pip install scriptor

# 检查一下是否有 "Clay Logic CanoKey"
lsusb

# 启动 pcscd
sudo systemctl start pcscd

sudo pcsc_scan
```

正常的话，`pcsc_scan` 应该会这样输出：

```text
Using reader plug'n play mechanism
Scanning present readers...
0: Canokeys Canokey [OpenPGP PIV OATH] (123456) 00 00

Fri Aug 19 21:19:54 2022
 Reader 0: Canokeys Canokey [OpenPGP PIV OATH] (123456) 00 00
  Event number: 0
  Card state: Card inserted,
  ATR: 3B F7 11 00 00 81 31 FE 65 43 61 6E 6F 6B 65 79 99

ATR: 3B F7 11 00 00 81 31 FE 65 43 61 6E 6F 6B 65 79 99
+ TS = 3B --> Direct Convention
+ T0 = F7, Y(1): 1111, K: 7 (historical bytes)
  TA(1) = 11 --> Fi=372, Di=1, 372 cycles/ETU
    10752 bits/s at 4 MHz, fMax for Fi = 5 MHz => 13440 bits/s
  TB(1) = 00 --> VPP is not electrically connected
  TC(1) = 00 --> Extra guard time: 0
  TD(1) = 81 --> Y(i+1) = 1000, Protocol T = 1
-----
  TD(2) = 31 --> Y(i+1) = 0011, Protocol T = 1
-----
  TA(3) = FE --> IFSC: 254
  TB(3) = 65 --> Block Waiting Integer: 6 - Character Waiting Integer: 5
+ Historical bytes: 43 61 6E 6F 6B 65 79
  Category indicator byte: 43 (proprietary format)
+ TCK = 99 (correct checksum)

Possibly identified card (using /usr/share/pcsc/smartcard_list.txt):
3B F7 11 00 00 81 31 FE 65 43 61 6E 6F 6B 65 79 99
        Canokey (Other)
        http://canokeys.org/
```

接下来使用 `utils/device-config-init.sh` 来初始化这个 CanoKey。

从之前的 `canokey-nrf52/build` 目录开始：

```bash
cd ../utils
./device-config-init.sh 'Canokeys Canokey [OpenPGP PIV OATH] (123456) 00 00'
```

可以了，用 `gpg` 试试效果吧。

```bash
$ gpg --card-status
Reader ...........: Canokeys Canokey [OpenPGP PIV OATH] (123456) 00 0
```

完结！

## 特别感谢

- [E104-BT5040U 与 Canokey-nrf52 | 不分西东](https://bufenxidong.ml/blog/e104-bt5040u_and_canokey-nrf52/)
  - 让我知道了 nRF Connect 能用
