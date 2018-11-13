const app = getApp()
Component({
  properties: {
    data: {
      type: null
    },
    args: {
      type: null
    },
    longPressDuration: {
      type: Number,
      default: 0
    }
  },
  data: {
    touchStartTime: 0,
  },
  timer: null,
  methods: {
    formSubmit(e) {
      const formId = e.detail.formId
      console.log('拿到 formId: ', formId)
      app.formIds.add(formId)
      if (this.data.longPressDuration === 0) {
        this.triggerClick()
      }
    },
    touchstart() {
      console.log('%c开始按住，%dms 后触发事件', 'color: red', this.data.longPressDuration)
      this.setData({touchStartTime: Date.now()})
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.triggerEvent('touch', {
        data: this.data.data,
        args: this.data.args,
      }, {
        bubbles: true,
        composed: false
      })
      if (this.data.longPressDuration !== 0) {
        this.timer = setTimeout(() => {
          this.timer = null
          this.triggerClick()
        }, this.data.longPressDuration || 50)
      }
    },
    touchcancel() {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.triggerEvent('cancel', {
        data: this.data.data,
        args: this.data.args,
      }, {
        bubbles: true,
        composed: false
      })
      this.setData({touchStartTime: 0})
    },
    touchend() {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.triggerEvent('end', {
        data: this.data.data,
        args: this.data.args,
      }, {
        bubbles: true,
        composed: false
      })
      this.setData({touchStartTime: 0})
    },
    // 触发点击事件
    triggerClick() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.triggerEvent('click', {
        data: this.data.data,
        args: this.data.args,
      }, {
        bubbles: true,
        composed: false
      })
    }
  }
})
