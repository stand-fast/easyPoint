<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">{{navName}}-{{navPlateName}}</el-header>

    <!-- 内容 -->
    <el-main class="el-main-content">
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
      <div class="wrapper-publish">
        <div class="publish-title">
          <span>内容说明填写</span>
        </div>
        <div class="publish-content textarea">
          <li class="content-item">
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
      <div class="wrapper-publish">
        <div class="publish-title">
          <span>商品类别填写</span>
        </div>
        <div class="publish-content textarea"></div>
      </div>
      <el-button @click="onSubmit">立即创建</el-button>
    </el-main>
  </div>
</template>
<script>
import Vue from "vue";
import Vuerify from "vuerify";
Vue.use(Vuerify);

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
        goodsDescribe: "" //商品描述
      }, //发布商品数据
      themeData: [
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
    errors() {
      return this.$vuerify.$errors;
    }
  },
  methods: {
    onSubmit() {
      let verifyList = ["datas.shopName"];
      // check() 校验所有规则，参数可以设置需要校验的数组
      if (!this.$vuerify.check(verifyList)) {
        return;
      }
      console.log("验证通过");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  components: {
    //ValidationProvider //注册validate表单验证
  }
};
</script>
<style>
.wrapper-publish {
  color: #333;
  font-size: 16px;
}
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
</style>