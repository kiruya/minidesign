const app = getApp();
let config = {};
if (app.minidesign instanceof Function && app.minidesign() instanceof Object) {
  config = app.minidesign();
}

let wxconfig = null;
try {
  wxconfig = __wxConfig;
} catch (error) {
  if (config.log) {
    console.error('Minidesign Warning: ', error);
  }
}
const defaultHomeUrl = wxconfig ? __wxConfig.pages[0] : null;

Component({
  externalClasses: [
    'container-class',
    'title-class',
    'left-class',
    'menu-class'
  ],
  options: {
    multipleSlots: true
  },
  properties: {
    // 动画
    animation: {
      type: Object,
      value: {}
    },
    // 背景颜色·
    backgroundcolor: {
      type: String,
      value: '#ffffff'
    },
    // 颜色模式
    // 值可选：'light' | 'dark'
    menustyle: {
      type: String,
      value: 'dark'
    },
    // 模式选择
    // 值可选：'fashion' | 'classic' | 'cover-fashion' | 'cover-classic' | 'custom' | 'cover-custom', default value is 'classic'
    mode: {
      type: String,
      value: 'classic'
    },
    // 标题
    title: {
      type: String,
      value: ''
    },
    height: {
      type: Number
    },
    // 首页路由
    home: {
      type: String,
      value: 'pages/index/index' // 前面不要 /
    }
  },
  data: {
    statusBarHeight: 20,
    menuRect: {}, // 菜单参数
    showMenu: false // 是否显示左边菜单
  },
  lifetimes: {
    attached() {
      // 检测首页是否在当前页面栈中
      const pages = getCurrentPages();
      const homeUrl = defaultHomeUrl || this.data.home || 'pages/index/index';
      console.log(pages.length > 1 || pages[0].route !== homeUrl);
      this.setData({
        showMenu: pages.length > 1 || pages[0].route !== homeUrl
      });

      if (!this.data.title) {
        this.setData({
          title: wxconfig ? wxconfig.global.window.navigationBarTitleText : ''
        });
      }

      // 获取顶部状态栏高度
      const { statusBarHeight, screenWidth, system } = wx.getSystemInfoSync();
      if (wx.canIUse('getMenuButtonBoundingClientRect')) {
        const res = wx.getMenuButtonBoundingClientRect();
        const height = res.top - statusBarHeight + res.bottom;
        const rightGap = screenWidth - res.right;
        const menuRect = {
          height: res.height,
          width: res.width,
          left: rightGap,
          top: res.top
        };
        const data = {
          statusBarHeight,
          menuRect,
          height
        };
        this.setData(data);
      } else {
        const data = {
          statusBarHeight,
          menuRect: {
            height: 32,
            width: 87,
            left: 10
          },
          height: /ios/i.test(system) ? 44 : 48
        };

        // 自定义高度
        if (this.data.height) {
          data.height = this.data.height;
        }
        this.setData(data);
      }
    }
  },
  methods: {
    navigateBack() {
      const homeUrl = defaultHomeUrl || this.data.home || 'pages/index/index';
      let pages = getCurrentPages();
      if (pages.length < 2 && pages[0].route !== homeUrl) {
        wx.reLaunch({ url: '/' + homeUrl });
      } else {
        wx.navigateBack({ delta: 1 });
      }
    },
    navigateBackHome() {
      wx.reLaunch({ url: '/' + homeUrl });
    }
  }
});
