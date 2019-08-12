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
        images_group:[
            "/images/ads/ad1.png",
            "/images/ads/ad1.png",
            "/images/ads/ad1.png",
            "/images/ads/ad1.png",
        ],
        driveSchool:[{
            id:0,
            imageUrl:"/images/ads/picture.png",
            driverName:"永安驾校",
            address:"广州市越秀区",
            price:"3888"
        },{
            id: 1,
            imageUrl: "/images/ads/picture.png",
            driverName: "广州平安驾校",
            address: "广州市天河区龙洞",
            price: "4588"
            }, {
            id: 2,
            imageUrl: "/images/ads/picture.png",
            driverName: "广州里程驾校",
            address: "广州市天河区龙洞",
            price: "4088"
            }, {
            id: 3,
            imageUrl: "/images/ads/picture.png",
            driverName: "广州里程驾校",
            address: "广州市天河区龙洞",
            price: "4388"
        }]
    },

    swichNav:function (e) {
        var that = this;
        if (this.data.currenTab === e.currentTarget.dataset.current) {
            return false;
        }
        else {
            that.setData({
                currenTab: e.currentTarget.dataset.current,
            })
        }
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
    lookDetail:function(e){
        wx.navigateTo({
            url: '/pages/educationTrain/driveSchoolDetail/driveSchoolDetail',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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