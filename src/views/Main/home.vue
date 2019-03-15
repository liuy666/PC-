<style lang="less" scoped>
    #home {
        font-family: "SourceHanSansCN-Regular" !important;

        // 图片标题
        .title {
            text-align: center;
            height: 90px;
            padding-bottom: 10px;
            margin-bottom: 8px;
            border-bottom: 1px solid #ececec;
            img {
                height: 86px;
            }
        }

        // 倒三角符号
        .dsj {
            width: 0px;
            height: 0px;
            margin: 0 auto 40px;
            border: 8px solid #4b7ff0;
            border-left-color: transparent;
            border-bottom-color: transparent;
            border-right-color: transparent;
        }

        // 门票推荐
        #recommend {
            background-color: #fff;
            .recommend_wrap {
                width: 1200px;
                margin: 0 auto;
                padding: 48px 0 75px;
                // 门票展示列表
                .ticket_list {
                    // overflow: hidden;
                    height: 301px;
                    dl {
                        overflow: hidden;
                        border-radius: 2px;
                        background: #fff;
                        width: 585px;
                        height: 301px;
                        &:hover {
                            box-shadow: 4px 4px 30px rgba(0,0,0,0.2);
                        }
                        &:nth-child(2n){
                            margin-left: 30px;
                        }
                        dt {
                            width: 333px;
                            height: 301px;
                            float: left;
                            background: #ececec;
                            img {
                                height: 301px;
                                width: 333px;
                                cursor: pointer;
                            }
                        }
                        dd {
                            padding: 22px 28px 0 26px;
                            box-sizing: border-box;
                            width: 252px;
                            height: 301px;
                            border: 1px solid #ececec;
                            border-left: 0;
                            float: left;
                            position: relative;
                            h2 {
                                font-size: 20px;
                                min-height: 24px;
                                color: #191919;
                                letter-spacing: 1px;
                                margin-bottom: 7px;
                                font-family: 'SourceHanSansCN-Medium';
                                cursor: pointer;
                            }
                            h3 {
                                font-size: 12px;
                                min-height: 16px;
                                color: #4B7FF0;
                                letter-spacing: 0;
                                font-weight: normal;
                                margin-bottom: 8px;
                            }
                            p.msg {
                                height: 75px;
                                font-size: 14px;
                                color: #5E5E60;
                                letter-spacing: 0;
                                line-height: 25px;
                                margin-bottom: 5px;
                                overflow: hidden;
                            }
                            p.price {
                                font-size: 20px;
                                color: #FF7F0D;
                                margin-bottom: 6px;
                                font-family: SourceHanSansCN-Bold;
                                position: absolute;
                                bottom: 58px;
                                i {
                                    font-family: SourceHanSansCN-Medium;
                                    font-style: normal;
                                    font-size: 14px;
                                    color: #FF8314;
                                    margin-right: 5px;
                                }
                            }
                            button {
                                border-radius: 2px;
                                -webkit-border-radius: 2px;
                                -moz-border-radius: 2px;
                                width: 88px;
                                height: 30px;
                                border: 0;
                                background-color: #4B7FF0;
                                color: #fff;
                                font-size: 14px;
                                position: absolute;
                                bottom: 28px;
                                &:hover {
                                    background-color: #306BEA;
                                }
                            }
                        }
                    }
                    .left {
                        float: left;
                    }
                    .right {
                        float: right;
                    }
                }
            }
        }

        // 旅游攻略
        #strategy {
            background-color: #F5F8FB;
            text-align: center;
            padding-bottom: 50px;
            .strategy_wrap {
                width: 1200px;
                margin: 0 auto 45px;
                padding: 75px 0 0 0;
                text-align: left;
                overflow: hidden;
                .big_pic {
                    width: 1200px;
                    height: 346px;
                    background-color:#ececec;
                    img{
                        width: 100%;
                        height: 346px;
                        cursor: pointer;
                    }
                }
                .white {
                    background-color: #fff;
                     overflow: hidden;
                    h2 {
                        font-family: SourceHanSansCN-Medium;
                        font-size: 20px;
                        color: #191919;
                        padding: 30px 40px 16px;
                        cursor: pointer;
                        &:hover {
                            text-decoration: underline;
                            color: #4B7FF0;
                        }
                    }
                    p {
                        font-size: 14px;
                        color: #5E5E60;
                        // text-indent: 2em;
                        letter-spacing: 0;
                        line-height: 24px;
                        height: 96px;
                        overflow: hidden;
                        padding: 0 40px;
                        margin-bottom: 45px;
                    }
                }
            }
            button {
                border-radius: 2px;
                width: 88px;
                height: 30px;
                border: 0;
                border: 1px solid #5E5E60;
                background-color: #fff;
                color: #5E5E60;
                font-size: 14px;
                &:hover {
                    background-color: #4B7FF0;
                    color: #fff;
                    border: 1px solid #4B7FF0;
                }
            }
        }

        // 新鲜资讯
        #information {
            padding: 70px 0 75px;
            background-color: #fff;
            .information_wrap {
                width: 1200px;
                margin: 0 auto;
                .info_card {
                    overflow: hidden;
                    &>div {
                        float: left;
                    }
                    .info_pic {
                        float: left;
                        width: 694px;
                        height: 383px;
                        background-color:#ececec;
                        position: relative;
                        margin-right: 40px;
                        img {
                            width: 694px;
                            height: 383px;
                            cursor: pointer;
                        }
                        .info {
                            position: absolute;
                            left: 32px;
                            bottom: 16px;
                            color: #fff;
                            div {
                                width: 48px;
                                height: 20px;
                                line-height: 20px;
                                text-align: center;
                                background-color: #F54112;
                                margin-bottom: 10px;
                            }
                            h2 {
                                font-size: 24px;
                                margin-bottom: 12px;
                                cursor: pointer;
                                &:hover {
                                    text-decoration: underline;
                                }
                            }
                            p {
                                line-height: 20px;
                                font-size: 14px;
                                width: 610px;
                                height: 40px;
                                overflow:hidden;
                            }
                        }
                    }
                }
                .article_list {
                    float: right !important;
                    overflow: hidden;
                    width: 460px;
                    h3 {
                        height: 20px;
                        line-height: 20px;
                        overflow: hidden;
                        background: url('../../assets/btn_more_defualt.png') no-repeat right 7px;
                        background-size: 10px 10px;
                        margin-bottom: 20px;
                        &:hover {
                            background: url('../../assets/btn_more.png') no-repeat right 7px;
                        }
                        span {
                            float: left;
                            font-size: 16px;
                            color: #5E5E60;
                        }
                        a {
                            float: right;
                            font-weight: normal;
                            font-size: 12px;
                            margin-right: 20px;
                            position: relative;
                            top: 1px;
                            color: #5E5E60;
                            &:hover {
                                color: #4B7FF0;
                                text-decoration: underline;
                            }
                        }
                    }
                    ul {
                        height: 343px;
                        li {
                            line-height: 26px;
                            overflow: hidden;
                            font-size: 14px;
                            a {
                                float: left;
                                color: #5E5E60;
                                cursor: pointer;
                                width: 350px;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                &:hover {
                                    text-decoration: underline;
                                    color: #4B7FF0;
                                }
                            }
                            span {
                                float: right;
                                color: #AFB0B3;
                            }
                        }
                    }
                }
            }
        }

        // 风景展示
        #scenic {
            background-color: #F5F8FB;
            padding: 75px 54px;
            .scenic_wrap {
                width: 1200px;
                margin: 0 auto;
                #focus_Box {
                    position:relative;
                    width: 1200px;
                    height: 600px;
                    margin: 0 auto;
                    ul {
                        position: relative;
                        width: 1200px;
                        height: 600px;
                        li{
                            z-index: 0;
                            position: absolute;
                            width: 0px;
                            background: #fff;
                            height: 0px;
                            top: 146px;
                            cursor: pointer;
                            left: 377px;
                            box-shadow: 0px 12px 27px rgb(174, 174, 174);
                            img{
                                width: 100%;
                                height: 100%;
                                vertical-align: top;
                            }
                        }
                    }
                    .prev,.next{
                        display: none;
                        z-index: 100;
                        overflow: hidden;
                        cursor: pointer;
                        position: absolute;
                        z-index: 10000;
                        width: 52px;
                        height: 52px;
                        top: 131px;
                    }
                    .next {
                        right: 0;
                    }
                }
            }
        }

        // 视频中心
        #video {
            padding: 75px 0 30px;
            background-color: #fff;
            .video_wrap {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;
                dl {
                    width: 562px;
                    height: 432px;
                    float: left;
                    overflow: hidden;
                    margin: 0 19px 45px;
                    background-color: #fff;
                    /*box-shadow: 1px 1px 8px rgba(0,0,0,.1);*/
                    border: 1px solid #ececec;
                    dt {
                        width: 560px;
                        height: 320px;
                        float: left;
                    }
                    dd {
                        float: left;
                        width: 560px;
                        height: 112px;
                        padding: 20px;
                        p {
                            font-size: 14px;
                            color: #5E5E60;
                            letter-spacing: 0;
                            line-height: 24px;
                            overflow: hidden;
                            height: 72px;
                            // text-indent: 2em;
                        }
                    }
                }
            }
        }
    }
