<template>
  <div class="modelPage">
    <div class="modelPageTop">
      <img src="../assets/logo.png" />
      <div class="modelPageTopDetails">
        <p>易点</p>
        <p>让你的大学生活简单一点</p>
      </div>
      <div class="modelPageTopLogin" v-if="loginUser">
        <span @click="showUserInformation">{{loginUser.name}}</span>|
        <span @click="loginOut">退出登录</span>
      </div>

      <div class="userInformation" v-if="loginUser" v-show="showUserInfor">
        <div class="inforTitle">管理员个人信息</div>
        <p>
          <span>账户：13013013011</span>
          <label>更换绑定</label>
        </p>
        <p>
          <span>密码：*******</span>
          <label>修改</label>
        </p>
        <p>
          <span>角色：{{loginUser.name}}</span>
        </p>

        <div @click="showUserInformation" class="InforButton">关闭</div>
      </div>

      <!-- <div class="userInformation" v-show="showModefyAccount">
        <div class="inforTitle">管理员个人信息</div>
        <p>
          <span>账户：</span>
          <input placeholder="请填写手机号码" />
          <label>获取验证码</label>
        </p>
        <p>
          <span>
            验证码：
            <input placeholder="请填写验证码" />
          </span>
        </p>
        <p>
          <span>密码：</span>
          <input placeholder="请填写密码" />
        </p>
        <p>
          <span>再次输入：</span>
          <input placeholder="请再次填写密码" />
        </p>
        <p>
          <span>角色：{{loginUser.name}}</span>
        </p>

        <div @click="showUserInformation" class="InforButton">提交</div>
      </div>-->
    </div>
    <div class="modelPageContent">
      <ul class="PageContentLeft">
        <li class="ContentCard"></li>
        <li
          class="ContentNavigation"
          v-for="(item,index) in navigationName"
          :key="item.id"
          @mouseover="showSecondName(index)"
          @mouseout="hideSecondName"
        >
          {{item.name}}
          <ul v-show="index===isShow" class="navigation-sub">
            <li v-for="items in item.secondName" :key="items.id">
              <a :href="items.url">{{ items.childrenName }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigationName: [
        {
          id: "1",
          name: "已加盟商家",
          secondName: [
            {
              id: "1",
              childrenName: "已加盟企业商家"
            },
            {
              id: "2",
              childrenName: "已加盟学生商家"
            }
          ]
        },
        {
          id: "2",
          name: "商家加盟申请",
          secondName: [
            {
              id: "1",
              childrenName: "企业商家加盟申请",
              url: "#/JoinList"
            },
            {
              id: "2",
              childrenName: "学生商家加盟申请",
              url: "#/JoinList"
            }
          ]
        },
        {
          id: "3",
          name: "管理员账号",
          secondName: [
            {
              id: "1",
              childrenName: "账号管理",
              url: "#/AccountManagement"
            }
          ]
        },
        {
          id: "4",
          name: "校友会包车",
          secondName: [
            {
              id: "1",
              childrenName: "添加同乡会",
              url: "#/AddAssociation"
            },
            {
              id: "2",
              childrenName: "添加车辆",
              url: "#/BusSearcher"
            },
            {
              id: "3",
              childrenName: "我的发布",
              url: "#/TicketManagement"
            },
            {
              id: "4",
              childrenName: "历史发布",
              url: "#/HistoryTicket"
            }
          ]
        },
        {
          id: "5",
          name: "旅游出行",
          secondName: [
            {
              id: "1",
              childrenName: "添加发布车辆类型",
              url: "#/AddVehicleType"
            },
            {
              id: "2",
              childrenName: "租车订单",
              url: "#/CarRentalOrder"
            },
            {
              id: "3",
              childrenName: "退款订单",
              url: "#/CarRentalRefund"
            }
          ]
        },
        {
          id: "6",
          name: "公告栏",
          secondName: [
            {
              id: "1",
              childrenName: "当前公告",
              url: "#/CurrentAnnouncement"
            }
          ]
        },
        {
          id: "7",
          name: "审核",
          secondName: [
            {
              id: "1",
              childrenName: "审核1"
            },
            {
              id: "2",
              childrenName: "审核2"
            }
          ]
        }
      ],
      childrenName: [],
      isShow: 0,
      showUserInfor: false,
      showModefyAccount: false
    };
  },
  mounted: function() {
    this.isShow = -1;
  },
  computed: {
    loginUser() {
      return this.$store.state.data;
    }
  },
  methods: {
    showUserInformation() {
      this.showUserInfor = !this.showUserInfor;
    },
    showSecondName(index) {
      this.isShow = index;
    },
    hideSecondName() {
      this.isShow = !this.isShow;
    },
    loginOut() {
      this.$store.dispatch("loginOut");
      this.$router.push("/login");
    }
  }
};
</script>
<style>
.userInformation {
  z-index: 100;
  position: absolute;
  top: 20%;
  left: 50%;
  padding: 20px;
  background: #ffffff;
  min-width: 340px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #8ebc8c;
}
.userInformation .inforTitle {
  padding: 5px;
  border-radius: 4px;
  background: #8ebc8c;
  color: #ffffff;
}
.userInformation p {
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 3px;
  padding: 5px 0;
  color: #333;
  background: #ffffff;
  border: 1px solid #8fd68b;
  box-shadow: 0 0 2px 0 #8ebc8c;
}
/* .userInformation p input {
  outline: none;
  width: 100px;
} */
.userInformation p label {
  padding: 3px;
  border-radius: 2px;
  cursor: pointer;
}
.userInformation p label:hover {
  box-shadow: 0 0 3px 0 #8ebc8c;
}
.userInformation p span {
  display: inline-block;
  padding: 5px;
  width: 170px;
  box-sizing: border-box;
}
.InforButton {
  cursor: pointer;
  width: 60px;
  padding: 3px;
  text-align: center;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 10px auto 0;
  background: #8ebc8c;
  color: #ffffff;
}

