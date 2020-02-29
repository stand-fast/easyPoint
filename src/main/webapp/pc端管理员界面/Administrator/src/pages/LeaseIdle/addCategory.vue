<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">
      {{navName}}-{{navPlateName}}
      <span @click="showAddCategory = true;">添加商品类目</span>
      <el-popover
        placement="top"
        title="添加商品类目"
        width="300"
        trigger="click"
        v-model="showAddCategory"
      >
        <div class="spring-model-con">
          <li>
            <span>商品类目:</span>
            <el-input class="model-input" placeholder="请输入商品类目" v-model="goodsTypeName" clearable></el-input>
          </li>
          <li>
            <span>类目描述:</span>
            <el-input class="model-input" placeholder="请输入类目描述" v-model="description" clearable></el-input>
          </li>
          <li>
            <span>状态:</span>
            <el-radio-group v-model="state">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </li>
        </div>
        <div class="spring-model-con-button">
          <el-button type="text" size="mini" @click="showAddCategory = false;">取消</el-button>
          <el-button type="primary" size="mini" @click="setCategory">添加</el-button>
        </div>
      </el-popover>
    </el-header>
    <!-- 内容 -->
    <el-table :data="datas">
      <el-table-column label="商品类目" prop="goodsTypeName"></el-table-column>
      <el-table-column
        label="状态"
        sortable
        prop="state"
        class="column-width-5"
        :formatter="formatState"
      ></el-table-column>
      <el-table-column label="类目描述" prop="description"></el-table-column>

      <el-table-column label="操作" fixed="right" style="width: 12%">
        <template slot-scope="scope">
          <!-- 禁用启用弹窗 -->
          <el-popover
            placement="top"
            :title="visiblePermissionTitle(scope.row.state)"
            trigger="click"
            width="230"
            v-model="scope.row.visiblePermission"
          >
            <div class="spring-model-con-button">
              <el-button size="mini" type="text" @click="scope.row.visiblePermission = false;">取消</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="modifyCategory(scope.row.phone,scope.row.state)"
              >确定</el-button>
            </div>
          </el-popover>
          <!-- 禁用启用按钮 -->
          <el-button
            v-if="scope.row.state===1"
            type="text"
            size="mini"
            @click="scope.row.visiblePermission = true;"
          >禁用</el-button>
          <el-button
            v-if="scope.row.state===2"
            type="text"
            size="mini"
            @click="scope.row.visiblePermission = true;"
          >启用</el-button>
          <!-- 删除弹窗 -->
          <el-popover
            placement="top"
            width="230"
            title="确认删除该商品类目吗？"
            class="column-width-5"
            trigger="click"
            v-model="scope.row.visible"
          >
            <div class="spring-model-con-button">
              <el-button size="mini" type="text" @click="scope.row.visible = false;">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteCategory(scope.row.phone)">确定</el-button>
            </div>
          </el-popover>
          <!-- 删除按钮 -->
          <el-button
            size="mini"
            style="margin-left:10px"
            type="text"
            @click="scope.row.visible = true;"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navName: "租赁闲置",
      navPlateName: "添加商品类目",
      showAddCategory: false, //是否显示添加商品类目
      goodsTypeName: "", //添加商品类目-名称
      description: "", //添加商品类目-描述
      state: 1, //添加商品类目-状态
      datas: [] //商品类目数据
    };
  },
  computed: {
    //检查输入数据是否合法
    check() {
      if (this.goodsTypeName == "") {
        alert("商品类目不能为空");
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    // this.handlePageChange(1);
  },
  methods: {
    //请求商品类目
    async handlePageChange(page) {
      let that = this;
      let params = {
        inUse: ""
      };
      this.$http
        .get("findAllGoodType", { params })
        .then(res => {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case 0:
              alert("商品类目为空");
              break;
            case 1:
              data.adminAccountList.forEach((res, index, arr) => {
                res.visiblePermission = false;
                res.visible = false;
                return res;
              });
              that.datas = data.adminAccountList;
              console.log(data.adminAccountList);
              console.log("查询成功");
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
    //添加商品类目
    setCategory() {
      //   console.log(this.goodsTypeName, this.state, this.description);
      if (this.check) {
        let that = this;
        let params = new URLSearchParams();
        params.append("goodsTypeName", this.goodsTypeName);
        params.append("state", this.state);
        params.append("description", this.description);
        this.$http
          .post("addGoodType", params)
          .then(res => {
            console.log(res.data);
            let data = res.data;
            let code = data.code;
            switch (code) {
              case -1:
                alert("添加失败！请稍后再试");
                break;
              case 1:
                console.log(data);
                this.showAddCategory = false;
                // this.getAssociation(this.current);
                break;
              case 2:
                alert("商品类目参数为空");
                break;
              case 3:
                alert("商品类目名已经存在");
                break;
            }
          })
          .catch(function(e) {
            console.log(e);
          });
      }
    },
    //启用、禁用类目
    modifyCategory(id) {},
    //删除商品类目
    deleteCategory(id) {},
    //格式化状态内容
    formatState: function(row, column, cellValue, index) {
      return row.state == 1 ? "可用" : "禁用";
    }
  },
  components: {}
};
</script>