// pages/user/myOrderRentDetail/myOrderRentDetail.js
Page({
  data: {
    rentDetail:{//租赁订单详情数据
      orderId:12345678910,
      orderTime:"2019-11-09 17:30",
      shopName:"易点直营店",
      goodName: "随身携带可充电荧光灯带哈哈哈",
      goodPrice: 30,
      goodDeposit:100,
      goodDecription: "五十米长我算到这里就应该是二十了吧哈哈哈到可以",
      goodNumber: 2,
      orderStatus: "未完成",
      takeGoodTime:"2019-11-10 19:00",
      goodRentTime:1,
      takePlace:"广金北苑四楼融创空间",
      returnGoodTime:"2019-11-11 21:00",
      hostNote: "麻烦附上充电器",
      orderHostName: "吴彦祖",
      orderHostPhone: 12345678910,
      shopNote:"如需更换时间或其他额外需求请联系客服"
    },
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {

  },
  //跳转申请退款页面
  jumpToRefund:function(){
    wx.navigateTo({
        url: '/pages/user/refund/refund',
    })
  },

})