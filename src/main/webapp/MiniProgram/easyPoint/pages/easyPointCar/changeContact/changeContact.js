// pages/easyPointCar/changeContact/changeContact.js
Page({

    /**
     * 页面的初始数据
     */
  data: {
      number:0,
      showModal:false,
      showModaladd:false,
      phone:"",
      item_list:[{
          peopleId:'13312312311',
          name:"李大华",
          phone:"13345678910"
      }, {
          peopleId: '5435331',
          name: "李明",
          phone:"14123123910"
      }]
  },

  //修改
  change:function(e){     //修改联系人信息
      var index = e.currentTarget.dataset.index;
      var people=this.data.item_list[index];
      this.setData({
          name:people.name,
          phone: people.phone,
          peopleId: people.peopleId,
          showModal:true
      })
  },
  deleteContact: function (e) {      //删除联系人
        var selt = this;
        var index=e.currentTarget.dataset.index;
        console.log(index)
        var item = this.data.item_list;
        var peopleId = this.data.item_list[index].peopleId
        wx.showToast({
          title: '正在删除',
          icon: 'loading',
          duration: 2000
        })

      // 正式部分
      // wx.request({
      //   url: '接口路径',
      //   data: {
      //     openId: app.globalData.openId,   
      //     peopleId: peopleId,
      //   },
      //   method: 'Post',
      //   header: { 'content-type': 'application/x-www-form-urlencoded' },
      //   success: function (res) {
      //     console.log(res.data)
      //       for (var i = 0; i < item.length; i++) {
      //         if (index == i) {
      //           item.splice(i, 1)
      //         }
      //       }
      //       this.setData({
      //         item_list: item
      //       })
      //       wx.showToast({
      //         title: '已删除',
      //       })
      //    },
      //    fail:function(res){
      //      if (res.data.status==0){
      //        wx.showToast({
      //          title: '删除联系人失败，请稍后再试',
      //          icon: 'none',
      //          duration: 2000
      //        })
      //      }
      //    }
      // })

      //测试部分，接上服务器后删除
      for (var i = 0; i < item.length; i++) {
        if (index == i) {
          item.splice(i, 1)
        }
      }
      wx.showToast({
        title: '已删除',
      })
      this.setData({
        item_list: item
      })
    },
    addContact: function () {      //添加联系人
        this.setData({
            showModaladd:true
        })
    },
    hide_modal:function(){      //隐藏弹窗
        this.setData({
            showModal:false,
        })
    },
    hide_modaladd: function () {      //隐藏弹窗
      this.setData({
        showModaladd: false,
      })
    },
  judegeMessage:function(e){
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
    else{
      return true
    }
  },
  trueBtn: function (e) {         //修改信息部分
    var that = this;
    if (that.judegeMessage(e)==true){
      wx.showToast({
        title: '正在修改',
        icon: 'loading',
        duration: 2000
      })

      //测试部分，接上服务器后删除
      this.setData({
        showModal: false,
      })
      wx.showToast({
        title: '修改成功',
      })

      //正式部分
      // wx.request({
      //   url: '接口路径',
      //   data: {
      //     openId: app.globalData.openId,   
      //     peopleId: that.data.peopleId,
      //     name: e.detail.value.name,
      //     phone: e.detail.value.phone,
      //   },
      //   method: 'Post',
      //   header: { 'content-type': 'application/x-www-form-urlencoded' },
      //   success: function (res) {
      //     console.log(res.data)
      //       that.getMessage();
      //       that.setData({
      //         showModal: false,
      //         peopleId: '',
      //       })
      //       wx.showToast({
      //         title: '修改成功',
      //       })
      //   },
      //   fail:function(res){
      //     if (res.data.status == 0) {
      //       wx.showToast({
      //         title: '修改联系人失败，请稍后再试',
      //         icon: 'none',
      //         duration: 2000
      //       })
      //     }
      //   }
        
      // })

      }
    },
  trueBtnadd: function (e) {         //添加信息部分
    var that = this;
    if (that.judegeMessage(e) == true) {
      //测试部分，接上服务器后删除
      this.setData({
        showModaladd: false,
      })
      wx.showToast({
        title: '添加成功',
      })

      //正式部分
      // wx.request({
      //   url: '接口路径',
      //   data: {
      //     openId: app.globalData.openId,   
      //     name: e.detail.value.name,
      //     phone: e.detail.value.phone,
      //   },
      //   method: 'Post',
      //   header: { 'content-type': 'application/x-www-form-urlencoded' },
      //   success: function (res) {
      //     console.log(res.data)
      //     if(res.data.status==0){
      //       wx.showToast({
      //         title: '添加联系人失败，请稍后再试',
      //         icon: 'none',
      //         duration: 2000
      //       })
      //     }else{
      //       that.getMessage();
      //       that.setData({
      //         showModaladd: false,
      //       })
      //       wx.showToast({
      //         title: '添加成功',
      //       })
      //     }
      //   }
      // })

    }
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      //this.getMessage();
    },
    getMessage: function () {
      var selt = this;
      wx.request({
        url: '接口路径',
        data: {
          openId: app.globalData.openId,   //请求车票数据
        },
        method: 'Post',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log(res.data)
          selt.setData({
            item_list: res.data,
          })
        }
      })
    },
  onPonstant: function (e) {
    var index = e.currentTarget.dataset.index;
    var people = this.data.item_list[index];
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
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