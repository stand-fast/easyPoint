// pages/user/myOrderCarDetail/myOrderCarDetail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current:"0",
        //底部状态栏变化
        refund_border_color:"#56b4f6",
        time_border_color:"#56b4f6",
        time_disabled:false,
        refund_disabled:false,
        applyRefundWord:"申请退款",
        ticketDetail:{
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

          //共有部分
            ifInsurance: "1",
            ifModified:'0',
            departurePlace: "汕头",
            destination: "广金广州本部",
            makeOrderTime: "2019-08-10 08:00",
            username: "吴彦祖",
            phone: "12345678910",
            carOrderStatus: "订单未安排",//新增订单状态
            
            //司机信息
            driverName:"",
            driverPhone:"12345678910",
            licensePlateNumber:"粤A5910"
        }
    }, 
    applyRefund:function(){
      if(this.data.applyRefundWord=="申请退款"){
          wx.navigateTo({
              url: '/pages/user/refund/refund?travelOrderId=' + this.data.travelOrderId,
          })
      }else{
          wx.navigateTo({
              url: '/pages/user/refundDetail/refundDetail?travelOrderId=' + this.data.travelOrderId,
          })
      }
    },
    changeTime:function(){
      wx.navigateTo({
          url: '/pages/user/changeTime/changeTime?current=' + this.data.current,
      })
    },
    onLoad: function (options) {
      var current = options.current;
      //乡会车票详情数据-暂时不动
      if (current == 0) {
        var myOrderRentalCar = wx.getStorageSync('myOrderRentalCar');
        console.log(myOrderRentalCar)
        var ticketId = options.ticketId;

        //判断是正式票还是预约票,并获取上个界面的数据
        this.setData({
          current:0,
          type:options.type,
          departurePlace:myOrderRentalCar.departurePlace,
          departureTime: myOrderRentalCar.departureTime,
          destination: myOrderRentalCar.destination,
          ticketNum: myOrderRentalCar.ticketNum
        })
        console.log(ticketId);
        //this.getMessage(ticketId);
        
        //计算合计总价接上服务器后删除
        var data = this.data.ticketDetail;
        var sumDeposit = data.ticketNum * 10
        if (data.isInsurance==1){
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
          travelOrderId :travelOrderId,
          departurePlace: myOrderRentalCar.departurePlace,
          destination: myOrderRentalCar.destination,
          departureTime: myOrderRentalCar.departureTime,
          travelNum: myOrderRentalCar.travelNum,
          state: myOrderRentalCar.state,
          current: 1,
        })
        this.getMessageRentalCar(travelOrderId);
      }
      //底部栏状态变化
      var refund_border_color=this.data.refund_border_color;
      var time_border_color=this.data.time_border_color;
      var refund_disabled=this.data.refund_disabled;
      var time_disabled=this.data.time_disabled;
      var carOrderStatus=this.data.ticketDetail.carOrderStatus;
      if (carOrderStatus=="订单已安排"){
          refund_border_color="#999",
          refund_disabled=true
      }else if(carOrderStatus=="订单未安排"){
          refund_border_color="#56b4f6",
          time_border_color= "#56b4f6"
      }else{
          refund_border_color = "#999",
          time_border_color = "#999",
          time_disabled=true,
          refund_disabled=true
      }
      this.setData({
          refund_border_color:refund_border_color,
          time_border_color:time_border_color,
          refund_disabled:refund_disabled,
          time_disabled:time_disabled
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