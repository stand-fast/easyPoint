// pages/easyPointCar/confirmTicket/confirmTicket.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentab:0,
        check:false,
        radioStatus: false, 
        procheck: false,
        showmodal:false,
        successPay:false,
        userInformation:{    //接上服务器后删除
          username:'肖奈',
          phone:11231231231
        }
    },
    //是否购买保险
    radiochange: function (e) {
        var radioStatus = this.data.radioStatus;
        radioStatus = !radioStatus;
        this.setData({
            radioStatus: radioStatus
        })
      if (this.data.radioStatus==true){
        var ticketInfos = wx.getStorageSync('ticketInfos');
        ticketInfos.sumprice = ticketInfos.price+10 
        this.setData({
          ticketInfos: ticketInfos,
          is_insurance:1,
        })
      }
      if (this.data.radioStatus == false) {
        var ticketInfos = wx.getStorageSync('ticketInfos');
        ticketInfos.sumprice = ticketInfos.price; 
        this.setData({
          ticketInfos: ticketInfos,
          is_insurance: 0,
        })
      }
    },
    proChange: function (e) {
        var procheck = this.data.procheck;
        procheck = !procheck;
        this.setData({
            procheck: procheck,
        })
    },
    //触发支付弹窗
    toPay:function(e){
      if(this.data.procheck==true){     //判断同意协议
        this.setData({
            showmodal:true,
        })
      }
      else{
        wx.showToast({
          title: '请浏览并同意易点协议',
          icon: 'none',
          duration: 2000
        })
      }
    },
    modal_click_Hidden: function () {       //隐藏弹框
        this.setData({
            showmodal: false,
        })
    },
    //发起支付功能
    confirmPay:function(){
      var selt=this;
      //   wx.request({
      //     url: '接口路径',
      //     data: {
      //       ticket_id: selt.data.ticketInfos.ticket_id,   //请求车票数据
      //     },
      //     method: 'Post',
      //     header: { 'content-type': 'application/x-www-form-urlencoded' },
      //     success: function (res) {
      //       console.log('剩余座位数：'+res.data.seat_surplus)
      //       if(res.data.seat_surplus==0 ){
      //           //剩余座位为0时候的弹窗
      //       }
      //       else{
      //         wx.request({
      //           url: '接口路径',
      //           header: {
      //             "Content-Type": "application/x-www-form-urlencoded"
      //           },
      //           method: "POST",
      //           data: {
      //             ticket_id: selt.data.ticketInfos.ticket_id,
      //             price: selt.data.ticketInfos.sumprice,
      //             is_insurance: selt.data.is_insurance,
      //             username: userInformation.username,
      //             phone:userInformation.phone,
      //           },
      //           success: function (res) {
      //             console.log(res.data);
      //             if (res.data.is_pay == 0) {
      //               wx.showToast({
      //                 title: '支付失败',
      //                 icon: 'loading',
      //                 duration: 2000
      //               })
      //             } else {
      //               //弹出支付成功弹窗
      //               this.setData({
      //                 showmodal: false,
      //                 successPay: true,
      //               })
                    
      //             }
      //           }
      //         })
      //       }
      //     }
      //   })
      

      //接上服务器后删除
      this.setData({
          showmodal:false,
          successPay:true,
      })
    },
    //支付后的确认
    successBtn:function(){
        this.setData({
            successPay:false,
        })
    },
    //显示保险详情
    insuDetail:function(){

    },
    /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    var selt = this;
    //console.log(options.type)
    if (options.type==1){
      this.setData({
          tickeType: "正式票",
          currentab:0,
      })
    }
    else if (options.type == 2){
      this.setData({
        tickeType: "预售票",
        currentab: 1,
      })
    }
    var ticketInfos = wx.getStorageSync('ticketInfos');
    ticketInfos.sumprice = ticketInfos.price
    this.setData({
      ticketInfos: ticketInfos,
    })
    //获取乘客姓名以及联系方式
    // var userInformation = wx.getStorageSync('userInformation');
    // this.setData({
    //   userInformation: userInformation,
    // })


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