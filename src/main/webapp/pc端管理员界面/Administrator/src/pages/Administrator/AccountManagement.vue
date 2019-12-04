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
          <li>用户名</li>
          <li class="bigger">账号</li>
          <li class="bigger">角色</li>
          <li>账号状态</li>
          <li class="bigger button">操作</li>
        </div>
        <!-- 遍历账户数据 -->
        <div class="wrapperOrder" v-for="item in datas" :key="item.phone">
          <li title="item.transactionId">{{item.username}}</li>
          <li class="bigger" title="item.phone">{{item.phone}}</li>
          <li class="bigger" v-if="item.identity == 1">管理员</li>
          <li class="bigger" v-if="item.identity == 0">超级管理员</li>
          <li v-if="item.state == 1">可用</li>
          <li v-if="item.state == 0">禁用</li>
          <li class="bigger button">
            <span
              class="enter"
              v-if="item.state == 1"
              @click="modifyPermissions(item.phone,item.state)"
            >禁用</span>
            <span
              class="enter"
              v-if="item.state == 0"
              @click="modifyPermissions(item.phone,item.state)"
            >启用</span>|
            <span class="enter" @click="deleteAccount(item.phone)">删除</span>
          </li>
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

      <!-- 添加管理员           -->
      <div class="userInformation addAccountPosition" v-show="showAddAccounts">
        <div class="inforTitle">账号管理-添加管理员</div>
        <div class="change-account">
          <span>用户名：</span>
          <input placeholder="请输入用户名" v-model="username" />
        </div>
        <div class="change-account">
          <span>账户：</span>
          <input placeholder="请输入账户" v-model="phone" maxlength="11" />
        </div>
        <div class="change-account">
          <span>密码：</span>
          <input placeholder="请输入密码" v-model="password" />
        </div>
        <div class="change-account">
          <span class="permissions-span">操作权限：</span>
          <ul>
            <li>
              <input type="radio" v-model="identity" value="1" name="accountPerMiss" />普通管理员
              <p>-基本权限</p>
              <p>-修改本账号密码权限</p>
            </li>
            <li>
              <input type="radio" v-model="identity" value="0" name="accountPerMiss" />超级管理员
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
      showAddAccounts: false, //是否显示添加管理员弹窗
      username: "", //添加管理员-用户名
      phone: "", //添加管理员-账户
      password: "", //添加管理员-密码
      identity: "1", //添加管理员-权限-0:超级管理员-1:普通管理员
      datas: "", //管理员账户数据
      pageSize: 10, //每页最大条数
      panelNumber: 5, //最多显示多少个分页按钮
      current: 1, //当前页码
      pageNumber: 5 //页码总数
    };
  },
  computed: {},
  mounted() {
    this.handlePageChange(1);
  },
  methods: {
    //获取账户数据,根据页码
    async handlePageChange(page) {
      let that = this;
      let params = { startIndex: page, pageSize: 9 };
      this.$http
        .get("findAllCommonAdmin", { params })
        .then(function(res) {
          console.log(res.data);
          let data = res.data.data;
          let code = res.data.code;
          switch (code) {
            case 0:
              alert("查询到0条数据");
              break;
            case 1:
              that.current = page;
              that.pageNumber = data.totalNum;
              that.datas = data.adminAccountList;
              console.log("查询成功");
              break;
            case 3:
              alert("页码超出最大范围");
              break;
            case 110:
              alert("非超级管理员，出现非法操作！");
              break;
            default:
              that.$judgeToken(code);
              break;
          }
        })
        .catch(function(e) {
          alert("服务器繁忙，请稍后重试，请检查网络环境");
          console.log(e);
        });
    },
    //禁用/启用管理员账户
    modifyPermissions(phone, state) {
      let that = this;
      let params = new URLSearchParams();
      params.append("phone", phone);
      params.append("state", state);
      let str = "确定要" + (state ? "禁用" : "启用") + "该账户?";
      if (confirm(str)) {
        this.$http
          .post("stopOrStartAccount", params)
          .then(function(res) {
            console.log(res.data);
            let code = res.data.code;
            switch (code) {
              case -1:
                alert("修改失败");
                break;
              case 0:
                alert("账号不存在");
                break;
              case 1:
                that.handlePageChange(that.current);
                alert("修改成功");
                break;
              case 2:
                alert("参数为空");
                break;
              case 110:
                alert("非超级管理员，出现非法操作！");
                break;
              default:
                that.$judgeToken(code);
                break;
            }
          })
          .catch(function(e) {
            alert("服务器繁忙，请稍后重试，请检查网络环境");
            console.log(e);
          });
      } else {
        alert("您取消了修改");
      }
    },
    //删除账户
    deleteAccount(phone) {
      let that = this;
      let params = new URLSearchParams();
      params.append("phone", phone);
      let str = "确定要删除该账户?";
      if (confirm(str)) {
        this.$http
          .post("deleteCommonAdmin", params)
          .then(function(res) {
            console.log(res.data);
            let code = res.data.code;
            switch (code) {
              case -1:
                alert("删除失败");
                break;
              case 0:
                alert("账号不存在");
                break;
              case 1:
                that.handlePageChange(that.current);
                alert("删除成功");
                break;
              case 2:
                alert("参数为空");
                break;
              case 110:
                alert("非超级管理员，出现非法操作！");
                break;
              default:
                that.$judgeToken(code);
                break;
            }
          })
          .catch(function(e) {
            alert("服务器繁忙，请稍后重试，请检查网络环境");
            console.log(e);
          });
      } else {
        alert("您取消了删除");
      }
    },
    //提交添加管理员
    submitAddAccount() {
      let that = this;
      let reg = /^[1][3458]\d{9}$/; //验证手机号码
      if (!reg.test(this.phone)) {
        alert("手机号码有误!");
      } else {
        let params = new URLSearchParams();
        params.append("phone", this.phone);
        params.append("username", this.username);
        params.append("password", this.password);
        params.append("identity", this.identity);
        this.$http
          .post("addAdmin", params)
          .then(function(res) {
            console.log(res.data);
            let code = res.data.code;
            switch (code) {
              case -1:
                alert("添加失败");
                break;
              case 1:
                that.phone = "";
                that.username = "";
                that.password = "";
                that.identity = "1";
                that.showAddAccounts = false;
                that.handlePageChange(that.current);
                alert("添加成功");
                break;
              case 2:
                alert("参数为空");
                break;
              case 3:
                alert("手机号已被注册");
                break;
              case 110:
                alert("非超级管理员，出现非法操作！");
                break;
              default:
                that.$judgeToken(code);
                break;
            }
          })
          .catch(function(e) {
            alert("服务器繁忙，请稍后重试，请检查网络环境");
            console.log(e);
          });
      }
    },
    //是否显示添加管理员部分
    showAddAccount() {
      this.showAddAccounts = !this.showAddAccounts;
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