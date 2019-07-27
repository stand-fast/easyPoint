Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentab:0,
        word:"我要报名",
        statusWord:"兼职",
        btnColor:'#56b4f6',
        fileName:"wszhirijsdcdakjcjdk.doc",
        status:false,
        showModal:false,
        successShowmodal:false,
        finishShowmodal:false,
        jobCNS:[{
            jobName: "校内自助餐厅服务员", 
            jobSalary: "80/天",
             jobSettle: "日结",
             jobContent:"负责在上菜区将菜品及时摆出，保证出餐窗口的整洁干净，及时跟进顾客的饮食情况，在结账窗口对顾客的菜品消费进行数目结账"
            }],
        jobDetail:[{
            jobSex:"不限",
            jobLocation:"本部北苑食堂二楼",
            jobDate:"2019-09-01 到 2019-12-31",
            jobTime:"10:00-15:00",
            jobNumber:1,
            jobWelfare:"中午包餐、不定时水果甜点小吃福利赠送",
            jobRequest:"为人热情大方、开朗，性格活泼，做事负责"
        }],
        firmDetail:[{
            firmContact:"陈先生",
            firmPhone:"123-1234-1234",
            firmIntroduce:"校内食堂，为广大师生提供早餐午餐、晚餐以及夜宵等叭叭叭叭叭叭叭叭........"
        }]
    },
    //兼职部分JS事件响应
    submiting:function(){          //提交我要报名
        this.setData({
            showModal: true,
        })
    },
    modal_click_Hidden: function () {       //隐藏弹框
        this.setData({
            showModal: false,
        })
    },
    btnSure:function(){         //同意继续事件
        this.setData({
            successShowmodal:true,
            showModal: false,
        })
    },
    successBtn:function(){          //兼职报名成功事件
        this.setData({
            word:"已报名",
            status:true,
            successShowmodal:false
        })
    },

    //实习JS事件响应
    //选择上传文件
    chooseFiles:function(){
        var that=this
        wx.chooseMessageFile({      //模拟机上会报错，真机上可运行，不会出现这种问题
            count: 1,
            type: 'file',
            success(res) {
                const tempFilePaths = res.tempFilePaths
                this.setData({
                    fileName:res.tempFilePaths
                })
            }
        })
    },
    // 文件上传
    fileUnloadBtn:function(){           //这里需要重新看代码，我不确定可不可以
        wx.uploadFile({
            url: '',        //服务器地址
            filePath: this.data.fileName,
            name: 'file',
            formData:{
                name:encodeURI(filePath),
            },
            success:function(res){
                this.setData({
                    successShowmodal: false,
                    finishShowmodal: true,
                })
            },
            fail:function(res){

            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        if (options.currentab === '1'){
            this.setData({
                currentab:options.currentab,
                word: "投递简历",
                statusWord: "实习",
            })
        }
        if (options.remianum === '0') {
            this.setData({
                word: "人数已满",
                btnColor: '#999',
            })
        } 
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