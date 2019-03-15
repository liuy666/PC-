<template>
    <div class="purchaseOrder">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>

	<!-- 订单明细 -->


      <Breadcrumb separator=">" :style="{margin: '24px 0'}">
          <BreadcrumbItem>我的账户</BreadcrumbItem>
          <BreadcrumbItem>采购管理</BreadcrumbItem>
          <BreadcrumbItem v-if="this.$route.params.sale === 2">采购退款订单</BreadcrumbItem>
          <BreadcrumbItem v-if="this.$route.params.sale === 2">采购退款订单详情</BreadcrumbItem>
          <BreadcrumbItem v-if="this.$route.params.sale !== 2">销售退款订单详情</BreadcrumbItem>
          <BreadcrumbItem v-if="this.$route.params.sale !== 2">销售订单详情</BreadcrumbItem>
      </Breadcrumb>
      <table id="customers">
        <tr>
          <th>供应商订单号：{{supplier}}</th>
          <th>订单状态：<span :style="sizeColor">{{orderStatusText}}</span></th>
        </tr>

        <tr>
          <td colspan="12">关联分销商订单号：{{AffiliatedSupplier}}</td>
        </tr>
        <tr>
          <td colspan="12">订单金额：￥{{orderAmountText}}</td>
        </tr>
    </table>

        <p slot="title" class="cardTitle">
            <span>订单明细</span>
        </p>
        <!-- <p slot="title" class="amend-cardTitle">
            <span>订单备注：{{noteContent}}<a @click="btnModifyRemark()">修改备注</a></span>
        </p> -->



            <div class="title-name">服务商：{{titleName}}</div>
            <radioTable
                :loading="isLoading"
                :colname="colnames6"
                :total="total"
                :isPage="false"
                :tableData="tableData6"
                :isHideHeader="false"></radioTable>

          <div class="myARefunDate2">
            <radioTable
                :loading="isLoading"
                :colname="colnames2"
                :isPage="false"
                :total="total"
                :tableData="tableData2"></radioTable>
                <div class="myARefunDate2-table">
                  <span class="money-right">金额：<span>￥</span>{{listMont}}</span>
                  <span class="money-right money-r">支付金额：<span>￥</span>{{listTpmont}}</span>
                </div>
          </div>
		<!--  -->
	<!-- 订单处理详情列表 -->
        <p slot="title" class="cardTitle">
            <span>订单处理详情列表</span>
        </p>
        <div class="Order-processing-detail-list">
          <span>服务商：{{titleName}}</span>
          <span>订单类型：退票订单</span>
          <span>首次游览日期：{{tourValueDate}}</span>
          <span >金额：￥{{listMont}}</span>
          <span >支付金额：￥{{listTpmont}}</span>
        </div>
            <radioTable
                :loading="isLoading"
                :colname="colnames3"
                :isPage="false"
                :total="total"
                :tableData="tableData3"></radioTable>

	<!-- 游客信息4 -->
        <p slot="title" class="cardTitle">
            <span>游客信息</span>
        </p>

            <radioTable
                :loading="isLoading"
                :colname="colnames4"
                :isPage="false"
                :total="total"
                :tableData="tableData4"></radioTable>
	<!-- 游客信息5 -->
        <p slot="title" class="cardTitle">
            <span>订单跟踪信息</span>
        </p>

            <radioTable
                :loading="isLoading"
                :colname="colnames5"
                :isPage="false"
                :total="total"
                :tableData="tableData5"></radioTable>
    </div>
</template>

