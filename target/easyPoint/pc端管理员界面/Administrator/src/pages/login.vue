<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">登陆界面</el-header>
    <!-- 内容 -->
    <el-main class="el-main-content">
      <el-popover
        placement="top"
        title="忘记密码"
        width="300"
        trigger="click"
        v-model="showForgetPasswords"
      >
        <div class="spring-model-con">
          <li>
            <span>账户:</span>
            <el-input
              class="model-input"
              maxlength="11"
              placeholder="请输入账户"
              v-model="forgetId"
              clearable
            ></el-input>
          </li>
          <li>
            <span>验证码:</span>
            <el-input class="model-input" placeholder="请输入验证码" v-model="forgetCode" clearable></el-input>
            <label class="drawer-model-code" @click="getCode(forgetId)">{{code}}</label>
          </li>
          <li>
            <span>密码:</span>
            <el-input
              class="model-input"
              autocomplete="new-password"
              type="password"
              placeholder="请输入密码"
              v-model="forgetPassword"
              clearable
            ></el-input>
          </li>
          <li>
            <span>再次输入:</span>
            <el-input
              class="model-input"
              autocomplete="new-password"
              type="password"
              placeholder="请输入再次输入密码"
              v-model="forgetComfirm"
              clearable
            ></el-input>
          </li>
        </div>
        <div class="spring-model-con-button">
          <el-button size="mini" type="text" @click="showForgetPasswords = false;">取消</el-button>
          <el-button type="primary" size="mini" @click="submitForgetPassword()">提交</el-button>
        </div>
      </el-popover>

      <p class="model-content-input">
        <span>账户：</span>
        <el-input maxlength="11" autocomplete="on" placeholder="请输入账户" v-model="loginId" clearable></el-input>
      </p>
      <p class="model-content-input">
        <span>密码：</span>
        <el-input placeholder="请输入密码" type="password" v-model="loginPwd" clearable></el-input>
      </p>
      <p class="model-content-input">
        <span></span>
        <el-button class="model-content-button" @click="handleLogin">登陆</el-button>
        <label @click="showForgetPasswords = true">忘记密码</label>
      </p>
    </el-main>
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
      forgetId: "", //忘记密码-账户
      forgetCode: "123456", //忘记密码-验证码
      forgetPassword: "", //忘记密码-密码
      forgetComfirm: "" //忘记密码-确认密码
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
    //提交忘记密码
    submitForgetPassword() {
      let that = this;
      if (this.forgetPassword != this.forgetComfirm) {
        alert("两次密码输入不一致");
      } else {
        let params = new URLSearchParams();
        params.append("phone", this.forgetId);
        params.append("verifyCode", this.forgetCode);
        params.append("newPassword", this.forgetPassword);
        params.append("ensurePassword", this.forgetComfirm);
        this.$http
          .post("forgetPassword", params)
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
                that.forgetId = "";
                that.forgetCode = "";
                that.forgetPassword = "";
                that.forgetComfirm = "";
                that.showForgetPasswords = false;
                alert("修改成功");
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
            }
          })
          .catch(function(e) {
            console.log(e);
          });
      }
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
</style>