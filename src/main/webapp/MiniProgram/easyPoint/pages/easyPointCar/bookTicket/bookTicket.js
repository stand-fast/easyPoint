// pages/easyPointCar/bookTicket/bookTicket.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        money:0,
        dateTime1: null, //开始时间value
        dateTimeArray1: null, //开始时间数组
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
        else if(this.data.radioStatus== true){
          if (this.data.returnTime == undefined) {
            wx.showToast({
              title: '请输入返回日期',
              icon: 'none',
              duration: 2000
            })
          }
        }
        else if(this.data.check== true){
          if (this.data.returnTime == undefined) {
            wx.showToast({
              title: '请浏览并同意易点包车协议',
              icon: 'none',
              duration: 2000
            })
          }
        }
        else {  
          wx.request({
            url: 'http://easypoint.club/orderTourismOrder',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
               uid:"12431823175891",
               username: that.data.username,
               phone: that.data.phone,
               departurePlace: e.detail.value.startAddress,
               destination: e.detail.value.endAddress,
               travelNum: e.detail.value.perNumbers,
               vehicleType: that.data.vehicleId,
               departureTime: that.data.startTime,
               isBack: that.data.is_back,
               backTime: that.data.returnTime,
               isInsurance: that.data.is_insurance,
               deposit: that.data.money,
            },
            success: function (res) {
              // console.log(res.data);
                wx.showToast({
                  title: '提交成功！！！',//这里打印出登录成功
                  icon: 'success',
                  duration: 2000
                })
                that.setData({
                  successShowmodal: true,
                })
            }
            
          })
        }


      //接上服务器后删除
      // that.setData({
      //   successShowmodal: true,
      // })
    }


    
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
        var radioStatus = this.data.radioStatus;
        radioStatus = !radioStatus;
        this.setData({
            radioStatus: radioStatus
        })
        if (radioStatus == true) {
          this.setData({
            is_back: 1,
          })
        }else{
          this.setData({
            is_back: 0,
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
        var index=e.detail.value;

      var vehicleId = this.data.seatvehicleList[index].vehicleId
      // console.log(vehicleId);
        this.setData({
            carType:this.data.seatNumber[index],
            money: this.data.seatDeposit[index],
            vehicleId: vehicleId,
        })
    },
    //出发时间
    changeStartDateTime:function(e) {
        let arr = e.detail.value
        let dateArr = this.data.dateTimeArray1;
        this.setData({
            startTime: dateArr[0][arr[0]].replace('年','-')+ dateArr[1][arr[1]].replace('月','-') + dateArr[2][arr[2]].replace('日',' ')+ dateArr[3][arr[3]].replace("时",":") + dateArr[4][arr[4]].replace('分','')
        });
    },
    //某一列的值改变时触发
    changeDateTimeColumn1:function(e) {
        let arr = this.data.dateTime1
        let dateArr = this.data.dateTimeArray1;
        arr[e.detail.column] = e.detail.value;
        this.setData({
            startTime: dateArr[0][arr[0]].replace('年', '-') + dateArr[1][arr[1]].replace('月', '-') + dateArr[2][arr[2]].replace('日', ' ') + dateArr[3][arr[3]].replace("时", ":") + dateArr[4][arr[4]].replace('分', '')
        });
    },
    //返回时间
    changereturnDateTime:function(e) {
        let arr = e.detail.value
        let dateArr = this.data.dateTimeArray1;
        this.setData({
            returnTime: dateArr[0][arr[0]].replace('年', '-') + dateArr[1][arr[1]].replace('月', '-') + dateArr[2][arr[2]].replace('日', ' ') + dateArr[3][arr[3]].replace("时", ":") + dateArr[4][arr[4]].replace('分', '')
        });
        //验证开始时间不能大于结束时间
        this.checkStartAndEndTime();
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
            dateTimeArray1: data,
            dateTime1: obj.dateTime,
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
        url: 'http://easypoint.club/findAllVehicleType',
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
            seatNumber: seatNumber,
            seatDeposit: seatDeposit
          })

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