# Weapp-Components

## Todolist

- [ ] 多环境配置`@minidesign/config`

- [ ] 自定义头部 [`@minidesign/header`](https://github.com/kiruya/minidesign/tree/master/packages/header)
- [ ] 带下拉刷新和上拉刷新功能的滚动器 `@minidesign/scroll-view`
- [ ] 自定义页面（自定义头部 + 带下拉刷新和上拉刷新的滚动器） `@minidesign/page`
- [ ] 弹窗`@minidesign/modal`
- [x] 封装提交 `formId` 逻辑的组件 [`@minidesign/formid`](https://github.com/kiruya/minidesign/tree/master/packages/formid)
- [ ] 抽屉`@minidesign/drawer` 用于在屏幕边缘显示应用导航等内容的面板
- [ ] 菜单`@minidesign/Menu` 在一个临时的面板上显示一组操作
- [ ] 气泡`@minidesign/popover` 在点击控件或者某个区域后，浮出一个气泡菜单来做更多的操作。 如果设置了遮罩层，建议通过点击遮罩层的任一位置，进行退出
- [ ] 分页器`@minidesign/pagination` 分隔长列表，每次只加载一个页面
- [ ] 分段器`@minidesign/segmented-control` 由至少 2 个分段控件组成，用作不同视图的显示；是 iOS 的推荐组件
- [ ] 标签页`@minidesign/tabs` 用于让用户在不同的视图中进行切换
- [ ] 日历`@minidesign/calendar` 用于选择日期区间，或进行展示
- [ ] 区域选择`@minidesign/rang` 允许用户在一个区间中选择特定值，eg：控制屏幕的显示亮度
- [ ] 搜索栏`@minidesign/search-bar` 一般可位于 NavBar 下方，通过『取消按钮』退出激活状态
- [ ] 手风琴`@minidesign/accordion` 可以折叠/展开的内容区域
- [ ] 徽标数`@minidesign/badge` 图标右上角的红点、数字或者文字。用于告知用户，该区域的状态变化或者待处理任务的数量
- [ ] 列表`@minidesign/list` 单个连续模块垂直排列，显示当前的内容、状态和可进行的操作。eg：联系人列表
- [ ] 通告栏`@minidesign/notice-bar` 在导航栏下方，一般用作系统提醒、活动提醒等通知
- [ ] 步骤条`@minidesign/steps` 显示一个任务的进度；或者引导用户完成某个复杂任务
- [ ] 标签`@minidesign/tag` 进行标记和分类的小标签，用于标记事物的属性和维度，以及进行分类
- [ ] 动作面板`@minidesign/action-sheet` 从底部弹出的模态框，提供和当前场景相关的 2 个以上的操作动作，也支持提供标题和描述。内置固定的展示样式、不支持特别灵活的修改。
- [ ] 滑动操作`@minidesign/swipe-action` 结合手势操作，从屏幕一侧唤出操作
- [ ] 富文本编辑器`@minidesign/rich-editor` 用于编辑出富文本
- [ ] markdown`@minidesign/markdown-editor` Markdown 编辑器
- [ ] 头像图片剪裁器`@minidesign/image-cropper` 用于裁剪图片

## Create

```bash
npm run create packages/xxx
```

修改 tools 文件夹下的 `config.js`文件修改以下：

```javascript
use: [
  'babel-loader',
  // 'eslint-loader'
],
```

## Publish

```bash
npm run publish
```
