<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>购票详情</h1>
        <div class="purchaseDetails title">
          <li class="navBigger">姓名</li>
          <li class="navBigger">联系方式</li>
          <li class="navBigger">票价</li>
          <li class="navBigger">数量</li>
          <li class="navBigger">购票时间</li>
        </div>
        <div class="purchaseDetails type" v-for="(item,index) in datas" :key="index">
          <li class="navBigger">{{item.name||"未添加"}}</li>
          <li class="navBigger">{{item.phone||"未添加"}}</li>
          <li class="navBigger">￥{{item.price||"未添加"}}</li>
          <li class="navBigger">{{item.buyNum||"未添加"}}</li>
          <li class="navBigger">{{item.buyTime||"未添加"}}</li>
        </div>

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
      plateId: -1,
      navName: '校友会包车',
      navPlateName: '购票详情',
      plateId: -1, //订单id
      datas: [], //订单购票详情数据
      pageSize: 8, //每页最大条数
      current: 1, //当前页码
      pageNumber: 5 //页码总数
    }
  },
  mounted() {
    this.plateId = this.$route.params.id
    console.log('根据' + this.plateId + '请求数据')
    this.setData() //获取订单数据
  },
  methods: {
    async setData() {
      window.onscroll = e => e.preventDefault() //兼容浏览器
      console.log('请求购票详情数据')
      var qs = require('qs')
      var postData = {
        params: {
          ticketId: this.plateId,
          startIndex: this.current,
          pageSize: this.pageSize
        }
      }
      var url = 'https://easypoint.club/administrator/findBuyDetail'
      window.onscroll = e => e.preventDefault() //兼容浏览器
      this.$http
        .get(url, postData)
        .then(res => {
          console.log(res.data)
          var data = res.data
          switch (data.code) {
            case 0:
              alert('暂无购票信息')
              break
            case 1:
              console.log('查询成功')
              this.datas = data.data.detail
              this.pageNumber =
                data.data.total % 10 == 0
                  ? data.data.total / 10
                  : parseInt(data.data.total / 10) + 1
              break
            case 2:
              alert('参数为空')
              break
            case 3:
              alert('页码超出最大范围')
              break
          }
        })
        .catch(function(e) {
          console.log(e)
        })
    },
    handlePageChange(pageNum) {
      this.current = pageNum
      this.setData(this.id)
    }
  },
  components: {}
}
</script>