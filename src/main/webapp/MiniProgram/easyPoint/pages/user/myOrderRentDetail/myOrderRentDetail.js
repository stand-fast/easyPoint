// pages/user/myOrderRentDetail/myOrderRentDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        rentDetail:{
            orderId:12345678910,
            orderTime:"2019-11-09 17:30",
            shopName:"易点直营店",
            goodName: "随身携带可充电荧光灯带哈哈哈",
            goodPrice: 30,
            goodDeposit:100,
            goodDecription: "五十米长我算到这里就应该是二十了吧哈哈哈到可以",
            goodNumber: 2,
            orderStatus: "未完成",
            takeGoodTime:"2019-11-10 19:00",
            goodRentTime:1,
            hostNote:"麻烦附上充电器"
        },
        hostItem:{
            orderHostName:"吴彦祖",
            orderHostPhone:12345678910
        }
    },
    jumpToRefund:function(){
        wx.navigateTo({
            url: '/pages/user/refund/refund',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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