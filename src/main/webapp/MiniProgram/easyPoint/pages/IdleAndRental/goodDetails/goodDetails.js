// pages/IdleAndRental/goodDetails/goodDetails.js
let dateTimePicker = require('../../../component/selectTime/dateTimePicker.js');//获取开始时间控件、开始时间数组
let timePicker = require('../../../component/selectTime/timePicker.js');//时间选择控件
let numberMinus = require('../../../component/number/numberMinus.js');//数字减小控件
let numberPlus = require('../../../component/number/numberPlus.js');//数字增加控件
let app = getApp();
Page({
  data: {
    currentTab: 0,//选项卡类别0：商品详情，1：交易流程
	currentID: 0, //当前的商品id
    showModalStatus: true,//是否显示商品规格弹窗
    check: false,//是否同意易点协议
    typeclick: null,//选择的商品种类
    sizeclick: null,//选择的商品尺寸
    setPrice: 0,//商品规格单价
    chooseType:'',//商品规格已选择类别
    chooseSize: '',//商品规格已选择尺寸
    number: 0,//商品规格数量
    leaseDate:0,//商品规格租借天数
    dateTime: null, //开始时间value
    dateTimeArray: null, //开始时间数组
    good_details_info:{//物品详情数据
      detailsImg:[//轮播图
        "/images/guotai.png",
        "/images/guotai.png",
        "/images/guotai.png",
        "/images/guotai.png",
        "/images/guotai.png",
      ],
      goodName:"西装男女全套",//商品名称
      price:30,//价格
      deposit:100,//押金
      companyName:"小玖正装",//提供商
      leaseNum:7,//已租次数
      detailInfo: "高级布料，防水质量男士西装可配领带领带有黑色，蓝色可供选择物品可保证已清洗整洁",//商品详情详细
      letiety:[//种类
          "女士黑色面试正装全套，各种码数均有",
          "男士黑色面试正装全套，各种码数均有"
      ],
      depositInstructions: "为了保证物品的，租借商品需先缴纳押金，以保证商品的完好归还，押金会在还货后如数归还，如有物品损坏丢失情况，会有客服进行商议，按情况另外扣去一定费用。",//押金说明
      receivedGood: "由客服通知物品已经包装完毕，用户可以自行前往指定地点取货",//取货
      returnGood: "用户使用完毕后请确定清洗物品干净，即可送至指定地点归还，一般租借期限为3天",//还货
      businessHours:"早上10：30至晚上21：00",//营业时间
      goodletiety:[//商品规格数据
        {
          filesname:"",
          filesUrl: "/images/guotai.png",
          itemName: "男士",
          items:[
            {
              itemId:123131231232,
              specifc:"S",price:"15"
            },
            {
              itemId: 6785675,
              specifc: "M", price: "15"
            },
            {
              itemId: 123123123,
              specifc: "L", price: "15"
            }
          ]
        },
        {
          filesname: "",
          filesUrl: "/images/goodImg.png",
          itemName: "男士正装全套",
          items: [
            {
              itemId: 123131231232,
              specifc: "S", price: "15"
            },
            {
              itemId: 6785675,
              specifc: "M", price: "15"
            },
            {
              itemId: 123123123,
              specifc: "L", price: "15"
            }
          ]
        }, 
        {
          filesname: "",
          filesUrl: "/images/goodImg.png",
          itemName: "男士正男士",
          items: [
            {
              itemId: 123131231232,
              specifc: "S", price: "15"
            },
            {
              itemId: 6785675,
              specifc: "M", price: "15"
            },
            {
              itemId: 123123123,
              specifc: "L", price: "15"
            },
            {
              itemId: 6785675,
              specifc: "M", price: "15"
            },
          ]
        },
        {
          filesname: "",
          filesUrl: "/images/goodImg.png",
          itemName: "男士正装全套",
          items: [
            {
              itemId: 123131231232,
              specifc: "S", price: "15"
            },
            {
              itemId: 6785675,
              specifc: "M", price: "15"
            },
            {
              itemId: 123123123,
              specifc: "L", price: "15"
            },
            {
              itemId: 6785675,
              specifc: "M", price: "15"
            },
          ]
        },
        {
          filesname: "",
          filesUrl: "/images/goodImg.png",
          itemName: "男士正装全男士正装全套套",
          items: [
            {
              itemId: 123131231232,
              specifc: "S", 
              price: "15"
            },
            {
              itemId: 6785675,
              specifc: "M", 
              price: "15"
            },
            {
              itemId: 123123123,
              specifc: "L", 
              price: "15"
            },
            {
              itemId: 6785675,
              specifc: "M", 
              price: "15"
            },
          ]
        }
      ],
    }
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    this.timeSelection();
	this.setData({
		currentID:options.id
	})
	this.getMessage(options.id)
  },
  getMessage: function (id) {
    let that = this;
    let token = app.globalData.token;
  	// let id = this.data.goodsTypeInterface[this.data.flag].goodsTypeId
    wx.request({
      url: 'https://www.easypoint.club/miniProgram/lease/detail',
      data: {
        goodId: id,   //请求数据
      },
      method: 'GET',
      header: { 'content-type': 'application/x-www-form-urlencoded', token},
      success: function (res) {
        let code = res.data.code;
        if (res.header.token != undefined) {
          app.replaceToken(res.header.token);
        }
        switch (code) {
          case 200:case 201:
		    that.getSize(id,res.data.data)
            // that.setGoodsInfo(res.data.data,id)
            break;
          case 501:
            app.getPermission();
            break;
        }
      }
    })
  },
  getSize: function(id,details){
	  let that = this;
	  let token = app.globalData.token;
	  // let id = this.data.goodsTypeInterface[this.data.flag].goodsTypeId
	  wx.request({
	    url: 'https://www.easypoint.club/miniProgram/lease/varieties',
	    data: {
	      goodId: id,   //请求数据
	    },
	    method: 'GET',
	    header: { 'content-type': 'application/x-www-form-urlencoded', token},
	    success: function (res) {
	      let code = res.data.code;
	      if (res.header.token != undefined) {
	        app.replaceToken(res.header.token);
	      }
	      switch (code) {
	        case 200:case 201:
	          that.setGoodsInfo(res.data.data,details)
	          break;
	        case 501:
	          app.getPermission();
	          break;
	      }
	    }
	  })
  },
  setGoodsInfo: function(data,details){
	  // this.data.good_details_info.goodletiety
  	  let goodletiety = this.setSize(data)
	  let goodDetails = {
		detailsImg:[//轮播图
		  "/images/guotai.png",
		  "/images/guotai.png",
		  "/images/guotai.png",
		  "/images/guotai.png",
		  "/images/guotai.png",
		],
		goodName:details.goodName,//商品名称
		price:details.lowestPrice,//价格
		deposit:details.deposit,//押金
		companyName:details.businessName,//提供商
		leaseNum:details.leaseNum,//已租次数
		detailInfo:details.goodDescription,//商品详情详细
		letiety:[],//种类
		depositInstructions:details.depositInstruction,//押金说明
		receivedGood: details.takeGoodInstruction,//取货
		returnGood: details.returnGoodInstruction,//还货
		businessHours:"早上10：30至晚上21：00",//营业时间
		goodletiety:goodletiety
	  }
	  let hourArray = details.businessHours.split("-")
	  goodDetails.businessHours = `早上${hourArray[0]}至晚上${hourArray[1]}`
	  // detailsImg = details.goodImages.split("&")
	  // console.log(goodDetails)
	  this.setData({
		  good_details_info:goodDetails
	  })
  },
  setSize(data){
	  console.log(data)
	  let setGoodletiety = data.map((ele)=>{
		let obj = {
			filesname:"",
			// filesUrl: ele.img,
			filesUrl: "/images/guotai.png",
			itemName: ele.variety,
			varietyId: ele.varietyId
		}
		let allSize = ele.size.split("&")
		obj.items = allSize.map((sizeEle)=>{
			let obj = {
				itemId:0,
				specifc:sizeEle,
				price:ele.price
			}
			return obj
		})
		return obj
	  })
	  return setGoodletiety
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
  //选项卡切换0：商品详情，1：交易流程
  swichNav: function (e) {
    if (this.data.currentTab === e.currentTarget.dataset.current) {
        return false;
    }
    else {
      this.setData({
          currentTab: e.currentTarget.dataset.current,
      })
    }
  },
  //是否同意易点协议
  checkChange: function (e) {
    this.setData({
      check: !this.data.check
    })
  },
  //显示商品规格数据
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
    if (index != this.data.typeclick) {
      this.setData({
        sizeclick: -1,
        itemId: null,
        chooseSize: '',
      })
    }
    for (let i = 0; i < goodletiety.length; i++) {
      if (i == index) {
        this.setData({
            typeclick: i,
            chooseType: goodletiety[i].itemName,
            filesUrl: goodletiety[i].filesUrl,
        })
        break;
      }
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
              itemId: size[i].itemId,//商品id
              setPrice:size[i].price,//金额
              chooseSize: size[i].specifc,//尺寸
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
  //数量减号
  quantityMinus: function () {
    this.setData({
      number: numberMinus.minus(this.data.number),
    });
  },
  //租借天数减号
  leaseMinus: function () {
    this.setData({
      leaseDate: numberMinus.minus(this.data.leaseDate),
    });
  },
  //数量加号
  quantityPlus: function () {
    this.setData({
      number: numberPlus.plus(this.data.number, this.data.good_details_info.maxRentDay),
    });
  },
  //租借天数加号
  leasePlus: function () {
    this.setData({
      leaseDate: numberPlus.plus(this.data.leaseDate, this.data.good_details_info.maxRentDay),
    });
  },
  //跳转到订单详情
  toOrder:function(e){
    if (this.data.chooseType==''){
        wx.showToast({
        title: '请选择类别',
        icon: 'none',
        duration: 2000
       })
    }
    else if (this.data.chooseSize == '') {
      wx.showToast({
        title: '请选择尺寸',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.number == 0) {
      wx.showToast({
        title: '请添加数量',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.leaseDate == 0) {
      wx.showToast({
        title: '请添加租接天数',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.startTime == undefined) {
      wx.showToast({
        title: '请选择取货时间',
        icon: 'none',
        duration: 2000
      })
    }
    else {
      let goodDetails = {
        filesUrl: this.data.filesUrl,//规格图片
        category: this.data.chooseType,//类别
        chooseSize: this.data.chooseSize,//尺寸
        itemId: this.data.itemId,//商品id
        number: this.data.number,//数量
        leaseDate: this.data.leaseDate,//租借天数
        img: this.data.img, //商品图片
        price: this.data.setPrice,//商品价格
        pickTime: this.data.startTime,//取货时间
        companyName: this.data.good_details_info.companyName,//商家名称
        deposit: this.data.good_details_info.deposit,//押金
      };
      wx.setStorageSync("goodDetails", goodDetails);
      wx.navigateTo({
        url: '/pages/IdleAndRental/confirmOrder/confirmOrder',
      })
    }
  },
})