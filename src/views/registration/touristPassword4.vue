<template>
    <div class="width-1200 registra-tourist found-password">
        <h2>游客</h2>
        <hr>

        <h3>密码找回</h3>

        <div class="steps">
            <div class="active">
                <span>1</span>
                <span>填写账户名</span>
                <div class="tri-r1">
                    <div class="tri-r">

                    </div>
                </div>
                <!--<div class="tri-r2">-->
                <!--<div class="tri-r">-->

                <!--</div>-->
                <!--</div>-->
            </div>
            <div class="active">
                <span>2</span>
                <span>验证身份</span>
                <div class="tri-r1">
                    <div class="tri-r">

                    </div>
                </div>
                <div class="tri-r2">
                    <div class="tri-r">

                    </div>
                </div>
            </div>
            <div class="active">
                <span>3</span>
                <span>设置新密码</span>
                <div class="tri-r1">
                    <div class="tri-r">

                    </div>
                </div>
                <div class="tri-r2">
                    <div class="tri-r">

                    </div>
                </div>
            </div>
            <div class="active">
                <span>4</span>
                <span>完成</span>
                <!--<div class="tri-r1">-->
                <!--<div class="tri-r">-->

                <!--</div>-->
                <!--</div>-->
                <div class="tri-r2">
                    <div class="tri-r">

                    </div>
                </div>
            </div>
        </div>

        <div class="tips">
           <span></span>
            <span>找回密码成功！</span>
        </div>

        <div class="tips-behind">点击下方按钮前往登录</div>


        <div class="z-mgl">




                <div class="mg1">
                    <Button type="primary" long  class="btn btn1 btn-next" @click="toLogin">去登录</Button>
                </div>

                <br>


        </div>


    </div>


</template>

<script>
    export default {
        name: "touristPassword3",

        methods:{
            toLogin(){
                this.$router.push({name:'login'});
            }
        }
    }
</script>

<style scoped lang="less">
    .btn2{
        margin-left: 24px;
    }

    .tips{
        width: 305px;
        margin: 0 auto 24px;
        span:first-of-type{
            background: url('../../assets/icon_success48.png') no-repeat;
        }
    }
</style>