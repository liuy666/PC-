<template>
    <div class="MyOrder">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>

        <div class="cardTitle"><span >我的交易</span></div>

        <div>
            <detail-form1
                    :isListPage="true"
                    :needListReset="true"
                    :formDatas="pars.formDatas"
                    :mFlag="true"
                    :formItemList="formItemList"
                    :disabledStartDate="disabledStartDate"
                    :disabledEndDate="disabledEndDate"
                    :disabledEnd="disabledEnd"
                    :btnLabelWidth="120"
                    :labelWidth="120"
                    @getFormData="get"
                    @setFastDay="setFastDay"
                    @clearFormData="clearFormData"
            ></detail-form1>
            <!--  -->
            <radioTable
                    :loading="isLoading"
                    :colname="colname"
                    :total="total"
                    :tableData="tableData"
                    :pageNum="pars.pageNum"
                    :pageCode="pars.pageCode"
                    @changePage="changePage"
                    @on-page-size-change="changePageSize"></radioTable>
        </div>

        <!--:watchTotal="watchTotal"-->
    </div>
</template>

<script>
    export default {
        name: 'my-deal',
        data() {
            return {
                total:0,
                isLoading:false,
                isShowLoading: true,
                tableData: [
                    // {}
                ],
                disabledStartDate: [9999,0],
                disabledEndDate: [9999,0],
                disabledEnd: 0,
                formItemList:[
                    {
                        type: 11,
                        label: '查询日期',
                        double: true,
                        keyName: 'creationFromTime',
                        keyName1: 'creationToTime',
                        noShow: true,
                        labelWidth: 84,
                        class: 'float_option_big',
                        isShowSecondOptions: true,
                    },
                    {
                        type: 4,
                        keyName: 'invoiceStatus',
                        label: '交易状态',
                        labelWidth: 85,
                        optionList: this.$$totalList.tradingStateStatusList
                    },
                    // {
                    //     type: 4,
                    //     keyName: 'type1',
                    //     label: '资金去向',
                    //     labelWidth: 85,
                    //     optionList: this.$$totalList.capitalWhereaboutsStatusList
                    // },
                    // {
                    //     type: 4,
                    //     keyName: 'type2',
                    //     label: '业务类型',
                    //     labelWidth: 85,
                    //     optionList: this.$$totalList.businessTypeStatusList
                    // },
                ],
                pars:{
                    formDatas: {
                        creationFromTime : '',
                        creationToTime : '',
                        type: '',
                        type1: '',
                        type2: '',
                    },
                    pageNum:10,
                    pageCode:1,
                },
                colname:[
                    {
                        title: '创建时间',
                        render: (h, params) => {
                            return h('div',this.$common.getCurrentDate(params.row.creationDate));
                        },
                        // key: 'creationDate',
                        width: 120
                    },
                    {
                        title: '业务订单号',
                        key: 'outTradeNo',
                        width: 179
                    },
                    {
                        title: '对应结算订单号',
                        key: 'tradeNo',
                        width: 179
                    },
                    {
                        title: '业务类型',
                        key: 'businessType',
                        render: (h, params) => {
                            return h('div',this.$vfilters.businessTypeStatusFilter(params.row.businessType));
                        },
                        width: 120
                    },
                    {
                        title: '交易信息',
                        key: 'buyer',
                        width: 179
                    },
                    {
                        title: '交易方',
                        key: 'buyerName',
                        width: 179
                    },
                    {
                        title: '交易状态',
                        render: (h, params) => {
                            return h('div',this.$vfilters.tradingStateStatusFilter(params.row.status));
                        },
                        key: 'status',
                        width: 120
                    },
                    {
                        title: '交易金额(元)',
                        key: 'totalPrice',
                        width: 130
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                            console.log(params);
                            return h('div',[
                                h(
                                    "a",{
                                        on:{
                                            click:()=>{
                                                this.$router.push({name:'my-deal-detail',query:{marketplaceId: this.pars.marketplaceId, merchantId: this.pars.merchantId, id: params.row.id}});
                                                // sessionStorage.setItem('my-deal-detail',JSON.stringify(params.row));
                                            }
                                        }
                                    },
                                    "详情"
                                )
                            ])
                        },
                        width: 80
                    },
                ]
            };
        },
       async mounted(){
           let a = await this.getParams();
           if(a){
               await this.get();
           }
           this.isShowLoading = false;
        },
        methods: {
            get(){
                let obj1 = this.pars;
                let obj = this.pars.formDatas;

                let urlParams = {
                    marketplaceId: obj1.marketplaceId,
                    merchantId: obj1.merchantId,
                };
                let params = {
                    pageNumber: obj1.pageCode-1,
                    pageSize: obj1.pageNum,
                    ...obj
                };
                this.$common.emptyObj(params);
                this.$bApi.MyDeal(urlParams,params)
                    .then((res)=>{
                        if(res){
                            let data = res.content;
                            this.tableData = data.page;
                            this.total = data.totalNumberOfResults;
                            this.pars.pageNum = data.pageSize;
                            this.pars.pageCode = data.pageNumber+1;
                        }else{
                            this.errorOperation();
                        }
                    }).catch(()=>{
                        this.errorOperation();
                })
            },
            getParams(){
                let params = {type:'2'};
                return this.$bApi.SettleMerchantId(this,params)
                    .then((response)=>{
                        if(response){
                            this.pars.marketplaceId = response.platformId;
                            this.pars.merchantId = response.merchantId;
                            return true;
                        }

                            // this.pars.marketplaceId = 36;
                            // this.pars.merchantId = 208;
                    });
                    // .finally(()=>{
                    //     this.spinShow = false;
                    // })
            },
            setFastDay (day) {  //近多少多少天
                let today = this.$common.getCurrentDate();
                this.pars.formDatas.creationToTime = this.$common.getCurrentDate();
                this.pars.formDatas.creationFromTime = this.$common.getCurrentDate();

                switch(day){
                    case 0:
                        this.pars.formDatas.creationToTime = this.$common.getCurrentDate();
                        this.pars.formDatas.creationFromTime = this.$common.getCurrentDate();
                        break;
                    case -1:
                        let arr = this.$common.getCurrentDate1(today,day);
                        this.pars.formDatas.creationToTime = arr[0];
                        this.pars.formDatas.creationFromTime = arr[1];
                        break;
                    case -2:
                        let Arr = this.$common.getCurrentDate1(today,day);
                        this.pars.formDatas.creationToTime = Arr[0];
                        this.pars.formDatas.creationFromTime = Arr[1];
                        break;
                    default:
                        break;
                }
            },
            clearFormData(){
                this.pars.formDatas.creationFromTime = '';
                this.pars.formDatas.creationToTime = '';
                this.pars.formDatas.invoiceStatus = '';
            },
            changePage(pageCode){
                this.pars.pageCode = pageCode;
                this.get();
            },
            changePageSize(pageSize){
                this.pars.pageNum = pageSize;
                this.get();
            },
            errorOperation(){
                this.tableData = [];
                this.total = 0;
                this.pars.pageNum = 10;
                this.pars.pageCode = 1;
            }
        },

        watch:{
            'pars.formDatas.creationFromTime' (val) {
                let obj = this.$common.changeDisabledEndDate(val,this.disabledEnd,this.disabledEndDate);
                this.disabledEnd = obj.disabledEnd;
                this.disabledEndDate = obj.disabledEndDate;
            },
        }
    };
</script>

<style scoped>
    .search-condition {
        padding-right: 10px;
    }
    .cardTitle {
        font-size: 16px;
        font-weight: bold;
        color: #191919;
        margin-top: 20px
    }
    .MyOrder {
        font-size: 14px;
    }
</style>
