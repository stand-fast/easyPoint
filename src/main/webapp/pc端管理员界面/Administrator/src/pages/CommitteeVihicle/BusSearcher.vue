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
            <el-select v-model="committee" placeholder="请选择同乡会" class="selectIng" @change="getOptionLocation()">
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
                :value="item.type"
              ></el-option>
            </el-select>
          </li>
          <li>
            <el-row>
              <el-button
                class="releaseButton"
                @click="addTicket()"
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
      associationId:-1,
      isRelease: false, //是否发布
      departureOptions:[]
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

  },
  mounted() {
    this.getAssociation();  //获取乡会以及乡会上下车信息
  },
  methods: {
    async getAssociation() {
      var url="https://easypoint.club/administrator/getAllAssociation"
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .get(url)
        .then((res) => {
          console.log(res.data);
          var data = res.data;
          switch(data.code){
            case 0:
              alert("没有查询到数据")
              break;
            case 1:
              console.log("查询同乡会成功")
              this.CommitteeOptions=data.data.associationList
              break;          
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },    
    async getLocation(id) {
      var postData= {params:{
          associationId:id,
          startIndex:1,
          pageSize:10        
        }
      };
      var url="https://easypoint.club/administrator/findAllPlaces"
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .get(url,postData)
        .then((res) => {
          console.log(res.data);
          var data = res.data;
          switch(data.code){
            case 0:
              alert("没有查询到数据")
              break;
            case 1:
              console.log("查询上车地点成功")
              this.departureOptions=data.data.placeList
              break;
            case 2:
              alert("参数为空")
              break;   
            case 3:
              alert("页码超出最大范围")
              break;          
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },    
    async addTicket() {
      var typeNum;
      if(this.type=="否"){
        typeNum=1
      }else{
        typeNum=2
      }
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      var qs = require('qs')
      var url="https://easypoint.club/administrator/addTicket"
      var postData=qs.stringify({
        associationId:this.associationId,
        departurePlace:this.departure,
        destination:this.destination,
        departureDay:this.departureDay,
        departureTime:this.epartureTime,
        seatNum:this.smallint,
        price:this.price,
        type: typeNum
      })
      this.$http
        .post(url,postData)
        .then(function(res) {
          console.log(res.data);
          var data = res.data;
          switch(data.code){
            case -1:
              alert("添加车票失败！")
              break;
            case 1:
              alert("添加车票成功！")
              this.departureOptions=data.data.placeList
              break;
            case 2:
              alert("参数为空(欠缺)！	")
              break;         
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    getOptionLocation() {
      var CommitteeOptions = this.CommitteeOptions;
      this.departure = "";
      this.destination = "";
      for (var i = 0; i < CommitteeOptions.length; i++) {
        if (CommitteeOptions[i].associationName == this.committee) {
          this.associationId=CommitteeOptions[i].associationId
          this.getLocation(this.associationId)
        }
      }
    },    
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