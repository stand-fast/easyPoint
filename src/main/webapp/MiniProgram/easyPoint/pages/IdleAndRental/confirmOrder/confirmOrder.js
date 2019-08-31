// pages/IdleAndRental/confirmOrder/confirmOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showmodal_success:false,
        showmodal_fail:false,
        userInformation:"",
        good_details_info:{
            // companyName:"小玖正装",
            // img:"/images/goodImg.png",
            // price:30,
            // deposit:120,
            // leaseDate:3,
            // variety:"女士正装全套",
            // size:"M",
            // number:2,
            // startTime:"2019-8-19 10:00"
        },
    },
    toEdit:function(){
        wx.navigateTo({
          url: '/pages/IdleAndRental/editInformation/editInformation',
        })
    },
    //调起支付功能
    formSubmit:function(e){
      // wx.request({
      //     url: '接口路径',
      //     header: {
      //       "Content-Type": "application/x-www-form-urlencoded"
      //     },
      //     method: "POST",
      //     data: {
      //        openId: app.globalData.openId,
      //        username: that.data.userInformation.username,
      //        phone: that.data.userInformation.phone,
      //        companyName: that.data.good_details_info.companyName,
      //        deposit: that.data.good_details_info.deposit,
      //        img: that.data.good_details_info.img,
      //        leaseDate: that.data.good_details_info.leaseDate,
      //        number: that.data.good_details_info.number,
      //        price: that.data.good_details_info.price,
      //        variety: that.data.good_details_info.variety,
      //        size: that.data.good_details_info.size,
      //        startTime: that.data.good_details_info.startTime,
      //        note: e.detail.value.note,
      //     },
      //     success: function (res) {
      //       console.log(res.data);
      //         wx.showToast({
      //           title: '支付成功！！！',//这里打印出登录成功
      //           icon: 'success',
      //           duration: 2000
      //         })
      //         that.setData({
      //           showmodal_success: true
      //         })
      //     },
      //     fail:function(){
      //       wx.showToast({
      //         title: '支付失败！！！',//这里打印出登录成功
      //         icon: 'loading',
      //         duration: 2000
      //       })
      //       that.setData({
      //         showmodal_fail: true
      //       })
      //     }
      //   })

        //接上服务器后删除
        this.setData({
            showmodal_success:true
        })
    },
    successBtn:function(){
        this.setData({
            showmodal_success:false,
        })
        wx.redirectTo({
            url: '/pages/IdleAndRental/ldleRenIndex/ldleRenIndex',
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
      // 获取顾客姓名以及联系方式
      var userInformation = wx.getStorageSync('userInformation');
      this.setData({
        userInformation: userInformation,
      })
    
      var goodDetails=wx.getStorageSync("goodDetails");
      console.log(goodDetails[0])
      this.setData({
        good_details_info:goodDetails[0]
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
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      let json = currPage.data.mydata;
      if (json==undefined){
      }
      else{
        console.log(json)//为传过来的值
        this.setData({
          userInformation: json,
        })
      }
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