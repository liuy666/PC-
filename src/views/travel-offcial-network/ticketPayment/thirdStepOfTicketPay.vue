<template>
    <div class="scope-third-container">
        <div class="app-qr-code">
            <img>
            <p>下载易旅宝手机APP
            </p>
            <p>实时跟踪订单详情
            </p>
        </div>
        <h2 class="order-tt">
            <div class="success-logo SHCN-M"></div>
            您的订单支付成功！
        </h2>
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

        <div class="safe-tips">
            <h3 class="SHCN-M">安全提醒：</h3>
            <p>请不要将银行卡、密码、手机验证码提供给他人</p>
            <p>我们不会通过任何非官方电话、QQ、微博、微信与您联系。任何以预定房间取消，订单取消等理由要求您进行退款或取消订单的都是骗子</p>
            <p>官方客服电话：465163415</p>
        </div>

        <Button type="primary" class="pay-button SHCN-M">继续预定</Button>
        <Button type="primary" class="pay-button SHCN-M">查看我的订单</Button>
    </div>
</template>

<script>
    export default {
        name: "thirdStepOfTicketPay"
    }
</script>

<style scoped lang="less">
    .scope-third-container{
        position:relative;
        width: 1440px;
        background: #FFF;
        padding: 56px 229px 104px 229px;
        margin: auto;
    .order-tt{
        margin-left: 365px;
    }

        h2{
            position: relative;
        }
    p{
        margin-left: 131px;
    }
    .pay-button{
        margin-top: 73px;
        margin-left: 287px;
    }

    .quick-payment{
        position: absolute;
        font-size: 12px;
        color: #5E5E60;
        left: 13px;
        top: 18px;
    }

        .app-qr-code{
            width: 190px;
            height: 248px;
            border: 1px solid #DBDBDE;
            position: absolute;
            right: 359px;
            top: 217px;
            padding: 25px;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            img{
                width: 140px;
                height: 140px;
                margin-bottom: 24px;
            }
            p{
                margin-left: 0;
                text-align: center;
                height: 14px;
                line-height: 1;
                margin-bottom: 8px;
            }
        }

        .safe-tips{
            background: #F2F6FE;
            border: 1px solid #AEC7FF;
            border-radius: 2px;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            height: 156px;
            padding: 30px 66px;
            margin-top: 64px;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            p{
                margin-left: 0;
                font-size: 14px;
                color: #5E5E60;
                height: 14px;
                line-height: 1;
                margin-bottom: 8px;
                font-weight: 500;
            }
            h3{
                font-size: 18px;
                color: #F54112;
                height: 18px;
                line-height: 1;
                margin-bottom: 16px;
            }
        }
        .pay-button{
            width: 180px;
        }
        .pay-button:nth-of-type(2){
            margin-left: 51px;
            border: 1px solid #4B7FF0;
            color: #4B7FF0;
            background: #FFF;
        }
    }
</style>