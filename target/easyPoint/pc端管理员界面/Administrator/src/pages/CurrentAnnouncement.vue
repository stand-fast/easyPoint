<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>小程序公告</h1>
        <div class="AnnounceMent">
          <li></li>
          <li></li>
          <li></li>
        </div>
        <h1>商家公告</h1>
      </div>
    </ul>
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
    check() {
      if (this.location == "") {
        alert("车辆类型不能为空");
        return false;
      } else if (this.deposit == "") {
        alert("定金不能为空");
        return false;
      } else if (isNaN(Number(this.deposit))) {
        alert("定金不是数字!");
        return false;
      } else if ((this.deposit % 1 === 0) == false) {
        alert("定金不是整数!");
        return false;
      } else if (this.deposit < 0) {
        //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
        alert("定金不能为负数");
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    //this.setData();
  },
  methods: {
    async setData() {
      window.onscroll = e => e.preventDefault(); //兼容浏览器
    },
    handleAdd() {
      var that = this;
      if (this.check == true) {
        if (
          confirm("车辆类型 : " + this.location + "\r定金 : " + this.deposit)
        ) {
        } else {
          console.log("你取消了添加");
        }
      }
    },
    handledelete(vehicleId) {
      var that = this;
      if (confirm("确定删除该车辆类型?")) {
      } else {
        console.log("您取消了删除！");
      }
    },
    handlePageChange(pageNum) {
      var that = this;
    }
  },
  components: {}
};
</script>
<style scoped>
</style>