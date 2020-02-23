// pages/easyPointCar/confirmTicket/confirmTicket.js
let app = getApp();
Page({
  data: {
    currentab:0,//车票种类1：正式票，2：预售票
    number:1,//预定票数
    radioStatus: false, //是否购买保险
    showmodal:false,//是否显示温馨提示窗口
    successPay:false,//是否显示支付成功后的窗口
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    let that = this;
    this.setData({
      currentab: options.type - 1,
    })
    let userInformation = wx.getStorageSync('userInformation');
    let ticketInfos = wx.getStorageSync('ticketInfos');
    ticketInfos.sumprice = ticketInfos.price * this.data.number
    this.setData({
      username: userInformation.username,
      phone: userInformation.phone,
      sumprice: ticketInfos.price,
      price: ticketInfos.price,
      ticketInfos: ticketInfos,
    })
  },
  onShow: function () {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页面
    let json = currPage.data.mydata;
    if (json != undefined) {
      this.setData({
        username: json.name,
        phone: json.phone,
      })
    }
  },
  //是否购买保险
  radiochange: function (e) {
    let radioStatus = this.data.radioStatus;
    this.setData({
        radioStatus: !radioStatus
    })
    let number = this.data.number;
    if (this.data.radioStatus==true){
      let sum=this.data.sumprice + 10 * number;
      this.setData({
        sumprice: sum,
        is_insurance:1,
        totalDeposit: number * 10,
      })
    } else {
      let sum = this.data.sumprice - 10 * number; 
      this.setData({
        sumprice: sum,
        is_insurance: 0,
      })
    }
  },
  //点击加号减号时候计算总价
  insuranceJudgment:function(){
    if (this.data.radioStatus == true) {
      this.setData({
        sumprice: this.data.number * this.data.price + 10 * this.data.number,
        totalDeposit: 10 * this.data.number,
      })
    } else {
      this.setData({
        sumprice: this.data.number * this.data.price,
      })
    }  
  },
  //点击减号
  getMin:function(e){    
      let min=this.data.number;
      let result=min-1;
      if(result<1){
          result=1
      }
      this.setData({
          number:result,
      })
      this.insuranceJudgment();
  },
  //点击加号
  getMax: function (e) {     
      let max = this.data.number;
	  let result
	  if(this.data.currentab!==0&&max+1>=5){
		result = 5;
		wx.showToast({
		  title: '最多只能预约5张哦',
		  icon:'none',
		  duration: 2000
		})
	  }else{
		result=max+1
	  }

      this.setData({
        number: result
      })
	  
      this.insuranceJudgment();
  },
  changeContact:function(){
      wx.navigateTo({
          url: '/pages/easyPointCar/changeContact/changeContact',
      })
  },
  //弹出温馨提示弹窗
  toPay:function(e){
    this.setData({
        showmodal:true,
    })
  },
  //隐藏温馨提示弹窗
  modal_click_Hidden: function () {       //隐藏弹框
    this.setData({
        showmodal: false,
    })
  },
  //发起支付功能
  confirmPay:function(){
    let that=this;
    let token = app.globalData.token;
	let url
	if(this.data.currentab===0){
		url='https://www.easypoint.club/miniProgram/association/addAdvanceOrder'
	}else{
		url='https://www.easypoint.club/miniProgram/association/orderAdvanceSaleTicket'
	}
    wx.request({
      url: url,
      header: {
        "Content-Type": "application/x-www-form-urlencoded", token
      },
      method: "POST",
      data: {
        ticketId: that.data.ticketInfos.ticketId,
		travelNum:this.data.number,
		passenger:this.data.username,
        // price: that.data.sumprice,
        // number:that.data.number,
        // isInsurance: that.data.radioStatus,
        // type: that.data.ticketInfos.type,
        // username: that.data.username,
        phone: that.data.phone,
      },
      success: function (res) {
		let pay = res.data
		console.log(pay)
		//发起支付 
		if(that.data.currentab===0){
			let timeStamp = pay.data.timeStamp + "";
			console.log(timeStamp)
			let packages = pay.data.packages;//统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
			let paySign = pay.data.paySign;//paySign = MD5(appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111) = 22D9B4E54AB1950F51E0649E8810ACD6
			let nonceStr = pay.data.nonceStr;//随机字符串，长度为32个字符以下
			let param = { "timeStamp": timeStamp, "package": packages, "paySign": paySign, "signType": "MD5", "nonceStr": nonceStr };
			that.pay(param);
		}else{
			//弹出支付成功弹窗
			that.setData({
			  showmodal: false,
			  successPay: true,
			})
		}
      },
      fail:function(res){
        if (that.data.currentab==1){
          if(res.data.status == 1){
            wx.showToast({
              title: '支付失败,剩余票数不足',
              icon: 'loading',
              duration: 2000
            })
          }
        }else{
          if (res.data.status == 1) {
            wx.showToast({
              title: '预约失败,剩余票数不足',
              icon: 'loading',
              duration: 2000
            })
          }
        }
      },
    })
    
    //接上服务器后删除
    // this.setData({
    //     showmodal:false,
    //     successPay:true,
    // })
  },
  //支付后的确认
  successBtn:function(){
    this.setData({
        successPay:false,
    })
  },
  //支付
  pay: function (param) {
	let that=this
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
		that.setData({
		    showmodal: false,
		})
      },
      fail: function (res) {
		wx.showToast({
		  title: '支付失败',
		  icon:'none',
		  duration: 2000
		})
		that.setData({
		    showmodal: false,
		})
      },
      complete: function (res) {
        console.log("pay complete");
      }
    })
  },
})