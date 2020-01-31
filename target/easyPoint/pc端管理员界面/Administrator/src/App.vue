<template>
  <div id="app">
    <modelNew />
  </div>
</template>

<script>
import Vue from "vue";
import modelNew from "./components/modelNew.vue";//页面模板组件
export default {
  name: "app",
  components: {
    modelNew
  },
  mounted() {
    this.getToken();
  },
  methods: {
    getToken() {
      let item = localStorage.getItem("loginUser");
      let user = null;
      if (item) {
        user = JSON.parse(item);
        Vue.prototype.$token = user.token;
      }
    }
  }
};
</script>

<style>
@import url(./assets/public.css);/* 引入公共css */
@import url(./assets/Travel.css);/* 引入易点出行板块css */
</style>
