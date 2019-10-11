const template = `
    <div>
        <ul class="PageContentRight">
        <div class="PageContentRightTitle">
            <div class="IconTitle"></div>
            <div class="TitleText">{{navName}} > {{navPlateName}}</div>
        </div>
        <div class="PageContent">
            <h1>车辆信息</h1>
            <ul class="vehicleInfor">
                <li><input placeholder="车牌号"></input></li>
                <li><input placeholder="车辆类型"></input></li>
                <li><input placeholder="车身颜色"></input></li>
                <li><input placeholder="司机姓名"></input></li>
                <li><input placeholder="司机联系方式"></input></li>
            </ul>
        </div>
        </ul>
    </div>
`;
export default {
    data() {
        return {
            navName: "旅游出行",
            navPlateName: "车辆信息",
            datas: [],
        }
    },
    mounted() {
        const id = this.$route.params.id;
        console.log("根据" + id + "请求数据");
        this.setData(id);
    },
    methods: {
        async setData(id) {
            var that = this;
            window.onscroll = (e) => e.preventDefault(); //兼容浏览器
            let requestConfig = {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
                }),
                body: new URLSearchParams([
                    ["travelOrderId", 10]
                ]).toString()
            }
            fetch("http://easypoint.club/findDriverInfo", requestConfig).then(function (response) {
                response.json().then(function (data) {
                    if (data.code == 200) {
                        console.log(data);
                        console.log("查询数据成功");
                    } else if (data.code == 201) {
                        console.log("已经加载完全部数据");
                    }
                })
            })

        },

    },
    template,
}