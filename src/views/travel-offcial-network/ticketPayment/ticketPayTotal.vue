<template>
    <div class="scope-container common-second">
        <div class="step-container">
            <Steps :current="0">
                <Step title="" content="填写订单信息"></Step>
                <Step title="" content="选择支付方式"></Step>
                <Step title="" content="完成" class="step-3"></Step>
            </Steps>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "ticketPayTotal"
    }
</script>

<style scoped>
    .scope-container{
        background: #F5F8FB;
        padding-top: 24px;
        padding-bottom: 25px;
        margin: auto;
    }
    .step-container{
        width: 62.5%;
        min-width: 1200px;
        height: 76px;
        background: #FFFFFF;
        padding-top: 15px;
        padding-left: 284px;
        margin: auto;
        margin-bottom: 16px;
        /*text-align: center;*/
    }




</style>