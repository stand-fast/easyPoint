// pages/easyPointCar/queryTicket/queryTicket.js
var judgePersonInfor = require('../../../utils/judgePersonInfor.js');//判断是否填写有个人信息
var app = getApp();
Page({
  data: {
    ticketLength:1,//不为0时候显示车票数据，为零时候显示没有车票信息
    bgcolorZh:"#56b4f6",    //正式票颜色
    bgcolorYu:"#5697be",    //预约票颜色
    ticketInfos:[//车票数据
      {   
          ticketId:"32ASD3",
          departureTime:"07-01 18:00",
          departurePlace:"汕头",
          destination:"广金广州本部",
          price:130,
          seatSurplus:23,
          type:1
      },
      {
          ticketId: "32hjfsdfs123",
          departureTime: "07-01 18:00",
          departurePlace: "汕头",
          destination: "广金广州本部",
          price: 130,
          seatSurplus: 23,
          type: 2
      },
    ],
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    this.setData({
      id: options.associationId
    })
    //this.getTicketMessage();
  },
  //跳转车票详情页面
  buyTicket: function (res) {
    if (judgePersonInfor.judege()){
      var type = parseInt(res.currentTarget.dataset.type);
      var index = parseInt(res.currentTarget.dataset.id);
      var ticketInfos = this.data.ticketInfos[index];
      wx.setStorageSync('ticketInfos', ticketInfos);
      wx.navigateTo({
        url: '/pages/easyPointCar/confirmTicket/confirmTicket?type=' + type,
      })
    }
  },
  //模拟下拉加载
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()//在标题栏中显示加载     
    //模拟加载        
    this.getTicketMessage();    //更新数据
    wx.showToast({
      icon: 'loading',
      title: '正在刷新',
    })
    setTimeout(function () {
      wx.hideNavigationBarLoading()//完成停止加载      
      wx.stopPullDownRefresh()//停止下拉刷新 
    }, 1500);
  },
  //请求车票数据
  getTicketMessage:function(id){
    let token = app.globalDate.token;
    wx.request({
      url: '接口路径',
      data: {
        associationId: this.data.id,   //根据同乡会名称请求车票数据
      },
      method: 'Post',
      header: { 'content-type': 'application/x-www-form-urlencoded', token },
      success: function (res) {
        let code = res.data.code;
        if (res.header.token != undefined) {
          app.replaceToken(res.header.token);
        }
        switch (code) {
          case 200:
            that.setData({
              townsmen_association: res.data,
            })
            break;
          case 501:
            app.getPermission();
            break;
        }
      }
    })
  }
})