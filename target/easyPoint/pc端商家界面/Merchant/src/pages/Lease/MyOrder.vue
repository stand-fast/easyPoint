<template>
  <div class="contentPosition">
    <div class="modelContentLeft">
      <a href="#/">
        <div class="contentLeftNav ReleaseNav">
          发布商品
          <i class="icon nav"></i>
        </div>
      </a>
      <div class="managerNav">
        <i class="icon managerIcon"></i>
        查看管理
      </div>
      <a href="#/MySave">
        <div class="contentLeftNav">
          我的保存
          <i class="icon nav"></i>
        </div>
      </a>
      <a href="#/MyUpload">
        <div class="contentLeftNav">
          我的上传
          <i class="icon nav"></i>
        </div>
      </a>
      <a href="#/MyOrder">
        <div class="contentLeftNav selectNav">
          用户订单
          <i class="icon nav"></i>
        </div>
      </a>
    </div>
    <div class="content">
      <div class="contentTitle">
        <div class="plateTitle">
          <span>查看管理 > 用户订单</span>
        </div>
      </div>
      <div class="contentBlock managering">
        <div class="contentBlockPart managering">
          <div class="dataContentNavs ContentTitle">
            <li class="biggerPart">商品名称</li>
            <li class="smallPart">数量</li>
            <li class="middlePart">租借价格</li>
            <li class="smallPart">押金</li>
            <li class="middlePart">取货时间</li>
            <li class="smallPart">租借天数</li>
            <li class="middlePart">联系人姓名</li>
            <li class="biggerPart">联系人电话</li>
            <li class="smallPart">状态</li>
            <li class="biggerPart">备注</li>
            <li class="middlePart">返回押金</li>
          </div>
          <div class="dataContentNavs dataContentItem">
            <li class="biggerPart">男性正装套装M码</li>
            <li class="smallPart">1</li>
            <li class="middlePart">￥50</li>
            <li class="smallPart">￥120</li>
            <li class="middlePart">7-12 13:00</li>
            <li class="smallPart">2天</li>
            <li class="middlePart">吴彦祖</li>
            <li class="biggerPart">13000000000</li>
            <li class="smallPart">未完成</li>
            <li class="biggerPart" title="我想要这样的这样的我想要这样的这样的">我想要这样的这样的我想要这样的这样的</li>
            <li class="middlePart">
              <span class="itemButton" @click="returnDeposit(123)">返回押金</span>
            </li>
          </div>
          <div class="dataContentNavs dataContentItem">
            <li class="biggerPart">男性正装套装M码</li>
            <li class="smallPart">1</li>
            <li class="middlePart">￥50</li>
            <li class="smallPart">￥120</li>
            <li class="middlePart">7-12 13:00</li>
            <li class="smallPart">2天</li>
            <li class="middlePart">吴彦祖</li>
            <li class="biggerPart">13000000000</li>
            <li class="smallPart">已完成</li>
            <li class="biggerPart" title="我想要这样的这样的我想要这样的这样的">我想要这样的这样的我想要这样的这样的</li>
            <li class="middlePart">
              <span class="itemDelete" @click="toDelate(1231)">删除</span>
            </li>
          </div>
          <paging
            :value="current"
            :pageSize="pageSize"
            :pageNumber="pageNumber"
            :panelNumber="panelNumber"
            @input="handlePageChange"
          ></paging>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import paging from "../../components/paging.vue";
export default {
  data() {
    return {
      datas: [],
      pageSize: 10, //每页最大条数
      panelNumber: 5, //最多显示多少个分页按钮
      current: 1, //当前页码
      pageNumber: 5 //页码总数
    };
  },
  methods: {
    returnDeposit(id) {
      console.log(id);
    },
    toDelate(id) {
      console.log(id);
    },
    handlePageChange(page) {
      console.log(page);
      this.current = page;
    }
  },
  components: {
    paging
  }
};
</script>
<style scoped>
.managering {
  margin: 0px;
  padding: 10px 0 0px 8px;
}
.dataContentNavs {
  width: calc(100% - 60px);
  margin: 0 auto;
  overflow: hidden;
}
.dataContentNavs li {
  float: left;
  text-align: center;
  color: #333333;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.biggerPart {
  width: 150px;
}
.middlePart {
  width: 90px;
}
.smallPart {
  width: 60px;
}
.ContentTitle {
  height: 60px;
  background-color: #f8f8f8;
  border-bottom: 2px solid #eeeeee;
}
.ContentTitle li {
  height: 60px;
  line-height: 60px;
}
.dataContentItem {
  height: 40px;
  background-color: #ffffff;
  border-bottom: 2px solid #eeeeee;
}
.dataContentItem li {
  height: 40px;
  line-height: 40px;
}
.dataContentItem li .itemButton {
  color: #5d759d;
  margin-right: 5px;
  cursor: pointer;
}
.dataContentItem li .itemDelete {
  cursor: pointer;
  color: #ef5657;
}
</style>