// pages/myIndex/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputValue:"",
        showHistory:true,
        showGoodName:false,
        show_history_page:true,
        history:[
            "小镇别墅", "超级无敌豪华小镇大别墅","城市民宿",
            "小九正装男女高级全套装", "永安驾校","兼职实习"
        ],
        hasName:[
            "小镇别墅",
            "超级无敌豪华小镇大别墅",
            "小镇超级无敌豪华大别墅",
            "小玖正装",
        ],
        good_lists:[{
            imgUrl:"/images/goodImg.png",
            goodName:"移动公司实习生",
            type:"实习日薪",
            price:"80"
        },{
            imgUrl: "/images/goodImg.png",
            goodName: "三百六十度蓝牙移动音响",
            type: "租赁价格",
            price: "30"  
        },{
            imgUrl: "/images/goodImg.png",
            goodName: "高速移动驾校",
            type: "报名价格",
            price: "4200"  
            },{
            imgUrl: "/images/goodImg.png",
            goodName: "移动公司实习生",
            type: "实习日薪",
            price: "80"
            }]
    },
    onfocus:function(){     //获取到焦点时隐藏历史搜索
        this.setData({
            showHistory:false,
            showGoodName:true,
            show_history_page: true
        })
    },
    lostfocus:function(){      //失去焦点时显示历史搜索
        this.setData({
            showHistory:true,
            showGoodName:false,
        })
        console.log("搜索");
        this.getMessage();
    },
    getMessage: function () {
      var selt = this;
      wx.request({
        url: '接口路径',
        data: {
           openId: app.globalData.openId,
           inputValue: selt.data.inputValue,
        },
        method: 'Post',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log(res.data)
          selt.setData({
            good_lists: res.data,
          })
        }
      })
    },
    takeValue:function(e){      //获取input输入值
        var inputValue=e.detail.value
        this.setData({
            inputValue:this.trim(inputValue),
            showGoodName:true
        })
    },
    trim: function (s) {
        return s.replace(/(^\s*)|(\s*$)/g, "");
    },
    searchGoods:function(){     //搜索商品
        this.setData({
            show_history_page:false,
        })
    },
    returnToIndex:function(){
        wx.switchTab({
            url: '/pages/myIndex/myindex/myindex',
        })
    },
    clearHistory:function(e){
        wx.removeStorageSync("history");
        wx.showToast({
            title: '已清空历史记录',
        })
        this.setData({
            history:[]
        })
    },
    turnToValue:function(e){
        var value=e.currentTarget.dataset.value
        this.setData({
            inputValue:value
        })
    },
    mySelect:function(e){
        var value=e.currentTarget.dataset.name;
        this.setData({
            inputValue:value
        })
    },
    jumpDetail:function(){
        wx.navigateTo({
            url: '',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            history: wx.getStorageSync('history') || []
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