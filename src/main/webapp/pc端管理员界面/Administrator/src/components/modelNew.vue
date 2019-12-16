<template>
  <el-container class="model-wrapper">
    <el-aside class="model-wrapper-left">
      <el-menu :default-openeds="[2]" class="model-wrapper-left">
        <el-submenu
          class="model-wrapper-nav"
          v-for="item in navigationName"
          :key="item.name"
          :index="item.id"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            {{item.name}}
          </template>
          <el-menu-item-group v-for="items in item.nameSecond" :key="items.name">
            <template slot="title">{{items.name}}</template>
            <el-menu-item v-for="children in items.navitem" :key="children.name">
              <a :href="children.url">{{ children.name }}</a>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container class="model-wrapper-con">
      <div class="model-wrapper-con-user">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <!-- 退出登陆部分 -->
            <el-dropdown-item>退出登陆</el-dropdown-item>

            <!-- 修改用户名部分 -->
            <el-dropdown-item>
              <span @click="drawer = true">修改用户名</span>
            </el-dropdown-item>
            <el-drawer title="修改用户名" :visible.sync="drawer" :with-header="false">
              <div class="drawer-model">
                <li>
                  <span>用户名:</span>
                  {{$username}}
                </li>
                <li>
                  <span>新用户名:</span>
                  <el-input
                    class="model-input"
                    placeholder="请输入新的用户名"
                    v-model="newusername"
                    clearable
                  ></el-input>
                </li>
              </div>
              <div class="drawer-model-button">
                <el-button type="primary" size="mini" @click="submitModifyUsername">修改</el-button>
              </div>
            </el-drawer>

            <!-- 修改密码部分 -->
            <el-dropdown-item>
              <span @click="drawerModifyPassword = true">修改密码</span>
            </el-dropdown-item>
            <el-drawer title="修改密码" :visible.sync="drawerModifyPassword" :with-header="false">
              <div class="drawer-model">
                <li>
                  <span>用户名:</span>
                  {{$username}}
                </li>
                <li>
                  <span>账户:</span>
                  {{loginUser.loginId}}
                </li>
                <li>
                  <span>旧密码:</span>
                  <el-input
                    class="model-input"
                    placeholder="请输入旧密码"
                    type="password"
                    v-model="oldPassword"
                    clearable
                  ></el-input>
                </li>
                <li>
                  <span>新密码:</span>
                  <el-input
                    class="model-input"
                    placeholder="请输入新密码"
                    type="password"
                    autocomplete="new-password"
                    v-model="newPassword"
                    clearable
                  ></el-input>
                </li>
                <li>
                  <span>再次输入:</span>
                  <el-input
                    class="model-input"
                    placeholder="请再次输入新密码"
                    type="password"
                    autocomplete="new-password"
                    v-model="ensurePassword"
                    clearable
                  ></el-input>
                </li>
              </div>
              <div class="drawer-model-button">
                <el-button type="primary" size="mini" @click="submitModifyPassword()">修改</el-button>
              </div>
            </el-drawer>

            <!-- 更换绑定部分 -->
            <el-dropdown-item>
              <span @click="drawerModifyAccount = true">更换绑定</span>
            </el-dropdown-item>
            <el-drawer title="更换绑定" :visible.sync="drawerModifyAccount" :with-header="false">
              <div class="drawer-model">
                <li>
                  <span>用户名:</span>
                  {{$username}}
                </li>
                <li>
                  <span>账户:</span>
                  {{loginUser.loginId}}
                </li>
                <!-- <li>
                  <span>再次输入:</span>
                  <el-input
                    class="model-input"
                    placeholder="请再次输入新密码"
                    type="password"
                    autocomplete="new-password"
                    v-model="ensurePassword"
                    clearable
                  ></el-input>
                </li> -->
              </div>
              <div class="drawer-model-button">
                <el-button type="primary" size="mini" @click="submitModifyPassword()">修改</el-button>
              </div>
              
            </el-drawer>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{$username}}</span>
      </div>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      navigationName: [
        {
          id: "1",
          name: "易点出行",
          icon: "el-icon-open",
          nameSecond: [
            {
              name: "校友会包车",
              navitem: [
                {
                  id: "1",
                  name: "添加同乡会",
                  url: "#/AddAssociation"
                },
                {
                  id: "2",
                  name: "添加车辆",
                  url: "#/BusSearcher"
                },
                {
                  id: "3",
                  name: "我的发布",
                  url: "#/TicketManagement"
                },
                {
                  id: "4",
                  name: "历史发布",
                  url: "#/HistoryTicket"
                }
              ]
            },
            {
              name: "旅游出行",
              navitem: [
                {
                  id: "1",
                  name: "添加发布车辆类型",
                  url: "#/AddVehicleType"
                },
                {
                  id: "2",
                  name: "租车订单",
                  url: "#/CarRentalOrder"
                },
                {
                  id: "3",
                  name: "退款订单",
                  url: "#/CarRentalRefund"
                }
              ]
            }
          ]
        },
        {
          id: "2",
          name: "管理员账户",
          icon: "el-icon-menu",
          nameSecond: [
            {
              name: "",
              navitem: [
                {
                  id: "1",
                  name: "账号管理",
                  url: "#/AccountManagement"
                }
              ]
            }
          ]
        },
        {
          id: "3",
          name: "公告栏",
          icon: "el-icon-chat-line-square",
          nameSecond: [
            {
              name: "",
              navitem: [
                {
                  id: "1",
                  name: "当前公告",
                  url: "#/CurrentAnnouncement"
                }
              ]
            }
          ]
        }
      ],
      drawer: false, //抽屉-修改用户名
      drawerModifyPassword: false, //抽屉-修改密码
      drawerModifyAccount: false, //抽屉-更换绑定
      showUserInfor: false, //是否显示个人信息部分
      showModifyUsernames: false, //是否显示修改用户名部分
      showModifyAccounts: false, //是否显示更换绑定部分
      showModifyPasswords: false, //是否显示修改密码部分
      newusername: "", //修改用户名部分-新用户名
      oldPassword: "", //修改密码部分-旧密码
      newPassword: "", //修改密码部分-新密码
      ensurePassword: "" //修改密码部分-确认新密码
    };
  },
  computed: {
    //判断是否登陆是否显示信息
    loginUser() {
      if (this.$store.state.data) {
        return this.$store.state.data;
      } else {
        return "未登录";
      }
    }
  },
  methods: {
    //提交修改用户名
    submitModifyUsername() {
      let that = this;
      let params = new URLSearchParams();
      params.append("phone", this.loginUser.loginId);
      params.append("newName", this.newusername);
      this.$http
        .post("updateAdminName", params)
        .then(function(res) {
          console.log(res.data);
          let code = res.data.code;
          switch (code) {
            case -1:
              alert("修改失败");
              break;
            case 0:
              alert("账户不存在");
              break;
            case 1:
              that.$username = that.newusername;
              that.newusername = "";
              that.drawer = false;
              alert("修改成功");
              break;
            case 2:
              alert("参数为空");
              break;
            default:
              that.$judgeToken(code);
              break;
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    //提交更换绑定信息
    submitChangeAccount() {
      let that = this;
      if (this.changePassword != this.changeComfirmPassword) {
        alert("两次密码输入不一致");
      } else {
        let params = new URLSearchParams();
        params.append("phone", this.loginUser.loginId);
        params.append("newPhone", this.changeId);
        params.append("verifyCode", this.changeCode);
        params.append("newPassword", this.changePassword);
        params.append("ensurePassword", this.changeComfirmPassword);
        this.$http
          .post("changePhone", params)
          .then(function(res) {
            console.log(res.data);
            let code = res.data.code;
            switch (code) {
              case -1:
                alert("修改失败");
                break;
              case 0:
                alert("账户不存在");
                break;
              case 1:
                that.changeId = "";
                that.changeCode = "";
                that.changePassword = "";
                (that.changeComfirmPassword = ""), (that.showUserInfor = false);
                that.showModifyAccounts = false;
                alert("更换绑定成功,请重新登陆");
                that.$store.dispatch("loginOut");
                that.$router.push("/login");
                break;
              case 2:
                alert("参数为空");
                break;
              case 3:
                alert("验证码错误");
                break;
              case 4:
                alert("两次密码输入不一致");
                break;
              case 5:
                alert("新旧手机号码一致");
                break;
              case 5:
                alert("新手机号码已被注册");
                break;
              default:
                that.$judgeToken(code);
                break;
            }
          })
          .catch(function(e) {
            console.log(e);
          });
      }
    },
    //提交修改密码
    submitModifyPassword() {
      let that = this;
      if (this.newPassword != this.ensurePassword) {
        alert("两次密码输入不一致");
      } else {
        let params = new URLSearchParams();
        params.append("phone", this.loginUser.loginId);
        params.append("oldPassword", this.oldPassword);
        params.append("newPassword", this.newPassword);
        params.append("ensurePassword", this.ensurePassword);
        this.$http
          .post("changePassword", params)
          .then(function(res) {
            console.log(res.data);
            let code = res.data.code;
            switch (code) {
              case -1:
                alert("修改失败");
                break;
              case 0:
                alert("账户不存在");
                break;
              case 1:
                that.oldPassword = "";
                that.newPassword = "";
                that.ensurePassword = "";
                that.drawerModifyPassword = false;
                alert("修改成功,请重新登陆");
                that.$store.dispatch("loginOut");
                that.$router.push("/login");
                break;
              case 2:
                alert("参数为空");
                break;
              case 3:
                alert("旧密码错误");
                break;
              case 4:
                alert("两次密码输入不一致");
                break;
              default:
                that.$judgeToken(code);
                break;
            }
          })
          .catch(function(e) {
            console.log(e);
          });
      }
    },
    //退出登陆
    loginOut() {
      this.$store.dispatch("loginOut");
      this.$router.push("/login");
    },
    //获取验证码按钮
    getCode(phone) {
      let reg = /^[1][3458]\d{9}$/; //验证手机号码
      let num = 60;
      let that = this;
      if (!reg.test(phone)) {
        alert("手机号码有误!");
      } else {
        if (this.codeStatus == 0) {
          this.codeStatus = 1;
          let timer = setInterval(function() {
            if (num == 0) {
              that.code = "获取验证码";
              clearInterval(timer);
              that.codeStatus = 0;
            } else {
              that.code = num--;
            }
          }, 1000);
        }
      }
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: #333;
}
.model-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 5px;
  background-color: #eef1f6;
}
.model-wrapper-left {
  margin-top: 10px;
  box-sizing: border-box;
  width: 200px !important;
}
.model-wrapper-nav {
  border-radius: 2px;
  margin-top: 2px;
  background-color: #fff;
}
.model-wrapper-con-header {
  background: #fff;
  margin-bottom: 20px;
  color: #9c9ea1;
  font-weight: 600;
  line-height: 60px;
}
.model-wrapper-con-header > span {
  cursor: pointer;
}
.model-wrapper-con-header > span:hover {
  color: #409eff;
}
.model-wrapper-con-user {
  color: rgb(117, 112, 112);
  position: absolute;
  top: 44px;
  right: 50px;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  margin: 0 20px;
}
</style>