// pages/user/myOrder/myOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currenTab:0,
        ticket_lists:[
        {
            ticketId: 12357568583,
            departureTime:"2019-09-10 08:00",
            departurePlace:"汕头",
            destination:"广州广金本部",
            ticketNum:"12",
            type:"1",
        }, 
        {
          ticketId: 12357568583,
          departureTime: "2019-09-10 18:00",
          departurePlace: "汕头",
          destination: "广州广金本部",
          ticketNum: "5",
          type: "2",
        }, 
        {
          tourismId:"123123123123",
          departureTime: "2019-01-10 09:00",
          departurePlace: "广州广金本部",
          destination: "白云山",
          travelNum: "22",
          state: "1"
        },
        {
          tourismId: "123123123123",
          departureTime: "2019-01-10 09:00",
          departurePlace: "广州广金本部",
          destination: "白云山",
          travelNum: "42",
          state: "2"
        }
    ]
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
        var data = this.data.ticket_lists[index];
        if (data.ticketNum==true){
            wx.navigateTo({
                url: '/pages/user/myOrderCarDetail/myOrderCarDetail?current=0',
            })
        }
        else{
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