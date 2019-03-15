<template>
    <div id="order-container">
        <div class="steps">
            <Steps :current="currStep">
                <Step title="选择票类" content=""></Step>
                <Step title="确认订单" content=""></Step>
            </Steps>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "order-steps",
        computed: {
            currStep() {
                return this.$store.state.distributorOrder.currStep;
            }
        }
    }
</script>

<style scoped lang="less">
    #order-container {
        background: #F5F8FB;
        padding-top: 24px;
        padding-bottom: 25px;
        margin: 0 auto;
        .steps {
            min-width: 1200px;
            max-width: 1440px;
            height: 76px;
            background: #FFFFFF;
            margin: 0 auto 16px;
            overflow: hidden;
            .ivu-steps {
                width: 500px;
                margin: 27px auto 0;
                .ivu-steps-item {
                    width: 360px!important;
                    font-size: 14px;
                    color: #191919;
                    letter-spacing: 0;
                    .ivu-steps-main {
                        vertical-align: middle;
                    }
                    &:nth-of-type(2) {
                        width: 140px!important;
                    }
                }
            }
        }
    }
</style>