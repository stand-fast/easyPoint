// pages/easyPointCar/confirmTicket/confirmTicket.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentab:0,
        check:false,
        tickeType:"正式",
        radioStatus: false, 
        procheck: false,
        showmodal:false,
        successPay:false,
        ticketInfos:{
            startTime:"2019-07-01 08:30",
            startAdd:"广金广州本部",
            endAdd:"汕头",
            passbyName:"梨花",
            passbyPhone:"12345678910",
            ticketPrice:130,
            money:135
        }
    },
    radiochange: function (e) {
        var radioStatus = this.data.radioStatus;
        radioStatus = !radioStatus;
        this.setData({
            radioStatus: radioStatus
        })
    },
    proChange: function (e) {
        var procheck = this.data.procheck;
        procheck = !procheck;
        this.setData({
            procheck: procheck,
        })
    },
    //触发支付弹窗
    toPay:function(e){
        this.setData({
            showmodal:true,
        })
    },
    modal_click_Hidden: function () {       //隐藏弹框
        this.setData({
            showmodal: false,
        })
    },
    //发起支付功能
    confirmPay:function(){
        this.setData({
            showmodal:false,
            successPay:true,
        })
    },
    //支付后的确认
    successBtn:function(){
        this.setData({
            successPay:false,
        })
    },
    //显示保险详情
    insuDetail:function(){

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(this.data.currentab==1){
            this.setData({
                tickeType: "预约",
            })
        }
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