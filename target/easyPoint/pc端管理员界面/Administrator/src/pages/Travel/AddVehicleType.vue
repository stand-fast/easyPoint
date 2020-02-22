<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">
      {{navName}}-{{navPlateName}}
      <span @click="showAddVehicle = true;">添加车辆类型</span>
      <el-popover
        placement="top"
        title="添加车辆类型"
        width="300"
        trigger="click"
        v-model="showAddVehicle"
      >
        <div class="spring-model-con">
          <li>
            <span>车辆类型:</span>
            <el-input class="model-input" placeholder="请输入车辆类型" v-model="location" clearable></el-input>
          </li>
          <li>
            <span>定金:</span>
            <el-input class="model-input" placeholder="请输入定金" v-model="deposit" clearable></el-input>
          </li>
        </div>
        <div class="spring-model-con-button">
          <el-button type="text" size="mini" @click="showAddVehicle = false;">取消</el-button>
          <el-button type="primary" size="mini" @click="handleAdd()">添加</el-button>
        </div>
        <!-- 遍历所有车辆类型数据 -->
        <div class="nav association" v-for="item in datas" :key="item.vehicleId">
          <li class="associationName">{{item.vehicleType}}</li>
          <li class="associationPlace">{{item.deposit}}</li>
          <li class="associationDelete enter" @click="handledelete(item.vehicleId)">删除</li>
        </div>

        <!-- 页码组件 -->
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
export default {
  data() {
    return {
      navName: "旅游出行",
      navPlateName: "添加发布车辆类型",
      location: "", //车辆类型
      deposit: "", //定金
      datas: [], //车辆类型数据
      pageSize: 10, //每页最大条数
      panelNumber: 5, //最多显示多少个分页按钮
      current: 1, //当前页码
      pageNumber: 5 //页码总数
    };
  },
  computed: {
    //检查输入数据是否合法
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
    //获取首页数据以及页码总数
    async setData() {
      let that = this;
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .get("getTotalPageAndFirstVehicleInfoList")
        .then(function(res) {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case 200:
              that.pageNumber = data.data.totalPage;
              that.current = 1;
              that.datas = data.data.vehicleInfoList;
              console.log("查询订单页数以及首页订单信息成功");
              break;
            case 201:
              alert("暂无车辆类型数据，请管理员添加");
              break;
            default:
              that.$judgeToken(code);
              break;
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    //获取分页数据
    async handlePageChange(page) {
      let that = this;
      this.$http
        .get("findListPageNumVehicleInfo", { params: { pageNum: page } })
        .then(function(res) {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case 200:
              that.current = page;
              that.datas = data.data;
              console.log(data.message);
              break;
            case 201:
              alert("已经加载完全部数据");
              that.setData();
              break;
            default:
              that.$judgeToken(code);
              break;
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    //添加车辆类型
    async handleAdd() {
      let that = this;
      if (this.check == true) {
        if (
          confirm("车辆类型 : " + this.location + "\r定金 : " + this.deposit)
        ) {
          this.$http
            .get("addNewVehicleInfo", {
              params: { vehicleType: that.location, deposit: that.deposit }
            })
            .then(function(res) {
              console.log(res.data);
              let data = res.data;
              let code = data.code;
              switch (code) {
                case 200:
                  alert("添加车辆类型成功");
                  that.setData();
                  break;
                case 400:
                  alert("该车辆类型已存在,请重新输入");
                  break;
                default:
                  that.$judgeToken(code);
                  break;
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
    //删除车辆类型
    async handledelete(vehicleId) {
      let that = this;
      if (confirm("确定删除该车辆类型?")) {
        this.$http
          .get("addNewVehicleInfo", { params })
          .then(function(res) {
            console.log(res.data);
            let data = res.data;
            let code = data.code;
            switch (code) {
              case 200:
                alert("删除车辆类型成功");
                that.setData();
                break;
              default:
                that.$judgeToken(code);
                break;
            }
          })
          .catch(function(e) {
            console.log(e);
          });
      }
    }
  },
  components: {
    paging
  }
};
</script>