<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">登陆界面</div>
      </div>
      <div class="PageContent">
        <div class="center">
          <p>
            <label>账户：</label>
            <input v-model="loginId" class="loginInputs" placeholder="请输入账号" />
          </p>
          <p>
            <label>密码：</label>
            <input
              placeholder="请输入密码"
              autocomplete="off"
              class="loginInputs"
              type="password"
              v-model="loginPwd"
            />
          </p>
          <el-button type="success" class="loginButton" @click="handleLogin">登陆</el-button>
          <span @click="showForgetPassword()">忘记密码</span>
        </div>
      </div>

      <!-- 登陆-忘记密码部分 -->
      <div class="userInformation" v-show="showForgetPasswords">
        <div class="inforTitle">登陆-忘记密码</div>
        <div class="change-account">
          <span>账户：</span>
          <input placeholder="请输入账户" v-model="forgetId" />
          <label @click="getCode(forgetId)">{{code}}</label>
        </div>
        <div class="change-account">
          <span>验证码：</span>
          <input placeholder="请输入验证码" />
        </div>
        <div class="change-account">
          <span>新密码：</span>
          <input placeholder="请输入密码" />
        </div>
        <div class="change-account">
          <span>再次输入：</span>
          <input placeholder="请再次输入密码" />
        </div>
        <div class="InforButton">
          <span @click="submitForgetPassword()">提交</span>
          <span @click="showForgetPassword()">返回</span>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginId: "", //登陆账户
      loginPwd: "", //登陆密码
      code: "获取验证码",
      codeStatus: 0, //验证码加锁
      showForgetPasswords: false, //是否显示忘记密码栏目
      forgetId: "" //忘记密码-账户
    };
  },
  computed: {},
  methods: {
    //登陆
    async handleLogin() {
      const result = await this.$store.dispatch("login", {
        loginId: this.loginId,
        loginPwd: this.loginPwd
      });
      if (result) {
        this.$router.push("/"); //跳转到首页
      } else {
        alert("账号密码错误");
        this.loginId = "";
        this.loginPwd = "";
      }
    },
    //显示忘记密码
    showForgetPassword() {
      this.showForgetPasswords = !this.showForgetPasswords;
    },
    //提交忘记密码
    submitForgetPassword() {},
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
<style scoped>
.loginInputs {
  padding: 0 20px;
  width: 150px;
  height: 40px;
  border: 1px solid #8fd68b;
}
.loginButton {
  width: 140px;
}
input:-internal-autofill-selected {
  box-shadow: inset 0 0 0 1000px #ffffff !important;
}
.center {
  width: 300px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}
.center span {
  position: absolute;
  bottom: 0px;
  right: 3px;
  cursor: pointer;
  font-size: 14px;
  padding: 5px;
  border-radius: 3px;
}
.center span:hover {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}
.center p {
  margin: 40px 0;
}
</style>