<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>车辆信息</h1>
        <ul class="vehicleInfor">
          <li>
            <input v-model="licensePlateNumber" placeholder="车牌号" />
          </li>
          <li>
            <input v-model="vehicleType" placeholder="车辆类型" />
          </li>
          <li>
            <input v-model="color" placeholder="车身颜色" />
          </li>
          <li>
            <input v-model="driverName" placeholder="司机姓名" />
          </li>
          <li>
            <input v-model="driverPhone" maxlength="11" placeholder="司机联系方式" />
          </li>
          <div class="submitVihicle">
            <span v-if="state ==1 || state ==0" @click="submitVehicle">提交</span>
            <span v-if="state != 2" @click="submitFinish(id)" style="margin-left:5px">结单</span>
          </div>
        </ul>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navName: "旅游出行",
      navPlateName: "车辆信息",
      datas: [],
      licensePlateNumber: "",
      vehicleType: "",
      color: "",
      driverName: "",
      driverPhone: "",
      id: "", //订单id
      state: "" //订单状态
    };
  },
  mounted() {
    const id = this.$route.params.id;
    const state = this.$route.params.state;
    this.state = state;
    this.id = id;
    console.log("根据" + id + "请求数据");
    this.setData(id);
  },
  computed: {
    check() {
      var reg = /^[1][3458]\d{9}$/; //验证手机号码
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
    async setData(id) {
      var that = this;
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .get("findDriverInfo", { params: { travelOrderId: id } })
        .then(function(res) {
          var data = res.data;
          console.log(data);
          if (data.code == 200) {
            that.licensePlateNumber = data.data.licensePlateNumber;
            that.vehicleType = data.data.vehicleType;
            that.color = data.data.color;
            that.driverName = data.data.driverName;
            that.driverPhone = data.data.driverPhone;
            console.log("查询数据成功");
          } else if (data.code == 201) {
            console.log("已经加载完全部数据");
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
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
          this.$http
            .get("addDriverInfoToTourismOrder", {
              params: {
                travelOrderId: this.id,
                licensePlateNumber: that.licensePlateNumber,
                vehicleType: that.vehicleType,
                color: that.color,
                driverName: that.driverName,
                driverPhone: that.driverPhone
              }
            })
            .then(function(res) {
              var data = res.data;
              if (data.code == 200) {
                console.log(data);
                alert("租车订单安排车辆信息成功");
                that.setData();
              } else if (data.code == 201) {
                console.log(data);
                alert("安排车辆信息失败,请稍后提交");
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
    submitFinish(id) {
      var that = this;
      if (confirm("确定是否结单")) {
        this.$http
          .get("finishTourismOrder", {
            params: {
              travelOrderId: this.id
            }
          })
          .then(function(res) {
            var data = res.data;
            if (data.code == 200) {
              console.log(data);
              alert("结单成功");
            } else if (data.code == 400) {
              console.log(data);
              alert("结单失败,请稍后重试");
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