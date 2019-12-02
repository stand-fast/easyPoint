// pages/user/myOrder/myOrder.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      currenTab:0,
      ruralCommittee:[
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
    ticket_lists:[   
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
    rentItems:[{
            goodName:"随身携带可充电荧光灯带哈哈哈",
            goodPrice:30,
            goodDecription:"五十米长我算到这里就应该是二十了吧哈哈哈到可以",
            goodNumber:2,
            orderStatus:"未完成"
        },{
            goodName: "超级好用的音响",
            goodPrice: 150,
            goodDecription: "蓝牙无线连接",
            goodNumber: 1,
            orderStatus: "押金已退还"
        }
    ]
    },
    swichNav:function(e){
        var that = this;
        if (this.data.currenTab === e.currentTarget.dataset.current) {
            return false;
        }
        else {
            var type = e.currentTarget.dataset.current;
            //this.getMessage(type);           //根据type请求数据，出行0，教育1，租借2
            that.setData({
                currenTab: type,
            })
        }
    },
    toCommitteeDetail: function (e) {
      var index = e.currentTarget.dataset.index;
      var data = this.data.ruralCommittee[index];
      wx.setStorageSync('myOrderRentalCar', data)
      wx.navigateTo({
        url: '/pages/user/myOrderCarDetail/myOrderCarDetail?current=0&&ticketId=' + data.ticketId + "&&type=" + data.type,
      }) 
    },
    toDetail:function(e){
        var index=e.currentTarget.dataset.index;
        var data = this.data.ticket_lists[index];
        wx.setStorageSync('myOrderRentalCar', data)
        wx.navigateTo({
          url: '/pages/user/myOrderCarDetail/myOrderCarDetail?current=1&&travelOrderId=' + data.travelOrderId,
        })
    },
    jumpToRentDetail:function(e){
        var index = e.currentTarget.dataset.index;
        var data = this.data.rentItems[index];
        wx.setStorageSync('myOrderRental', data)
        wx.navigateTo({
            url: '/pages/user/myOrderRentDetail/myOrderRentDetail?current=2&&rentOrderId=' + data.rentOrderId,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    var obj = wx.getStorageSync("token");
    this.setData({
      token: obj.token,
    })
      var type=options.type;
      this.getMessage(type);
    },
    //获得我的订单出行数据
    getMessage: function (type) {
      var selt = this;
      var token = this.data.token;
      wx.request({
        url: app.globalData.requestUrl+'findTravelOrder',
        method: 'get',
        data:{
          uid: app.globalData.uid,
        },
        header: { 'content-type': 'application/x-www-form-urlencoded',token},
        success: function (res) {
          //console.log(res);
          if (res.header.token != undefined){
           let obj = wx.getStorageSync("token");
            obj.token = res.header.token;
            wx.setStorageSync("token", obj)
          }
          if(res.data.code == 200){
            console.log("查询用户的出行订单成功");
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