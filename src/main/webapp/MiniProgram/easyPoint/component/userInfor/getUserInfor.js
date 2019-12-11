// 获取个人信息
let data = wx.getStorageSync('userInformation');
let name = data.username;
let phone = data.phone;
module.exports = {
  name,
  phone
}