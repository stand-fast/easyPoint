const template = `<div class="paging">
    <a :class="{disabled: value === 1}" @click="changePage(1)">首页</a>
    <a :class="{disabled: value === 1}" @click="changePage(value - 1)">上一页</a>
    <a class="page-item" :class="{active: value === item}"v-for="item in number" @click="changePage(item)">{{item}}</a>
    <a :class="{disabled: value === pageNumber}" @click="changePage(value + 1)">下一页</a>
    <a :class="{disabled: value === pageNumber}" @click="changePage(pageNumber)">尾页</a>
    <span class="pager-text">
    <i>{{value}}</i> 
    / 
    <i>{{pageNumber}}</i></span>
</div>

`
export default {
    template,
    props: {
        value: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        panelNumber: {
            type: Number,
            default: 5
        },
        pageNumber: {
            type: Number,
            required: true
        },
    },
    computed: {
        number() {
            var min = this.value - Math.floor(this.panelNumber / 2);
            if (min < 1) {
                min = 1;
            }
            var max = min + this.panelNumber - 1;
            if (max > this.pageNumber) {
                max = this.pageNumber
            }
            const arr = [];
            for (let i = min; i <= max; i++) {
                arr.push(i);
            }
            return arr;
        },
    },
    methods: {
        changePage(newPage) {
            if (newPage < 1) {
                newPage = 1;
            } else if (newPage > this.pageNumber) {
                newPage = pageNumber;
            }
            this.$emit("input", newPage);
        },
    },
}