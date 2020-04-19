<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">{{navName}}-{{navPlateName}}</el-header>

    <!-- 内容 -->
    <el-main class="el-main-content">
      <!-- 商品描述部分 -->
      <div class="wrapper-publish">
        <div class="publish-title">
          <span>商品描述填写</span>
        </div>
        <div class="publish-content">
          <li class="content-item">
            <span class="item-title">选择主题：</span>
            <el-select v-model="datas.goodsTypeId" clearable placeholder="请选择商品主题">
              <el-option
                v-for="item in themeData"
                :key="item.value"
                :label="item.goodsTypeName"
                :value="item.goodsTypeId"
              ></el-option>
            </el-select>
            <span class="error" v-if="errors['datas.goodsTypeId']">{{errors['datas.goodsTypeId']}}</span>
          </li>
          <li class="content-item">
            <span class="item-title">商品名称：</span>
            <el-input
              placeholder="请输入商品名称"
              v-model="datas.goodName"
              maxlength="10"
              show-word-limit
              clearable
            ></el-input>
            <span class="error" v-if="errors['datas.goodName']">{{errors['datas.goodName']}}</span>
          </li>
          <li class="content-item">
            <span class="item-title">商家名称：</span>
            <el-input
              placeholder="请输入商家名称"
              v-model="datas.businessName"
              maxlength="10"
              show-word-limit
              clearable
            ></el-input>
            <span class="error" v-if="errors['datas.businessName']">{{errors['datas.businessName']}}</span>
          </li>
          <li class="content-item item-price">
            <span class="item-title">商家价格：</span>
            <el-input placeholder="最低价" type="number" v-model="datas.lowestPrice" clearable></el-input>
            <label>-</label>
            <el-input placeholder="最高价" type="number" v-model="datas.highestPrice" clearable></el-input>
            <span class="error" v-if="errors['datas.lowestPrice']">{{errors['datas.lowestPrice']}}</span>
            <span class="error" v-if="errors['datas.highestPrice']">{{errors['datas.highestPrice']}}</span>
          </li>
          <li class="content-item">
            <span class="item-title">商品照片：</span>
            <el-upload
              class="upload-demo modelPublish" 
              action="https://easypoint.club/administrator/imagesUpload"
              :on-success="uploadSuccess"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">第一张为页面图片，只能上传jpg/png文件，且不超过500kb</div>
              <span class="error" v-if="errors['datas.proImg']">{{errors['datas.proImg']}}</span>
            </el-upload>
          </li>
        </div>
      </div>
      <!-- 内容说明部分 -->
      <div class="wrapper-publish">
        <div class="publish-title">
          <span>内容说明填写</span>
        </div>
        <div class="publish-content textarea">
          <li class="content-item textarea">
            <span class="item-title">押金说明：</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入押金说明"
              v-model="datas.depositInstruction"
              maxlength="100"
              show-word-limit
              clearable
            ></el-input>
            <span class="error" v-if="errors['datas.depositInstruction']">{{errors['datas.depositInstruction']}}</span>
          </li>
          <li class="content-item textarea">
            <span class="item-title">取货说明：</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入取货说明"
              v-model="datas.takeGoodInstruction"
              maxlength="100"
              show-word-limit
              clearable
            ></el-input>
            <span class="error" v-if="errors['datas.takeGoodInstruction']">{{errors['datas.takeGoodInstruction']}}</span>
          </li>
          <li class="content-item textarea">
            <span class="item-title">还货说明：</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入还货说明"
              v-model="datas.returnGoodInstruction"
              maxlength="100"
              show-word-limit
              clearable
            ></el-input>
            <span class="error" v-if="errors['datas.returnGoodInstruction']">{{errors['datas.returnGoodInstruction']}}</span>
          </li>
          <li class="content-item textarea">
            <span class="item-title">营业时间：</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入营业时间"
              v-model="datas.businessHours"
              maxlength="100"
              show-word-limit
              clearable
            ></el-input>
            <span class="error" v-if="errors['datas.businessHours']">{{errors['datas.businessHours']}}</span>
          </li>
          <li class="content-item textarea">
            <span class="item-title">商品描述：</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入商品描述"
              v-model="datas.goodDescription"
              maxlength="100"
              show-word-limit
              clearable
            ></el-input>
            <span
              class="error"
              v-if="errors['datas.goodDescription']"
            >{{errors['datas.goodDescription']}}</span>
          </li>
        </div>
      </div>
      <!-- 商品类别部分 -->
      <div class="wrapper-publish">
        <div class="publish-title">
          <span>商品类别填写</span>
        </div>
        <div class="publish-content textarea">
          <li class="content-item" v-for="(item,index) in datas.goodVarietyList" :key="index">
            <specifications :index="index" @items="handleItemsChange" @errorSpecifications="errorSpecifications" />
            <el-button @click="del(index)" class="delButton" type="primary">删除商品</el-button>
          </li>
          <div class="elButton">
            <el-button @click="add" type="primary" icon="el-icon-edit">添加商品</el-button>
          </div>
        </div>
      </div>
      <div class="el-submit-button">
        <el-button @click="onSubmit(1)">上传</el-button>
        <el-button @click="onSubmit(2)">保存</el-button>
      </div>
    </el-main>
  </div>
