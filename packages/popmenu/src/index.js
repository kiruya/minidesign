Component({
  externalClasses: ['container-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    menus: {
      type: Array,
      value: []
    },
    // left | right
    direction: {
      type: String,
      value: 'left'
    },
    visible: {
      type: Boolean,
      value: false,
      observer(newVal) {
        if (!newVal) {
          this._hide();
        } else {
          this._show();
        }
      }
    },
    payload: {
      type: Object,
      value: {}
    },
    // px
    defaultWidth: {
      type: Number,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    elementRect: {},
    style: '',
    menuAnimationData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapMenu: function(e) {
      const { index, menu } = e.currentTarget.dataset;
      this.triggerEvent('select', { index, menu, payload: this.data.payload });
      setTimeout(() => {
        this.setData({ visible: false });
      }, 200);
    },
    onTapBtn: function() {
      if (this.data.visible) {
        this._hide();
      } else {
        this._show();
      }
    },
    _show() {
      this.setData({ visible: true }, () => {
        const menuAnimationData = wx.createAnimation({ duration: 200 });
        menuAnimationData
          .opacity(1)
          .width(
            this.menuBoxRect
              ? this.menuBoxRect.width
              : this.data.defaultWidth || 'unset'
          )
          .step();
        this.setData({ menuAnimationData: menuAnimationData.export() });
      });
    },
    _hide() {
      !this.menuBoxRect &&
        this._getMenuBoxRect(rect => {
          this.menuBoxRect = rect;
        });
      const menuAnimationData = wx.createAnimation({ duration: 150 });
      menuAnimationData
        .opacity(0)
        .width(0)
        .step({ duration: 150 });
      this.setData({ menuAnimationData: menuAnimationData.export() }, () => {
        setTimeout(() => {
          this.setData({ visible: false });
        }, 200);
      });
    },
    _getMenuBoxRect(callback = () => {}) {
      this.createSelectorQuery()
        .select('#menu-box')
        .boundingClientRect(res => {
          callback(res);
        })
        .exec();
    }
  },
  lifetimes: {
    ready() {
      this.createSelectorQuery()
        .select('#element')
        .boundingClientRect(res => {
          if (res) {
            let defaultStyle = '';
            switch (this.data.direction) {
              case 'left':
                defaultStyle = `top: 50%;margin-right: 32rpx;right: ${res.width ||
                  0}px;`;
                break;
              case 'right':
                defaultStyle = `top: 50%;margin-left: 32rpx;left: ${res.width ||
                  0}px;`;
                break;
              default:
                defaultStyle = `top: 50%;margin-right: 32rpx;right: ${res.width ||
                  0}px;`;
            }
            this.setData({
              elementRect: res,
              style: defaultStyle
            });
          }
        })
        .exec();
    }
  }
});
