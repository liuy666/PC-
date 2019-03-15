
<template>
<div class="purchaseOrder">
    <Breadcrumb separator=">" :style="{margin: '24px 0'}">
      <BreadcrumbItem>我的账户</BreadcrumbItem>
      <BreadcrumbItem>财务管理</BreadcrumbItem>
      <BreadcrumbItem>应收款账单</BreadcrumbItem>
  </Breadcrumb>
    <div class="w_query" :style="{fontSize:'14px'}">
      <Row :style="styleB">
        <Col span="12">
        <span :style="{marginRight:'17px'}">单号：</span>
        <Input v-model="form.oddNum" placeholder="请输入单号" :style="style" />
        </Col>
        <Col span="12">
            <span>下级代理商：</span>
            <Input v-model="form.agent" placeholder="请输入下级代理商" :style="style5" />
        </Col>
        </Row>
        <Row :style="styleB">
            <Col span="12">
              <span>创建日期：</span>
              <DatePicker type="date" v-model="buildTimeFrom" :options="buildTimeFromOption"  @on-change="buildTimeFromChange" placement="bottom-start" placeholder="开始日期" :style="style_time"></DatePicker>
              <span :style="{margin:'0 5px'}">至</span>
              <DatePicker type="date" v-model="buildTimeTo" :options="buildTimeToOption"  @on-change="buildTimeToChange" placeholder="结束日期" style="width: 180px"></DatePicker>
            </Col>
            <Col span="12">
              <span :style="{marginRight:'15px'}">付款日期：</span>
              <DatePicker type="date" v-model="payTimeFrom" placeholder="请选择开始时间" :options="payTimeFromOption"  @on-change="payTimeFromChange" :style="style_time"></DatePicker>
              <span :style="{margin:'0 5px'}">至</span>
              <DatePicker type="date"  v-model="payTimeTo" placeholder="请选择结束时间"  :options="payTimeToOption"  @on-change="payTimeToChange"  style="width: 180px"></DatePicker>
            </Col>
          </Row>
          <Row :style="styleB">
            <Col span="12">
                <span>结算状态：</span>
                <Select v-model="form.settleStatus" :style="style5">
                    <Option v-for="item in settleStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
          </Row>
          <Row>
            <Col span="8">
                <Button class="btnBg" shape="circle" :style="[styleW,styleR]" @click="query">查询</Button>
                <Button shape="circle" :style="styleW" @click="reset">重置</Button>
            </Col>
          </Row>
    </div>
      <radioTable
        :loading="loading"
        :colname="columnsTit"
        :currentPage="objPage.page+1"
        :total="objPage.totalPage"
        :tableData="columnsData"
        @changePage="changePage"
      > </radioTable>

  <!-- 收款详情  -->
  <gather-a :gatherBtn="this.gatherBtn" :id="id"  v-on:gatherBtnFn="gatherBtnFn"/>
</div>
</template>

