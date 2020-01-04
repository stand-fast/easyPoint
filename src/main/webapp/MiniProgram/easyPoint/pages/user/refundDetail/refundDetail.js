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
      tourismRefundId: options.tourismRefundId
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

  }
})