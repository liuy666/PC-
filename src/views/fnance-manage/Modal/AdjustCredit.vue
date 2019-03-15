
<template>
<div>
<!-- 调整授信额度 -->
    <Modal v-model="isShow" :styles="{width: '580px'}" :closable="false" :mask-closable="false">
        <div class="AdjustCredit">
            <div class="title">
                <span class="tit">信用额度调整</span>
            </div>
            <div class="body" :style="{fontSize:'14px'}">
                <div class="bodyTit" >
                    <Row style="margin-bottom:20px;">
                        <Col span="8" style="text-align:left;text-indent:25px;">
                          <span>当前信用额度</span>
                        </Col>
                        <Col span="8">
                          <span>{{isAdd.add?'增加':'减少'}}</span>
                        </Col>
                        <Col span="8" style="text-align:right">
                          <span>调整后的信用额度</span>
                        </Col>
                    </Row>
                    <Row style="margin-bottom:20px">
                        <Col span="4">
                          <div style="font-size:20px">{{info.money}}</div>
                          <div style="margin-top:30px">剩余可用</div>
                          <div style="margin-top:20px;color:#179B16">{{info.money}}</div>
                        </Col>
                        <Col span="4">
                          <div style="font-size:20px;color:#4e81f0" >{{isAdd.add?'+':'-'}}</div>
                          <div @click="Add" ><Icon type="md-arrow-dropdown" style="color:#4e81f0" /></div>
                        </Col>
                        <Col span="8">
                          <div> 
                            <input :style="inpStyle"  min="1" max="9999999"  type="number"  @keydown="handleInput"  v-model.number="value"/>
                          </div>
                        </Col>
                        <Col span="4">
                          <div style="font-size:20px">=</div>
                        </Col>
                        <Col span="4">
                          <div style="font-size:20px">{{adjustMoney}}</div>
                          <div style="margin-top:30px">剩余可用</div>
                          <div style="margin-top:20px;color:#179B16">{{adjustMoney}}</div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        <div slot="footer">
             <Row >
                <Col span="24" :style="{fontSize:'14px',textAlign:'center'}">
                    <Button  shape="circle" :style="[styleW,styleR]" @click="cacle">取消</Button>
                    <Button type="primary" shape="circle" :style="styleW" @click="sure">确定</Button>
                </Col>
            </Row>
        </div>
    </Modal>
</div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => { }
    },
    isadjust: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      styleW: { width: '60px', height: '30px' },
      styleR: { marginRight: '10px' },
      inpStyle: {
        width: '50px',
        height: '30px',
        border: '1px solid #4e81f0',
        borderRadius: '5px',
        textIndent: '5px'
      },
      value: 1,
      isShow: false,
      isAdd: {
        add: true
      }
    };
  },
  watch: {
    isadjust (TF) {
      this.isShow = TF;
    }
  },
  computed: {

    adjustMoney () {
      if (this.isAdd.add) {
        if (this.value) {
          return (parseFloat(this.info.money) + parseFloat(this.value)).toFixed(2);
        } else {
          return parseFloat(this.info.money).toFixed(2);
        }
      } else {
        if (parseFloat(this.info.money) < this.value) {
          this.value = 0;
          this.$Modal.warning({
            title: '温馨提示',
            content: '调整余额大于当前信用额度'
          });
        } else {
          if (this.value) {
            return (parseFloat(this.info.money) - parseFloat(this.value)).toFixed(2);
          } else {
            return parseFloat(this.info.money).toFixed(2);
          }
        }
      }
    }
  },

  methods: {
    handleInput (e) {
      if (e.target.value.length < 8) {
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null;
      } else {
        e.target.value = null
      }
    },
    cacle () {
      this.value = 0;
      this.isShow = false;
      this.$emit('isadjustFn', this.isShow);
    },
    Add () {
      this.isAdd.add = !this.isAdd.add;
    },
    sure () {
      if (this.value === 0) {
        this.$Modal.warning({
          title: '温馨提示',
          content: '调整授信额度不能为 0'
        });
        return false;
      }
      debugger
      try {
        var url = `${this.fm}/finance/credit/modifyCreditBalance/${this.info.marketplaceId}/${this.info.merchantId}/${this.info.id}`;
        url += '?' + this.QS.stringify({
          access_token: sessionStorage.getItem('name'),
          balance: this.isAdd.add ? this.value : `-${this.value}`,
          scenicareacode: this.info.scenicareacode,
          agentCode: this.info.agentCode,
          type: this.info.type,
          allAmount: this.adjustMoney
        });
        this.$http.put(url).then(async res => {
          var datas = res.data;
          if (datas.return_code === 'SUCCESS') {
            let data = datas.content;

            // switch (window.location.origin) {
            //   case 'http://www.yilvbao.cn':
            //     originUrl = 'https://www.upaypal.net';
            //     break;
            //     case 'http://jcp.yilvbao.cn':
            //     originUrl='';
            //     break;
            // }
            // let originUrl = null;
            // if (window.location.origin === 'http://www.yilvbao.cn') {
            //     originUrl = 'https://www.upaypal.cn'
            // } else if (window.location.origin === 'http://jcp.yilvbao.cn') {
            //     originUrl = 'https://jicheng.upaypal.cn'
            // } else if (window.location.origin === 'http://zscp.yilvbao.cn') {
            //     originUrl = 'https://www.upaypal.net'
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
      } catch (err) {
        console.log(err);
      }
    },
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
      padding: 80px 50px;
      text-align: center;
    }
  }
}
</style>


