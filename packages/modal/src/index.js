Component({
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer(newVisible) {
        if (newVisible === true) {
          setTimeout(() => {
            this._showMask();
          }, 100);
        }
      }
    }
  },
  data: {
    maskAnimationData: {}
  },
  methods: {
    onTapContainer() {
      // to do nothing, just for catching tap event.
    },
    close() {
      this._hideMask();
      setTimeout(() => {
        this.setData({ visible: false });
      }, 200);
    },
    _hideMask() {
      const maskAnimationData = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease'
      });
      maskAnimationData.opacity('0').step();
      this.setData({ maskAnimationData });
    },
    _showMask() {
      const maskAnimationData = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease'
      });
      maskAnimationData.opacity('1').step();
      this.setData({ maskAnimationData });
    }
  }
});
