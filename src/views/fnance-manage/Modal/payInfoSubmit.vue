
<template>
        <Modal v-model="isShow" :styles="{width: '650px!important'}" :closable="false" :mask-closable="false">
            <div >
            <div class="AdjustCredit">
                    <div class="title">
                        <span class="tit">新增付款信息</span>
                    </div>
                    <div class="body" :style="{fontSize:'14px'}">
                        <div class="bodyTit" >
                            <Row :style="{marginBottom:'20px',borderBottom:'1px dashed #DBDBDE'}" >
                                <Col span="12" :style="{textAlign:'left',textIndent:'25px',marginBottom:'10px'}" >
                                  <span>对应结算单号：</span>
                                  <span>{{info.sytemNo}}</span>
                                </Col>
                                <Col span="12" :style="{textAlign:'left',marginBottom:'10px'}" >
                                  <span>供应商：</span>
                                  <span>{{info.prover}}</span>
                                </Col>
                                <Col span="12" :style="{textAlign:'left',textIndent:'25px',marginBottom:'10px'}" >
                                 <span>应结算金额：</span>
                                 <span>{{info.money}}</span>
                                </Col>
                                <Col span="12" :style="{textAlign:'left',marginBottom:'10px'}" >
                                 <span>已付金额：</span>
                                 <span>{{info.payMoney}}元</span>
                                </Col>
                            </Row>
                            <Row :style="{marginBottom:'20px',position:'relative'}" >
                               <Form :model="bank" label-position="right" :label-width="150">
                                    <FormItem label="收款银行：">
                                      <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-95px' }">*</span>
                                      <Select v-model="bank.dueBank" :style="{textAlign:'left'}">
                                          <Option v-for="item in bankArr"  :value="item.value" :key="item.value">{{ item.label }}</Option>
                                      </Select>
                                      <!-- <Input v-model="bank.dueBank" placeholder="" /> -->
                                    </FormItem>
                                    <FormItem label="收款银行开户名：">
                                        <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-140px' }">*</span>
                                        <Input v-model="bank.dueBankName" placeholder=""  />
                                    </FormItem>
                                    <FormItem label="收款银行账号：">
                                       <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-125px' }">*</span>
                                        <Input v-model="bank.dueBankNo" placeholder="" />
                                    </FormItem>
                                    <FormItem label="付款银行：">
                                      <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-95px' }">*</span>
                                      <Select v-model="bank.payBank" :style="{textAlign:'left'}">
                                          <Option v-for="item in bankArr"  :value="item.value" :key="item.value">{{ item.label }}</Option>
                                      </Select>
                                        <!-- <Input v-model="bank.payBank" placeholder="" /> -->
                                    </FormItem>
                                    <FormItem label="付款银行账号：">
                                        <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-125px' }">*</span>
                                        <Input v-model="bank.payBankNo" placeholder="" />
                                    </FormItem>
                                    <FormItem label="付款金额：">
                                        <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-95px' }">*</span>
                                        <InputNumber :max="9999999" :min="0" :step="1" v-model="bank.payMoney" :style="{width:'400px'}"></InputNumber>
                                    </FormItem>
                                    <FormItem label="银行流水号：">
                                        <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-110px' }">*</span>
                                        <Input v-model="bank.bankNo" placeholder="" />
                                    </FormItem>
                                </Form>
                            </Row>
                        </div> 
                    </div>  
                </div>
            </div>
            <div slot="footer">
                <Row >
                    <Col span="24" style="text-align:center">
                        <Button  shape="circle" :style="[styleW,styleR]"  @click="cacle">取消</Button>
                        <Button type="primary" shape="circle" :style="styleW" @click="sure" >确认付款</Button>
                    </Col>
                </Row>
            </div>
        </Modal> 
</template>

<script>

