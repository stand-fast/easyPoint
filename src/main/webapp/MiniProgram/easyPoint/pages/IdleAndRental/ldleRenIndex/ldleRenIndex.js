// pages/IdleAndRental/ldleRenIndex/ldleRenIndex.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab:0,
        flag:0,
        advertisementUrl:[
            "/images/zulin.png",
            "/images/zulin.png",
            "/images/zulin.png",
        ],
        item_list: ["音响设备", "装饰灯具", "玩具套餐","正装用品"],
        rent_list:[
          {
            item_list:[{
                goodId:"sdf12313456asdsa546",
                pro_img:"/images/goodImg.png",
                goodName:"50米长充电灯带",
                leaseNum:7,
                price:20
            },{
                goodId: "sdf12313456asdsa546",
                pro_img: "/images/goodImg.png",
                goodName: "50米长充电灯带",
                leaseNum: 7,
                price: 20
            }, {
                goodId: "sdf12313456asdsa546",
                pro_img: "/images/goodImg.png",
                goodName: "50米长充电灯带",
                leaseNum: 7,
                price: 20
            }, 
            ]
        },
        {
            item_list: [{
                goodId: "sdf12313456asdsa546",
                pro_img: "/images/goodImg.png",
                goodName: "50米长充电灯带",
                leaseNum: 7,
                price: 20
            },{
                goodId: "sdf12313456asdsa546",
                pro_img: "/images/goodImg.png",
                goodName: "50米长充电灯带",
                leaseNum: 7,
                price: 20
            }]            
        },
        {
            item_list: [{
                goodId: "sdf12313456asdsa546",
                pro_img: "/images/goodImg.png",
                goodName: "50米长充电灯带",
                leaseNum: 7,
                price: 20
            }, {
                goodId: "sdf12313456asdsa546",
                pro_img: "/images/goodImg.png",
                goodName: "50米长充电灯带",
                leaseNum: 7,
                price: 20
            }]
        }
      ]
    },
    swichNav: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        }
        else {
            that.setData({
                currentTab: e.target.dataset.current,
            })
        }
    },
    changeList: function (e) {
        if (this.data.flag === e.target.dataset.id) {
            return false;
        }
        else {
            this.setData({
                flag: e.target.dataset.id,
            })
        }
    },
    lookDetail:function(){
        wx.navigateTo({
            url: '/pages/IdleAndRental/goodDetails/goodDetails',
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