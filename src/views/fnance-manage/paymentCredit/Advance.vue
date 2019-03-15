
<template>
<div class="purchaseOrder">
  <Breadcrumb separator=">" :style="{margin: '24px 0'}">
      <BreadcrumbItem>我的账户</BreadcrumbItem>
      <BreadcrumbItem>财务管理</BreadcrumbItem>
      <BreadcrumbItem v-if="this.$route.query.type=='2'">供应商账户管理</BreadcrumbItem>
      <BreadcrumbItem v-else>分销账户管理</BreadcrumbItem>
      <BreadcrumbItem>预付款管理</BreadcrumbItem>
  </Breadcrumb>
  <div class="w_creditInfo">
      <div class="creditInfo">
        <span class="tit">预付款信息</span>
        <Row :style="{marginTop:'60px',textAlign:'center',fontSize:'14px'}">
            <Col span="8" >
              <span>预付款功能：</span>
              <span :style="{color:info.FS=='已开启'?'#1AAD19':'#F00'}">{{info.FS}}</span>
               <span v-if="this.$route.query.type!='2'">
                  <span v-if="info.FS=='已开启'" class="stateBtn cursor" @click="isOpenCredit('STOPED')" :style="{marginLeft:'20px',color:'#4e81f0'}">关闭</span>
                  <span v-else class="stateBtn cursor" @click="isOpenCredit('INSERVICE')" :style="{marginLeft:'20px',color:'#4e81f0'}">开启</span>
               </span>
            </Col>
            <Col span="8">
              <span>预付款余额：</span>
              <span>{{info.money}}元</span>
              <span 
              v-if="info.FS=='已开启'&&this.$route.query.type!='2'" 
              :style="{color:'#4e81f0',marginLeft:'10px',cursor:'pointer'}" 
              @click="modal.isAdvanceRegister=true;">设置预付款登记</span>
            </Col>
            <Col span="8" :style="{textIndent:'40px'}">
              <span>余额预警值：</span>
              <span>{{info.warmMoney}}元</span>
              <span 
                v-if="info.FS=='已开启'&&this.$route.query.type!='3'" 
              :style="{color:'#4e81f0',marginLeft:'10px',cursor:'pointer'}" @click="modal.isWarnMoney=true">修改</span>
            </Col>
        </Row>
      </div>
  </div>
  <div class="w_query" :style="{fontSize:'14px'}">
    <Row :style="styleB">
      <Col span="12">
      <span>日期：</span> 
      <DatePicker type="date" v-model="buildTimeFrom" :options="buildTimeFromOption"  @on-change="buildTimeFromChange" placement="bottom-start" placeholder="开始日期" :style="style_time"></DatePicker>
      <span :style="{margin:'0 5px'}">至</span> 
      <DatePicker type="date"  v-model="buildTimeTo" :options="buildTimeToOption"  @on-change="buildTimeToChange" placeholder="结束日期" style="width: 180px"></DatePicker>
      </Col>
      <Col span="12">
          <span>业务类别：</span>
          <Select v-model="selectState" :style="style">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
      </Col>
      </Row>
      <Row>
        <Col span="12" >
          <Button class="btnBg" shape="circle" :style="[styleW,styleR]" @click="query">查询</Button>
          <Button shape="circle" :style="styleW" @click="reset">重置</Button>
      </Col>
    </Row> 
  </div>
  <radioTable
    :loading="loading"
    :colname="columns1"
    :currentPage="objPage.page+1"
    :total="objPage.totalPage"
    :tableData="data1"
    @changePage="changePage"
  > </radioTable>
   <!-- 预付款余额 -->
  <advance-register :isTrue ='modal.isAdvanceRegister' :info='info'  @isTrueFn="isTrueFn"/> 
  <!-- 余额预警值 -->
  <warn-money :isWarnMoney ='modal.isWarnMoney' :info='info' :money="+info.warmMoney" @isWarnMoneyFn="isWarnMoneyFn"/> 
</div> 
</template>

