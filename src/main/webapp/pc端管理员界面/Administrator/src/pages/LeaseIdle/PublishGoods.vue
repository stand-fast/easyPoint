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
            <el-select v-model="goodsTypeName" clearable placeholder="请选择商品主题">
              <el-option
                v-for="item in themeData"
                :key="item.goodsTypeId"
                :label="item.goodsTypeName"
                :value="item.goodsTypeName"
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
              <div slot="tip" class="el-upload__tip">第一张为封面图，只能上传jpg/png文件，且不超过500kb</div>
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
        <div class="publish-content textarea" v-if="isRequestFinish">
          <li class="content-item" v-for="(item,index) in datas.goodVarietyList" :key="index">
            <specifications :index="index" :img="item.img" :size="item.size" :variety="item.variety" :price="item.price"  @items="handleItemsChange" @errorSpecifications="errorSpecifications" />
            <el-button @click="del(index)" class="delButton" type="primary">删除商品</el-button>
          </li>
          <div class="elButton">
            <el-button @click="add" type="primary" icon="el-icon-edit">添加商品</el-button>
          </div>
        </div>
      </div>
      <div class="el-submit-button">
        <div v-if="!modifyData">
          <el-button  @click="onSubmit(1)">上传</el-button>
          <el-button @click="onSubmit(2)">保存</el-button>
        </div>
        <div v-else>
          <el-button  @click="onSubmitModify(goodId)">修改</el-button>
        </div>
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
      rootUrl:'https://easypoint.club/images/',
      navName: "租赁闲置",
      navPlateName: "发布商品",
      modifyData:false,//是否是修改数据状态
      isRequestFinish:false,//请求详情数据是否成功，延缓商品类别加载
      fileList: [], //商品图片
      upload_success_list:[],//上传成功照片list
      goodsTypeName:"",//商品类别名
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
        goodsTypeId: "", //主题
        goodName: "", //商品名称
        businessName: "", //商家名称
        lowestPrice: "", //最低价格
        highestPrice: "", //最高价格
        goodImages:"",//轮播图图片路径
        deposit:0,//押金
        depositInstruction: "", //押金说明
        takeGoodInstruction: "", //取货说明
        returnGoodInstruction: "", //还货说明
        businessHours: "", //营业时间
        goodDescription: "", //商品描述
        proImg:"",//页面图片
        state:1,//1：正在售卖；2：未发布；3：已下架
        goodVarietyList: [  
          //商品分类数据
          {
            variety: "",
            price: "",
            img: "",
            size: JSON.stringify([{ specifc: "" }]),
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
      this.goodId = goodId; 
      this.modifyData = true;
      this.getGoodDetails(goodId);//获取详情数据
    }else{
      this.isRequestFinish = true
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
          switch (code) {
            case 0:
              that.$message.error('该商品不存在');
              break;
            case 1:{
              let goodsDetails = data.data.goodsDetails;
              that.goodsTypeName = goodsDetails.goodsType.goodsTypeName;
              that.datas.goodName = goodsDetails.goodName;
              that.datas.businessName = goodsDetails.businessName;
              that.datas.lowestPrice = goodsDetails.lowestPrice;
              that.datas.highestPrice = goodsDetails.highestPrice;
              let upload_success_list =  JSON.parse(goodsDetails.goodImages);//将json字符串转换成json对象
              that.upload_success_list = upload_success_list;//将json字符串转换成json对象
              let fileList = [];
              upload_success_list.map((item,index)=>{
                fileList.push({name:item,url:that.rootUrl+item})
              })
              that.fileList = fileList;
              that.datas.depositInstruction = goodsDetails.depositInstruction;
              that.datas.takeGoodInstruction = goodsDetails.takeGoodInstruction;
              that.datas.returnGoodInstruction = goodsDetails.returnGoodInstruction;
              that.datas.businessHours = goodsDetails.businessHours;
              that.datas.goodDescription = goodsDetails.goodDescription;
              that.datas.goodVarietyList = goodsDetails.goodVarietyList;
              that.datas.state = goodsDetails.state;
              that.$nextTick(() => {
                that.isRequestFinish = true
              })
              break;
            }
            case 2:
              that.$message.error('该商品不存在');
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
      let that = this;
      this.changeData();
      console.log(this.datas);
      if (this.$vuerify.check(this.verifyList) && this.status == true) { //校验
        this.datas.state = state;
        let that = this;
        let params = new URLSearchParams();
        for(let key in this.datas){
          switch(key){
            case 'goodVarietyList':
              params.append('GoodVarietyString', JSON.stringify(this.datas[key]))
              break;
            default:
              params.append(key, this.datas[key]);
          }
        }
        this.$http
          .post("addGoods", params)
          .then(res => {
            console.log(res.data);
            let data = res.data;
            let code = data.code;
            switch (code) {
              case -1:
                that.$message({
                  message: '添加失败！请稍后再试',
                  type: 'warning'
                });
                break;
              case 1:
                that.$message({
                  message: '添加成功',
                  type: 'success'
                });
                setTimeout(() => {
                 that.$router.go(0)
                }, 1500);
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
    onSubmitModify(goodId){
      let that = this;
      this.changeData();
      console.log(this.datas);
      if (this.$vuerify.check(this.verifyList) && this.status == true) { //校验
        let that = this;
        let params = new URLSearchParams();
        params.append('goodId', goodId);
        for(let key in this.datas){
          switch(key){
            case 'goodVarietyList':
              params.append('GoodVarietyString', JSON.stringify(this.datas[key]))
              break;
            default:
              params.append(key, this.datas[key]);
          }
        }
        this.$http
          .post("updateGoods", params)
          .then(res => {
            console.log(res.data);
            let data = res.data;
            let code = data.code;
            switch (code) {
              case -1:
                this.$message({
                  message: '修改失败！请稍后再试',
                  type: 'warning'
                });
                break;
              case 0:
                that.$message.error('该商品不存在');
                break;
              case 1:
                that.$message({
                  message: '修改成功',
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
    //转换规格数据
    changeData(){
      //解析转换goodsTypeName成goodsTypeId
      this.themeData.map((item,index)=>{
        if(item.goodsTypeName == this.goodsTypeName){
          this.datas.goodsTypeId = item.goodsTypeId
        }
      })
      //将list转换成json字符串
      this.upload_success_list[0] == undefined?
      this.datas.proImg = ""
      :
      this.datas.proImg = this.upload_success_list[0];
      this.datas.goodImages = JSON.stringify(this.upload_success_list);
    },
    //获取商品种类
    findAllGoodType(){
      let that = this;
      let params = {};
      this.$http
        .get("findAllGoodType", { params })
        .then(res => {
          // console.log(res.data);
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
          break;
      }
    },
    //商品照片移除
    handleRemove(file) {
      console.log(file);
      let deleteIndex;
      let filename = file.name;
      this.upload_success_list.findIndex((url,index)=>{
        if(url == filename) deleteIndex = index;
      })
      this.upload_success_list.splice(deleteIndex,1);
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
        size: JSON.stringify([{ specifc: "" }]),
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