</style>

<template>
    <div id="home">
        <!-- 门票推荐 -->
        <div id="recommend" v-if="ticketList.length">
            <div class="recommend_wrap">
                <div class="title">
                    <img src="../../assets/TICKET.png" alt="门票推荐" />
                </div>
                <div class="dsj"></div>
                <div class="ticket_list">
                    <dl class="left" v-for="(item,idx) in ticketList" :key="idx">
                        <dt><img :src="item.upadder" :alt="item.sztickettypename" @click="buyNow(item.iscenicid)"></dt>
                        <dd>
                            <h2 @click="buyNow(item.iscenicid)"><span>{{ item.sztickettypename }}</span></h2>
                            <h3>{{ item.strgrade }}</h3>
                            <p class="msg">{{ item.szsimpleintroduction }}</p>
                            <p class="price"><i>¥</i><span>{{ item.mactualsaleprice }}</span>元</p>
                            <button @click="buyNow(item.iscenicid)">立即购买</button>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>

        <!-- 旅游攻略 -->
        <div id="strategy">
            <div class="strategy_wrap">
                <div class="title">
                    <img src="../../assets/gonglue.png" alt="旅游攻略" />
                </div>
                <div class="dsj"></div>
                <template v-if="!strategyList.length">
                    <div class="big_pic"></div>
                    <div class="white">
                        <h2 class="SHCN-M z-csr"></h2>
                        <p>暂无攻略信息</p>
                    </div>
                </template>
                <template v-else>
                    <div class="big_pic">
                        <img :src="src1" alt="图片加载失败" @click="travelDetail(strategyList[0].amid)" />
                    </div>
                    <div class="white">
                        <h2 class="SHCN-M z-csr" @click="travelDetail(strategyList[0].amid)">{{ h2_1 }}</h2>
                        <p>{{ p1 }}</p>
                    </div>
                </template>
            </div>
            <button @click="gotoTravel">查看更多</button>
        </div>

        <!-- 新鲜资讯 -->
        <div id="information">
            <div class="information_wrap">
                <div class="title">
                    <img src="../../assets/zixun.png" alt="新鲜资讯" />
                </div>
                <div class="dsj"></div>
                <template v-if="!information.length">
                    <div class="info_card">
                        <div class="info_pic" style="padding: 30px 0 0 30px;">暂无资讯信息</div>
                        <div class="article_list">
                            <h3>
                                <a href="javascript:void(0)">更多</a>
                            </h3>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="info_card">
                        <div class="info_pic">
                            <img :src="src2" @click="infoDetail(information[0].amid)" alt="图片加载失败" />
                            <div class="info">
                                <div class="SHCN-M">热门</div>
                                <h2 class="SHCN-M" @click="infoDetail(information[0].amid)">{{ h2_2 }}</h2>
                                <p>{{ p2 }}</p>
                            </div>
                        </div>
                        <div class="article_list">
                            <h3>
                                <a href="javascript:void(0)" @click="gotoInformation">更多</a>
                            </h3>
                            <ul>
                                <li v-for="(item,idx) in information" :key="idx">
                                    <a href="javascript:void(0)" @click="infoDetail(item.amid)">{{ item.amtopicf }}</a>
                                    <span>{{ item.dtmakedate.split(' ')[0] }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <!-- 风景展示 -->
        <div id="scenic" v-if="picList.length">
            <div class="scenic_wrap">
                <div class="title">
                    <img src="../../assets/zhanshi.png" alt="风景展示" />
                </div>
                <div class="dsj"></div>
                <div id="focus_Box">
                    <span class="prev" style="background-color: #000;"></span>
                    <span class="next" style="background-color: #000;"></span>
                    <ul>
                        <li v-for="(item,idx) in picList" :key="idx" :class="'li' + (idx + 1)">
                            <img :src="item.src" alt="图片加载失败" />
                      </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 视频中心 -->
        <div id="video">
            <div class="video_wrap">
                <div class="title">
                    <img src="../../assets/shipin.png" alt="视频中心" />
                </div>
                <div class="dsj"></div>
                <template v-if="!videoList.length">
                    <dl style="background-color: #ececec;box-shadow:none;">
                        <dt style="padding: 30px 0 0 30px;">暂无视频信息</dt>
                        <!-- <dt>
                            <video src="../../assets/movie.ogg" controls width="560"></video>
                        </dt> -->
                        <dd></dd>
                    </dl>
                </template>
                <template v-else>
                    <dl v-for="(item,idx) in videoList" :key="idx">
                        <dt>
                            <video :src="item.logoPic" controls width="560"></video>
                        </dt>
                        <dd>
                            <p>{{ item.logoMark.replace(/<[^>]+>/g,"") }}</p>
                        </dd>
                    </dl>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ticketList: [],
                strategyList: [],
                information: [],
                videoList: [],
                picList: []
            }
        },
        watch: {
            '$route': (to) => {
                console.log(to)
            }
        },
        async created() {
            // console.log(this.$route)
            // 根据query的fsxId来选择获取景区门票还是分销商门票
            this.$store.commit('setMenuIndex','1');
            let realInterface = '',
                params = null,
                query = this.$route.query;
            if(Object.keys(query).length && query.fxsId) {
                realInterface = '/ec/distributorShop/v1/queryHomeProductListForDistributor';
                params = {
                    url: window.location.hostname,
                    usid: query.fxsId,
                    page: 1,
                    pageSize: 2
                }
            } else {
                realInterface = '/ec/home/v1/getHomeTicket';
                params = {
                    url: window.location.hostname,
                    page: 1,
                    pageSize: 2
                }
            }

            const res = await this.$api.all([
                {
                    url: this.lee + realInterface,
                    type: 'get',
                    queryParams: params,
                    isToken: false
                },
                {
                    url: this.lee + '/ec/home/v1/getHomeStrategy',
                    type: 'get',
                    queryParams: {
                        url: window.location.hostname,
                        page: 1,
                        pageSize: 13
                    },
                    isToken: false
                }
            ]);
            // console.log(res);
            if(!res) {
                return;
            }

            this.ticketList = res[0].ticketList.items;
            this.strategyList = res[1].strategy.items;
            this.information = res[1].information.items;
            this.videoList = res[1].listVideos;

            // 获取风景图片
            const picInfo = await this.$api.get2(this.lee + '/ec/home/v1/getHomeListPics',{
                url: window.location.hostname,
            });
            // console.log(picInfo);

            let _picList = [];
            // 如果获取数据失败，则查看本地存储是否有缓存，有则用之，无则显示占位框
            if(!picInfo || !picInfo.data || !picInfo.data.listPics || !picInfo.data.listPics.length) {
                let pictureList = JSON.parse(sessionStorage.getItem('pictureList'));
                if(!pictureList) {
                    return;
                } else {
                    _picList = [...pictureList];
                }
            } else { // 如果获取数据成功，则存入本地缓存
                sessionStorage.setItem('pictureList',JSON.stringify(picInfo.data.listPics));
                _picList = picInfo.data.listPics;
            }
            let pList = _picList.map(item => {
                return {
                    src: item.logoPic,
                    // alt: item.logoMark.replace(/<[^>]+>/g,"")
                }
            });
            if(pList.length < 5) {
                let n = 5 - pList.length,
                    firstPic = pList[0];
                for(let i = n; i > 0; i-- ) {
                    pList.push(firstPic);
                }
                this.picList = pList;
            } else if (pList.length > 5) {
                this.picList = pList.slice(0,5);
            } else {
                this.picList = pList;
            }
            this.$nextTick(function () {
                // DOM 现在更新了
                new ZoomPic("focus_Box");
                sessionStorage.setItem('videoWidth',document.querySelector('video').clientWidth);
                sessionStorage.setItem('winWidth',document.documentElement.clientWidth);
            });

        },
        methods: {
            // 立即购买
            buyNow(id) {
                let lgtp = sessionStorage.getItem('lgtp');
                let query = this.$route.query;
                if(Object.keys(query).length && query.fxsId) {
                    this.$router.push({
                        name:'ticketDetailPage',
                        params:{id: id}
                    });
                } else {
                    if(lgtp=== '02'){
                        this.$router.push({
                            name:'distributor-order'
                        });
                    } else {
                        this.$router.push({
                            name:'ticketDetailPage',
                            params:{id: id}
                        });
                    }
                }
            },
            // 资讯详情页
            infoDetail(amid) {
                this.$store.commit('setMenuIndex','4');
                this.$router.push({
                    name:'articleDetail',
                    params:{
                        aId: amid,
                        part: '新鲜资讯',
                        partName: 'information'
                    }
                });
            },
            // 攻略详情页
            travelDetail(amid) {
                this.$store.commit('setMenuIndex','3');
                this.$router.push({
                    name:'articleDetail',
                    params:{
                        aId: amid,
                        part: '旅游攻略',
                        partName: 'travel'
                    }
                });
            },
            // 攻略列表页
            gotoTravel() {
                this.$store.commit('setMenuIndex','3');
                this.$router.push({
                    name: 'travel'
                });
            },
            // 资讯列表页
            gotoInformation() {
                this.$store.commit('setMenuIndex','4');
                this.$router.push({
                    name:'information'
                });
            }
        },
        computed: {
            src1() {
                return this.strategyList[0] ? this.strategyList[0].amtopics : '';
            },
            h2_1() {
                return this.strategyList[0] ? this.strategyList[0].amtopicf : '';
            },
            p1() {
                return this.strategyList[0] ? this.strategyList[0].amdesc : '';
            },
            src2() {
                return this.information[0] ? this.information[0].amtopics : '';
            },
            h2_2() {
                return this.information[0] ? this.information[0].amtopicf : '';
            },
            p2() {
                return this.information[0] ? this.information[0].amdesc : '';
            }
        }
    }
</script>
