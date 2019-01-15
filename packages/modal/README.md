# @minidesign/modal

## Install

> - 从小程序基础库版本 2.2.1 或以上、及开发者工具 1.02.1808300 或以上开始，小程序支持使用 [npm](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html) 安装第三方包
> - 如果你的不支持，那么可以先下载下来，在手动拷贝到你的`components/modal`文件夹下，在使用的细节上调整一下就行了。

1. `npm install --save @minidesign/modal`
2. 【微信开发者工具】->【工具】-> 【构建 npm】
3. ok. （别忘记执行【构建 npm】步骤）

## Usage

### [page].json

```json
{
  "usingComponents": {
    "modal": "@minidesign/modal"
  }
}
```

### [page].wxml

```html
<modal visible="{{isShowModal}}">
  <view>blabla..., whatever you want to put into.</view>
</modal>
```

## options

| Name    | Type    | Default | Description  |
| ------- | ------- | ------- | ------------ |
| visible | Boolean | `false` | 控制显示弹窗 |
