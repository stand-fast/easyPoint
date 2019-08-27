// pages/myIndex/myindex/myindex.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasAnnounce:false,
        noticeText:"易点高校生活服务平台正式上线！",
        ads:[
            "/images/myindex/adbg1.png",
            "/images/myindex/adbg1.png",
            "/images/myindex/adbg1.png"
        ],
        navs:[{
            imgurl:"/images/icon/rent_icon.png",
            name:"租赁闲置"
        },{
            imgurl:"/images/icon/car_icon.png",
            name:"易点出行"
        },{
            imgurl:"/images/icon/edu_icon.png",
            name:"教育培训"
        },{
            imgurl:"/images/icon/travel_icon.png",
            name:"旅游住宿"
        },{
            imgurl:"/images/icon/partime_icon.png",
            name:"兼职实习"
        },{
            imgurl:"/images/icon/food_icon.png",
            name:"娱乐美食"
        }],
        hot_list:[{
            hotImg:"/images/ads/rujiahotel.png",
            hotName:"如家酒店",
            hotPrice:"398"
        },{
            hotImg: "/images/ads/homestay.png",
            hotName: "小镇民宿",
            hotPrice: "198"
            },{
            hotImg: "/images/ads/homestay.png",
            hotName: "小镇民宿",
            hotPrice: "198"
            }, {
            hotImg: "/images/ads/homestay.png",
            hotName: "小镇民宿",
            hotPrice: "198"
        }]
    },
    jumpToDetail:function(e){
        var id=e.currentTarget.dataset.index;
        if(id==0){
            wx.navigateTo({
                url:'/pages/IdleAndRental/ldleRenIndex/ldleRenIndex',
            })
        }
        else if(id==1){
            wx.navigateTo({
                url: '/pages/easyPointCar/bookTicket/bookTicket',
            })
        }
        else if(id==2){
            wx.navigateTo({
                url: '/pages/educationTrain/edTraIndex/edTraIndex',
            })
        }
        else if(id==3){
            wx.navigateTo({
                url: '',
            })
        }
        else if(id==4){
            wx.navigateTo({
                url: '/pages/partInternJob/partimeJob/partimeJob',
            })
        }
        else{
            wx.navigateTo({
                url: '',
            })
        }
    },
    toHotDetail:function(e){
        var index=e.currentTarget.dataset.index;
        console.log(index)
        for(var i=0;i<this.data.hot_list.length;i++){
            if(index==i){
                wx.navigateTo({
                    url: this.data.hot_list[i],     //这里还没完善，跳转页面需要交互确定怎么传
                })
            }
        }
    },
    goToAnnounce:function(){   //有消息时跳转到消息界面
        wx.navigateTo({
            url: '',
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