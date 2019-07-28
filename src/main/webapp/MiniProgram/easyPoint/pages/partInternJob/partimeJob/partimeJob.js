// pages/internship/internship.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentTab:0,
      part_time_job_info:[
      {
          part_time_job_id: "0asdasd", 
          job_name: "移动公司营销实习生",
          job_salary: "80/天", 
          job_settle: 1, 
          recruit_num: "4", 
          job_place: "天河区", 
          end_time: "07-11"
      },
      {
          part_time_job_id: "012213",
          job_name: "移动实习生",
          job_salary: "80/天",
          job_settle: 2,
          recruit_num: "3",
          job_place: "天河区",
          end_time: "07-10"
        },
    ],
  },

  //获取输入框信息
  takeValue:function(e){              
      var that=this
      //console.log(e.detail.value);
      this.setData({
        inputText: e.detail.value
      })
  },
  //搜索功能
    sendMsgTap:function(){          
      console.log(this.data.inputText);
      var selt = this;
      // wx.request({
      //   url: '接口路径',
      //   data: {
      //     inputText: this.data.inputText,   //根据搜索信息请求数据
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
    },
  //跳转到工作详情界面
    jumbtodetail:function(e){
      var id = e.currentTarget.dataset.id
      //console.log(id)
      wx.navigateTo({
        url: '/pages/partInternJob/JobDetail/JobDetail?type='+this.data.currentTab+"&&id="+id
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