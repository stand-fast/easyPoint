// pages/IdleAndRental/ldleRenIndex/ldleRenIndex.js
const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab:0,
        flag:0,
        isIphoneX:false,
        advertisementUrl:[
            "/images/zulin.png",
            "/images/zulin.png",
            "/images/zulin.png",
        ],
        goodsType: [
            { goodsTypeId: 0, goodsTypeName:"音响设备"},
            { goodsTypeId: 1, goodsTypeName:"电子设备"},
            { goodsTypeId: 2, goodsTypeName:"玩具套餐"},
            { goodsTypeId: 3, goodsTypeName:"正装用品"}   
        ],
        rent_list:[{
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
        },{
            goodId: "sdf12313456asdsa546",
            pro_img: "/images/goodImg.png",
            goodName: "50米长充电灯带",
            leaseNum: 7,
            price: 20
        }],
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
            // var selt = this;
            // wx.request({
            //   url: '接口路径',
            //   data: {
            //     type: e.target.dataset.current,   //切换数据
            //     goodsTypeId: "0",   //请求音响数据
            //   },
            //   method: 'Post',
            //   header: { 'content-type': 'application/x-www-form-urlencoded' },
            //   success: function (res) {
            //     console.log(res.data)
            //     selt.setData({
            //       rent_list: res.data,
            //     })
            //   }
            // })
            //console.log(e.target.dataset.current)
        }
    },
    changeList: function (e) {
        if (this.data.flag === e.target.dataset.index) {
            return false;
        }
        else {
            // var selt = this;
            // wx.request({
            //   url: '接口路径',
            //   data: {
            //     type: "0",   //请求租赁数据
            //     goodsTypeId: e.target.dataset.index,   //请求音响数据
            //   },
            //   method: 'Post',
            //   header: { 'content-type': 'application/x-www-form-urlencoded' },
            //   success: function (res) {
            //     console.log(res.data)
            //     selt.setData({
            //       rent_list: res.data,
            //       flag: e.target.dataset.index,
            //     })
            //   }
            // })

            //接上服务器后删除这段
            this.setData({
                flag: e.target.dataset.index,
            })
            console.log(e.target.dataset.index);
        }
    },
  lookDetail: function (e) {
      var index = e.currentTarget.dataset.index;
      wx.navigateTo({
          url: '/pages/IdleAndRental/goodDetails/goodDetails?id='+index,
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    // this.getMessage();             //获取租赁物品音响数据
    // this.getMessageType();           //获取租赁物品种类数据
    
    var goodsTypeInterface=[];
    var goodsType=this.data.goodsType;
    for (var i=0; i < goodsType.length;++i){
      goodsTypeInterface.push(goodsType[i].goodsTypeName)
      //console.log(goodsType[i].goodsTypeName)
    //获取机型适配iPhoneX系列
        var isiphoneX = app.globalData.isIphoneX
        console.log(isiphoneX)
    }
    this.setData({
      goodsTypeInterface: goodsTypeInterface,
      isIphoneX:isiphoneX
    })
  },
  //获得数据
  getMessage: function () {
    var selt = this;
    wx.request({
      url: '接口路径',
      data: {
        type: "0",   //请求租赁数据
        goodsTypeId: "0",   //请求音响数据
      },
      method: 'Post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data)
        selt.setData({
          rent_list: res.data,
        })
      }
    })
  },
  //获取种类数据
  getMessageType:function(){
    var selt = this;
    wx.request({
      url: '接口路径',
      data: {
        type: "0",   //请求租赁种类数据
      },
      method: 'Post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data)
        selt.setData({
          goodsType: res.data,
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