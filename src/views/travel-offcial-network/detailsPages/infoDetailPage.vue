<template>
    <div class="detail-page-container common-second">
        <div class="breadcrumb width-1200">
            <Breadcrumb>
                <BreadcrumbItem to="/travelNav/information/freshInfo">资讯首页</BreadcrumbItem>
                <BreadcrumbItem v-html="infoDetail.amtopicf"></BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="strategy-detail-page detail-page width-1200">

            <div>
                <h2 class="SHCN-M" v-html="infoDetail.amtopicf"></h2>
                <hr>
                <div class="info-release">
                    <span class="fr" v-html="infoDetail.dtmakedate+'发布'"></span>
                    <!--<span class="fr">莫兰CQ</span>-->
                    <!--<div class="fr logo"></div>-->
                </div>
                <div v-html="infoDetail.amnote"></div>
                <!--<section class="margin-top-78">-->
                    <!--<p>好一树美丽的黄栌花，又相逢这漫山遍野的粉红海洋——去年此时的首届黄栌花节，让只见过黄栌秋季红叶的我们重新认识了夏天花开时的缤纷，今年的天气来得更暖些，黄栌花开的也格外的艳，同时更多的好玩体验加入黄栌花节中，男女老少不同年龄的你都能陶醉其中。赶上这2018年坡峰岭第二届黄栌花节盛事，绝对会让你赞叹！</p>-->
                    <!--<p>好一树美丽的黄栌花，又相逢这漫山遍野的粉红海洋——去年此时的首届黄栌花节，让只见过黄栌秋季红叶的我们重新认识了夏天花开时的缤纷，今年的天气来得更暖些，黄栌花开的也格外的艳，同时更多的好玩体验加入黄栌花节中，男女老少不同年龄的你都能陶醉其中。赶上这2018年坡峰岭第二届黄栌花节盛事，绝对会让你赞叹！</p>-->
                    <!--<div class="inner-content clearAll">-->
                        <!--<img>-->
                        <!--<div>-->
                            <!--<p>好一树美丽的黄栌花，又相逢这漫山遍野的粉红海洋——去年此时的首届黄栌花节，让只见过黄栌秋季红叶的我们重新认识了夏天花开时的缤纷，今年的天气来得更暖些，黄栌花开的也格外的艳，同时更多的好玩体验加入黄栌花节中，男女老少不同年龄的你都能陶醉其中。赶上这2018年坡峰岭第二届黄栌花节盛事，绝对会让你赞叹！</p>-->
                            <!--<p>好一树美丽的黄栌花，又相逢这漫山遍野的粉红海洋——去年此时的首届黄栌花节，让只见过黄栌秋季红叶的我们重新认识了夏天花开时的缤纷，今年的天气来得更暖些，黄栌花开的也格外的艳，同时更多的好玩体验加入黄栌花节中，男女老少不同年龄的你都能陶醉其中。赶上这2018年坡峰岭第二届黄栌花节盛事，绝对会让你赞叹！</p>-->
                            <!--<p>好一树美丽的黄栌花，又相逢这漫山遍野的粉红海洋——去年此时的首届黄栌花节，让只见过黄栌秋季红叶的我们重新认识了夏天花开时的缤纷，今年的天气来得更暖些，黄栌花开的也格外的艳，同时更多的好玩体验加入黄栌花节中，男女老少不同年龄的你都能陶醉其中。赶上这2018年坡峰岭第二届黄栌花节盛事，绝对会让你赞叹！</p>-->
                        <!--</div>-->

                    <!--</div>-->

                    <!--<p>好一树美丽的黄栌花，又相逢这漫山遍野的粉红海洋——去年此时的首届黄栌花节，让只见过黄栌秋季红叶的我们重新认识了夏天花开时的缤纷，今年的天气来得更暖些，黄栌花开的也格外的艳，同时更多的好玩体验加入黄栌花节中，男女老少不同年龄的你都能陶醉其中。赶上这2018年坡峰岭第二届黄栌花节盛事，绝对会让你赞叹！</p>-->
                    <!--<p>好一树美丽的黄栌花，又相逢这漫山遍野的粉红海洋——去年此时的首届黄栌花节，让只见过黄栌秋季红叶的我们重新认识了夏天花开时的缤纷，今年的天气来得更暖些，黄栌花开的也格外的艳，同时更多的好玩体验加入黄栌花节中，男女老少不同年龄的你都能陶醉其中。赶上这2018年坡峰岭第二届黄栌花节盛事，绝对会让你赞叹！</p>-->

                    <!--<img>-->
                    <!--<p>好一树美丽的黄栌花，又相逢这漫山遍野的粉红海洋——去年此时的首届黄栌花节，让只见过黄栌秋季红叶的我们重新认识了夏天花开时的缤纷，今年的天气来得更暖些，黄栌花开的也格外的艳，同时更多的好玩体验加入黄栌花节中，男女老少不同年龄的你都能陶醉其中。赶上这2018年坡峰岭第二届黄栌花节盛事，绝对会让你赞叹！</p>-->
                    <!--<p>好一树美丽的黄栌花，又相逢这漫山遍野的粉红海洋——去年此时的首届黄栌花节，让只见过黄栌秋季红叶的我们重新认识了夏天花开时的缤纷，今年的天气来得更暖些，黄栌花开的也格外的艳，同时更多的好玩体验加入黄栌花节中，男女老少不同年龄的你都能陶醉其中。赶上这2018年坡峰岭第二届黄栌花节盛事，绝对会让你赞叹！</p>-->
                <!--</section>-->

                <!--<hr class="margin-70">-->

                <!--<div>-->
                    <!--<h3>阳光开心农家乐</h3>-->
                    <!--<p>娄子水村外山野里的农家乐，风味不错，就餐环境一般，适合果园采摘时午餐。食材来自院前山野果树林下放养的千百只鸡、羊和兔子等家畜家禽，还养了几十头杂交野猪，蔬菜也是山坡上的菜地自己种出来的。</p>-->
                    <!--<p><span class="rec-food">推荐美食：</span><span>野猪肉，现摘时令鲜蔬，柴鸡蛋，炖鸡。</span></p>-->
                    <!--<div class="some-info">-->
                        <!--<p>地址：北京房山区周口店镇娄子水村</p>-->
                        <!--<p>价位：人均60元左右</p>-->
                        <!--<p>电话：13801022828</p>-->
                    <!--</div>-->

                <!--</div>-->
                <!--<div>-->
                    <!--<h3>阳光开心农家乐</h3>-->
                    <!--<p>娄子水村外山野里的农家乐，风味不错，就餐环境一般，适合果园采摘时午餐。食材来自院前山野果树林下放养的千百只鸡、羊和兔子等家畜家禽，还养了几十头杂交野猪，蔬菜也是山坡上的菜地自己种出来的。</p>-->
                    <!--<p><span class="rec-food">推荐美食：</span><span>野猪肉，现摘时令鲜蔬，柴鸡蛋，炖鸡。</span></p>-->
                    <!--<div class="some-info">-->
                        <!--<p>地址：北京房山区周口店镇娄子水村</p>-->
                        <!--<p>价位：人均60元左右</p>-->
                        <!--<p>电话：13801022828</p>-->
                    <!--</div>-->
                <!--</div>-->

                <!--<div>-->
                    <!--<h3>当地交通</h3>-->
                    <!--<P>-->
                        <!--幽岚山黄栌花节主场地坡峰岭景区距离北京市区50公里，由县道“新泗路”—省道“周张路”连接周口店镇，约17公里，交通非常方便，手机导航至“坡峰岭”，或者“黄山店村”，都非常准确。有公交车“房32路”连接周口店—黄山店。-->
                    <!--</P>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<h3>自驾游</h3>-->
                    <!--<P>-->
                        <!--推荐自驾游，手机百度地图导航至“坡峰岭风景区”即可到达，非常方便快捷。按六里桥为起点算，北京城区到坡峰岭55公里。-->
                    <!--</P>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<h3>公交车</h3>-->
                    <!--<div class="some-info">-->
                        <!--<P>如果坐公交车，可乘房32路至黄山店村口站，即到坡峰岭景区。</P>-->
                        <!--<P>房32路是北京市房山区内的一条公交线路，起点站周口店站，终点站泗马沟。</P>-->
                        <!--<P>首末班车时间：</P>-->
                        <!--<P>泗马沟—周口店客运站，首末班：05:30-19:30;</P>-->
                        <!--<P>周口店客运站—泗马沟，首末班：05:30-19:30。</P>-->
                    <!--</div>-->
                <!--</div>-->



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
        name: "infoDetailPage",
        props:['id'],
        computed: mapState({
            infoDetail: function(state) {
                if(state.home.infoDetail[this.id]){
                    return state.home.infoDetail[this.id]
                }else{
                    return JSON.parse(sessionStorage.getItem('infoDetail'))[this.id]
                }
               }
        })
    }
</script>

<style scoped lang="less">

    h3{
        text-align: left;
        font-size: 14px;
        font-family: SourceHanSansCN-Medium;
        color: #191919;
        height: 14px;
        line-height: 1;
        margin: 24px 0;
    }

    .margin-70{
        margin: 70px 0;
    }

    .rec-food{
        color: #FF7F0D;
    }

    p{
        font-size: 14px;
        color: #5E5E60;
        /*height: 20px;*/
        line-height: 20px;
        margin-bottom: 24px;
    }

    .some-info{
        p{
            margin-bottom: 0px;
            &:nth-last-of-type(1){
                margin-bottom: 40px;
            }
        }
    }

    .detail-page{
        padding: 60px 32px;
    }

    .inner-content{
        height: 526px;
        margin-bottom: 40px;
        img{
            width: 848px;
            height: 526px;
            margin-right: 32px;
            margin-bottom: 0;
            float: left;
        }

        div{
            width: 496px;
            float: right;
            p{
                margin-bottom: 64px;
            }
        }
    }
</style>