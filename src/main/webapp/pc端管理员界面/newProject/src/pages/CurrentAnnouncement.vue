<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>小程序公告</h1>
        <div class="AnnounceMent">
          <li></li>
          <li></li>
          <li></li>
        </div>
        <h1>商家公告</h1>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navName: "公告栏",
      navPlateName: "当前公告",
      datas: []
    };
  },
  computed: {
    check() {
      if (this.location == "") {
        alert("车辆类型不能为空");
        return false;
      } else if (this.deposit == "") {
        alert("定金不能为空");
        return false;
      } else if (isNaN(Number(this.deposit))) {
        alert("定金不是数字!");
        return false;
      } else if ((this.deposit % 1 === 0) == false) {
        alert("定金不是整数!");
        return false;
      } else if (this.deposit < 0) {
        //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
        alert("定金不能为负数");
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    //this.setData();
  },
  methods: {
    async setData() {
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      let data = await fetch(
        "http://easypoint.club/getTotalPageAndFirstVehicleInfoList"
      ).then(resp => resp.json());
      console.log(data.data);
      if (data.code == 200) {
        console.log("查询总页数和车辆类型成功");
        this.current = 1;
        this.pageNumber = data.data.totalPage;
        this.datas = data.data.vehicleInfoList;
      } else if (data.code == 201) {
        alert("暂无车辆类型数据，请管理员添加");
      }
    },
    handleAdd() {
      var that = this;
      if (this.check == true) {
        if (
          confirm("车辆类型 : " + this.location + "\r定金 : " + this.deposit)
        ) {
          let requestConfig = {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/x-www-form-urlencoded" // 指定提交方式为表单提交
            }),
            body: new URLSearchParams([
              ["vehicleType", this.location],
              ["deposit", this.deposit]
            ]).toString()
          };
          fetch(
            "http://easypoint.club/easyPoint/addNewVehicleInfo",
            requestConfig
          ).then(function(response) {
            response.json().then(function(data) {
              if (data.code == 200) {
                alert("添加车辆类型成功");
                that.setData();
              } else if (data.code == 400) {
                alert("该车辆类型已存在,请重新输入");
              }
            });
          });
        } else {
          console.log("你取消了添加");
        }
      }
    },
    handledelete(vehicleId) {
      var that = this;
      if (confirm("确定删除该车辆类型?")) {
        let requestConfig = {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded" // 指定提交方式为表单提交
          }),
          body: new URLSearchParams([["vehicleId", vehicleId]]).toString()
        };
        fetch("http://easypoint.club/deleteVehicleType", requestConfig).then(
          function(response) {
            response.json().then(function(data) {
              if (data.code == 200) {
                that.setData();
                alert("删除车辆类型成功");
              }
            });
          }
        );
      } else {
        console.log("您取消了删除！");
      }
    },
    handlePageChange(pageNum) {
      var that = this;
      let requestConfig = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded" // 指定提交方式为表单提交
        }),
        body: new URLSearchParams([["pageNum", pageNum]]).toString()
      };
      fetch(
        "http://easypoint.club/findListPageNumVehicleInfo",
        requestConfig
      ).then(function(response) {
        response.json().then(function(data) {
          if (data.code == 200) {
            console.log(data.message);
            that.current = pageNum;
            that.datas = data.data;
          } else if (data.code == 201) {
            console.log("已经加载完全部数据");
          }
        });
      });
    }
  },
  components: {}
};
</script>
<style>
</style>