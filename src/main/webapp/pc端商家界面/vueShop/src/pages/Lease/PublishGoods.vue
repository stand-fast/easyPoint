<template>
  <div class="contentPosition">
    <div class="modelContentLeft">
      <a href="#/">
        <div class="contentLeftNav ReleaseNav selectNav">
          发布商品
          <i class="icon nav"></i>
        </div>
      </a>
      <div class="managerNav">
        <i class="icon managerIcon"></i>
        查看管理
      </div>
      <a href="#/MySave">
        <div class="contentLeftNav">
          我的保存
          <i class="icon nav"></i>
        </div>
      </a>
      <a href="#/MyUpload">
        <div class="contentLeftNav">
          我的上传
          <i class="icon nav"></i>
        </div>
      </a>
      <a href="#/MyOrder">
        <div class="contentLeftNav">
          用户订单
          <i class="icon nav"></i>
        </div>
      </a>
    </div>
    <div class="content">
      <div class="contentTitle">
        <div class="plateTitle">
          <span>发布商品</span>
        </div>
      </div>
      <div class="contentBlock">
        <div class="contentBlockTitle">
          <span>商品描述填写</span>
        </div>
        <div class="contentBlockPart">
          <li class="publishPart">
            <div class="partTitle">选择主题:</div>
            <el-select v-model="theme" placeholder="请选择" class="modelPublish">
              <el-option
                v-for="item in themeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li class="publishPart">
            <div class="partTitle">商品名称:</div>
            <el-input v-model="shopName" placeholder="请输入" class="modelPublish"></el-input>
          </li>
          <li class="publishPartImg">
            <div class="partTitle">商品照片:</div>
            <el-upload
              class="upload-demo modelPublish"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </li>
        </div>
      </div>
      <div class="contentBlock">
        <div class="contentBlockTitle">
          <span>内容说明填写</span>
        </div>
        <div class="contentBlockPart">
          <li class="publishPartImg">
            <div class="partTitle">押金说明:</div>
            <el-input
              type="textarea"
              class="modelPublishTextarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="depositDescription"
            ></el-input>
          </li>
          <li class="publishPartImg">
            <div class="partTitle">取货说明:</div>
            <el-input
              type="textarea"
              class="modelPublishTextarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="pickUpDescription"
            ></el-input>
          </li>
          <li class="publishPartImg">
            <div class="partTitle">还货说明:</div>
            <el-input
              type="textarea"
              class="modelPublishTextarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="returnDescription"
            ></el-input>
          </li>
          <li class="publishPartImg">
            <div class="partTitle">营业时间:</div>
            <el-time-select
              class="timeSelecting"
              placeholder="起始时间"
              v-model="startTime"
              :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }"
            ></el-time-select>
            <el-time-select
              class="timeSelecting"
              placeholder="结束时间"
              v-model="endTime"
              :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: startTime
             }"
            ></el-time-select>
          </li>

          <li class="publishPartImg">
            <div class="partTitle">商品描述:</div>
            <el-input
              type="textarea"
              class="modelPublishTextarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="commodityDescription"
            ></el-input>
          </li>
        </div>
      </div>
      <div class="contentBlock">
        <div class="contentBlockTitle">
          <span>商品类别填写</span>
        </div>
        <div class="contentBlockPart">
          <li class="publishPartImg" v-for="(item,index) in itemsData" :key="index">
            <div class="partTitle">
              <input v-model="item.itemsName" />
            </div>
            <div class="CommodityCategory">
              <specifications
                :index="index"
                :filesName="item.filesName"
                :filesUrl="item.filesUrl"
                :items="item.items"
                @items="handleItemsChange"
              />
            </div>
          </li>
          <div class="elButton">
            <el-button @click="add" class="addButton" type="primary" icon="el-icon-edit">添加商品</el-button>
          </div>
        </div>
        <button @click="submit()">提交</button>
      </div>
    </div>
  </div>
</template>
<script>
import specifications from "../../components/specifications.vue";
export default {
  data() {
    return {
      imagelist: [],
      theme: "", //主题
      shopName: "", //商品名称
      depositDescription: "", //押金说明
      pickUpDescription: "", //取货说明
      returnDescription: "", //还货说明
      startTime: "", //营业时间开始
      endTime: "", //营业时间结束
      commodityDescription: "", //商品描述
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // },
      ],
      itemsData: [
        {
          filesName: "",
          filesUrl: "",
          items: [{ specifc: "", price: "", save: "" }]
        }
      ],
      themeOptions: [
        {
          value: "1",
          label: "音响设备"
        },
        {
          value: "2",
          label: "电子设备"
        },
        {
          value: "3",
          label: "玩具套餐"
        },
        {
          value: "选项4",
          label: "正装用品"
        }
      ]
    };
  },
  computed: {
    displaySpecifications(file) {
      if (this.file) {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    specifications
  },
  methods: {
    add() {
      this.itemsData.push({
        filesName: "",
        filesUrl: "",
        items: [{ specifc: "", price: "", save: "" }]
      });
    },
    handleItemsChange(index, items, filesName, filesUrl) {
      //console.log(index, items, filesName, filesUrl);
      this.itemsData[index].filesName = filesName;
      this.itemsData[index].filesUrl = filesUrl;
      this.itemsData[index].items = JSON.parse(JSON.stringify(items));
      this.itemsData = JSON.parse(JSON.stringify(this.itemsData));
      console.log(this.itemsData);
    },
    submit() {
      console.log(JSON.parse(JSON.stringify(this.itemsData)));
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>
<style>
.modelPublish {
  width: 330px !important;
}
.modelPublishTextarea {
  width: 530px !important;
}
.contentBlockPart .publishPartImg {
  margin-top: 10px;
  overflow: hidden;
  box-sizing: border-box;
  padding-left: 200px;
  display: flex;
  overflow: hidden;
}
.publishPartImg .partTitle {
  margin-right: 20px;
  min-width: 100px;
  height: 40px;
  line-height: 40px;
}
.timeSelecting {
  width: 265px !important;
}
.CommodityCategory {
  width: 630px;
  padding: 5px 10px;
  background-color: #f2f2f2;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.elButton {
  margin-top: 20px;
  text-align: center;
}
.partTitle input {
  border: 1px solid #dcdfe6;
  width: 100px;
  height: 40px;
  padding: 0 10px;
  outline: none;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>