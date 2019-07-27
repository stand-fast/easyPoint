// pages/internship/internship.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentTab:0,
      part_time_job_info:[
      {
          part_time_job_id: "0", 
          job_name: "移动公司营销实习生",
          job_salary: "80/天", 
          job_settle: "日结", 
          recruit_num: "4", 
          job_place: "天河区", 
          end_time: "07-11"
      },
      {
          part_time_job_id: "0",
          job_name: "移动公司营销实习生",
          job_salary: "80/天",
          job_settle: "日结",
          recruit_num: "4",
          job_place: "天河区",
          end_time: "07-11"
        },
    ],
  },

  //获取输入框信息
    takeValue:function(e){              //这里JS还没写，主要是获取键盘输入的内容
      var that=this
      console.log(e);
  },
  //搜索功能
    searchJob:function(){          //这里JS也还没写,对应点击搜索开始搜索功能
        
    },
  //跳转到工作详情界面
    jumbtodetail:function(e){
        wx.navigateTo({
          url: '/pages/JobDetail/JobDetail?type='+this.data.currentTab,
        })
    },

    /** 
     * 点击tab切换 
     */
    swichNav: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        }
        else {
          that.setData({
                currentTab: e.target.dataset.current
          })
          // var selt = this;
          // wx.request({
          //   url: '接口路径',
          //   data: {
          //     type: e.target.dataset.current,   //根据current请求数据
          //   },
          //   method: 'Post',
          //   header: { 'content-type': 'application/x-www-form-urlencoded' },
          //   success: function (res) {
          //     console.log(res.data)
          //     selt.setData({
          //       part_time_job_info: res.data,
          //     })
          //   }
          // })
        }
      console.log(e.target.dataset.current)
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getMessage();

  },
  //获得数据
  getMessage: function () {
    var selt = this;
    wx.request({
      url: '接口路径',
      data: {
        type: "0",   //请求兼职数据
      },
      method: 'Post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data)
        selt.setData({
          part_time_job_info: res.data,
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