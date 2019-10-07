// pages/easyPointCar/confirmTicket/confirmTicket.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentab:0,
        number:1,
        check:false,
        radioStatus: false, 
        procheck: false,
        showmodal:false,
        successPay:false,
        userInformation:{    //接上服务器后删除
          username:'肖奈',
          phone:11231231231,
        }
    },
    //是否购买保险
    radiochange: function (e) {
      var radioStatus = this.data.radioStatus;
      radioStatus = !radioStatus;
      this.setData({
          radioStatus: radioStatus
      })
      var number = this.data.number;
      if (this.data.radioStatus==true){
        var sum=this.data.sumprice + 10 * number;
        this.setData({
          sumprice: sum,
          is_insurance:1,
          totalDeposit: number * 10,
        })
      } else {
        var sum = this.data.sumprice - 10 * number; 
        this.setData({
          sumprice: sum,
          is_insurance: 0,
        })
      }
    },
    //计算总价
    insuranceJudgment:function(){
      if (this.data.radioStatus == true) {
        this.setData({
          sumprice: this.data.number * this.data.price + 10 * this.data.number,
          totalDeposit: 10 * this.data.number,
        })
      } else {
        this.setData({
          sumprice: this.data.number * this.data.price,
        })
      }  
    },
    getMin:function(e){     //  减法
        var min=this.data.number;
        var result=min-1;
        if(result<1){
            result=1
        }
        this.setData({
            number:result,
        })
        this.insuranceJudgment();
    },
    getMax: function (e) {     //  加法
        var max = this.data.number;
        var result=max+1;
        this.setData({
          number: result,
        })
        this.insuranceJudgment();
    },
    changeContact:function(){
        wx.navigateTo({
            url: '/pages/easyPointCar/changeContact/changeContact',
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
      // var selt=this;
      // wx.request({
      //   url: '接口路径',
      //   header: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   method: "POST",
      //   data: {
      //     openId: app.globalData.openId,
      //     ticketId: selt.data.ticketInfos.ticketId,
      //     price: selt.data.sumprice,
      //     number:selt.data.number,
      //     isInsurance: selt.data.radioStatus,
      //     type: selt.data.ticketInfos.type,
      //     username: selt.data.username,
      //     phone: selt.data.phone,
      //   },
      //   success: function (res) {
      //     console.log(res.data);
      //       //弹出支付成功弹窗
      //       this.setData({
      //         showmodal: false,
      //         successPay: true,
      //       })
      //   },
      //   fail:function(res){
      //     if (this.data.currentab==1){
      //       if(res.data.status == 1){
      //         wx.showToast({
      //           title: '支付失败,剩余票数不足',
      //           icon: 'loading',
      //           duration: 2000
      //         })
      //       }
      //     }else{
      //       if (res.data.status == 1) {
      //         wx.showToast({
      //           title: '预约失败,剩余票数不足',
      //           icon: 'loading',
      //           duration: 2000
      //         })
      //       }
      //     }
      //   },
      // })
      
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
    console.log(ticketInfos)
    ticketInfos.sumprice = ticketInfos.price*this.data.number
    this.setData({
      sumprice: ticketInfos.price,
      price: ticketInfos.price,
      ticketInfos: ticketInfos,
    })
    // 获取乘客姓名以及联系方式
    var userInformation = wx.getStorageSync('userInformation');
    this.setData({
      username: userInformation.username,
      phone: userInformation.phone,
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
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let json = currPage.data.mydata;
    if (json == undefined) {
    }
    else {
      console.log(json)//为传过来的值
      this.setData({
        username: json.name,
        phone: json.phone,
      })
    }
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