Page({
  data: { isShowModal: false },
  onShowModal() {
    this.setData({ isShowModal: true });
  },
  cancel() {
    this.setData({ isShowModal: false });
  }
});
