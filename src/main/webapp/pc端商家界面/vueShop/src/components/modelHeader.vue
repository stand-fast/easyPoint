<template>
  <div class="modelTop">
    <div class="modelTopTitle">易点校园</div>
    <div class="modelTopPlatform">租赁商家端</div>
    <div class="modelTopLogin">
      <div class="loginOut">
        退出
        <i class="icon loginOutIcon"></i>
      </div>
      <div class="userName">用户名称</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
* {
  padding: 0px;
  margin: 0px;
}
li {
  list-style: none;
}
@font-face {
  font-family: "iconfont"; /* project id 1288209 */
  src: url("//at.alicdn.com/t/font_1288209_oat1z6hwe39.eot");
  src: url("//at.alicdn.com/t/font_1288209_oat1z6hwe39.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1288209_oat1z6hwe39.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1288209_oat1z6hwe39.woff") format("woff"),
    url("//at.alicdn.com/t/font_1288209_oat1z6hwe39.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1288209_oat1z6hwe39.svg#iconfont") format("svg");
}
.icon {
  font-family: "iconfont" !important;
  width: 16px;
  height: 16px;
  font-style: normal;
}
.loginOutIcon::before {
  content: "\e622";
  color: #b0b0b0;
}
.contentPosition {
  position: relative;
  margin: 0 auto;
  width: calc(100% - 200px);
  background-color: #ffffff;
}
.modelTop {
  margin: 0 auto;
  width: calc(100% - 200px);
  height: 50px;
  line-height: 50px;
  display: flex;
  overflow: hidden;
  background-color: #f8f8f8;
}
.modelTopTitle {
  width: 80px;
  margin-left: 20px;
  color: #ef5657;
  font-size: 18px;
}
.modelTopPlatform {
  width: 80px;
  margin-left: 20px;
  font-size: 14px;
  color: #b0b0b0;
}
.modelTopLogin {
  width: calc(100% - 220px);
  font-size: 14px;
  overflow: hidden;
}
.userName {
  float: right;
}
.loginOut {
  float: right;
  cursor: pointer;
  width: 50px;
  overflow: hidden;
  margin-top: 15px;
  height: 20px;
  line-height: 20px;
  padding-left: 20px;
  border-left: 1px solid #b0b0b0;
  margin-left: 20px;
}
.modelContentLeft a .contentLeftNav {
  width: 180px;
  height: 40px;
  line-height: 40px;
  padding-left: 50px;
  box-sizing: border-box;
  font-size: 15px;
  position: relative;
  cursor: pointer;
}
.managerNav {
  margin: 5px 0 15px 0;
}
.modelContentLeft a {
  text-decoration: none;
  color: #333333;
}
.managerNav .managerIcon::before {
  content: " \e693";
  color: #ef5657;
  margin-left: 8px;
}
.modelContentLeft a .ReleaseNav {
  font-size: 16px;
  padding-left: 30px;
}
.selectNav {
  box-sizing: border-box;
  width: 180px;
  margin-left: -8px;
  background-color: #fff0f0;
  color: #ef5657;
  border-left: 8px solid #ef5657;
}
.contentLeftNav .nav {
  display: none;
}
/* .selectNav {
  display: inline-block;
  position: absolute;
  top: 2px;
  left: 60px;
  color: #ef5657;
  font-size: 10px;
  margin-left: 80px;
} */
.contentLeftNav .nav::before {
  content: "\e60c";
}
.content {
  position: absolute;
  top: 0px;
  left: 170px;
  padding-bottom: 8px;
  width: calc(100% - 170px);
  background-color: #f2f2f2;
  overflow: hidden;
  margin-bottom: 40px;
}
.contentTitle {
  width: calc(100% - 16px);
  background-color: #ffffff;
  height: 40px;
  margin: 8px 0 0 8px;
}
.plateTitle {
  display: inline-block;
  margin: 8px 0 0 8px;
  height: 24px;
  border-left: 6px solid #ef5657;
  overflow: hidden;
}
.plateTitle span {
  margin-left: 30px;
  color: #ef5657;
}
.contentBlock {
  width: calc(100% - 16px);
  margin: 8px 0 0 8px;
}
.contentBlockTitle {
  height: 40px;
  line-height: 40px;
  color: #333333;
  background-color: #ffffff;
  overflow: hidden;
}
.contentBlockTitle span {
  display: inline-block;
  width: 200px;
  height: 38px;
  text-align: right;
  border-bottom: 1.5px solid #ef5657;
}
.contentBlockPart {
  margin-top: 1px;
  padding: 50px 0 50px 0px;
  background-color: #ffffff;
}
.contentBlockPart .publishPart {
  height: 40px;
  margin-top: 5px;
  overflow: hidden;
  box-sizing: border-box;
  padding-left: 200px;
  display: flex;
}
.contentBlockPart .partTitle {
  margin-right: 20px;
  width: 100px;
  height: 40px;
  line-height: 40px;
}
.modelInputSelect {
  width: 250px !important;
}
</style>