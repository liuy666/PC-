<template>
    <Modal v-model="isShow" :styles="{width: '700px'}" :closable="false" :mask-closable="false">
      <div class="AdjustCredit" :style="{fontSize:'14px'}" >
            <div class="title">
                <span class="tit">结算周期</span>
            </div>
            <div class="body">
                <div class="bodyTit" >
                    <Row>
                        <Col span="8">
                            <span>结算范围：</span>
                        </Col>   
                    <Col span="16" :style="{textAlign:'left'}">
                        <RadioGroup v-model="settleScope" >
                            <Radio label="PAIED" style="margin-right:50px">已支付订单</Radio>
                            <Radio label="VERIFICATION">已核销订单</Radio>
                        </RadioGroup>
                    </Col> 
                  </Row> 
                </div>
            </div>
        </div>
        <div slot="footer">
             <Row >
                <Col span="24" style="text-align:center">
                    <Button  shape="circle" :style="[styleW,styleR]"  @click="cacle" >取消</Button>
                    <Button type="primary" shape="circle" :style="styleW80" @click="sure" >确认调整</Button>
                </Col>
            </Row>
        </div>
    </Modal> 
</template>
<script>
export default {
  props: {
    cycle: {
      type: String,
      default: ''
    },
    isSettleCycle: {
      typr: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      styleW: { width: '60px', height: '30px' },
      styleW80: { width: '80px', height: '30px' },
      styleR: { marginRight: '10px' },
      token: sessionStorage.getItem("name"),
      settleScope: '',
      isShow: false
    };
  },
  watch: {
    cycle (val) {
      this.settleScope = val;
    },
    isSettleCycle (TF) {
      this.isShow = TF;
    }
  },
  methods: {
    cacle () {
      this.isShow = false;
      this.$emit('isSettleCycleFn', this.isShow);
    },
    sure () {
      var url = `${this.fm}/finance/credit/creditAccounts/${this.info.marketplaceId}/${this.info.merchantId}/${this.info.id}`;
      url += '?' + this.QS.stringify({
        access_token: this.token,
        warningAmount: this.info.warnMoney, // 授信预警值
        settlementRange: this.settleScope, // 结算范围
        settlementCycle: this.info._settlementCycle, // 结算周期
        settlementType: this.info._settlementType, // 结算类型
        marketPlaceList: this.info._marketPlaceList
      });
      try {
        this.$http.put(url).then(res => {
          var data = res.data;
          if (data.return_code === 'SUCCESS') {
            this.cacle();
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

 <style lang="less" scoped>
.AdjustCredit {
  background: #fff;
  .title {
    line-height: 60px;
    width: 100%;
    background: #eef2fb;
    color: #1c2438;
    font-size: 16px;
    text-indent: 20px;
  }
  .body {
    .bodyTit {
      color: #666666;
      padding: 80px 10px;
      text-align: center;
    }
  }
}
</style>


