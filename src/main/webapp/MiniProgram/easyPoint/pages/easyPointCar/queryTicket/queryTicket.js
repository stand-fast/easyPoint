// pages/easyPointCar/queryTicket/queryTicket.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ticketLength:1,
        bgcolorZh:"#56b4f6",    //正式票颜色
        bgcolorYu:"#5697be",    //预约票颜色
        ticketInfos:[
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
  //判断是否填写个人信息
  requistPersonInformation: function () {
    var selt = this;
    var userInformation = wx.getStorageSync('userInformation');
    //console.log(userInformation);
    if (userInformation == "") {
      wx.showModal({
        title: '您尚未填写个人信息',
        content: '请点击确定开始填写个人信息',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/user/editInformation/editInformation?judge=' + "true",
            })
          }
        }
      })
    }
    else {
      return true
    }
  },
  buyTicket: function (res) {
    if (this.requistPersonInformation()){
      var type = parseInt(res.currentTarget.dataset.type);
      var index = parseInt(res.currentTarget.dataset.id);
      var ticketInfos = this.data.ticketInfos[index];
      //console.log(type);
      //console.log(ticketInfos);
      wx.setStorageSync('ticketInfos', ticketInfos);
      wx.navigateTo({
        url: '/pages/easyPointCar/confirmTicket/confirmTicket?type=' + type,
      })
    }
  },
    /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    var selt = this;
    console.log(options.associationId);
    //获得数据
    // wx.request({
    //   url: '接口路径',
    //   data: {
    //     associationId: options.associationId,   //根据同乡会名称请求车票数据
    //   },
    //   method: 'Post',
    //   header: { 'content-type': 'application/x-www-form-urlencoded' },
    //   success: function (res) {
    //     console.log(res.data)
    //     selt.setData({
    //       townsmen_association: res.data,
    //     })
    //   }
    // })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()//在标题栏中显示加载     
    //模拟加载        
    this.getMessage();    //更新数据
    wx.showToast({
      icon: 'loading',
      title: '正在刷新',
    })
    setTimeout(function () {
      wx.hideNavigationBarLoading()//完成停止加载      
      wx.stopPullDownRefresh()//停止下拉刷新 
    }, 1500);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})