// pages/user/user/user.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasPermission:false,
        order_lists:[{
            url:"/images/icon/user_signup.png",
            text:"我的报名"
        }, {
            url: "/images/icon/user_order.png",
            text: "我的订单"
        },{
            url: "/images/icon/user_report.png",
            text: "我的发布"
        }],
        item_lists:[{
            icon:"/images/icon/user_perinfos.png",
            text:"个人信息",
            url:"/pages/user/editInformation/editInformation"
        }, {
            icon: "/images/icon/user_aboutus.png",
            text: "关于我们",
            url:"/pages/user/user/user"
        }, {
            icon: "/images/icon/user_problem.png",
            text: "问题反馈",
            url:""
        }, {
            icon: "/images/icon/user_protocal.png",
            text: "协议说明",
            url:""
        }, {
            icon: "/images/icon/user_exit.png",
            text: "退出账号",
            url:""
        }],
        isLogin:false,
        islanding:"",
    },
    getPermission:function(){       //登录授权
      var that = this;
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            that.setData({
              isLogin:true,
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
                    var userdata = res.data.userInfo
                    that.setData({
                      nickName: userdata.nickName,
                      avatarUrl: userdata.avatarUrl
                    })
                    app.globalData.uid = userdata.uid;
                    let obj = {
                      getTime: Date.parse(new Date()),
                      token: res.data.token
                    }
                  that.judgeLanding();
                    //console.log(userdata)
                    wx.setStorageSync("token", obj);
                    wx.setStorageSync("userInfo", res.data.userInfo);
                  },
                  fail:function(){
                    console.log(1);
                  }
                })
              }

            })
          }
        }
      })
    },
    toEditUserInfos:function(){     //进入个人信息编辑界面
        wx.navigateTo({
            url: '/pages/user/editInformation/editInformation',
        })
    },
    toOrder:function(e){        //进入订单界面
      var index = e.currentTarget.dataset.index;
      if (this.data.islanding) {
        if (index == 0) {
          wx.navigateTo({
            url: '',
          })
        }
        else if (index == 1) {
          // if (app.judgeLanding()) {
          wx.navigateTo({
            url: '/pages/user/myOrder/myOrder?type=' + 0,
          })

        }
        else if (index == 2) {
          wx.navigateTo({
            url: '',
          })
        }
      }else{
            wx.showToast({
              title: '请先授权登陆',
              icon:"none"
            })
      }

    },
    toItem:function(e){         //进入各选项界面
        var index=e.currentTarget.dataset.index;
        wx.navigateTo({
            url: this.data.item_lists[index].url,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {      //加判断用户是否登录，没登录弹出弹窗
        this.getPermission();
        // wx.showModal({
        //     title: '授权登录',
        //     content: '为了提供更好的服务，我们需要获取您的信息，请授权登录',
        //     confirmColor:"#00be30",
        //     cancelColor:"#666",
        // })
    },
  judgeLanding: function () {
    var that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {//授权了，可以获取用户信息了
          console.log("已授权");
          that.setData({
            islanding: true,
          })
        } else {//未授权，跳到授权页面
          console.log("未授权");
          that.setData({
            islanding: false,
          })
        }
      }
    })
  },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})