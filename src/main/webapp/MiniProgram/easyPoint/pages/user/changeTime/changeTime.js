// pages/user/changeTime/changeTime.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');//获取开始时间控件、开始时间数组
var timePicker = require('../../../utils/timePicker.js');//时间选择控件
const app = getApp()
Page({
  data: {
    current:0,//更换时间类型，0：乡会，1：租车
    dateTimeArray: null, //开始时间数组
    selectTimeList: [//乡会更换时间数据
        "08-12 08:00",
        "08-13 08:00",
        "08-13 16: 00"
    ],
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    this.timeSelection();//时间选择控件
    var current = options.options;
    this.setData({
      current,
    })
    if (current==0){

    }else if(current == 1){
      this.setData({
        travelOrderId: options.travelOrderId,
      })
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
      var index = e.detail.value;
      var time = this.data.selectTimeList[index];
      this.setData({
          startTime:time
      })
  },
  //租车提交数据
  rentalSubmit:function(){
      var token = app.globalData.token;
      wx.request({
          url: "",
          data: {
              startTime:this.data.startTime
          },
          method: 'Post',
          header: { 'content-type': 'application/x-www-form-urlencoded', token },
          success: function (res) {

          }
     })
  },
})