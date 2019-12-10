// pages/IdleAndRental/ldleRenIndex/ldleRenIndex.js
const app=getApp()
Page({
  data: {
    currentTab:0,//选项卡0：租赁物品，1：闲置共享
    flag:0,//租赁-左侧种类索引
    advertisementUrl:[//轮播图
        "/images/zulin.png",
        "/images/zulin.png",
        "/images/zulin.png",
    ],
    goodsTypeInterface: [//租赁种类数据
      { goodsTypeId: 0, goodsTypeName:"音响设备"},
      { goodsTypeId: 1, goodsTypeName:"电子设备"},
      { goodsTypeId: 2, goodsTypeName:"玩具套餐"},
      { goodsTypeId: 3, goodsTypeName:"正装用品"}   
    ],
    rent_list:[//租赁商品数据
      {
        goodId:"1243514436",
        pro_img:"/images/goodImg.png",
        goodName:"50米长充电灯带",
        leaseNum:7,
        price:20
      },
      {
        goodId: "134131321",
        pro_img: "/images/goodImg.png",
        goodName: "50米长充电灯带",
        leaseNum: 7,
        price: 20
      },
      {
        goodId: "1235346243",
        pro_img: "/images/goodImg.png",
        goodName: "50米长充电灯带",
        leaseNum: 7,
        price: 20
      },
      {
        goodId: "1235346243",
        pro_img: "/images/goodImg.png",
        goodName: "50米长充电灯带",
        leaseNum: 7,
        price: 20
      },
      {
        goodId: "1235346243",
        pro_img: "/images/goodImg.png",
        goodName: "50米长充电灯带",
        leaseNum: 7,
        price: 20
      },
      {
        goodId: "1235346243",
        pro_img: "/images/goodImg.png",
        goodName: "50米长充电灯带",
        leaseNum: 7,
        price: 20
      }
    ],
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    // this.getMessage();             //获取租赁物品音响数据
    // this.getMessageType();           //获取租赁物品种类数据
  },
  //租赁-获得数据
  getMessage: function () {
    let that = this;
    let token = app.globalData.token;
    wx.request({
      url: '接口路径',
      data: {
        type: "0",   //请求租赁数据
        goodsTypeId: "0",   //请求音响数据
      },
      method: 'Post',
      header: { 'content-type': 'application/x-www-form-urlencoded', token},
      success: function (res) {
        let code = res.data.code;
        if (res.header.token != undefined) {
          app.replaceToken(res.header.token);
        }
        switch (code) {
          case 200:
            that.setData({
              rent_list: res.data,
            })
            break;
          case 501:
            app.getPermission();
            break;
        }
      }
    })
  },
  //租赁-获取种类数据
  getMessageType: function () {
    let that = this;
    let token = app.globalData.token;
    wx.request({
      url: '接口路径',
      data: {
        type: "0",   //请求租赁种类数据
      },
      method: 'Post',
      header: { 'content-type': 'application/x-www-form-urlencoded', token },
      success: function (res) {
        let code = res.data.code;
        if (res.header.token != undefined) {
          app.replaceToken(res.header.token);
        }
        switch (code) {
          case 200:
            that.setData({
              goodsType: res.data,
            })
            break;
          case 501:
            app.getPermission();
            break;
        }
      }
    })
  },
  //切换选项卡0：租赁物品，1：闲置共享
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
        return false;
    }
    else {
        that.setData({
            currentTab: e.target.dataset.current,
        })
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
        //     that.setData({
        //       rent_list: res.data,
        //     })
        //   }
        // })
        //console.log(e.target.dataset.current)
    }
  },
  //租赁-切换种类数据，并请求数据
  changeList: function (e) {
    let that = this;
    if (this.data.flag === e.target.dataset.index) {
        return false;
    }
    else {
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
        //     that.setData({
        //       rent_list: res.data,
        //       flag: e.target.dataset.index,
        //     })
        //   }
        // })
        //接上服务器后删除这段
        this.setData({
            flag: e.target.dataset.index,
        })
      }
  },
  //租赁-跳转物品商品详情
  lookDetail: function (e) {
    wx.navigateTo({
      url: '/pages/IdleAndRental/goodDetails/goodDetails?id=' + e.currentTarget.dataset.id,
    })
  },
})