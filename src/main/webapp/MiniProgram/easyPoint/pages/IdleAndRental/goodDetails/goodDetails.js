// pages/IdleAndRental/goodDetails/goodDetails.js
let dateTimePicker = require('../../../utils/dateTimePicker.js');//获取开始时间控件、开始时间数组
let timePicker = require('../../../utils/timePicker.js');//时间选择控件
Page({
  data: {
      currentTab: 0,
      word: "租借",
      setPrice: 0,
      rentDays:0,
      chooseType:'',
      chooseSize:'',
      number:0,
      save:'',
      leaseDate:0,
      typeclick: null,
      sizeclick:null,
      sizeHeight:100,
      typeHeight:100,
      chooseImg: "/images/goodImg.png",
      check: false,
      dateTime: null, //开始时间value
      dateTimeArray: null, //开始时间数组
      showModalStatus: false,
      good_details_info:{
          detailsImg:[
              "/images/guotai.png",
              "/images/guotai.png",
              "/images/guotai.png",
              "/images/guotai.png",
              "/images/guotai.png",
          ],
          goodName:"西装男女全套",
          price:30,
          deposit:100,
          companyName:"小玖正装",
          leaseNum:7,
          detailInfo: "高级布料，防水质量男士西装可配领带领带有黑色，蓝色可供选择物品可保证已清洗整洁",
          letiety:[
              "女士黑色面试正装全套，各种码数均有",
              "男士黑色面试正装全套，各种码数均有"
          ],
          depositInstructions: "为了保证物品的，租借商品需先缴纳押金，以保证商品的完好归还，押金会在还货后如数归还，如有物品损坏丢失情况，会有客服进行商议，按情况另外扣去一定费用。",
          receivedGood: "由客服通知物品已经包装完毕，用户可以自行前往指定地点取货",
          returnGood: "用户使用完毕后请确定清洗物品干净，即可送至指定地点归还，一般租借期限为3天",
          businessHours:"早上10：30至晚上21：00",
          goodletiety:[{
              filesname:"",
              filesUrl:"/images/goodImg.png",
              itemName: "男士正装全套",
              items:[{
                  specifc:"S",price:"15",save:"5"
              },{
                  specifc: "M", price: "15", save: "3"
              },{
                  specifc: "L", price: "15", save: "3"
              }]
          },{
              filesname: "",
              filesUrl: "/images/goodImg.png",
              itemName: "男士正装全套",
              items: [{
                  specifc: "S", price: "15", save: "5"
              }, {
                  specifc: "M", price: "15", save: "3"
              }, {
                  specifc: "L", price: "15", save: "3"
              },{
                  specifc: "XL", price: "30", save: "2"
              }]
          }, {
              filesname: "",
              filesUrl: "/images/goodImg.png",
              itemName: "男士正装全套",
              items: [{
                  specifc: "S", price: "15", save: "5"
              }, {
                  specifc: "M", price: "15", save: "3"
              }, {
                  specifc: "L", price: "15", save: "3"
              }, {
                  specifc: "XL", price: "30", save: "2"
              }]
          }],
      }
  },
  onLoad: function (options) {
    this.timeSelection();
    let typenum = this.data.good_details_info.goodletiety.length
    if (typenum > 3) {
      let time = typenum / 3
      if (typenum % 3 != 0) {
        time = time + 1
      }
      this.setData({
        typeHeight: 80 * time
      })
    }
    let that = this;
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
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
        return false;
    }
    else {
        that.setData({
            currentTab: e.currentTarget.dataset.current,
        })
    }
  },
  checkChange: function (e) {
    let check = this.data.check;
    check = !check;
    this.setData({
        check: check
    })
  },
  toRent: function () {
    if (this.data.check == true) {
        this.setData({
            showModalStatus: true
        })
    }
    else {
        wx.showToast({
            title: '请浏览并同意易点协议',
            icon: 'none',
            duration: 2000
        })
    }
  },
  // 显示遮罩层
  showModal: function () {
    let animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay:0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
        animationData: animation.export(),
        showModalStatus: true
    })
    setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
            animationData: animation.export()
        })
    }.bind(this), 200)
  },
  // 隐藏遮罩层
  hideModal: function () {        
    let animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
        animationData: animation.export(),
    })
    setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: false
        })
    }.bind(this), 200)
  },
  //点击选择类别
  typeClick: function (e) {
    let index = e.currentTarget.dataset.index;
    let goodletiety = this.data.good_details_info.goodletiety
    for (let i = 0; i < goodletiety.length; i++) {
        if (i == index) {
            this.setData({
                typeclick: i,
                chooseType: goodletiety[i].itemName,
                chooseImg: goodletiety[i].filesUrl
            })
            break;
        }
    }
    let typeclick = this.data.typeclick
    let sizenum = this.data.good_details_info.goodletiety[typeclick].items.length
    if (sizenum > 6) {
        let time = sizenum / 6
        if (sizenum % 6 != 0) {
            time = time + 1
        }
        this.setData({
            sizeHeight: 80 * time
        })
    }
  },
  //点击选择码数
  sizeClick: function (e) {
    let index = e.currentTarget.dataset.index;
    let typeclick=this.data.typeclick
    let size = this.data.good_details_info.goodletiety[typeclick].items;
    for (let i = 0; i < size.length; i++) {
          if (i == index) {
              this.setData({
                  sizeclick: i,
                  setPrice:size[i].price,
                  chooseSize: size[i].specifc,
                  save:size[i].save
              })
              break;
          }
      }
  },
  //选择取货时间
  changeDateTime: function (e) {
    this.setData({
      startTime: timePicker.picker(e.detail.value, this.data.dateTimeArray)
    });
  },
  //点击减号
  bindMinus: function () {
    let num = this.data.number; 
    if (num >=1) {
        num--;
    }
    else{
        num=0;
    }
    this.setData({
        number: num,
    });
  },
  bindMinus1: function () {
    let num = this.data.leaseDate;
    if (num >= 1) {
        num--;
    }
    else {
        num = 0;
    }
    this.setData({
      leaseDate: num,
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    let num = this.data.number;
    let maxNum=this.data.good_details_info.maxRentDay;
    num++; 
    if(num>maxNum){
        num=maxNum
    }
    this.setData({
        number: num,
    });
  },
  bindPlus1: function () {
    let num = this.data.leaseDate;
    let maxNum = this.data.good_details_info.maxRentDay;
    num++;
    if(num>maxNum){
        num=maxNum
    }
    this.setData({
      leaseDate: num,
    });
  },
  //跳转到订单详情
  toOrder:function(e){
    // if (this.data.letiety==undefined){
    //     wx.showToast({
    //     title: '请选择类别',
    //     icon: 'none',
    //     duration: 2000
    //    })
    // }
    // else if (this.data.size == undefined) {
    //   wx.showToast({
    //     title: '请选择尺寸',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
    // else if (this.data.number == 0) {
    //   wx.showToast({
    //     title: '请添加数量',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
    // else if (this.data.leaseDate == 0) {
    //   wx.showToast({
    //     title: '请添加租接天数',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
    // else if (this.data.startTime == undefined) {
    //   wx.showToast({
    //     title: '请添加取货时间',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
    // else{
    //   let goodDetails = [];
    //   goodDetails.push({ letiety: this.data.letiety, size: this.data.size, number: this.data.number, leaseDate: this.data.leaseDate, startTime: this.data.startTime, img: this.data.img });
    //   wx.setStorageSync("goodDetails", goodDetails);
    //   wx.navigateTo({
    //     url: '/pages/IdleAndRental/confirmOrder/confirmOrder',
    //   })
    // }

    let goodDetails=[];
    goodDetails.push({ 
      letiety: this.data.letiety, 
      size: this.data.size, 
      number: this.data.number, 
      leaseDate: this.data.leaseDate, 
      startTime: this.data.startTime, 
      img: this.data.img, price: 
      this.data.price, 
      companyName: this.data.good_details_info.companyName, 
      deposit: this.data.good_details_info.deposit
    });
    wx.setStorageSync("goodDetails", goodDetails);
    wx.navigateTo({
        url: '/pages/IdleAndRental/confirmOrder/confirmOrder',
    })
  },
})