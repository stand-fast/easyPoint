Page({
    /**
     * 页面的初始数据
     */
    data: {
        currentab:0,
        word:"我要报名",
        btnColor:'#56b4f6',
        status:false,
        showModal:false,
        failToSignUp:false,
        successShowmodal:false,
        finishShowmodal:false,
        part_time_job_id:'',
        fileName:'',   
        jobCNS:{
            job_name: "校内自助餐厅服务员", 
            job_salary: "30/日",
            job_settle: 2,
            job_content:"负责在上菜区将菜品及时摆出，保证出餐窗口的整洁干净，及时跟进顾客的饮食情况，在结账窗口对顾客的菜品消费进行数目结账",
            sex: 3,
            job_time: "10:00-15:00",
            job_place:"本部北苑食堂二楼",
            job_date:"2019-09-01 到 2019-12-31",
            recruit_num:3,
            welfare:"中午包餐、不定时水果甜点小吃福利赠送",
            requirement:"为人热情大方、开朗，性格活泼，做事负责",
            applicant_num:0,
            state:1,

            boolean:false,     //判断是否报名该兼职
            legal_person:"陈先生",
            phone:"123-1234-1234",
            company_introduce:"校内食堂，为广大师生提供早餐午餐、晚餐以及夜宵等叭叭叭叭叭叭叭叭........"
        }
    },
    //兼职部分JS事件响应
  submiting: function () {          //查询用户是否填写信息 提交我要报名  
      var that=this;
      //查询用户是否填写信息(进入小程序时候查询的话这段可删除)
      // wx.request({
      //   url: '接口路径',
      //   header: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   method: "POST",
      //   data: {
      //     apply_id: app.globalData.open_id,     
      //   },
      //   success: function (res) {
      //     console.log('请求数据成功')
      //     console.log(res.data);
      //     if(res.data==undefined){
      //       wx.navigateTo({
      //         url: '',    //跳转到信息界面添加数据
      //       })
      //     }
      //     else{
      //     that.data.uid=res.data;
      //     //提交我要报名
      //     that.setData({
      //       showModal: true,
      //       })
      //     }
      //   },
      //   fail:function(res){
      //     console.log('请求数据失败')
      //   }
      // })

      //提交我要报名
        that.setData({
            showModal: true,
        })
    },
    modal_click_Hidden: function () {       //隐藏弹框
        this.setData({
            showModal: false,
            finishShowmodal: false,
        })
    },
    btnSure:function(){
      this.setData({
        showModal: false,
        successShowmodal: true,
      })
    },
    successBtn:function(){          //兼职报名成功事件
      var that=this;
      // wx.request({
      //   url: '接口路径',
      //   header: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   method: "POST",
      //   data: {
      //     apply_id: app.globalData.open_id,
      //     part_time_job_id: that.data.part_time_job_id,
      //     username: that.data.userInformation.username,
      //     phone: that.data.userInformation.phone,
      //     gender: that.data.userInformation.gender,
      //   },
      //   success: function (res) {   //反馈回报名是否成功的信息
      //       console.log(res.data);
      //       if (res.data.status==true){   //判断是否报名成功，报名成功显示报名成功弹窗
      //         that.setData({
      //            successShowmodal: true,
      //            showModal: false,
      //            word: "已报名",
      //            status: true,
      //         })
      //       }
      //       else{       //人数已满报名失败显示报名失败弹窗
      //         that.setData({
      //           failToSignUp: true,
      //           showModal: false,
      //           word: "人数已满",
      //           btnColor: '#999',
      //           status: true,
      //         })
      //       }
      //   }
      // })
      
      //接上服务器后删除
      that.setData({
        successShowmodal:true,
        showModal: false,
        word: "已报名",
        status: true,
      })
    },
   partTimeDetermine:function(){
     this.setData({
       successShowmodal: false,
     })
   },
  practiceDetermine: function () {
    this.setData({
      finishShowmodal: false,
    })
  },
   falseBtn:function(){
        wx.navigateBack({
            delta:1,
        })
    },
    //选择上传简历文件
   chooseFile:function(){
        var that=this
        wx.chooseMessageFile({      
            count: 1,
            type: 'file',
            success(res) {
              const tempFiles = res.tempFiles[0];
              console.log(tempFiles);
              that.setData({
                fileName: tempFiles.name,
                resumeFilePath: tempFiles.path,
              })
            }
        })
    },
    // 简历文件上传
    fileUnloadBtn:function(){           
      var that=this;
        // wx.uploadFile({
        //     url: '',        //接口路径
        //     filePath: that.data.resumeFilePath,
        //     name: 'file',
        //     formData:{
        //       resumeName: that.data.fileName,
        //     },
        //   success: function (res) {
        //     console.log('上传成功');
        //         that.setData({
        //             successShowmodal: false,
        //             finishShowmodal: true,
        //         })
        //     },
        //     fail:function(res){
        //       console.log('上传失败');
        //     }
        // })
      that.setData({       //成功接上服务器后删除
        word: '已投递',
        successShowmodal: false,
        finishShowmodal: true,
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    var that = this;
    console.log(options.id)
    this.data.part_time_job_id = options.id
    this.setData({
      type: options.type,
      jobDetail: this.data.jobCNS   //请求数据后删除这行
    })
    if(options.type==0){
        wx.setNavigationBarTitle({
            title: '兼职详情',
        })
    }
    else if(options.type==1){
        wx.setNavigationBarTitle({
            title: '实习详情',
        })
    }
    //获取乘客姓名以及联系方式
    // var userInformation = wx.getStorageSync('userInformation');
    // this.setData({
    //   userInformation: userInformation,
    // })

    // wx.request({
    //   url: '接口路径',
    //   data: {
    //     part_time_job_id: options.id,   //根据part_time_job_id请求数据
    //   },
    //   method: 'Post',
    //   header: { 'content-type': 'application/x-www-form-urlencoded' },
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       jobDetail: res.data,
    //     })
    //   }
    // })

    //判断该用户是否报名该兼职
    if (options.type == '0'){
      if ((this.data.jobDetail.applicant_num >= this.data.jobDetail.recruit_num) && (options.type == '0')) {
        this.setData({
          word: "人数已满",
          btnColor: '#999',
          status: true,
        })
      }
      //this.judgingPartTime();
    }
    if (options.type == '1'){
        this.setData({
            word: "投递简历",
            statusWord: "实习",
        })
      //this.judgingDeliver();     判断该用户是否投递实习
      } 
  },
  judgingPartTime: function () {
    var that=this;
    wx.request({
      url: '接口路径',
      data: {
        part_time_job_id: options.id,   //根据part_time_job_id请求数据
        apply_id: app.globalData.open_id,   
      },
      method: 'Post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data)
        if(res.data==true){
          that.setData({
            word: "已报名",
            status: true,
            successShowmodal: false
          })
        }
      }
    })

  },
  judgingDeliver: function () {
    var that=this;
      wx.request({
        url: '接口路径',
        data: {
          part_time_job_id: options.id,   //根据part_time_job_id请求数据
          apply_id: app.globalData.open_id,   
        },
        method: 'Post',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log(res.data)    
          if (res.data.deliverNum=='3'){     //当投递次数为3的时候，显示已投递
            that.setData({     
              word:'已投递',
              successShowmodal: false,
              finishShowmodal: true,
            })
          }
        }
      })

  },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {

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