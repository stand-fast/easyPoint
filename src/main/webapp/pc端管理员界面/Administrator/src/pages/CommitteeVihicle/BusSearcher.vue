<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">{{navName}} - {{navPlateName}}</el-header>

    <!-- 内容 -->
    <el-main class="el-main-content">
      <ul class="content-model-wrapper">
        <li>
          <el-select
            v-model="committee"
            placeholder="请选择同乡会"
            class="selectIng"
            @change="getOptionLocation()"
          >
            <el-option
              v-for="item in CommitteeOptions"
              :key="item.associationId"
              :label="item.associationName"
              :value="item.associationName"
            ></el-option>
          </el-select>
        </li>
        <li>
          <el-select v-model="departure" placeholder="请选择出发地" class="selectIng">
            <el-option
              v-for="(item,index) in departureOptions"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </li>
        <li>
          <el-select v-model="destination" placeholder="请选择目的地" class="selectIng">
            <el-option
              v-for="(item,index) in departureOptions"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </li>
        <li>
          <div class="block">
            <el-date-picker
              class="selectIng"
              v-model="departureDay"
              type="date"
              placeholder="选择出发日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </li>
        <li>
          <el-time-select
            class="selectIng"
            v-model="epartureTime"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }"
            placeholder="选择出发时间"
          ></el-time-select>
        </li>
        <li>
          <el-input v-model="smallint" type="number" placeholder="请输入座位数" class="selectIng"></el-input>
        </li>
        <li>
          <el-input v-model="price" type="number" placeholder="请输入售价" class="selectIng"></el-input>
        </li>
        <li>
          <el-select v-model="type" placeholder="请选择是否预售" class="selectIng">
            <el-option
              v-for="item in TypeOptions"
              :key="item.id"
              :label="item.type"
              :value="item.id"
            ></el-option>
          </el-select>
        </li>
        <li>
          <el-row>
            <el-button class="releaseButton" @click="addTicket()" :loading="isRelease">发布</el-button>
          </el-row>
        </li>
      </ul>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navName: "校友会包车",
      navPlateName: "添加车辆",
      TypeOptions: [
        //车票类型数据
        {
          id: "1",
          type: "否"
        },
        {
          id: "2",
          type: "是"
        }
      ],
      CommitteeOptions: [], //同乡会数据
      committee: "", //同乡会绑定数据
      departureOptions: [], //上下车地点数据
      departure: "", //出发地
      destination: "", //目的地
      departureDay: "", //出发日期
      epartureTime: "", //出发时间
      smallint: "", //座位数
      price: "", //售价
      type: "", //车票类型
      associationId: -1,
      isRelease: false //是否发布
    };
  },
  computed: {
    //检查参数是否合法
    check() {
      if (this.committee == "") {
        this.$message({
          message: '同乡会名称不能为空',
          type: 'warning'
        });
        return false;
      } else if (this.departure == "") {
        this.$message({
          message: '出发地不能为空',
          type: 'warning'
        });
        return false;
      } else if (this.destination == "") {
        this.$message({
          message: '目的地不能为空',
          type: 'warning'
        });
        return false;
      } else if (this.departure == this.destination) {
        this.$message({
          message: '出发地目的地不能相同',
          type: 'warning'
        });
        return false;
      } else if (this.departureDay == "") {
        this.$message({
          message: '出发日期不能为空',
          type: 'warning'
        });
        return false;
      } else if (this.epartureTime == "") {
        this.$message({
          message: '出发时间不能为空',
          type: 'warning'
        });
        return false;
      } else if (this.epartureTime == "") {
        this.$message({
          message: '出发时间不能为空',
          type: 'warning'
        });
        return false;
      } else if (this.smallint == "") {
        this.$message({
          message: '座位数不能为空',
          type: 'warning'
        });
        return false;
      } else if (this.price == "") {
        this.$message({
          message: '售价不能为空',
          type: 'warning'
        });
        return false;
      } else if (this.type == "") {
        this.$message({
          message: '请选择是否预售',
          type: 'warning'
        });
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.getAssociation(); //获取乡会以及乡会上下车信息
  },
  methods: {
    //获取同乡会数据
    async getAssociation() {
      let that = this;
      this.$http
        .get("getAllAssociation")
        .then(res => {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case 0:
              that.$message({
                message: '没有查询到数据',
                type: 'warning'
              });
              break;
            case 1:
              console.log("查询同乡会成功");
              this.CommitteeOptions = data.data.associationList;
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
    //获取上下车地点数据
    async getLocation(id) {
      let that = this;
      let params = {
        associationId: id,
        startIndex: 1,
        pageSize: 10
      };
      this.$http
        .get("findAllPlaces", { params })
        .then(res => {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          this.departureOptions = "";
          switch (code) {
            case 0:
              that.$message({
                message: '没有查询到数据',
                type: 'warning'
              });
              break;
            case 1:
              console.log("查询上车地点成功");
              this.departureOptions = data.data.placeList;
              break;
            case 2:
              that.$message({
                message: '参数为空',
                type: 'warning'
              });
              break;
            case 3:
              that.$message({
                message: '页码超出最大范围',
                type: 'warning'
              });
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
    //添加同乡会车票
    addTicket() {
      if (this.check) {
        let that = this;
        let params = new URLSearchParams();
        params.append("associationId", this.associationId);
        params.append("departurePlace", this.departure);
        params.append("destination", this.destination);
        params.append("departureDay", this.departureDay);
        params.append("departureTime", this.epartureTime);
        params.append("seatNum", this.smallint);
        params.append("price", this.price);
        params.append("type", this.type);
        this.$http
          .post("addTicket", params)
          .then(function(res) {
            console.log(res.data);
            let data = res.data;
            let code = data.code;
            switch (code) {
              case -1:
                that.$message({
                  message: '添加车票失败！',
                  type: 'warning'
                });
                break;
              case 1:
                that.$message({
                  message: '添加车票成功！',
                  type: 'success'
                });
                this.departureOptions = data.data.placeList;
                break;
              case 2:
                that.$message({
                  message: '参数为空(欠缺)！',
                  type: 'warning'
                });
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
    //更换同乡会时候处理数据
    getOptionLocation() {
      let CommitteeOptions = this.CommitteeOptions;
      this.departure = "";
      this.destination = "";
      for (let i = 0; i < CommitteeOptions.length; i++) {
        if (CommitteeOptions[i].associationName == this.committee) {
          this.associationId = CommitteeOptions[i].associationId;
          this.getLocation(this.associationId);
        }
      }
    }
  },
  components: {}
};
</script>