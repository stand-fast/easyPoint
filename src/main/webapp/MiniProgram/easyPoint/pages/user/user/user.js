// pages/user/user/user.js
var app = getApp();
Page({
    data: {
        order_lists: [ //订单选项数据
            {
                url: "/images/icon/user_signup.png",
                text: "我的报名"
            },
            {
                url: "/images/icon/user_order.png",
                text: "我的订单"
            },
            {
                url: "/images/icon/user_report.png",
                text: "我的发布"
            }
        ],
        item_lists: [ //其他栏目选项数据
            {
                icon: "/images/icon/user_perinfos.png",
                text: "个人信息",
                url: "/pages/user/editInformation/editInformation"
            },
            {
                icon: "/images/icon/user_problem.png",
                text: "联系我们",
                url: ""
            },
            {
                icon: "/images/icon/user_protocal.png",
                text: "协议说明",
                url: "/pages/protocal/protocal/protocal"
            },
            {
                icon: "/images/icon/user_aboutus.png",
                text: "关于我们",
                url: ""
            },
            {
                icon: "/images/icon/user_exit.png",
                text: "退出账号",
            }
        ],
        isLogin: false, //登陆加锁  
        isUserInformation: true, //是否有个人信息
        showProtocalModal: false, //是否显示协议说明弹窗
        showAboutModal: false, //是否显示关于我们弹窗
        showQuitModal: false //是否显示退出账号弹窗
    },
    //页面加载完毕执行函数(放在首位)
    onLoad: function(options) {
        this.getPermission(); //登陆授权、获取用户信息
        if (!wx.getStorageSync("userInformation")) {
            this.setData({
                isUserInformation: false
            })
        }
        // wx.showModal({
        //     title: '授权登录',
        //     content: '为了提供更好的服务，我们需要获取您的信息，请授权登录',
        //     confirmColor:"#00be30",
        //     cancelColor:"#666",
        // })
    },
    //登录授权
    getPermission: function() {
        var that = this;
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    wx.getUserInfo({
                        success: function(res_user) {
                            wx.request({
                                url: 'https://www.easypoint.club/miniProgram/getUserInfoAndToken',
                                data: {
                                    code: res.code, //获取openid的话 需要向后台传递code,利用code请求api获取openid
                                    encryptedData: res_user.encryptedData,
                                    iv: res_user.iv
                                },
                                success: function(res) {
                                    console.log(res);
                                    let userdata = res.data.userInfo;
                                    that.setData({
                                        isLogin: true,
                                        nickName: userdata.nickName,
                                        avatarUrl: userdata.avatarUrl
                                    })
                                    app.globalData.token = res.data.token;
                                    wx.setStorageSync("token", res.data.token);
                                },
                                fail: function() {
                                    wx.showToast({
                                        title: '授权失败，请稍后重试',
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    },
    //进入个人信息编辑界面
    toEditUserInfos: function() {
        if (this.data.isLogin) {
            switch (this.data.isUserInformation) {
                case true:
                    wx.navigateTo({
                        url: '/pages/user/editInformation/editInformation?judge=' + 0
                    })
                    break;
                case false:
                    wx.navigateTo({
                        url: '/pages/user/editInformation/editInformation?judge=' + 1
                    })
                    break;
            }
        } else {
            wx.showToast({
                title: '请先授权登陆',
                icon: "none"
            })
        }
    },
    //进入订单界面 1：我的报名，2：我的订单，3：我的发布
    toOrder: function(e) {
        var index = e.currentTarget.dataset.index;
        if (this.data.isLogin) {
            switch (index) {
                case 0:
                    wx.navigateTo({
                        url: '',
                    })
                    break;
                case 1:
                    wx.navigateTo({
                        url: '/pages/user/myOrder/myOrder?type=' + 0,
                    })
                    break;
                case 2:
                    wx.navigateTo({
                        url: '',
                    })
                    break;
            }
        } else {
            wx.showToast({
                title: '请先授权登陆',
                icon: "none"
            })
        }

    },
    //进入遍历数据的界面
    toItem: function(e) {
        var index = e.currentTarget.dataset.index;
        if(index == 1){
        }else if (index == 2) {
            this.setData({
                showProtocalModal: !this.data.showProtocalModal
            })
        } else if (index == 3) {
            this.setData({
                showAboutModal: !this.data.showAboutModal
            })
        } else if (index == 4) {
            this.setData({
                showQuitModal: !this.data.showQuitModal
            })
        } else {
            wx.navigateTo({
                url: this.data.item_lists[index].url,
            })
        }
    },
    // 弹窗按钮
    modalBtn: function(e) {
        let type = e.currentTarget.dataset.type
        if (type == "protocalcancle") {
            this.setData({
                showProtocalModal: !this.data.showProtocalModal
            })
        } else if (type == "protocalcomfirm") {
            wx.navigateTo({
                url: this.data.item_lists[2].url
            })
        } else if (type == "aboutcancle") {
            this.setData({
                showAboutModal: !this.data.showAboutModal
            })
        } else if (type == "aboutcomfirm") {
            wx.navigateTo({
                url: '/pages/user/aboutus/aboutus',
            })
        } else if (type == "quitcancle") {
            this.setData({
                showQuitModal: !this.data.showQuitModal
            })
        } else if (type == "quitcomfirm") {
            // 这里要加退出登录事件的相关代码

            this.setData({
                showQuitModal: !this.data.showQuitModal
            })
        }
    },
    onShow:function(){
        this.setData({
            showAboutModal:false,
            showProtocalModal:false,
            showQuitModal:false
        })
    }
})