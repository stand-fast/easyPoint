// pages/easyPointCar/elecTicket/elecTicket.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      //接上服务器后删除
        carInfos:{
            tourismId:"sdbchsdg3423das",
            departureTime:"2019-07-01 08:30",
            departurePlace:"广东金融学院广州本部",
            destination:"广东金融学院肇庆校区",
            licensePlateNumber:"粤123456",
            vehicleType:"53座豪华大巴车",
            color:"白色",
            driverName:"梨花",
            driverPhone:"13245991240",
            username:"吴彦祖",
            phone: "13012938212",
            state: "未完成",
            makeOrderTime: "2019-07-01 14:42",
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that=this;
      // console.log(options.tourism_id);   //获取tourism_id
      // that.setDate({
      //   tourismId: options.tourism_id
      // })
      // wx.request({
      //   url: '接口路径',
      //   header: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   method: "POST",
      //   data: {
      //     openId: app.globalData.openId,
      //     tourismId: this.data.tourismId,
      //   },
      //   success: function (res) {
      //     console.log(res.data);
      //     that.setDate({
      //       carInfos:res.data,
      //     })
      //   }
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