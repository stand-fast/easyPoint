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
            
        </div>
        </ul>
    </div>
`;
const config = {
    el: "#modelPage",
    data() {
        return {
            navName: "旅游出行",
            navPlateName: "租车订单",
            location: "",
            deposit: "",
            datas: [],
            pageSize: 10, //每页最大条数
            panelNumber: 5, //最多显示多少个分页按钮
            current: 1, //当前页码
            pageNumber: 5, //页码总数
        }
    },
    mounted() {
        //this.setData();
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