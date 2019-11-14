// pages/user/refund/refund.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        success:false,
    },
  formSubmit: function (e) {     //提交退款申请
    var token = this.data.token;
    var selt = this;
    if (e.detail.value.reason==""){
      wx.showToast({
        title: '退款理由不能为空',
        icon: 'none',
        duration: 2000
      })
    }else{
      console.log(app.globalData.uid);
      wx.request({
        url: app.globalData.requestUrl + 'tourismRefund',
        method: 'Post',
        data: {
          travelOrderId: selt.data.travelOrderId,
          refundReason: e.detail.value.reason,
          uid:app.globalData.uid,
        },
        header: { 'content-type': 'application/x-www-form-urlencoded', token },
        success: function (res) {
          var code = res.data.code;
          if (code == 200) {
            wx.showToast({
              title: '申请成功，请耐心等待管理员确认',
            })
          } else if (code == 400) {
            wx.showToast({
              title: '申请异常，可联系管理员',
              icon: 'none',
              duration: 2000
            })
          }else if (code == 401){
            wx.showToast({
              title: '申请失败，请确保您为该订单的所属者',
              icon: 'none',
              duration: 2000
            })
          } else if (code == 402) {
            wx.showToast({
              title: '该订单退款正等待管理员处理中，请耐心等待',
              icon: 'none',
              duration: 2000
            })
          } else if (code == 403) {
            wx.showToast({
              title: '该订单已退款成功，此次申请失败',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },
  trueBtn:function(){
        this.setData({
            success: false
        })
        // wx.switchTab({
        //     url: '/pages/user/user/user',
        // })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var obj = wx.getStorageSync("token");
      this.setData({
        token: obj.token,
        travelOrderId: options.travelOrderId
      })
      this.getRefundMessage(options.travelOrderId)
    },
  //获得租车退款理由
  getRefundMessage: function (travelOrderId) {
    var token = this.data.token;
    var selt = this;
    wx.request({
      url: app.globalData.requestUrl + 'findTravelOrderDetailInfo',
      method: 'Post',
      data: {
        type:0,
        travelOrderId: travelOrderId,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded', token },
      success: function (res) {
        // console.log(res)
        if (res.data.code == 200) {
          console.log("查询出行订单详情成功");
          console.log(res.data.data.refundReason)
          selt.setData({
            reason: res.data.data.refundReason,
          })
        }
      }
    })
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