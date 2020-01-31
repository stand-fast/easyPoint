<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">
      {{navName}}-{{navPlateName}}
      <span @click="showAddAssociation = true;">添加同乡会</span>
      <el-popover
        placement="top"
        title="添加同乡会"
        width="300"
        trigger="click"
        v-model="showAddAssociation"
      >
        <div class="spring-model-con">
          <li>
            <span>同乡会:</span>
            <el-input class="model-input" placeholder="请输入同乡会" v-model="addAssociation" clearable></el-input>
          </li>
        </div>
        <div class="spring-model-con-button">
          <el-button type="text" size="mini" @click="showAddAssociation = false;">取消</el-button>
          <el-button type="primary" size="mini" @click="setAssociation">添加</el-button>
        </div>
      </el-popover>
    </el-header>
    <!-- 内容 -->
    <el-table :data="datas">
      <el-table-column label="同乡会名称" prop="associationName"></el-table-column>
      <el-table-column label="上下车地点" fixed="right">
        <template slot-scope="scope">
          <!-- 添加上下车地点 -->
          <el-button type="text" size="mini" @click="addPlace(scope.row.associationId)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <!-- 删除弹窗 -->
          <el-popover
            class="column-width-5"
            placement="top"
            width="230"
            title="确认删除该车辆类型吗？"
            trigger="click"
            v-model="scope.row.visible"
          >
            <div class="spring-model-con-button">
              <el-button type="text" size="mini" @click="scope.row.visible = false;">取消</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="handleDelete(scope.row.associationId)"
              >确定</el-button>
            </div>
          </el-popover>
          <!-- 删除按钮 -->
          <el-button type="text" size="mini" @click="scope.row.visible = true;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      class="pageing"
      :page-size="pageSize"
      :total="totalNumber"
      @current-change="handlePageChange"
      :current-page.sync="current"
      layout="prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navName: "校友会包车",
      navPlateName: "添加同乡会",
      showAddAssociation: false, //是否显示添加同乡会
      addAssociation: "", //添加同乡会-名称
      datas: [], //同乡会数据
      current: 1, //当前页码
      pageSize: 8, //每页最大条数
      totalNumber: 5 //总条目数
    };
  },
  computed: {
    //检查输入数据是否合法
    check() {
      if (this.addAssociation == "") {
        alert("同乡会名称不能为空");
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.handlePageChange(1);
  },
  methods: {
    //按页码获取数据
    async handlePageChange(page) {
      let that = this;
      let params = {
        startIndex: page,
        pageSize: this.pageSize
      };
      this.$http
        .get("findAllAssociation", { params })
        .then(res => {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case 0:
              alert("没有数据");
              break;
            case 1:
              console.log("查询成功");
              data.data.associationList.forEach((res, index, arr) => {
                res.visible = false;
                return res;
              });
              this.datas = data.data.associationList;
              this.totalNumber = data.data.totalNum;
              this.current = page;
              break;
            case 2:
              alert("参数错误");
              break;
            case 3:
              alert("页码超出最大范围");
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
    //添加乡会
    setAssociation() {
      if (this.check) {
        let that = this;
        let params = new URLSearchParams();
        params.append("associationName", this.addAssociation);
        this.$http
          .post("addAssociation", params)
          .then(res => {
            console.log(res.data);
            let data = res.data;
            let code = data.code;
            switch (code) {
              case -1:
                alert("同乡会添加失败！请稍后再试");
                break;
              case 0:
                alert("同乡会名字为空！");
                break;
              case 1:
                this.showAddAssociation = false;
                this.getAssociation(this.current);
                break;
              case 2:
                alert("同乡会名已添加过！");
                break;
            }
          })
          .catch(function(e) {
            console.log(e);
          });
      }
    },
    //删除乡会
    handleDelete(id) {},
    //跳转上下车地点
    addPlace(id) {
      this.$router.push("/AddLocation/" + id);
    }
  },
  components: {}
};
</script>