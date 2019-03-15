
<template>
    <div>
        <Modal v-model="isAdvanceRegister" :styles="{width: '580px!important'}" :closable="false" :mask-closable="false">
            <div >
            <div class="AdjustCredit">
                    <div class="title">
                        <span class="tit">预付款登记</span>
                    </div>
                    <div class="body" :style="{fontSize:'14px'}">
                        <div class="bodyTit" >
                            <Row :style="{marginBottom:'20px',borderBottom:'1px dashed #DBDBDE'}" >
                                <Col span="24" :style="{textAlign:'left',textIndent:'25px',marginBottom:'10px'}" >
                                <span>线下预付款客户：</span>
                                <span>{{info.user}}</span>
                                </Col>
                                <Col span="24" :style="{textAlign:'left',textIndent:'25px',marginBottom:'10px'}" >
                                <span>当前预付款余额：</span>
                                <span>{{info.money}}</span>
                                </Col>
                                <Col span="24" :style="{textAlign:'left',textIndent:'10px',marginBottom:'10px'}" >
                                <span :style="{color:'red',paddingLeft:'5px'}">*</span>
                                <span>新增预付款金额：</span>
                                <Input-number  :min="0"  :max="9999999" v-model="advanceMoney" style="width: 330px;color:#666;margin-left:10px"></Input-number>
                                </Col>
                            </Row>                   
                            <Row :style="{marginBottom:'20px',borderBottom:'1px dashed #DBDBDE',}" >
                                <div span="24" :style="{marginBottom:'10px',position:'relative',zIndex:'2'}" >
                                  <span >收款方式：</span>
                                  <RadioGroup v-model="payMethod" :style="{marginLeft:'65px'}"  @on-change="radioChange">
                                          <Radio label="现金"></Radio>
                                          <Radio :style="{marginLeft:'110px'}" label="转账"></Radio>
                                  　</RadioGroup>
                                </div>
                                <!-- 现金 -->
                                <div v-if="payMethod=='现金'" :style="{position:'relative'}">
                                    <i-form label-position="right" :label-width="150">
                                      <Form-item label="收款人：">
                                          <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-80px' }">*</span>
                                          <Input v-model="advanceObj.user" placeholder="请输入收款人"/>
                                      </Form-item>
                                      <Form-item label="收款金额：">
                                          <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-95px' }">*</span>
                                          <Input-number :style="{width:'330px'}" :max="9999999" :min="0"  v-model="advanceMoney" ></Input-number>
                                      </Form-item>
                                      <Form-item label="付款人：">
                                          <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-80px' }">*</span>
                                          <Input v-model="advanceObj.payUser" placeholder="请输入收款人"  />
                                      </Form-item>
                                      <Form-item label="付款人联系方式：">
                                          <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-135px' }">*</span>
                                          <Input v-model="advanceObj.payUserPhone" placeholder="请输入付款人联系方式" />
                                      </Form-item>
                                    </i-form>
                                </div>                           
                                <!-- 转账 -->
                                <div v-if="payMethod=='转账'" :style="{position:'relative'}">
                                  <i-form label-position="right" :label-width="140">
                                        <Form-item label="收款银行：">
                                           <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-95px' }">*</span>
                                           <Select v-model="bankObj.bank" :style="{textAlign:'left'}">
                                              <Option v-for="item in bankArr"  :value="item.value" :key="item.value">{{ item.label }}</Option>
                                          </Select>
                                            <!-- <Input v-model="bankObj.bank" placeholder="请输入收款银行"/> -->
                                        </Form-item>
                                        <Form-item label="收款银行开户名：">
                                            <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-140px' }">*</span>
                                            <Input v-model="bankObj.Name" placeholder="请输入收款银行开户名"/>
                                        </Form-item>
                                        <Form-item label="收款银行账号：">
                                            <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-125px' }">*</span>
                                            <Input v-model="bankObj.No" placeholder="请输入收款银行账号"/>
                                        </Form-item>
                                        <Form-item label="收款金额：">
                                            <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-95px' }">*</span>
                                            <Input-number :style="{width:'340px'}" :max="9999999" :min="0"  v-model="advanceMoney" ></Input-number>
                                        </Form-item>
                                        <Form-item label="银行流水号：">
                                            <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-110px' }">*</span>
                                            <Input v-model="bankObj.number" placeholder="请输入银行流水号"/>
                                        </Form-item>
                                        <Form-item label="付款银行：">
                                          <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-95px' }">*</span>
                                          <Select v-model="bankObj.payBank" :style="{textAlign:'left'}">
                                              <Option v-for="item in bankArr"  :value="item.value" :key="item.value">{{ item.label }}</Option>
                                          </Select>
                                            <!-- <Input v-model="bankObj.payBank" placeholder="请输入付款银行"/> -->
                                        </Form-item>
                                        <Form-item label="付款银行账号：">
                                            <span :style="{ color: 'red', position: 'absolute', top: '3px',left:'-125px' }">*</span>
                                            <Input v-model="bankObj.payBankNo" placeholder="请输入付款银行账号"/>
                                        </Form-item>
                                    </i-form>
                                </div>
                            </Row>
                        </div>
                    </div>  
                </div>
            </div>
            <div slot="footer">
                <Row >
                    <Col span="24" :style="{fontSize:'14px',textAlign:'center'}">
                        <Button  shape="circle" :style="[styleW,styleR]"  @click="cacle">取消</Button>
                        <Button type="primary" shape="circle" :style="styleW" @click="sure" >确认登记</Button>
                    </Col>
                </Row>
            </div>
        </Modal>
    </div>  
