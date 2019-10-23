<template>
  <div class="specificationContent">
    <div class="specifcationImg" v-if="filesUrlComponent =='' ">
      <button type="button">
        +
        <input type="file" @change="changeImage($event)" />
      </button>
    </div>
    <div class="specifcationImg" v-else>
      <img :src="filesUrlComponent" />
      <button type="button" class="addImgReadd">
        更换
        <input type="file" @change="changeImage($event)" />
      </button>
    </div>
    <div class="specifcIngContainer">
      <div class="specifcIng" v-for="(item,index) in itemsComponent" :key="index">
        <li class="specifcText">
          <span>规格:</span>
          <input type="text" v-model="item.specifc" />
        </li>
        <li class="specifcPriceSave">
          <span>价格:</span>
          <input type="number" v-model="item.price" />
        </li>
        <li class="specifcPriceSave">
          <span>库存:</span>
          <input type="number" v-model="item.save" />
        </li>
        <i @click="deleteSpecifc(index)" class="icon deleteIcon"></i>
      </div>
      <div class="elButton">
        <el-button @click="add" class="addButton" type="primary" icon="el-icon-edit"></el-button>
        <el-button @click="determine" type="primary" class="addButton">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "imgUpload",
  data() {
    return {
      filesUrlComponent: "",
      filesNameComponent: "",
      itemsComponent: ""
    };
  },
  props: {
    index: {
      type: Number
    },
    filesName: {
      default: ""
    },
    filesUrl: {
      default: ""
    },
    items: {
      default: ""
    }
  },
  mounted() {
    this.setData();
  },
  methods: {
    async setData() {
      this.filesUrlComponent = this.filesUrl;
      this.filesNameComponent = this.filesName;
      this.itemsComponent = this.items;
    },
    determine() {
      let items = JSON.parse(JSON.stringify(this.itemsComponent));
      let filesName = this.filesNameComponent;
      let filesUrl = this.filesUrlComponent;
      console.log(items);
      this.$emit("items", this.index, items, filesName, filesUrl);
    },
    changeImage(e) {
      let files = e.target.files[0];
      if (files != undefined) {
        this.filesUrlComponent = this.getObjectURL(files);
        this.filesNameComponent = files.name;
      }
    },
    add() {
      this.itemsComponent.push({ specifc: "", price: "", save: "" });
    },
    deleteSpecifc(index) {
      if (confirm("确定要删除该规格吗?")) {
        if (this.items.length == 1) {
          alert("至少含有一个规格数据");
        } else {
          this.itemsComponent.splice(index, 1);
        }
      } else {
        console.log("你取消了删除");
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
.specificationContent {
  display: flex;
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
.specifcIngContainer {
  display: flex;
  flex-direction: column;
}
.specifcIng {
  display: flex;
}
.specifcIng li {
  border: 1px solid #f2f2f2;
  margin: 5px 0 5px 5px;
  font-size: 15px;
  height: 30px;
}
.specifcText {
  width: 260px;
}
.specifcText input {
  width: 225px;
}
.specifcPriceSave {
  width: 130px;
}
.specifcPriceSave input {
  width: 95px;
}
.specifcIng li input {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 0 10px;
  height: 30px;
  outline: none;
}
.specifcIng i {
  font-size: 18px;
  cursor: pointer;
  padding: 7px 7px;
  color: #ef5657;
}
.specifcIng .deleteIcon::before {
  content: "\e644";
}
.addButton {
  width: 100px !important;
}
.elButton {
  text-align: center;
}
</style>