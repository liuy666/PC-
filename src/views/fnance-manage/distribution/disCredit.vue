
<template>
 <div class="purchaseOrder">
        <!-- <template v-if="isShowLoading">
            <loading></loading>
        </template> -->
        <Breadcrumb separator=">" :style="{margin: '24px 0'}">
          <BreadcrumbItem>我的账户</BreadcrumbItem>
          <BreadcrumbItem>财务管理</BreadcrumbItem>
          <BreadcrumbItem>分销账户管理</BreadcrumbItem>
        </Breadcrumb>
        <div class="w_query"  :style="{fontSize:'14px'}">
            <Row :style="styleB">
              <Col span="12">
                  <span>分销商名称：</span>
                  <Input v-model="query.distributor" placeholder="分销商名称" :style="style"/>
              </Col>
              <Col span="12">
                  <span>注册时间：</span>
                  <DatePicker type="date" v-model="query.time"  @on-change="timeChange" placement="bottom-start" :style="style"></DatePicker>
              </Col>
            </Row>
            <Row :style="styleB">
              <Col span="12">
                  <span :style="{marginRight:'26px'}">用户名：</span>
                  <Input v-model="query.userName" placeholder="用户名" :style="style"/>
              </Col>
            </Row>
            <Row>
              <Button v-if="isOpen" class="btnBg" shape="circle" :style="[styleW,styleR]" @click="querycl">查询</Button>
              <Button v-else class="btnBg" shape="circle" :style="[styleW,styleR]" disabled>查询</Button>
              <Button v-if="isOpen" shape="circle" :style="styleW" @click="reset">重置</Button>
              <Button v-else shape="circle" :style="styleW" disabled>重置</Button>
            </Row>
            <Row>
                <!-- <Col span="24" :style="{textAlign:'right'}">
                        <Button type="primary" style="width:100px" @click="queryList">+ 增加分销商</Button>
                </Col> -->
            </Row>
        </div>
        <div slot="title" class="cardTitle" >
            <p>分销账户列表</p>
        </div>
        <radioTable
                :loading="isLoading"
                :colname="columns1"
                :currentPage="objPage.page"
                :total="objPage.totalPage"
                :tableData="data1"
                @changePage="changePage"
              >
      </radioTable>
</div>

</template>

<script>

