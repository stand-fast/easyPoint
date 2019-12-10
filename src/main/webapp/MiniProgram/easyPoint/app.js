//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    token: null,//头部携带token
    requestUrl: 'https://easypoint.club/miniProgram/',//公用请求路径
  },
  replaceToken:function(token){
    this.globalData.token = token;
    wx.setStorageSync('token', token);
  },
  getPermission: function () {
    wx.showToast({
      title: '登录已经过期，正在重新登录',
      icon: "loading"
    })
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.getUserInfo({
            success: function (res_user) {
              wx.request({
                url: 'https://www.easypoint.club/miniProgram/getUserInfoAndToken',
                data: {
                  code: res.code,//获取openid的话 需要向后台传递code,利用code请求api获取openid
                  encryptedData: res_user.encryptedData,
                  iv: res_user.iv
                },
                success: function (res) {
                  // console.log(res.data)
                  that.globalData.token = res.data.token;
                  wx.setStorageSync("token", res.data.token);
                },
                fail: function () {
                  wx.showToast({
                    title: '授权失败，请稍后重试',
                  })
                }
              })
            }
          })
        }
      }
    })
  },
})