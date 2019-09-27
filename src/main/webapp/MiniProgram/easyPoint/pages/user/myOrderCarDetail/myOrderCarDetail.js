// pages/user/myOrderCarDetail/myOrderCarDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current:"0",
        ticketDetail:{
          //乡会车票订单信息
            ticketId:"121312312",
            price:130,
            ticketNum: 5,

          //旅游出行订单信息
            tourismId:"23123125132",
            deposit: 1000,
            travelNum: 22,
            // driverName: "王司机",
            // driverPhone: "12345678910",
            // driverCarNumber: "粤A12345（白色）",

          //共有部分
            isInsurance: "1",
            departurePlace: "汕头",
            destination: "广金广州本部",
            departureTime: "2019-08-10 08:00",
            username: "吴彦祖",
            phone: "12345678910",
          }
    }, 
    applyRefund:function(){
        wx.navigateTo({
            url: '/pages/user/refund/refund',
        })
    },
    changeTime:function(){
        wx.navigateTo({
            url: '',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var current = options.current;
        if(current==0){
          var ticketId = options.ticketId;

          //判断是正式票还是预约票
          this.setData({
            current:0,
            type:options.type,
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
        else if (current==1){
          var tourismId=options.tourismId;
          console.log(tourismId)
          this.setData({
            current: 1
          })
          //this.getMessageRentalCar(tourismId);
        }
    },
  //获得乡会车票订单数据
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
  getMessageRentalCar: function (tourismId) {
    var selt = this;
    wx.request({
      url: '接口路径',
      method: 'Post',
      data: {
        uid: this.data.uid,
        tourismId: tourismId,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data)
        selt.setData({
          ticketDetail: res.data,
        })
        if (res.data.code == 400) {
          console.log(res.data.msg)
        }
      }
    })
  },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})