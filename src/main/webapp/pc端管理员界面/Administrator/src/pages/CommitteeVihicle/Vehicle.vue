<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">{{navName}} - {{navPlateName}}</el-header>
    <!-- 内容 -->
    <el-main class="el-main-content">
      <p class="model-content-input">
        <span>车牌号：</span>
        <el-input placeholder="请输入车牌号" v-model="licensePlateNumberChange" clearable></el-input>
      </p>
      <p class="model-content-input">
        <span>车辆类型：</span>
        <el-input placeholder="请输入车辆类型" v-model="vehicleTypeChange" clearable></el-input>
      </p>
      <p class="model-content-input">
        <span>车身颜色：</span>
        <el-input placeholder="请输入车身颜色" v-model="colorChange" clearable></el-input>
      </p>
      <p class="model-content-input">
        <span>司机姓名：</span>
        <el-input placeholder="请输入司机姓名" v-model="driverNameChange" clearable></el-input>
      </p>
      <p class="model-content-input">
        <span>司机联系方式：</span>
        <el-input placeholder="请输入司机联系方式" v-model="driverPhoneChange" clearable maxlength="11"></el-input>
      </p>
      <p class="model-content-input">
        <span></span>
        <el-button class="model-content-button" @click="updateTicketInfo()">提交</el-button>
        <el-button class="model-content-button" @click="submitFinish(id)">结单</el-button>
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
      id: "",//订单id,
      licensePlateNumber: "",//车牌号
      licensePlateNumberChange: "",//修改车牌号
      vehicleType: "",//车辆类型
      vehicleTypeChange: "",//修改车辆类型
      color: "",//颜色
      colorChange: "",//修改车辆颜色
      driverName: "",//司机姓名
      driverNameChange: "",//修改司机姓名
      driverPhone: "",//司机联系方式
      driverPhoneChange: "",//修改司机联系方式
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
        alert("车牌号不能为空");
        return false;
      } else if (this.vehicleType == "") {
        alert("车辆类型不能为空");
        return false;
      } else if (this.color == "") {
        alert("车身颜色不能为空");
        return false;
      } else if (this.driverName == "") {
        alert("司机姓名不能为空");
        return false;
      } else if (!reg.test(this.driverPhone)) {
        alert("司机联系方式有误!");
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
      let params = { "ticketId": id};
      this.$http
        .get("findTicketInfo", { params })
        .then(res => {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case -1:
              alert("查询失败");
              break;
            case 1:
              console.log("查询成功");
              let info = data.data.ticketInfo;
              this.licensePlateNumber = info.licensePlateNumber;
              this.vehicleType = info.vehicleType;
              this.color = info.color;
              this.driverName = info.driverName;
              this.driverPhone = info.driverPhone;
              break;
            case 2:
              alert("参数为空");
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
      params.append("licensePlateNumber", this.licensePlateNumberChange || this.licensePlateNumber );
      params.append("vehicleType", this.vehicleTypeChange || this.vehicleType);
      params.append("color", this.colorChange || this.color);
      params.append("driverName", this.driverNameChange || this.driverName);
      params.append("driverPhone", this.driverPhoneChange || this.driverPhone);
      this.$http
        .post("updateTicketInfo", params)
        .then(res => {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case -1:
              alert("修改失败");
              break;
            case 1:
              alert("修改成功");
              this.findTicketInfo(this.id);
              this.licensePlateNumberChange = "";
              this.vehicleTypeChange = "";
              this.colorChange = "";
              this.driverNameChange = "";
              this.driverPhoneChange = "";
              break;
            case 2:
              alert("参数为空");
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
    //结单
    submitFinish(id) {
      let that = this;
      if (confirm("确定是否结单")) {
        let params = {
              travelOrderId: 11
        };
        this.$http
          .get("接口路径", { params })
          .then(function(res) {
            let data = res.data;
            let code = data.code;
            switch(code){
              case 200:
                console.log(data);
                alert("结单成功");
              case 400:
                console.log(data);
                alert("结单失败,请稍后重试");
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