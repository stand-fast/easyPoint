<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>添加车辆类型</h1>
        <div class="addCommittee">
          <ul>
            <label>车辆类型:</label>
            <input v-model="location" type="text" />
            <label>定金:</label>
            <input v-model="deposit" type="text" />
            <button class="modelButton submitVehicleType" @click="handleAdd">添加</button>
          </ul>
        </div>
        <h1>已添加车辆类型</h1>
        <div class="contentVehicle">
          <ul class="VehicleTitle">
            <li class="VehicleType">车辆类型</li>
            <li class="deposit">定金</li>
            <li class="deleteButton">点击删除</li>
          </ul>
        </div>
        <div id="centent" class="contentVehicle">
          <ul class="VehicleContent" v-for="item in datas" :key="item.vehicleId">
            <li class="VehicleType">{{item.vehicleType}}</li>
            <li class="deposit">{{item.deposit}}</li>
            <li class="deleteButtons" @click="handledelete(item.vehicleId)">删除</li>
          </ul>
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
import paging from "../../components/paging.vue";
export default {
  data() {
    return {
      navName: "旅游出行",
      navPlateName: "添加发布车辆类型",
      location: "",
      deposit: "",
      datas: [],
      pageSize: 10, //每页最大条数
      panelNumber: 5, //最多显示多少个分页按钮
      current: 1, //当前页码
      pageNumber: 5 //页码总数
    };
  },
  components: {
    paging
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
    this.setData();
  },
  methods: {
    async setData() {
      var that = this;
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .get("getTotalPageAndFirstVehicleInfoList")
        .then(function(res) {
          console.log(res.data);
          var data = res.data;
          if (data.code == 200) {
            that.pageNumber = data.data.totalPage;
            that.current = 1;
            that.datas = data.data.vehicleInfoList;
            console.log("查询订单页数以及首页订单信息成功");
          } else if (data.code == 201) {
            alert("暂无车辆类型数据，请管理员添加");
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    async handleAdd() {
      var that = this;
      if (this.check == true) {
        if (
          confirm("车辆类型 : " + this.location + "\r定金 : " + this.deposit)
        ) {
          this.$http
            .get("easyPoint/addNewVehicleInfo", {
              params: { vehicleType: that.location, deposit: that.deposit }
            })
            .then(function(res) {
              console.log(res.data);
              var data = res.data;
              if (data.code == 200) {
                alert("添加车辆类型成功");
                that.setData();
              } else if (data.code == 400) {
                alert("该车辆类型已存在,请重新输入");
              }
            })
            .catch(function(e) {
              console.log(e);
            });
        } else {
          console.log("你取消了添加");
        }
      }
    },
    async handledelete(vehicleId) {
      var that = this;
      if (confirm("确定删除该车辆类型?")) {
        this.$http
          .get("deleteVehicleType", {
            params: { vehicleId: vehicleId }
          })
          .then(function(res) {
            console.log(res.data);
            var data = res.data;
            if (data.code == 200) {
              that.setData();
              alert("删除车辆类型成功");
            }
          })
          .catch(function(e) {
            console.log(e);
          });
      } else {
        console.log("您取消了删除！");
      }
    },
    async handlePageChange(page) {
      var that = this;
      this.$http
        .get("findListPageNumVehicleInfo", { params: { pageNum: page } })
        .then(function(res) {
          console.log(res.data);
          var data = res.data;
          if (data.code == 200) {
            that.current = page;
            that.datas = data.data;
            console.log(data.message);
          } else if (data.code == 201) {
            console.log("已经加载完全部数据");
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
.addCommittee {
  height: 50px;
  line-height: 50px;
  color: #8fd68b;
  text-align: center;
  overflow: hidden;
}

.addCommittee input {
  margin-left: 20px;
  margin-right: 10px;
  border-radius: 2px;
  border: 1px solid #8fd68b;
  width: 200px;
  height: 20px;
  outline: none;
  padding: 5px;
}

.addCommittee button {
  background-color: #8fd68b;
  border: none;
  border-radius: 4px;
  color: #f3f2f2;
  width: 80px;
  height: 30px;
}

.VehicleTitle,
.VehicleContent {
  overflow: hidden;
  display: flex;
}

.VehicleTitle li {
  background-color: #8fd68b;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  color: #ffffff;
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.VehicleContent:nth-child(2n + 1) {
  background-color: #e9f7e8;
  color: #96d892;
}

.VehicleContent:nth-child(2n) {
  background-color: #ddf3dc;
  color: #acb2ab;
}

.VehicleContent li {
  text-align: center;
  height: 30px;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  line-height: 30px;
  overflow: hidden;
  border-radius: 4px;
}

.VehicleType {
  width: 650px;
}

.deposit {
  width: 400px;
}

.deleteButton {
  width: 125px;
}

.deleteButtons {
  width: 125px;
  cursor: pointer;
}

.committeePlace {
  width: 980px;
}

.deleteCommitteePlace {
  width: 200px;
}
</style>