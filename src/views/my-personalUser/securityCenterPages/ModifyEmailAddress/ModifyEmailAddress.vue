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
                请输入登录密码：<Input v-model="password" class="password" placeholder="Enter something..." style="width: 300px" />
            </div>
            <div class="input-verification">
                验证码：<Input v-model="verificationCode" class="import-verification-code" placeholder="Enter something..." style="width: 170px" />
                <Button type="primary" style="width: 100px"  class="verification-code">发送短信</Button>
            </div>
            <router-link :to="{path:'/my-personalUser/ValidationEmail'}">
                <Button type="primary" class="btnConfirm" @click="next">确定</Button>
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
                current:0
            }
        },
        methods: {
            next() {
                // if(this.current == 3) {
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
.btnConfirm {
    margin: 50px 0 0 90px;
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
    margin: 50px 0 0 330px;
}
.import-verification-code{
    margin-left: 58px;
}
.cardTitle {
    font-size: 20px;
    color: #191919;
}
</style>