<script>
import gatherA from '../Modal/gatherDetail';//收款详情
import publicMethod from '@/libs/publicMethod.js';
import getId from '@/libs/getSettleMerchantId.js';
import tradState from '@/libs/tradState.js'
export default {
  components: {
    gatherA
  },
  data () {
    return {

      style_time: { width: '180px', marginleft: '10px' },
      style: { width: '220px', marginLeft: '10px' },
      style5: { width: '220px', marginLeft: '0px' },
      styleB: { marginBottom: '30px' },
      styleW: { width: '60px', height: '30px' },
      styleR: { marginRight: '10px' },
      loading: false,
      token: sessionStorage.getItem("name"),
      objPage: {
        totalPage: 0,
        page: 0,
        size: 10
      },//存放页数
      id: {
        marketplaceId: '',
        merchantId: '',
        consumerId: '',
        gatherId: '',//收款详情ID
        isSurePay: false,
        isAccountsPay: false
      },
      gatherBtn: false,
      form: {
        oddNum: '',//单号
        stytemNo: '',//系统单号
        agent: '',//下级代理商
        settleStatus: '全部',//结算状态
      },
      buildTime: {
        from: '',
        to: ''
      },
      payTime: {
        from: '',
        to: ''
      },

      buildTimeFrom: '',//创建时间--开始
      buildTimeTo: '',//创建时间--结束
      payTimeFrom: '',//支付时间--开始
      payTimeTo: '',//支付时间--结束
      buildTimeFromOption: {},
      buildTimeToOption: {},
      payTimeFromOption: {},
      payTimeToOption: {},
      settleStatusList: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: 'PENDING',
          label: '待结算'
        },
        {
          value: 'PARTIAL_PAY',
          label: '已部分付款'
        },
        {
          value: 'FULL_PAY',
          label: '已付款 '
        },
        {
          value: 'FINISHED',
          label: '确认完成'
        }
      ],
      columnsTit: [
        {
          title: '单号',
          key: 'stytemNo',
          width: 150,
          align: 'center',
        },
        {
          title: '创建日期',
          key: 'buildTime',
          width: 180,
          align: 'center',
        },
        {
          title: '下级代理商',
          key: 'agent',
          width: 200,
          align: 'center'
        },
        {
          title: '应结算金额(元)',
          key: 'SettleAmount',
          width: 150,
          align: 'center'
        },
        {
          title: '结算状态',
          key: 'settleStatus',
          width: 150,
          align: 'center'
        },
        {
          title: '预付时间',
          key: 'PrepayTime',
          width: 180,
          align: 'center'
        },
        {
          title: '已付款金额(元)',
          key: 'AmountPaid',
          width: 150,
          align: 'center'
        },
        {
          title: '操作',
          key: 'operation',
          width: 230,
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
                    this.$router.push({
                      path: '/fnance-manage/accountsDueDetail',
                      query: {
                        orderId: this.columnsData[params.index].stytemNo,
                        marketplaceId: this.id.marketplaceId,
                        merchantId: this.id.merchantId
                      }
                    })
                  }
                }
              }, '结算详情'),
              h('span', {
                style: {
                  color: '#4e81f0',
                  marginRight: '10px',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.gatherBtn = true;
                    this.id.isSurePay = false;
                    this.id.isAccountsPay = false
                    this.id.gatherId = this.columnsData[params.index].stytemNo
                  }
                }
              }, ' 收款详情'),
              h('span', {
                style: {
                  color: '#4e81f0',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.gatherBtn = true;
                    this.id.isSurePay = true;
                    this.id.isAccountsPay = false
                    this.id.gatherId = this.columnsData[params.index].stytemNo
                  }
                }
              }, this.columnsData[params.index]._settleStatus === 'FINISHED' ? '' : ' 收款确认')
            ]);
          }
        }
      ],
      columnsData: []
    }
  },
  async mounted () {
    let idArr = await getId.getId(this.fm, this.token, 3);
    if (idArr) {
      this.id.marketplaceId = idArr[0];
      this.id.merchantId = idArr[1];
      this.id.consumerId = idArr[2];
    }
    //创建日期
    this.buildTimeFromChange(this.buildTimeFrom);
    this.buildTimeToChange(this.buildTimeTo)
    //付款日期
    this.payTimeFromChange(this.payTimeFrom)
    this.payTimeToChange(this.payTimeTo);
    this.getList()
  },
  methods: {
    gatherBtnFn (TF) { this.gatherBtn = TF },
    changePage (num) {
      this.objPage.page = num - 1;
      this.getList()
    },
    buildTimeFromChange (buildTimeFrom) {
      this.buildTime.from = buildTimeFrom;
      this.buildTimeToOption = {
        disabledDate (buildTimeTo) {
          return buildTimeTo < new Date(new Date(buildTimeFrom).getTime() - 24 * 60 * 60 * 1000)
          // return buildTimeTo < new Date(buildTimeFrom)
        }
      }
    },
    payTimeFromChange (payTimeFrom, type) {
      this.payTime.from = payTimeFrom;
      this.payTimeToOption = {
        disabledDate (payTimeTo) {
          return payTimeTo < new Date(new Date(payTimeFrom).getTime() - 24 * 60 * 60 * 1000)
          // return payTimeTo < new Date(payTimeFrom)
        }
      }
    },
    buildTimeToChange (buildTimeTo, type) {
      this.buildTime.to = buildTimeTo;
      this.buildTimeFromOption = {
        disabledDate (buildTimeFrom) {
          return buildTimeFrom > new Date(buildTimeTo)
        }
      }
    },
    payTimeToChange (payTimeTo, type) {
      this.payTime.to = payTimeTo
      this.payTimeFromOption = {
        disabledDate (payTimeFrom) {
          return payTimeFrom > new Date(payTimeTo)
        }
      }
    },
    //获取卖家列表
    getList () {
      this.columnsData = [];
      try {
        var url = `${this.fm}/finance/credit/creditProviderSettlements`;
        url += '?' + this.QS.stringify({
          access_token: this.token,
          marketplaceId: this.id.marketplaceId,
          merchantId: this.id.merchantId,
          providerId: this.id.consumerId,//授信方id
          pageNumber: this.objPage.page,
          pageSize: this.objPage.size,
          id: this.form.oddNum,//结算单号
          providerName: this.form.agent,//授信方名称
          settlementStatus: this.form.settleStatus === '全部' ? '' : this.form.settleStatus,//结算状态
          creationFromDate: this.buildTime.from,//创建起始时间
          creationToDate: this.buildTime.to,//创建终止时间
          payedFromDate: this.payTime.from,//付款起始时间
          payedToDate: this.payTime.to,//付款截止时间
          sourceBillNo: '',//单号
        });
        this.$http.get(url).then(res => {
          var data = res.data;
          if (data.return_code == 'SUCCESS') {
            this.objPage.totalPage = data.content.totalNumberOfResults;
            if (data.content.page.length > 0) {
              data.content.page.map((item, index) => {
                this.columnsData.push({
                  // number: item.sourceBillNo,
                  stytemNo: item.id,
                  buildTime: item.creationDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.creationDate) : '',
                  agent: item.consumeLegalName,
                  SettleAmount: item.amount ? item.amount.toFixed(2) : '0.00',
                  settleStatus: tradState.account(item.settlementStatus),
                  _settleStatus: item.settlementStatus,
                  PrepayTime: item.payedDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.payedDate) : '',
                  AmountPaid: item.payedAmount ? item.payedAmount.toFixed(2) : '0.00',
                });
              })
            }
          } else {
            this.$Modal.warning({
              title: '温馨提示',
              content: data.return_msg || data.msg
            });
          }
        });
      } catch (err) {
        console.log(err)
      }
    },
    query () {
      this.objPage.page = 0;
      this.getList()
    },
    //重置
    reset () {
      this.form.oddNum = '';//结算单号
      this.form.agent = '';//授信方名称
      this.form.stytemNo = '';//对应结算系统单号
      this.form.settleStatus = '全部';//结算状态
      this.buildTime.from = '';//创建起始时间
      this.buildTime.to = '';//创建终止时间
      this.payTime.from = '';//付款起始时间
      this.payTime.to = '';//付款截止时间
      this.buildTimeFrom = '';//创建时间--开始
      this.buildTimeTo = '';//创建时间--结束
      this.payTimeFrom = '';//支付时间--开始
      this.payTimeTo = '';//支付时间--结束
      this.getList();
      this.buildTimeFromOption = {};
      this.buildTimeToOption = {};
      this.payTimeFromOption = {};
      this.payTimeToOption = {};
    },
  }
}
</script>

 <style lang="less" scoped>
.btnBg {
  background: #4e81f0;
  color: #fff;
  &:hover {
    background: #306bea;
  }
}
.w_query {
  padding: 30px 0px;
}
// 遮罩层
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
}
</style>


