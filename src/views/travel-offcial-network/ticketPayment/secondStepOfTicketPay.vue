<template>
    <div class="scope-second-container">
        <h2 class="order-tt">
            <div class="success-logo SHCN-M"></div>
            订单提交成功，现在只差最后一步了！
        </h2>
        <p class="will-cancel">请您在提交订单后45分钟内完成支付，否则订单会自动取消！</p>
        <hr class="short-hr">

        <p>
            <span>商品名称：</span>
            <span>曾家山景区门票电子票（成人票）</span>
        </p>
        <p>
            <span>订单编号：</span>
            <span>123244345348634455</span>
        </p>
        <p>
            <span>费用明细：</span>
            <span>成人票1张x45</span>
        </p>
        <p>
            <span>交易类型：</span>
            <span>及时扣款</span>
        </p>
        <p>
            <span>入园时间：</span>
            <span>2018-09-08</span>
        </p>
        <p>
            <span>支付金额：</span>
            <span class="money-symbol SHCN-M">¥</span>
            <span class="money-data SHCN-B">60元</span>
        </p>
        <p>
            <span>支付方式：</span>
            <RadioGroup v-model="phone">
                <Radio label="apple">
                    <Icon type="logo-apple"></Icon>
                    <span>支付宝</span>
                </Radio>
                <Radio label="android">
                    <Icon type="logo-android"></Icon>
                    <span>微信</span>
                </Radio>
                <Radio label="windows">
                    <Icon type="logo-windows"></Icon>
                    <span>中国银联</span>
                    <span class="quick-payment">（银行卡快捷支付）</span>
                </Radio>
            </RadioGroup>
        </p>

        <Button type="primary" class="pay-button SHCN-M">立即支付</Button>
    </div>
</template>

<script>
    export default {
        name: "secondStepOfTicketPay"
    }
</script>

<style scoped lang="less">
    .scope-second-container{
        width: 1440px;
        background: #FFF;
        padding-top: 56px;
        padding-bottom: 104px;
        margin: auto;
        .order-tt{
            margin-left: 450px;
        }
        p{
            margin-left: 474px;
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

        h2{
            position: relative;
        }
    }
</style>