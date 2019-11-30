<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1 class="addAccount">
          账号管理
          <span @click="showAddAccount">添加管理员</span>
        </h1>
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

      <!-- 添加管理员           -->
      <div class="userInformation addAccountPosition" v-show="showAddAccounts">
        <div class="inforTitle">账号管理-添加管理员</div>
        <div class="change-account">
          <span>用户名：</span>
          <input placeholder="请输入用户名" />
        </div>
        <div class="change-account">
          <span>账户：</span>
          <input placeholder="请输入账户" />
        </div>
        <div class="change-account">
          <span>密码：</span>
          <input placeholder="请输入密码" />
        </div>
        <div class="change-account">
          <span class="permissions-span">操作权限：</span>
          <ul>
            <li>
              <input type="radio" name="accountPerMiss" checked />普通管理员
              <p>-基本权限</p>
              <p>-修改本账号密码权限</p>
            </li>
            <li>
              <input type="radio" name="accountPerMiss" />超级管理员
              <p>-基本权限</p>
              <p>-加盟商家账号管理权限</p>
              <p>-管理员账号管理权限</p>
            </li>
          </ul>
        </div>

        <div class="InforButton">
          <span @click="submitAddAccount">提交</span>
          <span @click="showAddAccount">返回</span>
        </div>
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
      showAddAccounts: false,
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
    },
    showAddAccount() {
      this.showAddAccounts = !this.showAddAccounts;
    },
    submitAddAccount() {
      //提交添加管理员
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
.addAccountPosition {
  top: 10%;
}
.addAccount {
  position: relative;
}
.addAccount > span {
  position: absolute;
  top: 5px;
  right: 15px;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  color: #8fd68b;
  padding: 5px;
  border-radius: 5px;
  line-height: 12px;
}
.addAccount > span:hover {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}
.permissions-span {
  align-self: flex-start;
}
</style>