// pages/user/changeTime/changeTime.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current:1,
        dateTime: null, //开始时间value
        dateTimeArray: null, //开始时间数组
        selectTimeList: [
            "08-12 08:00",
            "08-13 08:00",
            "08-13 16: 00"
        ],
    },

    changeStartDateTime: function (e) {
        let arr = e.detail.value
        let dateArr = this.data.dateTimeArray;
        this.setData({
            startTime: dateArr[0][arr[0]].replace('年', '-') + dateArr[1][arr[1]].replace('月', '-') + dateArr[2][arr[2]].replace('日', ' ') + dateArr[3][arr[3]].replace("时", ":") + dateArr[4][arr[4]].replace('分', '')
        });
    },
    //某一列的值改变时触发
    changeDateTimeColumn: function (e) {
        let arr = this.data.dateTime
        let dateArr = this.data.dateTimeArray;
        arr[e.detail.column] = e.detail.value;
        this.setData({
            startTime: dateArr[0][arr[0]].replace('年', '-') + dateArr[1][arr[1]].replace('月', '-') + dateArr[2][arr[2]].replace('日', ' ') + dateArr[3][arr[3]].replace("时", ":") + dateArr[4][arr[4]].replace('分', '')
        });
    },

    selectTime: function (e) {
        var index = e.detail.value;
        var time = this.data.selectTimeList[index];
        this.setData({
            startTime:time
        })
    },

    submit:function(){
        var token = this.data.token;
        wx.request({
            url: "",
            data: {
                startTime:this.data.startTime
            },
            method: 'Post',
            header: { 'content-type': 'application/x-www-form-urlencoded', token },
            success: function (res) {

            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取完整的年月日 时分秒，以及默认显示的数组
        var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        // 精确到分的处理，将数组的秒去掉
        var lastArray = obj.dateTimeArray.pop();
        var lastTime = obj.dateTime.pop();
        //日期转换
        var data = obj.dateTimeArray;
        var name;
        for (var i = 0; i < data.length; i++) {
            switch (i) {
                case 0:
                    name = "年";
                    break;
                case 1:
                    name = "月";
                    break;
                case 2:
                    name = "日";
                    break;
                case 3:
                    name = "时";
                    break;
                case 4:
                    name = "分";
                    break;
            }
            for (var j = 0; j < data[i].length; j++) {
                data[i][j] = data[i][j] + name;
            }
        }
        
        var current=options.current

        this.setData({
            dateTimeArray: data,
            dateTime: obj.dateTime,
            current:current
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