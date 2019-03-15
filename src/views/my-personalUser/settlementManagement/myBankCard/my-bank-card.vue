<template>
    <div>
        <template v-if="isShowLoading">
            <loading></loading>
        </template>

        <div class="cardTitle"><span >银行卡信息</span></div>

        <div>
            <bank-card
            :bankCardList="bankCardList"
            ></bank-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-bank-card",
        data(){
            return {
                isShowLoading:true,
                bankCardList:[
                    // {bank:{bankName:'aaa',bankCode:'ABC'}},
                    // {bank:{bankName:'aaa',bankCode:'BEA'}},
                    // {bank:{bankName:'aaa',bankCode:'BOB'}},
                    // {bank:{bankName:'aaa',bankCode:'BOC'}},
                    // {bank:{bankName:'aaa',bankCode:'BOCM'}},
                    // {bank:{bankName:'aaa',bankCode:'BOHC'}},
                    // {bank:{bankName:'aaa',bankCode:'BOS'}},
                    // {bank:{bankName:'aaa',bankCode:'CCB'}},
                    // {bank:{bankName:'aaa',bankCode:'CDCB'}},
                    // {bank:{bankName:'aaa',bankCode:'CDRCB'}},
                    // {bank:{bankName:'aaa',bankCode:'CEB'}},
                    // {bank:{bankName:'aaa',bankCode:'CGB'}},
                    // {bank:{bankName:'aaa',bankCode:'CIB'}},
                    // {bank:{bankName:'aaa',bankCode:'CITIB'}},
                    // {bank:{bankName:'aaa',bankCode:'CITIC'}},
                    // {bank:{bankName:'aaa',bankCode:'CMB'}},
                    // {bank:{bankName:'aaa',bankCode:'CMBC'}},
                    // {bank:{bankName:'aaa',bankCode:'CZSB'}},
                    // {bank:{bankName:'aaa',bankCode:'EBCL'}},
                    // {bank:{bankName:'aaa',bankCode:'HXB'}},
                    // {bank:{bankName:'aaa',bankCode:'ICBC'}},
                    // {bank:{bankName:'aaa',bankCode:'LSCCB'}},
                    // {bank:{bankName:'aaa',bankCode:'LSZSH'}},
                    // {bank:{bankName:'aaa',bankCode:'NCCC'}},
                    // {bank:{bankName:'aaa',bankCode:'PAB'}},
                    // {bank:{bankName:'aaa',bankCode:'PSBC'}},
                    // {bank:{bankName:'aaa',bankCode:'PZHCCB'}},
                    // {bank:{bankName:'aaa',bankCode:'SCB'}},
                    // {bank:{bankName:'aaa',bankCode:'SCRCU'}},
                    // {bank:{bankName:'aaa',bankCode:'SDB'}},
                    // {bank:{bankName:'aaa',bankCode:'SG'}},
                    // {bank:{bankName:'aaa',bankCode:'SHBC'}},
                    // {bank:{bankName:'aaa',bankCode:'SNCCB'}},
                    // {bank:{bankName:'aaa',bankCode:'SPDB'}},
                    // {bank:{bankName:'aaa',bankCode:'UOB'}},
                    // {bank:{bankName:'aaa',bankCode:'YACCB'}},
                    // {bank:{bankName:'aaa',bankCode:'ZGCB'}},
                ],
                pars:{
                    marketplaceId:'',
                    merchantId:'',
                }
            };
        },
        async mounted(){
          let a = await this.getParams();
            if(a){
              await this.get();
          }
           this.isShowLoading = false;
        },
        methods:{
            get(){
                let obj1 = this.pars;
                let urlParams = {
                    marketplaceId: obj1.marketplaceId,
                    merchantId: obj1.merchantId,
                };
                this.$bApi.MyBankCard(urlParams)
                    .then((res)=>{
                        if(res){
                            this.bankCardList = res.content?res.content:[];
                        }else{
                            this.bankCardList = [];
                        }
                    }).catch(()=>{
                    this.bankCardList = [];
                });
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

                        // this.pars.marketplaceId = 1;
                        // this.pars.merchantId = 205;
                    });
                // .finally(()=>{
                //     this.spinShow = false;
                // })
            },
        },
    }
</script>

<style scoped>
    .cardTitle {
        font-size: 16px;
        font-weight: bold;
        color: #191919;
        margin-top: 20px
    }
</style>