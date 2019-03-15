<template>
    <div class="registra-box">
        <header>
            <div class="normal-width header-search">
                <div class="logo-img fl pointer-cursor" @click="toHome"></div>
                <div class="fr">
                    <div class="phone-img"></div>
                    <span>客服电话：<span v-html="hotLine"></span></span>
                </div>
            </div>
        </header>
        <router-view></router-view>
        <div class="foot-copyright-cover">
            <div class="foot-copyright">
                <ul class="linkstring">
                    <li><router-link :to="{name:'tourist'}">免费注册</router-link></li>
                    <li><a @click="toBtLink1(7)">关于我们</a></li>
                    <li><a @click="toBtLink1(9)">联系我们</a></li>
                    <li><a @click="toBtLink1(10)">招聘英才</a></li>
                    <li><a @click="toBtLink(items1[0].amid+';1')">帮助中心</a></li>
                    <!--<li><a>我要投诉</a></li>-->
                </ul>
                <div>
                    <!--target="_blank" href="http://www.miibeian.gov.cn/"-->
                    <a class="z-csr1" v-html="footFirstLine"></a>
                    <a href="http://www.hqyatu.com/" target="_blank">提供技术支持 服务热线：(+86)755-88328999</a>
                </div>
                <a target="_blank" href="https://szcert.ebs.org.cn/6a26c5af-103e-4874-8546-65134b181233"><div class="guohui"></div></a>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapActions} from 'vuex'
    export default {
        name: "hdFt",
        computed:{
            ...mapState({
            hotLine: () => sessionStorage.getItem('hotLine'),
                footFirstLine: state => state.home.footFirstLine||sessionStorage.getItem('footFirstLine'),
                items1: state => state.home.items1,
        }),
        },
        methods:{
            ...mapActions([
               'changeMenuFlag1',
               'changeMenuFlag2',
                'rqHomeBt'
            ]),
            ...mapMutations([
                'changeActiveName'
            ]),
            toBtLink1(id){
                this.$router.push({name:'bottomLinkMenu1',params:{id: id}});
            },
            toHome () {
                this.changeActiveName('1');
                this.$router.push({
                    name: 'index'
                });
            },
            toBtLink (id){
                // sessionStorage.setItem('menuFlag1',id.split(';')[0]);
                this.changeMenuFlag1(id.split(';')[0]);
                // sessionStorage.setItem('menuFlag2',id.split(';')[1]);
                this.changeMenuFlag2(id.split(';')[1]);
                this.$router.push({name:'bottomLinkMenu'});
            },
        },
        // mounted(){
        //     this.rqHomeBt('2');
        // }
    }
</script>

<style scoped lang="less">
    .phone-img{
        margin: 0 5px -2px 0;
        /*display: inline-block;*/
        width: 14px;
        height: 14px;
        background: url('../../assets/icon_tel.png') no-repeat;
    }
    header{
        margin-bottom: 24px;
        font: 12px SourceHanSansCN-Regular;
        color: #5E5E60;
        background: #fff;
    }
    .foot-copyright{
        /*width: 100%;*/
        height: 220px;
        padding-top: 55px;
        overflow: hidden;
        &-cover{
            background: #222834;
        }
    }
    .linkstring{
        display: inline-block;
        margin:0 auto 24px ;
        -webkit-transform: translate(0);
        -ms-transform: translate(0);
        -moz-transform: translate(0);
        -o-transform: translate(0);
        transform:translate(0);
       li{
           a {
               color: #fff;
           }
       }
    }
    .foot-copyright-cover{
        margin-top: 25px;
    }
    .registra-box{
        background: #F5F8FB;
    }
</style>