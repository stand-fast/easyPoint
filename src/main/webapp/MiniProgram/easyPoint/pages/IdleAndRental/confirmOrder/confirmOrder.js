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
	goodDetails.allPrice = goodDetails.price*goodDetails.number*goodDetails.leaseDate+goodDetails.deposit*goodDetails.number
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
    wx.request({
        url: 'https://www.easypoint.club/miniProgram/lease/purchase',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
		  token
        },
        method: "POST",
        data: {
           userName: that.data.name,
           phone: that.data.phone,
		   goodId: that.data.good_details_info.goodId,
		   varietyId: that.data.good_details_info.itemId,
		   number: that.data.good_details_info.number,
		   leaseDate: that.data.good_details_info.leaseDate,
		   receiveTime: that.data.good_details_info.pickTime,
		   receive_address: "广金",
		   note: e.detail.value.note,
		   totalPrice: that.data.good_details_info.allPrice,
		   size: that.data.good_details_info.chooseSize
        },
        success: function (res) {
			let data = res.data.data
			let timeStamp = data.timeStamp + "";
			let packages = data.packages;
			let paySign = data.paySign;
			let nonceStr = data.nonceStr;
			let param = { 
				"timeStamp": timeStamp, 
				"package": packages, 
				"paySign": paySign, 
				"signType": "MD5", 
				"nonceStr": nonceStr,
			};
			that.pay(param);
        },
        fail:function(){
          wx.showToast({
            title: '支付失败！！！',//这里打印出登录成功
            icon: 'loading',
            duration: 2000
          })
          that.setData({
            showmodal_fail: true
          })
        }
      })
  },
  pay: function(param){
	  let that = this
	  wx.requestPayment({
	    timeStamp: param.timeStamp,
	    nonceStr: param.nonceStr,
	    package: param.package,
	    signType: param.signType,
	    paySign: param.paySign,
		success(res) {
			wx.showToast({
			  title: '支付成功！！！',//这里打印出登录成功
			  icon: 'success',
			  duration: 2000
			})
			that.setData({
			  showmodal_success: true
			})
		},
		fail(err) {{
			console.log(err)
			wx.showToast({
			    title: '支付失败！！！',//这里打印出登录成功
			    icon: 'loading',
			    duration: 2000
			  })
			  that.setData({
			    showmodal_fail: true
			  })
			}
		}
	  })
  },
  //支付成功弹窗
  successBtn:function(){
    this.setData({
        showmodal_success:false,
    })
	wx.navigateBack({
	  delta: 2  // 返回上一级页面。
	})
    // wx.redirectTo({
    //     url: '/pages/IdleAndRental/ldleRenIndex/ldleRenIndex',
    // })
  },
  //支付失败弹窗
  failBtn: function () {
    this.setData({
        showmodal_fail: false,
    })
  },
})