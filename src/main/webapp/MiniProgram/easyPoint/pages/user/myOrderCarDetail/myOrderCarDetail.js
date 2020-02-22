// pages/user/myOrderCarDetail/myOrderCarDetail.js
const app = getApp()
Page({
  data: {
    current:"0",//订单详情类型0：包车，1：租车
    ticketDetail:{//订单详情页面数据
      //乡会车票订单信息
      ticketId:"121312312",
      price:130,
      ticketNum: 5,

      //旅游出行订单信息
      travelOrderId:"23123125132",
      vehicleType: "七座大巴",
      deposit: 100,
      payMoney:100,
      travelNum: 22,
      color:'红色',

      ifInsurance: "1",//是否购买保险
      ifModified:'0',
      departurePlace: "汕头",//出发地
      destination: "广金广州本部",//目的地
      makeOrderTime: "2019-08-10 08:00",//出发时间
      username: "吴彦祖",//客户姓名
      phone: "12345678910",//客户联系方式
      carOrderStatus: "订单未安排",//新增订单状态
      driverName:"",//租车-车辆信息-姓名
      driverPhone: "12345678910",//租车-车辆信息-联系方式
      licensePlateNumber: "粤A5910"//租车-车辆信息-车牌号
    }
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    let current = options.current;
    //乡会车票详情数据-暂时不动
    if (current == 0) {
      let myOrderRentalCar = wx.getStorageSync('myOrderRentalCar');
      console.log(myOrderRentalCar)
      let ticketId = options.ticketId;

      //判断是正式票还是预约票,并获取上个界面的数据
      this.setData({
        current: 0,
        type: options.type,
        departurePlace: myOrderRentalCar.departurePlace,
        departureTime: myOrderRentalCar.departureTime,
        destination: myOrderRentalCar.destination,
        ticketNum: myOrderRentalCar.ticketNum
      })
      console.log(ticketId);
      //this.getMessage(ticketId);

      //计算合计总价接上服务器后删除
      let data = this.data.ticketDetail;
      let sumDeposit = data.ticketNum * 10
      if (data.isInsurance == 1) {
        this.setData({
          sumDeposit: sumDeposit,
          totalPrice: sumDeposit + data.ticketNum * data.price,
        })
      } else {
        this.setData({
          totalPrice: data.ticketNum * data.price,
        })
      }
    }
    //租车车票详情数据
    else if (current == 1) {
      let myOrderRentalCar = wx.getStorageSync('myOrderRentalCar');
      let travelOrderId = myOrderRentalCar.travelOrderId;
      this.setData({
        travelOrderId: travelOrderId,
        departurePlace: myOrderRentalCar.departurePlace,
        destination: myOrderRentalCar.destination,
        departureTime: myOrderRentalCar.departureTime,
        travelNum: myOrderRentalCar.travelNum,
        state: myOrderRentalCar.state,
        current: 1,
      })
      this.getMessageRentalCar(travelOrderId);
    }
  },
  //获得租车车票订单数据
  getMessageRentalCar: function (travelOrderId) {
    let token = app.globalData.token;
    let that = this;
    wx.request({
      url: app.globalData.requestUrl + 'findTravelOrderDetailInfo',
      method: 'Post',
      data: {
        type: 0,
        travelOrderId: travelOrderId,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded', token },
      success: function (res) {
        let code = res.data.code;
        if (res.header.token != undefined) {
          app.replaceToken(res.header.token);
        }
        switch (code) {
          case 200:
            console.log(res);
            console.log(res.data.data)
            that.setData({
              ticketDetail: res.data.data,
            })
            break;
          case 501:
            app.getPermission();
            break;
        }
      }
    })
  },
  //获得乡会车票订单数据-暂时不动
  getMessage: function (ticketId) {
    let that = this;
    let token = app.globalData.token;
    wx.request({
      url: '接口路径',
      method: 'Post',
      data: {
        ticketId: ticketId,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded', token},
      success: function (res) {
        let code = res.data.code;
        if (res.header.token != undefined) {
          app.replaceToken(res.header.token);
        }
        switch (code) {
          case 200:
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