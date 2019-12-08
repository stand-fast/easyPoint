// pages/user/refundDetail/refundDetail.js
Page({
  data: {
    btnColor:"#56b4f6",
    refundDetail:{//退款详情数据
      travelOrderId:"1271781671672",
      refundTime:"2019-06-30 18:22",
      money:"3000",
      state:5,
      refundStatusWord:"待处理",
      commitTime:"2019-06-30 18:22",
      passTime:"2019-06-30 18:22",
      failTime:"2019-06-30 18:22",
      refundSuccessTime:"2019-06-30 18:22"
    },
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    this.setData({
      travelOrderId: options.travelOrderId
    })
  },
  //获取订单退款详情数据
  getRefundStatus: function (){
    var token = app.globalData.token;
  }
})