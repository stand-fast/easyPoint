// pages/internship/internship.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentTab:0,
      judegeSearch:false,
      pagenum: 1, //初始页默认值为1
      noData:false,
      part_time_job_info:[
      {
          partTimeJobId: "0asdasd", 
          jobName: "移动公司营销实习生",
          jobSalary: "80/天", 
          jobSettle: 1, 
          recruitNum: "4", 
          jobPlace: "天河区", 
          endTime: "07-11"
      },
      {
        partTimeJobId: "0asdasd",
        jobName: "移动公司营销实习生",
        jobSalary: "80/天",
        jobSettle: 1,
        recruitNum: "4",
        jobPlace: "天河区",
        endTime: "07-11"
      },
      {
          partTimeJobId: "0asdasd",
          jobName: "移动公司营销实习生",
          jobSalary: "80/天",
          jobSettle: 1,
          recruitNum: "4",
          jobPlace: "天河区",
          endTime: "07-11"
      },
      {
          partTimeJobId: "0asdasd",
          jobName: "移动公司营销实习生",
          jobSalary: "80/天",
          jobSettle: 1,
          recruitNum: "4",
          jobPlace: "天河区",
          endTime: "07-11"
      },
    ],
  },

  //获取输入框信息
  takeValue:function(e){              
      var that=this
      //console.log(e.detail.value);
      this.setData({
        inputText: e.detail.value
      })
  },
  //搜索功能
  sendMsgTap:function(){          
      console.log(this.data.inputText);
      var selt = this;

      this.data.judegeSearch=true;      //判定搜索状态接上服务器后清除

      // wx.request({
      //   url: '接口路径',
      //   data: {
      //     inputText: this.data.inputText,   //根据搜索信息请求数据
      //   },
      //   method: 'Post',
      //   header: { 'content-type': 'application/x-www-form-urlencoded' },
      //   success: function (res) {
      //     console.log(res.data)
      //     selt.setData({
      //       part_time_job_info: res.data,
      //       judegeSearch:true,      //判定搜索状态
      //       noData:true,          //显示没有更多数据了
      //     })
      //   }
      // })
    },
  //跳转到工作详情界面
    jumbtodetail:function(e){
      var id = e.currentTarget.dataset.id
      //console.log(id)
      wx.navigateTo({
        url: '/pages/partInternJob/JobDetail/JobDetail?type='+this.data.currentTab+"&&id="+id
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
                currentTab: e.target.dataset.current,
                pagenum:1,  //切换界面将pageNum置为0
          })
          // var selt = this;
          // wx.request({
          //   url: '接口路径',
          //   data: {
          //     type: e.target.dataset.current,   //根据current请求数据
          //     pageNum: that.data.pagenum, //从数据里获取当前页数
          //     pageSize: 5, //每页显示条数
          //   },
          //   method: 'Post',
          //   header: { 'content-type': 'application/x-www-form-urlencoded' },
          //   success: function (res) {
          //     console.log(res.data)
          //     selt.setData({
          //       part_time_job_info: res.data,
          //     })
          //   }
          // })
        }
      console.log(e.target.dataset.current)
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getMessage();

  },
  //获得数据
  getMessage: function () {
    var selt = this;
    wx.request({
      url: '接口路径',
      data: {
        type: "0",   //请求兼职数据，其中实习数据type为1
        pageNum: that.data.pagenum, //从数据里获取当前页数
        pageSize: 5, //每页显示条数
      },
      method: 'Post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data)
        selt.setData({
          part_time_job_info: res.data,
        })
      }
    })

  },
  onReachBottom: function () {
    var that = this;
    if (this.data.judegeSearch == false) {   //判断是否为搜索状态，搜索状态上啦刷新
      wx.showToast({
        icon:'loading',
        title: '正在加载',
      })
      var pagenum = that.data.pagenum + 1; //获取当前页数并+1
      that.setData({
        pagenum: pagenum, //更新当前页数
      })
      console.log('加载第'+this.data.pagenum+'页面数据')
      //that.getdatalist();//重新调用请求获得数据
    }
  },
  getdatalist:function(){
    var that = this;
      wx.request({
        url: '请求地址',
        data: {
          type: that.data.currentTab,
          pageNum: that.data.pagenum, //从数据里获取当前页数
          pageSize: 5, //每页显示条数
        },
        method: "POST",
        success: function (res) {
          console.log('请求成功');
          if(res.data==undefined){    //没有数据时候将显示没有数据显示出来
            that.setData({
              noData:true,
            })
          }
          else{
            var arr1 = that.data.part_time_job_info; //从data获取当前part_time_job_info数组
            var arr2 = res.data; //从此次请求返回的数据中获取新数组
            arr1 = arr1.concat(arr2); //合并数组
            that.setData({
              part_time_job_info: arr1 //合并后更新part_time_job_info
            })
          }
        },
        fail: function (err) { 
          console.log('请求失败');
        },//请求失败
      })
    
  },
  onPullDownRefresh: function () {
    this.data.judegeSearch = false,

    this.setData({
      pagenum:1,
    })
    console.log("刷新界面，返回第1页数据")

    wx.showNavigationBarLoading()//在标题栏中显示加载     
    //模拟加载        
    //this.updateData();    //更新数据
    wx.showToast({
      icon:'loading',
      title: '正在刷新',
    })
    setTimeout(function () {
      wx.hideNavigationBarLoading()//完成停止加载      
      wx.stopPullDownRefresh()//停止下拉刷新 
    }, 1500);
  },
  updatData:function(){
    var selt = this;
    wx.request({
      url: '接口路径',
      data: {
        type: selt.data.currentTab,   //根据current请求数据
        pageNum: 1, //获取第一页数据
        pageSize: 5, //每页显示条数
      },
      method: 'Post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data)
        selt.setData({
          part_time_job_info: res.data,
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})