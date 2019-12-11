// pages/user/refund/refund.js
const app = getApp()
Page({
  data: {
    success:false,//退款成功弹窗
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    let obj = wx.getStorageSync("token");
    this.setData({
      token: obj.token,
      travelOrderId: options.travelOrderId
    })
    this.getRefundMessage(options.travelOrderId)
  },
  //提交退款申请
  formSubmit: function (e) {     
    let token = this.data.token;
    let that = this;
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
      console.log(app.globalData.uid);
      wx.request({
        url: app.globalData.requestUrl + 'tourismRefund',
        method: 'Post',
        data: {
          travelOrderId: that.data.travelOrderId,
          refundReason: e.detail.value.reason,
          uid:app.globalData.uid,
        },
        header: { 'content-type': 'application/x-www-form-urlencoded', token },
        success: function (res) {
          let code = res.data.code;
          switch(code){
            case 200:
              wx.showToast({
                title: '申请成功，请耐心等待管理员确认',
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
                title: '申请失败，请确保您为该订单的所属者',
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
  },
  //租车-退款理由
  getRefundMessage: function (travelOrderId) {
    let token = app.globalData.token;
    let that = this;
    wx.request({
      url: app.globalData.requestUrl + 'findTravelOrderDetailInfo',
      method: 'Post',
      data: {
        type:0,
        travelOrderId: travelOrderId,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded', token},
      success: function (res) {
        // console.log(res)
        let code = res.data.code;
        switch (code){
          case 200:
            that.setData({
              reason: res.data.data.refundReason,
            })
            break;
          case 501:
            app.getPermission();
            break;
        }
      }
    })
  },
})