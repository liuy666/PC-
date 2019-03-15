<template>
    <div class="detail-page-container common-second">
        <div class="breadcrumb width-1200">
            <Breadcrumb>
                <BreadcrumbItem to="/travelNav/strategy/travelStrategy">攻略首页</BreadcrumbItem>
                <BreadcrumbItem v-html="strategyDetail.amtopicf"></BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="strategy-detail-page detail-page width-1200">

            <div>
                <h2 class="SHCN-M" v-html="strategyDetail.amtopicf"></h2>
                <hr>
                <div class="info-release">
                    <span class="fr" v-html="strategyDetail.dtmakedate+'发布'"></span>
                    <!--<span class="fr">莫兰CQ</span>-->
                    <!--<div class="fr logo"></div>-->
                </div>
                <div v-html="strategyDetail.amnote"></div>

                <!--<section>-->
                    <!--<h3>剑门关简介</h3>-->
                    <!--<p>蜀道难，难於上青天！</p>-->
                    <!--<p>蜀，就是四川；蜀道，自然就是进出四川的道路。而现在所说的蜀道其实是古栈道。</p>-->
                    <!--<p>小时候看三国演义，诸葛亮六出祁山，姜维最后独守剑门关，走的是栈道，守的也是栈道。从成都到汉中，这段蜀道最险要、最有故事也最引人注目。</p>-->
                    <!--<p>蜀地被誉为天府之国。 三国时刘备占据这里建立“蜀国”，并以此想实现自己的政治baofu“光复汉室”。</p>-->
                    <!--<p>蜀地被誉为天府之国。 三国时刘备占据这里建立“蜀国”，并以此想实现自己的政治baofu“光复汉室”。蜀地被誉为天府之国。 三国时刘备占据这里建立“蜀国”，并以此想实现自己的政治baofu“光复汉室”。-->
                        <!--蜀地被誉为天府之国。 三国时刘备占据这里建立“蜀国”，并以此想实现自己的政治baofu“光复汉室”。蜀地被誉为天府之国。 三国时刘备占据这里建立“蜀国”，并以此想实现自己的政治baofu“光复汉室”。</p>-->
                    <!--<p>蜀地被誉为天府之国。 三国时刘备占据这里建立“蜀国”，并以此想实现自己的政治baofu“光复汉室”。</p>-->
                    <!--<p>蜀地被誉为天府之国。 三国时刘备占据这里建立“蜀国”，并以此想实现自己的政治baofu“光复汉室”。</p>-->
                <!--</section>-->
                <!--<section>-->
                    <!--<h3>-->
                        <!--剑门关有哪些地方可以体验“蜀道难”？-->
                    <!--</h3>-->
                    <!--<img>-->
                    <!--<p>蜀地被誉为天府之国。 三国时刘备占据这里建立“蜀国”，并以此想实现自己的政治baofu“光复汉室”。</p>-->
                    <!--<img>-->
                    <!--<p>蜀地被誉为天府之国。 三国时刘备占据这里建立“蜀国”，并以此想实现自己的政治baofu“光复汉室”。蜀地被誉为天府之国。 三国时刘备占据这里建立“蜀国”，并以此想实现自己的政治baofu“光复汉室”。-->
                        <!--蜀地被誉为天府之国。 三国时刘备占据这里建立“蜀国”，并以此想实现自己的政治baofu“光复汉室”。蜀地被誉为天府之国。 三国时刘备占据这里建立“蜀国”，并以此想实现自己的政治baofu“光复汉室”。-->
                        <!--蜀地被誉为天府之国。 三国时刘备占据这里建立“蜀国”，并以此想实现自己的政治baofu“光复汉室”。蜀地被誉为天府之国。 三国时刘备占据这里建立“蜀国”，并以此想实现自己的政治baofu“光复汉室”。</p>-->
                <!--</section>-->
            </div>
            <!--<div class="title-to-work">-->
                <!--<span>本文著作权归 @合途旅游—大雄 所有，任何形式转载请联系作者。</span>-->
                <!--<hr>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "strategyDetailPage",
        props:['id'],
        computed: mapState({
            // strategyDetail: function(state) {return state.home.strategyDetail[this.id]},
            strategyDetail: function(state) {
                console.log(state.home.strategyDetail);
                if(state.home.strategyDetail[this.id]){
                    console.log(state.home.strategyDetail);
                    console.log(1);
                    return state.home.strategyDetail[this.id]
                }else{
                    console.log(2);
                    return JSON.parse(sessionStorage.getItem('strategyDetail'))[this.id]
                }
            }
        })
    }
</script>

<style scoped lang="less">
    h3{
        font-family: SourceHanSansCN-Medium;
    }
    .title-to-work{
        position: relative;
        margin-top: 106px;
        padding:0 184px;
        /*margin-bottom: 156px;*/
        height: 12px;
        span{
            width: 384px;
            background: #FFF;
            position: absolute;
            top: -9px;
            left: 496px;
            font-size: 12px;
            color: #AFB0B3;
            text-align: center;
        }
    }
</style>