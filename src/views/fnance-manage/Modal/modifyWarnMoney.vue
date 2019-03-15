
<template>
    <Modal v-model="isadjust" :styles="{width: '580px'}" :closable="false" :mask-closable="false">
        <div >
           <div class="AdjustCredit">
              <div class="title">
                  <span class="tit">余额预警值</span>
              </div>
              <div class="body">
                  <div class="bodyTit" >
                      <Row>
                          <Col span="24">
                              <span>余额预警值：</span>
                              <InputNumber :max="9999999" :min="0" v-model="warnMoney"></InputNumber>
                          </Col> 
                    </Row> 
                  </div>
              </div>
          </div> 
        </div>
        <div slot="footer">
             <Row >
                <Col span="24" style="text-align:center">
                    <Button  shape="circle" :style="[styleW,styleR]"  @click="cacle">取消</Button>
                    <Button type="primary" shape="circle" :style="styleW" @click="sure">确定</Button>
                </Col>
            </Row>
        </div>
    </Modal>
    
</template>

<script>

export default {
  props: {
    isWarnMoney: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => { }
    },
    money: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      styleW: { width: '60px', height: '30px' },
      styleR: { marginRight: '10px' },
      token: sessionStorage.getItem("name"),
      isadjust: false,
      warnMoney: 0
    };
  },
  watch: {
    isWarnMoney (TF) {
      this.isadjust = TF;
    },
    money (val) {
      this.warnMoney = +val;
    }
  },
  methods: {
    cacle () {
      this.isadjust = false;
      this.$emit('isWarnMoneyFn', this.isadjust);
    },
    sure () {
      try {
        var url = `${this.fm}/finance/advancePay/modifyAdvancePayWarningAmount/${this.info.marketplaceId}/${this.info.merchantId}/${this.info.id}`;
        url += '?' + this.QS.stringify({
          access_token: this.token,
          warningAmount: this.warnMoney
        });
        this.$http.put(url).then(res => {
          this.isadjust = false;
          let data = res.data;
          if (data.return_code === 'SUCCESS') {
            this.$emit('isWarnMoneyFn', this.isadjust);
          } else {
            this.$Modal.warning({
              title: '温馨提示',
              content: data.return_msg
            });
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
  font-size: 14px;
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


