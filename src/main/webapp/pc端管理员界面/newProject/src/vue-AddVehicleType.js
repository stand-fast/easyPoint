import model from "./components/pagemodel.js"
import paging from "./components/paging.js"
const template = `
    <div>
        <model></model>
        <ul class="PageContentRight">
        <div class="PageContentRightTitle">
            <div class="IconTitle"></div>
            <div class="TitleText">{{navName}} > {{navPlateName}}</div>
        </div>
        <div class="PageContent">
            <h1>添加车辆类型</h1>
            <div class="addCommittee">
                <ul>
                    <label>车辆类型:</label><input v-model="location" type="text" />
                    <label>定金:</label><input v-model="deposit" type="text" />
                    <button class="modelButton submitVehicleType" @click="handleAdd">添加</button>
                </ul>
            </div>
            <h1>已添加车辆类型</h1>
            <div class="contentVehicle">
                <ul class="VehicleTitle">
                    <li class="VehicleType">车辆类型</li>
                    <li class="deposit">定金</li>
                    <li class="deleteButton">点击删除</li>
                </ul>
            </div>
            <div id="centent" class="contentVehicle">
                <ul class='VehicleContent' v-for="item in datas" :key="item.vehicleId">
                    <li class='VehicleType'>{{item.vehicleType}}</li>
                    <li class='deposit'>{{item.deposit}}</li>
                    <li class='deleteButtons'  @click="handledelete(item.vehicleId)">删除</li>
                </ul>
            </div>
            <paging :value="current" :pageSize="pageSize" :pageNumber="pageNumber" :panelNumber="panelNumber"
            @input="handlePageChange"></paging>
        </div>
        </ul>
    </div>
`;
const config = {
    el: "#modelPage",
    data() {
        return {
            navName: "旅游出行",
            navPlateName: "添加发布车辆类型",
            location: "",
            deposit: "",
            datas: [],
            pageSize: 10, //每页最大条数
            panelNumber: 5, //最多显示多少个分页按钮
            current: 1, //当前页码
            pageNumber: 5, //页码总数
        }
    },
    computed: {
        check() {
            if (this.location == "") {
                alert('车辆类型不能为空');
                return false;
            } else if (this.deposit == "") {
                alert('定金不能为空');
                return false
            } else if (isNaN(Number(this.deposit, ))) {
                alert('定金不是数字!');
                return false
            } else if ((this.deposit % 1 === 0) == false) {
                alert('定金不是整数!');
                return false
            } else if (this.deposit < 0) { //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
                alert('定金不能为负数');
                return false
            } else {
                return true
            }
        },
    },
    mounted() {
        this.setData();
    },
    methods: {
        async setData() {
            window.onscroll = (e) => e.preventDefault(); //兼容浏览器
            let data = await fetch("http://easypoint.club/getTotalPageAndFirstVehicleInfoList").then(resp => resp.json())
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
                if (confirm("车辆类型 : " + this.location + "\r定金 : " + this.deposit)) {
                    let requestConfig = {
                        method: 'POST',
                        headers: new Headers({
                            'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
                        }),
                        body: new URLSearchParams([
                            ["vehicleType", this.location],
                            ["deposit", this.deposit],
                        ]).toString()
                    }
                    fetch("http://easypoint.club/easyPoint/addNewVehicleInfo", requestConfig).then(function (response) {
                        response.json().then(function (data) {
                            if (data.code == 200) {
                                alert("添加车辆类型成功");
                                that.setData();
                            } else if (data.code == 400) {
                                alert("该车辆类型已存在,请重新输入");
                            }
                        })
                    })
                } else {
                    console.log("你取消了添加");
                }
            }
        },
        handledelete(vehicleId) {
            var that = this;
            if (confirm("确定删除该车辆类型?")) {
                let requestConfig = {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
                    }),
                    body: new URLSearchParams([
                        ["vehicleId", vehicleId]
                    ]).toString()
                }
                fetch("http://easypoint.club/deleteVehicleType", requestConfig).then(function (response) {
                    response.json().then(function (data) {
                        if (data.code == 200) {
                            that.setData();
                            alert("删除车辆类型成功");
                        }
                    })
                })
            } else {
                console.log("您取消了删除！");
            }
        },
        handlePageChange(pageNum) {
            var that = this;
            let requestConfig = {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
                }),
                body: new URLSearchParams([
                    ["pageNum", pageNum]
                ]).toString()
            }
            fetch("http://easypoint.club/findListPageNumVehicleInfo", requestConfig).then(function (response) {
                response.json().then(function (data) {
                    if (data.code == 200) {
                        console.log(data.message);
                        that.current = pageNum;
                        that.datas = data.data;
                    } else if (data.code == 201) {
                        console.log("已经加载完全部数据");
                    }
                })
            })


        }
    },
    components: {
        model,
        paging
    },
    template,
}

new Vue(config)