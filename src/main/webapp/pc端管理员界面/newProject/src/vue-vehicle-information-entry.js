import model from "./components/pagemodel.js"
const template = `
    <div>
        <model></model>
        <ul class="PageContentRight">
        <div class="PageContentRightTitle">
            <div class="IconTitle"></div>
            <div class="TitleText">{{navName}} > {{navPlateName}}</div>
        </div>
        <div class="PageContent">
            <h1>车辆信息</h1>
            
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

    },
    components: {
        model,
    },
    template,
}