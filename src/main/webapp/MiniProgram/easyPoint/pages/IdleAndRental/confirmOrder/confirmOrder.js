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
            provider:"小玖正装",
            goodImg:"/images/goodImg.png",
            goodPrice:30,
            cashPledge:100,
            rendDays:3,
            goodType:"女士正装全套",
            goodSize:"M",
            goodNumber:2,
            takeTime:"2019-8-19 10:00"
        }
    },
    toEdit:function(){
        wx.navigateTo({
            url: '',
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