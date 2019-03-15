<template>
    <div id="confirmOrder">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <div class="wrapper">
            <h2>{{ providerName}}</h2>
            <div class="detail">
                <span>联系人：{{ contact }}</span>
                <span>联系电话：{{ tel }}</span>
                <span>证件号码：{{ card }}</span>
                <span>客源地：{{ region }}</span>
            </div>
            <radio-table
                :colname="colnames"
                :total="total"
                :isPage="false"
                :tableData="tableData">
            </radio-table>
            <div class="totalPrice">共计：¥{{ totalPrice }}</div>
            <h2>备注信息</h2>
            <Input 
                v-model="textareaVal" 
                @input="validateWords"
                :maxlength="100"
                placeholder="请留下您的备注信息~" 
                style="width: 100%;font-size: 14px;"
                :autosize="{ minRows: 2 }"
                type="textarea" />
            <div class="tips">已输入<span>{{ havedInput }}</span>/100字</div>
            <Button 
                type="primary"
                class="submitBtn"
                @click="submitConfirm">确认订单</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'order-confirm',
        data() {
            return {
                total: 0,
                tableData: [],
                colnames: [
                    {
                        title: '票名',
                        key: 'ticketname',
                        minWidth: 180
                    },
                    {
                        title: '票种',
                        key: 'szcrowdkindname',
                        minWidth: 180
                    },
                    {
                        title: '单价',
                        render: (h,params) => {
                            return h('span','¥ ' + params.row.mactualsaleprice);
                        },
                        width: 100
                    },
                    {
                        title: '佣金',
                        width: 100,
                        render: (h,params) => {
                            if(params.row.commisionType === 0) {
                                return h('span','¥ ' + params.row.commision);
                            }
                            if(params.row.commisionType === 1) {
                                return h('span',params.row.commision + ' %');
                            }
                        }
                    },
                    {
                        title: '结算价',
                        render: (h,params) => {
                            return h('span', '¥ ' + params.row.jsprice);
                        },
                        width: 100
                    },
                    {
                        title: '数量',
                        key: 'totalnum',
                        width: 120
                    },
                    {
                        title: '小计',
                        width: 100,
                        render: (h,params) => {
                            return h('span', '¥ ' + params.row.total);
                        }
                    }
                ],
                textareaVal: '', // 备注信息
                urlParams: null, // 请求的参数对象
                contact: '', // 联系人
                tel: '', // 联系电话
                card: '', // 证件号码
                region: '', // 客源地
                totalPrice: '', // 小计
                providerName: '', // 服务商名称
                usid: '', // 用户id
                isShowLoading: false,
                havedInput: 0, // 已近输入的字数
            }
        },
        // 路由完成后，页面初始化
        created() {
            // 也可以拿到路由传递的参数
            // console.log(this.$router);
            // this.$router.history.current.params
            // console.log(this.$route);
            if(!Object.keys(this.$route.params).length) {
                this.$router.push({
                    name: 'distributor-order'
                });
                return;
            }

            this.$store.commit('setStep',1);

            // 对象解构
            let {orderInfo, pageData, totalPrice, usid, otherInfo, orderChannel, channelName} = this.$route.params;

            // 初始化门票详情表格
            this.urlParams = {...orderInfo};
            this.orderChannel = orderChannel;
            this.channelName = channelName;
             
            let data = pageData.data.list[0]; // 未考虑多张票的情况
            data = Object.assign({},data,{
                szcrowdkindname: otherInfo.szcrowdkindname,
                commisionType: otherInfo.commisionType,
                commision: otherInfo.commision,
                jsprice: otherInfo.jsprice,
                total: totalPrice
            })
            this.tableData.push(data);
            this.total = 1; // 未考虑多张票的情况

            // 服务商
            this.providerName = pageData.data.lprlist[0].providername;

            // 领票人
            this.contact = pageData.data.lprlist[0].daoyou;
            this.tel = pageData.data.lprlist[0].mobile;
            this.card = pageData.data.lprlist[0].zjhm;
            this.region = pageData.data.lprlist[0].address;

            // 小计
            this.totalPrice = totalPrice;

            // 用户名
            this.usid = usid;
        },
        methods: {
            async submitConfirm() {
                this.isShowLoading = true;
                const res = await this.$api.post(this.lee + '/ec/distribute/v1/saveOrderForDistributor',{
                    usid: this.usid,
                    orderInfo: JSON.stringify(this.urlParams),
                    orderChannel: this.orderChannel,
                    channelName: this.channelName,
                    remark: this.textareaVal,
                    // returnUrl: `http://${ window.location.hostname }/#/my-account/MySalesOrder`
                    returnUrl: 'http://' + window.location.hostname
                });
                // console.log(res);
                if(!res) {
                    this.isShowLoading = false;
                    return;
                }
                this.isShowLoading = false;
                window.location.replace(res.data.hqytUrl);
            },
            validateWords(val) {
                this.havedInput = val.length;
            }
        }
    }
</script>

<style scoped lang="less">
    #confirmOrder {
        width: 100%;
        background-color: #fff;
        padding: 50px 0 120px;
        .wrapper {
            width: 1280px;
            margin: 0 auto;
            h2 {
                font-size: 20px;
                color: #191919;
                line-height: 30px;
                margin-bottom: 20px;
            }
            .detail {
                overflow: hidden;
                margin-bottom: 12px;
                span {
                    float: left;
                    font-size: 14px;
                    color: #5E5E60;
                    letter-spacing: 0;
                    line-height: 21px;
                    margin-right: 80px;
                    &:nth-of-type(4) {
                        margin-right: 0;
                    }
                }
            }
        }

        .total{
            height: 60px;
            border: 1px solid #ECECEC;
            border-top: none;
            font-size: 24px;
            color: #F54112;
            line-height: 60px;
            text-align: center;
        }

        .submit-order{
            margin: 80px 0 120px 440px;
            /*margin-left: px;*/
            background: #4B7FF0;
            border-radius: 2px;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            width: 240px;
            height: 40px;
            font-size: 16px;
        }


            .totalPrice {
                height: 60px;
                line-height: 60px;
                font-size: 24px;
                color: #F54112;
                letter-spacing: 0;
                border: 1px solid #DCDEE2;
                border-top: 0;
                text-align: center;
                margin-bottom: 50px;
            }
            .submitBtn {
                display: block;
                width: 240px;
                height: 40px;
                border-radius: 2px;
                margin: 80px auto 0;
                font-size: 16px;
                letter-spacing: 0;
            }
            .tips {
                font-size: 12px;
                color: #AFB0B3;
                line-height: 18px;
                text-align: right;
                margin-top: 15px;
                span {
                    color: red;
                    margin: 0 2px;
                }
            }
        }

</style>