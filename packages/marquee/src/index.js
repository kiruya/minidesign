Component({
  externalClasses: ['text-class', 'container-class'],
  properties: {
    /**
     * 是否固定在顶部
     */
    fixed: {
      type: Boolean,
      value: false,
    },
    /**
     * 需要跑马灯的文字
     */
    text: {
      type: String,
      value: 'Minidesign is best Mini program UI.'
    },
    /**
     * 速度，单位 px
     */
    speed: {
      type: Number,
      value: 1
    },
    /**
     * 更新频率
     */
    frequency: {
      type: Number,
      value: 20
    },
    /**
     * 带单位的间隔，单位可选：px | rpx | vw | vh | %
     */
    gap: {
      type: String,
      value: ''
    },
    /**
     * 首次执行延迟，ms
     */
    delay: {
      type: Number,
      value: 1000
    },
    /**
     * 开始的位置，px
     */
    startPosition: {
      type: Number,
      value: 0
    },
    /**
     * 方向： left | right
     */
    orientation: {
      type: String,
      value: 'left'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    marqueeDistance: 0,
    shouldMarquee: true,
    height: 50
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(){
      this.triggerEvent('tap', {});
    },
    _scrolling() {
      const timer = setInterval(() => {
        if (Math.abs(this.data.marqueeDistance) < this.data.length) {
          this.setData({
            marqueeDistance: this.data.marqueeDistance - this.data.speed
          });
        } else {
          clearInterval(timer);
          wx.createSelectorQuery()
            .in(this)
            .select('#second-text')
            .boundingClientRect(res => {
              this.setData({
                marqueeDistance: (res || {}).left || 0
              });
              this._scrolling();
            })
            .exec();
        }
      }, this.data.frequency);
    }
  },

  lifetimes: {
    ready() {
      const windowWidth = wx.getSystemInfoSync().windowWidth;
      const defaultGap = windowWidth / 3;
      const match = this.data.gap.match(/\d+/);
      let gapNum = match ? match[0] || defaultGap : defaultGap;
      if (/%/.test(this.data.gap)) {
        gapNum = match ? (match[0] / 100) * windowWidth : defaultGap;
      }
      if (/(rpx)$/.test(this.data.gap)) {
        gapNum = gapNum / 2;
      }
      wx.createSelectorQuery()
        .in(this)
        .select('#marquee-text')
        .boundingClientRect(res => {
          const length = (res.width - gapNum) / 2;
          const shouldMarquee = length > windowWidth;
          this.setData({ marqueeDistance: this.data.startPosition, shouldMarquee, gapNum, length, windowWidth, height: res.height }, () => {
            setTimeout(() => {
              this.data.shouldMarquee && this._scrolling();
            }, this.data.delay);
          });
        })
        .exec();
    }
  }
});
