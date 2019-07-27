// pages/internship/internship.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentTab:0,
      intershipJson:[
      {
        id: "0", jobName: "移动公司营销实习生", jobSalary: "80/天", jobSettle: "日结", remainPeople: "4", jobLocation: "天河区", endDate: "07-11"
      },
      {
        id: "1", jobName: "银行经理实习生", jobSalary: "90/天", jobSettle: "日结", remainPeople: "2", jobLocation: "白云区", endDate: "07-10"
      },
      {
        id: "2", jobName: "公司市场项目实习生", jobSalary: "70/天", jobSettle: "日结", remainPeople: "1", jobLocation: "番禺区", endDate: "07-08"
      },
      {
        id: "3", jobName: "公司采购实习生", jobSalary: "90/天", jobSettle: "日结", remainPeople: "8", jobLocation: "天河区", endDate: "07-07"
      },
        {
          id: "4", jobName: "公司采购实习生", jobSalary: "90/天", jobSettle: "日结", remainPeople: "8", jobLocation: "天河区", endDate: "07-07"
        },
    ],
      partimeJobJson:[
      {
        id: "0", jobName: "校内自助餐厅服务员", jobSalary: "80/天", jobSettle: "日结", remainPeople: "4", jobLocation: "天河区", endDate: "07-11"
      },
      {
        id: "1", jobName: "百货商城导购员", jobSalary: "90/天", jobSettle: "日结", remainPeople: "2", jobLocation: "白云区", endDate: "07-10"
      },
      {
        id: "2", jobName: "百州餐厅服务员", jobSalary: "70/天", jobSettle: "日结", remainPeople: "1", jobLocation: "番禺区", endDate: "07-08"
      },
      {
        id: "3", jobName: "校内考试监考员", jobSalary: "90/天", jobSettle: "日结", remainPeople: "8", jobLocation: "天河区", endDate: "07-07"
      },
    ]
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
            url: '/pages/JobDetail/JobDetail',
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
        }
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      intershipJson: this.data.intershipJson,
      partimeJobJson: this.data.partimeJobJson
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