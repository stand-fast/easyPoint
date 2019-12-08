// pages/user/myOrder/myOrder.js
const app = getApp()
Page({
  data: {
    currenTab: 0,//显示选项卡栏目部分
    ruralCommittee: [//乡会包车部分假数据
      {
        ticketId: 623123513,
        departureTime: "2019-09-10 08:00",
        departurePlace: "汕头",
        destination: "广州广金本部",
        ticketNum: "10",
        type: "1",
      },
      {
        ticketId: 12357568583,
        departureTime: "2019-09-10 18:00",
        departurePlace: "汕头",
        destination: "广州广金本部",
        ticketNum: "5",
        type: "2",
      }, 
    ],
    ticket_lists: [    //租车部分假数据
      {
          tourismId:"123123123123",
          departureTime: "2019-01-10 09:00",
          departurePlace: "广州广金本部",
          destination: "白云山",
          travelNum: "22",
      },
      {
          tourismId: "123123123123123112541",
          departureTime: "2019-01-10 09:00",
          departurePlace: "广州广金本部",
          destination: "白云山",
          travelNum: "42",
      }
    ],
    rentItems: [//租借部分假数据
      {
            goodName:"随身携带可充电荧光灯带哈哈哈",
            goodPrice:30,
            goodDecription:"五十米长我算到这里就应该是二十了吧哈哈哈到可以",
            goodNumber:2,
            orderStatus:"未完成"
      },
      {
            goodName: "超级好用的音响",
            goodPrice: 150,
            goodDecription: "蓝牙无线连接",
            goodNumber: 1,
            orderStatus: "押金已退还"
      }
    ]
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    var type = options.type;
    this.getMessage(type);
  },
  //切换选项卡，并请求数据
  swichNav:function(e){
    if (this.data.currenTab === e.currentTarget.dataset.current) {
        return false;
    }
    else {
        var type = e.currentTarget.dataset.current;
        //this.getMessage(type);           //根据type请求数据，出行0，教育1，租借2
        this.setData({
            currenTab: type,
        })
    }
  },
  //跳转乡会包车车票详情数据-暂时不动
  toCommitteeDetail: function (e) {
    var index = e.currentTarget.dataset.index;
    var data = this.data.ruralCommittee[index];
    wx.setStorageSync('myOrderRentalCar', data)
    wx.navigateTo({
      url: '/pages/user/myOrderCarDetail/myOrderCarDetail?current=0&&ticketId=' + data.ticketId + "&&type=" + data.type,
    }) 
  },
  //跳转租车车票详情数据
  toDetail:function(e){
    var index=e.currentTarget.dataset.index;
    var data = this.data.ticket_lists[index];
    wx.setStorageSync('myOrderRentalCar', data)
    wx.navigateTo({
      url: '/pages/user/myOrderCarDetail/myOrderCarDetail?current='+'1'
    })
  },
  //跳转租借车票详情数据-暂时不动
  jumpToRentDetail:function(e){
    var index = e.currentTarget.dataset.index;
    var data = this.data.rentItems[index];
    wx.setStorageSync('myOrderRental', data)
    wx.navigateTo({
        url: '/pages/user/myOrderRentDetail/myOrderRentDetail?current=2&&rentOrderId=' + data.rentOrderId,
    })
  },
  //获得我的订单出行数据
  getMessage: function (type) {
    var selt = this;
    var token = app.globalData.token;
    wx.request({
      url: app.globalData.requestUrl+'findTravelOrder',
      method: 'get',
      header: { 'content-type': 'application/x-www-form-urlencoded',token},
      success: function (res) {
        //console.log(res);
        if (res.header.token != undefined){
          app.globalData.token = res.header.token;
        }
        if(res.data.code == 200){
          console.log(res.data.data)
          selt.setData({
            ticket_lists: res.data.data,
          })
        } else if (res.data.code == 201) {
          console.log("暂无订单");
        } else if (res.data.code == 501){
          wx.showToast({
            title: '登录已经过期，请重新授权登录',
            icon:"none"
            })
          } 
        }
      })
  },
})