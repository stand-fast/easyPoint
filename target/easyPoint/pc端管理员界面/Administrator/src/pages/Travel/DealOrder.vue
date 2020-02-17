<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>租车退款订单详情</h1>
        <!-- 订单详情数据 -->
        <div class="dealOrderWrapper">
          <li>
            <span>联系人</span>
            <div>{{datas.passenger}}</div>
          </li>
          <li>
            <span>联系方式</span>
            <div>{{datas.phone}}</div>
          </li>
          <li>
            <span>出发地</span>
            <div>{{datas.departurePlace}}</div>
          </li>
          <li>
            <span>目的地</span>
            <div>{{datas.destination}}</div>
          </li>
          <li>
            <span>出发时间</span>
            <div>{{datas.departureTime}}</div>
          </li>
          <li></li>
          <li>
            <span>出行人数</span>
            <div>{{datas.travelNum}}</div>
          </li>
          <li>
            <span>车辆类型</span>
            <div>{{datas.vehicleType}}</div>
          </li>
          <li>
            <span>已付定金</span>
            <div>￥{{datas.refundMoney}}</div>
          </li>
          <li>
            <span>是否购买保险</span>
            <div v-if="datas.ifInsurance==0">否</div>
            <div v-else-if="datas.ifInsurance==1">是</div>
          </li>
          <li>
            <span>退款原因</span>
            <div>{{datas.refundReason}}</div>
          </li>
          <!-- 1：待处理，2：审核不通过；3：审核通过；4：已取消 -->
          <li>
            <span>申请退款时间</span>
            <div>{{datas.requestRefundTime}}</div>
          </li>
          <li>
            <span>退款状态</span>
            <div v-if="datas.refundState==1">待处理</div>
            <div v-else-if="datas.refundState==2">审核不通过</div>
            <div v-else-if="datas.refundState==3">审核通过</div>
            <div v-else-if="datas.refundState==4">已取消</div>
          </li>
          <li>
            <span>驳回原因</span>
            <div v-if="datas.refundState==1">
              <input type="text" v-model="rejectReason" />
            </div>
            <div v-else-if="datas.refundState==2">{{datas.rejectReason}}</div>
            <div v-else>无</div>
          </li>
        </div>
        <!-- 订单详情按钮 -->
        <div class="dealOrderButton">
          <span v-if="datas.refundState==1" @click="viaOrder(datas.code)">通过</span>
          <span v-if="datas.refundState==1" @click="notViaOrder(datas.code)">不通过</span>
        </div>
      </div>
    </ul>
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
    const id = this.$route.params.id;
    this.id = id;
    this.setData(id);
  },
  methods: {
    //根据id请求订单详情数据
    async setData(id) {
      let that = this;
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .get("tourismRefund/detail", { params: { tourismRefundId: id } })
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
      this.$http
        .get("tourism/ifAgree", {
          params: { code: code, reason: that.rejectReason, ifAgree: 1 }
        })
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
    },
    //驳回退款
    notViaOrder(code) {
      var that = this;
      if (this.rejectReason == "") {
        alert("驳回原因不能为空");
      } else {
        console.log(that.rejectReason);
        this.$http
          .get("tourism/ifAgree", {
            params: { code: code, reason: that.rejectReason, ifAgree: 0 }
          })
          .then(function(res) {
            var data = res.data;
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
<style scoped>
.dealOrderWrapper {
  display: block;
  margin: 20px auto 10px;
  width: 600px;
  font-size: 15px;
}

.dealOrderWrapper li {
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-bottom: 2px;
}

.dealOrderWrapper li div {
  width: 480px;
  padding: 2px 5px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #72ab6f;
  display: inline-block;
  vertical-align: top;
  border-bottom: 1px dotted #72ab6f;
  overflow: hidden;
}

.dealOrderWrapper li div input {
  width: 460px;
  border: none;
  outline: none;
  color: #72ab6f;
}

.dealOrderWrapper li span {
  border-radius: 3px;
  background-color: #8ebc8c;
  color: #ffffff;
  padding: 2px 5px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  width: 120px;
}

.dealOrderWrapper li span::after {
  content: ":";
  float: right;
}

.dealOrderButton {
  display: block;
  text-align: center;
}

.dealOrderButton span {
  cursor: pointer;
  color: #ffffff;
  display: inline-block;
  width: 100px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 5px;
  background-color: #8ebc8c;
  border-radius: 3px;
}

.dealOrderButton span:first-of-type {
  margin-right: 10px;
}
</style>