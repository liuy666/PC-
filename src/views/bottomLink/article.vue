<style lang="less" scoped>
    #article {
        padding-top: 40px;
        h3 {
            text-align: center;
            font-size: 18px;
            font-weight: normal;
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
        }
        h4 {
            text-align: center;
            font-weight: normal;
            font-size: 12px;
            margin-bottom: 20px;
        }
        p {
            font-size: 14px;
            text-indent: 2em;
            line-height: 30px;
        }
    }
</style>

<template>
    <div id="article">
        <h3>{{ title }}</h3>
        <h4>发布时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ time }}</h4>
        <p v-html="content"></p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                amnote: '',
                amtopicf: '',
                dtmakedate: '',
            }
        },
        computed: {
            content() {
                return this.amnote || '';
            },
            title() {
                return this.amtopicf || '';
            },
            time() {
                return this.dtmakedate || '';
            }
        },
        async created() {
            console.log(this.$route.params.id)
            const getArticle = await this.$api.get(this.lee + '/ec/home/v1/getGLContent',{
                amid: this.$route.params.id
            });

            console.log(getArticle);
            this.amnote = getArticle.data.article.amnote;
            this.amtopicf = getArticle.data.article.amtopicf;
            this.dtmakedate = getArticle.data.article.dtmakedate;
        },
        watch: {
            async '$route'(to,from) {
                console.log(from);
                console.log(to);
                if(from.name === 'article' && to.name === 'article') {
                    if(from.params.id === to.params.id) {
                        return;
                    } else {
                        const nextArticle = await this.$api.get(this.lee + '/ec/home/v1/getGLContent',{
                            amid: to.params.id
                        });

                        console.log(nextArticle);
                        this.amnote = nextArticle.data.article.amnote;
                        this.amtopicf = nextArticle.data.article.amtopicf;
                        this.dtmakedate = nextArticle.data.article.dtmakedate;
                    }
                }
            }
        }
    }
</script>

