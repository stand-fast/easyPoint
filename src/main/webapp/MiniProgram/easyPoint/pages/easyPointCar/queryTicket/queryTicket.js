// pages/easyPointCar/queryTicket/queryTicket.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ticketLength:1,
        ticketType:"正式票",
        bgcolorZh:"#56b4f6",    //正式票颜色
        bgcolorYu:"#5697be",    //预约票颜色
        ticketInfos:[{
            starTime:"07-01 18:00",
            startAdd:"汕头",
            endAdd:"广金广州本部",
            ticketPrice:130,
            ticketNumber:23
        },
        {
            starTime: "07-01 18:00",
            startAdd: "汕头",
            endAdd: "广金广州本部",
            ticketPrice: 130,
            ticketNumber: 23
        }]
    },

    buyTicket:function(){
        wx.navigateTo({
            url: '/pages/easyPointCar/confirmTicket/confirmTicket',
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