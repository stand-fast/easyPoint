<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">
      {{navName}}-{{navPlateName}}
      <span @click="showAddCategory = true;">添加商品类目</span>
      <!-- 添加商品类目弹窗 -->
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
    <el-table :data="datas" :row-key="getgoodsTypeId">
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
          <!-- 修改按钮 -->
          <el-button
            type="text"
            size="mini"
            @click="displayModify(scope.$index)"
          >修改</el-button>

          <!-- 禁用启用按钮 -->
          <el-button
            v-if="scope.row.state===1"
            type="text"
            style="margin-left:10px"
            size="mini"
            @click="scope.row.visiblePermission = true;"
          >禁用</el-button>
          <el-button
            v-if="scope.row.state===2"
            type="text"
            style="margin-left:10px"
            size="mini"
            @click="scope.row.visiblePermission = true;"
          >启用</el-button>
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
                @click="modifyCategory(scope.row.goodsTypeId,scope.row.state)"
              >确定</el-button>
            </div>
          </el-popover>

          <!-- 删除按钮 -->
          <el-button
            size="mini"
            style="margin-left:10px"
            type="text"
            @click="scope.row.visible = true;"
          >删除</el-button>
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
              <el-button type="primary" size="mini" @click="deleteCategory(scope.row.goodsTypeId)">确定</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改商品类别抽屉 -->
    <el-drawer title="修改用户名" size="50%" :visible.sync="modifydrawer" :with-header="false">
      <div class="drawer-model">
        <li>
          <span>商品类目:</span>
          {{modifyName}}
        </li>
        <li>
          <span>类目描述:</span>
          {{modifyDes}}
        </li>
        <li>
          <span>新类目:</span>
          <el-input
            class="model-input"
            placeholder="请输入新商品类目"
            v-model="newName"
            clearable
          ></el-input>
        </li>
        <li>
          <span>新描述:</span>
          <el-input
            class="model-input"
            placeholder="请输入新类目描述"
            v-model="newDes"
            clearable
          ></el-input>
        </li>
      </div>
      <div class="drawer-model-button">
        <el-button type="primary" size="mini" @click="ModifyCategory">修改</el-button>
      </div>
    </el-drawer>

  </div>
</template>
<script>
export default {
  data() {
    return {
      navName: "租赁闲置",
      navPlateName: "添加商品类目",
      modifydrawer:false,//是否显示修改商品类目抽屉
      showAddCategory: false, //是否显示添加商品类目
      goodsTypeName: "", //添加商品类目-名称
      description: "", //添加商品类目-描述
      modifyName:"",//修改商品类目-原名称
      modifyDes:"",//修改商品类目-原描述
      modifyId:"",//修改商品类目-类别Id
      newName:"",//修改商品类目-名称
      newDes:"",//修改商品类目-描述
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
    },
    //禁用、启用弹窗标题
    visiblePermissionTitle(state) {
      return function(status) {
        return "确定要" + (status == 1 ? "禁用" : "启用") + "该账户？";
      };
    }
  },
  mounted() {
    this.findAllGoodType();
  },
  methods: {
    //请求商品类目
    async findAllGoodType() {
      let that = this;
      let params = {};
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
              data.data.forEach((res, index, arr) => {
                res.visiblePermission = false;
                res.visible = false;
                return res;
              });
              that.datas = data.data;
              console.log(data.data);
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
      if (this.check) {
        let that = this;
        let params = new URLSearchParams();
        params.append("goodsTypeName", this.goodsTypeName);
        params.append("state", this.state);
        params.append("description", this.description);
        this.$http
          .post("addGoodType", params)
          .then(res => {
            console.log(res);
            let data = res.data;
            let code = data.code;
            switch (code) {
              case -1:
                alert("添加失败！请稍后再试");
                break;
              case 1:
                console.log(data);
                this.showAddCategory = false;
                this.goodsTypeName = "";
                this.description = "";
                this.state = 1;
                this.findAllGoodType();
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
    //删除商品类目
    deleteCategory(goodTypeId) {
       let that = this;
      let params = new URLSearchParams();
      params.append("goodTypeId", goodTypeId);
      this.$http
        .post("deleteGoodType", params)
        .then(function(res) {
          console.log(res.data);
          let code = res.data.code;
          switch (code) {
            case -1:
              alert("删除失败");
              break;
            case 1:
              that.findAllGoodType(that.current);
              //alert("删除成功");
              break;
            case 2:
              alert("参数为空");
              break;
            case 110:
              alert("商品类别不存在");
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
    //启用、禁用类目
    modifyCategory(goodTypeId,state) {
      let that = this;
      let params = new URLSearchParams();
      params.append("goodTypeId", goodTypeId);
      params.append("flag", state == 1 ? 2 : 1);
      this.$http
        .post("forbiddenOrUse", params)
        .then(function(res) {
          console.log(res.data);
          let code = res.data.code;
          switch (code) {
            case -1:
              alert("修改失败");
              break;
            case 1:
              that.findAllGoodType();
              //alert("修改成功");
              break;
            case 2:
              alert("参数为空");
              break;
            case 3:
              alert("该商品类别不存在");
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
    //修改商品类别
    ModifyCategory(){
    },
    //显示修改商品类目抽屉
    displayModify(index){
      let {goodsTypeId,goodsTypeName,description} = this.datas[index];
      this.modifyName = goodsTypeName;
      this.modifyDes = description;
      this.modifyId = goodsTypeId;
      this.modifydrawer = true;
    },
    //格式化状态内容
    formatState(row, column, cellValue, index) {
      return row.state == 1 ? "可用" : "禁用";
    },
    //返回goodsTypeId优化table的渲染
    getgoodsTypeId(e){
      return e.goodsTypeId
    }
  },
  components: {}
};
</script>