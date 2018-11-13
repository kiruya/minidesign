const app = getApp();
Component({
  externalClasses: ['btn-class', 'form-class'],
  properties: {
    // 荷载器
    payload: {
      type: null,
      value: {}
    },
    // 对应 button 的 open-type，开放类型种类
    opentype: {
      type: String,
      value: ''
    },
    // 长按触发时间
    longPressDuration: {
      type: Number,
      value: 0
    },
    // 事件是否冒泡
    bubbles: {
      type: Boolean,
      value: false
    },
    // 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
    composed: {
      type: Boolean,
      value: false
    },
    // 事件是否拥有捕获阶段
    capturephase: {
      type: Boolean,
      value: false
    },
    // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文 open-type="getUserInfo"
    lang: {
      type: String,
      value: 'zh_CN'
    },
    // 会话来源 open-type="contact"
    sessionfrom: {
      type: String,
      value: ''
    },
    // 会话内消息卡片标题 open-type="contact"
    sendmessagetitle: {
      type: String,
      value: '当前标题'
    },
    // 会话内消息卡片点击跳转小程序路径 open-type="contact"
    sendmessagepath: {
      type: String,
      value: '当前分享路径'
    },
    // 会话内消息卡片图片 open-type="contact"
    sendmessageimg: {
      type: String,
      value: '截图'
    },
    // 显示会话内消息卡片 open-type="contact"
    sendmessagecard: {
      type: Boolean,
      value: false
    },
    // 打开 APP 时，向 APP 传递的参数 open-type="launchApp"
    appparameter: {
      type: String,
      value: '@minidesign/formid'
    }
  },
  data: {
    touchStartTime: 0
  },
  timer: null,
  methods: {
    formSubmit(e) {
      const formId = e.detail.formId;
      if (
        app.minidesign instanceof Function &&
        app.minidesign() instanceof Object
      ) {
        const config = app.minidesign();

        if (config.onGetFormId instanceof Function) {
          if (config.log) {
            console.log(
              '%cMiniDesign - %c获取到FormId：%c%s',
              'color: purple; font-weight: bolder',
              'color: blue; font-weight: bold;',
              'color: red;',
              formId
            );
          }
          config.onGetFormId(formId);
        }
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
    },
    // 用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与wx.getUserInfo返回的一致 open-type="getUserInfo"
    ongetuserinfo(e) {
      this.triggerEvent('getuserinfo', e, {
        bubbles: this.data.bubbles,
        composed: this.data.composed,
        capturephase: this.data.capturephase
      });
    },
    // 客服消息回调 open-type="contact"
    oncontact(e) {
      this.triggerEvent('contact', e, {
        bubbles: this.data.bubbles,
        composed: this.data.composed,
        capturephase: this.data.capturephase
      });
    },
    // 获取用户手机号回调 open-type="getPhoneNumber"
    ongetphonenumber(e) {
      this.triggerEvent('getphonenumber', e, {
        bubbles: this.data.bubbles,
        composed: this.data.composed,
        capturephase: this.data.capturephase
      });
    },
    // 当使用开放能力时，发生错误的回调 open-type="launchApp"
    onerror(e) {
      this.triggerEvent('error', e, {
        bubbles: this.data.bubbles,
        composed: this.data.composed,
        capturephase: this.data.capturephase
      });
    },
    // 在打开授权设置页后回调 open-type="openSetting"
    onopensetting(e) {
      this.triggerEvent('opensetting', e, {
        bubbles: this.data.bubbles,
        composed: this.data.composed,
        capturephase: this.data.capturephase
      });
    }
  }
});
