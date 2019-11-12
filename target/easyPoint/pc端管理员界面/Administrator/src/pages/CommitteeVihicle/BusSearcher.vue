<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>添加车辆</h1>
        <ul class="BusSearcherInput">
          <li>
            <el-select v-model="committee" placeholder="请选择同乡会" class="selectIng">
              <el-option
                v-for="item in CommitteeOptions"
                :key="item.committeeId"
                :label="item.committee"
                :value="item.committee"
              ></el-option>
            </el-select>
          </li>
          <li>
            <el-select v-model="departure" placeholder="请选择出发地" class="selectIng">
              <el-option
                v-for="item in departureOptions"
                :key="item.placeId"
                :label="item.placeName"
                :value="item.placeName"
              ></el-option>
            </el-select>
          </li>
          <li>
            <el-select v-model="destination" placeholder="请选择目的地" class="selectIng">
              <el-option
                v-for="item in departureOptions"
                :key="item.placeId"
                :label="item.placeName"
                :value="item.placeName"
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
                :value="item.type"
              ></el-option>
            </el-select>
          </li>
          <li>
            <el-row>
              <el-button
                class="releaseButton"
                @click="releaseVehicleBus"
                :loading="isRelease"
                type="success"
              >发布</el-button>
            </el-row>
          </li>
        </ul>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navName: "校友会包车",
      navPlateName: "添加车辆",
      datas: [],
      addAssociation: "",
      //组件
      CommitteeOptions: [
        {
          committeeId: "1",
          committee: "汕头同乡会",
          CommitteePalace: [
            {
              placeId: "1",
              placeName: "汕头1"
            },
            {
              placeId: "2",
              placeName: "汕头2"
            },
            {
              placeId: "3",
              placeName: "汕头3"
            }
          ]
        },
        {
          committeeId: "12",
          committee: "丰顺同乡会",
          CommitteePalace: [
            {
              placeId: "1",
              placeName: "丰顺1"
            },
            {
              placeId: "2",
              placeName: "丰顺2"
            },
            {
              placeId: "3",
              placeName: "丰顺3"
            }
          ]
        },
        {
          committeeId: "123",
          committee: "普宁同乡会",
          CommitteePalace: [
            {
              placeId: "1",
              placeName: "普宁1"
            },
            {
              placeId: "2",
              placeName: "普宁2"
            },
            {
              placeId: "3",
              placeName: "普宁3"
            }
          ]
        }
      ],
      TypeOptions: [
        {
          id: "1",
          type: "否"
        },
        {
          id: "2",
          type: "是"
        }
      ],
      committee: "",
      departure: "",
      destination: "",
      departureDay: "",
      epartureTime: "",
      smallint: "",
      price: "",
      type: "",
      isRelease: false //是否发布
    };
  },
  computed: {
    check() {
      if (this.committee == "") {
        alert("同乡会名称不能为空");
        return false;
      } else if (this.departure == "") {
        alert("出发地不能为空");
        return false;
      } else if (this.destination == "") {
        alert("目的地不能为空");
        return false;
      } else if (this.departure == this.destination) {
        alert("出发地目的地不能相同");
        return false;
      } else if (this.departureDay == "") {
        alert("出发日期不能为空");
        return false;
      } else if (this.epartureTime == "") {
        alert("出发时间不能为空");
        return false;
      } else if (this.epartureTime == "") {
        alert("出发时间不能为空");
        return false;
      } else if (this.smallint == "") {
        alert("座位数不能为空");
        return false;
      } else if (this.price == "") {
        alert("售价不能为空");
        return false;
      } else if (this.type == "") {
        alert("请选择是否预售");
        return false;
      } else {
        return true;
      }
    },
    departureOptions() {
      var CommitteeOptions = this.CommitteeOptions;
      this.departure = "";
      this.destination = "";
      for (var i = 0; i < CommitteeOptions.length; i++) {
        if (CommitteeOptions[i].committee == this.committee) {
          return CommitteeOptions[i].CommitteePalace;
        }
      }
    }
  },
  mounted() {
    //this.setData();  //获取乡会以及乡会上下车信息
  },
  methods: {
    async setData() {
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .get("接口路径")
        .then(function(res) {
          console.log(res.data);
          var data = res.data;
          if (data.code == 200) {
            that.pageNumber = data.data.totalPage;
            that.datas = data.data.partTourismOrderInfos;
            console.log("查询订单页数以及首页订单信息成功");
          } else if (data.code == 201) {
            alert("暂无订单信息");
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    releaseVehicleBus() {
      var that = this;
      if (this.check == true) {
        if (
          confirm(
            "同乡会名称 : " +
              this.committee +
              "\r出发地 : " +
              this.departure +
              "\r目的地 : " +
              this.destination +
              "\r出发日期 : " +
              this.departureDay +
              "\r出发时间 : " +
              this.epartureTime +
              "\r座位数 : " +
              this.smallint +
              "\r售价 : " +
              this.price +
              "\r是否预售 : " +
              this.type
          )
        ) {
          this.isRelease = true;
          this.$http
            .get("easyPoint/addNewVehicleInfo", {
              params: {
                committee: that.committee,
                departure: that.departure,
                destination: that.destination,
                departureDay: that.departureDay,
                epartureTime: that.epartureTime,
                smallint: that.smallint,
                price: that.price,
                type: that.type
              }
            })
            .then(function(res) {
              console.log(res.data);
              var data = res.data;
              if (data.code == 200) {
                this.isRelease = false;
                alert("添加车辆成功");
              } else if (data.code == 400) {
                alert("该车辆已存在,请重新发布");
              }
            })
            .catch(function(e) {
              console.log(e);
            });
        } else {
          console.log("你取消了添加");
        }
      }
    }
  },
  components: {}
};
</script>
<style scoped>
.BusSearcherInput li {
  margin-top: 10px;
  width: 100%;
  text-align: center;
}
.selectIng {
  width: 200px !important;
}
.releaseButton {
  width: 120px !important;
  font-size: 15px !important;
  background-color: #8fd68b !important;
}
</style>