<script>
import advanceRegister from '../Modal/advanceRegister';// 预付款余额
import warnMoney from '../Modal/modifyWarnMoney';// 预付款余额
import publicMethod from '@/libs/publicMethod.js';
import tradState from '@/libs/tradState.js';
export default {
  components: {
    advanceRegister,
    warnMoney
  },
  data () {
    return {
      style_time: { width: '180px', marginleft: '10px' },
      style: { width: '220px', marginLeft: '10px' },
      styleB: { marginBottom: '30px' },
      styleW: { width: '60px', height: '30px' },
      styleR: { marginRight: '10px' },
      loading: false,
      token: sessionStorage.getItem("name"),
      btnList: [
        {
          type: 1,
          btnlabel: '刷新'
        }
      ],
      modal: {
        isAdvanceRegister: false,
        isWarnMoney: false
      },
      info: {
        FS: '',
        money: '',
        warmMoney: '',
        user: this.$route.query.userName,
        marketplaceId: this.$route.query.marketplaceId, // this.$route.query.marketplaceId;// 平台号
        merchantId: this.$route.query.merchantId, // this.$route.query.merchantId;
        consumerId: this.$route.query.consumerId, // '3',
        type: this.$route.query.type,
        scenicareacode: this.$route.query.scenicareacode,
        agentCode: this.$route.query.agentCode,
        id: ''
      },
      objPage: {
        totalPage: 0,
        page: 0,
        size: 10
      }, // 存放页数
      selectState: '全部',
      buildTimeFromOption: {},
      buildTimeToOption: {},
      buildTimeFrom: '', // 创建时间--开始
      buildTimeTo: '', // 创建时间--结束
      changeTime: {
        From: '',
        To: ''
      },
      cityList: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: 'TRADE',
          label: ' 交易'
        },
        {
          value: 'REFUND',
          label: ' 退款'
        },
        {
          value: 'CREDITADD',
          label: ' 预付款收取登记'
        }
        // {
        //   value: 'CREDITREDUCE',
        //   label: ' 预付款减额'
        // }
      ],
      columns1: [
        {
          title: '日期',
          key: 'time',
          width: 170,
          align: 'center'
        },
        {
          title: '业务单号',
          key: 'originNo',
          width: 200,
          align: 'center'
        },
        {
          title: '关联结算系统单号',
          key: 'organNo',
          width: 150,
          align: 'center'
        },
        {
          title: '收/支',
          key: 'inAndOut',
          width: 80,
          align: 'center'
        },
        {
          title: '变动前余额(元)',
          key: 'money',
          width: 150,
          align: 'center'
        },
        {
          title: '变动金额(元)', // 结算系统传过来的单号
          align: 'center',
          width: 150,
          key: 'changeMoney'
        },
        {
          title: '业务类别',
          key: 'businessType',
          width: 140,
          align: 'center'
        },
        {
          title: '变动后余额(元)',
          key: 'finshMoney',
          width: 150,
          align: 'center'
        }
      ],
      data1: []
    };
  },
  mounted () {
    // 创建日期
    this.buildTimeFromChange(this.buildTimeFrom);
    this.buildTimeToChange(this.buildTimeTo);
    this.advanceInfo();
  },
  methods: {
    isTrueFn (TorF) {
      this.modal.isAdvanceRegister = TorF;
    },
    isWarnMoneyFn (TOR) {
      this.modal.isWarnMoney = TOR;
      if (!TOR) {
        this.advanceInfo();
      }
    },
    changePage (num) {
      this.objPage.page = num - 1;
      this.queryList()
    },
    buildTimeFromChange (buildTimeFrom) {
      this.changeTime.From = buildTimeFrom;
      this.buildTimeToOption = {
        disabledDate (buildTimeTo) {
          return buildTimeTo < new Date(new Date(buildTimeFrom).getTime() - 24 * 60 * 60 * 1000)
          // return buildTimeTo < new Date(buildTimeFrom);
        }
      };
    },
    buildTimeToChange (buildTimeTo, type) {
      this.changeTime.To = buildTimeTo;
      this.buildTimeFromOption = {
        disabledDate (buildTimeFrom) {
          return buildTimeFrom > new Date(buildTimeTo);
        }
      };
    },
    advanceInfo () {
      this.$http.get(`${this.fm}/finance/advancePay/advancePayAccounts/${this.info.marketplaceId}/${this.info.merchantId}`, {
        params: {
          access_token: this.token,
          consumerId: this.info.consumerId, // this.$route.query.consumerId,
          type: this.info.type,// 1:后台管理，2：供应商管理，3：分销商管理
          pageNumber: 0,
          pageSize: 1
        }
      }).then(res => {
        var data = res.data;
        if (data.return_code === 'SUCCESS') {
          if (data.content.page.length > 0) {
            this.info.FS = data.content.page[0].accountStatus === 'INSERVICE' ? '已开启' : '未开启';// 状态,
            this.info.money = data.content.page[0].balance ? data.content.page[0].balance : '0';// 余额,
            this.info.warmMoney = data.content.page[0].warningAmount ? data.content.page[0].warningAmount : '0';// 预警余额
            this.info.id = data.content.page[0].id;// 账户id
            this.queryList();
          }
        } else {
          this.$Modal.warning({
            title: '温馨提示',
            content: '请求失败'
          });
        }
      }).catch(err => {
        this.$Modal.warning({
          title: '温馨提示',
          content: err
        });
      });
    },
    // 授信账户启用\禁止
    isOpenCredit (openStatus) {
      try {
        let path = {
          marketplaceId: this.info.marketplaceId,
          merchantId: this.info.merchantId,
          id: this.info.id
        };
        this.$http.put(`${this.fm}/finance/basis/over/${path.marketplaceId}/${path.merchantId}/${path.id}/${openStatus}?access_token=${this.token},`)
          .then(res => {
            let data = res.data;
            if (data.return_code === 'SUCCESS') {
              this.advanceInfo();
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
    // 查询列表
    queryList () {
      this.data1 = [];
      let path = {
        marketplaceId: this.info.marketplaceId,
        merchantId: this.info.merchantId,
        id: this.info.id
      };
      try {
        this.loading = true;
        this.$http.get(`${this.fm}/finance/advancePay/advancePayAccountsDetail/${path.marketplaceId}/${path.merchantId}/${path.id}`, {
          params: {
            access_token: this.token,
            creationFromTime: this.changeTime.From,
            creationToTime: this.changeTime.To,
            businssType: this.selectState === '全部' ? '' : this.selectState,
            pageNumber: this.objPage.page,
            pageSize: this.objPage.size
          }
        }).then(res => {
          var data = res.data;
          if (data.return_code === 'SUCCESS') {
            this.loading = false;
            this.objPage.totalPage = data.content.totalNumberOfResults;
            data.content.page.map((item, index) => {
              this.data1.push({
                time: publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.creationDate),
                originNo: item.outTradeNo,//item.id, //业务单号
                organNo: item.orderId, // 关联结算系统单号
                inAndOut: item.entryType === 'OUTCOME' ? '支' : '收',
                money: item.beforeBalance ? item.beforeBalance.toFixed(2) : '0.00',
                changeMoney: item.entryType === 'OUTCOME' ? `-${item.amount.toFixed(2)}` : `+${item.amount.toFixed(2)}`,
                businessType: tradState.advance(item.businessType),
                finshMoney: item.afterBalance ? item.afterBalance.toFixed(2) : '0.00'
              });
            });
          } else {
            this.$Modal.warning({
              title: '温馨提示',
              content: data.return_msg || data.msg
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    query () {
      this.objPage.page = 0
      this.queryList()
    },
    // 重置
    reset () {
      this.changeTime.From = '';
      this.changeTime.To = '';
      this.selectState = '全部';
      this.buildTimeFrom = ''; // 创建时间--开始
      this.buildTimeTo = ''; // 创建时间--结束
      this.queryList();
    }
  }
};
</script>

 <style lang="less" scoped>
.btnBg {
  background: #4e81f0;
  color: #fff;
  &:hover {
    background: #306bea;
  }
}
.cursor {
  cursor: pointer;
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
      margin-bottom: 10px;
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
.table {
  padding: 0px 20px 30px;
  .ivu-table-cell {
    padding: 0;
  }
}
</style>


