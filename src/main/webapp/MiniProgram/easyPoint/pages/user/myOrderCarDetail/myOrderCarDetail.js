// pages/user/myOrderCarDetail/myOrderCarDetail.js
const app = getApp()
Page({
  data: {
    type:"0",//订单详情类型0：包车，1：租车
    ticketDetail:{}//订单详情页面数据
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    let type = options.type;
    let travelOrderId = options.travelOrderId;
    let myOrderRentalCar = wx.getStorageSync('myOrderRentalCar');
    this.setData({
      travelOrderId,
      departurePlace: myOrderRentalCar.departurePlace,
      destination: myOrderRentalCar.destination,
      departureTime: myOrderRentalCar.departureTime,
      travelNum: myOrderRentalCar.travelNum,
      state: myOrderRentalCar.state,
    })
    //乡会车票详情数据-暂时不动
    this.getMessageRentalCar(type, travelOrderId);
    this.setData({
      type
    })
    // if (type == 0) {
    //   console.log("请求租车数据");
    //   let myOrderRentalCar = wx.getStorageSync('myOrderRentalCar');
    //   console.log(myOrderRentalCar)
    //   let ticketId = options.ticketId;

    //   //判断是正式票还是预约票,并获取上个界面的数据
    //   this.setData({
    //     current: 0,
    //     type: options.type,
    //     departurePlace: myOrderRentalCar.departurePlace,
    //     departureTime: myOrderRentalCar.departureTime,
    //     destination: myOrderRentalCar.destination,
    //     ticketNum: myOrderRentalCar.ticketNum
    //   })
    //   console.log(ticketId);
    //   //this.getMessage(ticketId);

    //   //计算合计总价接上服务器后删除
    //   let data = this.data.ticketDetail;
    //   let sumDeposit = data.ticketNum * 10
    //   if (data.isInsurance == 1) {
    //     this.setData({
    //       sumDeposit: sumDeposit,
    //       totalPrice: sumDeposit + data.ticketNum * data.price,
    //     })
    //   } else {
    //     this.setData({
    //       totalPrice: data.ticketNum * data.price,
    //     })
    //   }
    // }
    // //租车车票详情数据
    // else if (type == 1) {
    //   console.log("请求乡会包车数据");
    //   let myOrderRentalCar = wx.getStorageSync('myOrderRentalCar');
    //   let travelOrderId = myOrderRentalCar.travelOrderId;
    //   this.setData({
    //     travelOrderId: travelOrderId,
    //     departurePlace: myOrderRentalCar.departurePlace,
    //     destination: myOrderRentalCar.destination,
    //     departureTime: myOrderRentalCar.departureTime,
    //     travelNum: myOrderRentalCar.travelNum,
    //     state: myOrderRentalCar.state,
    //     current: 1,
    //   })
    //   this.getMessageRentalCar(travelOrderId);
    // }
  },
  //获得租车车票订单数据
  getMessageRentalCar(type,travelOrderId) {
    let token = app.globalData.token;
    let that = this;
    wx.request({
      url: app.globalData.requestUrl + 'findTravelOrderDetailInfo',
      method: 'Post',
      data: {
        type,
        travelOrderId
      },
      header: { 'content-type': 'application/x-www-form-urlencoded', token },
      success: function (res) {
        let code = res.data.code;
        if (res.header.token != undefined) {
          app.replaceToken(res.header.token);
        }
        switch (code) {
          case 200:
            // console.log(res);
            let ticketDetail = res.data.data;
            console.log(ticketDetail)
            that.setData({
              ticketDetail,
              totalPrice: ticketDetail.travelNum * ticketDetail.price 
            })
            break;
          case 501:
            app.getPermission();
            break;
        }
      }
    })
  },
  //跳转订单退款状态页面
  toRefundStatus:function(){
    wx.navigateTo({
      url: '/pages/user/refundDetail/refundDetail?tourismRefundId=' + this.data.ticketDetail.tourismRefundId + "&&travelOrderId=" + this.data.travelOrderId,
    })
  },
  //跳转申请退款页面
  toRefund:function(){
    wx.navigateTo({
      url: '/pages/user/refund/refund?travelOrderId=' + this.data.travelOrderId,
    })
  },
  //跳转租车订单-更换时间
  rentalChangeTime:function(){
      wx.navigateTo({
        url: '/pages/user/changeTime/changeTime?current=' + this.data.current + '&&travelOrderId=' + this.data.travelOrderId ,
      })
  },
})