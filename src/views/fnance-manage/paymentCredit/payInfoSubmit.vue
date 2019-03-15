
<template>
<div class="purchaseOrder">
   <Breadcrumb separator=">" :style="{margin: '24px 0'}">
      <BreadcrumbItem>我的账户</BreadcrumbItem>
      <BreadcrumbItem>财务管理</BreadcrumbItem>
      <BreadcrumbItem>应付款账单</BreadcrumbItem>
      <BreadcrumbItem>应付款信息提交</BreadcrumbItem>
  </Breadcrumb>
    <div class="w_creditInfo" :style="{fontSize:'14px'}">
        <div class="creditInfo">
          <span class="tit">应付款信息</span>
          <Row :style="{marginTop:'60px',textAlign:'center'}">
            <Col span="6">
            <span>对应结算单号：</span>
            <span>{{info.sytemNo}}</span>
            </Col>
              <Col span="8">
                <span>供应商：</span>
                <span>{{info.prover}}</span>
              </Col>
              <Col span="5">
                <span>应结算金额：</span>
                <span>{{info.money}}元</span>
              </Col>
              <Col span="5">
                <span>已付款金额：</span>
                <span>{{info.payMoney}}元</span>
              </Col>
          </Row>
        </div>
    </div>
    <div :style="{textAlign:'right',marginBottom:'20px',fontSize:'14px',}">
      <div class="Btn">
        <span :style="{fontSize:'20px',marginRight:'5px'}">+</span>
        <span @click="showModal">新增付款信息</span>
      </div>
    </div>
    <radioTable
        :loading="loading"
        :colname="columns1"
        :currentPage="objPage.page+1"
        :total="objPage.totalPage"
        :tableData="data1"
        @changePage="changePage"
      > </radioTable>
      <Row >
        <Col span="24" :style="{fontSize:'14px',textAlign:'center'}">
          <Button type="primary" :style="{width:'55px'}" @click="$router.go(-1)">返回</Button>
        </Col>
      </Row>
      <pay-info-submit :isAddPayInfo="modal.isAddPayInfo" :info="info" @AddPayInfoFn="isAddPayInfoFn"/>
</div> 
</template>

