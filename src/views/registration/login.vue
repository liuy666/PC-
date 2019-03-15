<template>
    <div id="login" @keydown.enter="handleSubmit">
        <template v-if="spinShow">
            <loading></loading>
        </template>
        <div class="registra-box">
            <div class="login-box">
                <div>
                    <img :src="loginLogo" alt="" style="width: 270px;height:33px;">
                </div>
                <div class="z-bxz">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <h3>
                            <span v-if="isShop" style="text-align: center; display: block">用户登录</span>
                            <Tabs v-else v-model="lgtp" :animated="false">
                                <TabPane label="用户登录" name="1"></TabPane>
                                <TabPane label="分销商登录" name="2"></TabPane>
                            </Tabs>
                        </h3>
                        <FormItem prop="usid" >
                            <Input v-model="form.usid" placeholder="用户名/手机号/邮箱" class="z-bdr position-input"/>
                            <div v-if="form.usid" class="move-tip">用户名/手机号/邮箱</div>
                        </FormItem>
                        <FormItem prop="pwd">
                            <Input v-model="form.pwd" type="password" placeholder="密码" class="z-bdr z-bdr1 position-input"/>
                            <div v-if="form.pwd" class="move-tip">密码</div>
                        </FormItem>
                        <div style="overflow: hidden">
                            <Checkbox v-model="isSelect" label="Eat" class="fl">记住密码</Checkbox>

                            <router-link :to="{name:'touristPassword'}" class="fr"><span class="hover_underline" v-if="lgtp === '1'">忘记密码?</span></router-link>
                        </div>
                        <FormItem>
                            <Button @click="handleSubmit()" type="primary" long class="op-btns ok-btn" style="height: 40px">
                                <span style="font-size: 16px">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</span>
                            </Button>
                        </FormItem>
                        <p class="z-txtaln">
                            <router-link :to="{name:'tourist'}"><span class="hover_underline">游客注册</span></router-link>
                            <a href="javascript:void(0)" class="middle-a">|</a>
                            <a @click="backToIndex" class="hover_underline">返回首页</a>
                        </p>
                    </Form>
                </div>
            </div>
            <!--<div style="text-align: center">-->
                <!--<ul class="linkstring">-->
                    <!--<li><router-link :to="{name:'tourist'}">免费注册</router-link></li>-->
                    <!--<li><a @click="toBtLink1(7)">关于我们</a></li>-->
                    <!--<li><a @click="toBtLink1(9)">联系我们</a></li>-->
                    <!--<li><a @click="toBtLink1(10)">招聘英才</a></li>-->
                    <!--<li><a @click="toBtLink(items1[0].amid+';1')">帮助中心</a></li>-->
                    <!--&lt;!&ndash;<li><a>我要投诉</a></li>&ndash;&gt;-->
                <!--</ul>-->
            <!--</div>-->
            <!--<div class="foot-copyright">-->
                <!--<div>-->
                    <!--<a target="_blank" href="http://www.miibeian.gov.cn/"></a>-->
                    <!--<a class="z-csr1" v-html="footFirstLine"></a>-->
                    <!--<a href="http://www.hqyatu.com/" target="_blank">提供技术支持 服务热线：(+86)755-88328999</a>-->
                <!--</div>-->
            <!--</div>-->
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
                <!--<a target="_blank" href="https://szcert.ebs.org.cn/6a26c5af-103e-4874-8546-65134b181233"><div class="guohui"></div></a>-->
            </section>
        </div>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapActions} from 'vuex'
    export default {
        name: "login",
        data () {
            return {
                form: {
                    usid: '',
                    pwd: '',
                    url: window.location.hostname,
                },
                rules: {
                    usid: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                },
                isGetToken : false,
                token: '',
                spinShow: false,
                isSelect: false,
                lgtp: '1',
                copyright: '',
                loginLogo: '',
            }
        },
        methods: {
            ...mapActions([
                'changeMenuFlag1',
                'changeMenuFlag2',
                // 'rqHomeBt'
            ]),
            // 登陆表单简单验证
            handleSubmit() {
                this.$refs.loginForm.validate(valid => {
                    if(valid) {
                        // this.getToken();
                        this.login()
                    } else {
                        return;
                    }
                });
            },
            toBtLink (id){
                // sessionStorage.setItem('menuFlag1',id.split(';')[0]);
                this.changeMenuFlag1(id.split(';')[0]);
                // sessionStorage.setItem('menuFlag2',id.split(';')[1]);
                this.changeMenuFlag2(id.split(';')[1]);
                this.$router.push({name:'bottomLinkMenu'});
            },
            toBtLink1(id){
                this.$router.push({name:'bottomLinkMenu1',params:{id: id}});
            },
            // 获取token
            // getToken() {
            //     this.spinShow = true;
            //     let tokenData = {
            //         username:this.form.usid,
            //         password:this.form.pwd,
            //         grant_type:"password",
            //         scope:"app",
            //         client_id:"android",
            //         client_secret:"android"
            //     };
            //
            //     //获取token
            //     this.$http.post(this.lee + '/uaa/oauth/token',this.QS.stringify(tokenData))
            //         .then(res => {
            //             if(res.status === 200) {
            //                 // 改变 isGetToken 触发登录接口
            //                 this.isGetToken = true;
            //                 this.token = res.data.access_token;
            //             } else {
            //                 this.$req.showMessageModal(this, '未获取token信息，请刷新后重试', 2);
            //                 this.spinShow = false;
            //             }
            //         })
            //         .catch(err => {
            //             this.$req.showMessageModal(this, '账号不存在', 2);
            //             this.spinShow = false;
            //         })
            // },

            //登录
            async login () {
                this.spinShow = true;
                if (sessionStorage.getItem('fxsId')) {    //注：如果是店铺的话，type直接设为1，景区的可以是1或者2；1代表散客，2代表分销商
                    this.$set(this.form, 'type', '1');
                } else {
                    this.$set(this.form, 'type', this.lgtp);
                }
                const loginRes = await this.$http.get(this.baseURL + '/ec/custom/login', {params: this.form});
                if (loginRes.data.code === 200) {
                    const custom = loginRes.data.data.custom;
                    const tokenData = {
                        username:custom.usid,
                        password:this.form.pwd,
                        grant_type:"password",
                        scope:"app",
                        client_id:"android",
                        client_secret:"android"
                    };
                    sessionStorage.setItem('userName',custom.usid);  // 用户名
                    sessionStorage.setItem('lgtp',custom.lgtp);  // 用户类别
                    sessionStorage.setItem('ustp',custom.ustp);  // 分销商等级
                    this.$store.commit('setUserName');

                    //获取token
                    this.$http.post(this.baseURL + '/uaa/oauth/token', this.QS.stringify(tokenData))
                        .then(res => {
                            if(res.status === 200) {
                                sessionStorage.setItem('name',res.data.access_token);  // 存储 token
                                if (this.isSelect) {
                                    sessionStorage.setItem('userInfo',JSON.stringify(this.form));   //记住账号密码
                                } else {
                                    sessionStorage.removeItem('userInfo');
                                }
                                if(sessionStorage.getItem('payFlag') && sessionStorage.getItem('payFlag') === '1'){
                                    sessionStorage.removeItem('payFlag');
                                    this.$router.push({
                                        name:'firstStepOfTicketPay'
                                    });
                                    return;
                                }
                                if (custom.lgtp === '01') {   //散客用户
                                    this.$router.push({
                                        name: 'index_home'
                                    })
                                    // this.$router.push({
                                    //     name: 'MyETravelAgent'
                                    // })
                                } else if (custom.lgtp === '02') {     //分销商用户
                                    sessionStorage.setItem('route','distributor-order');
                                    this.$store.commit('setRoute','distributor-order');
                                    this.$router.push({
                                        name: 'purchaseOrder'
                                    })
                                }
                            } else {
                                this.$req.showMessageModal(this, '未获取token信息，请刷新后重试', 2);
                            }
                            this.spinShow = false;
                        })
                        .catch(err => {
                            this.$req.showMessageModal(this, '账号不存在', 2);
                            this.spinShow = false;
                        })
                } else {
                    this.$req.showMessageModal(this, loginRes ,1);
                    this.spinShow = false
                }
            },
            //底部链接跳转
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
            //返回首页
            backToIndex() {
                let obj = { path: '/index_home'};
                //如果浏览器存储有分销商id，则调到店铺首页，否则跳景区首页
                if(sessionStorage.getItem('fxsId')) {
                    obj = {
                        ...obj,
                        query: {
                            fxsId: sessionStorage.getItem('fxsId')
                        }
                    }
                }
                this.$router.push(obj)
            }
        },
        computed:{
            ...mapState({
                items1: state => state.home.items1,
                footFirstLine: state => state.home.footFirstLine||sessionStorage.getItem('footFirstLine'),
            }),
            isShop () {
                return sessionStorage.getItem('fxsId')
            }
        },
        async created () {
            this.$store.commit('setMenuIndex','1');    //避免点击返回首页时，未正确显示首页
            if (sessionStorage.getItem('userInfo')) {
                this.isSelect = true;
                this.form = JSON.parse(sessionStorage.getItem('userInfo'));
            }
            const baseInfo = await this.$api.get2(this.lee + '/ec/home/v1/getHomeBaseInfo',{
                url: window.location.hostname,
            });
            this.copyright = baseInfo.data.domain.logoMark;
            this.loginLogo = baseInfo.data.domain.loginLogo;
        },
        // mounted(){
        //     this.rqHomeBt('2');
        // }
    }
