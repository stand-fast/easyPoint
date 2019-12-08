// pages/myIndex/myindex/myindex.js
var app = getApp()
Page({
  data: {
    hasAnnounce: false, //是否有新公告
    announcementMessage: [//公告
          "易点高校生活服务平台正式上线！",
          "易点在线小助手，解决您的大学日常生活！"
      ],
      
    ads: [//轮播图
          "/images/myindex/adbg1.png",
          "/images/myindex/adbg1.png",
          "/images/myindex/adbg1.png"
      ],
      //菜单数据
    navs: [  //菜单数据
        {
          imgurl:"/images/icon/rent_icon.png",
          name:"租赁闲置"
        },
        {
          imgurl:"/images/icon/car_icon.png",
          name:"易点出行"
        },
        {
          imgurl:"/images/icon/edu_icon.png",
          name:"教育培训"
        },
        {
            imgurl:"/images/icon/travel_icon.png",
            name:"旅游住宿"
        },
        {
            imgurl:"/images/icon/partime_icon.png",
            name:"兼职实习"
        },
        {
            imgurl:"/images/icon/food_icon.png",
            name:"娱乐美食"
        }
      ],
      
    hot_list: [//近期热门数据
        {
          imgUrl:"/images/ads/rujiahotel.png",
          recentHotName:"如家酒店",
          price:"398"
        }, 
        {
          imgUrl: "/images/ads/rujiahotel.png",
          recentHotName: "如家酒店",
          price: "398"
        }, 
        {
          imgUrl: "/images/ads/rujiahotel.png",
          recentHotName: "如家酒店",
          price: "398"
        }, 
        {
          imgUrl: "/images/ads/rujiahotel.png",
          recentHotName: "如家酒店",
          price: "398"
        }, 
        {
          imgUrl: "/images/ads/rujiahotel.png",
          recentHotName: "如家酒店",
          price: "398"
        }, 
        {
          imgUrl: "/images/ads/rujiahotel.png",
          recentHotName: "如家酒店",
          price: "398"
        }
      ]
  },
  //页面加载完毕执行函数(放在首位)
  onLoad: function (options) {
    var token = wx.getStorageSync("token");
    app.globalData.token = token;
    // this.getMessage();
    // this.getAnnouncements();
  },
  jumpToDetail:function(e){
      let id=e.currentTarget.dataset.index;
      switch(id){
        case 0:
          wx.navigateTo({
            url: '/pages/IdleAndRental/ldleRenIndex/ldleRenIndex',
          })
          break;
        case 1:
          wx.navigateTo({
            url: '/pages/easyPointCar/bookTicket/bookTicket',
          })
          break;
        case 2:
          wx.navigateTo({
            url: '/pages/educationTrain/edTraIndex/edTraIndex',
          })
          break;
        case 3:
          wx.navigateTo({
            url: '',
          })
          break;
        case 4:
          wx.navigateTo({
            url: '/pages/partInternJob/partimeJob/partimeJob',
          })
          break;
        case 5:
          wx.navigateTo({
            url: '',
          })
          break;
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
    //跳转到搜索界面
    toSearch:function(){
        wx.redirectTo({
            url: '/pages/myIndex/search/search',
        })
    },
  //获得数据
  getMessage: function () {
    var selt = this;
    wx.request({
      url: '接口路径',
      method: 'Post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data)
        selt.setData({
          hot_list: res.data,
        })
        if (res.data.code == 400) {
          console.log(res.data.msg)
          wx.setStorageSync("token", res.data.data),
            selt.getMessage()
        }
      }
    })
  },
  getAnnouncements:function(){
    var selt = this;
    wx.request({
      url: '接口路径',
      method: 'Post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data)
        selt.setData({
          announcementMessage: res.data,
        })
      }
    })
  },
})