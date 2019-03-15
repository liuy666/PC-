<template>
    <div id="ticket">
        <div class="ticket_wrap">
            <div class="title">
                <img src="../../assets/mp.png" alt="景区门票" />
            </div>
            <div class="dsj"></div>
            <div class="tickets">
                <template v-if="!ticketList.length">
                    <dl>
                        <dt></dt>
                        <dd style="padding-top: 70px;">暂无门票信息</dd>
                    </dl>
                </template>
                <template v-else>
                    <dl v-for="(item,idx) in ticketList" :key="idx">
                        <dt>
                            <img :src="item.upadder" alt="" @click="buyNow(item.iscenicid)" alt="图片加载失败"/>
                            <p>{{ item.strgrade }}</p>
                        </dt>
                        <dd>
                            <div class="left">
                                <h3 @click="buyNow(item.iscenicid)">{{ item.sztickettypename }}</h3>
                                <p>
                                    <span class="sp1">¥</span>
                                    <span class="sp2">{{ item.mactualsaleprice }}元</span></p>
                            </div>
                            <div class="right">
                                <button @click="buyNow(item.iscenicid)">立即购买</button>
                            </div>
                        </dd>
                    </dl>
                </template>
            </div>
            <div class="fenye">
                <Page
                        v-if="total > 0"
                        :total="total"
                        :current="currentPage"
                        prev-text="上一页"
                        next-text="下一页"
                        @on-change="changePage">
                </Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ticket",
        data:function(){
            return{
                ticketList: [],
                total: 0,
                currentPage: 0
            }
        },
        async created() {
            this.$store.commit('setMenuIndex','2');
            // 首先判断本地存储是否有fxsId
            let realInterface = '',
                params = null,
                fxsId = sessionStorage.getItem('fxsId');
            if(fxsId) {
                realInterface = '/ec/distributorShop/v1/queryHomeProductListForDistributor';
                params = {
                    url: window.location.hostname,
                    usid: fxsId,
                    page: 1,
                    pageSize: 12
                }
            } else {
                realInterface = '/ec/book/ticketIndexs';
                params = {
                    url: window.location.host,
                    page: 1,
                    pageSizes: 12
                }
            }
            const res = await this.$api.get2(this.lee + realInterface,params);
            console.log(res);
            if(!res) {
                return;
            }
            if (fxsId) {
                this.ticketList = res.data.ticketList.items;
                this.total = res.data.ticketList.totalCount;
            } else {
                this.ticketList = res.data.plist.items;
                this.total = res.data.plist.totalCount;
            }
            this.currentPage = 1;
        },
        methods:{
            buyNow(id) {
                let lgtp = sessionStorage.getItem('lgtp');
                let fxsId = sessionStorage.getItem('fxsId');
                if(fxsId) {
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
            async changePage(num) {
                // 首先判断本地存储是否有fxsId
                let realInterface = '',
                    params = null,
                    fxsId = sessionStorage.getItem('fxsId');
                if(fxsId) {
                    realInterface = '/ec/distributorShop/v1/queryHomeProductListForDistributor';
                    params = {
                        url: window.location.hostname,
                        usid: fxsId,
                        page: num,
                        pageSize: 12
                    }
                } else {
                    realInterface = '/ec/home/v1/getHomeTicket';
                    params = {
                        url: window.location.hostname,
                        page: num,
                        pageSize: 12
                    }
                }
                const requery = await this.$api.get2(this.lee + realInterface,params);
                console.log(requery);
                if(!requery) {
                    return;
                }

                this.ticketList = requery.data.ticketList.items;
                this.total = requery.data.ticketList.totalCount;
                this.currentPage = num;
                window.scrollTo(0,0);
            }
        }
    }
</script>

<style lang="less">
    img{
        text-align: left;
    }

    #ticket {
        background-color: #fff;
        text-align: center;
        .ticket_wrap {
            width: 1440px;
            margin: 0 auto 101px;
            padding: 48px 0 0 0;
            .tickets {
                overflow: hidden;
                margin-bottom: 32px;
                dl {
                    width: 330px;
                    float: left;
                    margin: 0 15px 32px;
                    border-radius: 2px;
                    dt {
                        width: 330px;
                        height: 246px;
                        background-color: #ECECEC;
                        position: relative;
                        overflow: hidden;
                        img {
                            width: 330px;
                            height: 246px;
                            float: left;
                            border-top-left-radius : 2px;
                            border-top-right-radius : 2px;
                            cursor: pointer;
                        }
                        p {
                            position: absolute;
                            width: 100%;
                            height: 35px;
                            line-height: 35px;
                            font-size: 14px;
                            color: #FFFFFF;
                            text-align: center;
                            bottom: 0;
                            background: rgba(0,0,0,.7);
                        }
                    }
                    dd {
                        overflow: hidden;
                        height: 155px;
                        border: 1px solid #ECECEC;
                        border-radius: 2px;
                        border-top: 0;
                        .left {
                            float: left;
                            width: 190px;
                            height: 154px;
                            padding: 32px 0 0 24px;
                            font-family: 'SourceHanSansCN-Bold';
                            position: relative;
                            h3 {
                                font-size: 16px;
                                color: #191919;
                                letter-spacing: 0.8px;
                                line-height: 24px;
                                margin-bottom: 18px;
                                text-align: left;
                                cursor: pointer;
                            }
                            p {
                                overflow: hidden;
                                position: absolute;
                                bottom: 26px;
                                .sp2 {
                                    font-size: 20px;
                                    color: #FF7F0D;
                                    text-align: left;
                                    float: left;
                                }
                                .sp1 {
                                    font-size: 20px;
                                    color: #FF8314;
                                    text-align: left;
                                    float: left;
                                    margin-right: 5px;
                                }
                            }
                        }
                        .right {
                            float: right;
                            padding-top: 44px;
                            margin-right: 24px;
                            overflow: hidden;
                            button {
                                width: 88px;
                                height: 30px;
                                outline: none;
                                border: 0;
                                background: #4B7FF0;
                                border-radius: 2px;
                                line-height: 30px;
                                color: #fff;
                                font-size: 14px;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
            .fenye {
                text-align: center;
                .ivu-page {
                    &-item, &-prev, &-next {
                        min-width: 24px;
                        height: 24px;
                        line-height: 24px;
                        border-radius: 0;
                        a {
                            position: relative;
                            top: -1px;
                            margin: 0 6px;
                        }
                    }
                    &-prev, &-next {
                        border: 1px solid #dcdee2;
                        padding: 0 2px;
                        &:hover {
                            border-color: #4E81F0;
                            a {
                                color: #4E81F0
                            }
                        }
                    }
                    &-item {
                        &:hover {
                            border-color: #4E81F0;
                            a {
                                color: #4E81F0
                            }
                        }
                        &-active {
                            background-color: #4E81F0;
                            border-color: #4E81F0;
                            a {
                                color: #ffffff
                            }
                            &:hover {
                                border-color: #4E81F0;
                                a {
                                    color: #ffffff
                                }
                            }
                        }
                        &-jump-prev, &-jump-next {
                            &:hover {
                                a {
                                    color: #4E81F0
                                }
                            }
                        }
                    }
                    &-disabled {
                        &:hover {
                            border-color: #dcdee2;
                            a {
                                color: #ccc;
                            }
                        }
                    }
                }
            }
        }
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
    }
    @media all and (max-width: 1439px) {
        .ticket_wrap {
            width: 1110px!important;
        }
    }
</style>
