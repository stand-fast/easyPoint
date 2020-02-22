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
      navName: '旅游出行',
      navPlateName: '车辆信息',
      id: '', //订单id
      state: '', //订单状态
      datas: [], //车辆信息数据
      licensePlateNumber: '', //车牌号
      vehicleType: '', //车辆类型
      color: '', //车辆颜色
      driverName: '', //司机姓名
      driverPhone: '' //司机联系方式
    }
  },
  mounted() {
    const id = this.$route.params.id
    const state = this.$route.params.state
    this.state = state
    this.id = id
    this.setData(id)
  },
  computed: {
    //验证输入信息是否合法
    check() {
      var reg = /^[1][3458]\d{9}$/ //验证手机号码
      if (this.licensePlateNumber == '') {
        alert('车牌号不能为空')
        return false
      } else if (this.vehicleType == '') {
        alert('车辆类型不能为空')
        return false
      } else if (this.color == '') {
        alert('车身颜色不能为空')
        return false
      } else if (this.driverName == '') {
        alert('司机姓名不能为空')
        return false
      } else if (!reg.test(this.driverPhone)) {
        alert('司机联系方式有误!')
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    // 根据id请求数据
    async setData(id) {
      let that = this
      window.onscroll = e => e.preventDefault() //兼容浏览器
      this.$http
        .get('findDriverInfo', { params })
        .then(function(res) {
          let data = res.data
          let code = data.code
          console.log(data)
          switch (code) {
            case 200:
              that.licensePlateNumber = data.data.licensePlateNumber
              that.vehicleType = data.data.vehicleType
              that.color = data.data.color
              that.driverName = data.data.driverName
              that.driverPhone = data.data.driverPhone
              console.log('查询数据成功')
              break
            case 201:
              alert('已经加载完全部数据')
              break
            default:
              that.$judgeToken(code)
              break
          }
        })
        .catch(function(e) {
          console.log(e)
        })
    },
    //提交车辆信息
    submitVehicle() {
      var that = this
      if (this.check == true) {
        if (
          confirm(
            ' 车牌号 : ' +
              this.licensePlateNumber +
              '\r 车辆类型 : ' +
              this.vehicleType +
              '\r 车身颜色 : ' +
              this.color +
              '\r 司机姓名 :' +
              this.driverName +
              '\r 司机联系方式 : ' +
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
          }
          this.$http
            .get('addDriverInfoToTourismOrder', {
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
              var data = res.data
              let code = data.code
              console.log(data)
              switch (code) {
                case 200:
                  alert('租车订单安排车辆信息成功')
                  that.setData()
                  break
                case 201:
                  alert('安排车辆信息失败,请稍后提交')
                  break
                default:
                  that.$judgeToken(code)
                  break
              }
            })
            .catch(function(e) {
              console.log(e)
            })
        } else {
          console.log('你取消了添加')
        }
      }
    },
    //是否结单
    submitFinish(id) {
      let that = this
      let params = {
        travelOrderId: this.id
      }
      if (confirm('确定是否结单')) {
        this.$http
          .get('finishTourismOrder', { params })
          .then(function(res) {
            var data = res.data
            let code = data.code
            console.log(data)
            switch (code) {
              case 200:
                alert('结单成功')
                break
              case 400:
                alert('结单失败,请稍后重试')
                break
              default:
                that.$judgeToken(code)
                break
            }
          })
          .catch(function(e) {
            console.log(e)
          })
      } else {
        console.log('你取消了结单')
      }
    }
  }
}
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