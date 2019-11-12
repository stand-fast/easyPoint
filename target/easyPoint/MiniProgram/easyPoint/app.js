//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null, 
    uid:null,
    isIphoneX:false,
    requestUrl:'http://easypoint.club/miniProgram/'
  },
  onShow: function () {
        let that = this;
        wx.getSystemInfo({
            success: res => {
                // console.log('手机信息res'+res.model)
                let modelmes = res.model;
                if (modelmes.search('iPhone X') != -1) {
                    that.globalData.isIphoneX = true
                }
            }
        })
  },
  judgeToken:function(){
      console.log("监测token是否过期");
      var newTime = Date.parse(new Date());
      var time = wx.getStorageSync("token").getTime;
      var poor = (newTime - time) / 1000;
      if (poor > 1800) {
        console.log("token已过期，正在重新获取token")
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              that.setData({
                isLogin: true,
              })
              wx.getUserInfo({
                success: function (res_user) {
                  wx.request({
                    url: 'https://easypoint.club/miniProgram/getUserInfoAndToken',
                    data: {
                      code: res.code,//获取openid的话 需要向后台传递code,利用code请求api获取openid
                      encryptedData: res_user.encryptedData,
                      iv: res_user.iv
                    },
                    success: function (res) {
                      let obj = {
                        getTime: Date.parse(new Date()),
                        token: res.data.token
                      }
                      console.log(obj)
                      wx.setStorageSync("token", obj)
                      wx.setStorageSync("userInfo", res.data.userInfo)
                    },
                    fail: function () {
                      console.log("获取失败");
                    }
                  })
                }

              })
            }
          }
        })
      }else{
        console.log("token未过期")
      }
    }
})