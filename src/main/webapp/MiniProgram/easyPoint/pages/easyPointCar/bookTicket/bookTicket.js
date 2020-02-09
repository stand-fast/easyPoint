 // pages/easyPointCar/bookTicket/bookTicket.js
let dateTimePicker = require('../../../component/selectTime/dateTimePicker.js');//获取开始时间控件、开始时间数组
let timePicker = require('../../../component/selectTime/timePicker.js');//时间选择控件
let getUserInformation = require('../../../component/userInfor/getUserInfor.js');//获取个人信息
let judgePersonInfor = require('../../../component/userInfor/judgePersonInfor.js');//判断是否填写有个人信息
const app = getApp()
Page({
  data: {
    currentTab: 0,//选项卡0：旅游出行，1：校友会包车
    dateTimeArray: null,//时间控件-开始时间数组
    money: 0,//旅游出行-定金
    insucheck: false,//旅游出行-是否购买保险
    radioStatus: false,//旅游出行-是否往返
    successShowmodal:false,//支付成功是否弹窗
    is_back:0,//是否往返数据
    is_insurance:0,//是否购买保险数据
    imgUrls: [//轮播图
      "/images/bg1_car.png",
      "/images/bg2_car.png"
    ],
    associationsList: [//同乡会名称数据
      {
        associationId: "12312",
        associationName:"汕头同乡会"
      },
      {
        associationId: "6423123123",
        associationName: "潮州同乡会"
      },
      {
        associationId: "54386673123123",
        associationName: "普宁同乡会"
      },
    ],
    seatvehicleList:null, //车辆类型数据
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    this.getMessage();   //获取车票类型数据
    this.getCommitteeMessage()  //获取同乡会名称数据
    this.timeSelection();//时间选择控件
  },
  getCommitteeData:function(){
	  //同乡会数据处理，接上服务器后删除
	  let associations = this.data.associationsList;
	  let associationsName = [];
	  for (let i = 0; i < associations.length; i++) {
	    associationsName.push(associations[i].associationName)
	  }
	  this.setData({
	    associations: associationsName,
	  })
  },
  //请求车辆类型数据以及对应应付定金
  getMessage: function () {
    let that = this;
    let token = app.globalData.token;
    wx.request({
      url: app.globalData.requestUrl + 'findAllVehicleType',
      method: 'Post',
      header: { 'content-type': 'application/x-www-form-urlencoded', token },
      success: function (res) {
        let code = res.data.code;
        if (res.header.token != undefined) {
          app.replaceToken(res.header.token);
        }
        switch(code){
          case 200:
            let seatvehicle = res.data.data;
            let seatNumber = [];
            let seatDeposit = [];
            for (let i = 0; i < seatvehicle.length; i++) {
              seatNumber.push(seatvehicle[i].vehicleType)
              seatDeposit.push(seatvehicle[i].deposit);
            }
            that.setData({
              seatvehicleList: seatvehicle,
              seatNumber: seatNumber,
              seatDeposit: seatDeposit
            })
            break;
          case 501:
            app.getPermission();
            break;
        }
      }
    })
  },
  //请求同乡会名称数据
  getCommitteeMessage: function () {
    let token = app.globalData.token;
	let that=this
    wx.request({
      url: 'https://www.easypoint.club/miniProgram/findAllAssociations',
      method: 'get',
      header: { 'content-type': 'application/x-www-form-urlencoded', token },
      success: function (res) {
        console.log(res.data)
        let associations = res.data;
        let associationsName = [];
        for (let i = 0; i < associations.length; i++) {
          associationsName.push(associations[i].associationName)
        }
        that.setData({
          associationsList: res.data.data,
          associations: associationsName,
        })
		that.getCommitteeData()
      }
    })
  },
  //初始化时间选择控件-获取时间数组以及当下时间
  timeSelection:function(){
    let timeData = dateTimePicker.timeSelection();
    let dateTimeArray = timeData[0];
    let getStartTime = timeData[1];
    this.setData({
      dateTimeArray,
      getStartTime
    });
  },
  //支付成功弹窗
  modal_click_Hidden: function () {       //隐藏弹框
    this.setData({
        successShowmodal: false,
    })
    wx.navigateTo({
      url: '/pages/user/myOrder/myOrder',
    })
  },
  //选项卡切换
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current){
      return false;
    }
    else {
      that.setData({
          currentTab:e.target.dataset.current,
      })
    }
  },
  //判断是否往返选择
  radiochange: function (e) {
    let radioStatus = !this.data.radioStatus;
    if (radioStatus == true) {
      this.setData({
        is_back: 1,
        radioStatus: radioStatus,
        money:this.data.money * 2,
      })
    }else{
      this.setData({
        is_back: 0,
        radioStatus: radioStatus,
        money: this.data.money / 2,
      })
    }
  },
  //选择车辆类型
  changeSeatType:function(e){
    let index = e.detail.value;
    let vehicleId = this.data.seatvehicleList[index].vehicleId
      this.setData({
          carType:this.data.seatNumber[index],
          money: this.data.seatDeposit[index],
          vehicleId: vehicleId,
      })
  },
  //出发时间
  changeStartDateTime: function (e) {
    this.setData({
      startTime: timePicker.picker(e.detail.value, this.data.dateTimeArray)
    });
  },
  //返回时间选择控件
  changereturnDateTime:function(e) {
    this.setData({
      returnTime: timePicker.picker(e.detail.value, this.data.dateTimeArray)
    });
  },
  //是否购买保险
  insuChange: function (e) {
    let insucheck = this.data.insucheck;
    this.setData({
      insucheck: !insucheck,
    })
    if (insucheck == true) {
      this.setData({
        is_insurance: 0,
      })
    } else {
      this.setData({
        is_insurance: 1,
      })
    }
  },
  //选择同乡会名称
  selectAssoName: function (e) {
    let index = e.detail.value;
    let name=this.data.associationsList[index].associationName;
    let associationId = this.data.associationsList[index].associationId;
    //判断车票类型
    this.setData({
          assoName: name,
          associationId: associationId,
    })
  },
  //同乡会-跳转到车票查询
  searchAsso:function(){
      if (this.data.assoName==""){
        wx.showToast({
          title: '请选择同乡会',
          icon: 'none',
          duration: 2000
        })
      }
      else(
        wx.navigateTo({
          url: '/pages/easyPointCar/queryTicket/queryTicket?associationId=' + this.data.associationId
        })
      )
  },
  //提交拉起支付功能
  formSubmit: function (e) {
    let that = this;
    let token = app.globalData.token;
    if (token) {
      if (judgePersonInfor.judege()) {
        if (e.detail.value.startAddress == "") {
          wx.showToast({
            title: '请输入出发地点',
            icon: 'none',
            duration: 2000
          })
        }
        else if (e.detail.value.endAddress == "") {
          wx.showToast({
            title: '请输入目的地',
            icon: 'none',
            duration: 2000
          })
        }
        else if (e.detail.value.startAddress == e.detail.value.endAddress) {
          wx.showToast({
            title: '出发地不能与终点一致',
            icon: 'none',
            duration: 2000
          })
        }
        else if (e.detail.value.perNumbers == "") {
          wx.showToast({
            title: '请输入出行人数',
            icon: 'none',
            duration: 2000
          })
        }
        else if (this.data.carType == undefined) {
          wx.showToast({
            title: '请选择车辆类型',
            icon: 'none',
            duration: 2000
          })
        }
        else if (this.data.startTime == undefined) {
          wx.showToast({
            title: '请输入出发日期',
            icon: 'none',
            duration: 2000
          })
        }
        else {
          if (this.data.radioStatus == true) {
            if (this.data.returnTime == undefined) {
              wx.showToast({
                title: '请输入返回日期',
                icon: 'none',
                duration: 2000
              })
            }
          }
          wx.request({
            url: app.globalData.requestUrl +'orderTourismOrder',
            data: {
              passenger: getUserInformation.name,
              phone: getUserInformation.phone,
              departurePlace: e.detail.value.startAddress,
              destination: e.detail.value.endAddress,
              travelNum: e.detail.value.perNumbers,
              vehicleId: that.data.vehicleId,
              departureTime: that.data.startTime,
              type: 0,
              ifBack: that.data.is_back,
              backTime: that.data.returnTime,
              ifInsurance: that.data.is_insurance,
              payMoney: 0.02,//已付款金额，等于定金+（如有购买保险，加上）
              body: '出行租车', //产品简单描述
              // deposit: that.data.money,
            },
            method: 'Post',
            header: { 'content-type': 'application/x-www-form-urlencoded', token },
            success: function (res) {
              let pay = res.data
              console.log(pay)
              //发起支付 
              let timeStamp = pay.data.timeStamp + "";
              console.log(timeStamp)
              let packages = pay.data.packages;//统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
              let paySign = pay.data.paySign;//paySign = MD5(appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111) = 22D9B4E54AB1950F51E0649E8810ACD6
              let nonceStr = pay.data.nonceStr;//随机字符串，长度为32个字符以下
              let param = { "timeStamp": timeStamp, "package": packages, "paySign": paySign, "signType": "MD5", "nonceStr": nonceStr };
              that.pay(param);
            },
            fail: function () {
              console.log("失败")
            }
          })
        }

      }
    } else {
      wx.showToast({
        title: '授权登陆并填写个人信息后才能提交订单',
        icon: "none"
      })
    }
  },
  //支付
  pay: function (param) {
    let that = this;
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {
        that.setData({
          successShowmodal:true,
          startAddress:"",
          endAddress:"",
          perNumbers:"",
          carType:"",
          startTime:"",
          returnTime: "",
          is_back: 0,
          radioStatus: false,
          is_insurance: 0,
          insucheck: false,
        })
      },
      fail: function (res) {
        console.log(res)
        console.log("支付失败");
      },
      complete: function (res) {
        console.log("pay complete");
      }
    })
  },
})