</script>

<style lang="less">
    // 登录
    .demo-carousel {
        width: 500px;
        height: 200px;
    }
    #login {
        overflow: hidden;
        background-color: #F5F8FB;
        font-size: 14px;
        .width-1440 {
            background: none;
            min-width: 1200px;
        }
        .ivu-input {
            padding-left: 0
        }
        .login-box{
            width: 860px;
            height: 544px;
            margin: 130px auto 70px;
            overflow: hidden;
            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
            /*border: 1px solid #ccc;*/
            >div{
                float: left;
                &:first-child{
                    width: 400px;
                    height: 544px;
                    background-image: url("../../assets/login.png");
                    position: relative;
                    img {
                        position: absolute;
                        top: 33px;
                        left: 32px;
                    }
                }
                &:last-child{
                    width: 460px;
                    height: 544px;
                    padding: 64px 80px 72px;
                    background: #fff;
                }
            }
            .z-bdr{
                margin-top: 40px
            }
            .z-bdr1{
                margin-top: 22px
            }
            button{
                margin: 51px 0 20px;
            }
            .ivu-checkbox-wrapper{
                font-size: 14px;
            }
            .middle-a{
                color: #4B7FF0;
                margin: 0 30px;
            }
        }
        .linkstring {
            display: inline-block;
            margin-left: 0;
            margin-bottom: 20px;
            -webkit-transform: translate(0);
            -ms-transform: translate(0);
            -moz-transform: translate(0);
            -o-transform: translate(0);
            transform: translate(0);
            li {
                a {
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
        .foot-copyright{
            /*margin-left: -40px;*/
            background: transparent;
            /*font-size: 12px;*/
            color: #AFB0B3;
            /*height: 0;*/
            /*overflow: hidden;*/
        }
        .position-input {
            position: relative;
        }
        .move-tip {
            position: absolute;
            bottom: 20px;
            left: 0;
            color: #5E5E60;
        }
        .ivu-tabs-nav {
            width: 100%;
            text-align: center;
            .ivu-tabs-tab {
                width: 50%;
                margin-right: 0;
                font-size: 16px;
                color: #636365;
                &-active {
                    color: #191919
                }
                &:hover {
                    color: #191919
                }
            }
        }
        .ivu-tabs-ink-bar{
            background: #4B7FF0;
        }
        .hover_underline {
            color: #4B7FF0;
            font-size: 14px;
            &:hover {
                text-decoration: underline;
            }
        }
        .ivu-input {
            font-size: 14px;
        }
        input::-webkit-input-placeholder {
            font-size: 14px;
        }
    }
</style>
