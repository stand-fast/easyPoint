<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>添加上下车地点</h1>
        <div class="addCommittee">
          <ul>
            <label>上下车地点:</label>
            <input type="text" v-model="inputPlace" />
            <button class="modelButton submitVehicleType" @click="handleAdd">添加</button>
          </ul>
        </div>
        <h1>已添加上下车地点</h1>
        <div class="association associationTitle">
          <li class="committeePlace">上下车地点</li>
          <li class="deleteCommitteePlace">操作</li>
        </div>
        <div class="nav association">
          <li class="committeePlace">广金大石头</li>
          <li class="deleteCommitteePlace enter" @click="handleDelete(1123)">删除</li>
        </div>
        <div class="nav association">
          <li class="committeePlace">广金校门口</li>
          <li class="deleteCommitteePlace enter" @click="handleDelete(112131223)">删除</li>
        </div>
        <paging
          :value="current"
          :pageSize="pageSize"
          :pageNumber="pageNumber"
          :panelNumber="panelNumber"
          @input="handlePageChange"
        ></paging>
      </div>
    </ul>
  </div>
</template>
<script>
import paging from "../components/paging.vue";
export default {
  data() {
    return {
      navName: "校友会包车",
      navPlateName: "添加上下车地点",
      datas: [],
      inputPlace: "",
      pageSize: 10, //每页最大条数
      panelNumber: 5, //最多显示多少个分页按钮
      current: 1, //当前页码
      pageNumber: 5 //页码总数
    };
  },
  computed: {
    check() {
      if (this.inputPlace == "") {
        alert("上下车地点不能为空");
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    const id = this.$route.params.id;
    console.log("根据" + id + "请求数据");
    //this.setData();
  },
  methods: {
    async setData() {
      window.onscroll = e => e.preventDefault(); //兼容浏览器
    },
    handlePageChange(pageNum) {
      var that = this;
    },
    handleAdd() {
      var that = this;
      if (this.check == true) {
        if (confirm("上下车地点 : " + this.inputPlace)) {
        } else {
          console.log("你取消了添加");
        }
      }
    },
    handleDelete(id) {
      var that = this;
      if (confirm("确定删除该上下车地点?")) {
      } else {
        console.log("您取消了删除！");
      }
    },
    addPlace(id) {
      this.$router.push("/addLocation/" + id);
    }
  },
  components: {
    paging
  }
};
</script>
<style>
</style>