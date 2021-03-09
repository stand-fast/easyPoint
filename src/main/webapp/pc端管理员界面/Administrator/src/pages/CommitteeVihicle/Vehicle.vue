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
        <el-button class="model-content-button" @click="updateTicketInfo()">提交</el-button>
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
      id: "", //订单id,
      licensePlateNumber: "", //车牌号
      vehicleType: "", //车辆类型
      color: "", //颜色
      driverName: "", //司机姓名
      driverPhone: "" //司机联系方式
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.id = id;
    console.log("根据" + id + "请求数据");
    this.findTicketInfo(id);
  },
  computed: {
    //验证信息是否合法
    check() {
      let reg = /^[1][3458]\d{9}$/; //验证手机号码
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
          message: '司机联系方式有误',
          type: 'warning'
        });
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    //请求车辆信息数据
    async findTicketInfo(id) {
      let that = this;
      let params = { ticketId: id };
      this.$http
        .get("findTicketInfo", { params })
        .then(res => {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case -1:
              that.$message({
                message: '查询失败',
                type: 'warning'
              });
              break;
            case 1:{
              console.log("查询成功");
              let info = data.data.ticketInfo;
              that.licensePlateNumber =
                info.licensePlateNumber == "未添加"
                  ? ""
                  : info.licensePlateNumber;
              that.vehicleType =
                info.vehicleType == "未添加" ? "" : info.vehicleType;
              that.color = info.color == "未添加" ? "" : info.color;
              that.driverName =
                info.driverName == "未添加" ? "" : info.driverName;
              that.driverPhone =
                info.driverPhone == "未添加" ? "" : info.driverPhone;
              break;
            }
            case 2:
              that.$message({
                message: '参数为空',
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
    //更新车辆信息数据
    updateTicketInfo() {
      let that = this;
      let params = new URLSearchParams();
      params.append("ticketId", this.id);
      params.append("licensePlateNumber", this.licensePlateNumber);
      params.append("vehicleType", this.vehicleType);
      params.append("color", this.color);
      params.append("driverName", this.driverName);
      params.append("driverPhone", this.driverPhone);
      this.$http
        .post("updateTicketInfo", params)
        .then(res => {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case -1:
              that.$message({
                message: '修改失败',
                type: 'warning'
              });
              break;
            case 1:
              that.$message({
                message: '修改成功',
                type: 'success'
              });
              this.findTicketInfo(this.id);
              break;
            case 2:
              that.$message({
                message: '参数为空',
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
    }
  }
};
</script>