<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">{{navName}}-{{navPlateName}}</el-header>
    <!-- 内容 -->
    <el-main class="el-main-content index_content"> 
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navName: "公告栏",
      navPlateName: "当前公告",
      datas: []
    };
  },
  computed: {
  },
  mounted() {
    //this.setData();
  },
  methods: {
    async setData() {
      window.onscroll = e => e.preventDefault(); //兼容浏览器
    },
  },
  components: {}
};
</script>