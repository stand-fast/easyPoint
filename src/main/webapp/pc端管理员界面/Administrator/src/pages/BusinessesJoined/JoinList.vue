<template>
  <div class="PageContentRight" ref="scrollScope">
      <div class="PageContentRightTitle">
          <div class="IconTitle"></div>
          <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="list-wapper">
          <div class="list-element" v-for="item in companyList" :key="item.id">
              <div class="list-title">
                <img class="company-logo" :src="item.logo" alt="公司logo">
                <span class="company-name">{{item.name}}</span>   
                <button class="company-nopass">不通过审核</button>
                <button class="company-pass">通过审核</button>
                <i title="详情" class="iconfont" @click="showDetail(item.id)">&#xe645;</i>
              </div>
              <ul class="list-main">
                <li><i class="iconfont">&#xe63d;</i>{{item.principal}}</li>  
                <li><i class="iconfont">&#xe601;</i>{{item.phone}}</li>  
                <li><i class="iconfont">&#xe613;</i>{{item.address}}</li>  
              </ul>
              <transition name="fold">
                <div class="list-detail"  v-show="item.id===showDetailId">
                  <p>经营范围：{{item.scope}}</p>
                  <p>营业执照：<img :src="item.license" class="list-license" :class="{'active':isChoose}"
                   :style="{top:computeTop()}" @click="pictureEnlarge()"/></p>
                </div>
              </transition>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isChoose:false,
      showCover:false,
      boxshow:false,
      navName: "商家加盟申请",
      navPlateName: "企业商家加盟申请",
      showDetailId:-1,
      companyList:[
        {
          id:1,
          logo:"https://ss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/838ba61ea8d3fd1fc9688ab03e4e251f94ca5fd2.jpg",
          name:"阿里巴巴（中国）有限公司",
          principal:"马云",
          phone:"571-8502-2088",
          address:"中国浙江省杭州市余杭区文一西路969号 (311121)",
          scope:"企业管理服务；网络技术、计算机软硬件技术、多媒体技术开发；计算机软硬件的生产、研发、销售；计算机系统集成；计算机技术咨询服务；网络运行维护；商务信息咨询以及其他按法律、法规、国务院决定等规定未禁止和不需经营许可的项目。（依法须经批准的项目，经相关部门批准后方可开展经营活动）",
          license:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573108493806&di=a2f4f55578a1eab55997d2eac86f7604&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180308%2Fb4a8256425b54839b56b2ce31a7104e5.jpeg"
        },
        {
          id:2,
          logo:"https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/20d5c57e839fa986939e2e6aec94728b_222_222.jpg",
          name:"北京京东世纪贸易有限公司",
          principal:"刘强东",
          phone:"	400-026-0000",
          address:"北京亦庄经济技术开发区科创十一街18号院",
          scope:"网络零售服务",
          license:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573109679409&di=f7192b5dfba565595dd6b5cfc63b5162&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180828%2Ff9f9cc0632704bfa84b87bae54272f88.jpeg"          
        },
        {
          id:3,
          logo:"https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3454287881,1471505445&fm=58",
          name:"亚马逊公司",
          principal:"杰夫·贝佐斯",
          phone:"206 622 2335",
          address:"410 Terry Avenue North,Seattle, WA 98109",
          scope:"书籍、电子产品、家居产品等",
          license:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573110036596&di=736e7782c9f74ecd5b198a0c0ee406e4&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180224%2Fb6ca3561f902499989e3a78a5b5f15db.jpg"          
        },
        {
          id:4,
          logo:"https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3454287881,1471505445&fm=58",
          name:"亚马逊公司",
          principal:"杰夫·贝佐斯",
          phone:"206 622 2335",
          address:"410 Terry Avenue North,Seattle, WA 98109",
          scope:"书籍、电子产品、家居产品等",
          license:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573110036596&di=736e7782c9f74ecd5b198a0c0ee406e4&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180224%2Fb6ca3561f902499989e3a78a5b5f15db.jpg"          
        },
        {
          id:5,
          logo:"https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3454287881,1471505445&fm=58",
          name:"亚马逊公司",
          principal:"杰夫·贝佐斯",
          phone:"206 622 2335",
          address:"410 Terry Avenue North,Seattle, WA 98109",
          scope:"书籍、电子产品、家居产品等",
          license:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573110036596&di=736e7782c9f74ecd5b198a0c0ee406e4&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180224%2Fb6ca3561f902499989e3a78a5b5f15db.jpg"          
        }
      ]
    };
  },
  methods: {
    showDetail(id){
      if(this.showDetailId==id){
          this.showDetailId=-1
      }else{
          this.showDetailId=id
      }
    },
    pictureEnlarge(){
      this.showCover=!this.showCover
      this.isChoose = !this.isChoose  
    },
    computeTop(id){
      if(this.$refs.scrollScope){
        return this.$refs.scrollScope.scrollTop+'px'
      }
    }
  }
};
</script>
<style scoped>
  .list-wapper{
    margin-top: 10px;
    margin-left: 10px;
    width: calc(100% - 20px);
  }
  .list-element{
    background-color: white;
    padding: 15px 20px 20px 30px;
    box-sizing: border-box;
    color: #666666;
    margin-bottom: 10px;
  }
  .list-title{
    overflow: hidden;
    padding-bottom: 10px;
    border-bottom: 0.5px solid #e9e9e9;
    margin-bottom: 10px;
  }
  .list-title>i,.list-title>button{
    margin-left: 6px;
    display: block;
    float: right;
    cursor: pointer;
  }
  .list-title>button{
    border: 0;
    line-height: 25px;
    border-radius: 2px;
    color: white;
    outline: none;
  }
  .company-nopass{
    background-color: #ff9047;
    width: 80px;
  }
  .company-pass{
    background-color: #72ab6f;
    width: 70px;
  }
  .company-logo{
    width: 1.5rem;
    border-radius: 2px;
    float: left;
  }
  .company-name{
    display: inline-block;
    line-height: 1.5rem;
    padding-left: 10px;
  }
  .list-main,.list-detail{
    font-size: 0.8rem;
  }
  .list-main .iconfont{
    padding-right: 5px;
    display: inline-block;
    font-size: 0.7rem;
    color: #aeaeae
  }
  .list-main>li{
    line-height: 1.3rem;
  }
  .list-detail{
    overflow: auto;
    max-height:300px;
    line-height: 1.3rem;
  }
  .list-detail>p{
    width: 88%
  }
  .list-license{
    display: block;
    width: 300px;
  }
  .fold-enter-active, .fold-leave-active {
    transition: all 1.5s ease-in-out;
  }
  .fold-enter, .fold-leave-to {
    max-height: 0;
  }

  .list-detail::-webkit-scrollbar {
    width: 6px;
    background-color: #ffffff;
  }

  .list-detail::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #e9e9e9;
  }

  .PageContentRight::-webkit-scrollbar {
    width: 6px;
    background-color: #e9e9e9;
  }

  .PageContentRight::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #b9b9b9;
  }

   img.active {     
    position: absolute;
    top: 6%;
    width: 93%;
    box-shadow: 0px 0px 25px #04040459;
  }   



  @font-face {
    font-family: 'iconfont';  /* project id 1296117 */
    src: url('//at.alicdn.com/t/font_1296117_y6lxvjhboda.eot');
    src: url('//at.alicdn.com/t/font_1296117_y6lxvjhboda.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1296117_y6lxvjhboda.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1296117_y6lxvjhboda.woff') format('woff'),
    url('//at.alicdn.com/t/font_1296117_y6lxvjhboda.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1296117_y6lxvjhboda.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5rem;
  }

</style>