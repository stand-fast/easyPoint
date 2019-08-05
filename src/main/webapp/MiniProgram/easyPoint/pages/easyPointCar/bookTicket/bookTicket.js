// pages/easyPointCar/bookTicket/bookTicket.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        money:1000,
        dateTime1: null, //开始时间value
        dateTimeArray1: null, //开始时间数组
        select:false,
        check:false,
        atselect:false,
        insucheck:false,
        radioStatus: false, 
        successShowmodal:false,
        imgUrls: [
            "/images/ad.png",
            "/images/circle1.png",
            "/images/circle2.png"
        ],
        associations:["汕头同乡会","潮州同乡会","普宁同乡会"],
        seatNumber: ["35座大巴", "49座大巴", "53座大巴","57座大巴"]
    },
    modal_click_Hidden: function () {       //隐藏弹框
        this.setData({
            successShowmodal: false,
        })
    },

    swichNav: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current){
            return false;
        }
        else {
            that.setData({
                currentTab:e.target.dataset.current,
            })
        }
    },
    //是否往返选择
    radiochange: function (e) {
        var radioStatus = this.data.radioStatus;
        radioStatus = !radioStatus;
        this.setData({
            radioStatus: radioStatus
        })
    },
    //是否同意协议
    checkChange:function(e){
        var check = this.data.check;
       check = !check;
        this.setData({
            check:check
        })
    },
    //是否购买保险
    insuChange:function(e){
        var insucheck=this.data.insucheck;
        insucheck=!insucheck;
        this.setData({
            insucheck:insucheck,
        })
    },
    //出发时间
    changeStartDateTime:function(e) {
        let arr = e.detail.value
        let dateArr = this.data.dateTimeArray1;
        this.setData({
            startTime: dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]]
        });
    },
    //某一列的值改变时触发
    changeDateTimeColumn1:function(e) {
        let arr = this.data.dateTime1
        let dateArr = this.data.dateTimeArray1;
        arr[e.detail.column] = e.detail.value;
        this.setData({
            startTime: dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]]
        });
    },
    //返回时间
    changereturnDateTime:function(e) {
        let arr = e.detail.value
        let dateArr = this.data.dateTimeArray1;
        this.setData({
            returnTime: dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]]
        });
        //验证开始时间不能大于结束时间
        this.checkStartAndEndTime();
    },
    changeDateTimeColumn1:function(e) {
        let arr = this.data.dateTime1
        let dateArr = this.data.dateTimeArray1;
        arr[e.detail.column] = e.detail.value;
        this.setData({
            startTime: dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]]
        });
    },

//下拉框
  bindShowMsg:function(){
        this.setData({
            select: !this.data.select,
        })
    },
    mySelect:function(e) {
        var name = e.currentTarget.dataset.name
        this.setData({
            carType: name,
            select: false
        })
    },
    showAsso: function () {
        this.setData({
            atselect: !this.data.atselect,
        })
    },
    selectName: function (e) {
        var name = e.currentTarget.dataset.name
        this.setData({
            assoName: name,
            atselect: false
        })
    },
    //提交拉起支付功能
    toPay:function(e){
        this.setData({
            successShowmodal: true,
        })
    },

    //转到电子订单详情 
    successBtn:function(){
        wx.navigateTo({
            url: '/pages/easyPointCar/elecTicket/elecTicket',
        })
    },
    //转到车票查询
    searchAsso:function(){
        wx.navigateTo({
            url: '/pages/easyPointCar/queryTicket/queryTicket',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取完整的年月日 时分秒，以及默认显示的数组
        var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        // 精确到分的处理，将数组的秒去掉
        var lastArray = obj1.dateTimeArray.pop();
        var lastTime = obj1.dateTime.pop();
        this.setData({
            dateTimeArray1: obj1.dateTimeArray,
            dateTime1: obj1.dateTime,
        });
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