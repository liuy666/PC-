<style lang="less" scoped>
    #app{
        position: relative;
        header,footer{
        font-family: 'SourceHanSansCN-Regular';
        }
        .advantage-bottom{
            font-family: 'SourceHanSansCN-Regular';
            h3 {
                font-family: 'SourceHanSansCN-Bold';
            }
        }
        .info-nav{
            font-family: 'SourceHanSansCN-Regular';
            h3{
                font-family: 'SourceHanSansCN-Medium';
            }
            .text-underline {
                &:hover {
                    text-decoration: underline;
                }
            }
        }

        // 登录
        #login {
            width: 100%;
            height: 100%;
            background-color: #F5F8FB;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 9999;
            font-size: 14px;
            display: none;
            h3{
                text-align: center;
            }
            .login-box{

                width: 860px;
                height: 544px;
                margin: 115px auto 165px;

                overflow: hidden;
                /*border: 1px solid #ccc;*/
                >div{
                    float: left;
                    &:first-child{
                        width: 400px;
                        height: 544px;
                        background: #ccc;
                    }
                    &:last-child{
                        width: 460px;
                        height: 544px;
                        padding: 80px;
                        background: #fff;

                    }
                }

                .z-bdr{
                    margin-top: 46px
                }

                button{
                    margin: 48px 0;
                }

                .ivu-checkbox-wrapper{
                    font-size: 14px;
                }

                .middle-a{
                    margin: 0 30px;
                }
            }
            /*.linkstring{*/
                 /*margin-bottom: 38px;*/
            /*}*/
            .foot-copyright{
                margin-left: -40px;
                background: transparent;
                font-size: 12px;
                color: #AFB0B3;
            }
        }

        .linkstring{
            display: inline-block;
            margin: 0 0 24px 0;
            transform:translate(0);
            li{
                a {
                    color: #fff;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }

    }

    .phone-img{
        margin: 0 5px -2px 0;
        /*display: inline-block;*/
        width: 14px;
        height: 14px;
        background: url('./assets/icon_tel.png') no-repeat;
    }

    /* liuy 改写 2018-8-23 11:36:08*/
    .header-search-wrap {
        // border-bottom: 1px solid #ececec;
    }
    #swiper {
        width: 100%;
    }
    #logo {
        width: 262px;
        height: 32px;
        overflow: hidden;
        float: left;
        margin-top: 27px;
        .logo_wrap {
            display: block;
            width: 262px;
            height: 32px;
            cursor: pointer;
            img {
                width: 262px;
                height: 32px;
                float: left;
            }
            span {
                display: none;
            }
        }
    }
</style>

