<template>
  <div class="modelPage">
    <div class="modelPageTop">
      <img src="../assets/logo.png" />
      <div class="modelPageTopDetails">
        <p>易点</p>
        <p>让你的大学生活简单一点</p>
      </div>
      <div class="modelPageTopLogin" v-if="loginUser!='未登录'">
        <span @click="showUserInformation">{{loginUser.name}}</span>|
        <span @click="loginOut">退出登录</span>
      </div>

      <!-- 个人信息 -->
      <div class="userInformation" v-if="loginUser" v-show="showUserInfor">
        <div class="inforTitle">管理员个人信息</div>
        <p>
          <span>账户：13013013011</span>
          <label @click="showModifyAccount">更换绑定</label>
        </p>
        <p>
          <span>密码：*******</span>
          <label @click="showModifyPassword">修改</label>
        </p>
        <p>
          <span>角色：{{loginUser.name}}</span>
        </p>

        <div class="InforButton">
          <span @click="showUserInformation">关闭</span>
        </div>
      </div>

      <!-- 个人信息-更换绑定部分 -->
      <div class="userInformation" v-show="showModifyAccounts">
        <div class="inforTitle">管理员个人信息-更换绑定</div>
        <div class="change-account">
          <span>账户：</span>
          <input placeholder="请输入手机号码" v-model="changeId" />
          <label @click="getCode(changeId)">{{code}}</label>
        </div>
        <div class="change-account">
          <span>验证码：</span>
          <input placeholder="请输入验证码" />
        </div>
        <div class="change-account">
          <span>密码：</span>
          <input placeholder="请输入密码" />
        </div>
        <div class="change-account">
          <span>再次输入：</span>
          <input placeholder="请再次输入密码" />
        </div>
        <div class="change-account">
          <span>角色：</span>
          {{loginUser.name}}
        </div>

        <div class="InforButton">
          <span @click="submitChangeAccount">提交</span>
          <span @click="showUserInformation">返回</span>
        </div>
      </div>

      <!-- 个人信息-修改密码部分 -->
      <div class="userInformation" v-show="showModifyPasswords">
        <div class="inforTitle">管理员个人信息-修改密码</div>
        <div class="change-account">
          <span>账户：</span>
          {{loginUser.loginId}}
        </div>
        <div class="change-account">
          <span>旧密码：</span>
          <input placeholder="请输入旧密码" autocomplete="off" type="password" v-model="oldPassword" />
        </div>
        <div class="change-account">
          <span>新密码：</span>
          <input placeholder="请输入密码" type="password" v-model="newPassword" />
        </div>
        <div class="change-account">
          <span>再次输入：</span>
          <input placeholder="请再次输入密码" type="password" v-model="ensurePassword" />
        </div>
        <div class="change-account">
          <span>角色：</span>
          {{loginUser.name}}
        </div>

        <div class="InforButton">
          <span @click="submitModifyPassword">提交</span>
          <span @click="showUserInformation">返回</span>
        </div>
      </div>
    </div>

    <div class="modelPageContent">
      <ul class="PageContentLeft">
        <li class="ContentCard"></li>
        <li
          class="ContentNavigation"
          v-for="(item,index) in navigationName"
          :key="item.id"
          @mouseover="showSecondName(index)"
          @mouseout="hideSecondName"
        >
          {{item.name}}
          <ul v-show="index===isShow" class="navigation-sub">
            <li v-for="items in item.secondName" :key="items.id">
              <a :href="items.url">{{ items.childrenName }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigationName: [ //二级导航数据
        {
          id: "1",
          name: "已加盟商家",
          secondName: [
            {
              id: "1",
              childrenName: "已加盟企业商家"
            },
            {
              id: "2",
              childrenName: "已加盟学生商家"
            }
          ]
        },
        {
          id: "2",
          name: "商家加盟申请",
          secondName: [
            {
              id: "1",
              childrenName: "企业商家加盟申请",
              url: "#/JoinList"
            },
            {
              id: "2",
              childrenName: "学生商家加盟申请",
              url: "#/JoinList"
            }
          ]
        },
        {
          id: "3",
          name: "管理员账号",
          secondName: [
            {
              id: "1",
              childrenName: "账号管理",
              url: "#/AccountManagement"
            }
          ]
        },
        {
          id: "4",
          name: "校友会包车",
          secondName: [
            {
              id: "1",
              childrenName: "添加同乡会",
              url: "#/AddAssociation"
            },
            {
              id: "2",
              childrenName: "添加车辆",
              url: "#/BusSearcher"
            },
            {
              id: "3",
              childrenName: "我的发布",
              url: "#/TicketManagement"
            },
            {
              id: "4",
              childrenName: "历史发布",
              url: "#/HistoryTicket"
            }
          ]
        },
        {
          id: "5",
          name: "旅游出行",
          secondName: [
            {
              id: "1",
              childrenName: "添加发布车辆类型",
              url: "#/AddVehicleType"
            },
            {
              id: "2",
              childrenName: "租车订单",
              url: "#/CarRentalOrder"
            },
            {
              id: "3",
              childrenName: "退款订单",
              url: "#/CarRentalRefund"
            }
          ]
        },
        {
          id: "6",
          name: "公告栏",
          secondName: [
            {
              id: "1",
              childrenName: "当前公告",
              url: "#/CurrentAnnouncement"
            }
          ]
        },
        {
          id: "7",
          name: "审核",
          secondName: [
            {
              id: "1",
              childrenName: "审核1"
            },
            {
              id: "2",
              childrenName: "审核2"
            }
          ]
        }
      ],
      childrenName: [],//二级导航数据
      isShow: 0,//二级菜单
      code: "获取验证码",//验证码倒计时
      codeStatus: 0, //验证码加锁
      showUserInfor: false, //是否显示个人信息部分
      showModifyAccounts: false, //是否显示更换绑定部分
      showModifyPasswords: false, //是否显示修改密码部分
      changeId: "", //更换绑定部分-手机号码
      oldPassword: "", //修改密码部分-旧密码
      newPassword: "", //修改密码部分-新密码
      ensurePassword: "" //修改密码部分-确认新密码
    };
  },
  mounted: function() {
    this.isShow = -1;
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
    //是否显示管理员个人信息
    showUserInformation() {
      if (this.showModifyAccounts == true) {
        this.showModifyAccounts = false;
      } else if (this.showModifyPasswords == true) {
        this.showModifyPasswords = false;
      } else {
        this.showUserInfor = !this.showUserInfor;
      }
    },
    //显示管理员个人信息-更换绑定
    showModifyAccount() {
      this.showModifyAccounts = !this.showModifyAccounts;
    },
    //显示管理员个人信息-修改密码
    showModifyPassword() {
      this.showModifyPasswords = !this.showModifyPasswords;
    },
    //提交更换绑定信息
    submitChangeAccount() {},
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
                that.showUserInfor = false;
                that.showModifyPasswords = false;
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
            alert("服务器繁忙，请稍后重试，请检查网络环境");
            console.log(e);
          });
      }
    },
    //显示二级导航
    showSecondName(index) {
      this.isShow = index;
    },
    //隐藏二级导航
    hideSecondName() {
      this.isShow = !this.isShow;
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
.userInformation {
  z-index: 100;
  position: absolute;
  top: 20%;
  left: 50%;
  padding: 20px;
  background: #ffffff;
  width: 350px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #8ebc8c;
  margin-left: -170px;
}
.userInformation .inforTitle {
  padding: 5px;
  border-radius: 4px;
  background: #8ebc8c;
  color: #ffffff;
}
.userInformation > p {
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 3px;
  padding: 5px 0;
  color: #333;
  background: #ffffff;
  border: 1px solid #8fd68b;
  box-shadow: 0 0 2px 0 #8ebc8c;
}
.userInformation > p label {
  padding: 3px;
  border-radius: 2px;
  cursor: pointer;
}
.userInformation > p label:hover {
  box-shadow: 0 0 3px 0 #8ebc8c;
}
.userInformation > p span {
  display: inline-block;
  padding: 5px;
  width: 170px;
  box-sizing: border-box;
}
.InforButton {
  margin-top: 15px;
  text-align: center;
}
.InforButton span {
  cursor: pointer;
  width: 60px;
  padding: 6px 13px;
  text-align: center;
  border-radius: 4px;
  box-sizing: border-box;
  background: #8ebc8c;
  color: #ffffff;
  margin: 3px;
}
.change-account {
  padding: 5px;
  display: flex;
  align-items: center;
  font-size: 16px;
}
.change-account > span {
  display: inline-block;
  width: 80px;
}
.change-account > input {
  width: 140px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 5px;
  outline: none;
  border: 1px solid #8ebc8c;
}
.change-account > label {
  font-size: 13px;
  cursor: pointer;
  margin-left: 5px;
  padding: 3px;
  border-radius: 3px;
  width: 72px;
  text-align: center;
  box-sizing: border-box;
}
.change-account > label:hover {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}
* {
  margin: 0px;
  padding: 0px;
  font-family: "Open Sans", "Microsoft YaHei", "Heiti SC", "STHeiti Light",
    "PMingLiU", sans-serif;
}

li {
  list-style: none;
}

.modelPage {
  margin: 0 auto;
  width: calc(100% - 100px);
}

.modelPageTop {
  width: 100%;
  height: 80px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #8fd68b;
}

.modelPageTop img {
  width: 250px;
  height: 82px;
}

.modelPageTopLogin {
  width: calc(100% - 500px);
  text-align: right;
  color: #ffffff;
  overflow: hidden;
  margin-top: 30px;
  height: 26px;
}
.modelPageTopLogin span {
  padding: 3px 5px;
  cursor: pointer;
}
.modelPageTopLogin span:hover {
  border-bottom: 1px solid #ffffff;
}
.modelPageTopDetails {
  height: 80px;
  color: #ffffff;
}

.modelPageTopDetails p {
  overflow: hidden;
  width: 180px;
  display: block;
  font-size: 14px;
  margin-top: 14px;
}

.modelPageContent {
  width: 250px;
  height: 620px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.PageContentLeft {
  width: 250px;
  height: 620px;
  background-color: #72ab6f;
  border-bottom-left-radius: 4px;
  -webkit-padding-start: 0px;
  padding-inline-start: 0px;
}

.ContentCard {
  margin: 20px auto;
  width: 230px;
  height: 120px;
  background-color: #c7ddc5;
  border-radius: 6px;
}

.ContentNavigation {
  margin: 4px auto;
  padding-left: 50px;
  width: 230px;
  height: 45px;
  line-height: 45px;
  border-radius: 4px;
  border-bottom: 1px solid #ffffff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #ffffff;
  background-color: #8ebc8c;
  cursor: pointer;
  position: relative;
}

.ContentNavigation:hover {
  color: #72ab6f;
  background-color: #ffffff;
}

.navigation-sub {
  position: absolute;
  top: -3px;
  left: 230px;
  width: 200px;
  -webkit-padding-start: 0px;
  padding-inline-start: 0px;
  z-index: 100;
}

.navigation-sub li {
  border-radius: 4px;
  border: 1px solid #ffffff;
  width: 200px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  margin-top: 2px;
  color: #ffffff;
  background-color: #72ab6f;
}

.navigation-sub li a {
  color: #ffffff;
  text-decoration: none;
  border-radius: 4px;
  display: block;
  width: 100%;
  height: 100%;
}

.navigation-sub li a:hover {
  color: #72ab6f;
  background-color: #ffffff;
  border: 1px solid #72ab6f;
}

.PageContentRight {
  position: absolute;
  top: 80px;
  left: 300px;
  width: calc(100% - 350px);
  height: 620px;
  border-bottom-right-radius: 4px;
  background-color: #f2f2f2;
  overflow: auto;
}

.PageContentRightTitle {
  margin-top: 5px;
  margin-left: 5px;
  width: calc(100% - 10px);
  height: 60px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 5px;
  background-color: #ffffff;
}

.IconTitle {
  width: 6px;
  height: 50px;
  background-color: #72ab6f;
}

.TitleText {
  margin-left: 20px;
  color: #72ab6f;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
}

.PageContent {
  margin-top: 5px;
  margin-left: 5px;
  width: calc(100% - 10px);
  height: 545px;
  overflow: hidden;
  background-color: #ffffff;
}
</style>