* {
  margin: 0px;
  padding: 0px;
  font-family: "Open Sans", "Microsoft YaHei", "Heiti SC", "STHeiti Light",
    "PMingLiU", sans-serif;
}

li {
  list-style: none;
}

.modelPage {
  margin: 0 auto;
  width: calc(100% - 100px);
}

.modelPageTop {
  width: 100%;
  height: 80px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #8fd68b;
}

.modelPageTop img {
  width: 250px;
  height: 82px;
}

.modelPageTopLogin {
  width: calc(100% - 500px);
  text-align: right;
  color: #ffffff;
  overflow: hidden;
  margin-top: 30px;
  height: 26px;
}
.modelPageTopLogin span {
  padding: 3px 5px;
  cursor: pointer;
}
.modelPageTopLogin span:hover {
  border-bottom: 1px solid #ffffff;
}
.modelPageTopDetails {
  height: 80px;
  color: #ffffff;
}

.modelPageTopDetails p {
  overflow: hidden;
  width: 180px;
  display: block;
  font-size: 14px;
  margin-top: 14px;
}

.modelPageContent {
  width: 250px;
  height: 620px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.PageContentLeft {
  width: 250px;
  height: 620px;
  background-color: #72ab6f;
  border-bottom-left-radius: 4px;
  -webkit-padding-start: 0px;
  padding-inline-start: 0px;
}

.ContentCard {
  margin: 20px auto;
  width: 230px;
  height: 120px;
  background-color: #c7ddc5;
  border-radius: 6px;
}

.ContentNavigation {
  margin: 4px auto;
  padding-left: 50px;
  width: 230px;
  height: 45px;
  line-height: 45px;
  border-radius: 4px;
  border-bottom: 1px solid #ffffff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #ffffff;
  background-color: #8ebc8c;
  cursor: pointer;
  position: relative;
}

.ContentNavigation:hover {
  color: #72ab6f;
  background-color: #ffffff;
}

.navigation-sub {
  position: absolute;
  top: -3px;
  left: 230px;
  width: 200px;
  -webkit-padding-start: 0px;
  padding-inline-start: 0px;
  z-index: 100;
}

.navigation-sub li {
  border-radius: 4px;
  border: 1px solid #ffffff;
  width: 200px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  margin-top: 2px;
  color: #ffffff;
  background-color: #72ab6f;
}

.navigation-sub li a {
  color: #ffffff;
  text-decoration: none;
  border-radius: 4px;
  display: block;
  width: 100%;
  height: 100%;
}

.navigation-sub li a:hover {
  color: #72ab6f;
  background-color: #ffffff;
  border: 1px solid #72ab6f;
}

.PageContentRight {
  position: absolute;
  top: 80px;
  left: 300px;
  width: calc(100% - 350px);
  height: 620px;
  border-bottom-right-radius: 4px;
  background-color: #f2f2f2;
  overflow: auto;
}

.PageContentRightTitle {
  margin-top: 5px;
  margin-left: 5px;
  width: calc(100% - 10px);
  height: 60px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 5px;
  background-color: #ffffff;
}

.IconTitle {
  width: 6px;
  height: 50px;
  background-color: #72ab6f;
}

.TitleText {
  margin-left: 20px;
  color: #72ab6f;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
}

.PageContent {
  margin-top: 5px;
  margin-left: 5px;
  width: calc(100% - 10px);
  height: 545px;
  overflow: hidden;
  background-color: #ffffff;
}
</style>