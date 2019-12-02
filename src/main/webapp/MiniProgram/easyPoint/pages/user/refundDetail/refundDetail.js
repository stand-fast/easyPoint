// pages/user/refundDetail/refundDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        btnWord:"取消退款",
        btnColor:"#56b4f6",
        refundDetail:{
            travelOrderId:"1271781671672",
            refundTime:"2019-06-30 18:22",
            money:"3000",
            refund_status:1,
            refundStatusWord:"待处理",
            commitTime:"2019-06-30 18:22",
            passTime:"2019-06-30 18:22",
            failTime:"2019-06-30 18:22",
            refundSuccessTime:"2019-06-30 18:22"
        },
        refundStatusList:[
            "待处理",
            "退款中",
            "退款成功",
            "审核不通过"
        ]
    },

    jumptoRefund:function(){
        if (this.data.refundDetail.refundStatusWord=="申请退款"){
            wx.navigateTo({
                url: '/pages/user/refund/refund'
            })
        }else{
            wx.showToast({
                title: '正在取消退款',
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.travelOrderId;
        console.log(id)

        // 退款按钮文字和状态
        var btnWord="";
        if (this.data.refundDetail.refundStatusWord !="审核不通过"){
            btnWord="取消退款"
        }else{
            btnWord="申请退款"
        }
        var btnColor ="#56b4f6";
        if(this.data.refundDetail.refund_status==2){
            btnColor="#999"
        }

        // 后台获取数据
        wx.request({
            url: '',//接口路径
            method:"POST",
            data:{
                "":id,
            },
            header: { 'content-type':'application/x-www-form-urlencoded' },
            success:function(res){

            }
        })

        this.setData({
            travelOrderId:id,
            btnWord:btnWord,
            btnColor:btnColor
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