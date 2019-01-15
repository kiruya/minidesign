# @minidesign/marquee

## Install

> - 从小程序基础库版本 2.2.1 或以上、及开发者工具 1.02.1808300 或以上开始，小程序支持使用 [npm](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html) 安装第三方包
> - 如果你的不支持，那么可以先下载下来，在手动拷贝到你的`components/marquee`文件夹下，在使用的细节上调整一下就行了。

1. `npm install --save @minidesign/marquee`
2. 【微信开发者工具】->【工具】-> 【构建 npm】
3. ok. （别忘记执行【构建 npm】步骤）

## Usage

### [page].json

```json
{
  "usingComponents": {
    "marquee": "@minidesign/marquee"
  }
}
```

### [page].wxml

```html
<marquee
  text="Minidesign is best Mini program UI. Minidesign is best Mini program UI."
></marquee>
```

## options

| Name        | Type    | Default                               | Description                                                                      |
| ----------- | ------- | ------------------------------------- | -------------------------------------------------------------------------------- |
| text        | String  | `Minidesign is best Mini program UI.` | 需要滚动的字幕                                                                   |
| gap         | String  | `''`                                  | 滚动时字幕间的间隔，带单位，单位可选：`px | rpx | %`，默认值为屏幕宽度的三分之一 |
| delay       | Number  | `1000`                                | 首次执行延迟，`ms`                                                               |
| orientation | String  | `'left'`                              | 滚动方向： `left | right`                                                        |
| fixed       | Boolean | `false`                               | 是否固定在顶部                                                                   |
| speed       | Number  | `1`                                   | 滚动的速度，单位`px`                                                             |
| frequency   | Number  | `20`                                  | 更新频率，单位`ms`                                                               |
