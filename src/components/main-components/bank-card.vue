<template>
    <div>
        <div v-for="(item,index) in bankCardList" :key="index" class="bank-card-div" >
            <div class="clearAll bank-card-head" :data-name="item.bank.bankCode" >
                <!--style="background:url('../../assets/bankCardLogo/ABC.png')"-->

                <canvas class="myCanvas" :data-name="item.bank.bankCode" width="214" height="68">
                </canvas>
                <div class="bank-logo fl">
                </div>
                <div class="bank-name fl">
                    中国{{item.bank.bankName}}
                </div>
                <div class="fl bank-number clearAll">
                    <span>****</span>
                    <span>****</span>
                    <span>****</span>
                    <span>{{item.accountNo}}</span>
                </div>
            </div>

        </div>
        <div  v-if="!bankCardList.length" class="no-bank">
            <div class="no-bank-card">

            </div>
            <div class="no-bank-text">
                您没有绑定银行卡
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "bank-card",
        props: {
                bankCardList:{
                    type: Array,
                    default: []
                }
            },
        mounted(){
            let c = document.getElementsByClassName("myCanvas"),
                arr = Array.from(c),
                addColor = (grd,[r,g,b])=>{
                    grd.addColorStop(0,`rgba(${r},${g},${b},.7)`);
                    grd.addColorStop(1,`rgba(${r},${g},${b},1)`);
                };
            arr.forEach((item)=>{
                let ctx = item.getContext("2d"),
                    grd=ctx.createLinearGradient(0,0,214,0),
                    dataName = item.getAttribute("data-name");
                console.log(dataName);
                switch (dataName) {
                    case "ABC":
                        addColor(grd,[5,152,123]);
                        break;
                    case "BEA":
                        addColor(grd,[224,50,71]);
                        break;
                    case "BOB":
                        addColor(grd,[227,19,27]);
                        break;
                    case "BOC":
                        addColor(grd,[156,33,50]);
                        break;
                    case "BOCM":
                        addColor(grd,[0,45,155]);
                        break;
                    case "BOHC":
                        addColor(grd,[0,66,142]);
                        break;
                    case "BOS":
                        addColor(grd,[252,207,0]);
                        break;
                    case "CCB":
                        addColor(grd,[1,102,178]);
                        break;
                    case "CDCB":
                        addColor(grd,[246,171,0]);
                        break;
                    case "CDRCB":
                        addColor(grd,[1,109,66]);
                        break;
                    case "CEB":
                        addColor(grd,[110,23,138]);
                        break;
                    case "CGB":
                        addColor(grd,[229,0,31]);
                        break;
                    case "CIB":
                        addColor(grd,[0,67,138]);
                        break;
                    case "CITIB":
                        addColor(grd,[62,50,115]);
                        break;
                    case "CITIC":
                        addColor(grd,[222,32,16]);
                        break;
                    case "CMB":
                        addColor(grd,[232,33,19]);
                        break;
                    case "CMBC":
                        addColor(grd,[0,173,93]);
                        break;
                    case "CZSB":
                        addColor(grd,[222,183,13]);
                        break;
                    case "EBCL":
                        addColor(grd,[172,136,84]);
                        break;
                    case "HXB":
                        addColor(grd,[216,31,24]);
                        break;
                    case "ICBC":
                        addColor(grd,[200,26,34]);
                        break;
                    case "LSCCB":
                        addColor(grd,[239,48,52]);
                        break;
                    case "LSZSH":
                        addColor(grd,[218,36,25]);
                        break;
                    case "NCCC":
                        addColor(grd,[3,2,1]);
                        break;
                    case "PAB":
                        addColor(grd,[234,85,4]);
                        break;
                    case "PSBC":
                        addColor(grd,[0,128,63]);
                        break;
                    case "PZHCCB":
                        addColor(grd,[251,23,17]);
                        break;
                    case "SCB":
                        addColor(grd,[19,165,36]);
                        break;
                    case "SCRCU":
                        addColor(grd,[234,4,22]);
                        break;
                    case "SDB":
                        addColor(grd,[0,128,203]);
                        break;
                    case "SG":
                        addColor(grd,[215,23,24]);
                        break;
                    case "SHBC":
                        addColor(grd,[24,147,254]);
                        break;
                    case "SNCCB":
                        addColor(grd,[44,108,152]);
                        break;
                    case "SPDB":
                        addColor(grd,[31,32,137]);
                        break;
                    case "UOB":
                        addColor(grd,[247,45,17]);
                        break;
                    case "YACCB":
                        addColor(grd,[1,139,58]);
                        break;
                    case "ZGCB":
                        addColor(grd,[252,37,1]);
                        break;
                    default:
                            break;
                }
                ctx.fillStyle=grd;
                ctx.fillRect(0,0,214,68);
            });



        },
    }
