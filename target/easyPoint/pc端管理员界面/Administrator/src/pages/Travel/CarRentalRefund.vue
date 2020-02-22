<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>租车退款订单</h1>
        <div class="wrapperOrder">
          <li class="bigger">订单编号</li>
          <li>联系人</li>
          <li class="bigger">联系方式</li>
          <li>退款金额</li>
          <li class="time">退款时间</li>
          <li class="bigger">退款状态</li>
          <li>操作</li>
        </div>
        <!-- 遍历退款订单数据 -->
        <!-- 每页9条 状态:1：待处理，2：审核不通过；3：审核通过；4：已取消-->
        <div class="wrapperOrder" v-for="item in datas" :key="item.transactionId">
          <li class="bigger" :title="item.transactionId">{{item.transactionId}}</li>
          <li :title="item.passenger">{{item.passenger}}</li>
          <li class="bigger" :title="item.phone">{{item.phone}}</li>
          <li :title="item.refundMoney">￥{{item.refundMoney}}</li>
          <li class="time place" :title="item.requestRefundTime">
            <span>{{item.requestRefundTime}}</span>
          </li>
          <li class="bigger" v-if="item.refundState==1">待处理</li>
          <li class="bigger" v-if="item.refundState==2">审核不通过</li>
          <li class="bigger" v-if="item.refundState==3">审核通过</li>
          <li class="bigger" v-if="item.refundState==4">已取消</li>
          <li class="enter" @click="dealOrder(item.tourismRefundId)">处理</li>
        </div>
        <!-- 页码组件 -->
        <paging
          :value="current"
          :pageSize="pageSize"
          :pageNumber="pageNumber"
          :panelNumber="panelNumber"
          @input="handlePageChange"
        ></paging>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navName: '旅游出行',
      navPlateName: '租车退款订单',
      datas: [], //退款订单数据
      pageSize: 10, //每页最大条数
      panelNumber: 5, //最多显示多少个分页按钮
      current: 1, //当前页码
      pageNumber: 5 //页码总数
    }
  },
  mounted() {
    this.setData()
  },
  methods: {
    //获取首页数据以及页码总数
    async setData() {
      let that = this
      window.onscroll = e => e.preventDefault() //兼容浏览器
      this.$http
        .get('tourismRefund/FirstPage')
        .then(function(res) {
          console.log(res.data)
          let data = res.data
          let code = data.code
          switch (code) {
            case 200:
              that.pageNumber = data.data.totalPage
              that.datas = data.data.tourismRefundInfoList
              console.log('请求退款订单首页数据和总页数成功')
              break
            case 201:
              alert('暂无订单信息')
              break
            default:
              that.$judgeToken(code)
              break
          }
        })
        .catch(function(e) {
          console.log(e)
        })
    },
    //获取分页
    handlePageChange(pageNum) {
      let that = this
      this.$http
        .get('tourismRefunds/page', { params })
        .then(function(res) {
          console.log(res.data)
          let data = res.data
          let code = data.code
          switch (code) {
            case 200:
              that.current = pageNum
              that.datas = data.data
              console.log(data.message)
              break
            case 201:
              alert(data.message)
              break
            case 401:
              alert(data.message)
              break
            default:
              that.$judgeToken(code)
              break
          }
        })
        .catch(function(e) {
          console.log(e)
        })
    },
    //跳转订单详情
    dealOrder(id) {
      this.$router.push('/DealOrder/' + id)
    },
    //格式化退款状态数据
    formatState: function(row, column, cellValue, index) {
      switch (row.refundState) {
        case 1:
          return '待处理'
        case 2:
          return '审核不通过'
        case 3:
          return '审核通过'
        case 4:
          return '已取消'
      }
    }
  },
  components: {}
}
</script>