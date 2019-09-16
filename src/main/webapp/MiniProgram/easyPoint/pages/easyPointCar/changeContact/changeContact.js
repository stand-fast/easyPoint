// pages/easyPointCar/changeContact/changeContact.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
       number:0,
       showModal:false,
       name:"",
       phone:"",
        item_list:[{
            name:"李大华",
            phone:"12345678910"
        },{
            name: "李大华",
            phone: "12345678910"
        }]
    },
    radiochange: function (e) {         //更改选中状态
        var index=e.currentTarget.dataset.index;
        console.log(index)
        this.setData({
            number:index
        })
    },
    change:function(e){     //修改联系人信息
        var index = e.currentTarget.dataset.index;
        var item_list=this.data.item_list;
        this.setData({
            name:item_list[index].name,
            phone:item_list[index].phone,
            showModal:true
        })
    },
    deleteContact:function(e){      //删除联系人
        var index=e.currentTarget.dataset.index;
        var item=this.data.item_list
        for(var i=0;i<item.length;i++){
            if(index==i){
                item.splice(i,1)
            }
        }
        this.setData({
            item_list:item
        })
        wx.showToast({
            title: '已删除',
        })
    },
    getName:function(e){
        this.setData({
            name:e.detail.value
        })
    },
    getPhone:function(e){
        this.setData({
            phone:e.detail.value
        })
    },
    addContact:function(){      //添加联系人
        this.setData({
            showModal:true
        })
    },
    hide_modal:function(){      //隐藏弹窗
        this.setData({
            showModal:false,
        })
    },
    trueBtn:function(e){         //保存修改信息
       var newitem={name:"",phone:""}
       newitem.name=this.data.name;
       newitem.phone=this.data.phone;
        console.log(e.detail.name);
        console.log(newitem)
        this.setData({
            showModal:false,
            item_list:this.data.item_list.concat(newitem)
        })
        wx.showToast({
            title: '成功保存',
            duration:1500
        })
        this.onLoad()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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