</template>

<script>

export default {
  props: {
    isTrue: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      styleW: { width: '80px' },
      styleR: { marginRight: '10px' },
      token: sessionStorage.getItem("name"),
      isAdvanceRegister: false,
      advanceMoney: 1, // 新增金额：
      payMethod: '现金', // 付款方式
      value: '',
      advanceObj: {
        user: '', // 收款人
        money: 0, // 收款金额
        payUser: '',
        payUserPhone: ''
      },
      bankObj: {
        bank: '', // 收款银行
        Name: '', // 收款银行开户名
        No: '', // 收款银行账号
        Money: '', // 收款金额
        number: '', // 银行流水号
        payBank: '',
        payBankNo: ''
      },
      bankArr: []
    };
  },
  watch: {
    isTrue (TF) {
      this.isAdvanceRegister = TF;
      if (TF) {
        this.getBank();
      }
    }
  },
  methods: {
    getBank () {
      this.$http.get(`${this.fm}/finance/tunnel/banks`, {
        params: {
          access_token: this.token,
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
    radioChange () {
      this.advanceObj.user = '';
      this.advanceObj.money = '';
      this.advanceObj.payUser = '';
      this.advanceObj.payUserPhone = '';
      this.bankObj.bank = '';
      this.bankObj.Name = '';
      this.bankObj.No = '';
      this.bankObj.Money = '';
      this.bankObj.number = '';
      this.bankObj.payBank = '';
      this.bankObj.payBankNo = '';
    },
    cacle () {
      this.isAdvanceRegister = false;
      this.advanceMoney = 1;
      this.$emit('isTrueFn', this.isAdvanceRegister);
      this.payMethod = '现金'; // 付款方式
      this.advanceObj = {
        user: '', // 收款人
        money: '', // 收款金额
        payUser: '',
        payUserPhone: ''
      };
      this.bankObj = {
        bank: '', // 收款银行
        Name: '', // 收款银行开户名
        No: '', // 收款银行账号
        Money: '', // 收款金额
        number: '', // 银行流水号
        payBank: '',
        payBankNo: ''
      };
    },
    async sure () {
      let reg_No = /^[0-9a-zA-Z]+$/;
      let reg_name = /^[\u0391-\uFFE5A-Za-z]+$/;
      let reg_phone = /^[1][3,4,5,7,8][0-9]{9}$/;
      let reg_money = /^([0-9]{1})+(.[0-9]{2}|.[0-9]{1})?$/;
      let reg_bank = /^([1-9]{1})(\d{14}|\d{15}|\d{16}|\d{17}|\d{18})$/;
      let receiverAmount = parseFloat(this.advanceMoney);
      let allAmount = parseFloat(this.advanceMoney) + parseFloat(this.info.money);
      let url = '';
      if (!this.advanceMoney) {
        this.$Modal.warning({ title: '温馨提示', content: '新增预付款金额不能为空' });
        return false;
      } else {
        if (!reg_money.test(this.advanceMoney.toString())) {
          this.$Modal.warning({ title: '温馨提示', content: '输入金额无效，小数金额小数点后只需两位' });
          return false;
        }
      }
      url = `${this.fm}/finance/advancePay/advanceCash/${this.info.marketplaceId}/${this.info.merchantId}/${this.info.id}`;
      url += '?' + this.QS.stringify({
        access_token: this.token,
        scenicareacode: this.info.scenicareacode, // 授信预警值
        agentCode: this.info.agentCode, // 结算范围
        type: this.info.type, // 结算周期  去重
        allAmount: allAmount
      });
      if (this.payMethod === '现金') {
        // 收款人
        if (!this.advanceObj.user) {
          this.$Modal.warning({ title: '温馨提示', content: '收款人不能为空' });
          return false;
        } else {
          if (this.advanceObj.user.length > 25) {
            this.$Modal.warning({ title: '温馨提示', content: '收款人姓名请控制在25个以内' });
            return false;
          } else {
            if (!reg_name.test(this.advanceObj.user)) {
              this.$Modal.warning({ title: '温馨提示', content: '收款人姓名只能输入英文字母、汉字' });
              return false;
            }
          }
        }
        // 付款人
        if (!this.advanceObj.payUser) {
          this.$Modal.warning({ title: '温馨提示', content: '付款人不能为空' });
          return false;
        } else {
          if (this.advanceObj.payUser > 25) {
            this.$Modal.warning({ title: '温馨提示', content: '付款人姓名请控制在25个以内' });
            return false;
          } else {
            if (!reg_name.test(this.advanceObj.payUser)) {
              this.$Modal.warning({ title: '温馨提示', content: '付款人姓名只能输入英文字母、汉字' });
              return false;
            }
          }
        }
        // 付款人联系方式
        if (!this.advanceObj.payUserPhone) {
          this.$Modal.warning({ title: '温馨提示', content: '付款人联系方式不能为空' });
          return false;
        } else {
          if (!reg_phone.test(this.advanceObj.payUserPhone)) {
            this.$Modal.warning({ title: '温馨提示', content: '付款人联系方式无效' });
            return false;
          }
        }
        this.$http.post(url, {
          payContact: this.advanceObj.payUserPhone, // '17621875345',
          payName: this.advanceObj.payUser, // "刘辉",
          receiverAmount: receiverAmount, //接受金额
          receiverName: this.advanceObj.user, // "王大锤",//接收用户名
        }).then(async res => {
          var datas = res.data;
          if (datas.return_code === 'SUCCESS') {
            let data = datas.content;
            // let originUrl = null;
            // if (window.location.origin === 'http://www.yilvbao.cn') {
            //     originUrl = 'https://www.upaypal.cn'
            // } else if (window.location.origin === 'http://jcp.yilvbao.cn') {
            //     originUrl = 'https://jicheng.upaypal.cn'
            // } else if (window.location.origin === 'http://zscp.yilvbao.cn') {
            //    originUrl = 'https://www.upaypal.net'
            // }
            //上面的结算跳转地址均是写死的，现改为接口获取
            const urlRes = await this.$http.get(`${this.fm}/sys/syspar/v1/getSysparInfoById`, {
              params: {
                access_token: sessionStorage.getItem('name'),
                pmky: 'HQYT',
                pmcd: '0002'
              }
            });
            if (urlRes.data.code === 200) {
              window.location.href = `${urlRes.data.data.pmvd}/ppcounter?${this.QS.stringify({
                key: data.key,
                changeId: data.changeId,
                timestamp: data.timestamp,
                returnUrl: `${window.location.origin}/#${this.$route.fullPath}`
              })}`;
              this.cacle();
            } else {
              this.$Modal.warning({ title: '温馨提示', content: '跳转失败' });
            }
          } else {
            this.$Modal.warning({ title: '温馨提示', content: '请求失败' });
          }
        });
      } else {//转账
        // 收款银行
        if (!this.bankObj.bank) { this.$Modal.warning({ title: '温馨提示', content: '收款银行不能为空' }); return false; }
        // 收款银行开户名
        if (!this.bankObj.Name) {
          this.$Modal.warning({ title: '温馨提示', content: '收款银行开户名不能为空' });
          return false;
        } else {
          if (this.bankObj.Name.length > 25) {
            this.$Modal.warning({ title: '温馨提示', content: '收款银行开户名请控制在25个以内' });
            return false;
          } else {
            if (!reg_name.test(this.bankObj.Name)) {
              this.$Modal.warning({ title: '温馨提示', content: '收款银行开户名只能输入英文字母、汉字' });
              return false;
            }
          }
        }
        // 收款银行账号
        if (!this.bankObj.No) {
          this.$Modal.warning({ title: '温馨提示', content: '收款银行账号不能为空' });
          return false;
        } else {
          if (!reg_bank.test(this.bankObj.No)) {
            this.$Modal.warning({ title: '温馨提示', content: '请填写15-19位有效收款银行账号' });
            return false;
          }
        }
        // 银行流水号
        if (!this.bankObj.number) {
          this.$Modal.warning({ title: '温馨提示', content: '银行流水号不能为空' }); return false;
        } else {
          if (this.bankObj.number.length > 32) {
            this.$Modal.warning({ title: '温馨提示', content: '银行流水号请控制在32个字符以内' });
            return false;
          } else {
            if (!reg_No.test(this.bankObj.number)) {
              this.$Modal.warning({ title: '温馨提示', content: '银行流水号输入只能是字母、数字' });
              return false;
            }
          }
        }
        //付款银行
        if (!this.bankObj.payBank) { this.$Modal.warning({ title: '温馨提示', content: '付款银行不能为空' }); return false; }
        // 付款银行账号
        if (!this.bankObj.payBankNo) {
          this.$Modal.warning({ title: '温馨提示', content: '付款银行账号不能为空' });
          return false;
        } else {
          if (!reg_bank.test(this.bankObj.payBankNo)) {
            this.$Modal.warning({ title: '温馨提示', content: '请填写15-19位有效付款银行账号' });
            return false;
          }
        }
        url = `${this.fm}/finance/advancePay/advanceTransfer/${this.info.marketplaceId}/${this.info.merchantId}/${this.info.id}`;
        url += '?' + this.QS.stringify({
          access_token: this.token,
          scenicareacode: this.info.scenicareacode, // 授信预警值
          agentCode: this.info.agentCode, // 结算范围
          type: this.info.type, // 结算周期  去重
          allAmount: allAmount
        });
        this.$http.post(url, {
          payAccountNo: this.bankObj.payBankNo, // 12312,付款银行账号
          payBank: this.bankObj.bank, // "广元贵商村镇银行",
          receiverAccountNo: this.bankObj.No, // 12,//接收帐号
          receiverAmount: receiverAmount, // 接收金额
          receiverBank: this.bankObj.bank, // "广元贵商村镇银行",
          receiverName: this.bankObj.Name, // "刘辉",
          receiverTxnNo: this.bankObj.number // 145514
        }).then(async res => {
          var datas = res.data;
          if (datas.return_code === 'SUCCESS') {
            let data = datas.content;
            // let originUrl = null;
            // if (window.location.origin === 'http://www.yilvbao.cn') {
            //     originUrl = 'https://www.upaypal.cn'
            // } else if (window.location.origin === 'http://jcp.yilvbao.cn') {
            //     originUrl = 'https://jicheng.upaypal.cn'
            // } else if (window.location.origin === 'http://zscp.yilvbao.cn') {
            //    originUrl = 'https://www.upaypal.net'
            // }
            //上面的结算跳转地址均是写死的，现改为接口获取
            const urlRes = await this.$http.get(`${this.fm}/sys/syspar/v1/getSysparInfoById`, {
              params: {
                access_token: sessionStorage.getItem('name'),
                pmky: 'HQYT',
                pmcd: '0002'
              }
            });
            if (urlRes.data.code === 200) {
              window.location.href = `${urlRes.data.data.pmvd}/ppcounter?${this.QS.stringify({
                key: data.key,
                changeId: data.changeId,
                timestamp: data.timestamp,
                returnUrl: `${window.location.origin}/#${this.$route.fullPath}`
              })}`;
              this.cacle();
            } else {
              this.$Modal.warning({
                title: '温馨提示',
                content: '跳转失败'
              });
            }
          } else {
            this.$Modal.warning({
              title: '温馨提示',
              content: '请求失败'
            });
          }
        });
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
      padding: 35px 50px;
      text-align: center;
    }
  }
}
</style>


