<template>
    <div class="scope-fail-container">
        <h2 class="order-tt">
            <div class="fail-logo SHCN-M"></div>
            您的订单支付失败！
        </h2>
        <p class="will-cancel">请您在提交订单后45分钟内完成支付，否则订单会自动取消！</p>
        <hr class="short-hr">

        <p>
            <span>商品名称：</span>
            <span>曾家山景区门票电子票（成人票）</span>
        </p>

        <p>
            <span>支付金额：</span>
            <span class="money-symbol SHCN-M">¥</span>
            <span class="money-data SHCN-B">60元</span>
        </p>


        <Button type="primary" class="pay-button SHCN-M">继续支付</Button>
        <div class="trouble-link">
            <a>支付遇到问题，请点击</a>
        </div>

    </div>
</template>

<script>
    export default {
        name: "failTicketPay"
    }
</script>

<style scoped lang="less">
    .scope-fail-container{
        width: 1440px;
        background: #FFF;
        padding-top: 56px;
        padding-bottom: 104px;
        margin: auto;
    .order-tt{
        margin-left: 594px;
        color: #F54112;
    }
    p{
        margin-left: 592px;
        &.will-cancel{
            margin-left: 476px;
        }
    }
        h2{
            position: relative;
        }
    .pay-button{
        margin-top: 73px;
        margin-left: 600px;
    }

    .quick-payment{
        position: absolute;
        font-size: 12px;
        color: #5E5E60;
        left: 13px;
        top: 18px;
    }

        .fail-logo{
            width: 48px;
            height: 48px;
            background: url("../../../assets/icon_fail48.png") no-repeat;
            position: absolute;
            left: -72px;
        }

        .trouble-link{
            font-size: 16px;
            color: #4B7FF0;
            text-align: center;
            margin-top: 16px;
        }
    }
</style>