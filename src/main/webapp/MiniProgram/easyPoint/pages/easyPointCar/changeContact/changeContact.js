// pages/easyPointCar/changeContact/changeContact.js
let app = getApp();
Page({
  data: {
    showModal:false,//是否显示修改联系人窗口
    showModaladd:false,//是否显示添加联系人窗口
    item_list:[]//联系人数据
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    this.getMessage();
  },
  //请求临时联系人的信息
  getMessage: function () {
	this.setData({
	  item_list: wx.getStorageSync("Persons"),
	})
  },
  //点击联系人携带数据返回上一个页面
  onPonstant: function (e) {
    let index = e.currentTarget.dataset.index;
    let people = this.data.item_list[index];
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      mydata: {
        name: people.name,
        phone: people.phone,
      }
    })
    wx.navigateBack({//返回
      delta: 1
    })
  },
  //删除联系人
  deleteContact: function (e) {     
    let that = this;
    let index=e.currentTarget.dataset.index;
    console.log(index)
    let item = this.data.item_list;
    let peopleId = this.data.item_list[index].peopleId
    wx.showToast({
      title: '正在删除',
      icon: 'loading',
      duration: 2000
    })

    //测试部分，接上服务器后删除
    for (let i = 0; i < item.length; i++) {
      if (index == i) {
        item.splice(i, 1)
      }
    }
	wx.setStorageSync("Persons", item)
    wx.showToast({
      title: '已删除',
    })
    this.setData({
      item_list: item
    })
  },
  //显示添加联系人窗口
  addContact: function () {     
    this.setData({
      showModaladd:true
    })
  },
  //显示修改联系人信息窗口
  change: function (e) {
    let index = e.currentTarget.dataset.index;
    let people = this.data.item_list[index];
    this.setData({
      name: people.name,
      phone: people.phone,
      peopleId: people.peopleId,
      showModal: true
    })
  },
  //隐藏添加联系人窗口
  hide_modal: function () {
    this.setData({
      showModal: false,
    })
  },
  //隐藏修改联系人窗口
  hide_modaladd: function () {
    this.setData({
      showModaladd: false,
    })
  },
  //信息填写验证
  judegeMessage: function (e) {
    if (e.detail.value.name == "") {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if (e.detail.value.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if (e.detail.value.phone.length != "11") {
      wx.showToast({
        title: '手机号长度错误,请重新输入',
        icon: "none",
        duration: 2000
      })
    }
    else if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(e.detail.value.phone))) {
      wx.showToast({
        title: '手机号输入错误,请重新输入',
        icon: "none",
        duration: 2000
      })
    }
    else {
      return true
    }
  },
  //提交添加联系人部分
  addPerson: function (e) {
    if (this.judegeMessage(e) == true) {
	  let data=this.data.item_list
	  data.push({peopleId: data.length, name: e.detail.value.name, phone: e.detail.value.phone})
	  wx.setStorageSync("Persons", data)
	  
      this.setData({
        showModaladd: false,
		item_list:data
      })
      wx.showToast({
        title: '添加成功',
      })
    }
  },
  //提交修改信息部分
  modifyPerson: function (e) {
    let that = this;
	let data=this.data.item_list
	data[this.data.peopleId]={peopleId: this.data.peopleId, 
							  name: e.detail.value.name, 
							  phone: e.detail.value.phone}
	console.log(data)
	wx.setStorageSync("Persons", data)

    if (that.judegeMessage(e) == true) {
      wx.showToast({
        title: '正在修改',
        icon: 'loading',
        duration: 2000
      })

      this.setData({
        showModal: false,
		item_list:data
      })
      wx.showToast({
        title: '修改成功',
      })
    }
  },
})