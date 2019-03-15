<template>
    <div class="ModifyEmailAddress">
        <template v-if="isShowLoading">
            <loading></loading>
        </template> 
        <p slot="title" class="cardTitle">
            <span>验证邮箱</span>
        </p>  
            <!-- <p>当前正在进行第 {{ current + 1 }} 步</p> -->
        <Steps :current="current">
            <Step title="验证身份"></Step>
            <Step title="修改邮箱"></Step>
            <Step title="修改完成"></Step>
        </Steps>

            <div class="prompt-message-block">
                <span class="title-prompt-message-text"><img src="../../../../assets/icon_success48.png" alt="邮箱验证成功">邮箱验证成功！</span>
                <router-link :to="{path:'/my-personalUser/successfulAuthentication'}">
                    <Button type="primary" class="btnConfirm" @click="next">去首页</Button>
                </router-link>
            </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                password:'',
                verificationCode:'',
                isShowLoading:false,
                current:3
            }
        },
        methods: {
            next() {
                // if(this.current == 2) {
                //     this.current = 0;
                // } else if(this.current === 4) {
                //     return
                // }else {
                //     this.current += 1;
                //     return
                // }
            }
        }
    }
</script>

<style scoped>
.ivu-steps {
    margin-left: 140px;
}
img {
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 31%;
}
.prompt-message-text {
    line-height: 28px;
    font-size: 18px;
}
.title-prompt-message-text {
    font-size: 36px;
    color: #191919;
    margin: 56px 0 24px;
    position: relative;
}
.prompt-message-block {
    padding: 50px 0 0 100px;
}
.prompt-message-block span {
    display: block;
    text-align: center;
}
.btnConfirm {
    margin: 50px 0 0 354px;
    padding: 5px 100px;
    font-size: 15px;
}
.verification-code {
    margin-left: 30px;
}
.input-verification {
    margin-top: 20px;
}
.password {
    margin-left: 10px;
}
.verificationCode-password-block {
    padding: 50px 0 0 330px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ECECEC;   
}
.import-verification-code{
    margin-left: 58px;
}
.cardTitle {
    font-size: 20px;
    color: #191919;
}
</style>

