<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">{{navName}} - {{navPlateName}}</el-header>
    <!-- 内容 -->
    <el-main class="el-main-content">
      <p class="model-content-input">
        <span>车牌号：</span>
        <el-input placeholder="请输入车牌号" v-model="licensePlateNumber" clearable></el-input>
      </p>
      <p class="model-content-input">
        <span>车辆类型：</span>
        <el-input placeholder="请输入车辆类型" v-model="vehicleType" clearable></el-input>
      </p>
      <p class="model-content-input">
        <span>车身颜色：</span>
        <el-input placeholder="请输入车身颜色" v-model="color" clearable></el-input>
      </p>
      <p class="model-content-input">
        <span>司机姓名：</span>
        <el-input placeholder="请输入司机姓名" v-model="driverName" clearable></el-input>
      </p>
      <p class="model-content-input">
        <span>司机联系方式：</span>
        <el-input placeholder="请输入司机联系方式" v-model="driverPhone" clearable maxlength="11"></el-input>
      </p>
      <p class="model-content-input">
        <span></span>
        <el-button
          class="model-content-button"
          v-if="state ==1 || state ==0"
          @click="submitVehicle"
        >提交</el-button>
        <el-button class="model-content-button" v-if="state != 2" @click="submitFinish(id)">结单</el-button>
      </p>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navName: "旅游出行",
      navPlateName: "车辆信息",
      id: "", //订单id
      state: "", //订单状态
      datas: [], //车辆信息数据
      licensePlateNumber: "", //车牌号
      vehicleType: "", //车辆类型
      color: "", //车辆颜色
      driverName: "", //司机姓名
      driverPhone: "" //司机联系方式
    };
  },
  mounted() {
    const id = this.$route.params.id; //通过路由获取订单id
    const state = this.$route.params.state; //通过路由获取订单状态
    this.state = state; //绑定订单状态
    this.id = id; //绑定订单id
    this.setData(id); // 根据id请求数据
  },
  computed: {
    //验证输入信息是否合法
    check() {
      var reg = /^[1][3458]\d{9}$/; //验证手机号码
      if (this.licensePlateNumber == "") {
        this.$message({
          message: '车牌号不能为空',
          type: 'warning'
        });
        return false;
      } else if (this.vehicleType == "") {
        this.$message({
          message: '车辆类型不能为空',
          type: 'warning'
        });
        return false;
      } else if (this.color == "") {
        this.$message({
          message: '车身颜色不能为空',
          type: 'warning'
        });
        return false;
      } else if (this.driverName == "") {
        this.$message({
          message: '司机姓名不能为空',
          type: 'warning'
        });
        return false;
      } else if (!reg.test(this.driverPhone)) {
        this.$message({
          message: '司机联系方式有误!',
          type: 'warning'
        });
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    // 根据id请求数据
    async setData(id) {
      let that = this;
      let params = { travelOrderId: id };
      this.$http
        .get("findDriverInfo", { params })
        .then(function(res) {
          let data = res.data;
          let code = data.code;
          console.log(data);
          switch (code) {
            case 200:
              that.licensePlateNumber = data.data.licensePlateNumber;
              that.vehicleType = data.data.vehicleType;
              that.color = data.data.color;
              that.driverName = data.data.driverName;
              that.driverPhone = data.data.driverPhone;
              console.log("查询数据成功");
              break;
            case 201:
              that.$message({
                message: '已经加载完全部数据',
                type: 'warning'
              });
              break;
            case 401:
              that.$message({
                message: '订单已经完成，不能再修改车辆信息',
                type: 'warning'
              });
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
    //提交车辆信息
    submitVehicle() {
      var that = this;
      if (this.check == true) {
        if (
          confirm(
            " 车牌号 : " +
              this.licensePlateNumber +
              "\r 车辆类型 : " +
              this.vehicleType +
              "\r 车身颜色 : " +
              this.color +
              "\r 司机姓名 :" +
              this.driverName +
              "\r 司机联系方式 : " +
              this.driverPhone
          )
        ) {
          let params = {
            travelOrderId: this.id,
            licensePlateNumber: that.licensePlateNumber,
            vehicleType: that.vehicleType,
            color: that.color,
            driverName: that.driverName,
            driverPhone: that.driverPhone
          };
          this.$http
            .get("addDriverInfoToTourismOrder", { params })
            .then(function(res) {
              var data = res.data;
              let code = data.code;
              console.log(data);
              switch (code) {
                case 200:
                  that.$message({
                    message: '租车订单安排车辆信息成功',
                    type: 'success'
                  });
                  break;
                case 201:
                  that.$message({
                    message: '安排车辆信息失败,请稍后提交',
                    type: 'warning'
                  });
                  break;
                case 401:
                  that.$message({
                    message: data.message,
                    type: 'warning'
                  });
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
    //是否结单
    submitFinish(id) {
      let that = this;
      let params = {
        travelOrderId: this.id
      };
      if (confirm("确定是否结单")) {
        this.$http
          .get("finishTourismOrder", { params })
          .then(function(res) {
            var data = res.data;
            let code = data.code;
            console.log(data);
            switch (code) {
              case 200:
                that.$message({
                  message: '结单成功',
                  type: 'success'
                });
                break;
              case 400:
                that.$message({
                  message: '结单失败,请稍后重试',
                  type: 'warning'
                });
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
        console.log("你取消了结单");
      }
    }
  }
};
</script>
<style scoped>
.vehicleInfor {
  height: 500px;
  text-align: center;
}

.vehicleInfor li {
  margin-top: 10px;
  height: 50px;
  line-height: 40px;
}

.vehicleInfor li input {
  outline: none;
  padding: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 200px;
  height: 50px;
  border: 1px solid #8fd68b;
}

.submitVihicle {
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 40px;
  line-height: 30px;
  margin-top: 10px;
  overflow: hidden;
}

.submitVihicle span {
  display: inline-block;
  width: 80px;
  padding: 5px;
  cursor: pointer;
  background-color: #8fd68b;
  color: #ffffff;
}
</style>