export default {
  props: {
    isAddPayInfo: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    isAddPayInfo (TF) {
      this.isShow = TF;
      if (TF) {
        this.getBank();
      }
    }
  },
  data () {
    return {
      styleW: { width: '80px' },
      styleR: { marginRight: '10px' },
      isShow: false,
      bank: {
        dueBank: '',
        dueBankName: '',
        dueBankNo: '',
        payBank: '',
        payBankNo: '',
        payMoney: 0,
        bankNo: ''
      },
      path: {
        orderId: this.$route.query.orderId,
        marketplaceId: this.$route.query.marketplaceId,
        merchantId: this.$route.query.merchantId,
        token: sessionStorage.getItem("name"),
      },
      bankArr: []
    };
  },
  methods: {
    getBank () {
      this.$http.get(`${this.fm}/finance/tunnel/banks`, {
        params: {
          access_token: this.path.token,
          marketplaceId: this.info.marketplaceId
        }
      }).then(res => {
        let data = res.data;
        if (data.return_code === 200) {
          data.content.length > 0 ? data.content.map((item, index) => {
            this.bankArr.push({
              value: item.bankName,
              label: item.bankName
            });
          }) : this.bankArr = [];
        } else {
          this.$Modal.warning({
            title: '温馨提示',
            content: '请求失败'
          });
        }
      });
    },
    cacle () {
      this.isShow = false;
      this.$emit('AddPayInfoFn', this.isShow);
      this.bank = {
        dueBank: '',
        dueBankName: '',
        dueBankNo: '',
        payBank: '',
        payBankNo: '',
        payMoney: 0,
        bankNo: '',
      }
    },
    async sure () {
      let reg_No = /^[0-9a-zA-Z]+$/;
      let reg_name = /^[\u0391-\uFFE5A-Za-z]+$/;
      let reg_money = /^([0-9]{1})+(.[0-9]{2}|.[0-9]{1})?$/;
      let reg_bank = /^([1-9]{1})(\d{14}|\d{15}|\d{16}|\d{17}|\d{18})$/;
      // 收款银行
      if (!this.bank.dueBank) { this.$Modal.warning({ title: '温馨提示', content: '收款银行不能为空' }); return false; }
      // 收款银行开户名
      if (!this.bank.dueBankName) {
        this.$Modal.warning({ title: '温馨提示', content: '收款银行开户名不能为空' });
        return false;
      } else {
        if (this.bank.dueBankName.length > 25) {
          this.$Modal.warning({ title: '温馨提示', content: '收款银行开户名请控制在25个以内' });
          return false;
        } else {
          if (!reg_name.test(this.bank.dueBankName)) {
            this.$Modal.warning({ title: '温馨提示', content: '收款银行开户名只能输入英文字母、汉字' });
            return false;
          }
        }
      }
      // 收款银行账号
      if (!this.bank.dueBankNo) {
        this.$Modal.warning({ title: '温馨提示', content: '收款银行账号不能空' });
        return false;
      } else {
        if (!reg_bank.test(this.bank.dueBankNo)) {
          this.$Modal.warning({ title: '温馨提示', content: '请填写15-19位有效收款银行账号' });
          return false;
        }
      }
      // 付款银行
      if (!this.bank.payBank) { this.$Modal.warning({ title: '温馨提示', content: '付款银行不能为空' }); return false; }
      // 付款银行账号
      if (!this.bank.payBankNo) {
        this.$Modal.warning({ title: '温馨提示', content: '付款银行账号不能为空' });
        return false;
      } else {
        if (!reg_bank.test(this.bank.payBankNo)) {
          this.$Modal.warning({ title: '温馨提示', content: '请填写15-19位有效付款银行账号' });
          return false;
        }
      }
      // 付款金额
      if (!this.bank.payMoney) {
        this.$Modal.warning({ title: '温馨提示', content: '付款金额不能为空' });
        return false;
      } else {
        if (!reg_money.test(this.bank.payMoney.toString())) {
          this.$Modal.warning({ title: '温馨提示', content: '请输入有效的金额，小数金额小数点后只需两位' });
          return false;
        }
      }
      // 银行流水号
      if (!this.bank.bankNo) {
        this.$Modal.warning({ title: '温馨提示', content: '银行流水号不能为空' }); return false;
      } else {
        if (this.bank.bankNo.length > 32) {
          this.$Modal.warning({ title: '温馨提示', content: '银行流水号请控制在32个字符以内' });
          return false;
        } else {
          if (!reg_No.test(this.bank.bankNo)) {
            this.$Modal.warning({ title: '温馨提示', content: '银行流水号输入只能是字母、数字' })
            return false
          }
        }
      }
      this.$http.post(`${this.fm}/finance/credit/creditSettlementPayinfos/${this.path.marketplaceId}/${this.path.merchantId}/${this.path.orderId}?access_token=${this.path.token}`, {
        "amount": this.bank.payMoney,
        "payBankAccountNo": this.bank.payBankNo,//6227002022071130000,
        "payBankName": this.bank.payBank,//"广元贵商村镇银行",
        "payBankTradeNo": this.bank.bankNo,//145514,
        "receiverBankAccountName": this.bank.dueBankName,//"刘辉",
        "receiverBankAccountNo": this.bank.dueBankNo,//12,
        "receiverBankName": this.bank.dueBank,//"广元贵商村镇银行"
      }).then(res => {
        var data = res.data;
        if (data.return_code === 'SUCCESS') {
          this.$Modal.warning({ title: '温馨提示', content: '新增成功' });
          this.cacle()
        } else {
          this.$Modal.warning({ title: '温馨提示', content: data.return_msg || data.msg });
        }
      })
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
      padding: 35px 50px;
      text-align: center;
    }
  }
}
</style>


