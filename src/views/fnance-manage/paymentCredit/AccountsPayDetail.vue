
<template>
<div class="purchaseOrder">
    <Breadcrumb separator=">" :style="{margin: '24px 0'}">
      <BreadcrumbItem>我的账户</BreadcrumbItem>
      <BreadcrumbItem>财务管理</BreadcrumbItem>
      <BreadcrumbItem>应付款账单</BreadcrumbItem>
      <BreadcrumbItem>应付款账单详情</BreadcrumbItem>
  </Breadcrumb>
    <div class="w_query" :style="{fontSize:'14px'}">
      <Row>
        <Col span="8">
            <span>对应结算单号：</span>
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
            <span>代理商：</span>
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
          <Button type="primary" shape="circle" :style="{width:'55px'}" @click="$router.back(-1)">返回</Button>
        </Col>
  </Row>
</div>
    
</template>

<script>
import publicMethod from '@/libs/publicMethod.js';
import tradState from '@/libs/tradState.js'
export default {
  components: {
  },
  data () {
    return {
      loading: false,
      token: sessionStorage.getItem("name"),
      objPage: {
        totalPage: 0,
        page: 0,
        size: 10
      },
      header: {
        No: '',
        buildTime: '',
        statemState: '',
        agent: '',
        money: ''
      },
      stytemNo: '',
      columnsTit: [
        // {
        //   title: '业务单号',
        //   key: 'RecordNum',
        //   width: 180,
        //   align: 'center',
        // },
        {
          title: '对应结算系统源单号',
          key: 'stytemNo',
          width: 180,
          align: 'center',
        },
        {
          title: '分录号',
          key: 'RecordNo',
          width: 180,
          align: 'center',
        },
        {
          title: '付款完成日期',
          key: 'paidTime',
          width: 180,
          align: 'center',
        },
        {
          title: '收/支',
          key: 'InAndOut',
          width: 180,
          align: 'center'
        },
        {
          title: '结算金额(元)',
          key: 'SettleAmount',
          width: 180,
          align: 'center'
        },
        {
          title: '源单类型',
          key: 'settlestyle',
          width: 180,
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
        this.$http.get(this.fm + '/finance/credit/creditConsumerSettlements', {
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
            this.stytemNo = item.orderId;
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
                  // RecordNum: item.outTradeNo || '',// items.id || '',
                  stytemNo: items.orderId || '',
                  RecordNo: items.id || '',
                  paidTime: items.payedDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', items.payedDate) : '',
                  InAndOut: items.entryType == 'OUTCOME' ? '支' : '收',
                  SettleAmount: items.amount ? items.amount.toFixed(2) : '0.00',
                  settlestyle: tradState.BusinessType(items.originType),
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
.table {
  padding: 0px 20px 30px;
  .ivu-table-cell {
    padding: 0;
  }
}
</style>


