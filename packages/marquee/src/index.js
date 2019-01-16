Component({
  externalClasses: ['text-class', 'container-class'],
  properties: {
    /**
     * 是否固定在顶部
     */
    fixed: {
      type: Boolean,
      value: false
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
      value: 60
    },
    /**
     * 间隔的宽度，同 wxss width 值
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
      value: 16
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    marqueeDistance: 0,
    shouldMarquee: true,
    height: 50,
    animationData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onAnimationEnd(e) {
      this.animationData.left(this.data.gapWidth).step({ duration: 0 });
      this.setData({ animationData: this.animationData.export() }, () => {
        this._animation();
      });
    },
    _animation(distance = this.data.length) {
      this.animationData = wx.createAnimation({
        duration: (this.data.length / this.data.speed) * 1000
      });
      this.animationData.left(-distance).step({
        duration: (this.data.length / this.data.speed) * 1000
      });
      this.setData({ animationData: this.animationData.export() });
    }
  },

  lifetimes: {
    ready() {
      const windowWidth = wx.getSystemInfoSync().windowWidth;
      const delayScroll = () => {
        setTimeout(() => {
          this._animation();
        }, this.data.delay);
      };

      this.createSelectorQuery()
        .select('#marquee-text')
        .boundingClientRect(res => {
          const data = { windowWidth };
          data.height = res.height;
          this.createSelectorQuery()
            .select('#gap')
            .boundingClientRect(gapRect => {
              data.length = (res.width - gapRect.width) / 2;
              data.shouldMarquee = data.length >= windowWidth;
              data.gapWidth = gapRect.width;
              if (data.shouldMarquee) {
                this.setData(data, delayScroll);
              } else {
                data.length = res.width;
                this.setData(data);
              }
            })
            .exec();
        })
        .exec();
    }
  }
});
