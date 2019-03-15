<template>
    <div class="MyOrder">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>

        <p slot="title" class="cardTitle">
            <span>消费详情</span>
        </p>
        <!--<div class="non-payment-prompt-message" v-show="offStocks">-->
            <!--<Row>-->
                <!--<Col span="12">-->
                    <!--<span class="prompt-message1">您的订单还未支付！</span>-->
                    <!--<span class="prompt-message2">请您在提交订单后0小时{{minutes}}分{{seconds}}秒内支付，否则订单会被自动取消！</span>-->
                <!--</Col>-->
                <!--<Col span="12">-->
                    <!--<div class="payment-amount-block">-->
                        <!--合计：<span class="dollar-sign"><span class="dollar">￥</span>{{amountTotal}}元</span>-->
                        <!--<Button type="primary" class="btnConfirm" target="_blank"   @click="btnPayNow"  >立即支付</Button>-->
                    <!--</div>-->
                <!--</Col>-->
            <!--</Row>-->
        <!--</div>-->

        <div class="header-form-text">
            <span class="order-number">业务订单号：{{myFormData.outTradeNo}}</span>
            <!--<span class="order-date">创建时间： {{creationTime}}  {{dateCreated}}</span>-->
        </div>


        <radioTable
                :colname="colnames"
                :tableData="tableData"
                :total="total"
                :pageNum="pageNum"
                :pageCode="pageCode"
                :loading="isLoading"
                @changePage="changePage"
                @on-page-size-change="changePageSize"
        ></radioTable>

        <div class="item-box-group">
            <!--<div v-for="item in orderList" class="item-box clearAll">-->
                <!--<div>-->
                    <!--{{item.keyName}}-->
                <!--</div>-->
                <!--<div>-->
                    <!--{{item.value}}-->
                <!--</div>-->
            <!--</div>-->
            <table>
                <tr  v-for="item in orderList">
                    <td>{{item.keyName}}</td>
                    <td>{{item.value}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-deal-detail",
        data() {
          return{
              isShowLoading: true,
              isLoading: false,
                  // JSON.parse(sessionStorage.getItem('my-deal-detail'))||
              myFormData:{},
              pageNum:10,
              pageCode:1,
              total:0,
              // orderConfirmationNumber:'',
              colnames:[
                  {
                      title: "类型",
                      // key: "businessType",
                      render: (h, params) => {
                          return h('div',this.$vfilters.businessTypeStatusFilter(params.row.invoice.businessType));
                          },
                      width: 100
                  },
                  {
                      title: "交易信息",
                      // key: "buyer",
                      render: (h, params) => {
                          return h('div',params.row.invoice.buyer);
                      },
                      width: 265
                  },
                  {
                      title: "单价(元)",
                      // key: "payedPrice",
                      render: (h, params) => {
                          return h('div',params.row.invoice.unitPrice);
                      },
                      width: 150
                  },
                  {
                      title: "数量",
                      // key: "cname",
                      render: (h, params) => {
                          return h('div',params.row.quantity);
                      },
                      width: 150
                  },
                  {
                      title: "支付方式",
                      // key: "paymentType",
                      render: (h, params) => {
                          return h('div',this.$vfilters.paymentMethodStatusFilter(params.row.invoice.paymentType));
                      },
                      width: 150
                  },
                  {
                      title: "总金额(元)",
                      // key: "totalPrice",
                      render: (h, params) => {
                          return h('div',params.row.invoice.price);
                      },
                      width: 123
                  },
              ],
              tableData:[]

          }
        },
        computed:{
            tableData1(){
                let myFormData = this.myFormData,
                     vfilters = this.$vfilters;
                let obj = {
                    businessType: vfilters.businessTypeStatusFilter(myFormData.businessType),
                    buyer: myFormData.buyer,
                    payedPrice: myFormData.payedPrice,
                    totalPrice: myFormData.totalPrice,
                    paymentType: vfilters.paymentMethodStatusFilter(myFormData.paymentType),
                },arr=[obj];

                return arr;
            },
            orderList(){
                let myFormData = this.myFormData,
                    vfilters = this.$vfilters,
                    common = this.$common;
                let arr = [
                    {keyName:'创建时间：', value:common.getCurrentDate(myFormData.creationDate)},
                    {keyName:'付款时间：', value:common.getCurrentDate(myFormData.paymentDateTime)},
                    {keyName:'结束时间：', value:common.getCurrentDate(myFormData.txnCompleteTime)},
                    {keyName:'交易方：', value:myFormData.buyerName},
                    {keyName:'备注：', value:myFormData.description},
                ];
                return arr;
            }
        },
        methods:{
            get(){
                let urlParams = this.$route.query,
                    params = {
                    pageNumber: this.pageCode-1,
                        pageSize: this.pageNum,
                    };
                this.$bApi.MyDealDetial(urlParams,params)
                    .then((res)=>{
                        if(!res)return;
                        this.myFormData = res.content;
                        this.tableData = res.productDetail.content.page;
                        this.pageNum = res.productDetail.content.pageSize;
                        this.pageCode = res.productDetail.content.pageNumber+1;
                        this.total = res.productDetail.content.totalNumberOfResults;
                    });
            },
            changePage(pageCode){
                this.pageCode = pageCode;
                this.get();
            },
            changePageSize(pageSize){
                this.pageNum = pageSize;
                this.get();
            }
        },
        async mounted(){
           await this.get();
           this.isShowLoading = false;
        }
    }
</script>

<style scoped lang="less">
    .MyOrder {
        font-size: 14px;
    }

    .cardTitle {
        font-size: 16px;
        font-weight: 600;
        margin-top: 20px;
        color: #191919;
    }

    .header-form-text {
        margin: 32px 0 12px;
    }

    .item-box{
        div{
            float: left;
            height: 48px;
            line-height: 48px;
            text-align: right;
            border: 1px solid #D3D3D3;
            background: #F8F8F9;
            &:first-of-type{
                width: 115px;
            }
            &:nth-of-type(2){
                width: 825px;
                background: #fff;
            }
        }

        &-group{
            margin-top: 50px;
            table{
                border-collapse: collapse;
                border: 1px solid #D3D3D3;
                width: 938px;
                tr{
                    td{
                        height: 48px;
                        line-height: 48px;
                        border: 1px solid #D3D3D3;
                        &:first-of-type{
                            width: 115px;
                            background: #F8F8F9;
                            text-align: right;
                        }
                        &:last-of-type{
                            width: 825px;
                            padding-left: 5px;
                        }
                    }
                }
            }
        }
    }


</style>