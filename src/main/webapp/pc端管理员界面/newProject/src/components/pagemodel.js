const template = `
    <div class="modelPage"> 
        <div class="modelPageTop">
            <img src="../src/assets/logo.png"/>
            <div class="modelPageTopDetails"><p>易点</p><p>让你的大学生活简单一点</p></div>
        </div>
        <div class="modelPageContent">
            <ul class="PageContentLeft">
                <li class="ContentCard"></li>
                <li class="ContentNavigation" v-for="(item,index) in navigationName" :key="item.id"
                @mouseover="showSecondName(index)" @mouseout="hideSecondName"
                >{{item.name}}
                    <ul v-show="index===isShow" class="navigation-sub">
                        <li  v-for="items in item.secondName" :key="items.id">
                        <a :href="items.url">{{ items.childrenName }}</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    
`;

export default {
    template,
    data() {
        return {
            navigationName: [{
                    id: '1',
                    name: '已加盟商家',
                    secondName: [{
                            id: '1',
                            childrenName: "已加盟企业商家"
                        },
                        {
                            id: '2',
                            childrenName: "已加盟学生商家"
                        },
                    ]
                },
                {
                    id: '2',
                    name: '商家加盟申请',
                    secondName: [{
                            id: '1',
                            childrenName: "企业商家加盟申请"
                        },
                        {
                            id: '2',
                            childrenName: "学生商家加盟申请"
                        },
                    ]
                },
                {
                    id: '3',
                    name: '管理员账号',
                    secondName: [{
                            id: '1',
                            childrenName: "账号申请"
                        },
                        {
                            id: '2',
                            childrenName: "修改密码"
                        },
                        {
                            id: '3',
                            childrenName: "账号管理"
                        },
                    ]
                },
                {
                    id: '4',
                    name: '校友会包车',
                    secondName: [{
                            id: '1',
                            childrenName: "添加同乡会"
                        },
                        {
                            id: '2',
                            childrenName: "添加车辆"
                        },
                        {
                            id: '3',
                            childrenName: "我的发布"
                        },
                    ]
                },
                {
                    id: '5',
                    name: '旅游出行',
                    secondName: [{
                            id: '1',
                            childrenName: "添加发布车辆类型",
                            url: 'AddVehicleType.html'
                        },
                        {
                            id: '2',
                            childrenName: "租车订单",
                            url: 'CarRentalOrder.html',
                        },
                        {
                            id: '3',
                            childrenName: "租车退款订单",
                            url: 'CarRentalRefund.html',
                        },
                    ]
                },
                {
                    id: '6',
                    name: '公告栏',
                    secondName: [{
                        id: '1',
                        childrenName: "当前公告"
                    }, ]
                },
                {
                    id: '7',
                    name: '审核',
                    secondName: [{
                            id: '1',
                            childrenName: "审核1"
                        },
                        {
                            id: '2',
                            childrenName: "审核2"
                        },
                    ]
                }
            ],
            childrenName: [],
            isShow: 0,
        }
    },
    computed: {

    },
    mounted: function () {
        this.isShow = -1
    },
    methods: {
        showSecondName(index) {
            this.isShow = index;
        },
        hideSecondName() {
            this.isShow = !this.isShow;
        }
    },
    components: {}
}