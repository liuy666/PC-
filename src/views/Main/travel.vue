<template>
    <div id="travel">
        <div class="travel_wrap">
            <div class="title">
                <img src="../../assets/gonglue.png" alt="旅游攻略" />
            </div>
            <div class="dsj"></div>
            <template v-if="!travelList.length">
                <div class="contentList">
                    <dl>
                        <dt style="background-color: #ececec;"></dt>
                        <dd>
                            <h3></h3>
                            <p>暂无攻略信息</p>
                        </dd>
                    </dl>
                </div>
            </template>
            <template v-else>
                <div class="contentList">
                    <dl v-for="(item,idx) in travelList">
                        <dt>
                            <img :src="item.amtopics" @click="gotoDetail(item.amid)" alt="图片加载失败" />
                        </dt>
                        <dd>
                            <h3 @click="gotoDetail(item.amid)">{{ item.amtopicf }}</h3>
                            <h4>{{ item.dtmakedate.split(' ')[0] }}&nbsp;&nbsp;&nbsp;发布</h4>
                            <p @click="gotoDetail(item.amid)"> {{ item.amdesc }}</p>
                        </dd>
                    </dl>
                </div>
            </template>
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
        name: "travel",
        data:function(){
            return{
                travelList: [],
                total: 0,
                currentPage: 0
            }
        },
        async created() {
            this.$store.commit('setMenuIndex','3');
            const res = await this.$api.get2(this.lee + '/ec/home/v1/getHomeStrategy',{
                url: window.location.hostname,
                page: 1,
                pageSize: 10
            });
            console.log(res);
            if(!res) {
                return;
            }

            this.travelList = res.data.strategy.items;
            this.total = res.data.strategy.totalCount;
            this.currentPage = 1;
        },
        methods: {
            gotoDetail(amid) {
                this.$store.commit('setMenuIndex','3');
                this.$router.push({
                    name: 'articleDetail',
                    params: {
                        aId: amid,
                        part: '旅游攻略',
                        partName: 'travel'
                    }
                });
            },
            async changePage(num) {
                const requery = await this.$api.get2(this.lee + '/ec/home/v1/getHomeStrategy',{
                    url: window.location.hostname,
                    page: num,
                    pageSize: 10
                });
                console.log(requery);
                this.travelList = requery.data.strategy.items;
                this.total = requery.data.strategy.totalCount;
                this.currentPage = num;
                window.scrollTo(0,0);
            },
        }
    }
</script>

<style lang="less">
    #travel {
        background-color: #fff;
        text-align: center;
        .travel_wrap {
            width: 1200px;
            margin: 0 auto 101px;
            padding: 48px 0 0 0;
            text-align: left;
            overflow: hidden;
            .contentList {
                overflow: hidden;
                margin-bottom: 68px;
                dl {
                    overflow: hidden;
                    margin-bottom: 33px;
                    dt {
                        width: 200px;
                        height: 166px;
                        border: 1px solid #ececec;
                        padding: 2px;
                        float: left;
                        background-color: #fff;
                        margin-right: 40px;
                        img {
                            width: 194px;
                            height: 160px;
                            cursor: pointer;
                        }
                    }
                    dd {
                        float: left;
                        width: 960px;
                        height: 166px;
                        h3 {
                            font-size: 16px;
                            color: #191919;
                            height: 24px;
                            line-height: 24px;
                            margin-bottom: 8px;
                            cursor: pointer;
                        }
                        h4 {
                            font-size: 12px;
                            color: #AFB0B3;
                            margin-bottom: 16px;
                            font-weight: normal;
                        }
                        p {
                            font-size: 14px;
                            color: #5E5E60;
                            line-height: 20px;
                            // text-indent: 2em;
                            cursor: pointer;
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
</style>
