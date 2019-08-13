// pages/myIndex/editInformation/editInformation.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:null,
        check:null,
        grade:0, //年级初始未设置
        waitime:60,
        phone:'',
        word:"获取验证码",
        disabled:false,
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
    //   if (e.detail.value.username){
    //     wx.showToast({
    //       title: '请输入您的真实姓名',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    //   else if (e.detail.value.phone){
    //     wx.showToast({
    //       title: '请输入您的手机号码',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    //   else if (this.data.check==null) {
    //     wx.showToast({
    //       title: '请选择您的性别',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
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
      //       verification:e.detail.value.verification,
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
    watchTel:function(e){
        this.setData({
            phone: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
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
        //       verification:dataverification
        //     })
        //    },
        //   fail:function(){
        //     console.log("获取用户个人信息失败");
        //   }
        //  })
    },
    //点击获取验证码
    getVerification:function(e){
        if(this.data.phone==''){
            wx.showToast({
                title: '手机号为空',
                icon:"none",
                duration:2000
            })
        }
        else if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.data.phone))) {
           wx.showToast({
               title: '手机号输入错误',
               icon: "none",
               duration: 2000
           })
        }
        else{
        var inter = setInterval(function () {
            this.setData({
                word: this.data.waitime + 's后重发',
                waitime: this.data.waitime - 1,
                disabled:true
            });
            if (this.data.waitime < 0) {
                clearInterval(inter)
                this.setData({
                    word: '重新获取',
                    waitime: 60,
                    disabled: false
                });
            }
        }.bind(this), 1000);}
        // wx.request({
        //     url: '',//服务器地址
        //     data: {
        //         phone:e.data.phone,
        //     },
        //     method: "POST",
        //     header: {
        //         'content-type': "application/x-www-form-urlencoded"
        //     },
        //     success(res) {
        //         if (res.data.success) {
        //             wx.showToast({
        //                 title: '短信验证码发送成功，请注意查收',
        //                 duration:2000,
        //                 mask:true
        //             })
        //         }
        //     }
        // })
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