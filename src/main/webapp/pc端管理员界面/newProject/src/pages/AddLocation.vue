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
      let data = await fetch(
        "http://easypoint.club/getTotalPageAndFirstVehicleInfoList"
      ).then(resp => resp.json());
      console.log(data.data);
      if (data.code == 200) {
        console.log("查询总页数和车辆类型成功");
        this.current = 1;
        this.pageNumber = data.data.totalPage;
        this.datas = data.data.vehicleInfoList;
      } else if (data.code == 201) {
        alert("暂无车辆类型数据，请管理员添加");
      }
    },
    handlePageChange(pageNum) {
      var that = this;
      let requestConfig = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded" // 指定提交方式为表单提交
        }),
        body: new URLSearchParams([["pageNum", pageNum]]).toString()
      };
      fetch(
        "http://easypoint.club/findListPageNumTourismOrderInfo",
        requestConfig
      ).then(function(response) {
        response.json().then(function(data) {
          if (data.code == 200) {
            console.log(data);
            console.log(data.message);
            that.current = pageNum;
            that.datas = data.data;
          } else if (data.code == 201) {
            console.log("已经加载完全部数据");
          }
        });
      });
    },
    handleAdd() {
      var that = this;
      if (this.check == true) {
        if (confirm("上下车地点 : " + this.inputPlace)) {
          let requestConfig = {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/x-www-form-urlencoded" // 指定提交方式为表单提交
            }),
            body: new URLSearchParams([
              ["vehicleType", this.location],
              ["deposit", this.deposit]
            ]).toString()
          };
          fetch("接口路径", requestConfig).then(function(response) {
            response.json().then(function(data) {
              if (data.code == 200) {
                alert("添加同乡会成功");
                that.setData();
              } else if (data.code == 400) {
                alert("该同乡会已存在,请重新输入");
              }
            });
          });
        } else {
          console.log("你取消了添加");
        }
      }
    },
    handleDelete(id) {
      var that = this;
      if (confirm("确定删除该上下车地点?")) {
        let requestConfig = {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded" // 指定提交方式为表单提交
          }),
          body: new URLSearchParams([["vehicleId", id]]).toString()
        };
        fetch("接口路径", requestConfig).then(function(response) {
          response.json().then(function(data) {
            if (data.code == 200) {
              that.setData();
              alert("删除上下车地点成功");
            }
          });
        });
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