<template>
    <div id="app">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <!-- 头部 -->
        <header>
            <!-- 登录/注销入口 -->
            <div class="entrance">
                <div class="normal-width header-top">
                    <div class="fr">
                        <span>(24小时)&nbsp;国内热线：</span>
                        <div class="phone-img"></div>
                        <span style="margin-right: 70px"> {{ tel }}</span>
                        <span v-if="!userName">
                            <a @click="showLogin">请登录</a>&nbsp;|&nbsp;<router-link :to="{name:'tourist'}">免费注册</router-link>
                        </span>
                        <span v-else>
                            <span>{{ userName }},您好！</span>&nbsp;|&nbsp;<a @click="logout">注销</a>&nbsp;|&nbsp;<a @click="goUserCenter">我的账户</a>
                        </span>
                    </div>
                </div>
            </div>

            <!-- 头部logo/其他icon -->
            <div class="header-search-wrap">
                <div class="width-1200 header-search">
                    <div id="logo">
                        <h1>
                            <span class="logo_wrap">
                                <img v-if="!logo" @click="toHome" src="./assets/logo1.svg" alt="" />
                                <img v-else @click="toHome" :src="logo" alt="logo图片">
                                <span>易旅通</span>
                            </span>
                        </h1>
                    </div>
                    <ul class="fr advantage-nav">
                        <li>
                            <div class="advantage-icon advantage-icon-1">
                            </div>
                            <p>24小时服务</p>
                        </li>
                        <li>
                            <div class="advantage-icon advantage-icon-2">
                            </div>
                            <p>退订保障</p>
                        </li>
                        <li>
                            <div class="advantage-icon advantage-icon-3">
                            </div>
                            <p>入园保障</p>
                        </li>
                        <li>
                            <div class="advantage-icon advantage-icon-4">
                            </div>
                            <p>出票保证</p>
                        </li>
                    </ul>
                </div>
            </div>


        </header>
        <!-- 页面主体路由 -->
        <router-view></router-view>

        <!-- 底部展示区 -->
        <section class="advantage-bottom">
            <ul class="advantage-bottom-ul clearAll">
                <li>
                    <div class="md-logo md-logo-1"></div>
                    <div>
                        <h3>出票保证</h3>
                        <p>因特殊情况影响出行，保证退订</p>
                    </div>
                </li>
                <li>
                    <div class="md-logo md-logo-2"></div>
                    <div>
                        <h3>入园保障</h3>
                        <p>快速响应，全年无休</p>
                    </div>
                </li>
                <li>
                    <div class="md-logo md-logo-3"></div>
                    <div>
                        <h3>退订保障</h3>
                        <p>因特殊情况影响出行，保证退订</p>
                    </div>
                </li>
                <li>
                    <div class="md-logo md-logo-4"></div>
                    <div>
                        <h3>24小时服务</h3>
                        <p>快速响应，全年无休</p>
                    </div>
                </li>
            </ul>
        </section>

        <!-- 底部链接1 -->
        <section class="info-nav">
            <ul class="info-nav-ul">
                <li v-for="(item,idx) in links" :key="idx">
                    <h3>{{ item.label }}</h3>
                    <ul>
                        <li
                            v-for="(cItem,cIndex) in item.list"
                            :key="cIndex"
                            class="pointer-cursor text-underline"
                            @click="gotoArticle(cItem)">{{ cItem.amtopicf }}</li>
                    </ul>
                </li>
            </ul>
        </section>

        <!-- 底部链接2 -->
        <footer>
            <section class="foot-copyright">
                <div>
                    <ul class="linkstring">
                        <li><router-link :to="{name:'tourist'}">免费注册</router-link></li>
                        <li><a @click="gotoList(7)">关于我们</a></li>
                        <li><a @click="gotoList(9)">联系我们</a></li>
                        <li><a @click="gotoList(10)">招聘英才</a></li>
                        <li><a @click="gotoList(2)">帮助中心</a></li>
                    </ul>
                    <a class="z-csr1">{{ copyright }}</a>
                    <a href="http://www.hqyatu.com/" target="_blank">环球雅途集团有限公司提供技术支持</a>
                </div>
                <a target="_blank" href="https://szcert.ebs.org.cn/6a26c5af-103e-4874-8546-65134b181233"><div class="guohui"></div></a>
            </section>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                tel: '',
                logo: '',
                copyright: '',
                isShowLoading: false,
                links: [],
                route: 'ticket'
            }
        },
        async created() {
            this.$store.commit('setUserName');    //防止页面刷新vuex用户名清空的问题
            const baseInfo = await this.$api.get2(this.lee + '/ec/home/v1/getHomeBaseInfo',{
                url: window.location.hostname,
                usid: sessionStorage.getItem('userName')
            });
            // console.log(baseInfo);
            if(!baseInfo) {
                return;
            }

            if(!baseInfo.data.domain) {
                return;
            }

            // sessionStorage.setItem('pictureList',JSON.stringify(baseInfo.data.listPics));
            if(!baseInfo.data.domain.logoMark) {
                return;
            }

            // 初始化logo/国内热线/底部版权信息
            this.tel = baseInfo.data.domain.logoMark.split('#')[0];
            this.logo = baseInfo.data.domain.logoPic;
            // console.log(this.logo)
            this.copyright = baseInfo.data.domain.logoMark.split('#')[1];
            this.links = [
                {
                    label: '订单指南',
                    list: baseInfo.data.helpdoc1,
                },
                {
                    label: '注册与登录',
                    list: baseInfo.data.helpdoc2,
                },
                {
                    label: '网上支付',
                    list: baseInfo.data.helpdoc3,
                },
                {
                    label: '沟通和服务',
                    list: baseInfo.data.helpdoc4,
                }
            ]
            window.scrollTo(0,0);
        },
        computed: {
            userName () {
                return this.$store.state.app.userName
            }
        },
        methods: {
            gotoArticle(obj) {
                console.log(obj)
                this.$router.push({
                    name: 'links',
                    params: {
                        type: 'article',
                        obj
                    }
                });
            },
            gotoList(num) {
                this.$store.commit('setLinksName',String(num));
                sessionStorage.setItem('currName',String(num));
                this.$router.push({
                    name: 'list',
                    params: {
                        listId: num
                    }
                });
            },
            toHome () {
                this.$store.commit('setMenuIndex','1');
                let fxsId = sessionStorage.getItem('fxsId');
                if(fxsId) {
                    this.$router.push({
                        path: '/index_home',
                        query: {
                            fxsId
                        }
                    });
                } else {
                    this.$router.push({
                        name: 'index_home'
                    });
                }
            },
            showLogin () {
                this.$router.push({
                    name: 'login',
                })
            },
            logout () {
                sessionStorage.removeItem('name');
                sessionStorage.removeItem('userName');
                this.$store.commit('setUserName');
                sessionStorage.removeItem('lgtp');
                sessionStorage.removeItem('ustp');
                this.$store.commit('setMenuIndex','1');
                sessionStorage.setItem('route','ticket');
                this.$store.commit('setRoute','ticket');
                if (this.$route.name !== 'index_home') {
                    // this.$router.push({
                    //     name: 'index_home'
                    // });
                    let fxsId = sessionStorage.getItem('fxsId');
                    if (fxsId) {
                        this.$router.push({
                            path: '/index_home',
                            query: {
                                fxsId
                            }
                        });
                    } else {
                        this.$router.push({
                            name: 'index_home'
                        });
                    }
                } else {
                    window.location.reload()
                }
            },
            goUserCenter () {
                const lgtp = sessionStorage.getItem('lgtp');
                if (lgtp === '01') {   //散客用户
                    // console.log(1);
                    this.$router.push({
                        name: 'MyETravelAgent'
                    });
                } else if (lgtp === '02') {     //分销商用户
                    this.$router.push({
                        name: 'purchaseOrder'
                    });
                }
            }
        }
    }
</script>

