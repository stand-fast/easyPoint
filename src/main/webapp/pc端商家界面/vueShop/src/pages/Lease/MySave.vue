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
        <div class="contentLeftNav selectNav">
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
        <div class="contentLeftNav">
          用户订单
          <i class="icon nav"></i>
        </div>
      </a>
    </div>
    <div class="content">
      <div class="contentTitle">
        <div class="plateTitle">
          <span>查看管理 > 我的保存</span>
        </div>
      </div>
      <div class="contentBlock managering">
        <div class="contentBlockPart managering">
          <div class="dataContentNavs ContentTitle">
            <li>商品名称</li>
            <li>租借价格</li>
            <li>押金</li>
            <li>主题</li>
            <li>状态</li>
            <li>操作</li>
          </div>
          <div class="dataContentNavs dataContentItem">
            <li>可移动蓝牙音响</li>
            <li>￥40</li>
            <li>￥120</li>
            <li>音响设备</li>
            <li>未发布</li>
            <li>
              <span class="itemButton" @click="toDetails(123)">查看详情</span>
              <span class="itemButton" @click="toUpload(1231)">上传审核</span>
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
    toDetails(id) {
      console.log(id);
    },
    toUpload(id) {
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
  width: 170px;
  float: left;
  text-align: center;
  color: #333333;
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