export default {
  data () {
    return {
      style: { width: '220px', marginLeft: '10px' },
      styleB: { marginBottom: '30px' },
      styleW: { width: '60px', height: '30px' },
      styleR: { marginRight: '10px' },
      isLoading: false,
      isopen: false,
      token: sessionStorage.getItem("name"),
      //存放页数
      objPage: {
        totalPage: 0,
        page: 1,
        size: 10
      },
      query: {
        distributor: '',
        time: '',
        userName: ''
      },
      isOpen: true,
      columns1: [
        {
          title: '分销商名称',
          align: 'center',
          width: 250,
          key: 'distributor'
        },
        {
          title: '姓名',//为景区的交易单号退款单号
          align: 'center',
          width: 200,
          key: 'userName'
        },
        {
          title: '用户名',//结算系统传过来的单号
          align: 'center',
          width: 125,
          key: 'user'

        },
        {
          title: '手机号码',//结算系统传过来的单号
          align: 'center',
          width: 125,
          key: 'phone'
        },
        {
          title: '座机号码',//结算系统传过来的单号
          align: 'center',
          width: 125,
          key: 'seatPhone'
        },
        {
          title: '注册时间',//结算系统传过来的单号
          align: 'center',
          width: 160,
          key: 'time'
        },
        {
          title: '所在分组',//结算系统传过来的单号
          align: 'center',
          width: 125,
          key: 'group'
        },
        {
          title: '用户状态',//结算系统传过来的单号
          align: 'center',
          width: 125,
          key: 'userState'
        },
        {
          title: '操作',
          key: 'operation',
          width: 180,
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
                    var user = this.data1[params.index];
                    this.getSettleMerchantId(user, 'credit');
                  }
                }
              }, '授信管理'),
              h('span', {
                style: {
                  color: '#4e81f0',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    var user = this.data1[params.index];
                    this.getSettleMerchantId(user, 'Advance');
                  }
                }
              }, '预付款管理')
            ]);
          }
        }
      ],
      data1: []
    }
  },
  mounted () {
    //创建日期
    this.isOpenUser();
  },
  methods: {
    changePage (num) {
      this.objPage.page = num;
      this.queryList()
    },

    timeChange (time) {
      this.query.time = time;
    },
    isOpenUser () {
      this.data1 = [];
      this.$http.get(`${this.fm}/finance/basis/isOpenSettleAccount?access_token=${this.token}&type=3`).then(res => {
        var data = res.data;
        if (data.return_code === 'FAIL') {
          this.$Modal.warning({
            title: '温馨提示',
            content: data.return_msg
          });
          this.isOpen = false;
          return false;
        } else {
          this.isOpen = true
          this.queryList();
        }
      });
    },
    //查询列表
    queryList () {
      this.data1 = [];
      try {
        this.$http.get(`${this.fm}/ec/distributor/v1/getMyDistributorConditionsList`, {
          params: {
            access_token: this.token,
            consumerName: this.query.distributor,
            userName: this.query.userName,
            registeredDate: this.query.time,
            type: '3',
            page: this.objPage.page,
            pageSize: this.objPage.size
          }
        }).then(res => {
          var data = res.data;
          if (data.code == 200) {
            this.objPage.totalPage = data.data.totalCount;
            data.data.items.map((item, index) => {
              this.data1.push({
                distributor: item.corpname,
                userName: item.note6,
                usid: item.usid,
                user: item.usid,
                phone: item.mobile,
                seatPhone: item.telno,
                time: item.ldate,
                group: item.pricegroupid ? `分组${item.pricegroupid}` : '',
                userState: item.status == '01' ? '正常' : '停用',
                merchantId: item.merchantId, // 商户号
                consumerId: item.consumerId,// 客户号
                scenicareacode: item.scenicareacode || '',
                agentCode: item.agentCode || ''
              })
            })
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
    //当前用户是否开通
    onIsOpen (user, pathType, serviceType, axiosData) {
      var url = '';
      var params = {};
      if (pathType === 'credit') {
        url = `${this.fm}/finance/credit/creditAccountsInfo`;
        params = {
          access_token: this.token,
          marketplaceId: axiosData.platformId, // 平台号 axiosData.platformId
          merchantId: axiosData.merchantId, // 商户号
          consumerId: axiosData.consumerId, // 授信客户id
          // merchantId: user.merchantId, // 商户号
          // consumerId: user.consumerId, // 授信客户id
          type: '3',
          pageNumber: 0,
          pageSize: 1
        };
      } else {
        url = `${this.fm}/finance/advancePay/advancePayAccounts/${axiosData.platformId}/${axiosData.merchantId}`;
        params = {
          access_token: this.token,
          consumerId: axiosData.consumerId,
          type: '3', // 1:后台管理，2：供应商管理，3：分销商管理
          pageNumber: 0,
          pageSize: 1
        };
      }
      this.$http.get(url, { params: params }).then(res => {
        var data = res.data;
        if (data.return_code === 'SUCCESS') {
          if (data.content.page.length > 0) {
            this.$router.push({
              path: '/' + pathType,
              query: {
                _PAY: serviceType,
                marketplaceId: axiosData.platformId,
                merchantId: axiosData.merchantId,
                consumerId: axiosData.consumerId,
                // merchantId: user.merchantId,
                // consumerId: user.consumerId,
                No: user.number,
                userName: user.userName,
                corpname: user.CorporateName,
                type: '3',
                scenicareacode: user.scenicareacode,
                agentCode: user.agentCode,
                usid: user.usid
              }
            });
          } else {
            this.$router.push({
              path: '/isOpen',
              query: {
                _PAY: serviceType,
                marketplaceId: axiosData.platformId,
                merchantId: axiosData.merchantId,
                consumerId: axiosData.consumerId,
                // merchantId: user.merchantId,
                // consumerId: user.consumerId,
                pathType: pathType,
                No: user.number,
                userName: user.userName,
                corpname: user.distributor,
                type: '3',
                scenicareacode: user.scenicareacode,
                agentCode: user.agentCode,
                usid: user.usid
              }
            });
          }
        } else {
          this.$Modal.warning({
            title: '温馨提示',
            content: '请求失败'
          });
        }
      });
    },
    //获取结算商户号
    getSettleMerchantId (user, pathType) {
      var serviceType = '';
      if (pathType === 'credit') {
        serviceType = 'CREDIT_PAY';
      } else {
        serviceType = 'ADVANCE_PAY';
      }
      try {
        this.$http.get(`${this.fm}/finance/basis/getSettleMerchantId`, {
          params: {
            access_token: this.token,
            usid: user.user,
            type: '3' //1:后台管理，2：供应商管理，3：分销商管理
          }
        }).then(res => {
          var data = res.data;
          if (data.return_code === 'SUCCESS') {
            if (data.merchantId !== 0 || data.consumerId !== 0) {
              this.onIsOpen(user, pathType, serviceType, data);
            }
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
    },
    querycl () {
      this.objPage.page = 1;
      this.queryList()
    },
    //重置
    reset () {
      this.query.distributor = '',
        this.query.userName = '',
        this.query.time = '',
        this.queryList();
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
</style>