<script>
import publicMethod from '@/libs/publicMethod.js';
import payInfoSubmit from '../Modal/payInfoSubmit'
export default {
  components: {
    payInfoSubmit
  },
  data () {
    return {
      loading: false,
      token: sessionStorage.getItem("name"),
      modal: {
        isAddPayInfo: false
      },
      info: {
        sytemNo: '',
        prover: '',
        money: '',
        payMoney: '',
        marketplaceId: this.$route.query.marketplaceId, // this.$route.query.marketplaceId;// 平台号
        merchantId: this.$route.query.merchantId, // this.$route.query.merchantId;
        orderId: this.$route.query.orderId, // '3',   orderId=7&marketplaceId=1&merchantId=3
        id: ''
      },
      objPage: {
        totalPage: 0,
        page: 0,
        size: 10
      }, // 存放页数
      selectState: '',
      columns1: [
        {
          title: '收款银行',
          key: 'dueBank',
          width: 150,
          align: 'center'
        },
        {
          title: '收款银行开户名',
          width: 150,
          key: 'dueBankUser',
          align: 'center'
        },
        {
          title: '收款银行帐号',
          key: 'dueBankNo',
          width: 180,
          align: 'center'
        },
        {
          title: '付款银行',
          key: 'payBank',
          width: 150,
          align: 'center'
        },
        {
          title: '付款银行账号',
          key: 'payBankNo',
          width: 180,
          align: 'center'
        },
        {
          title: '银行流水号',
          key: 'payBankFlowNo',
          width: 200,
          align: 'center'
        },
        {
          title: '付款金额',
          key: 'payMoney',
          width: 150,
          align: 'center'
        },
        {
          title: '操作',
          key: 'operation',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  color: '#4e81f0',
                  marginRight: '10px',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.dele(this.data1[params.index].id)
                  }
                }
              }, '删除'),
            ]);
          }
        }
      ],
      data1: []
    };
  },
  mounted () {
    this.headInfo()
    this.queryList()
  },
  methods: {
    showModal () {
      this.modal.isAddPayInfo = true;
    },
    changePage (num) {
      this.objPage.page = num - 1;
      this.queryList()
    },
    headInfo (ids) {
      try {
        var url = `${this.fm}/finance/credit/creditConsumerSettlements`
        this.$http.get(url, {
          params: {
            access_token: this.token,
            marketplaceId: this.info.marketplaceId,
            merchantId: this.info.merchantId,
            id: this.info.orderId,
            pageNumber: 0,
            pageSize: 1,
          }
        }).then(res => {
          var data = res.data;
          if (data.return_code == 'SUCCESS') {
            var item = data.content.page[0];
            this.info = {
              sytemNo: item.id || '',
              prover: item.provideLegalName || '',
              money: item.amount ? item.amount.toFixed(2) : '0.00',
              payMoney: item.payedAmount ? item.payedAmount.toFixed(2) : '0.00',
              marketplaceId: this.info.marketplaceId,
              merchantId: this.info.merchantId,
              orderId: this.info.orderId,
            }
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    isAddPayInfoFn (TF) {
      this.modal.isAddPayInfo = TF;
      this.headInfo()
      this.queryList()
    },
    // 查询列表
    queryList () {
      this.data1 = [];
      try {
        this.loading = true;
        var url = `${this.fm}/finance/credit/creditSettlementPayinfos`;
        url += '?' + this.QS.stringify({
          access_token: this.token,
          marketplaceId: this.info.marketplaceId,
          merchantId: this.info.merchantId,
          creditSettlementBillId: this.info.orderId, // this.$route.query.orderId
          pageNumber: this.objPage.page,
          pageSize: this.objPage.size
        })
        this.$http.get(url).then(res => {
          var data = res.data;
          if (data.return_code === 'SUCCESS') {
            this.loading = false;
            this.objPage.totalPage = data.content.totalNumberOfResults;
            data.content.page.map((item, index) => {
              this.data1.push({
                dueBank: item.receiverBankName || '',
                dueBankUser: item.receiverBankAccountName || '',
                dueBankNo: item.receiverBankAccountNo || '',
                payBank: item.payBankName || '',
                payBankNo: item.payBankAccountNo || '',
                payBankFlowNo: item.payBankTradeNo || '',
                payMoney: item.amount ? item.amount.toFixed(2) : '0.00',
                id: item.id
              });
            });
          } else {
            this.loading = true;
            this.$Modal.warning({
              title: '温馨提示',
              content: data.msg
            });
          }
        });
      } catch (err) {
        console.log(err);
        this.loading = false
      }
    },
    async dele (id) {
      try {
        this.$http.post(`${this.fm}/finance/credit/deleteCreditEntrys/${this.$route.query.marketplaceId}/${this.$route.query.merchantId}/${id}?access_token=${this.token}`).then(res => {
          var data = res.data;
          if (data.return_code === 'SUCCESS') {
            this.$Modal.warning({
              title: '温馨提示',
              content: '删除成功'
            });
            this.headInfo()
            this.queryList()
          } else {
            this.$Modal.warning({
              title: '温馨提示',
              content: data.return_msg || data.msg
            });
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 重置
    reset () {
      this.changeTime.From = '';
      this.changeTime.To = '';
      this.selectState = '';
      this.buildTimeFrom = ''; // 创建时间--开始
      this.buildTimeTo = ''; // 创建时间--结束
      this.queryList();
    }
  }
};
</script>

 <style lang="less" scoped>
.Btn {
  color: #4e81f0;
  cursor: pointer;
  padding-right: 5px;
  border: 1px solid #dcdee2;
  display: inline-block;
  padding: 0 10px 5px 10px;
  &:hover {
    border: 1px solid #4e81f0;
  }
}
.w_creditInfo {
  padding: 30px 20px;
  .creditInfo {
    border: 1px solid #4e81f0;
    height: 156px;
    position: relative;
    .tit {
      font-size: 16px;
      color: #4e81f0;
      padding: 10px 20px;
      position: absolute;
      top: -20px;
      background: #fff;
      left: 50px;
    }
    .Status {
      font-size: 14px;
      color: #666666;
      text-align: right;
      line-height: 40px;
      span {
        margin-right: 10px;
      }
      .state {
        color: #1aad19;
      }
    }
  }
}
.w_query {
  padding: 30px 20px;
}
</style>


