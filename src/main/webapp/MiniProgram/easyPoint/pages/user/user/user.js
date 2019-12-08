// pages/user/user/user.js
var app = getApp();
Page({
  data: {
    //订单选项数据
    order_lists: [
      {
          url:"/images/icon/user_signup.png",
          text:"我的报名"
      }, 
      {
          url: "/images/icon/user_order.png",
          text: "我的订单"
      },
      {
          url: "/images/icon/user_report.png",
          text: "我的发布"
      }
    ],
    //其他栏目选项数据
    item_lists: [
      {
        icon:"/images/icon/user_perinfos.png",
        text:"个人信息",
        url:"/pages/user/editInformation/editInformation"
      }, 
      {
        icon: "/images/icon/user_aboutus.png",
        text: "关于我们",
        url:"/pages/user/user/user"
      }, 
      {
        icon: "/images/icon/user_problem.png",
        text: "问题反馈",
        url:""
      },
      {
        icon: "/images/icon/user_protocal.png",
        text: "协议说明",
        url:""
        }, 
      {
          icon: "/images/icon/user_exit.png",
          text: "退出账号",
          url:""
      }
    ],
    //登陆加锁
    isLogin:false,
    //是否有个人信息
    isUserInformation:true,
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    this.getPermission();//登陆授权、获取用户信息
    if (!wx.getStorageSync("userInformation")){
      this.setData({
        isUserInformation:false
      })
    }
    // wx.showModal({
    //     title: '授权登录',
    //     content: '为了提供更好的服务，我们需要获取您的信息，请授权登录',
    //     confirmColor:"#00be30",
    //     cancelColor:"#666",
    // })
  },
  //登录授权
  getPermission:function(){       
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
                  var userdata = res.data.userInfo;
                  that.setData({
                    isLogin: true,
                    nickName: userdata.nickName,
                    avatarUrl: userdata.avatarUrl
                  })
                  app.globalData.token = res.data.token;
                  wx.setStorageSync("token", res.data.token);
                },
                fail:function(){
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
  //进入个人信息编辑界面
  toEditUserInfos: function () {
    if (this.data.isLogin) {     
      switch (this.data.isUserInformation){
        case true:
          wx.navigateTo({
            url: '/pages/user/editInformation/editInformation?judge=' + 0
          })
          break;
        case false:
          wx.navigateTo({
            url: '/pages/user/editInformation/editInformation?judge=' + 1
          })
          break;
      }
    } else {
      wx.showToast({
        title: '请先授权登陆',
        icon: "none"
      })
    }
  },
  //进入订单界面 1：我的报名，2：我的订单，3：我的发布
  toOrder:function(e){      
    var index = e.currentTarget.dataset.index;
    if (this.data.isLogin) {
      switch (index) {
        case 0:
          wx.navigateTo({
            url: '',
          })
          break;
        case 1:
          wx.navigateTo({
            url: '/pages/user/myOrder/myOrder?type=' + 0,
          })
          break;
        case 2:
          wx.navigateTo({
            url: '',
          })
          break;
      }
    }else{
          wx.showToast({
            title: '请先授权登陆',
            icon:"none"
          })
    }

  },
  //进入遍历数据的界面
  toItem:function(e){         
      var index=e.currentTarget.dataset.index;
      wx.navigateTo({
          url: this.data.item_lists[index].url,
      })
  }
})