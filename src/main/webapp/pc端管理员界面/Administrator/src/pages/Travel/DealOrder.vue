<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">{{navName}} - {{navPlateName}}</el-header>
    <!-- 内容 -->
    <el-main class="el-main-content">
      <div class="delorder-model">
        <p>
          <span>联系人:</span>
          <label>{{datas.passenger}}</label>
        </p>
        <p>
          <span>联系方式:</span>
          <label>{{datas.phone }}</label>
        </p>
        <p>
          <span>出发地:</span>
          <label>{{datas.departurePlace}}</label>
        </p>
        <p>
          <span>目的地:</span>
          <label>{{datas.destination}}</label>
        </p>
        <p>
          <span>出发时间:</span>
          <label>{{datas.departureTime}}</label>
        </p>
        <p>
          <span>出行人数:</span>
          <label>{{datas.travelNum}}</label>
        </p>
        <p>
          <span>车辆类型:</span>
          <label>{{datas.vehicleType}}</label>
        </p>
        <p>
          <span>已付定金:</span>
          <label>{{datas.refundMoney}}</label>
        </p>
        <p>
          <span>购买保险:</span>
          <label v-if="datas.ifInsurance==0">否</label>
          <label v-else-if="datas.ifInsurance==1">是</label>
        </p>
        <p>
          <span>退款原因:</span>
          <label>{{datas.refundReason}}</label>
        </p>
        <p>
          <span>退款时间:</span>
          <label>{{datas.requestRefundTime}}</label>
        </p>
        <p>
          <span>退款状态:</span>
          <label v-if="datas.refundState==1">待处理</label>
          <label v-else-if="datas.refundState==2">审核不通过</label>
          <label v-else-if="datas.refundState==3">审核通过</label>
          <label v-else-if="datas.refundState==4">已取消</label>
        </p>
        <p>
          <span>驳回原因:</span>
          <label v-if="datas.refundState==1">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 3}"
              placeholder="请输入内容"
              v-model="rejectReason"
            ></el-input>
          </label>
          <label v-else-if="datas.refundState==2">{{datas.rejectReason}}</label>
          <label v-else>无</label>
        </p>
        <div class="delorder-model-button">
          <span v-if="datas.refundState==1" @click="viaOrder(datas.code)">通过</span>
          <span v-if="datas.refundState==1" @click="notViaOrder(datas.code)">不通过</span>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navName: "旅游出行",
      navPlateName: "退款订单详情",
      datas: "", //订单详情数据
      rejectReason: "" //驳回理由
    };
  },
  mounted() {
    const id = this.$route.params.id; //通过路由器获取id
    this.id = id;
    this.setData(id);
  },
  methods: {
    //根据id请求订单详情数据
    async setData(id) {
      let that = this;
      let params = { tourismRefundId: id };
      this.$http
        .get("tourismRefund/detail", { params })
        .then(function(res) {
          let data = res.data;
          let code = data.code;
          console.log(data);
          switch (code) {
            case 200:
              that.datas = data.data;
              console.log(data.message);
              break;
            case 400:
              alert(data.message);
              break;
            case 401:
              alert(data.message);
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
    //通过退款
    viaOrder(code) {
      let that = this;
      let params = new URLSearchParams();
      params.append("code", code);
      params.append("reason", that.rejectReason);
      params.append("ifAgree", 1);
      this.$http
        .post("tourism/ifAgree", params)
        .then(function(res) {
          let data = res.data;
          let code = data.code;
          console.log(data);
          switch (code) {
            case 200:
              alert(data.message);
              break;
            case 201:
              alert(data.message);
              break;
            case 400:
              alert(data.message);
              break;
            case 401:
              alert(data.message);
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
    //驳回退款
    notViaOrder(code) {
      if (this.rejectReason == "") {
        alert("驳回原因不能为空");
      } else {
        let that = this;
        console.log(that.rejectReason);
        let params = { code: code, reason: that.rejectReason, ifAgree: 0 };
        this.$http
          .get("tourism/ifAgree", { params })
          .then(function(res) {
            let data = res.data;
            let code = data.code;
            console.log(data);
            switch (code) {
              case 200:
                alert(data.message);
                break;
              case 201:
                alert(data.message);
                break;
              case 401:
                alert(data.message);
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
  }
};
</script>