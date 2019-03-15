
<template>
<div class="purchaseOrder">
    <Breadcrumb separator=">" :style="{margin: '24px 0'}">
      <BreadcrumbItem>我的账户</BreadcrumbItem>
      <BreadcrumbItem>财务管理</BreadcrumbItem>
      <BreadcrumbItem>应收款账单</BreadcrumbItem>
      <BreadcrumbItem>应收款账单结算详情</BreadcrumbItem>
  </Breadcrumb>
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
    <!-- <div class="table">
        <Table border :columns="columnsTit" :data="columnsData"></Table>
    </div> -->
    
  <radioTable
    :loading="loading"
    :colname="columnsTit"
    :currentPage="objPage.page+1"
    :total="objPage.totalPage"
    :tableData="columnsData"
    @changePage="changePage"
  > </radioTable>
  <Row :style="{fontSize:'14px',textAlign:'center'}">
        <Col span="24">
          <Button type="primary" shape="circle" :style="styleW" @click="$router.back(-1)">返回</Button>
        </Col>
  </Row>
</div>
    
</template>

<script>
import publicMethod from '@/libs/publicMethod.js';
import tradState from '@/libs/tradState.js';
export default {
  data () {
    var _this = this;
    return {
      styleW: { width: '60px', height: '30px' },
      token: sessionStorage.getItem("name"),
      loading: false,
      header: {
        No: '',
        buildTime: '',
        statemState: '',
        agent: '',
        money: ''
      },
      objPage: {
        totalPage: 0,
        page: 0,
        size: 10
      },
      columnsTit: [
        {
          title: '分录号',
          key: 'RecordNum',
          align: 'center',
        },
        {
          title: '付款完成日期',
          key: 'paidTime',
          align: 'center',
        },
        {
          title: '收/支',
          key: 'InAndOut',
          align: 'center'
        },
        {
          title: '结算金额(元)',
          key: 'SettleAmount',
          align: 'center'
        },
        {
          title: '源单类型',
          key: 'settlestyle',
          align: 'center'
        },
        {
          title: '源单号',
          key: 'orginNum',
          align: 'center'
        },

      ],
      columnsData: []
    }
  },
  mounted () {
    this.getDetail();
    this.headInfo()
  },
  methods: {
    changePage (num) {
      this.objPage.page = num - 1;
      this.getDetail()
    },
    headInfo () {
      try {
        this.$http.get(this.fm + '/finance/credit/creditProviderSettlements', {
          params: {
            access_token: this.token,
            marketplaceId: this.$route.query.marketplaceId,//平台号
            merchantId: this.$route.query.merchantId,
            pageNumber: 0,
            pageSize: 1,
            id: this.$route.query.orderId,//结算单号
          }
        }).then(res => {
          var data = res.data;
          if (data.return_code == 'SUCCESS') {
            var item = data.content.page[0];
            this.header = {
              No: item.id,
              buildTime: item.creationDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.creationDate) : '',
              statemState: tradState.account(item.settlementStatus),
              agent: item.consumeLegalName,
              money: item.amount
            }
          } else {
            this.$Modal.warning({
              title: '温馨提示',
              content: '请求失败'
            });
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    getDetail () {
      this.columnsData = [];
      try {
        this.$http.get(`${this.fm}/finance/credit/creditSettlementBillItems`, {
          params: {
            access_token: this.token,
            marketplaceId: this.$route.query.marketplaceId,//平台号
            merchantId: this.$route.query.merchantId,
            creditSettlementBillId: this.$route.query.orderId,//this.$route.query.orderId
            pageNumber: this.objPage.page,
            pageSize: this.objPage.size
          }
        }).then(res => {
          var data = res.data;
          if (data.return_code == 'SUCCESS') {
            this.objPage.totalPage = data.content.totalNumberOfResults;
            if (data.content.page.length > 0) {
              var item = data.content.page
              item.map((items, index) => {
                this.columnsData.push({
                  RecordNum: items.id,
                  paidTime: items.payedDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', items.payedDate) : '',
                  InAndOut: items.entryType == 'OUTCOME' ? '支' : '收',
                  SettleAmount: items.amount ? items.amount.toFixed(2) : '0.00',
                  settlestyle: tradState.BusinessType(items.originType),
                  orginNum: items.orderId,
                })
              })
            }
          } else {
            this.$Modal.warning({
              title: '温馨提示',
              content: '请求失败'
            });
          }
        });
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

 <style lang="less" scoped>
.w_query {
  padding: 30px 20px;
  span {
    font-size: 14px;
  }
}
</style>


