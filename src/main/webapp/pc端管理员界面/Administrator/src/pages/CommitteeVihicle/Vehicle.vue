<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <button class="back" @click="$router.back(-1)">返回上一页</button> 
        <h1>车辆信息</h1>
        <ul class="vehicleInfor">
          <li>
            <span>车牌号</span>
            <input v-model="licensePlateNumberChange" :placeholder="licensePlateNumber" />
          </li>
          <li>
            <span>车辆类型</span>
            <input v-model="vehicleTypeChange" :placeholder="vehicleType" />
          </li>
          <li>
            <span>车身颜色</span>
            <input v-model="colorChange" :placeholder="color" />
          </li>
          <li>
            <span>司机姓名</span>
            <input v-model="driverNameChange" :placeholder="driverName" />
          </li>
          <li>
            <span>司机联系方式</span>
            <input  v-model="driverPhoneChange" maxlength="11" :placeholder="driverPhone" />
          </li>
          <div class="submitVihicle">
            <span @click="updateTicketInfo()">提交</span>
            <span @click="submitFinish(id)" style="margin-left:5px">结单</span>
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
      licensePlateNumberChange:"",
      vehicleType: "",
      vehicleTypeChange: "",
      color: "",
      colorChange: "",
      driverName: "",
      driverNameChange: "",
      driverPhone: "",
      driverPhoneChange: "",
      id: "", //订单id,
      

    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.id = id;
    console.log("根据" + id + "请求数据");
    this.findTicketInfo(id)
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
    async updateTicketInfo() {
      var qs = require('qs')
      var postData=qs.stringify( {
        ticketId:this.id,
        licensePlateNumber:this.licensePlateNumberChange||this.licensePlateNumber,
        vehicleType:this.vehicleTypeChange||this.vehicleType,
        color:this.colorChange||this.color,
        driverName:this.driverNameChange||this.driverName,
        driverPhone:this.driverPhoneChange||this.driverPhone
      })
      var url="https://easypoint.club/administrator/updateTicketInfo"
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .post(url,postData)
        .then((res) => {
          console.log(res.data);
          var data = res.data;
          switch(data.code){
          case -1:
              alert("修改失败")
              break;     
            case 1:
              alert("修改成功")
              this.findTicketInfo(this.id)
              this.licensePlateNumberChange=""
              this.vehicleTypeChange=""
              this.colorChange=""
              this.driverNameChange=""
              this.driverPhoneChange=""
              break;
            case 2:
              alert("参数为空")
             break;    
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },   
    async findTicketInfo(id){
      var qs = require('qs')
      var postData={params:{
        ticketId:id
        }
      };
      var url="https://easypoint.club/administrator/findTicketInfo"
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .get(url,postData)
        .then((res) => {
          console.log(res.data);
          var data = res.data;
          switch(data.code){
            case -1:
              alert("查询失败")
              break;
            case 1:
              console.log("查询成功")
              let info=data.data.ticketInfo
              this.licensePlateNumber=info.licensePlateNumber
              this.vehicleType=info.vehicleType
              this.color=info.color
              this.driverName=info.driverName
              this.driverPhone=info.driverPhone
              break;
            case 2:
              alert("参数为空")
              break;                
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
              this.licensePlateNumberChange||this.licensePlateNumber +
              "\r 车辆类型 : " +
              this.vehicleTypeChange||this.vehicleType +
              "\r 车身颜色 : " +
              this.colorChange||this.color +
              "\r 司机姓名 :" +
              this.driverNameChange||this.driverName +
              "\r 司机联系方式 : " +
              this.driverPhoneChange||this.driverPhone
          )
        ) {
          this.$http
            .get("接口路径", {
              params: {
                travelOrderId: 10,
                licensePlateNumber: that.licensePlateNumberChange||that.licensePlateNumber,
                vehicleType: that.vehicleTypeChange||that.vehicleType,
                color: that.colorChange||that.color,
                driverName: that.driverNameChange||that.driverName,
                driverPhone: that.driverPhoneChange||that.driverPhone
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
          .get("接口路径", {
            params: {
              travelOrderId: 11
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
.back{
    background: none;
    border: 0;
    color: #8fd68b;
    position: absolute;
    left: 33px;
    top: 86px;
    font-size: 18px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
    border-bottom: 2px solid;
}

h1{
  cursor: default;
  margin-top:20px;
}

.vehicleInfor {
  height: 500px;
  text-align: center;
}

.vehicleInfor li {
  margin-top: 16px;
  height: 50px;
  line-height: 40px;
  position: relative;
}

.vehicleInfor li input {
  cursor: pointer;
  outline: none;
  padding: 10px;
  box-sizing: border-box;
  width: 200px;
  height: 50px;
  border: 1px solid #8fd68b;
}
.vehicleInfor li span{
  display: inline-block;
  font-size: 13px;
  color: #6b6b6b;
  text-align: left;
  background-color: white;
  position: absolute;
  top: -3px;
  padding: 0 8px;
  line-height: 14px;
} 

.submitVihicle {
  text-align: center;
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