<script>
export default {
  name: "test",
  data () {
    return {
      sizeColor: {},
      noteContent: '',
      titleName: '',
      tourValueDate: '',
      scenicIdIndex: '',
      modifyOrder: false,
      modifyTourDate: false,
      modifyRemark: false,
      modifyContact: false,
      oridParams: '',
      usidParams: '',
      flagParams: '',
      yorderFacilitator: '',
      yorderOrderType: '',
      yorderDate: '',
      yorderMoney: '',
      yorderPayment: '',
      supplier: '',
      orderStatusText: '',
      AffiliatedSupplier: '',
      orderAmountText: '',
      listMont: 0,
      listTpmont: 0,
      tpmontUndf: 0,
      total: 0,
      result: 0,
      isShowLoading: false,
      isRadio: true,
      isLoading: false,
      modal10: false,
      animal: "爪哇犀牛",
      formDatas: {
        val1: "",
        val2: "",
        val3: "",
        val4: "",
        val5: "",
        val6: "",
        val7: "",
        val8: "",
        val9: "",
        val10: "",
      },
      formItemList: [
        {
          keyName: "val1",
          type: 1,
          label: "联系人姓名",
        },
        {
          keyName: "val2",
          type: 1,
          label: "身份证",
        },
        {
          keyName: "val3",
          type: 1,
          label: "联系电话",
        },
      ],
      formItemList1: [
        {
          keyName: "val4",
          type: 1,
          label: "修改备注",
        }
      ],
      formItemList2: [
        // {
        //   keyNameStart: "val5",
        //   type: 5,
        //   label: "修改游览日期",
        //   double: false,
        // }
      ],
      formItemList3: [
        {
          keyName: "val6",
          type: 8,
          label: "产品名称",
        },
        {
          keyName: "val7",
          type: 8,
          label: "订单编号"
        },
        {
          keyName: "val8",
          type: 8,
          label: "入园时间"
        },
        {
          keyName: "val9",
          type: 8,
          label: "门票价格"
        },
        {
          keyName: "val10",
          type: 8,
          label: "原支付金额"
        },
      ],
      // key值

      colnames2: [
        {
          title: "产品名",
          key: "sztickettypename",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
              ),
              params.row.productInfo.sztickettypename
            ]);
          }

        },
        {
          title: "游览日期",
          key: "startdata",
          width: 170,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
              ),
              params.row.orderInfo.dtstartdate
            ]);
          }
        },
        {
          title: "入园时段",
          key: "timeFrame",
          width: 220,
          render: (h, params) => {
            if (params.row.productInfo.bespeakStartTime != null && params.row.productInfo.bespeakStartTime != '') {
              return h("div", [
                h(
                  "span",
                  "游览日期："
                ),
                params.row.productInfo.starttime + '-' + params.row.productInfo.bespeakEndTime
              ]);
            } else {
              return h("div", [
                h(
                  "span",
                  "景区营业时间内全天有效"
                ),
              ]);
            }
          }
        },
        {
          title: "产品",
          width: 220,
          key: "product",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
              ),
              params.row.productInfo.sztickettypename + '[' + params.row.productInfo.szcrowdkindname + ']'
            ]);
          }
        },
        {
          title: "单价",
          key: "price",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
              ),
              '￥' + params.row.orderInfo.price
            ]);
          }
        },
        {
          title: "数量",
          key: "numb",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
              ),
              params.row.orderInfo.numb
            ]);
          }
        },
        {
          title: "佣金",
          width: 100,
          key: "commision",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
              ),
              '￥' + params.row.orderInfo.commision
            ]);
          }
        },
        {
          title: "金额",
          key: "amnt",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
              ),
              '￥' + params.row.orderInfo.amnt
            ]);
          }
        }
      ],
      tableData2: [],


      colnames3: [
        {
          title: "产品名",
          // key: "productName",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              params.row.productInfo.sztickettypename + '[' + params.row.productInfo.szcrowdkindname + ']'
            );
          }
        },
        {
          title: "单价",
          width: 100,
          render: (h, params) => {
            return h(
              'span', '￥' +
              params.row.orderInfo.price
            )
          }
        },
        {
          title: "数量",
          width: 100,
          render: (h, params) => {
            return h(
              'span',
              params.row.orderInfo.numb
            )
          }
        },
        {
          title: "佣金",
          width: 100,
          render: (h, params) => {
            return h(
              'span', '￥' +
              params.row.orderInfo.commision
            )
          }
        },
        {
          title: "金额",
          width: 100,
          render: (h, params) => {
            return h(
              'span', '￥' +
              params.row.orderInfo.amnt
            )
          }
        }
      ],
      tableData3: [],

      colnames4: [
        {
          title: "姓名",
          key: "tourName"
        },
        {
          title: "证件号码",
          key: "idNumber"
        },
        {
          title: "电话",
          key: "telNumber"
        }
      ],
      tableData4: [],
      colnames5: [
        {
          title: "处理时间",
          key: "dtDate"
        },
        {
          title: "处理信息",
          key: "processDetail"
        },
        {
          title: "处理人",
          key: "usid"
        }
      ],
      tableData5: [],

      colnames6: [
        {
          // title: "服务商：四川省剑门关发展投资有限公司",
          // key: "list",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {

                },
                "游览日期："
              ),
              h("span", params.row.orderInfo.dtstartdate),

              h(
                "span",
                {
                  style: {
                    marginLeft: "40px"
                  }
                },
                "领票人姓名："
              ),
              h("span", params.row.orderInfo.ornm),

              h(
                "span",
                {
                  style: {
                    marginLeft: "40px"
                  }
                },
                "领票人证件号码："
              ),
              h("span", params.row.orderInfo.orhm),

              h(
                "span",
                {
                  style: {
                    marginLeft: "40px"
                  }
                },
                "领票人手机号码："
              ),
              h("span", params.row.orderInfo.orph)
            ]);
          }
        },

      ],
      tableData6: []
    };
  },
  async created () {
    this.isShowLoading = true
    if (this.$route.fullPath.indexOf('?') === -1) {
      this.oridParams = this.$route.query.orid;
      this.usidParams = this.$route.query.usid;
      this.mySalesAxios();
    } else {
      this.oridParams = this.$route.query.orid;
      this.usidParams = this.$route.query.usid;
      setTimeout(() => {
        this.mySalesAxios();
      });
    }
  },
  beforeMounted () {


  },
  methods: {
    mySalesAxios () {
      this.isShowLoading = true
      this.$http.get(this.baseURL + "/ec/distributeOrder/v1/getRefundDistributeOrderDetail", {
        params: {
          access_token: sessionStorage.getItem("name"),
          refundOrid: this.oridParams,
          usid: sessionStorage.getItem("userName"),
          flag: this.$route.query.flag,
        }
      })
        .then(response => {
          if (response.data.code === 200) {
            this.supplier = response.data.data.orderInfo.mOrid;//供应商单号
            this.orderStatusText = response.data.data.orderInfo.strddzt;//订单状态
            this.AffiliatedSupplier = response.data.data.orderInfo.cOrid;//订单状态
            this.orderAmountText = response.data.data.orderInfo.amnt;//订单金额

            if (this.orderStatusText === '已支付' || this.orderStatusText === '已出票' || this.orderStatusText === '已付款') {
              this.sizeColor = {
                color: '#57c720'
              }
            } else if (this.orderStatusText === '全退订(退款中)' || this.orderStatusText === '已支付(退款中)' || this.orderStatusText === '已退订(退款中)' || this.orderStatusText === '全退订(退订已退款)' || this.orderStatusText === '全退订') {
              this.sizeColor = {
                color: "#e84d45"
              }
            } else if (this.orderStatusText === '垃圾（作废）订单') {
              this.sizeColor = {
                color: "#999"
              }
            } else if (this.orderStatusText === '未付款') {
              this.sizeColor = {
                color: "#fd9141"
              }
            } else {
              this.sizeColor = {
                color: "#999"
              }
            }
            let orderDetailsList3 = Array(response.data.data);//订单处理详情列表
            let orderDetailsList4 = response.data.data.tourist;//游客信息
            let orderDetailsList5 = response.data.data.orderFlow;//订单跟踪信息
            let orderDetailsList6 = response.data.data;//订单明细
            let orderDetailsList2 = response.data.data;//订单明细
            this.tableData3 = orderDetailsList3
            this.tableData4 = orderDetailsList4
            this.tableData5 = orderDetailsList5
            this.tableData6 = Array(orderDetailsList6)
            this.tableData2 = Array(orderDetailsList2)
            // listMont listTpmont
            this.listMont = response.data.data.orderInfo.amnt

            this.formDatas.val1 = orderDetailsList6.orderInfo.ornm//联系人姓名
            this.formDatas.val2 = orderDetailsList6.orderInfo.orhm//身份证
            this.formDatas.val3 = orderDetailsList6.orderInfo.orph;//联系电话
            this.tourValueDate = orderDetailsList6.productInfo.startdata//游览日期
            this.titleName = orderDetailsList6.productInfo.szscenicname//服务商
          } else if (response.data.code === 400) {
            this.$Modal.error({
              title: "温馨提示",
              content: response.data.msg
            });
          } else if (response.data.code === 500) {
            this.$Modal.error({
              title: "温馨提示",
              content: response.data.msg
            });
          } else if (response.data.code === 404) {
            this.$Modal.error({
              title: "温馨提示",
              content: response.data.msg
            });
          }
          this.isShowLoading = false;
          return;
        })
        .catch(error => {
          this.isShowLoading = false;
          return;
        });
    },


    handleQuery () { },
    handleChangePage () { }
  }
};
</script>


