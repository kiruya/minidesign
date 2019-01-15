Page({
  onSelect(e) {
    console.log(e);
    const { index, payload } = e.detail;
    wx.showModal({
      title: `选择了第${index + 1}个菜单`,
      content: JSON.stringify(payload, null, 2)
    });
  }
});
