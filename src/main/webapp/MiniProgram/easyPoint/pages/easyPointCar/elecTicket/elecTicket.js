// pages/easyPointCar/elecTicket/elecTicket.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      //接上服务器后删除
        carInfos:{
            tourism_id:"sdbchsdg3423das",
            departure_time:"2019-07-01 08:30",
            departure_place:"广东金融学院广州本部",
            destination:"广东金融学院肇庆校区",
            license_plate_number:"粤123456",
            vehicle_type:"53座豪华大巴车",
            color:"白色",
            driver_name:"梨花",
            driver_phone:"13245991240",
            username:"吴彦祖",
            phone: "13012938212",
            state: "未完成",
            make_order_time: "2019-07-01 14:42",
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that=this;
      // console.log(options.tourism_id);   //获取tourism_id
      // that.setDate({
      //   tourism_id: options.tourism_id
      // })
      // wx.request({
      //   url: '接口路径',
      //   header: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   method: "POST",
      //   data: {
      //     apply_id: app.globalData.open_id,
      //     tourism_id: this.data.tourism_id,
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