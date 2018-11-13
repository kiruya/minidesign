# @minidesign/formid

**如何突破模板消息的推送限制？**

> 突破口：“1 次提交表单可下发 1 条，多次提交下发条数独立，相互不影响”

为了突破模板消息的推送限制，实现`7`天内任性推送，只需收集到足够的推送码，即每次提交表单时获取到的`formId`。一个`formId`代表着开发者有向当前用户推送模板消息的一次权限。

在客户端需要在一切可以点击的地方放置搜集点，使用：`@minidesign/formid`替代所有的点击事件节点。

## Install

> - 从小程序基础库版本 2.2.1 或以上、及开发者工具 1.02.1808300 或以上开始，小程序支持使用 [npm](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html) 安装第三方包
> - 如果你的不支持，那么可以先下载下来，在手动拷贝到你的`components/formid`文件夹下，在使用的细节上调整一下就行了。

1. `npm install --save @minidesign/formid`
2. 【微信开发者工具】->【工具】-> 【构建 npm】
3. ok. （别忘记执行【构建 npm】步骤）

## Usage

### [page].json

```json
{
  "usingComponents": {
    "formid": "@minidesign/formid"
  }
}
```

### [page].wxml

```html
<formid bindclick="dosomething" class="your-class">xxx</formid>
```

### app.js

统一一个地方`app.js`来收集`formId`，并保存到服务器，用于推送模板消息给用户。

```js
App({
  // ...

  // minidesign config
  minidesign() {
    return {
      log: true, // 是否打印执行日志
      onGetFormId: formId => {
        // 收集 form id 的地方
        // Like: common.saveFormId(formId);
        // 注意 一个 formId 的有效期暂为 7 天
      }
    };
  }
});
```

## Style & Class

1. 可直接设置组件的`class`与`style`
2. 特定情况下，单独设置组件内`button`元素的`class`：`btn-class="your-custom-button-class-name"`
3. 特定情况下，单独设置组件内`form`元素的`class`：`form-class="your-custom-form-class-name"`

## Options

### minidesign {Function} return {Object} 全局配置

配置在`app.js`文件内的全局配置：

```js
App({
  // ...

  // minidesign config
  minidesign() {
    return {
      log: true, // 是否打印执行日志
      onGetFormId: formId => {
        // 收集 form id 的地方
        // Like: common.saveFormId(formId);
        // 注意 一个 formId 的有效期暂为 7 天
      }
    };
  }
});
```

`minidesign` 应为一个返回`object`的方法。

- `log` {`Boolean`} 是否打印执行日志
- `onGetFormId` {`Function`} 统一收集 `formId` 的地方，可以在这里设计保存`formId`的策略

### payload {any} 荷载器

一般用户事件数据传输使用

```html
<formid bindclick="dosomething" payload="{{somedata}}">Minidesign</formid>
```

### opentype {String} 对应 button 的 open-type，开放类型种类

可以取以下值（详见官方文档[button](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)的 `open-type` 有效值）

- `contact` 打开客服会话，如果用户在会话中点击消息卡片后返回小程序，可以从 bindcontact 回调中获得具体信息，具体说明 1.1.0
- `share` 触发用户转发，使用前建议先阅读使用指引 1.2.0
- `getUserInfo` 获取用户信息，可以从 bindgetuserinfo 回调中获取到用户信息 1.3.0
- `getPhoneNumber` 获取用户手机号，可以从 bindgetphonenumber 回调中获取到用户信息，具体说明 1.2.0
- `launchApp` 打开 APP，可以通过 app-parameter 属性设定向 APP 传的参数具体说明 1.9.5
- `openSetting` 打开授权设置页 2.0.7
- `feedback` 打开“意见反馈”页面，用户可提交反馈内容并上传日志，开发者可以登录小程序管理后台后进入左侧菜单“客服反馈”页面获取到反馈内容 2.1.0

### longPressDuration {Number} 长按触发时间

扩展按钮长按功能，配置长按触发临界时间。

```html
<formid
  bindclick="dosomething"
  payload="{{somedata}}"
  longPressDuration="{{500}}"
  bindtouch="ontouchstart"
  bindcancel="ontouchcancel"
  bindend="ontouchend"
>
  Minidesign
</formid>
```

### bubbles {Boolean} 事件是否冒泡

默认值 `false`

### composed {Boolean} 事件是否可以穿越组件边界

默认值`false`，为`false`时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部

### capturephase {Boolean} 事件是否拥有捕获阶段

默认值 `false`

### bindclick {Function} 点击事件

```html
<formid bindclick="dosomething" payload="{{somedata}}">Minidesign</formid>
```

```js
Page({
  dosomething({ detail }) {
    const { event, payload } = detail;
    // do something with event and payload.
  }
});
```

### bindtouch {Function} 长按按钮按下动作开始

### bindcancel {Function} 长按按钮动作取消

### bindend {Function} 长按按钮动作结束

### bindgetuserinfo {Function} 用户点击该按钮时，会返回获取到的用户信息，回调的 detail 数据与 wx.getUserInfo 返回的一致 open-type="getUserInfo"

### bindcontact {Function} 客服消息回调 open-type="contact"

### bindgetphonenumber {Function} 获取用户手机号回调 open-type="getPhoneNumber"

### binderror {Function} 当使用开放能力时，发生错误的回调 open-type="launchApp"

### bindopensetting {Function} 在打开授权设置页后回调 open-type="openSetting"

### sessionfrom {String} 会话来源 open-type="contact"

### sendmessagetitle {String} 会话内消息卡片标题 open-type="contact"

默认值为`当前标题`

### sendmessagepath {String} 会话内消息卡片点击跳转小程序路径 open-type="contact"

默认值为`当前分享路径`

### sendmessageimg {String} 会话内消息卡片图片 open-type="contact"

默认值为`截图`

### sendmessagecard {Boolean} 显示会话内消息卡片 open-type="contact"

默认值为`false`

### appparameter {String} 打开 APP 时，向 APP 传递的参数 open-type="launchApp"

默认值为`@minidesign/formid`
