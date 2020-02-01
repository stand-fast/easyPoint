<template>
  <div class="specificationContent">
    <div class="specifcationImg" v-if="filesUrl =='' ">
      <button type="button">
        +
        <input type="file" @change="changeImage($event)" />
      </button>
    </div>
    <div class="specifcationImg" v-else>
      <img :src="filesUrl" />
      <button type="button" class="addImgReadd">
        更换
        <input type="file" @change="changeImage($event)" />
      </button>
    </div>
    <div class="specifcIng">
      <li class="specifc-item">
        <span>类别:</span>
        <el-input
          placeholder="请输入商品类别名称"
          type="text"
          :blur="sumbitData()"
          v-model="types"
          maxlength="8"
          show-word-limit
          clearable
        ></el-input>
        <span class="error" v-if="errors['types']">{{errors['types']}}</span>
      </li>
      <li class="specifc-item">
        <span>价格:</span>
        <el-input
          placeholder="请输入商品类别价格"
          type="Number"
          :blur="sumbitData()"
          v-model="price"
          clearable
        ></el-input>
        <span class="error" v-if="errors['price']">{{errors['price']}}</span>
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
      filesName: "",
      filesUrl: "",
      types: "",
      price: "",
      items: [{ specifc: "" }]
    };
  },
  // vuerify表单验证
  vuerify: {
    filesUrl: {
      test: /\S/,
      message: "请添加商品类别图片"
    },
    types: {
      test: /\S/,
      message: "请输入商品类别名称"
    },
    price: {
      test: /\S/,
      message: "请输入商品类别价格"
    }
  },
  props: {
    index: {
      type: Number
    }
  },
  computed: {
    errors() {
      return this.$vuerify.$errors;
    },
    specifcErrors() {
      let data = this.items;
      let boo = false;
      for (let i = 0; i < data.length; i++) {
        if (data[i].specifc == "") {
          boo = true;
        }
      }
      return boo;
    }
  },
  methods: {
    sumbitData() {
      let data = {
        items: JSON.parse(JSON.stringify(this.items)),
        filesName: this.filesName,
        filesUrl: this.filesUrl,
        types: this.types,
        price: this.price
      };
      let boo = this.specifcErrors;
      let verifyList = ["filesUrl", "types", "price"];
      // check() 校验所有规则，参数可以设置需要校验的数组
      if (!this.$vuerify.check(verifyList) || boo) {
        this.$emit("items", this.index, data, boo);
        return;
      }
      boo = false;
      this.$emit("items", this.index, data, boo);
    },
    changeImage(e) {
      let files = e.target.files[0];
      if (files != undefined) {
        this.filesUrl = this.getObjectURL(files);
        this.filesName = files.name;
        this.sumbitData();
      }
    },
    add() {
      this.items.push({ specifc: "" });
      this.sumbitData();
    },
    deleteSpecifc(index) {
      if (confirm("确定要删除该尺寸吗?")) {
        if (this.items.length == 1) {
          alert("至少含有一个尺寸数据");
        } else {
          this.items.splice(index, 1);
          this.sumbitData();
        }
      }
    },
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      }
      return url;
    }
  }
};
</script>
<style scoped>
li {
  list-style: none;
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
.specifcationImg button {
  background: #ffffff;
  position: relative;
  overflow: hidden;
}
.specifcationImg button input {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}
.specifcationImg .addImgReadd {
  width: 60px;
  height: 20px;
}
.specifcationImg button {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  width: 60px;
  height: 60px;
  box-sizing: border-box;
  background-color: none;
  margin-top: 5px;
}
.specifcationImg img {
  width: 58px;
  height: 58px;
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
.specifc-item span {
  min-width: 70px;
  box-sizing: border-box;
  padding-left: 10px;
  height: 40px;
  line-height: 40px;
}
.specifc-item input {
  width: 230px !important;
  min-width: 230px !important;
}
.specifc-item .el-input--suffix {
  width: 230px !important;
  min-width: 230px !important;
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
  position: absolute;
  right: -7px;
  top: -14px;
}
.addButton {
  height: 40px;
  width: 50px !important;
}
</style>