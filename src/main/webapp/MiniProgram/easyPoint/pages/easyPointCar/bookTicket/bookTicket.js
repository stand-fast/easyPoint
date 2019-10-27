// pages/easyPointCar/bookTicket/bookTicket.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        money:0,
        dateTime: null, //开始时间value
        dateTimeArray: null, //开始时间数组
        select:false,
        check:false,
        insucheck:false,
        radioStatus: false, 
        successShowmodal:false,
        is_back:0,      //是否往返
        is_insurance:0,   //是否购买保险
        assoName:'',
        imgUrls: [
            "/images/bg1_car.png",
            "/images/bg2_car.png"
        ],
        associationsList:[
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
        //seatNumber: ["35座大巴", "49座大巴", "53座大巴","57座大巴"],
        seatvehicleList: [
          {
            vehicleId: "2412624",
            vehicleType: "7座大巴",
            deposit: "100"
          },
          {
            vehicleId: "88789624",
            vehicleType: "35座大巴",
            deposit: "200"
          },
          {
            vehicleId: "745624",
            vehicleType: "53座大巴",
            deposit: "700"
          },
        ]
    },

  //提交拉起支付功能
  formSubmit: function (e) {
    var that=this;
    if (this.requistPersonInformation()) {
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
        else if(e.detail.value.perNumbers == "") {
          wx.showToast({
            title: '请输入出行人数',
            icon: 'none',
            duration: 2000
          })
        }
        else if(this.data.carType == undefined) {
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
          url: 'https://easypoint.club/miniProgram/orderTourismOrder',
          data: {
            passenger: that.data.username,
            phone: that.data.phone,
            departurePlace: e.detail.value.startAddress,
            destination: e.detail.value.endAddress,
            travelNum: e.detail.value.perNumbers,
            vehicleId: that.data.vehicleId,
            departureTime: that.data.startTime,
            type:0,
            ifBack: that.data.is_back,
            backTime: that.data.returnTime,
            ifInsurance: that.data.is_insurance,
            payMoney: 0.01,//已付款金额，等于定金+（如有购买保险，加上）
            body: '出行租车', //产品简单描述
            // deposit: that.data.money,
          },
          method: 'Post',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            var pay = res.data
            console.log(pay)
            //发起支付 
            var timeStamp = pay.data.timeStamp + "";
            console.log(timeStamp)
            var packages = pay.data.packages;//统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
            var paySign = pay.data.paySign;//paySign = MD5(appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111) = 22D9B4E54AB1950F51E0649E8810ACD6
            var nonceStr = pay.data.nonceStr;//随机字符串，长度为32个字符以下
            var param = { "timeStamp": timeStamp, "package": packages, "paySign": paySign, "signType": "MD5", "nonceStr": nonceStr };
            that.pay(param);
          },
          fail: function () {
            console.log("失败")
          }
        })
      }
          
        }

  },
  /* 支付   */
  pay: function (param) {
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
  modal_click_Hidden: function () {       //隐藏弹框
        this.setData({
            successShowmodal: false,
        })
  },
   swichNav: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current){
            return false;
        }
        else {
            that.setData({
                currentTab:e.target.dataset.current,
            })
        }
    },
    //是否往返选择
    radiochange: function (e) {
        var radioStatus = !this.data.radioStatus;
        if (radioStatus == true) {
          this.setData({
            is_back: 1,
            radioStatus: radioStatus
          })
        }else{
          this.setData({
            is_back: 0,
            radioStatus: radioStatus
          })
        }
    },
    //是否购买保险
    insuChange:function(e){
      var insucheck=this.data.insucheck;
      insucheck=!insucheck;
      this.setData({
          insucheck:insucheck,
      })
      if (insucheck == true) {
        this.setData({
          is_insurance: 1,
        })
      }else{
        this.setData({
          is_insurance: 0,
        })
      }
    },
    //选择车辆类型
    changeSeatType:function(e){
      var index = e.detail.value;
      var vehicleId = this.data.seatvehicleList[index].vehicleId
        this.setData({
            carType:this.data.seatNumber[index],
            money: this.data.seatDeposit[index],
            vehicleId: vehicleId,
        })
    },
    //出发时间
    changeStartDateTime:function(e) {
        let arr = e.detail.value
        let dateArr = this.data.dateTimeArray;
        this.setData({
            startTime: dateArr[0][arr[0]].replace('年','-')+ dateArr[1][arr[1]].replace('月','-') + dateArr[2][arr[2]].replace('日',' ')+ dateArr[3][arr[3]].replace("时",":") + dateArr[4][arr[4]].replace('分','')
        });
    },
    //某一列的值改变时触发
    changeDateTimeColumn:function(e) {
        let arr = this.data.dateTime
        let dateArr = this.data.dateTimeArray;
        arr[e.detail.column] = e.detail.value;
        this.setData({
            startTime: dateArr[0][arr[0]].replace('年', '-') + dateArr[1][arr[1]].replace('月', '-') + dateArr[2][arr[2]].replace('日', ' ') + dateArr[3][arr[3]].replace("时", ":") + dateArr[4][arr[4]].replace('分', '')
        });
    },
    //返回时间
    changereturnDateTime:function(e) {
        let arr = e.detail.value
        let dateArr = this.data.dateTimeArray;
        this.setData({
            returnTime: dateArr[0][arr[0]].replace('年', '-') + dateArr[1][arr[1]].replace('月', '-') + dateArr[2][arr[2]].replace('日', ' ') + dateArr[3][arr[3]].replace("时", ":") + dateArr[4][arr[4]].replace('分', '')
        });
    },
    selectAssoName: function (e) {
      var index = e.detail.value;
      var name=this.data.associationsList[index].associationName;
      var associationId = this.data.associationsList[index].associationId;
      //判断车票类型
      this.setData({
            assoName: name,
            associationId: associationId,
      })
    },
  //转到电子订单详情 
  successBtn:function(){
        wx.navigateTo({
            url: '/pages/easyPointCar/elecTicket/elecTicket',
        })
    },
    //转到车票查询
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取完整的年月日 时分秒，以及默认显示的数组
        var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        // 精确到分的处理，将数组的秒去掉
        var lastArray = obj.dateTimeArray.pop();
        var lastTime = obj.dateTime.pop();
        //日期转换
        var data = obj.dateTimeArray;
        var name;
        for (var i = 0; i < data.length; i++) {
            switch (i) {
                case 0:
                    name = "年";
                    break;
                case 1:
                    name = "月";
                    break;
                case 2:
                    name = "日";
                    break;
                case 3:
                    name = "时";
                    break;
                case 4:
                    name = "分";
                    break;
            }
            for (var j = 0; j < data[i].length; j++) {
                data[i][j] = data[i][j] + name;
            }
        }
        this.setData({       
            dateTimeArray: data,
            dateTime: obj.dateTime,
        });

        var userInformation = wx.getStorageSync('userInformation');
        this.setData({
          username: userInformation.username,
          phone: userInformation.phone,
        })
        this.getMessage();   //获取车票类型数据
        //this.getCommitteeMessage()  //获取同乡会名称数据

        //同乡会数据处理，接上服务器后删除
        var associations = this.data.associationsList;
        var associationsName=[];
        for (var i = 0; i < associations.length; i++) {
          associationsName.push(associations[i].associationName)
        }
        this.setData({
          associations: associationsName,
        })
  },
  //请求车辆类型数据以及对应应付定金
  getMessage: function () {
      var selt = this;
      wx.request({
        url: app.globalData.requestUrl+'findAllVehicleType',
        method: 'Post',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          //console.log(res.data.data);    //res.data为seatVehicle对应数据
          var seatvehicle = res.data.data;
          var seatNumber = [];
          var seatDeposit = [];
          for (var i = 0; i < seatvehicle.length; i++) {
            seatNumber.push(seatvehicle[i].vehicleType)
            seatDeposit.push(seatvehicle[i].deposit);
          }
          selt.setData({
            seatvehicleList: seatvehicle,
            seatNumber: seatNumber,
            seatDeposit: seatDeposit
          })
          // console.log(selt.data.seatNumber);
          // console.log(selt.data.seatDeposit)
        }
      })
    },

  //请求同乡会名称数据
  getCommitteeMessage: function () {
    var selt = this;
    wx.request({
      url: '接口路径',
      method: 'get',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data)
        var associations = res.data;
        var associationsName = [];
        for (var i = 0; i < associations.length; i++) {
          associationsName.push(associations[i].associationName)
        }
        this.setData({
          associationsList: res.data,
          associations: associationsName,
        })

      }
    })
  },
  //判断是否填写个人信息
  requistPersonInformation: function () {
    var selt = this;
    var userInformation = wx.getStorageSync('userInformation');
    //console.log(userInformation);
    if (userInformation == "") {
      wx.showModal({
        title: '您尚未填写个人信息',
        content: '请点击确定开始填写个人信息',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/user/editInformation/editInformation?judge='+"true",
            })
          }
        }
      })
    }
    else {
      return true
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