</script>

<style scoped lang="less">
    .bank-card-div{
        width: 236px;
        height: 114px;
        border: 1px solid #ccc;
        color: #fff;
        float: left;
        margin: 0 0 14px 14px;
        position: relative;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -o-border-radius: 5px;
        border-radius: 5px;
        font-size: 14px;
        -webkit-box-shadow: 1px 1px 5px #888;
        -moz-box-shadow: 1px 1px 5px #888;
        -o-box-shadow: 1px 1px 5px #888;
        box-shadow: 1px 1px 5px #888;
        padding: 10px;
        background: #fff;
        /*transition: .1s;*/
        &:hover{
            border: 2px solid #50B8F5;
            padding: 9px;
        }
        &>div{
            width: 100%;
            height: 68px;
            background: #ccc;
            overflow: hidden;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            -o-border-radius: 3px;
            border-radius: 3px;
            .bank-logo{
                width: 24px;
                height: 24px;
                margin: 7px 4px 10px 14px;
                background-color: #fff;
                -webkit-background-size: contain;
                -moz-background-size: contain;
                -o-background-size: contain;
                background-size: contain;

                /*background: #000;*/
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                -o-border-radius: 50%;
                border-radius: 50%;
            }
            .bank-name{
                margin-top: 13px;
                height: 12px;
                line-height: 1;

            }
            .bank-number{
                width: 100%;
                span{
                    display: inline-block;
                    float: left;
                    margin-left: 24px;
                    &:first-of-type{
                        margin-left: 34px;
                    }
                    &:last-of-type{
                        margin-top: -3px;
                    }
                }
            }
        }
    }

    .bank-card-head{
        position: relative;
        z-index: 2;
        background: transparent !important;
    }

    .myCanvas{
        position: absolute;
        z-index: -1;
    }
    .no-bank {
        margin: 30px auto 0;
        width: 125px;
        height: 95px;
        text-align: center;
        font-size: 15px;
        &-card {
            margin-bottom: 20px;
            width: 125px;
            height: 75px;
            background: url("../../assets/bankCardLogo/no_bank_card.png");
            -webkit-background-size: contain;
            -moz-background-size: contain;
            -o-background-size: contain;
            background-size: contain;
        }
        &-text{
            margin-left: -10px;
        }
    }

    div[data-name="ABC"]{
        /*background:linear-gradient(90deg,rgba(5,152,123,.7),rgba(5,152,123,1));*/
        /*background: transparent;*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/ABC.png");
            background-position: 0 -1px;
        }
    }

    div[data-name="BEA"]{
        /*background:linear-gradient(90deg,rgba(224,50,71,.7),rgba(224,50,71,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/BEA.png");
            background-position: 1px 0;
        }
    }

    div[data-name="BOB"]{
        /*background:linear-gradient(90deg,rgba(227,19,27,.7),rgba(227,19,27,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/BOB.png");
        }
    }

    div[data-name="BOC"]{
        /*background:linear-gradient(90deg,rgba(156,33,50,.7),rgba(156,33,50,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/BOC.png");
        }
    }

    div[data-name="BOCM"]{
        /*background:linear-gradient(90deg,rgba(0,45,155,.7),rgba(0,45,155,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/BOCM.png");
            background-position: 0 -1px;
        }
    }

    div[data-name="BOHC"]{
        /*background:linear-gradient(90deg,rgba(0,66,142,.7),rgba(0,66,142,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/BOHC.png");
        }
    }

    div[data-name="BOS"]{
        /*background:linear-gradient(90deg,rgba(252,207,0,.7),rgba(252,207,0,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/BOS.png");
        }
    }

    div[data-name="CCB"]{
        /*background:linear-gradient(90deg,rgba(1,102,178,.7),rgba(1,102,178,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/CCB.png");
        }
    }

    div[data-name="CDCB"]{
        /*background:linear-gradient(90deg,rgba(246,171,0,.7),rgba(246,171,0,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/CDCB.png");
        }
    }

    div[data-name="CDRCB"]{
        /*background:linear-gradient(90deg,rgba(1,109,66,.7),rgba(1,109,66,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/CDRCB.png");
            background-position: -1px 0;
        }
    }

    div[data-name="CEB"]{
        /*background:linear-gradient(90deg,rgba(110,23,138,.7),rgba(110,23,138,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/CEB.png");
        }
    }

    div[data-name="CGB"]{
        /*background:linear-gradient(90deg,rgba(229,0,31,.7),rgba(229,0,31,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/CGB.png");
            background-position: 0 -2px;
        }
    }

    div[data-name="CIB"]{
        /*background:linear-gradient(90deg,rgba(0,67,138,.7),rgba(0,67,138,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/CIB.png");
        }
    }

    div[data-name="CITIB"]{
        /*background:linear-gradient(90deg,rgba(62,50,115,.7),rgba(62,50,115,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/CITIB.png");
        }
    }

    div[data-name="CITIC"]{
        /*background:linear-gradient(90deg,rgba(222,32,16,.7),rgba(222,32,16,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/CITIC.png");
        }
    }

    div[data-name="CMB"]{
        /*background:linear-gradient(90deg,rgba(232,33,19,.7),rgba(232,33,19,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/CMB.png");
        }
    }


    div[data-name="CMBC"]{
        /*background:linear-gradient(90deg,rgba(0,173,93,.7),rgba(0,173,93,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/CMBC.png");
        }
    }


    div[data-name="CZSB"]{
        /*background:linear-gradient(90deg,rgba(222,183,13,.7),rgba(222,183,13,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/CZSB.png");
        }
    }


    div[data-name="EBCL"]{
        /*background:linear-gradient(90deg,rgba(172,136,84,.7),rgba(172,136,84,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/EBCL.png");
        }
    }



    div[data-name="HXB"]{
        /*background:linear-gradient(90deg,rgba(216,31,24,.7),rgba(216,31,24,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/HXB.png");
        }
    }



    div[data-name="ICBC"]{
        /*background:linear-gradient(90deg,rgba(200,26,34,.7),rgba(200,26,34,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/ICBC.png");
        }
    }



    div[data-name="LSCCB"]{
        /*background:linear-gradient(90deg,rgba(239,48,52,.7),rgba(239,48,52,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/LSCCB.png");
        }
    }



    div[data-name="LSZSH"]{
        /*background:linear-gradient(90deg,rgba(218,36,25,.7),rgba(218,36,25,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/LSZSH.png");
        }
    }



    div[data-name="NCCC"]{
        /*background:linear-gradient(90deg,rgba(3,2,1,.7),rgba(3,2,1,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/NCCC.png");
        }
    }

    div[data-name="PAB"]{
        /*background:linear-gradient(90deg,rgba(234,85,4,.7),rgba(234,85,4,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/PAB.png");
        }
    }

    div[data-name="PSBC"]{
        /*background:linear-gradient(90deg,rgba(0,128,63,.7),rgba(0,128,63,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/PSBC.png");
        }
    }

    div[data-name="PZHCCB"]{
        /*background:linear-gradient(90deg,rgba(251,23,17,.7),rgba(251,23,17,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/PZHCCB.png");
        }
    }

    div[data-name="SCB"]{
        /*background:linear-gradient(90deg,rgba(19,165,36,.7),rgba(19,165,36,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/SCB.png");
        }
    }

    div[data-name="SCRCU"]{
        /*background:linear-gradient(90deg,rgba(234,4,22,.7),rgba(234,4,22,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/SCRCU.png");
        }
    }

    div[data-name="SDB"]{
        /*background:linear-gradient(90deg,rgba(0,128,203,.7),rgba(0,128,203,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/SDB.png");
        }
    }

    div[data-name="SG"]{
        /*background:linear-gradient(90deg,rgba(215,23,24,.7),rgba(215,23,24,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/SG.png");
        }
    }

    div[data-name="SHBC"]{
        /*background:linear-gradient(90deg,rgba(24,147,254,.7),rgba(24,147,254,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/SHBC.png");
        }
    }

    div[data-name="SNCCB"]{
        /*background:linear-gradient(90deg,rgba(44,108,152,.7),rgba(44,108,152,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/SNCCB.png");
        }
    }

    div[data-name="SPDB"]{
        /*background:linear-gradient(90deg,rgba(31,32,137,.7),rgba(31,32,137,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/SPDB.png");
        }
    }

    div[data-name="UOB"]{
        /*background:linear-gradient(90deg,rgba(247,45,17,.7),rgba(247,45,17,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/UOB.png");
        }
    }

    div[data-name="YACCB"]{
        /*background:linear-gradient(90deg,rgba(1,139,58,.7),rgba(1,139,58,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/YACCB.png");
        }
    }

    div[data-name="ZGCB"]{
        /*background:linear-gradient(90deg,rgba(252,37,1,.7),rgba(252,37,1,1));*/
        .bank-logo{
            background-image: url("../../assets/bankCardLogo/ZGCB.png");
            background-position: 1px -1px;
        }
    }

</style>