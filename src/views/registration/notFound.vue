<template>
    <div class="notfound-box">
        <div>
            <h2>
                哎呀，<br>
                你迷路了...
            </h2>
            <p>
                请刷新页面或点击下方按钮返回首页
            </p>
            <Button type="primary" @click="toHome">返回首页</Button>
        </div>
        <!--<div class="notfound-box">-->
            <!---->
        <!--</div>-->
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: "notFound",
        methods:{
            ...mapMutations([
                'changeActiveName'
            ]),
            toHome () {
                this.changeActiveName('1');
                this.$router.push({
                    path: '/'
                });
            },

        }
    }
</script>

<style scoped lang="less">
    .notfound{
        /*position: relative;*/
        /*width: 100%;*/
        /*height: 100%;*/
        background: url('../../assets/bg_page404.png') no-repeat;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
    .notfound-box{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 1180px;
        height: 828px;
        /*margin-left: -590px;*/
        /*margin-top: -404px;*/
        background: url('../../assets/bg_page404small.png') no-repeat;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;

        >div{
            margin: 430px 0 0 660px;
            h2{
                font:36px SourceHanSansCN-Regular;
                color: #191919;
                line-height: 44px;
            }

            p{
                margin: 32px 0 88px 0;
                font: 16px SourceHanSansCN-Light;
                color: #191919;
            }

            button{
                width: 200px;
                height: 40px;
                font: 16px SourceHanSansCN-Medium;
                background: #4B7FF0;
                -webkit-border-radius: 2px;
                -moz-border-radius: 2px;
                border-radius: 2px;
                color: #FFF;
            }
        }
    }
</style>