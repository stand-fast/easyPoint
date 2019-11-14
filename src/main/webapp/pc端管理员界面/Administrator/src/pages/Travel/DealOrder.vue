<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>租车退款订单详情</h1>
        <div class="dealOrderWrapper">
          <li>
            <span>联系人</span>
            <div>光头强</div>
          </li>
          <li>
            <span>联系方式</span>
            <div>13030303532</div>
          </li>
          <li>
            <span>出发地</span>
            <div>广东省广东省广东省广东省广东省广东省广东省省广东省</div>
          </li>
          <li>
            <span>目的地</span>
            <div>省广东省广东省广东省省广东省</div>
          </li>
          <li>
            <span>出发时间</span>
            <div>2019-10-01 08:30</div>
          </li>
          <li></li>
          <li>
            <span>出行人数</span>
            <div>20人</div>
          </li>
          <li>
            <span>车辆类型</span>
            <div>24座大巴</div>
          </li>
          <li>
            <span>已付定金</span>
            <div>￥1000</div>
          </li>
          <li>
            <span>是否购买保险</span>
            <div>是</div>
          </li>
          <li>
            <span>退款原因</span>
            <div>广东省广东省广东省广广东省广东省广东省广广东省广东省广东省广广东省广东省广东省广广东省广东省广东省广广东省广东省广东省广广东省广东省广东省广广东省广东省广东省广广东省广东省广东省广广东省广东省广东省广</div>
          </li>
          <li>
            <span>申请退款时间</span>
            <div>2019-10-01 08:30</div>
          </li>
          <li>
            <span>退款状态</span>
            <div>审核不通过</div>
          </li>
          <li>
            <span>驳回原因</span>
            <div>
              <input type="text" value="广东省广东省广东省广" />
            </div>
          </li>
        </div>
        <div class="dealOrderButton">
          <span @click="viaOrder(123)">通过</span>
          <span @click="notViaOrder(132)">不通过</span>
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
      datas: ""
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.id = id;
    //console.log("根据" + id + "请求数据");
    this.setData(id);
  },
  methods: {
    async setData(id) {
      var that = this;
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .get("tourismRefund/detail", { params: { tourismRefundId: id } })
        .then(function(res) {
          // var data = res.data;
          var data = res.data;
          console.log(data);
          if (data.code == 200) {
            that.datas = data.data;
            console.log(data.message);
          } else if (data.code == 400) {
            console.log(data.message);
          } else if (data.code == 401) {
            console.log(data.message);
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    viaOrder(id) {
      console.log(id);
    },
    notViaOrder(id) {
      console.log(id);
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