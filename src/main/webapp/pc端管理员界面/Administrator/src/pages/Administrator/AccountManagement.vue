<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>账号管理</h1>
        <div class="wrapperOrder">
          <li>ID</li>
          <li class="bigger">账号</li>
          <li class="bigger">角色</li>
          <li>账号状态</li>
          <li class="bigger button">操作</li>
        </div>
        <!-- <div class="wrapperOrder" v-for="item in datas" :key="item.transactionId"> -->
        <div class="wrapperOrder">
          <li title="item.transactionId">01</li>
          <li class="bigger" title="item.phone">13013013013</li>
          <li class="bigger">超级管理员</li>
          <li>可用</li>
          <li class="bigger button">
            <span class="enter" @click="disableAccount(123)">禁用</span>|
            <span class="enter" @click="deleteAccount(123)">删除</span>
          </li>
        </div>
        <div class="wrapperOrder">
          <li title="item.transactionId">02</li>
          <li class="bigger" title="item.phone">13013013013</li>
          <li class="bigger">普通管理员</li>
          <li>可用</li>
          <li class="bigger button">
            <span class="enter" @click="disableAccount(123)">禁用</span>|
            <span class="enter" @click="deleteAccount(123)">删除</span>
          </li>
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
import paging from "../../components/paging.vue";
export default {
  data() {
    return {
      navName: "管理员账号",
      navPlateName: "账号管理",
      pageSize: 10, //每页最大条数
      panelNumber: 5, //最多显示多少个分页按钮
      current: 1, //当前页码
      pageNumber: 5 //页码总数
    };
  },
  computed: {},
  mounted() {
    this.setData();
  },
  methods: {
    async setData() {
      var that = this;
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      // this.$http
      //   .get("getTotalPageAndFirstTourismOrderInfoList")
      //   .then(function(res) {
      //     console.log(res.data);

      //   })
      //   .catch(function(e) {
      //     console.log(e);
      //   });
    },
    handlePageChange(page) {
      console.log(page);
    },
    disableAccount(id) {
      console.log(id);
    },
    deleteAccount(id) {
      console.log(id);
    }
  },
  components: {
    paging
  }
};
</script>
<style scoped>
.bigger span {
  padding: 3px 5px;
  border-radius: 4px;
  margin-right: 3px;
}
.bigger span:last-of-type {
  border-right: 0px;
  margin-left: 3px;
  margin-right: 0px;
}
.bigger span:hover {
  box-shadow: 0 0 10px 0 #8fd68b;
}
.button {
  min-width: 150px;
}
</style>