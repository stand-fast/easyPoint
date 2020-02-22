<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">
      {{navName}}-{{navPlateName}}
      <span @click="showAddPlace = true;">添加上下车地点</span>
      <el-popover
        placement="top"
        title="添加上下车地点"
        width="300"
        trigger="click"
        v-model="showAddPlace"
      >
        <div class="spring-model-con">
          <li>
            <span>同乡会:</span>
            <el-input class="model-input" placeholder="请输入上下车地点" v-model="inputPlace" clearable></el-input>
          </li>
        </div>
        <h1>已添加上下车地点</h1>
        <div class="table-scroll">
          <div class="association associationTitle">
            <li class="committeePlace">上下车地点</li>
            <li class="deleteCommitteePlace">操作</li>
          </div>
          <div class="nav association" v-for="(item,index) in placeList" :key="index">
            <li class="committeePlace">{{item}}</li>
            <li class="deleteCommitteePlace enter" @click="handleDelete(item,index)">删除</li>
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
      navPlateName: "添加上下车地点(汕头同乡会)",
      placeList:[],
      datas: [],
      inputPlace: "",
      pageSize: 10, //每页最大条数
      panelNumber: 5, //最多显示多少个分页按钮
      current: 1, //当前页码
      pageNumber: 5, //页码总数
      associationId:-1//当前同乡会ID
    };
  },
  computed: {
    //检查输入数据是否合法
    check() {
      if (this.inputPlace == "") {
        alert("上下车地点不能为空");
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.associationId = this.$route.params.id;
    console.log("根据" + this.associationId + "请求数据");
    this.getLocation();
  },
  methods: {
    async getLocation() {
      var postData= {params:{
          associationId:this.associationId,
          startIndex:this.current,
          pageSize:this.pageSize        
        }
      };
      var url="https://easypoint.club/administrator/findAllPlaces"
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .get(url,postData)
        .then((res) => {
          console.log(res.data);
          var data = res.data;
          switch(data.code){
            case 0:
              alert("没有查询到数据")
              break;
            case 1:
              console.log("查询成功")
              this.placeList=data.data.placeList
              this.pageNumber=data.data.totalNum%10==0?data.data.totalNum/10:parseInt(data.data.totalNum/10)+1
              break;
            case 2:
              alert("参数为空")
            break;    
            case 3:
              alert("页码超出最大范围")
              break;                
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },    
    async setLocation(id) {
      var url="https://easypoint.club/administrator/addAssociationPlace"
      var qs = require('qs')
      var postData= qs.stringify({
        associationId:this.associationId,
        place:this.inputPlace
      });
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .post(url,postData)
        .then((res) => {
          console.log(res.data);
          var data = res.data;
          switch(data.code){
            case -3:
              alert("此同乡会已经添加过该地址")
              break;
            case -2:
              alert("该同乡会不存在")
            break;
            case -1:
              alert("添加失败,请稍后再试")
            break;
            case 0:
              alert("参数错误!")
              break;
            case 1:
              alert("添加成功")
              this.getLocation()
              break;
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    async deleteLocation(item,id) {
      var qs = require('qs')
      var postData= qs.stringify({
        associationId:this.associationId,
        place:item
      });
      var url="https://easypoint.club/administrator/deleteAssociationPlace"
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .post(url,postData)
        .then((res) => {
          console.log(res.data);
          var data = res.data;
          switch(data.code){
            case -1:
              alert("删除失败");
              break;
            case 0:
              alert("参数为空")
              break;
            case 1:
              console.log("删除成功")
              this.placeList.splice(id,1)
              this.getLocation();
              break;
            case 2:
              alert("没添加过该地址或没有此同乡会")
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
      this.getLocation()
    },
    handleAdd() {
      var that = this;
      if (this.check == true) {
        if (confirm("上下车地点 : " + this.inputPlace)) {
          this.setLocation()
        } else {
          console.log("你取消了添加");
        }
      }
    },
    handleDelete(item,id) {
      var that = this;
      if (confirm("确定删除该上下车地点?")) {
        this.deleteLocation(item,id) 
      } else {
        console.log("您取消了删除！");
      }
    },
    //删除上下车地点
    deleteLocation(item) {
      let that = this;
      let params = new URLSearchParams();
      params.append("associationId", this.associationId);
      params.append("place", item);
      this.$http
        .post("deleteAssociationPlace", params)
        .then(res => {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case -1:
              alert("删除失败");
              break;
            case 0:
              alert("参数为空");
              break;
            case 1:
              console.log("删除成功");
              this.handlePageChange(this.current);
              break;
            case 2:
              alert("没添加过该地址或没有此同乡会");
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
  },
  components: {}
};
</script>