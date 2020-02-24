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
            <el-select v-model="datas.theme" clearable placeholder="请选择商品主题">
              <el-option
                v-for="item in themeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="error" v-if="errors['datas.theme']">{{errors['datas.theme']}}</span>
          </li>
          <li class="content-item">
            <span class="item-title">商品名称：</span>
            <el-input
              placeholder="请输入商品名称"
              v-model="datas.shopName"
              maxlength="10"
              show-word-limit
              clearable
            ></el-input>
            <span class="error" v-if="errors['datas.shopName']">{{errors['datas.shopName']}}</span>
          </li>
          <li class="content-item">
            <span class="item-title">商家名称：</span>
            <el-input
              placeholder="请输入商家名称"
              v-model="datas.merchantName"
              maxlength="10"
              show-word-limit
              clearable
            ></el-input>
            <span class="error" v-if="errors['datas.merchantName']">{{errors['datas.merchantName']}}</span>
          </li>
          <li class="content-item item-price">
            <span class="item-title">商家价格：</span>
            <el-input placeholder="最低价" type="number" v-model="datas.minPrice" clearable></el-input>
            <label>-</label>
            <el-input placeholder="最高价" type="number" v-model="datas.maxPrice" clearable></el-input>
            <span class="error" v-if="errors['datas.minPrice']">{{errors['datas.minPrice']}}</span>
            <span class="error" v-if="errors['datas.maxPrice']">{{errors['datas.maxPrice']}}</span>
          </li>
          <li class="content-item">
            <span class="item-title">商品照片：</span>
            <el-upload
              class="upload-demo modelPublish"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="datas.fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
              v-model="datas.depositDes"
              maxlength="100"
              show-word-limit
              clearable
            ></el-input>
            <span class="error" v-if="errors['datas.depositDes']">{{errors['datas.depositDes']}}</span>
          </li>
          <li class="content-item textarea">
            <span class="item-title">取货说明：</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入取货说明"
              v-model="datas.pickingDes"
              maxlength="100"
              show-word-limit
              clearable
            ></el-input>
            <span class="error" v-if="errors['datas.pickingDes']">{{errors['datas.pickingDes']}}</span>
          </li>
          <li class="content-item textarea">
            <span class="item-title">还货说明：</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入还货说明"
              v-model="datas.returnDes"
              maxlength="100"
              show-word-limit
              clearable
            ></el-input>
            <span class="error" v-if="errors['datas.returnDes']">{{errors['datas.returnDes']}}</span>
          </li>
          <li class="content-item textarea">
            <span class="item-title">营业时间：</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入营业时间"
              v-model="datas.businessTime"
              maxlength="100"
              show-word-limit
              clearable
            ></el-input>
            <span class="error" v-if="errors['datas.businessTime']">{{errors['datas.businessTime']}}</span>
          </li>
          <li class="content-item textarea">
            <span class="item-title">商品描述：</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入商品描述"
              v-model="datas.goodsDescribe"
              maxlength="100"
              show-word-limit
              clearable
            ></el-input>
            <span
              class="error"
              v-if="errors['datas.goodsDescribe']"
            >{{errors['datas.goodsDescribe']}}</span>
          </li>
        </div>
      </div>
      <!-- 商品类别部分 -->
      <div class="wrapper-publish">
        <div class="publish-title">
          <span>商品类别填写</span>
        </div>
        <div class="publish-content textarea">
          <li class="content-item" v-for="(item,index) in datas.itemsData" :key="index">
            <specifications :index="index" @items="handleItemsChange" />
            <el-button @click="del(index)" class="delButton" type="primary">删除商品</el-button>
          </li>
          <div class="elButton">
            <el-button @click="add" type="primary" icon="el-icon-edit">添加商品</el-button>
          </div>
        </div>
      </div>
      <div class="el-submit-button">
        <el-button @click="onSubmit">上传</el-button>
        <el-button>保存</el-button>
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
      datas: {
        theme: "", //主题
        shopName: "", //商品名称
        merchantName: "", //商家名称
        minPrice: "", //最低价格
        maxPrice: "", //最高价格
        fileList: [
          // {
          //   name: "food.jpeg",
          //   url:
          //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
          // },
        ], //商品图片
        depositDes: "", //押金说明
        pickingDes: "", //取货说明
        returnDes: "", //还货说明
        businessTime: "", //营业时间
        goodsDescribe: "", //商品描述
        itemsData: [
          //商品分类数据
          {
            filesName: "",
            filesUrl: "",
            types: "",
            price: "",
            items: [{ specifc: "" }]
          }
        ]
      }, //发布商品数据
      boo: false, //判断商品类别是否校验通过
      themeData: [
        //商品主题数据
        {
          value: "选项1",
          label: "音响设备"
        },
        {
          value: "选项2",
          label: "电子设备"
          //disabled: true
        },
        {
          value: "选项3",
          label: "玩具套餐"
        },
        {
          value: "选项4",
          label: "正装用品"
        }
      ]
    };
  },
  //vuerify表单验证
  vuerify: {
    "datas.theme": {
      test: /\S/,
      message: "请选择商品主题"
    },
    "datas.shopName": {
      test: /\S/,
      message: "商品名称不能为空"
    },
    "datas.merchantName": {
      test: /\S/,
      message: "商家名称不能为空"
    },
    "datas.minPrice": {
      test: /\S/,
      message: "商品最低价不能为空"
    },
    "datas.maxPrice": {
      test: /\S/,
      message: "商品最高价不能为空"
    },
    "datas.depositDes": {
      test: /\S/,
      message: "押金说明不能为空"
    },
    "datas.pickingDes": {
      test: /\S/,
      message: "取货说明不能为空"
    },
    "datas.returnDes": {
      test: /\S/,
      message: "还货说明不能为空"
    },
    "datas.businessTime": {
      test: /\S/,
      message: "营业时间不能为空"
    },
    "datas.goodsDescribe": {
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
  methods: {
    // 提交表单数据
    onSubmit() {
      console.log(this.datas.itemsData);
      let verifyList = [
        "datas.theme",
        "datas.shopName",
        "datas.merchantName",
        "datas.minPrice",
        "datas.maxPrice",
        "datas.depositDes",
        "datas.pickingDes",
        "datas.returnDes",
        "datas.businessTime",
        "datas.goodsDescribe"
      ];
      // check() 校验所有规则，参数可以设置需要校验的数组
      if (!this.$vuerify.check(verifyList) || this.boo == true) {
        return;
      }
      console.log("验证通过");
    },
    //商品分类添加商品分类
    add() {
      this.datas.itemsData.push({
        filesName: "",
        filesUrl: "",
        types: "",
        price: "",
        items: [{ specifc: "" }]
      });
    },
    //商品分类删除商品分类
    del(index) {
      console.log(index);
      if (confirm("确定要删除该商品数据吗?")) {
        if (this.datas.itemsData.length == 1) {
          alert("至少含有一个商品数据");
        } else {
          this.datas.itemsData.splice(index, 1);
        }
      } else {
        console.log("你取消了删除");
      }
    },
    //接受specifications组件数据
    handleItemsChange(index, data, boo) {
      this.datas.itemsData[index].filesName = data.filesName;
      this.datas.itemsData[index].filesUrl = data.filesUrl;
      this.datas.itemsData[index].types = data.types;
      this.datas.itemsData[index].price = data.price;
      this.datas.itemsData[index].items = JSON.parse(
        JSON.stringify(data.items)
      );
      this.boo = boo;
      //console.log(this.datas.itemsData);
    },
    //商品照片移除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //商品照片预览
    handlePreview(file) {
      console.log(file);
    }
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