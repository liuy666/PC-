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

        <div class="verificationCode-password-block">
            <div class="input-verification">
                E-mail地址：<Input v-model="password" class="password" placeholder="请输入邮箱" style="width: 300px" />
                <Button type="primary" style="width: 125px"  class="verification-code">立即发送验证邮件</Button>
            </div>
        </div>
            <div class="prompt-message-block">
                <span class="title-prompt-message-text">已发送验证邮件至：4****1@qq.com</span>
                <span class="prompt-message-text">请您登录邮箱，点击邮件中的链接完成邮箱验证，</span>
                <span class="prompt-message-text">如果您超过2分钟未收到邮件，您可以重新发送。</span>
                <router-link :to="{path:'/my-personalUser/successfulAuthentication'}">
                    <Button type="primary" class="btnConfirm" @click="next">查看邮箱</Button>
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
                current:1
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
.prompt-message-text {
    line-height: 28px;
    font-size: 18px;
}
.title-prompt-message-text {
    font-size: 36px;
    color: #191919;
    margin: 56px 0 24px;
}
.prompt-message-block {
    padding: 50px 0 0 100px;
}
.prompt-message-block span {
    display: block;
    text-align: center;
}
.btnConfirm {
    margin: 50px 0 0 380px;
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

