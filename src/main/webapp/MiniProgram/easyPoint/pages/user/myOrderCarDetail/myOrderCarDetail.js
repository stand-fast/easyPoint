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
    var current = options.current;
    //乡会车票详情数据-暂时不动
    if (current == 0) {
      var myOrderRentalCar = wx.getStorageSync('myOrderRentalCar');
      console.log(myOrderRentalCar)
      var ticketId = options.ticketId;

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
      var data = this.data.ticketDetail;
      var sumDeposit = data.ticketNum * 10
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
      var myOrderRentalCar = wx.getStorageSync('myOrderRentalCar');
      var travelOrderId = myOrderRentalCar.travelOrderId;
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
  //跳转订单退款状态页面
  toRefundStatus:function(){
    wx.navigateTo({
      url: '/pages/user/refundDetail/refundDetail?travelOrderId=' + this.data.travelOrderId,
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
  //获得乡会车票订单数据-暂时不动
  getMessage: function (ticketId) {
    var selt = this;
    wx.request({
      url: '接口路径',
      method: 'Post',
      data: {
        uid:this.data.uid,
        ticketId: ticketId,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var data = res.data;
        if (data.isInsurance == 1) {
          var sumDeposit = data.ticketNum * 10
          selt.setData({
            ticketDetail: data,
            sumDeposit: sumDeposit,
            totalPrice: sumDeposit + data.ticketNum * data.price,
          })
        }else{
          selt.setData({
            ticketDetail: data,
            totalPrice: data.ticketNum * data.price,
          })
        }
        if (res.data.code == 400) {
          console.log(res.data.msg)
        }
      }
    })
  },
  //获得租车车票订单数据
  getMessageRentalCar: function (travelOrderId) {
    var token = app.globalData.token;
    var selt = this;
    wx.request({
      url: app.globalData.requestUrl +'findTravelOrderDetailInfo',
      method: 'Post',
      data: {
        type: 0,
        travelOrderId: travelOrderId,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' ,token},
      success: function (res) {
        if(res.data.code == 200){
          console.log(res.data.data)
          selt.setData({
            ticketDetail: res.data.data,
          })
        }
      }
    })
  },
})