<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>我的历史发布订单</h1>
        <div class="table-scroll">
          <div class="renderOrderNav title">
            <li class="navmiddle">同乡会</li>
            <li class="navBigger">出发地</li>
            <li class="navBigger">目的地</li>
            <li class="navTime">出发时间</li>
            <li class="navTime">发布时间</li>
            <li class="navmiddle">车辆类型</li>
            <li class="navmiddle">售价</li>
            <li class="navmiddle">剩余票数</li>
            <li class="navmiddle">购票详情</li>
            <li class="navmiddle">车辆信息</li>
            <li class="navSmall">操作</li>
          </div>
          <div class="renderOrderNav type" v-for="item in ticketList" :key="item.ticketId">
            <li class="navmiddle">{{item.associationName}}</li>
            <li class="navBigger">{{item.departurePlace}}</li>
            <li class="navBigger">{{item.destination}}</li>
            <li class="navTime">{{item.departureDay}}&nbsp;{{item.departureTime}}</li>
            <li class="navTime">{{item.issueTime}}</li>
            <li class="navmiddle">{{item.seatNum}}座大巴</li>
            <li class="navmiddle">￥{{item.price}}</li>
            <li class="navmiddle">{{item.seatSurplus}}</li>
            <li class="navmiddle enter" @click="purchaseDetails(item.ticketId)">购票详情</li>
            <li class="navmiddle enter" @click="vehicleInformation(item.ticketId)">车辆信息</li>
            <li class="navSmall enter" @click="shelves(item.ticketId)">删除</li>
          </div>
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
      navName: '校友会包车',
      navPlateName: '历史发布',
      datas: [],
      ticketList: [],
      pageSize: 10, //每页最大条数
      panelNumber: 5, //最多显示多少个分页按钮
      current: 1, //当前页码
      pageNumber: 5 //页码总数,
    }
  },
  mounted() {
    this.getTicket() //获取历史发布订单数据
  },
  methods: {
    async getTicket() {
      var postData = {
        params: {
          state: 2,
          startIndex: this.current,
          pageSize: this.pageSize
        }
      }
      var url = 'https://easypoint.club/administrator/getTicket'
      // var url="https://result.eolinker.com/2SwDXYE6f7523ffc165aa2ff23d95e8789302dd644a90b4?uri=administrator/getTicket"
      window.onscroll = e => e.preventDefault() //兼容浏览器
      this.$http
        .get(url, postData)
        .then(res => {
          console.log(res.data)
          var data = res.data
          switch (data.code) {
            case 0:
              alert('没有查询到数据')
              break
            case 1:
              console.log('查询成功')
              this.ticketList = data.data.ticketList
              this.pageNumber =
                data.data.ticketNum % 10 == 0
                  ? data.data.ticketNum / 10
                  : parseInt(data.data.ticketNum / 10) + 1
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
    async deleteTicket(id) {
      var qs = require('qs')
      var postData = qs.stringify({
        ticketId: id
      })
      var url = 'https://easypoint.club/administrator/deleteTicket'
      window.onscroll = e => e.preventDefault() //兼容浏览器
      this.$http
        .post(url, postData)
        .then(res => {
          console.log(res.data)
          var data = res.data
          switch (data.code) {
            case -1:
              alert('下架失败')
              break
            case 1:
              alert('下架成功')
              this.getTicket()
              break
            case 2:
              alert('参数为空')
              break
          }
        })
        .catch(function(e) {
          console.log(e)
        })
    },
    handlePageChange(pageNum) {
      this.current = pageNum
      this.getTicket()
    },
    //跳转订单详情
    purchaseDetails(id) {
      this.$router.push('/PurchaseDetails/' + id)
      console.log(id)
    },
    shelves(id) {
      if (confirm('确定要删除该历史车票订单吗?')) {
        this.deleteTicket(id)
      } else {
        console.log('你取消了删除')
      }
    },
    vehicleInformation(id) {
      this.$router.push('/Vehicle/' + id)
      console.log(id)
    },
    //格式化车票类型数据
    formatType: function(row, column, cellValue, index) {
      return row.type == 1 ? '正式车票' : '预售车票'
    }
  },
  components: {}
}
</script>