
<template>
  <div>
     <Modal v-model="gatherBtn" :styles="{ width: '1200px!important'}" :closable="false" :mask-closable="false">
        <div > 
            <div style="cursor:default;">
                <div class="title">
                  {{this.id.isSurePay?"确认收款":"收款详情"}} 
                </div>
                <div class="w_query" :style="{fontSize:'14px'}">
                  <Row>
                    <Col span="8">
                        <span>单号：</span>
                        <span>{{header.No}}</span>
                    </Col>   
                  <Col span="8">
                        <span>创建时间：</span>
                        <span>{{header.buildTime}}</span>
                    </Col> 
                    <Col span="8">
                        <span>结算状态：</span>
                        <span>{{header.statemState}}</span>
                    </Col> 
                    <Col span="8">
                        <span>下级代理商：</span>
                        <span>{{header.agent}}</span>
                    </Col> 
                    <Col span="8">
                        <span>应结算金额：</span>
                        <span>{{header.money}}元</span>
                    </Col>
                    </Row> 
                </div>
                <div :style="{padding:'0 10px'}">
                   <radioTable
                  :loading="loading"
                  :colname="columnsTit"
                  :currentPage="objPage.page+1"
                  :total="objPage.totalPage"
                  :tableData="columnsData"
                  @changePage="changePage"
                > </radioTable>
                </div>
            </div>
        </div>
        <div slot="footer" :style="{fontSize:'14px',textAlign:'center'}"  v-if="this.id.isSurePay" >
            <Row >
                <Col span="24" >
                    <Button  shape="circle" :style="[styleW,styleR]"  @click="returnFn">取消</Button>
                    <Button type="primary" shape="circle" :style="styleW80" @click="sure">确认收款</Button>
                </Col>
            </Row>
        </div>
        <div slot="footer" :style="{fontSize:'14px',textAlign:'center'}" v-else>
            <Button  shape="circle" size="large" :style="styleW" @click="returnFn">返回</Button>
        </div>
    </Modal>
  </div>   
</template>

<script>
import publicMethod from '@/libs/publicMethod.js'
import tradState from '@/libs/tradState.js'
export default {
  props: {
    gatherBtn: {
      type: Boolean,
      default: false
    },
    id: {
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
      objPage: {
        totalPage: 0,
        page: 0,
        size: 10
      },
      loading: false,
      isGather: false,
      header: {
        No: '',
        buildTime: '',
        statemState: '',
        agent: '',
        money: ''
      },
      columnsTit: [
        {
          title: '收款银行',
          key: 'bank',
          align: 'center'
        },
        {
          title: '收款银行开户名',
          key: 'bankName',
          align: 'center'
        },
        {
          title: '收款银行账号',
          key: 'bankNum',
          align: 'center'
        },
        {
          title: '银行流水号',
          key: 'bankSerail',
          align: 'center'
        },
        {
          title: '付款金额(元))',
          key: 'money',
          align: 'center'
        }

      ],
      columnsData: []
    };
  },
  watch: {
    gatherBtn (TF) {
      this.isGather = TF;
    },
    id: {
      handler (ids) {
        this.headInfo(ids);
        this.getDetail(ids);
      },
      deep: true
    }
  },
  methods: {
    changePage (num) {
      this.objPage.page = num - 1;
      this.getDetail()
    },
    returnFn () {
      this.isGather = false;
      this.$emit('gatherBtnFn', this.isGather);
    },
    headInfo (ids) {
      try {
        var url = '';
        if (ids.isAccountsPay) {
          url = `${this.fm}/finance/credit/creditConsumerSettlements`;// 确认收款
        } else {
          url = `${this.fm}/finance/credit/creditProviderSettlements`;// 收款详情
        }
        if (this.gatherBtn) {
          this.$http.get(url, {
            params: {
              access_token: this.token,
              marketplaceId: ids.marketplaceId, // 平台号
              merchantId: ids.merchantId,
              id: ids.gatherId, // 结算单号
              pageNumber: 0,
              pageSize: 1
            }
          }).then(res => {
            var data = res.data;
            if (data.return_code === 'SUCCESS') {
              let item = data.content.page[0]
              data.content.page.length > 0
                ? this.header = {
                  No: item.id || '',
                  buildTime: item.creationDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.creationDate) : '',
                  statemState: item.settlementStatus ? tradState.account(item.settlementStatus) : '',
                  agent: item.consumeLegalName || '',
                  money: item.amount ? item.amount.toFixed(2) : '0.00'
                }
                : this.header = {
                  No: '',
                  buildTime: '',
                  statemState: '',
                  agent: '',
                  money: ''
                };
            } else {
              this.$Modal.warning({
                title: '温馨提示',
                content: '请求失败'
              });
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    getDetail (ids) {
      this.columnsData = [];
      var url = `${this.fm}/finance/credit/creditSettlementPayinfos`;
      url += '?' + this.QS.stringify({
        access_token: this.token,
        marketplaceId: ids.marketplaceId,
        merchantId: ids.merchantId,
        creditSettlementBillId: ids.gatherId, // this.$route.query.orderId
        pageNumber: this.objPage.page,
        pageSize: this.objPage.size
      });
      try {
        if (this.gatherBtn) {
          this.$http.get(url).then(res => {
            var data = res.data;
            if (data.return_code === 'SUCCESS') {
              this.objPage.totalPage = data.content.totalNumberOfResults;
              if (data.content.page.length > 0) {
                var item = data.content.page;
                item.map((items, index) => {
                  this.columnsData.push(
                    {
                      bank: items.receiverBankName || '',
                      bankName: items.receiverBankAccountName || '',
                      bankNum: items.receiverBankAccountNo || '',
                      bankSerail: items.payBankTradeNo || '',
                      money: items.amount ? items.amount.toFixed(2) : '0.00'
                    }
                  );
                });
              }
            } else {
              this.$Modal.warning({
                title: '温馨提示',
                content: data.return_msg
              });
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    sure () {
      try {
        this.$http.post(`${this.fm}/finance/credit/confirm/${this.id.marketplaceId}/${this.id.merchantId}/${this.id.gatherId}?access_token=${this.token}`)
          .then(async res => {
            let datas = res.data;
            if (datas.return_code === 'SUCCESS') {
              let data = datas.content;
              // let originUrl = null;
              // if (window.location.origin === 'http://www.yilvbao.cn') {
              //     originUrl = 'https://www.upaypal.cn'
              // } else if (window.location.origin === 'http://jcp.yilvbao.cn') {
              //     originUrl = 'https://jicheng.upaypal.cn'
              // } else if (window.location.origin === 'http://zscp.yilvbao.cn') {
              //   originUrl = 'https://www.upaypal.net'
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
                })}`
              } else {
                this.$Modal.warning({
                  title: '温馨提示',
                  content: '跳转失败'
                });
              }
            } else {
              this.$Modal.warning({
                title: '温馨提示',
                content: datas.return_msg
              });
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
  }
};
</script>

 <style lang="less" scoped>
.title {
  line-height: 60px;
  width: 100%;
  background: #eef2fb;
  color: #1c2438;
  font-size: 16px;
  text-align: center;
}
.w_query {
  padding: 30px 20px;
  span {
    font-size: 14px;
  }
}
.table {
  padding: 0px 20px 30px;
  .ivu-table-cell {
    padding: 0;
  }
}
</style>


