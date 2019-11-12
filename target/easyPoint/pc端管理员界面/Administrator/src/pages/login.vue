<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">登陆界面</div>
      </div>
      <div class="PageContent">
        <div>
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
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginId: "",
      loginPwd: ""
    };
  },
  computed: {},
  methods: {
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
  text-align: center;
}
.center p {
  margin: 40px 0;
}
</style>