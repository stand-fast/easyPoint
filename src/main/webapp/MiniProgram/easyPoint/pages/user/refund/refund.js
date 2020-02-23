// pages/user/refund/refund.js
const app = getApp()
Page({
  data: {
    success:false,//退款成功弹窗
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    this.setData({
      travelOrderId: options.travelOrderId
    })
    this.getRefundMessage(options.travelOrderId)
  },
  //提交退款申请
  formSubmit: function (e) {     
    let that = this;
    let token = app.globalData.token;
    if (e.detail.value.reason==""){
      wx.showToast({
        title: '退款理由不能为空',
        icon: 'none',
        duration: 2000
      })
    }else if(e.detail.value.reason.length<5){
      wx.showToast({
          title: '退款理由少于5个字',
          icon: 'none',
          duration: 2000
      })
    } else if (e.detail.value.reason.length>100) {
      wx.showToast({
          title: '退款理由超过100个字',
          icon: 'none',
          duration: 2000
      })
    }else{
      wx.request({
        url: app.globalData.requestUrl + 'tourismRefund',
        method: 'Post',
        data: {
          travelOrderId: that.data.travelOrderId,
          refundReason: e.detail.value.reason,
        },
        header: { 'content-type': 'application/x-www-form-urlencoded', token },
        success: function (res) {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          if (res.header.token != undefined) {
            app.replaceToken(res.header.token);
          }
          switch(code){
            case 200:
              wx.showToast({
                title: '申请成功，请耐心等待管理员确认',
                icon: 'none',
                duration: 2000
              })
              wx.switchTab({
                url: '/pages/user/user/user'
              })
              break;
            case 400:
              wx.showToast({
                title: '申请异常，可联系管理员',
                icon: 'none',
                duration: 2000
              })
              break;
            case 401:
              wx.showToast({
                title: '申请失败，您当前的申请次数已达到限制',
                icon: 'none',
                duration: 2000
              })
              break;
            case 402:
              wx.showToast({
                title: '该订单退款正等待管理员处理中，请耐心等待',
                icon: 'none',
                duration: 2000
              })
              break;
            case 403:
              wx.showToast({
                title: '该订单已退款成功，此次申请失败',
                icon: 'none',
                duration: 2000
              })
              break;
            case 405:
              wx.showToast({
                title: '该订单退款正等待管理员处理中，请耐心等待',
                icon: 'none',
                duration: 2000
              })
              break;
            case 501:
              app.getPermission();
              break;
          }
        }
      })
    }
  },
  //退款成功弹窗隐藏
  trueBtn:function(){
    this.setData({
        success: false
    })
  }
})