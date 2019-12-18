<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">
      {{navName}}-{{navPlateName}}
      <span @click="showAddAccounts = true;">添加管理员</span>
      <el-popover
        placement="top"
        title="添加管理员账户"
        width="300"
        trigger="click"
        v-model="showAddAccounts"
      >
        <div class="spring-model-con">
          <li>
            <span>用户名:</span>
            <el-input class="model-input" placeholder="请输入用户名" v-model="username" clearable></el-input>
          </li>
          <li>
            <span>账户:</span>
            <el-input
              class="model-input"
              maxlength="11"
              placeholder="请输入账户"
              v-model="phone"
              clearable
            ></el-input>
          </li>
          <li>
            <span>密码:</span>
            <el-input
              class="model-input"
              autocomplete="new-password"
              type="password"
              placeholder="请输入密码"
              v-model="password"
              clearable
            ></el-input>
          </li>
          <li>
            <span>权限:</span>
            <el-radio-group v-model="identity">
              <el-radio :label="1">普通管理员</el-radio>
              <p>-基本权限</p>
              <p>-修改本账号密码权限</p>
              <el-radio :label="0">超级管理员</el-radio>
              <p>-基本权限</p>
              <p>-加盟商家账号管理权限</p>
              <p>-管理员账号管理权限</p>
            </el-radio-group>
          </li>
        </div>
        <div class="spring-model-con-button">
          <el-button size="mini" type="text" @click="showAddAccounts = false;">取消</el-button>
          <el-button type="primary" size="mini" @click="submitAddAccount()">添加</el-button>
        </div>
      </el-popover>
    </el-header>
    <!-- 内容 -->
    <el-table :data="datas">
      <el-table-column label="用户名" prop="username" class="column-width-5"></el-table-column>
      <el-table-column label="账户" prop="phone" class="column-width-5"></el-table-column>
      <el-table-column
        label="角色"
        prop="identity"
        class="column-width-5"
        :formatter="formatIdentity"
      ></el-table-column>
      <el-table-column
        label="状态"
        sortable
        prop="state"
        class="column-width-5"
        :formatter="formatState"
      ></el-table-column>
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
                @click="modifyPermissions(scope.row.phone,scope.row.state)"
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
            v-if="scope.row.state===0"
            type="text"
            size="mini"
            @click="scope.row.visiblePermission = true;"
          >启用</el-button>
          <!-- 删除弹窗 -->
          <el-popover
            placement="top"
            width="230"
            title="确认删除该管理员账户吗？"
            class="column-width-5"
            trigger="click"
            v-model="scope.row.visible"
          >
            <div class="spring-model-con-button">
              <el-button size="mini" type="text" @click="scope.row.visible = false;">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteAccount(scope.row.phone)">确定</el-button>
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
    <!-- 分页组件 -->
    <el-pagination
      class="pageing"
      :page-size="pageCount"
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
      navName: "管理员账号",
      navPlateName: "账号管理",
      showAddAccounts: false, //是否显示添加管理员弹窗
      username: "", //添加管理员-用户名
      phone: "", //添加管理员-账户
      password: "", //添加管理员-密码
      identity: 1, //添加管理员-权限-0:超级管理员-1:普通管理员
      datas: [], //管理员账户数据
      current: 1, //当前页码
      pageCount: 9, //每页显示条目数
      totalNumber: 5 //总条目数
    };
  },
  computed: {
    //禁用、启用弹窗标题
    visiblePermissionTitle(state) {
      return function(status) {
        return "确定要" + (status == 1 ? "禁用" : "启用") + "该账户？";
      };
    }
  },
  mounted() {
    this.handlePageChange(1);
  },
  methods: {
    //获取账户数据,根据页码
    async handlePageChange(page) {
      let that = this;
      let params = { startIndex: page, pageSize: 9 };
      this.$http
        .get("findAllCommonAdmin", { params })
        .then(function(res) {
          console.log(res.data);
          let data = res.data.data;
          let code = res.data.code;
          switch (code) {
            case 0:
              alert("查询到0条数据");
              break;
            case 1:
              that.current = page;
              that.totalNumber = data.totalNum;
              data.adminAccountList.forEach((res, index, arr) => {
                res.visiblePermission = false;
                res.visible = false;
                return res;
              });
              that.datas = data.adminAccountList;
              console.log(data.adminAccountList);
              console.log("查询成功");
              break;
            case 3:
              alert("页码超出最大范围");
              break;
            case 110:
              alert("非超级管理员，出现非法操作！");
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
    //禁用/启用管理员账户
    modifyPermissions(phone, state) {
      let that = this;
      let params = new URLSearchParams();
      params.append("phone", phone);
      params.append("state", state == 1 ? 0 : 1);
      this.$http
        .post("stopOrStartAccount", params)
        .then(function(res) {
          console.log(res.data);
          let code = res.data.code;
          switch (code) {
            case -1:
              alert("修改失败");
              break;
            case 0:
              alert("账号不存在");
              break;
            case 1:
              that.handlePageChange(that.current);
              //alert("修改成功");
              break;
            case 2:
              alert("参数为空");
              break;
            case 110:
              alert("非超级管理员，出现非法操作！");
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
    //删除账户
    deleteAccount(phone) {
      let that = this;
      let params = new URLSearchParams();
      params.append("phone", phone);
      this.$http
        .post("deleteCommonAdmin", params)
        .then(function(res) {
          console.log(res.data);
          let code = res.data.code;
          switch (code) {
            case -1:
              alert("删除失败");
              break;
            case 0:
              alert("账号不存在");
              break;
            case 1:
              that.handlePageChange(that.current);
              //alert("删除成功");
              break;
            case 2:
              alert("参数为空");
              break;
            case 110:
              alert("非超级管理员，出现非法操作！");
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
    //提交添加管理员
    submitAddAccount() {
      let that = this;
      let reg = /^[1][3458]\d{9}$/; //验证手机号码
      if (!reg.test(this.phone)) {
        alert("手机号码有误!");
      } else {
        let params = new URLSearchParams();
        params.append("phone", this.phone);
        params.append("username", this.username);
        params.append("password", this.password);
        params.append("identity", this.identity);
        this.$http
          .post("addAdmin", params)
          .then(function(res) {
            console.log(res.data);
            let code = res.data.code;
            switch (code) {
              case -1:
                alert("添加失败");
                break;
              case 1:
                that.phone = "";
                that.username = "";
                that.password = "";
                that.identity = "1";
                that.showAddAccounts = false;
                that.handlePageChange(that.current);
                alert("添加成功");
                break;
              case 2:
                alert("参数为空");
                break;
              case 3:
                alert("手机号已被注册");
                break;
              case 110:
                alert("非超级管理员，出现非法操作！");
                break;
              default:
                that.$judgeToken(code);
                break;
            }
          })
          .catch(function(e) {
            console.log(e);
          });
      }
    },
    //格式化角色内容
    formatIdentity: function(row, column, cellValue, index) {
      return row.identity == 1 ? "管理员" : "超级管理员";
    },
    //格式化状态内容
    formatState: function(row, column, cellValue, index) {
      return row.state == 1 ? "可用" : "禁用";
    }
  },
  components: {}
};
</script>