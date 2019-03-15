<template>
    <div class="purchaseOrder">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <Breadcrumb separator=">" :style="{margin: '24px 0'}">
            <BreadcrumbItem>我的账户</BreadcrumbItem>
            <BreadcrumbItem>销售管理</BreadcrumbItem>
            <BreadcrumbItem>销售订单</BreadcrumbItem>
        </Breadcrumb>
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
            <p>销售订单列表</p>
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
    
          // options:'startOptions',
          // options:'endOptions',
    return {
      tabView: "select1",
      iscur: 0,
      vertical: "",
      pageNumSelect: 0,
      pageSize: 10,
      total: 0,
      start: 0,
      watchTotal: 0,
      end: 0,
      totalCount: 0,
      currentProviderId: 0,
      currentPage: 1,
      pageNumNew: 10,
      rowData: null,
      isQuery: false,
      itemTableList: "",
      value1: "1",
      isLoading: false,
      isShowLoading: false,
      isRadio: true,
      modal10: false,
      animal: "",
      visible: false,
    isrealnam:false,
      formDatas: {
        val1: "99",
        val2: "",
        val3: "",
        val4: "",
        val5: 0,
        val6: new Date(),
        val7: new Date(),
      },
      formItemList: [
        {
          keyName: "val1",
          type: 4,
          class:'width',
          labelWidth:85,
          label: "订单状态",
          optionList: [
            {
              value:'00',
              label:'未付款'
            },
            {
              value:'02',
              label:'已支付'
            },
            {
              value:'11',
              label:'已出票'
            },
            {
              value:'30',
              label:'已退订（退款中）'
            },
            {
              value:'33',
              label:'退款失败'
            },
            {
              value:'99',
              label:'包含列表中所有订单状态'
            },
          ]
        },
        {
          keyName: "val2",
          type: 1,
          labelWidth:110,
          class:'width',
          label: "指定订单号"
        },
        {
          keyName: "val4",
          type: 1,
          labelWidth:110,
          class:'width',
          label: "领票(联系人)"
        },
        {
          keyName: "val3",
          type: 1,
          class:'width',
          labelWidth:85,
          label: "指定买家"
        },
        {
          label: "",
          type: 2,
          labelWidth:15,
          keyName: "val5",
          class:'width',
          optionList: [
            {
              value: 0,
              label: "按首日游览日期查询"
            },
            // {
            //   value: 1,
            //   label: "按退订日期查询"
            // },
            {
              value: 1,
              label: "按支付日期查询"
            }
          ]
        },
        {
          keyNameStart: "val6",
          keyNameEnd: "val7",
          type: 5,
          labelWidth:115,
          class:'width',
          label: "最新更新时间",
          double: true,
          isShowOptions:true
        },
        
      ],
      colnames: [
        {
          title: "供应商订单号",
          width: 170,
          render: (h, params) => {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      display: "inline-block",
                    },
                    on: {
                      click: () => {
                        let oridName = params.row.supplierOrId;
                        let usidName = sessionStorage.getItem("userName");
                        let sos = 2;
                        this.$router.push({
                          query:{orid:oridName, usid:usidName},
                          name:'MySalesOrder',
                          params:{sale:sos}
                        })
                      }
                    }
                  },
                  params.row.supplierOrId
                ),
              ])
          }
        },
        // {
        //   title: "关联订单号",
        //   key: "distributorOrId",
        //   width: 160
        // },
        {
          title: "服务商",
          key: "szscenicname",
          width: 140
        },
        {
          title: "产品信息",
          width: 170,
          render: (h,params) => {
            return h('div', [
              h(
                'span', params.row.sztickettypename + '[' + params.row.szcrowdkindname + ']'
              )
            ])
          }
        },
        {
          title: "买家",
          key: "corpname",
          width: 120
        },
        {
          title: "浏览日期",
          key: "stdt",
          width: 100
        },
        {
          title: "订单金额",
          width: 100,
          render: (h, params) => {
            return h(
              "span",'￥' + params.row.amnt
            );
          }
        },
        {
          title: "订单状态",
          key: "strddzt",
          width: 150,
          render: (h, params) => {
            if(params.row.strddzt === '已支付' || params.row.strddzt === '已出票' || params.row.strddzt === '已付款'){
                return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "#57c720"
                            },
                        },
                    params.row.strddzt
                    ),
                ]);
            } else if(params.row.strddzt === '全退订(退款中)' || params.row.strddzt === '已支付(退款中)' || params.row.strddzt === '已退订(退款中)' || params.row.strddzt ===  '全退订(退订已退款)' || params.row.strddzt === '全退订'){
                return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "#e84d45"
                            },
                        },
                    params.row.strddzt
                    ),
                ]);
            } else if(params.row.strddzt === '垃圾（作废）订单'){
                return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "#999"
                            },
                        },
                    params.row.strddzt
                    ),
                ]);
            } else if(params.row.strddzt === '未付款' ){
                return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "#fd9141"
                            },
                        },
                    params.row.strddzt
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
                    params.row.strddzt
                    ),
                ]);
            }
        }
        },
        {
          title: "领票人(联系人)",
          key: "ornm",
          width: 120
        },
        {
          title: "佣金",
          width: 90,
          render: (h, params) => {
            return h(
              "span",'￥' + params.row.commision
            );
          }
        },
        {
          title: "操作",
          width: 140,
          render: (h, params) => {
          if(params.row.isrealnam == true) {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      display: "inline-block",
                    },
                    on: {
                      
                      click: () => {
                        let oridName = params.row.supplierOrId;
                        let usidName = sessionStorage.getItem("userName");
                        let sos = 2;
                        this.$router.push({
                          query:{orid:oridName, usid:usidName},
                          name:'MySalesOrder',
                          params:{sale:sos}
                        })
                      }
                    }
                  },
                  "查看详情"
                ),
                h(
                  "a",
                  {
                    style: {
                      display: "inline-block"
                    },
                    on: {
                      click: () => {
                        let oridName = params.row.supplierOrId;
                        let usidName = sessionStorage.getItem("userName");
                        let sos = 2;
                        this.$router.push({
                          query:{orid:oridName, usid:usidName},
                          name:'MySalesOrder',
                          params:{sale:sos}
                        })
                      }
                    }
                  },
                  "团队成员"
                )
              ]);
            } else {
              return h("div", [
                  h(
                  "a",
                  {
                    style: {
                      display: "inline-block",
                    },
                    on: {
                      click: () => {
                        let oridName = params.row.supplierOrId;
                        let sos = 2;
                        let usidName = sessionStorage.getItem("userName");
                        this.$router.push({
                          query:{orid:oridName, usid:usidName},
                          name:'MySalesOrder',
                          params:{sale:sos}
                        })
                      }
                    }
                  },
                  "查看详情"
                ),
              ]);
            }
          }
        }
      ],
      // key值
      tableData: []
    };
  },
  async created() {
    this.purchaseAxios();
    this.pageNumNew = this.pageNum;
  },
  mounted() {},
  beforeMount() {},
  methods: {
    purchaseAxios() {
			this.isShowLoading = true;
      let token = sessionStorage.getItem("name");
      let page = this.currentPage;
      let pageSize = this.pageSize;
      let url = window.location.host;
      let date = new Date();
      this.formDatas.val6 = date;
      let newDate =  date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
      this.$http.post(
        this.baseURL + "/ec/distributeOrder/v1/getPurchaseAndSaleDistributeOrderList?access_token=" +  token + "&page=" + page + "&pageSize=" + pageSize + '&url=' + url ,
        {
            startDate: new Date(newDate).format("yyyy-MM-dd"), //开始日期
            endDate: new Date(this.formDatas.val7).format("yyyy-MM-dd"), // 结束日期
            flag: this.formDatas.val5,//识别checkbox
            orid: this.formDatas.val2,//订单号
            // orderStatus: this.formDatas.val1,//订单状态
            orderStatus:'99',
            sale:1,//0位采购单查询
        })
        .then(response => {
          let itemTableList = response.data.data.items; //渲染表格数据
          let tablePageSize = response.data.data.totalCount; //表格数据条数
          let pageSize = response.data.data.pageSize; //一页展示多少条
          let formPage = response.data.data.startIndex; //page分页
          let itemOptionList = response.data.data.ddztlist; //订单状态
          this.total = tablePageSize;
          this.pageSize = pageSize;
          this.tableData = itemTableList;
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
        })
        .catch(error => {
          this.isShowLoading = false;
          return;
          
        });
    },

    // 翻页查询
    handleChangePage(pageNum) {
      let handTotal = this.total;
      if (!this.isQuery) {
        this.submitForm({
          pageSize: handTotal,
          page: pageNum
        });
      } else {
        this.submitForm({
          pageSize: handTotal,
          page: pageNum,
          scenics: this.currentProviderId
        });
      }
    },

    submitForm(name) {
			this.isLoading = true;
      let token = sessionStorage.getItem("name");
      let page = name.page;
      let pageSize = this.pageSize;
      let url = window.location.host
      
      this.$http.post(
        this.baseURL + "/ec/distributeOrder/v1/getPurchaseAndSaleDistributeOrderList?access_token=" +  token + "&page=" + page + "&pageSize=" + pageSize + '&url=' + url,
        {
            startDate: new Date(this.formDatas.val6).format("yyyy-MM-dd"), //开始日期
            endDate: new Date(this.formDatas.val7).format("yyyy-MM-dd"), // 结束日期
            flag: this.formDatas.val5,//识别checkbox
            orid: this.formDatas.val2,//订单号
            lpr:this.formDatas.val4,
            corpName:this.formDatas.val3,
            orderStatus: this.formDatas.val1,//订单状态
            sale:1,//0位采购单查询
        })
        .then(response => {
          
          // startIndex
          let itemTableList = response.data.data.items;
          let tablePageSize = response.data.data.totalCount;
          this.currentPage = response.data.data.startIndex;
          // let tablePageStartIndex = response.data.data.pageIndexCount;
          let pageSize = response.data.data.pageSize; //一页展示多少条
          // this.currentPage = tablePageStartIndex;
          this.pageSize = pageSize;
          this.tableData = itemTableList;
          this.total = tablePageSize;

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
          if (this.isQuery) {
            this.watchTotal = tablePageSize;
          }
          this.rowData = null;
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
    handleQuery(pageName) {
			this.isShowLoading = true;
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
      let token = sessionStorage.getItem("name");
      let page = 1;
      let pageSize = '10';
      let url = window.location.host
      this.$http.post(
          this.baseURL + "/ec/distributeOrder/v1/getPurchaseAndSaleDistributeOrderList?access_token=" +  token + "&page=" + page + "&pageSize=" + pageSize + '&url=' + url ,
          {
            startDate: new Date(this.formDatas.val6).format("yyyy-MM-dd"), //开始日期
            endDate: new Date(this.formDatas.val7).format("yyyy-MM-dd"), // 结束日期
            flag: this.formDatas.val5,//识别checkbox
            orid: this.formDatas.val2,//订单号
            lpr:this.formDatas.val4,
            corpName:this.formDatas.val3,
            orderStatus: this.formDatas.val1,//订单状态
            sale:1,//0位采购单查询
          }
        )
        .then(response => {
          
          this.tableData = response.data.data.items;
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
        })
        .catch(error => {
          
        this.isShowLoading = false;
        return;
        });
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

    handleTabRemove(name) {
      this["tab" + name] = false;
    },
    handleClose() {
      this.visible = false;
    },
    handleOpen() {
      this.visible = true;
    }
  }
}
</script>

<style>
.radio-group {
  font-size: 0;
  height: 26px;
  line-height: 26px;
}
.radio-group > span {
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  text-align: center;
  width: 100px;
}
.cur {
  color: #fff;
  background-color: #20a0ff;
}

.ivu-select-dropdown {
  z-index: 999;
}
.ivu-menu-horizontal {
  margin-bottom: 20px;
}
.ivu-breadcrumb a {
  color: #2d8cf0;
}
.ivu-breadcrumb > span:last-child {
  color: #4e81f0;
}
.ivu-dropdown {
  position: absolute;
  right: 22px;
}
.width {
  float: left;
}
/*.cardTitle {*/
    /*margin: 20px 0;*/
    /*height: 34px;*/
    /*line-height: 34px;*/
    /*font-size: 16px;*/
    /*font-weight: 600*/
/*}*/
</style>
