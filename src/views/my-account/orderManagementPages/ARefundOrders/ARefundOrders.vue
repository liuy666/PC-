<template>
    <div class="purchaseOrder">
        <template v-if="isShowLoading">
            <loading></loading>
    </template>


                <Breadcrumb separator=">" :style="{margin: '24px 0'}">
                    <BreadcrumbItem>我的账户</BreadcrumbItem>
                    <BreadcrumbItem>采购管理</BreadcrumbItem>
                    <BreadcrumbItem>采购退款订单</BreadcrumbItem>
                </Breadcrumb>

    <!--  -->
        <detail-form 
            :isListPage="true"
            :formDatas="formDatas"
            btnName="查询"
            :formItemList="formItemList"
            :btnWidth="1"
            @getFormData="handleQuery"
            @setDay="setDay"
            @setWeek="setWeek"
            @setMonth="setMonth"
            @setTriduum="setTriduum"
            @setHebdomad="setHebdomad"></detail-form>

        <div slot="title" class="cardTitle2">
            <p>采购退款订单列表</p>
        </div>
            <radioTable 
                :loading="isLoading"
                :colname="colnames"
                :total="total" 
                :tableData="tableData"
                :pageCode="currentPage"
                @on-change="changePage"
                @changePage="handleChangePage"
                @on-page-size-change="changePageSize"></radioTable>
    </div>
</template>

