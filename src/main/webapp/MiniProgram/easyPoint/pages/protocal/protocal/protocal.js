// pages/protocal/protocal/protocal.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        protocal_lists: [
            "一、服务说明",
            "二、隐私保护",
            "三、用户信息收集",
            "四、信息使用的目的和方式",
            "五、用户注册",
            "六、订单",
            "七、用户行为",
            "八、知识产权",
            "九、内容所有权",
            "十、违约责任",
            "十一、与广告商进行交易",
            "十二、免责声明",
            "十三、附则"
        ]
    },

    jumpDetail:function(e){
        let index = e.currentTarget.dataset.index
        wx.navigateTo({
            url: '/pages/protocal/protocaldetail/protocaldetail?index='+index,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})