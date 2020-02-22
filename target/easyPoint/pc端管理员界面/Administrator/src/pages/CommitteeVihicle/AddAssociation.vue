<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">
      {{navName}}-{{navPlateName}}
      <span @click="showAddAssociation = true;">添加同乡会</span>
      <el-popover
        placement="top"
        title="添加同乡会"
        width="300"
        trigger="click"
        v-model="showAddAssociation"
      >
        <div class="spring-model-con">
          <li>
            <span>同乡会:</span>
            <el-input class="model-input" placeholder="请输入同乡会" v-model="addAssociation" clearable></el-input>
          </li>
        </div>
        <h1>已添加同乡会</h1>
        <div class="table-scroll">
          <div class="association associationTitle">
            <li class="associationName">同乡会名称</li>
            <li class="associationPlace">上下车地点</li>
            <li class="associationDelete">操作</li>
          </div>
          <div class="nav association" v-for="item in associationList" :key="item.id">
            <li class="associationName">{{item.associationName}}</li>
            <li class="associationPlace enter" @click="addPlace(item.associationId)">添加上下车地点</li>
            <li class="associationDelete enter" @click="handleDelete(item.associationId)">删除</li>
          </div>          
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
export default {
  data() {
    return {
      navName: "校友会包车",
      navPlateName: "添加同乡会",
      datas: [],
      addAssociation: "",
      associationList:[{
        associationName:"汕头同乡会",
        associationId:26
      }],
      pageSize: 10, //每页最大条数
      panelNumber: 5, //最多显示多少个分页按钮
      current: 1, //当前页码
      pageSize: 8, //每页最大条数
      totalNumber: 5 //总条目数
    };
  },
  computed: {
    //检查输入数据是否合法
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
    this.getAssociation()
  },
  methods: {
    async getAssociation() {
      var that = this;
      var url="https://easypoint.club/administrator/findAllAssociation"
      var postData={
        params: {
          startIndex:this.current,
          pageSize:this.pageSize
        }
      };
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .get(url,postData)
        .then((res) => {
          console.log(res.data);
          var data = res.data;
          switch(data.code){
            case 0:
              alert("没有数据")
              break;              
            case 1:
              console.log("查询成功")
              this.associationList=data.data.associationList
              this.pageNumber=data.data.totalNum%10==0?data.data.totalNum/10:parseInt(data.data.totalNum/10)+1
              break;
            case 2:
              alert("参数错误")
              break;    
            case 3:
              alert("页码超出最大范围");
              break;            
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    async setAssociation() {
      var that = this;
      var qs = require('qs');
      var url="https://easypoint.club/administrator/addAssociation"
      var postData=qs.stringify( {associationName:this.addAssociation});
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .post(url,postData)
        .then((res) => {
          console.log(res.data);
          var data = res.data;
          switch(data.code){
            case -1:
              alert("同乡会添加失败！请稍后再试");
              break;
            case 0:
              alert("同乡会名字为空！")
              break;              
            case 1:
              alert("添加成功")
              this.getAssociation()
              break;
            case 2:
              alert("同乡会名已添加过！")
              break;    
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    handlePageChange(pageNum) {
      var that = this;
      this.current=pageNum;
      this.getAssociation()
    },
    handleAdd() {
      var that = this;
      if (this.check == true) {
        if (confirm("请确认是否添加同乡会 : " + this.addAssociation)) {
          this.setAssociation();
        } else {
          console.log("你取消了添加");
        }
      }
    },
    handleDelete(id) {
      var that = this;
      if (confirm("确定删除该同乡会?")) {
        // this.deleteData(id)
      } else {
        console.log("您取消了删除！");
      }
    },
    //删除乡会
    handleDelete(id) {},
    //跳转上下车地点
    addPlace(id) {
      this.$router.push("/AddLocation/" + id);
    }
  },
  components: {}
};
</script>

<style>
  .table-scroll{
    height: 23rem;
    overflow: auto;
  }
  .table-scroll::-webkit-scrollbar {
    width: 6px;
    background-color: #e9e9e9;
  }

  .table-scroll::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #b9b9b9;
  }
</style>