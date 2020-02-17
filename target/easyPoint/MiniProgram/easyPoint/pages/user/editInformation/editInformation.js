// pages/user/editInformation/editInformation.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: null,
        check: null,
        grade: '', //年级初始未设置
        waitime: 60,
        phone: '',
        isEdit: false,
        isbutton: false,
        word: "获取验证码",
        isChangePhone: false,    //是否更改手机号码
        phoneVerificationCode: "",   //手机号码接收到的验证码
        disabled: false,
        gradeSeclect: ["2016", "2017", "2018", "2019","2020","2021"]
    },
    toEdit: function (e) {
        var isEdit = !this.data.isEdit;
        if (isEdit == true) {
          this.setData({
            isEdit: isEdit,
            isbutton: true,
          })
        }else{
          this.setData({
            isEdit: isEdit,
            isbutton: false,
          })
        }
        //点击编辑时候选择性别
        this.setData({
          check: this.data.gender
        })
    },
    changePicker: function (e) {
        var that = this
        that.setData({
            grade: this.data.gradeSeclect[e.detail.value],
        })
    },
    changeSex: function (e) {
        var check = this.data.check;
        var cursex = e.currentTarget.dataset.index;
        if (check == null) {
            this.setData({
                check: cursex
            })
        }
        else if (check == cursex) {
            this.setData({
                check: null
            })
        }
        else if (check != cursex) {
            this.setData({ check: cursex })
        }
    },
  formSubmit: function (e) {
       var that = this;
       wx.showToast({
         title: '正在保存',
         icon:'loading',
       })
        if (e.detail.value.username==""){
          wx.showToast({
            title: '请输入您的真实姓名',
            icon: 'none',
            duration: 2000
          })
        }
        else if (this.data.check == null) {
          wx.showToast({
            title: '请选择您的性别',
            icon: 'none',
            duration: 2000
          })
        }
        else if (e.detail.value.phone==""){
          wx.showToast({
            title: '请输入您的手机号码',
            icon: 'none',
            duration: 2000
          })
        }
        // else if (this.data.isChangePhone == true){
        //   if (this.data.phoneVerificationCode == "") {
        //     wx.showToast({
        //       title: '验证码为空',
        //       icon: 'none',
        //       duration: 2000
        //     })
        //   }
        //   else if (e.detail.value.verification != this.data.phoneVerificationCode) {
        //     wx.showToast({
        //       title: '验证码输入错误',
        //       icon: 'none',
        //       duration: 2000
        //     })
        //   }
        // }
        else{
          var userInformation = { 
            "username": e.detail.value.username,
            "gender": that.data.check, 
            "studentId": e.detail.value.studentId, 
            "grade": e.detail.value.grade, 
            "major": e.detail.value.major,
            "phone": e.detail.value.phone, 
          };
          wx.setStorageSync("userInformation", userInformation);
          wx.showToast({
             title: '保存成功',
             icon:'succeed',
          })
          //渲染界面
          that.setData({
            username: e.detail.value.username,
            gender: that.data.check,
            studentId: e.detail.value.studentId, 
            grade: e.detail.value.grade, 
            major: e.detail.value.major,
            phone: e.detail.value.phone, 
          })
        //   wx.request({
        //     url: '接口路径',
        //     header: {
        //       "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     method: "POST",
        //     data: {
        //       openId: app.globalData.openId,
        //       username: e.detail.value.username,
        //       phone: e.detail.value.phone,
        //       studentId: e.detail.value.studentId,
        //       gender: that.data.check,
        //       grade: that.data.grade,
        //       major: e.detail.value.major,
        //       verification:e.detail.value.verification,
        //     },
        //     success: function (res) {   //反馈回报名是否成功的信息
        //       console.log(res.data);
        //       wx.showToast({
        //         title: '保存成功',
        //         icon:'succeed',
        //       })
        //       that.setData({
        //           isbutton:false,
        //           isEdit:true
        //       })
        //      },
        //     fail:function(res){
        //       if (res.data.staus == 0) {
        //         wx.showToast({
        //           title: '保存失败，请稍后重试！！',
        //           icon: 'none'
        //         })
        //       }
        //     }
        //    })
        }

        //测试
        this.setData({
          isbutton: false,
          isEdit: false,
          isChangePhone: false,
        })
    },
    watchTel: function (e) {       //实时监听input里面的值的变化
        var currentPhone = e.detail.value;
        //定义了一个customerPhone，获取数据库里的电话赋值给customerPhone
        var customerPhone = this.data.phone;

        //跟数据库里面的号码一样就不显示
        if (currentPhone == customerPhone && currentPhone.length == 11) {
          this.setData({
            isChangePhone: false,
            currentPhone: currentPhone
          })
        }
        //下面跟customerPhone比较，不一样就显示验证码那一栏
        else if (currentPhone != customerPhone && currentPhone.length == 11) {
            this.setData({
              isChangePhone: true,
              currentPhone: currentPhone
            })
        }
    },
    //点击获取验证码
    getVerification: function (e) {
        if (this.data.currentPhone == '') {
            wx.showToast({
                title: '手机号为空,请重新输入',
                icon: "none",
                duration: 2000
            })
        }
        else if (this.data.currentPhone.length != "11") {
            wx.showToast({
                title: '手机号长度错误,请重新输入',
                icon: "none",
                duration: 2000
            })
        }
        else if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.data.currentPhone))) {
            wx.showToast({
                title: '手机号输入错误,请重新输入',
                icon: "none",
                duration: 2000
            })
        }
        else {
            var inter = setInterval(function () {
                this.setData({
                    word: this.data.waitime + 's后重发',
                    waitime: this.data.waitime - 1,
                    disabled: true
                });
                if (this.data.waitime < 0) {
                    clearInterval(inter)
                    this.setData({
                        word: '重新获取',
                        waitime: 60,
                        disabled: false
                    });
                }
            }.bind(this), 1500);
            var that = this;
            // wx.request({
            //     url: '接口地址',
            //     data: {
            //         phone:that.data.currentPhone,
            //     },
            //     method: "POST",
            //     header: {
            //         'content-type': "application/x-www-form-urlencoded"
            //     },
            //     success(res) {
            //       wx.showToast({
            //           title: '短信验证码发送成功，请注意查收',
            //           duration:2000,
            //           mask:true
            //       })
            //       that.setData({
            //         phoneVerificationCode:res.data
            //       })

            //     },
            //     fail(res){
            //       wx.showToast({
            //         title: '短信验证码发送失败，请稍后重试',
            //         icon:'none',
            //         duration: 2000,
            //       })
            //     }
            // })

        }
    },

  onLoad: function (options) {
    if(options.judge=="true"){
      this.setData({
        isEdit: true,
        isbutton: true,
      })
    }
    var selt = this;
    var userData = wx.getStorageSync('userInformation');
    console.log(userData);
    if (userData == "") {
        // this.getMessage();              //请求用户个人信息函数
    }
    else {
      selt.setData({
        username: userData.username,
        gender: userData.gender,
        studentId: userData.studentId,
        grade: userData.grade,
        major: userData.major,
        phone: userData.phone, 
      })
    }
  },
  //请求用户个人信息数据
  getMessage: function () {
    var selt = this;
    wx.request({
      url: '接口路径',
      method: 'Post', 
      data: {
        openId: app.globalData.openId,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if(res.data!=''){
          console.log("获取用户个人信息成功");
          console.log(res.data);
          wx.setStorageSync("userInformation", res.data)
          var data = res.data
          selt.setData({
            username: userData.username,
            gender: userData.gender,
            studentId: userData.studentId,
            grade: userData.grade,
            major: userData.major,
            phone: userData.phone,
          })
        }
      },
      fail: function () {
        console.log("获取用户个人信息失败");
      }
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
        clearInterval(this.data.inter)
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