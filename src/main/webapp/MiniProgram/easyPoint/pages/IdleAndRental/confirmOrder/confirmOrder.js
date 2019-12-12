// pages/IdleAndRental/confirmOrder/confirmOrder.js
let getUserInformation = require('../../../component/userInfor/getUserInfor.js');//获取个人信息
let app = getApp();
Page({
  data: {
    showmodal_success:false,//是否显示支付成功弹窗
    showmodal_fail:false,//是否显示支付失败弹窗
    good_details_info:{},//商品详情数据
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    var goodDetails = wx.getStorageSync("goodDetails");
    console.log(goodDetails)
    this.setData({
      name: getUserInformation.name,
      phone: getUserInformation.phone,
      good_details_info: goodDetails
    })
  },
  //获取临时联系人的信息
  onShow: function () {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let json = currPage.data.mydata;
    if (json != undefined) {
      this.setData({
        name: json.name,
        phone: json.phone,
      })
    }
  },
  //跳转临时联系人页面
  toEdit:function(){
    wx.navigateTo({
      url: '/pages/IdleAndRental/editInformation/editInformation',
    })
  },
  //调起支付功能
  formSubmit:function(e){
    let that = this;
    let token = app.globalData.token;
    // wx.request({
    //     url: '接口路径',
    //     header: {
    //       "Content-Type": "application/x-www-form-urlencoded",token
    //     },
    //     method: "POST",
    //     data: {
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
  //支付成功弹窗
  successBtn:function(){
    this.setData({
        showmodal_success:false,
    })
    wx.redirectTo({
        url: '/pages/IdleAndRental/ldleRenIndex/ldleRenIndex',
    })
  },
  //支付失败弹窗
  failBtn: function () {
    this.setData({
        showmodal_fail: false,
    })
  },
})