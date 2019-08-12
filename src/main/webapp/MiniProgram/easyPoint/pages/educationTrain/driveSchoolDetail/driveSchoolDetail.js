// pages/educationTrain/driveSchoolDetail/driveSchoolDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab:0,
        word:"报名",
        setPrice:0,
        itemstatus:null,
        check:false,
        showmodal:false,
        showModalStatus:false,
        imgUrls:[
            "/images/guotai.png",
            "/images/guotai.png",
            "/images/guotai.png",
            "/images/guotai.png",
            "/images/guotai.png",
        ],
        schoolnfos:{
            name:"广州里程驾校",
            price:4388,
            address: "广州市天河区植物园地铁站出口步行800米", 
            learnTime:["早上08:30—12:00","下午14:00—18:00","晚上19:00—22:00"],
            materials: "身份证原件以及复印件；近期半身免冠正面白底彩色一寸证件照8张；",
            introduce: "国泰驾校成立于2009年1月14日，经营范围“一类普通机动车驾驶员培训”（A1、B2、C1、C2、E），成立以来，在交通管理部门的大力支持下，坚持依法依规开展驾驶员培训业务，自觉维护驾培市场健康发展秩序，严格按照交通部门和公安部门规定的培训教学和考试规定实施培训和考试，保证培训质量和训练安全，为经济社会发展培养了大批合格的机动车驾驶人。现有训练场地19630平方米，教练员86名，教练车148辆。为适应经济社会发展需要，满足广大民众学车的需求，公司培训业务规模不断壮大。公司制定教学质量管理，教学安全，机动车安全责任，教练员责职等，规范业务管理流程，目前是某某地区具有实力，拥有规模最大，具有诚信办学的教学机构，公司的口号“报名学车到润通，勤练驾驶自轻松”的理念。在教练员队伍的素质不断的提高，争取办成全省文明驾校。",
            passRate:"82.36%",
            setList:[{
                setName:"C1广州标准班",
                learnCycle:"4个月拿证",
                setPrice:"4688",
                setTip:"4人一车，周一至周日练车时间灵活"
            },{
                setName: "C1广州全包班",
                learnCycle: "4个月拿证",
                setPrice: "5388",
                setTip: "4人一车，周一至周日练车时间灵活"
                }, {
                    setName: "C1河源商务班",
                    learnCycle: "4个月拿证",
                    setPrice: "4388",
                    setTip: "4人一车，周一至周日练车时间灵活"
                }, {
                    setName: "C2广州标准班",
                    learnCycle: "4个月拿证",
                    setPrice: "4888",
                    setTip: "4人一车，周一至周日练车时间灵活"
                }],
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
    toSignUp:function(){
        this.setData({
            showModalStatus: true
        })
    },
    successBtn:function(){
        wx.navigateTo({
            url: 'pages/educationTrain/driveSchoolDetail/driveSchoolDetail',
        })
        this.setData({
            showmodal:false,
            word:"已报名"
        })
    },
    chooseSet:function(){
        this.setData({
            showmodal: true,
            showModalStatus:false
        })
    },
    showModal: function () {
        // 显示遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
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
    typeClick: function (e) {
        var index = e.currentTarget.dataset.index;
        var typeList=this.data.schoolnfos.setList
        console.log(typeList)
        for (var i = 0; i < typeList.length; i++) {
            if (i == index) {
                this.setData({
                    itemstatus:i,
                    setPrice:typeList[i].setPrice
                })
                break;
            }
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (e) {

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