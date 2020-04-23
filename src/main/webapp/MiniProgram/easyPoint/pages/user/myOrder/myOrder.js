// pages/user/myOrder/myOrder.js
const app = getApp()
Page({
  data: {
    currenTab: 0,//显示选项卡栏目部分
    ruralCommittee: [], //乡会包车部分假数据
    ticket_lists: [],  //租车部分假数据
    rentItems: [//租借部分假数据
      // {
      //       goodName:"随身携带可充电荧光灯带哈哈哈",
      //       goodPrice:30,
      //       goodDecription:"五十米长我算到这里就应该是二十了吧哈哈哈到可以",
      //       goodNumber:2,
      //       orderStatus:"未完成"
      // },
      // {
      //       goodName: "超级好用的音响",
      //       goodPrice: 150,
      //       goodDecription: "蓝牙无线连接",
      //       goodNumber: 1,
      //       orderStatus: "押金已退还"
      // }
    ]
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    let type = options.type;
    this.getMessage(type);
  },
  //获得我的订单出行数据
  getMessage: function (type) {
    let that = this;
    let token = app.globalData.token;
    wx.request({
      url: app.globalData.requestUrl + 'findTravelOrder',
      method: 'get',
      header: { 'content-type': 'application/x-www-form-urlencoded', token },
      success: function (res) {
        let code = res.data.code;
        if (res.header.token != undefined) {
          app.replaceToken(res.header.token);
        }
        switch (code) {
          case 200:
            console.log(res.data.data)
            that.setData({
              ticket_lists: res.data.data,
            })
            break;
          case 201:
            console.log("暂无订单");
            break;
          case 501:
            app.getPermission();
            break;
        }
      }
    })
  },
  getRentMessage(){
	  let that = this;
	  let token = app.globalData.token;
	  wx.request({
		  url:"https://www.easypoint.club/miniProgram/lease/order",
		  method:"GET",
		  header: { 'content-type': 'application/x-www-form-urlencoded', token },
		  success(res){
			let data = res.data
		  	switch (data.code) {
		  	  case 200:
				let getRentDetail = data.data
				let rentDetail = getRentDetail.map((ele)=>{
					let obj = {
						goodName: ele.goodName,
						goodPrice: ele.price,
						goodNumber: ele.number,
						goodDecription: ele.goodDescription||"无",
						orderStatus: ele.state==1?"未完成":"已完成",
						goodOrderId: ele.goodOrderId
					}
					return obj
				})
		  	    that.setData({
		  	      rentItems: rentDetail
		  	    })
		  	    break;
		  	  case 201:
		  	    console.log("暂无订单");		  	    
				that.setData({
		  	      rentItems: [],
		  	    })
		  	    break;
		  	  case 501:
		  	    app.getPermission();
		  	    break;
		  	}
		  },
		  fail(err) {
		  	console.log(err)
		  }
	  })
  },
  //切换选项卡，并请求数据
  swichNav:function(e){
    if (this.data.currenTab === e.currentTarget.dataset.current) {
        return false;
    }
    else {
        let type = e.currentTarget.dataset.current;
        //this.getMessage(type);           //根据type请求数据，出行0，教育1，租借2
        this.setData({
            currenTab: type,
        })
		if(type==2){
			this.getRentMessage()
		}
    }
  },
  //跳转详情数据
  toDetail:function(e){
    let index=e.currentTarget.dataset.index;
    let data = this.data.ticket_lists[index];
    let type = e.currentTarget.dataset.type;
    wx.setStorageSync('myOrderRentalCar', data)
    wx.navigateTo({
      url: '/pages/user/myOrderCarDetail/myOrderCarDetail?type=' + type + "&&travelOrderId=" + data.travelOrderId
    })
  },
  //跳转租借车票详情数据-暂时不动
  jumpToRentDetail:function(e){
    let index = e.currentTarget.dataset.index;
    let data = this.data.rentItems[index];
    wx.setStorageSync('myOrderRental', data)
    wx.navigateTo({
        url: '/pages/user/myOrderRentDetail/myOrderRentDetail?current=2&&goodOrderId=' + data.goodOrderId,
    })
  },
})