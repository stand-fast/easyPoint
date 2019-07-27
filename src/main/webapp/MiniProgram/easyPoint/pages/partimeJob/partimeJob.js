// pages/internship/internship.js
var localData=require("../../data/internship.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentTab:0,
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
        var remainum=0
        if(this.data.currentTab===0){
            remainum = this.data.partimeInfo.remainPeople
        }
        else if(this.data.currentTab===1){
            remainum=this.data.internshipInfo.remainPeople
        }
        wx.navigateTo({
            url: '/pages/JobDetail/JobDetail?currentab='+this.data.currentTab+'&remianum='+remainum,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
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
    internshipInfo:localData.internshipInfo,
    partimeInfo: localData.partimeJobInfo
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