<template>
  <div class="specificationContent">
    <div class="specifcationImg">
      <el-upload
        action="https://easypoint.club/administrator/imagesUpload"
        list-type="picture-card"
        :on-success="uploadSuccess"
        :file-list="fileList"
        :before-upload = 'beforeUpload'
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
    <div class="specifcIng">
      <li class="specifc-item">
        <span>类别:</span>
        <el-input
          placeholder="请输入商品类别名称"
          type="text"
          :blur="sumbitData()"
          v-model="datas.variety"
          maxlength="8"
          show-word-limit
          clearable
        ></el-input>
        <span class="error" v-if="errors['datas.img']">{{errors['datas.img']}}</span>
        <span class="error" v-if="errors['datas.variety']">{{errors['datas.variety']}}</span>
      </li>
      <li class="specifc-item">
        <span>价格:</span>
        <el-input
          placeholder="请输入商品类别价格"
          type="Number"
          :blur="sumbitData()"
          v-model="datas.price"
          clearable
        ></el-input>
        <span class="error" v-if="errors['datas.price']">{{errors['datas.price']}}</span>
      </li>
      <li class="specifc-item specifc-container">
        <span>尺寸:</span>
        <div v-for="(item,index) in items" :key="index" class="specifcText">
          <el-input
            :blur="sumbitData()"
            type="text"
            maxlength="8"
            show-word-limit
            v-model="item.specifc"
          ></el-input>
          <i class="el-icon-close specifcIcon" @click="deleteSpecifc(index)"></i>
        </div>
        <el-button @click="add" class="addButton" type="primary" icon="el-icon-edit"></el-button>
        <span class="error" v-if="specifcErrors">请检查商品类别是否填写完整</span>
      </li>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Vuerify from "vuerify";
Vue.use(Vuerify);

export default {
  name: "imgUpload",
  data() {
    return {
      datas:{
        variety:"",
        price:"",
        img:"",
        size:"",
      },
      fileList:[],
      items: [{ specifc: "" }],//尺寸list
      dialogImageUrl: '',
      dialogVisible: false,
    };
  },
  // vuerify表单验证
  vuerify: {
    "datas.img": {
      test: /\S/,
      message: "请添加商品规格图片"
    },
    "datas.variety": {
      test: /\S/,
      message: "请输入商品类别名称"
    },
    "datas.price": {
      test: /\S/,
      message: "请输入商品类别价格"
    }
  },
  props:['index','variety','price','img','size']
  ,
  computed: {
    //错误信息
    errors() {
      return this.$vuerify.$errors;
    },
    //遍历所有规格参数
    specifcErrors() {
      let data = this.items;
      let boo = false;
      for (let i = 0; i < data.length; i++) {
        if (data[i].specifc == "") {
          boo = true;
        }
      }
      return boo;
    },
    imgs(){
      return this.variety
    }
  },
  mounted(){
    this.datas.variety = this.variety;
    this.datas.price = this.price;
    this.datas.img = this.img;
    this.items = JSON.parse(this.size);
    if(this.img){
      this.fileList.push({url: 'https://easypoint.club/images/'+ this.img});
      document.getElementsByClassName('el-upload--picture-card')[this.index].style.display = 'none';
    }
  },
  methods: {
    //想父组件提交并整理数据
    sumbitData() {
      let boo = this.specifcErrors;
      let verifyList = ["datas.img","datas.variety", "datas.price"];
      // check() 校验所有规则，参数可以设置需要校验的数组
      if (this.$vuerify.check(verifyList) && !boo) {
        this.$emit("items", this.index, {variety:this.datas.variety,size:JSON.stringify(this.items),price:this.datas.price,img:this.datas.img});
        this.$emit("errorSpecifications", true);
      }else{
        this.$emit("errorSpecifications", false);
      }
    },
    uploadSuccess(response){
      console.log(response);
      let code = response.code;
      switch(code){
        case -1:
          this.dialogImageUrl='';
          this.dialogVisible=false;
          document.getElementsByClassName('el-upload--picture-card')[this.index].style.display = 'block';
          this.$message.error('上传失败,请稍后重试');
          break;
        case 1:
          console.log('上传成功');
          this.datas.img = response.data.imgUrl;
          break;
      }
    },
    beforeUpload(){
      document.getElementsByClassName('el-upload--picture-card')[this.index].style.display = 'none';
    },
    handleRemove(e){
      document.getElementsByClassName('el-upload--picture-card')[this.index].style.display = 'block';
      this.datas.img = "";
    },
    //添加尺寸
    add() {
      this.items.push({ specifc: "" });
      this.sumbitData();
    },
    //删除尺寸
    deleteSpecifc(index) {
      if (confirm("确定要删除该尺寸吗?")) {
        if (this.items.length == 1) {
            this.$message({
              message: '至少含有一个尺寸数据',
              type: 'warning'
            });
        } else {
          this.items.splice(index, 1);
          this.sumbitData();
        }
      }
    },
  }
};
</script>
<style>
li {
  list-style: none;
}
/* 上传图片修改element内置 */
.el-upload-list--picture-card .el-upload-list__item{
  margin-top: 6px;
  width: 60px !important;
  height: 60px !important;
}
.specifcationImg .el-upload--picture-card{
  margin-top: 6px;
  width: 60px !important;
  height: 60px !important;
  line-height: 70px;
}
/* 组件容器 */
.specificationContent {
  margin-right: 100px;
  margin-left: 230px;
  display: flex;
}
/* 添加或者更换商品分类规格照片 */
.specifcationImg {
  display: flex;
  flex-direction: column;
}

/* 商品分类容器 */
.specifcIng {
  display: flex;
  flex-direction: column;
}
.specifcIng li {
  margin: 5px 0 5px 5px;
  font-size: 15px;
}
.specifcIng li input {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 0 10px;
  height: 30px;
  outline: none;
}
/* 容器图标公共css */
.specifcIng i {
  font-size: 18px;
  cursor: pointer;
  padding: 7px 7px;
  color: #ef5657;
}
.specifc-item {
  margin-top: 15px;
  min-height: 40px;
  min-width: 300px;
  display: flex;
}
.specifc-item>span {
  min-width: 70px;
  box-sizing: border-box;
  padding-left: 10px;
  height: 40px;
  line-height: 40px;
}
.specifc-item input {
  width: 230px !important;
  min-width: 230px !important;
  min-height: 40px;
}
.specifcIng .specifc-item .el-input--suffix {
  width: 230px !important;
  min-width: 230px !important;
  min-height: 40px;
}
/* 尺寸容器 */
.specifc-container {
  display: flex;
  flex-flow: wrap;
  width: 550px;
}
.specifcText {
  position: relative;
}
/* 尺寸input框 */
.specifc-item .specifcText input {
  width: 100px !important;
  min-height: 40px;
  min-width: 100px !important;
}
.specifc-item .specifcText .el-input {
  margin-right: 8px;
  min-height: 50px;
  width: 100px !important;
  min-width: 100px !important;
}
/* 删除尺寸图标 */
.specifcIcon {
  z-index: 200;
  position: absolute;
  right: 0px;
  top: -7px;
  color:#ef5657 !important;
}
.addButton {
  height: 40px;
}

/* 修改element内置css */
.specifcIng i{
  padding: 0;
  color: #fff;
}
</style>