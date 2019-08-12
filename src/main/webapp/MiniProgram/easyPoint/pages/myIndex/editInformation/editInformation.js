// pages/myIndex/editInformation/editInformation.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:null,
        check:null,
        grade:0, //年级初始未设置
        gradeSeclect:["大一","大二","大三","大四"]
    },

    changePicker:function(e){
        var that=this
        that.setData({
            index:e.detail.value,
            grade: parseInt(e.detail.value)+1,
        })
    },
    changeSex:function(e){
        var check=this.data.check;
        var cursex = e.currentTarget.dataset.index;
        if(check==null){
            this.setData({
                check:cursex
            })
        }
        else if(check==cursex){
            this.setData({
                check:null
            })
        }
        else if(check!=cursex){
            this.setData({check:cursex})
        }
    },
    formSubmit:function(e){
      console.log(this.data.check)
      // if (e.detail.value.username){
      //   wx.showToast({
      //     title: '请输入您的真实姓名',
      //     icon: 'none',
      //     duration: 2000
      //   })
      // }
      // else if (e.detail.value.phone){
      //   wx.showToast({
      //     title: '请输入您的手机号码',
      //     icon: 'none',
      //     duration: 2000
      //   })
      // }
      // else if (this.data.check==null) {
      //   wx.showToast({
      //     title: '请填写您的性别',
      //     icon: 'none',
      //     duration: 2000
      //   })
      // }
      // else{
      //   var that = this;
      //   wx.request({
      //     url: '接口路径',
      //     header: {
      //       "Content-Type": "application/x-www-form-urlencoded"
      //     },
      //     method: "POST",
      //     data: {
      //       openId: app.globalData.openId,
      //       username: e.detail.value.username,
      //       studentId: e.detail.value.studentId,
      //       gender: that.data.check,
      //       grade: that.data.grade,
      //       major: e.detail.value.major,
      //     },
      //     success: function (res) {   //反馈回报名是否成功的信息
      //       console.log(res.data);
      //       wx.setStorageSync("userInformation", res.data)
      //       wx.showToast({
      //         title: '保存成功',
      //       })
              
      //      },
      //     fail:function(){
      //       wx.showToast({
      //         title: '保存失败，请稍后重试！！',
      //         icon:'none'
      //       })
      //     }
      //    })
      // }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        this.setData({
          index:2
        })
        // wx.request({
        //   url: '接口路径',
        //   header: {
        //     "Content-Type": "application/x-www-form-urlencoded"
        //   },
        //   method: "POST",
        //   data: {
        //     openId: app.globalData.openId,
        //   },
        //   success: function (res) {   //反馈回报名是否成功的信息
        //     console.log("获取用户个人信息成功");
        //     console.log(res.data);
        //     wx.setStorageSync("userInformation", res.data)
        //     var data = res.data
        //     this.setData({
        //       username: data.username,
        //       studentId: data.studentId,
        //       phone: data.phone,
        //       check:data.gender,
        //       index:parseInt(data.grade)-1,
        //       major: data.major,
        //     })
        //    },
        //   fail:function(){
        //     console.log("获取用户个人信息失败");
        //   }
        //  })
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