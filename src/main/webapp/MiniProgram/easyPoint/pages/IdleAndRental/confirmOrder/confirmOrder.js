// pages/IdleAndRental/confirmOrder/confirmOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        customerName:"广金吴彦祖",
        customerPhone:"13060638922",
        showmodal_success:false,
        showmodal_fail:false,
        good_details_info:{
            companyName:"小玖正装",
            img:"/images/goodImg.png",
            price:30,
            deposit:120,
            leaseDate:3,
            variety:"女士正装全套",
            size:"M",
            number:2,
            startTime:"2019-8-19 10:00"
        }
    },
    toEdit:function(){
        wx.navigateTo({
          url: '/pages/IdleAndRental/editInformation/editInformation',
        })
    },
    //调起支付功能
    toPay:function(e){
        this.setData({
            showmodal_success:true
        })
    },
    successBtn:function(){
        this.setData({
            showmodal_success:false,
        })
    },
    failBtn: function () {
        this.setData({
            showmodal_fail: false,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var goodDetails=wx.getStorageSync("goodDetails");
      console.log(goodDetails[0])
      this.setData({
        good_details_info:goodDetails[0]
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