<script>
import radiocom from "../../../../components/tables/radio-com";
export default {
  component: {
    radiocom
  },
  data() {
    return {
      
      valueDateOne: new Date,
      valueDateTwo: new Date,
      unsubscribe: false,
      first: false,
      value1:'1',
      pageNumSelect: 0,
      isLoading: false,
      pageSize:0,
      pageNumNew:10,
      start: 0,
      end: 0,
      totalCount:0,
      currentProviderId:0,
      currentPage: 1,
      watchTotal: 0,
      isQuery: false,
      isShowLoading: false,
      isRadio: true,
      modal10: false,
      visible:false,
      formDatas: {
        val1: "99",
        val2: "",
        val3: "",
        val4: "",
        // val5: "",
        val6: new Date(),
        val7: new Date(),
        val8: 0,
      },
      formItemList: [
        {
          keyName: "val1",
          type: 4,
          label: "订单状态",
          class:'width',
          labelWidth:82,
          optionList: [
              {
                value:'30',
                label:'已退订（退款中）'
              },
              {
                value:'33',
                label:'退款失败'
              },
              {
                value:'27',
                label:'全退订'
              },
              {
                value:'99',
                label:'全部'
              },
            ]
        },
        {
          keyName: "val2",
          type: 1,
          labelWidth:126,
          class:'width',
          label: "指定订单号"
        },
        // {
        //     keyName: "val5",
        //     type: 1,
        //     labelWidth:83,
        //     class:'width',
        //     label: "指定卖家",
        // },
        {
          label: "",
          type: 2,
          keyName: "val8",
          class:'width',
          labelWidth:30,
          optionList: [
            {
              value: 0,
              label: "按首日游览日期查询"
            },
            {
              value: 1,
              label: "按退订日期查询"
            },
          ]
        },
        {
          keyNameStart: "val6",
          keyNameEnd: "val7",
          labelWidth:32,
          class:'width',
          type: 5,
          label: "从",
          double: true,
          isShowOptions:true
        },
      ],
      colnames: [
        {
          title: "供应商退款订单号",
          // key: "refundOrderId",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                        let oridName = params.row.refundOrderId;
                        let usidName = sessionStorage.getItem("userName");
                        let flagName = 0;
                        let saleName = 2;
                        this.$router.push({
                          query:{orid:oridName, usid:usidName, flag:flagName},
                          name:'MyARefundOrders',
                          params:{sale: saleName},
                        })

                    }
                  },
                },
                  params.row.refundOrderId
              ),
            ]);
          }
        },
        // {
        //   title: "关联供应商订单号",
        //   key: "mainOrId",
        //   width: 170
        // },
        {
          title: "产品信息",
          key: "iticketTypeName",
          width: 150
        },
        {
          title: "卖家",
          key: "corpname",
          width: 150
        },
        {
          title: "领票人(联系人)",
          key: "ornm",
          width: 150
        },
        {
          title: "退订日期",
          key: "refundDate",
          width: 200
        },
        {
          title: "退订金额",
          width: 100,
          render: (h, params) => {
            return h(
              'span', '￥' + params.row.refundAmont
            )
          }
        },
        {
          title: "手续费",
          key: "",
          width: 100,
          // render:(h, params) => {
          //   return h(
          //     'span', '￥' + params.row.
          //   )
          // }
        },
        {
          title: "实退金额",
          key: "",
          width: 120
        },
        {
          title: "修改方式",
          key: "updateWay",
          width: 120
        },
        {
          title: "退订类型",
          key: "refundType",
          width: 90
        },
        {
          title: "退订状态",
          key: "refundStatusValue",
          width: 180,
          
          render: (h, params) => {
            if(params.row.refundStatusValue === '退款成功'){
                return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "#57c720"
                            },
                        },
                    params.row.refundStatusValue
                    ),
                ]);
            } else if(params.row.refundStatusValue === '已退订(退款中)' || params.row.refundStatusValue === '退款失败'  || params.row.refundStatusValue === '退款中' || params.row.refundStatusValue ===  '全退订(退订已退款)' || params.row.refundStatusValue ===  '全退订'){
                return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "#e84d45"
                            },
                        },
                    params.row.refundStatusValue
                    ),
                ]);
            } else {
                return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "#999"
                            },
                        },
                    params.row.refundStatusValue
                    ),
                ]);
            }
        }
        }
      ],
      total: 0,
      // key值
      tableData: []
    };
  },
  async created() {
    this.aRefundAXios();
  },
  methods: {
    aRefundAXios(){
      this.isShowLoading = true;
      let date = new Date();
      this.formDatas.val6 = date;
      let newDate =  date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
      this.$http.get(this.baseURL + '/ec/distributeOrder/v1/getRefundDistributeOrderList', {
        params: {
          access_token:sessionStorage.getItem("name"),
          startDate:new Date(newDate).format("yyyy-MM-dd"),//开始日期
          endDate:new Date(this.formDatas.val7).format("yyyy-MM-dd"),// 结束日期
          flag:this.formDatas.val8,
          sale: '0',
          orderStatus: this.formDatas.val1,
          page: this.currentPage,
          pageSize: '10',
        }
      }).then(response => {
        let formDataList =  response.data.data.items;//渲染表格数据
        let pageSize = response.data.data.pageSize;//一页展示多少条
        let tablePageSize = response.data.data.totalCount;//表格数据条数
        let formPage = response.data.data.startIndex;//page分页
        let itemOptionList = response.data.data.tdlblist;//订单状态
        this.total = tablePageSize;
        this.pageSize = pageSize;
        this.tableData = formDataList;

        
          if(response.data.code === 400){
            this.$Modal.error({
                title: '温馨提示',
                content: response.data.msg
            });
          } else if(response.data.code === 500) {
            this.$Modal.error({
                title: '温馨提示',
                content: response.data.msg
            });
          } else if(response.data.code === 404) {
            this.$Modal.error({
                title: '温馨提示',
                content: response.data.msg
            });
          }
        this.isShowLoading = false;
        return;
      }).catch(error => {
        
        this.isShowLoading = false;
        return;
      })
    },

    // 翻页查询 
    handleChangePage(pageNum) {
      let handTotal = this.total
      if(!this.isQuery) {
          this.submitForm({
              pageSize: handTotal,
              page: pageNum
          });
      } else {
          this.submitForm({
              pageSize: handTotal,
              page: pageNum,
              scenics: this.currentProviderId,
          });
      }
    },


    submitForm(name){
      this.isLoading = true;
      let pageSizeName = name.page
      this.$http.get(this.baseURL + '/ec/distributeOrder/v1/getRefundDistributeOrderList', {
        params: {
          access_token:sessionStorage.getItem("name"),
          startDate:new Date(this.formDatas.val6).format("yyyy-MM-dd"),//开始日期
          endDate:new Date(this.formDatas.val7).format("yyyy-MM-dd"),// 结束日期
          flag:this.formDatas.val8,
          sale: '0',
          orderStatus: this.formDatas.val1,
          // corName:this.formDatas.val5,
          page: pageSizeName,
          pageSize: this.pageSize,
        }
      }).then(response => {
          let itemTableList = response.data.data.items;
          let tablePageSize = response.data.data.totalCount;
          let tablePageStartIndex = response.data.data.startIndex;
          this.currentPage = tablePageStartIndex
          this.tableData = itemTableList;
          this.total = tablePageSize;
          if(this.isQuery){
            this.watchTotal = tablePageSize
          }
          this.rowData = null
          
          if(response.data.code === 400){
            this.$Modal.error({
                title: '温馨提示',
                content: response.data.msg
            });
          } else if(response.data.code === 500) {
            this.$Modal.error({
                title: '温馨提示',
                content: response.data.msg
            });
          } else if(response.data.code === 404) {
            this.$Modal.error({
                title: '温馨提示',
                content: response.data.msg
            });
          }
        this.isLoading = false;
        return;
        })
        .catch(error => {
        this.isLoading = false;
        return;
        });
    },


    //选择每页可显示的最大数据条数
    changePageSize(num) {
      this.pageNumNew = num;
      this.setEnd(this.currentPage);
      //父组件接收每页条数
      this.$emit("changePageSize", num);
    },
    //选择页码
    changePage(num) {
      this.currentPage = num;
      this.setEnd(num);
      //父组件接收当前页码
      this.$emit("changePage", num);
    },

    //表格正下方从几到几
    setEnd(current) {
      this.start = (current - 1) * this.pageNumNew + 1;
      this.end = current * this.pageNumNew;
      if (this.total > 0 && this.end > this.total) {
        this.end = this.total;
      }
    },

  // input查询
    handleQuery() {
        this.isShowLoading = true;
      // let pageSize = this.pageSize;
      
      let userStartTime = new Date(this.formDatas.val6).format("yyyy-MM-dd")
      let userEndTime = new Date(this.formDatas.val7).format("yyyy-MM-dd")
      if(userEndTime < userStartTime) {
        this.$Modal.error({
            title: '温馨提示',
            content: '结束日期不能小于当前日期'
        });
        this.isShowLoading = false;
        return;
      }
      let url = window.location.host;
      this.$http.get(this.baseURL + '/ec/distributeOrder/v1/getRefundDistributeOrderList', {
        params: {
          orid: this.formDatas.val2,
          access_token:sessionStorage.getItem("name"),
          startDate:new Date(this.formDatas.val6).format("yyyy-MM-dd"),//开始日期
          endDate:new Date(this.formDatas.val7).format("yyyy-MM-dd"),// 结束日期
          flag:this.formDatas.val8,
          sale: '0',
          // corName:this.formDatas.val5,
          orderStatus: this.formDatas.val1,
          page: 1,
          pageSize: '10',
        }
      }).then(response => {
        let listItems = response.data.data.items;
        this.tableData = listItems;
        this.total = response.data.data.totalCount
        this.currentPage = 1
        
          if(response.data.code === 400){
            this.$Modal.error({
                title: '温馨提示',
                content: response.data.msg
            });
          } else if(response.data.code === 500) {
            this.$Modal.error({
                title: '温馨提示',
                content: response.data.msg
            });
          } else if(response.data.code === 404) {
            this.$Modal.error({
                title: '温馨提示',
                content: response.data.msg
            });
          }
        this.isShowLoading = false;
        return;
      }).catch(error => {
        this.isShowLoading = false;
        return;
      })
    },

  // 设置近三天
    setDay(e) {
      // return this.valueDateTwo = new Date();
      // this.$emit('setDay');
      const date = new Date();
      this.formDatas.val6 = date;
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 3);
      this.formDatas.val7 = new Date();
      return date;
      this.$emit("setDay");
    },
    // 设置近一周
    setWeek(e) {
      const date = new Date();
      this.formDatas.val6 = date;
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      this.formDatas.val7 = new Date();
      return date;
      this.$emit("setWeek");
    },
    // 设置近一月
    setMonth(e) {
      const date = new Date();
      this.formDatas.val6 = date;
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
      this.formDatas.val7 = new Date();
      return date;
      // e.preventDefault();
      this.$emit("setMonth");
    },
    // 未来三天
    setTriduum(e) {
      const date = new Date();
      this.formDatas.val7 = date;
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
      this.formDatas.val6 = new Date();
      return date;
      // e.preventDefault();
      this.$emit("setTriduum");
    },
    // 未来一周
    setHebdomad(e) {
      const date = new Date();
      this.formDatas.val7 = date;
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
      this.formDatas.val6 = new Date();
      return date;
      // e.preventDefault();
      this.$emit("setHebdomad");
    },

    handleClose () {
      this.visible = false;
    },
    handleOpen () {
      this.visible = true;
    },
  }
};
</script>

<style>
.cardTitle1 {
  font-size: 17px;
  font-weight: 600;
  color: #4e81f0;
}
.width {
  float: left;
}
.ivu-menu-horizontal.ivu-menu-light:after {
  height: 0;
}
.ivu-select-dropdown {
  z-index: 999
}
.ivu-menu-horizontal{
  margin-bottom: 20px;
}
.ivu-breadcrumb a {
  color: #2d8cf0;
}
.ivu-breadcrumb>span:last-child {
    color: #4E81F0
}
.ivu-dropdown {
    position: absolute;
    right: 22px;
}
</style>
