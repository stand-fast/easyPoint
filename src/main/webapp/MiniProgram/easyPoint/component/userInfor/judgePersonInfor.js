//判断是否有个人信息
function judege(){
  let userInformation = wx.getStorageSync('userInformation');
  let status = null;
  if (userInformation == "") {
    wx.showModal({
      title: '您尚未填写个人信息',
      content: '请点击确定开始填写个人信息',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/user/editInformation/editInformation?judge=' + 1,
          })
        }
      }
    })
    return false;
  }
  else {
    return true;
  }
}
module.exports = {
  judege: judege
}