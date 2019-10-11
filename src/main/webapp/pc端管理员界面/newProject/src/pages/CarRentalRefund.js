import paging from "../components/paging.js"
const template = `
    <div>
        <ul class="PageContentRight">
        <div class="PageContentRightTitle">
            <div class="IconTitle"></div>
            <div class="TitleText">{{navName}} > {{navPlateName}}</div>
        </div>
        <div class="PageContent">
            <h1>租车退款订单</h1>
            <div class="renderOrderNav title">
                <li class="navBigger">出发地</li>
                <li class="navBigger">目的地</li>
                <li class="navTime">出发时间</li>
                <li class="navmiddle">类型</li>
                <li class="navSmall">定金</li>
                <li class="navSmall">购买保险</li>
                <li class="navmiddle">姓名</li>
                <li class="navmiddle">手机号码</li>
                <li class="navSmall">订单状态</li>
                <li class="navmiddle">退款原因</li>
                <li class="navSmall">删除</li>
                <li class="navSmall">退款</li>
            </div>
            <div class="renderOrderNav type">
                <li class="navBigger">广州市区广州市区广州市区</li>
                <li class="navBigger">广州市区广州市区广州市区</li>
                <li class="navTime">2019-10-01 08:30:00.0</li>
                <li class="navmiddle">53座的大巴</li>
                <li class="navSmall">1000</li>
                <li class="navSmall">是</li>
                <li class="navmiddle">卢本伟</li>
                <li class="navmiddle">13012313211</li>
                <li class="navSmall">未安排</li>
                <li class="navmiddle enter" @click="refundReason(123123)">退款原因</li>
                <li class="navSmall enter" @click="deleteOrder(123)">删除</li>
                <li class="navSmall enter" @click="refundOrder(123123)">退款</li>
            </div>
            <div class="renderOrderNav type">
                <li class="navBigger">广州市区广州市区广州市区</li>
                <li class="navBigger">广州市区广州市区广州市区</li>
                <li class="navTime">2019-10-01 08:30:00.0</li>
                <li class="navmiddle">53座的大巴</li>
                <li class="navSmall">1000</li>
                <li class="navSmall">是</li>
                <li class="navmiddle">卢本伟</li>
                <li class="navmiddle">13012313211</li>
                <li class="navSmall">未安排</li>
                <li class="navmiddle enter" @click="refundReason(123123)">退款原因</li>
                <li class="navSmall enter" @click="deleteOrder(123)">删除</li>
                <li class="navSmall enter" @click="refundOrder(123123)">退款</li>
            </div>
            <paging :value="current" :pageSize="pageSize" :pageNumber="pageNumber" :panelNumber="panelNumber"
            @input="handlePageChange"></paging>
        </div>
        </ul>
    </div>
`;

export default {
    data() {
        return {
            navName: "旅游出行",
            navPlateName: "租车退款订单",
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
            let data = await fetch("http://easypoint.club/getTotalPageAndFirstTourismOrderInfoList").then(resp => resp.json())
            console.log(data.data);
            if (data.code == 200) {
                this.pageNumber = data.data.totalPage;
                this.datas = data.data.partTourismOrderInfos;
                console.log("查询订单页数以及首页订单信息成功");
            } else if (data.code == 201) {
                alert("暂无订单信息");
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
            fetch("http://easypoint.club/findListPageNumTourismOrderInfo", requestConfig).then(function (response) {
                response.json().then(function (data) {
                    if (data.code == 200) {
                        console.log(data);
                        console.log(data.message);
                        that.current = pageNum;
                        that.datas = data.data;
                    } else if (data.code == 201) {
                        console.log("已经加载完全部数据");
                    }
                })
            })
        },
        refundReason(id) {
            console.log(id)
        },
        deleteOrder(id) {
            console.log(id)
        },
        refundOrder(id) {
            console.log(id)
        }
    },
    components: {
        paging,
    },
    template,
}