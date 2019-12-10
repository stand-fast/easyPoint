// pages/easyPointCar/confirmTicket/confirmTicket.js
let app = getApp();
Page({
  data: {
    currentab:0,//车票种类1：正式票，2：预售票
    number:1,//预定票数
    radioStatus: false, //是否购买保险
    showmodal:false,//是否显示温馨提示窗口
    successPay:false,//是否显示支付成功后的窗口
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    let that = this;
    this.setData({
      currentab: options.type - 1,
    })
    let userInformation = wx.getStorageSync('userInformation');
    let ticketInfos = wx.getStorageSync('ticketInfos');
    ticketInfos.sumprice = ticketInfos.price * this.data.number
    this.setData({
      username: userInformation.username,
      phone: userInformation.phone,
      sumprice: ticketInfos.price,
      price: ticketInfos.price,
      ticketInfos: ticketInfos,
    })
  },
  onShow: function () {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页面
    let json = currPage.data.mydata;
    if (json != undefined) {
      this.setData({
        username: json.name,
        phone: json.phone,
      })
    }
  },
  //是否购买保险
  radiochange: function (e) {
    let radioStatus = this.data.radioStatus;
    this.setData({
        radioStatus: !radioStatus
    })
    let number = this.data.number;
    if (this.data.radioStatus==true){
      let sum=this.data.sumprice + 10 * number;
      this.setData({
        sumprice: sum,
        is_insurance:1,
        totalDeposit: number * 10,
      })
    } else {
      let sum = this.data.sumprice - 10 * number; 
      this.setData({
        sumprice: sum,
        is_insurance: 0,
      })
    }
  },
  //点击加号减号时候计算总价
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
  //点击减号
  getMin:function(e){    
      let min=this.data.number;
      let result=min-1;
      if(result<1){
          result=1
      }
      this.setData({
          number:result,
      })
      this.insuranceJudgment();
  },
  //点击加号
  getMax: function (e) {     
      let max = this.data.number;
      let result=max+1;
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
  //弹出温馨提示弹窗
  toPay:function(e){
    this.setData({
        showmodal:true,
    })
  },
  //隐藏温馨提示弹窗
  modal_click_Hidden: function () {       //隐藏弹框
    this.setData({
        showmodal: false,
    })
  },
  //发起支付功能
  confirmPay:function(){
    // let that=this;
    // let token = app.globalData.token;
    // wx.request({
    //   url: '接口路径',
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded", token
    //   },
    //   method: "POST",
    //   data: {
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
    //     //弹出支付成功弹窗
    //     this.setData({
    //       showmodal: false,
    //       successPay: true,
    //     })
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
})