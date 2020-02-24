// pages/user/changeTime/changeTime.js
let dateTimePicker = require('../../../component/selectTime/dateTimePicker.js');//获取开始时间控件、开始时间数组
let timePicker = require('../../../component/selectTime/timePicker.js');//时间选择控件
const app = getApp()
Page({
  data: {
    current: 1,//更换时间类型，0：乡会，1：租车
    dateTimeArray: null, //开始时间数组
    startTime:"",//更换时间
    selectTimeList: [//乡会更换时间数据
      "08-12 08:00",
      "08-13 08:00",
      "08-13 16: 00"
    ],
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    this.timeSelection();//时间选择控件
    let current = options.current;
    this.setData({
      current: current,
    })
    if (current==0){

    }else if(current == 1){
      let myOrderRentalCar = wx.getStorageSync("myOrderRentalCar");
      this.setData({
        travelOrderId: options.travelOrderId,
        departureTime: myOrderRentalCar.departureTime,
      })
      console.log(this.data.travelOrderId);
    }
  },
  //初始化时间选择控件-获取时间数组以及当下时间
  timeSelection: function () {
    let timeData = dateTimePicker.timeSelection();
    let dateTimeArray = timeData[0];
    let getStartTime = timeData[1];
    this.setData({
      dateTimeArray,
      getStartTime
    });
  },
  //租车-更换时间
  changeStartDateTime: function (e) {
    this.setData({
      startTime: timePicker.picker(e.detail.value, this.data.dateTimeArray)
    });
  },
  //乡会-更换时间-暂定
  selectTime: function (e) {
    let index = e.detail.value;
    let time = this.data.selectTimeList[index];
    this.setData({
        startTime:time
    })
  },
  //租车提交数据
  rentalSubmit:function(){
    let that = this;
    let token = app.globalData.token;
    if (this.data.startTime != ""){
      wx.request({
        url: app.globalData.requestUrl + "updateTourismDepartureTime",
        data: {
            travelOrderId: this.data.travelOrderId,
            departureTime:this.data.startTime,
            originalTime: this.data.departureTime 
        },
        method: 'Post',
        header: { 'content-type': 'application/x-www-form-urlencoded', token },
        success: function (res) {
          console.log(res.data)
          let data = res.data;
          let code = data.code;
          if (res.header.token != undefined) {
            app.replaceToken(res.header.token);
          }
          switch (code) {
            case 200:
              wx.showToast({
                title: '更换时间成功',
                duration: 1000
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 3
                })
              })
              break;
            case 201:
              that.setData({
                startTime: ""
              })
              wx.showToast({
                title: '修改出发日期必须在出发前一天之前修改，当前已经超过修改日期',
                icon: 'none',
                duration: 2000
              })
              break;
            case 501:
              app.getPermission();
              break;
          }
        }
      })
    }else{
      wx.showToast({
        title: '请选择更改时间',
        icon:"none"
      })
    }
  },
})