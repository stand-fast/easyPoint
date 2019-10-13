<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>添加同乡会</h1>
        <div class="addCommittee">
          <ul>
            <label>同乡会:</label>
            <input type="text" v-model="addAssociation" />
            <button class="modelButton submitVehicleType" @click="handleAdd">添加</button>
          </ul>
        </div>
        <h1>已添加同乡会</h1>
        <div class="association associationTitle">
          <li class="associationName">同乡会名称</li>
          <li class="associationPlace">上下车地点</li>
          <li class="associationDelete">操作</li>
        </div>
        <div class="nav association">
          <li class="associationName">汕头同乡会</li>
          <li class="associationPlace enter" @click="addPlace(1123)">添加上下车地点</li>
          <li class="associationDelete enter" @click="handleDelete(1123)">删除</li>
        </div>
        <div class="nav association">
          <li class="associationName">汕头同乡会</li>
          <li class="associationPlace enter" @click="addPlace(1121213)">添加上下车地点</li>
          <li class="associationDelete enter" @click="handleDelete(112131223)">删除</li>
        </div>
        <paging
          :value="current"
          :pageSize="pageSize"
          :pageNumber="pageNumber"
          :panelNumber="panelNumber"
          @input="handlePageChange"
        ></paging>
      </div>
    </ul>
  </div>
</template>
<script>
import paging from "../../components/paging.vue";
export default {
  data() {
    return {
      navName: "校友会包车",
      navPlateName: "添加同乡会",
      datas: [],
      addAssociation: "",
      pageSize: 10, //每页最大条数
      panelNumber: 5, //最多显示多少个分页按钮
      current: 1, //当前页码
      pageNumber: 5 //页码总数
    };
  },
  computed: {
    check() {
      if (this.addAssociation == "") {
        alert("同乡会名称不能为空");
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    //this.setData();
  },
  methods: {
    async setData() {
      window.onscroll = e => e.preventDefault(); //兼容浏览器
    },
    handlePageChange(pageNum) {
      var that = this;
    },
    handleAdd() {
      var that = this;
      if (this.check == true) {
        if (confirm("同乡会名称 : " + this.addAssociation)) {
        } else {
          console.log("你取消了添加");
        }
      }
    },
    handleDelete(id) {
      var that = this;
      if (confirm("确定删除该同乡会?")) {
      } else {
        console.log("您取消了删除！");
      }
    },
    addPlace(id) {
      this.$router.push("/AddLocation/" + id);
    }
  },
  components: {
    paging
  }
};
</script>
<style scoped>
.addCommittee {
  height: 50px;
  line-height: 50px;
  color: #8fd68b;
  text-align: center;
  overflow: hidden;
}

.addCommittee input {
  margin-left: 20px;
  margin-right: 10px;
  border-radius: 2px;
  border: 1px solid #8fd68b;
  width: 200px;
  height: 20px;
  outline: none;
  padding: 5px;
}

.addCommittee button {
  background-color: #8fd68b;
  border: none;
  border-radius: 4px;
  color: #f3f2f2;
  width: 80px;
  height: 30px;
}

.association {
  display: flex;
}

.associationTitle {
  background-color: #8fd68b;
  color: #ffffff;
}

.association li {
  height: 40px;
  line-height: 30px;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  padding: 5px;
  text-align: center;
  overflow: hidden;
}

.nav:nth-child(2n + 1) {
  background-color: #e9f7e8;
  color: #96d892;
}

.nav:nth-child(2n) {
  background-color: #ddf3dc;
  color: #acb2ab;
}

.associationName {
  width: 680px;
}

.associationPlace {
  width: 300px;
}

.associationDelete {
  width: 200px;
}

.enter {
  cursor: pointer;
}
</style>