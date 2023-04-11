---
title: 'I 卡也要炼！本地运行 Stable Diffusion & ComfyUI'
created: 2023-04-10
tags:
  - Stable Diffusion
  - ComfyUI
image: /stable-diffusion/ComfyUI_00688_.webp
summary: 我给 ComfyUI 添加了 Intel 显卡支持，那么是时候写一篇教程了。
---

> 题图由我的 Arc A770 生成，使用模型：[Anything V5[Prt-RE]](https://civitai.com/models/9409?modelVersionId=30163)、[Pastel-Mix [LoRA Version]](https://civitai.com/models/5414?modelVersionId=7397)、[墨心 MoXin](https://civitai.com/models/12597/moxin)

## 前言

接[上篇](/ventoy-archlinux)：我现在更新了去年的可携带 Arch Linux 系统，那么是时候折腾了。

这篇文章为什么拖了这么久？因为本来是打算写 A 卡 & ROCm，但完全用不了。

## 为什么 AMD 并不 YES

本段纯散发怨气，与正文无关；可以直接跳过。

ROCm 看起来很美好：直接兼容 CUDA，不需要修改代码。

但它现在既**彻底放弃支持 Polaris (RX 400/500) 且完全不提供说明**，也没有兼容 RDNA3。

现在想在 Polaris GPU 上体验 ROCm，必须使用[第三方的修复版](https://github.com/xuhuisheng/rocm-gfx803)且[完全不兼容 Stable Diffusion](https://github.com/xuhuisheng/rocm-gfx803/issues/25#issuecomment-1422619650)。

面对摆烂的生态和越来越自信的价格，我肯定是不会再考虑 A 卡了。

什么，N 卡？**矿渣** or **低性能中端卡** or **显存比中端卡还低的前高端卡** or **加钱**，选一样吧。

## 准备

总之我买了 Intel Arc A770 16G，至少硬件规格和价格我是比较满意的。

还是老样子，从一个干净，已安装 AUR 助手（本文为 `paru`）的 Arch Linux 系统开始：

```bash
# 安装 python 和 pip
paru -S python python-pip
# Intel oneAPI / OpenCL 运行时
# 从 AUR 安装版本号更高的 -bin，否则会报错
paru -S intel-compute-runtime-bin
# intel_gpu_top，可以看占用率（需要 sudo）
paru -S intel-gpu-tools
```

## oneAPI Base Toolkit

[Base Kit](https://www.intel.com/content/www/us/en/developer/tools/oneapi/base-toolkit.html) 可以直接从包管理器安装。

```bash
paru -S intel-oneapi-basekit
```

## oneAPI AI Analytics Toolkit（可选）

> 这是一个可选依赖。

[AI Kit](https://www.intel.com/content/www/us/en/developer/tools/oneapi/ai-analytics-toolkit.html) 包含重点：Intel Distribution for Python（下面简称 IDP）

IDP 的版本比起官方 Python 较旧并针对 Intel 环境优化，所以我建议实在运行不了再来试试它。

```bash
cd /tmp
# 避免找不到 libcrypt.so 而报错
paru -S libxcrypt-compat
# 下载 AI Kit 离线安装器
wget https://registrationcenter-download.intel.com/akdlm/irc_nas/19202/l_AIKit_p_2023.1.0.31760_offline.sh
# 运行 AI Kit 离线安装器
sudo sh ./l_AIKit_p_2023.1.0.31760_offline.sh
```

当然，也可以[单独下载 IDP](https://www.intel.com/content/www/us/en/developer/articles/tool/oneapi-standalone-components.html#inpage-nav-7)。

```bash
# 下载 IDP 离线安装器
wget https://registrationcenter-download.intel.com/akdlm/IRC_NAS/176aff1f-4922-4bd1-90ef-e4ab66fe76a0/l_pythoni39_oneapi_p_2023.1.0.46399_offline.sh
# 运行 IDP 离线安装器
sudo sh ./_pythoni39_oneapi_p_2023.1.0.46399_offline.sh
```

## ComfyUI

我为 ComfyUI 实施了基础的 Intel XPU 兼容性。

显然它不是第三方 fork，可以毫无问题的紧跟上游。

缺点？目前仍不支持部分采样器 / 调度器，并且随机生成噪点（心态爆炸）。

### 下载

正如 README 所述。

```bash
# 安装到 /opt/ComfyUI，当然也可以是任何你想要的目录
cd /opt && git clone https://github.com/comfyanonymous/ComfyUI.git
# 进入 ComfyUI 文件夹
cd ComfyUI
```

根据你使用的是 IDP 还是 Python，有两个不同的路径：

> 如果安装了 oneAPI AI Analysis Toolkit，那么必定是 IDP

```
# General Python
pip install torch==1.13.0a0 torchvision==0.14.1a0 intel_extension_for_pytorch==1.13.10+xpu -f https://developer.intel.com/ipex-whl-stable-xpu

# Intel Distribution for Python (IDP)
pip install torch==1.13.0a0 torchvision==0.14.1a0 intel_extension_for_pytorch==1.13.10+xpu -f https://developer.intel.com/ipex-whl-stable-xpu-idp

# 补全剩余依赖，不管是什么都执行一次
pip install -r requirements.txt
```

### 验证

在运行之前，先确认一下环境配置是否都到位了。

```bash
[user@host ComfyUI]$ sycl-ls

[user@host ComfyUI]$ python
>>> import torch
>>> import intel_extension_for_pytorch
>>> torch.xpu.is_available()
True
>>> torch.xpu.get_device_properties('xpu')
_DeviceProperties(name='Intel(R) Arc(TM) A770 Graphics', platform_name='Intel(R) Level-Zero', dev_type='gpu, support_fp64=0, total_memory=15473MB, max_compute_units=512)
```

### 运行

**每次开始之前都要执行一次** oneAPI 的设置变量，之后用 `--use-split-cross-attention` 参数运行。（不然全是噪点）

```bash
source /opt/intel/oneapi/setvars.sh
python main.py --use-split-cross-attention
```

Enjoy!

### WAS Node Suite

> WAS Node Suite 当前并不支持 Arc 显卡，应该会回退到 CPU。

非常有用的第三方节点套件，不过当前我并没有体验太多。

按照 README 推荐的方式安装：

```bash
cd custom_nodes
# 克隆
git clone https://github.com/WASasquatch/was-node-suite-comfyui
```

也可以添加为子模块，方便以后直接用 `git submodule update --remote` 更新：

```bash
cd custom_nodes
# 添加子模块
git submodule add -f https://github.com/WASasquatch/was-node-suite-comfyui was-node-suite-comfyui
```

回到主目录启动两次，应该可以在右键菜单中找到，完成。

## 已知的问题

显然无法指望 Intel 能立即赶上 NVIDIA 在机器学习领域的生态。所以这里有一些问题：

- 最大可生成图像大小大概在 704\*768，超过则会输出纯噪点或纯黑图像
  - 可能和 [intel/intel-extension-for-pytorch#296](https://github.com/intel/intel-extension-for-pytorch/issues/296), [intel/compute-runtime#617](https://github.com/intel/compute-runtime/issues/617), [intel/compute-runtime#627](https://github.com/intel/compute-runtime/issues/627) 有关
- 无法使用 Karras 调度，一些采样器兼容性也不是很好
- 哪怕一切正常，也会随机输出纯噪点图
