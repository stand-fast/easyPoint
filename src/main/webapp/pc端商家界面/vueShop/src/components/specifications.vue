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
    </div>
    <div class="specifcIngContainer">
      <div class="specifcIng" v-for="(item,index) in items" :key="index">
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
        <i @click="deleteSpecifc(item)" class="icon deleteIcon"></i>
      </div>
      <div class="elButton">
        <el-button @click="add" class="addButton" type="primary" icon="el-icon-edit"></el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "imgUpload",
  data() {
    return {
      files: "",
      filesUrl: "",
      items: [{}]
    };
  },
  methods: {
    changeImage(e) {
      let files = e.target.files[0];
      this.filesUrl = this.getObjectURL(files);
    },
    add() {
      this.items.push({
        specifc: "",
        price: "",
        save: ""
      });
    },
    deleteSpecifc(item) {
      if (confirm("确定要删除该规格吗?")) {
        if (this.items.length == 1) {
          alert("至少含有一个规格数据");
        } else {
          for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] === item) {
              this.items.splice(i, 1);
            }
          }
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
.specificationContent {
  display: flex;
}
.specifcationImg button {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  width: 60px;
  height: 60px;
  background-color: none;
  margin-top: 5px;
}
.specifcationImg img {
  width: 60px;
  height: 60px;
}
.specifcIngContainer {
  display: flex;
  flex-direction: column;
}
.specifcIng {
  display: flex;
}
.specifcIng li {
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