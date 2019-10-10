// pages/educationTrain/edTraIndex/edTraIndex.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currenTab: 0,
        number:4,
        winWidth:0,
        winHeight:0,
        pageNum:1,   //当前的界面
        noData:false,
        advertisementUrl:[
            "/images/ads/ad1.png",
            "/images/ads/ad1.png",
            "/images/ads/ad1.png",
            "/images/ads/ad1.png",
        ],
        driveSchool:[
          {
            drivingSchoolId: "12536fkdxhd234234",
            merchantId:"sfsfsdfsdf",
            defaultImgUrl:"/images/ads/picture.png",
            drivingSchoolName:"永安驾校",
            drivingSchoolAddress:"广州市越秀区",
            lowestPrice:"3888"
          },
          {
            drivingSchoolId: "12536fkdxhd234234",
            merchantId: "sfsfsdfsdf",
            defaultImgUrl: "/images/ads/picture.png",
            drivingSchoolName: "永安驾校",
            drivingSchoolAddress: "广州市越秀区",
            lowestPrice: "3888"
          },
          {
            drivingSchoolId: "12536fkdxhd234234",
            merchantId: "sfsfsdfsdf",
            defaultImgUrl: "/images/ads/picture.png",
            drivingSchoolName: "永安驾校",
            drivingSchoolAddress: "广州市越秀区",
            lowestPrice: "3888"
          },
          {
            drivingSchoolId: "12536fkdxhd234234",
            merchantId: "sfsfsdfsdf",
            defaultImgUrl: "/images/ads/picture.png",
            drivingSchoolName: "永安驾校",
            drivingSchoolAddress: "广州市越秀区",
            lowestPrice: "3888"
          }
        ]
    },

    swichNav:function (e) {
        var that = this;
        if (this.data.currenTab === e.currentTarget.dataset.current) {
            return false;
        }
        else {
            that.setData({
              currenTab: e.currentTarget.dataset.current,
              pageNum: 1,  //切换界面将pageNum置为0
            })
            // var selt = this;
            // wx.request({
            //   url: '接口路径',
            //   data: {
            //     type: e.currentTarget.dataset.current,   //根据current请求数据
            //     pageNum: 1, //从数据里获取当前页数
            //     pageSize: 4, //每页显示条数
            //   },
            //   method: 'Post',
            //   header: { 'content-type': 'application/x-www-form-urlencoded' },
            //   success: function (res) {
            //     console.log(res.data)
            //     selt.setData({
            //       driveSchool: res.data,
            //     })
            //   }
            // })
      }
      console.log("请求type：" + e.currentTarget.dataset.current+"数据")
    },
    //跳转到题库小程序
    tosubject1:function(){
        wx.navigateToMiniProgram({
            appId: '',
        })
    },
    tosubject4:function(){
        wx.navigateToMiniProgram({
            appId: '',
        })
    },
    //跳转到驾校对应的详情页面
    lookDetail: function (res) {
      var drive_id = res.currentTarget.dataset.drive_id
      //console.log(drive_id);
      wx.navigateTo({
        url: '/pages/educationTrain/driveSchoolDetail/driveSchoolDetail?drive_id=' + drive_id,
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      //this.getMessage();
    },
  //获得数据
  getMessage: function () {
    var selt = this;
    wx.request({
      url: '接口路径',
      data: {
        type: "0",   //请求学车数据，其中考研数据type为1，考证数据type为2
        pageNum: that.data.pageNum, //从数据里获取当前页数
        pageSize: 4, //每页显示条数
      },
      method: 'Post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data)
        selt.setData({
          driveSchool: res.data,
        })
      }
    })
  },
  onReachBottom: function () {
    var that = this;
    wx.showToast({
      icon: 'loading',
      title: '正在加载',
    })
    var pageNum = that.data.pageNum + 1; //获取当前页数并+1
    that.setData({
      pageNum: pageNum, //更新当前页数
    })
    console.log('加载第' + this.data.pageNum + '页面数据')
    //that.getdatalist();//重新调用请求获得数据
  },
  getdatalist: function () {
    var that = this;
    wx.request({
      url: '请求地址',
      data: {
        type: that.data.currenTab,
        pageNum: that.data.pageNum, //从数据里获取当前页数
        pageSize: 4, //每页显示条数
      },
      method: "POST",
      success: function (res) {
        console.log('请求成功');
        if (res.data == undefined) {    //没有数据时候将显示没有数据显示出来
          that.setData({
            noData: true,
          })
        }
        else {
          var arr1 = that.data.driveSchool; //从data获取当前driveSchool数组
          var arr2 = res.data; //从此次请求返回的数据中获取新数组
          arr1 = arr1.concat(arr2); //合并数组
          that.setData({
            driveSchool: arr1 //合并后更新driveSchool
          })
        }
      },
      fail: function (err) {
        console.log('请求失败');
      },//请求失败
    })

  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()//在标题栏中显示加载     

    //将pagenum
    this.setData({
      pageNum:1,
    })
    console.log("页面刷新，pageNum返回为1")       
    //this.updateData();    //更新数据
    wx.showToast({
      icon: 'loading',
      title: '正在刷新',
    })
    setTimeout(function () {
      wx.hideNavigationBarLoading()//完成停止加载      
      wx.stopPullDownRefresh()//停止下拉刷新 
    }, 1500);
  },
  updatData: function () {
    var selt = this;
    wx.request({
      url: '接口路径',
      data: {
        type: selt.data.currenTab,   //根据current请求数据
        pageNum: 1, //获取第一页数据
        pageSize: 4, //每页显示条数
      },
      method: 'Post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data)
        selt.setData({
          driveSchool: res.data,
        })
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

    },

    onShareAppMessage: function () {

    }
})