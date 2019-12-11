// pages/IdleAndRental/editInformation/editInformation.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      userInformation:{
        username: "广金吴彦祖",
        phone: "12345678910",
      }
    },
    clearName:function(e){
        this.setData({
            'userInformation.username':""
        })
    },
    clearPhone: function (e) {
        this.setData({
            'userInformation.phone': ""
        })
    },
    formSubmit: function (e) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        mydata: {
          name: e.detail.value.username,
          phone: e.detail.value.phone,
        }
      })
      wx.navigateBack({//返回
        delta: 1
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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