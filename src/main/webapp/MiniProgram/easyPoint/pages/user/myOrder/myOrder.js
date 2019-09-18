// pages/user/myOrder/myOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currenTab:0,
        ticket_lists:[{
            type:"校友会包车",
            time:"2019-09-10 08:00",
            goAddress:"汕头",
            endAddress:"广州广金本部",
            ticketNum:1,
            payStatus:"已付款"
        }, {
                type: "校友会包车",
                time: "2019-09-10 08:00",
                goAddress: "汕头",
                endAddress: "广州广金本部",
                ticketNum: 1,
                payStatus: "已预约"
            }, {
                type: "旅游出行",
                time: "2019-01-10 09:00",
                goAddress: "广州广金本部",
                endAddress: "白云山",
                ticketNum: 42,
                payStatus: "已付款"
            }]
    },
    swichNav:function(e){
        var that = this;
        if (this.data.currenTab === e.currentTarget.dataset.current) {
            return false;
        }
        else {
            that.setData({
                currenTab: e.currentTarget.dataset.current,
            })
        }
    },
    toDetail:function(e){
        var index=e.currentTarget.dataset.index;
        if(this.data.ticket_lists[index].type=="校友会包车"){
            wx.navigateTo({
                url: '/pages/user/myOrderCarDetail/myOrderCarDetail?current=0',
            })
        }
        else if(this.data.ticket_lists[index].type=="旅游出行"){
            wx.navigateTo({
                url: '/pages/user/myOrderCarDetail/myOrderCarDetail?current=1',
            })
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