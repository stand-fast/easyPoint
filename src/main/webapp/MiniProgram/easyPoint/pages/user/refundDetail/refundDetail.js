// pages/user/refundDetail/refundDetail.js
const app = getApp()
Page({
  data: {
    btnColor:"#56b4f6",
    refundDetail:{//退款详情数据
      // travelOrderId:"1271781671672",
      // refundTime:"2019-06-30 18:22",
      // money:"3000",
      // state:5,
      // refundStatusWord:"待处理",
      // commitTime:"2019-06-30 18:22",
      // passTime:"2019-06-30 18:22",
      // failTime:"2019-06-30 18:22",
      // refundSuccessTime:"2019-06-30 18:22",
      // cancleRefundTime:"2019-06-30 14:50"
    },
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    this.setData({
      tourismRefundId: options.tourismRefundId,
      travelOrderId: options.travelOrderId,
    })
    this.getRefundStatus();
  },
  //获取订单退款详情数据
  getRefundStatus: function (){
    let that = this;
    let token = app.globalData.token;
    wx.request({
      url: app.globalData.requestUrl + 'tourism/refundPage',
      method: 'get',
      data: {
        tourismRefundId: this.data.tourismRefundId,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded', token },
      success: function (res) {
        let code = res.data.code;
        if (res.header.token != undefined) {
          app.replaceToken(res.header.token);
        }
        switch (code) {
          case 200:
            console.log(res.data.data)
            that.setData({
              refundDetail: res.data.data,
            })
            break;
          case 501:
            app.getPermission();
            break;
        }
      }
    })
  },
  //取消退款
  cancelRefund:function(){
    let that = this;
    let token = app.globalData.token;
    wx.request({
      url: app.globalData.requestUrl + 'tourism/cancelRefund',
      method: 'Post',
      data: {
        tourismRefundId: this.data.tourismRefundId,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded', token },
      success: function (res) {
        let code = res.data.code;
        if (res.header.token != undefined) {
          app.replaceToken(res.header.token);
        }
        switch (code) {
          case 200:
            wx.showToast({
              title: '取消退款成功',
              duration: 2000
            })
            break;
          case 501:
            app.getPermission();
            break;
        }
      }
    })
  },
  //跳转申请退款页面
  toRefund: function () {
    wx.navigateTo({
      url: '/pages/user/refund/refund?travelOrderId=' + this.data.travelOrderId,
    })
  },
})