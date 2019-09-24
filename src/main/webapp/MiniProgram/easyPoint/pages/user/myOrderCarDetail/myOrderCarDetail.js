// pages/user/myOrderCarDetail/myOrderCarDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current:"0",
        driverInfos:{
            driverName:"王司机",
            driverPhone:"12345678910",
            driverCarNumber:"粤A12345（白色）"
        },
      ticketDetail:{
          ticket_id:"121312312",
          departurePlace:"汕头",
          destination:"广金广州本部",
          departureTime:"2019-08-10 08:00",
          price:130,
          isInsurance:"0",
          passengers:[{
              name:"吴彦祖",
              phone:"12345678910"
          },{
              name:"梁朝伟",
              phone:"12345678910"
          }],
        ticketNum: 2,

        //departurePlace: "汕头",
        //destination: "广金广州本部",
        //departureTime: "2019-08-10 08:00",
        deposit: 1000,
        // passengers: [{
        //   name: "吴彦祖",
        //   phone: "12345678910"
        // }, {
        //   name: "梁朝伟",
        //   phone: "12345678910"
        // }],
        travelNum: 22,
      }
    }, 
    applyRefund:function(){
        wx.navigateTo({
            url: '/pages/user/refund/refund',
        })
    },
    changeTime:function(){
        wx.navigateTo({
            url: '',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var current = options.current;
        if(current==0){
          var ticketId = options.ticketId;
          console.log(ticketId);
        }
        else if (current==1){
          var tourismId=options.tourismId;
          console.log(tourismId)
          this.setData({
            current: 1
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