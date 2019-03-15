<template>
    <div class="scenicSpot">
        <img :src="src" :alt="alt">
        <div class="scope-container">
            <div class="up-img "></div>
            <div class="up-img up-img-text SHCN-M">AAAAA级景区</div>
            <div class="scope-top">
                <span v-html="name">龙门景区</span>
                <!--<span>好评率<span v-html="praiseRate"></span>%</span>-->
            </div>
            <div class="scope-bottom">
                <span class="SHCN-M">￥</span>
                <span>
                            <span v-html="money" class="SHCN-B"></span>元
                        </span>
                <span class="SHCN-L">
                    <!--已售-->
                            <span v-html="saledNum">

                </span>
                        </span>
                <button @click="toDetail(id)">
                    立即购买
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "scenicSpotsList",
        props:['name','praiseRate','money','saledNum','id','src','alt'],
        methods:{
            toDetail:function(id){
                this.$router.push({name:'ticketDetailPage',params:{id: id}});
            },
        }
    }
</script>

<style scoped>
    .scenicSpot{
        width: 280px;
        height: 303px;
        margin-right: 26px;
        margin-bottom: 26px;
    }

    img{
        width: 280px;
        height: 205px;
        /*background-color: #AFB0B3;*/
        display: block;
    }

    .scope-container{
        position: relative;
        width: 280px;
        height: 98px;
        padding: 26px 0 0 20px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        border: 1px solid #ECECEC;
        border-top: none;
    }

    .scope-top{
        margin-bottom: 18px;
    }

    .scope-top>span:first-child {
        font-size: 16px;
        color: #191919;
        font-weight: 700;
        letter-spacing: 0.8px;
    }
    /*.scope-top>span:last-child {*/
        /*float: right;*/
        /*font-size: 12px;*/
        /*color: #5E5E60;*/
        /*margin-right: 38px;*/
    /*}*/

    .scope-bottom>span:first-child{
        margin-left: -2px;
        font-size: 14px;
        color: #FF8314;
    }
    .scope-bottom>span:nth-child(2){
        font-size: 20px;
        color: #FF7F0D;
    }
    .scope-bottom>span:nth-child(3){
        margin-left: 8px;
        font-size: 12px;
        color: #5E5E60;
    }
    .scope-bottom>button{
        width: 73px;
        height: 25px;
        float: right;
        /*margin-right: 24px;*/
        margin: -16px 20px 0 0;
        background: #4B7FF0;
        border-radius: 2px;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        color: #fff;
        /*margin-top: -20px;*/
    }
    button{
        border: none;
        cursor: pointer;
    }

    button:focus{
        outline: none;
    }

    .up-img{
        position: absolute;
        width: 280px;
        height: 20px;
        opacity: 0.25;
        background: #000;
        top: -24px;
        left: -1px;
        text-align: center;
        line-height: 20px;
    }
    .up-img-text{
        opacity: 1;
        background: transparent;
        color: #FFF;
        font-size: 14px;
    }
</style>