</template>
<script>
import Vue from "vue";
import Vuerify from "vuerify";
Vue.use(Vuerify);

import specifications from "../../components/specifications.vue";
export default {
  data() {
    return {
      navName: "租赁闲置",
      navPlateName: "发布商品",
      fileList: [], //商品图片
      upload_success_list:[],
      status: false, //判断商品类别是否校验通过
      themeData: [],//商品类别数据
      verifyList:[
        "datas.goodsTypeId",
        "datas.goodName",
        "datas.businessName",
        "datas.lowestPrice",
        "datas.highestPrice",
        "datas.depositInstruction",
        "datas.proImg",
        "datas.takeGoodInstruction",
        "datas.returnGoodInstruction",
        "datas.businessHours",
        "datas.goodDescription"
      ],//验证部分
      datas: {
        goodsTypeId: null, //主题
        goodName: "", //商品名称
        businessName: "", //商家名称
        lowestPrice: null, //最低价格
        highestPrice: null, //最高价格
        goodImages:"1",//轮播图图片路径
        deposit:0,//押金
        depositInstruction: "", //押金说明
        takeGoodInstruction: "", //取货说明
        returnGoodInstruction: "", //还货说明
        businessHours: "", //营业时间
        goodDescription: "", //商品描述
        proImg:"1",//页面图片
        state:1,//1：正在售卖；2：未发布；3：已下架
        goodVarietyList: [  
          //商品分类数据
          {
            variety: "",
            price: "",
            img: "",
            size: "",
          }
        ]
      }, //发布商品数据
      
    };
  },
  //vuerify表单验证
  vuerify: {
    "datas.goodsTypeId": {
      test: /\S/,
      message: "请选择商品主题"
    },
    "datas.goodName": {
      test: /\S/,
      message: "商品名称不能为空"
    },
    "datas.proImg":{
      test: /\S/,
      message: "请添加商品照片"
    },
    "datas.businessName": {
      test: /\S/,
      message: "商家名称不能为空"
    },
    "datas.lowestPrice": {
      test: /\S/,
      message: "商品最低价不能为空"
    },
    "datas.highestPrice": {
      test: /\S/,
      message: "商品最高价不能为空"
    },
    "datas.depositInstruction": {
      test: /\S/,
      message: "押金说明不能为空"
    },
    "datas.takeGoodInstruction": {
      test: /\S/,
      message: "取货说明不能为空"
    },
    "datas.returnGoodInstruction": {
      test: /\S/,
      message: "还货说明不能为空"
    },
    "datas.businessHours": {
      test: /\S/,
      message: "营业时间不能为空"
    },
    "datas.goodDescription": {
      test: /\S/,
      message: "商品描述不能为空"
    }
  },
  computed: {
    // 表单验证计算错误属性
    errors() {
      return this.$vuerify.$errors;
    }
  },
  mounted() {
    const goodId = this.$route.params.goodId; //通过路由器获取id
    this.findAllGoodType();//获取商品种类
    if(goodId !== 'null'){
      this.getGoodDetails(goodId);//获取详情数据
    }
  },
  methods: {
    //根据goodID获取详情数据
    getGoodDetails(goodId){
      let that = this;
      let params = { goodsId:goodId };
      this.$http
        .get("findGoodsDetailsById", { params })
        .then(function(res) {
          let data = res.data;
          let code = data.code;
          console.log(data);
          // switch (code) {
          //   case 200:
          //     that.datas = data.data;
          //     console.log(data.message);
          //     break;
          //   case 1:
          //     break;
          //   case 401:
          //     alert(data.message);
          //     break;
          //   default:
          //     that.$judgeToken(code);
          //     break;
          // }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    //获取商品种类
    findAllGoodType(){
      let that = this;
      let params = {};
      this.$http
        .get("findAllGoodType", { params })
        .then(res => {
          let data = res.data;
          let code = data.code;
          switch (code) {
            case 0:
              this.$message({
                message: '商品类目为空，请添加商品类目',
                type: 'warning'
              });
              break;
            case 1:
              that.themeData = data.data;
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
    // 提交表单数据
    onSubmit(state) {
      console.log(this.datas);
      if (this.$vuerify.check(this.verifyList) && this.status == true) { //校验
        this.datas.state = state;
        let that = this;
        let params = new URLSearchParams();
        for(let key in this.datas){
          // if(key== 'goodVarietyList'){
          //   let goodVarietyList = this.datas[key];
          //   let variety = "",size="",price="",img="";
          //   // for(let i=0;i<goodVarietyList.length;i++){
          //   //   if(i==0){
          //   //     variety = goodVarietyList[i].variety;
          //   //     price = goodVarietyList[i].price;
          //   //     img = goodVarietyList[i].img;
          //   //     size = goodVarietyList[i].size;
          //   //   }else{
          //   //     variety = '&' + variety + goodVarietyList[i].variety;
          //   //     price = '&' + price + goodVarietyList[i].price;
          //   //     img = '&' + img + goodVarietyList[i].img;
          //   //     size = '|' + size + goodVarietyList[i].size;
          //   //   }
          //   // }
          //   params.append('variety', variety);
          //   params.append('price', price);
          //   params.append('img', img);
          //   params.append('size', size);
          // }else{
            params.append(key, this.datas[key]);
          // }
        }
        this.$http
          .post("addGoods", params)
          .then(res => {
            console.log(res.data);
            let data = res.data;
            let code = data.code;
            switch (code) {
              case -1:
                this.$message({
                  message: '添加失败！请稍后再试',
                  type: 'warning'
                });
                break;
              case 1:
                that.$message({
                  message: '添加成功',
                  type: 'success'
                });
                // setTimeout(() => {
                //  that.$router.go(0)
                // }, 1500);
                break;
              case 2:
                that.$message.error('参数有误');
                break;
              default:
                that.$judgeToken(code);
                break;
            }
          })
          .catch(function(e) {
            console.log(e);
          });
        return;
      }
    },
    //商品图片上传
    uploadSuccess(response){
      console.log(response);
      let code = response.code;
      switch(code){
        case -1:
          this.$message.error('上传失败,请稍后重试');
          break;
        case 1:
          console.log('上传成功');
          this.upload_success_list.push(response.data.imgUrl);
          console.log(this.upload_success_list);
          this.setUploadImg(this.upload_success_list);
          break;
      }
    },
    //商品照片移除
    handleRemove(file) {
      console.log(file);
      let deleteIndex;
      let fileurl = file.response.data.imgUrl;
      this.upload_success_list.findIndex((url,index)=>{
        if(url ==fileurl) deleteIndex = index;
      })
      // console.log(deleteIndex);
      this.upload_success_list.splice(deleteIndex,1);
      // console.log(this.upload_success_list);
      this.setUploadImg(this.upload_success_list)
    },
    //上传成功或者删除图片更新data.proImg、datas.goodImages
    setUploadImg(list){
      if(list[0]){
        for(let i=0;i<list.length;i++){
          if(i==0){
            this.datas.proImg = list[0];
            this.datas.goodImages = list[0];
          }else{
            this.datas.goodImages += '&' +list[i];
          }
        }
      }else{
        this.datas.proImg = "";
        this.datas.goodImages = "";
      }
    },
    //接受specifications组件数据
    handleItemsChange(index, data) {
      this.datas.goodVarietyList[index].variety = data.variety;
      this.datas.goodVarietyList[index].price = data.price;
      this.datas.goodVarietyList[index].img = data.img;
      this.datas.goodVarietyList[index].size = data.size;
    },
    //Specifications是否校验完成
    errorSpecifications(status){
      this.status = status;
    },
    //商品分类添加商品分类
    add() {
      this.datas.goodVarietyList.push({
        variety: "",
        price: "",
        img: "",
        size: "",
      });
    },
    //商品分类删除商品分类
    del(index) {
      if (confirm("确定要删除该商品数据吗?")) {
        if (this.datas.goodVarietyList.length == 1) {
          this.$message({
            message: '至少含有一个商品数据',
            type: 'warning'
          });
        } else {
          this.datas.goodVarietyList.splice(index, 1);
        }
      } else {
        console.log("你取消了删除");
      }
    },
  },
  //组件
  components: { specifications }
};
</script>
<style>
/* 板块容器 */
.wrapper-publish {
  color: #333;
  font-size: 16px;
}
/* 容器标题 */
.publish-title {
  line-height: 30px;
  border-bottom: 1px solid rgb(182, 179, 179);
}
.publish-title > span {
  width: 300px;
  display: inline-block;
  padding-left: 20px;
  border-bottom: 1px solid #9c9ea1;
}
.publish-content {
  padding: 30px 0;
}
.publish-content span.item-title {
  padding: 5px 20px;
  margin-left: 200px;
}
/* li的每一项，其中里面的input的type为textarea,就在content-item后面加textarea */
.content-item {
  display: flex;
  padding: 10px 0;
  list-style: none;
}
.content-item > span {
  min-width: 150px;
  height: 40px;
  line-height: 24px;
  box-sizing: border-box;
}
.content-item .el-input--suffix {
  width: 290px !important;
  min-width: 290px !important;
}
/* 删除商品 */
.delButton {
  margin-left: -50px;
  margin-top: 50px;
  width: 100px;
  height: 40px;
}
/* 添加商品按钮 */
.elButton {
  margin-left: 350px;
  margin-top: 20px;
}
/* 价格部分 */
.item-price input {
  width: 120px !important;
  min-width: 120px !important;
}
.item-price .el-input--suffix {
  width: 120px !important;
  min-width: 120px !important;
}
.item-price > label {
  padding: 0 21px;
  line-height: 40px;
}
/* textarea部分 */
.textarea .el-input--suffix {
  width: 400px !important;
  min-width: 400px !important;
}
/* 表单验证error */
.content-item span.error {
  min-width: 180px;
  color: rgb(182, 55, 55);
  line-height: 40px;
  padding-left: 20px;
}
/* 商品类别input输入框 */
.item-spec .el-input--suffix {
  width: 120px !important;
  min-width: 120px !important;
}
/* 上传保存按钮 */
.el-submit-button {
  width: 300px;
  margin-top: 20px;
  margin-left: 280px;
  text-align: center;
}
.el-submit-button button {
  width: 100px;
}
</style>