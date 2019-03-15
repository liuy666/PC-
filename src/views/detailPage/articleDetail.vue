<style lang="less" scoped>
    #articleDetail {
        background-color: #F5F8FB;
        overflow: hidden;
        .breadcrumb {
            width: 1200px;
            margin: 0 auto;
            height: 50px;
            line-height: 50px;
            .ivu-breadcrumb {
                border-bottom: 0;
                padding: 0;
                margin: 0!important;
                color: #191919;
                &>span {
                    font-weight: 500;
                }
            }
        }
        .detail_wrap {
            background-color: #fff;
            width: 1200px;
            margin: 0 auto 50px;
            padding: 0 32px 32px 32px;
            border-radius: 4px;
            // &:hover {
            //     box-shadow: 1px 2px 4px rgba(75,127,240, 0.3);
            // }
            h2 {
                text-align: center;
                font-family: SourceHanSansCN-Medium;
                font-size: 24px;
                line-height: 36px;
                color: #191919;
                padding: 64px 0 40px;
                margin-bottom: 12px;
                border-bottom: 1px solid #ececec;
            }
            h3 {
                font-weight: normal;
                font-family: SourceHanSansCN-Regular;
                font-size: 12px;
                text-align: right;
                color: #AFB0B3;
                line-height: 18px;
                margin-bottom: 30px;
            }
            p {
                text-indent: 2em;
                font-family: SourceHanSansCN-Regular;
                font-size: 14px;
                color: #5E5E60;
                line-height: 20px;
                min-height: 800px;
            }
        }
    }
</style>

<template>
    <div id="articleDetail">
        <div class="breadcrumb">
            <Breadcrumb separator=">">
                <BreadcrumbItem :to="home">首页</BreadcrumbItem>
                <BreadcrumbItem :to="{name: listPage}" class="currPage">{{ listLabel }}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="detail_wrap">
            <h2>{{ title }}</h2>
            <h3> {{ info }}</h3>
            <p v-html="content"></p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                amtopicf: '',
                amnote: '',
                dtmakedate: '',
                pageName: '',
                pagelabel: '',
                homePage: {
                    name: 'index_home'
                }
            }
        },
        computed: {
            title() {
                return this.amtopicf;
            },
            info() {
                return this.dtmakedate;
            },
            content() {
                return this.amnote;
            },
            listPage() {
                return this.pageName;
            },
            listLabel() {
                return this.pagelabel;
            },
            home() {
                return sessionStorage.getItem('fxsId') ? { 
                    ...this.homePage, 
                    query: {
                        fxsId: sessionStorage.getItem('fxsId')
                    }
                } : this.homePage;
            }
        },
        async created() {
            const res = await this.$api.get2(this.lee + '/ec/home/v1/getGLContent',{
                amid: this.$route.params.aId
            });
            // console.log(res);
            if(!res) {
                return;
            }
            console.log(this.$route.params)

            this.amtopicf = res.data.article.amtopicf;
            this.amnote = res.data.article.amnote;
            this.dtmakedate = res.data.article.dtmakedate;
            if(!this.$route.params.partName && !this.$route.params.part) { // 如果是刷新当前文章页，则去session中查找面包屑链接
                if(!sessionStorage.getItem('page-name') && sessionStorage.getItem('page-label')) { // 如果session中没有，则返回主页
                    let fxsId = sessionStorage.getItem('fxsId'); // 还需区分是分销商店铺主页还是景区主页
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
                    this.pageName = sessionStorage.getItem('page-name');
                    this.pagelabel = sessionStorage.getItem('page-label');
                }
            } else {
                this.pageName = this.$route.params.partName;
                this.pagelabel = this.$route.params.part;
                sessionStorage.setItem('page-name',this.$route.params.partName);
                sessionStorage.setItem('page-label',this.$route.params.part);
            }
        },
        mounted() {
            this.$nextTick(() => {
                document.querySelector('.currPage a').style.setProperty('color', '#4B7FF0', 'important');
            });
        }
    }
</script>