<style scoped>
.myARefunDate2 {
  margin-top: 20px;
}
.btnModifyTourDate {
  margin-right: 10px;
}
.Order-processing-detail-list {
  margin-bottom: 10px;
  font-size: 14px;
}
.locationWrong {
  margin: -40px 20px 20px;
  text-align: center;
  position: relative;
  /* z-index: 9999; */
}
.myARefunDate2-table {
  border: 1px solid #ccc;
  text-align: right;
  padding: 10px 25px;
  border-top: 0;
  font-size: 14px;
  position: relative;
  margin-top: 0px;
}
.cardTitle {
  font-size: 16px;
  color: #4e81f0;
  margin: 46px 0 5px;
  font-weight: 600;
}
.amend-cardTitle {
  margin-bottom: 15px;
}
.ivu-btn-primary {
  background: none;
  color: #2d8cf0;
}
.ivu-breadcrumb > span:last-child {
  color: #4e81f0;
}

#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-top: 20px;
}

#customers td,
#customers th {
  font-size: 1em;
  border: 1px solid #e8eaec;
  padding: 3px 7px 2px 7px;
  text-align: left;
  padding:10px;
}

#customers th {
  text-align: left;
  padding-top: 5px;
  padding-bottom: 4px;
  background-color: #f8f8f9;
  color: #515a6e;
  padding:10px;
}
#customers tr.alt td {
  color: #000000;
  background-color: #eaf2d3;
}
.title-name {
  width: 100%;
  border: 1px solid #ccc;
  border-bottom: 0;
  text-align: center;
  padding: 8px 0;
  background-color: #f8f8f9;
  font-size: 14px;
}
.Order-processing-detail-list span {
    margin-right: 25px;
}
.money-right {
  margin-right: 20px;
}
.money-r {
  margin-right: 0;
}
</style>
