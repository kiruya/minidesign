const app = getApp();
Component({
  externalClasses: ['btn-class', 'form-class'],
  properties: {
    payload: {
      type: null,
      value: {}
    },
    openType: {
      type: String,
      value: ''
    },
    longPressDuration: {
      type: Number,
      value: 0
    }
  },
  data: {
    touchStartTime: 0
  },
  timer: null,
  methods: {
    formSubmit(e) {
      const formId = e.detail.formId;

      // collect form id
      if (app.onGetFormId instanceof Function) {
        app.onGetFormId(formId);
      }
      if (this.data.longPressDuration === 0) {
        this.triggerClick(e);
      }
    },
    touchstart(e) {
      this.setData({ touchStartTime: Date.now() });
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.triggerEvent(
        'touch',
        {
          event: e,
          payload: this.data.payload
        },
        {
          bubbles: true,
          composed: false
        }
      );
      if (this.data.longPressDuration !== 0) {
        this.timer = setTimeout(() => {
          this.timer = null;
          this.triggerClick(e);
        }, this.data.longPressDuration || 50);
      }
    },
    touchcancel() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.triggerEvent(
        'cancel',
        {},
        {
          bubbles: true,
          composed: false
        }
      );
      this.setData({ touchStartTime: 0 });
    },
    touchend() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.triggerEvent(
        'end',
        {},
        {
          bubbles: true,
          composed: false
        }
      );
      this.setData({ touchStartTime: 0 });
    },
    triggerClick(e) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.triggerEvent(
        'click',
        {
          event: e,
          payload: this.data.payload
        },
        {
          bubbles: true,
          composed: false
        }
      );
    }
  }
});
