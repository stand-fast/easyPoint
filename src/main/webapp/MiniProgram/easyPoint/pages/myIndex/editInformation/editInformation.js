// pages/myIndex/editInformation/editInformation.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:null,
        check:null,
        grade:["16级","17级","18级","19级","20级"]
    },

    changePicker:function(e){
        var that=this
        that.setData({
            index:e.detail.value
        })
    },
    changeSex:function(e){
        var check=this.data.check;
        var cursex = e.currentTarget.dataset.index;
        if(check==null){
            this.setData({
                check:cursex
            })
        }
        else if(check==cursex){
            this.setData({
                check:null
            })
        }
        else if(check!=cursex){
            this.setData({check:cursex})
        }
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