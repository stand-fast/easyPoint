// pages/IdleAndRental/goodDetails/goodDetails.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        word: "租借",
        setPrice: 0,
        rentDays:0,
        chooseType:'',
        chooseSize:'',
        chooseNumber:0,
        rentNumber:0,
        typeclick: null,
        sizeclick:null,
        sizeHeight:100,
        typeHeight:100,
        chooseImg: "/images/goodImg.png",
        check: false,
        dateTime: null, //开始时间value
        dateTimeArray: null, //开始时间数组
        showModalStatus: false,
        good_details_info:{
            defaultImgUrl:[
                "/images/guotai.png",
                "/images/guotai.png",
                "/images/guotai.png",
                "/images/guotai.png",
                "/images/guotai.png",
            ],
            goodName:"西装男女全套",
            goodPrice:30,
            cashPledge:100,
            provider:"小玖正装",
            hadRentTime:7,
            goodContent: "高级布料，防水质量男士西装可配领带领带有黑色，蓝色可供选择物品可保证已清洗整洁",
            goodTypes:[
                "女士黑色面试正装全套，各种码数均有",
                "男士黑色面试正装全套，各种码数均有"
            ],
            cashExplain: "为了保证物品的，租借商品需先缴纳押金，以保证商品的完好归还，押金会在还货后如数归还，如有物品损坏丢失情况，会有客服进行商议，按情况另外扣去一定费用。",
            takeGood: "由客服通知物品已经包装完毕，用户可以自行前往指定地点取货",
            returnGood: "用户使用完毕后请确定清洗物品干净，即可送至指定地点归还，一般租借期限为3天",
            businessTime:"早上10：30至晚上21：00",
            goodTypes_list:[{
                list_id:0,
                list_picture:"/images/goodImg.png",
                list_name:"男士正装全套",
                list_price:"130",
                },{
                list_id:1,
                list_picture:"/images/goodImg.png",
                list_name:"女士正装全套",
                list_price: "110",
                },{
                list_id: 2,
                list_picture: "/images/goodImg.png",
                list_name: "女士正装全套",
                list_price: "110",
                }, {
                    list_id: 3,
                    list_picture: "/images/goodImg.png",
                    list_name: "女士正装全套",
                    list_price: "110",
                }],
            goodSize_list: ["S", "M", "L", "XL", "XXL"],
            maxRentDay: 5
        }
    },
    swichNav: function (e) {
        var that = this;
        if (this.data.currentTab === e.currentTarget.dataset.current) {
            return false;
        }
        else {
            that.setData({
                currentTab: e.currentTarget.dataset.current,
            })
        }
    },
    checkChange: function (e) {
        var check = this.data.check;
        check = !check;
        this.setData({
            check: check
        })
    },
    toRent: function () {
        if (this.data.check == true) {
            this.setData({
                showModalStatus: true
            })
        }
        else {
            wx.showToast({
                title: '请浏览并同意易点协议',
                icon: 'none',
                duration: 2000
            })
        }
    },
    showModal: function () {
        // 显示遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay:0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: true
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 200)
    },
    hideModal: function () {
        // 隐藏遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export(),
                showModalStatus: false
            })
        }.bind(this), 200)
    },
    //点击选择类别
    typeClick: function (e) {
        var index = e.currentTarget.dataset.index;
        var goodTypes_list = this.data.good_details_info.goodTypes_list
        for (var i = 0; i < goodTypes_list.length; i++) {
            if (i == index) {
                this.setData({
                    typeclick: i,
                    chooseType:goodTypes_list[i].list_name,
                    setPrice:goodTypes_list[i].list_price, 
                    chooseImg: goodTypes_list[i].list_picture
                })
                break;
            }
        }
    },
    //点击选择码数
    sizeClick: function (e) {
        var index = e.currentTarget.dataset.index;
        var goodSize_list = this.data.good_details_info.goodSize_list;
        for (var i = 0; i < goodSize_list.length; i++) {
            if (i == index) {
                this.setData({
                    sizeclick: i,
                    chooseSize: goodSize_list[i],
                })
                break;
            }
        }
    },
//选择取货时间
    changeDateTime: function (e) {
        let arr = e.detail.value
        let dateArr = this.data.dateTimeArray;
        this.setData({
            startTime: dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]]
        });
    },
    //某一列的值改变时触发
    changeDateTimeColumn: function (e) {
        let arr = this.data.dateTime
        let dateArr = this.data.dateTimeArray;
        arr[e.detail.column] = e.detail.value;
        this.setData({
            startTime: dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]]
        });
    },
    //点击减号
    bindMinus: function () {
        var num = this.data.chooseNumber; 
        if (num >=1) {
            num--;
        }
        else{
            num=0;
        }
        this.setData({
            chooseNumber: num,
        });
    },
    bindMinus1: function () {
        var num = this.data.rentDays;
        if (num >= 1) {
            num--;
        }
        else {
            num = 0;
        }
        this.setData({
            rentDays: num,
        });
    },
    /* 点击加号 */
    bindPlus: function () {
        var num = this.data.chooseNumber;
        var maxNum=this.data.good_details_info.maxRentDay;
        num++; 
        if(num>maxNum){
            num=maxNum
        }
        this.setData({
            chooseNumber: num,
        });
    },
    bindPlus1: function () {
        var num = this.data.rentDays;
        var maxNum = this.data.good_details_info.maxRentDay;
        num++;
        if(num>maxNum){
            num=maxNum
        }
        this.setData({
           rentDays: num,
        });
    },
    //跳转到订单详情
    toOrder:function(e){
        wx.navigateTo({
            url: '/pages/IdleAndRental/confirmOrder/confirmOrder',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取完整的年月日 时分秒，以及默认显示的数组
        var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        // 精确到分的处理，将数组的秒去掉
        var lastArray = obj1.dateTimeArray.pop();
        var lastTime = obj1.dateTime.pop();
        this.setData({
            dateTimeArray: obj1.dateTimeArray,
            dateTime: obj1.dateTime,
        });

        var typenum = this.data.good_details_info.goodTypes_list.length
        if(typenum>3){
            var time=typenum/3
            if(typenum%3!=0){
                time=time+1
            }
            this.setData({
                typeHeight:80*time
            })
        }
        var sizenum=this.data.good_details_info.goodSize_list.length
        if(sizenum>6){
            var time=sizenum/6
            if(sizenum%6!=0){
                time=time+1
            }
            this.setData({
                sizeHeight:80*time
            })
        }
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