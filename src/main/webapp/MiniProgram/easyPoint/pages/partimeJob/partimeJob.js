// pages/internship/internship.js
var localData=require("../../data/internship.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      updateLoadShow:false,
      currentTab:0,
  },

  //获取输入框信息
    takeValue:function(e){
      var that=this
      console.log(e);
  },
  //搜索功能
    searchJob:function(){
        
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
    bindChange: function (e) {
        this.setData({
            currentTab: e.detail.current,
            });
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
// 获取数据
getData() {
        const pageNum = this.pageNum
        api.get(recordURL + 'queryBalanceSub?start=' + pageNum + '&size=' + this.pageSize + '&sortStr=update_time&sortType=desc').then(({ data }) => {
            if (pageNum === 1) {
                this.recordList = data.list
                this.pagtotal = data.totalRow
            } else {
                this.recordList = this.recordList.concat(data.list)
            }
            this.loadingShow = false
            this.updateLoadShow = false
            this.$apply()
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
    internshipInfo:localData.internshipInfo,
    partimeInfo: localData.partimeJobInfo
    }),
    wepy.getSystemInfo({
        success: (res) => {
            this.height = res.windowHeight
            this.pageSize = Math.round(res.windowHeight / 103) + 1
            this.$apply()
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
      // 上拉加载更多loading
      this.updateLoadShow = true
      let _length = this.internshipInfo.length
      // 列表长度与列表总数对比
      if (_length === this.pagtotal) {
          setTimeout(() => {
              this.updateLoadShow = false
              this.$apply()
          }, 1000)
      } else {
          // 当前页码加一
          this.pageNum++
          // 更新数据
          this.getData()
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})