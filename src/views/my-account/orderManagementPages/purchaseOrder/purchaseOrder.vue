<template>
    <div class="purchaseOrder">
        <template v-if="isShowLoading">
            <loading></loading>
    </template>

                <Breadcrumb separator=">" :style="{margin: '24px 0'}">
                    <BreadcrumbItem>我的账户</BreadcrumbItem>
                    <BreadcrumbItem>采购管理</BreadcrumbItem>
                    <BreadcrumbItem>采购订单</BreadcrumbItem>
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
            <p>采购订单列表</p>
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
      oridName:'',
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
        // val8: "",
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
              value:'27',
              label:'全退订'
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
          label: "供应商订单号",
          labelWidth:160,
          class:'width',
        },
        {
          keyName: "val4",
          type: 1,
          labelWidth:107,
          class:'width',
          label: "领票(联系人)"
        },
        // {
        //   keyName: "val8",
        //   type: 1,
        //   labelWidth:83,
        //   class:'width',
        //   label: "指定卖家"
        // },
        {
          label: "",
          type: 2,
          keyName: "val5",
          class:'width',
          labelWidth:25,
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
          labelWidth:111,
          class:'width',
          label: "最新更新时间",
          double: true,
          isShowOptions:true
        },
      ],
      colnames: [
        {
          title: "供应商订单号",
          // key: "supplierOrId",
          width: 190,
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
                        // this.show(params.index);
                        let oridName = params.row.supplierOrId;
                        let usidName = sessionStorage.getItem("userName");
                        let saleName = 1;
                        this.$router.push({
                          query:{orid:oridName, usid:usidName},
                          params:{sale: saleName},
                          name:'MySalesOrder'
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
          key: "",
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
          title: "卖家",
          key: "corpname",
          width: 150
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
          // key: "strddzt",
          width: 140,
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
            } else if(params.row.strddzt === '未付款'){
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
          render: (h, params ) => {
            return h('div', [
              h('span','￥' + params.row.commision)
            ])
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
                        // this.show(params.index);
                        let oridName = params.row.supplierOrId;
                        let usidName = sessionStorage.getItem("userName");
                        let saleName = 1;
                        this.$router.push({
                          query:{orid:oridName, usid:usidName},
                          params:{sale: saleName},
                          name:'MySalesOrder'
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
                        // this.show(params.index);
                        let oridName = params.row.supplierOrId;
                        let usidName = sessionStorage.getItem("userName");
                        let saleName = 1;
                        this.$router.push({
                          query:{orid:oridName, usid:usidName},
                          params:{sale: saleName},
                          name:'MySalesOrder'
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
                        // this.show(params.index);
                        let oridName = params.row.supplierOrId;
                        let usidName = sessionStorage.getItem("userName");
                        let saleName = 1;
                        this.$router.push({
                          query:{orid:oridName, usid:usidName},
                          params:{sale: saleName},
                          name:'MySalesOrder'
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
      let date = new Date();
      this.formDatas.val6 = date;
      let newDate =  date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
      this.$http.post(
          this.baseURL + "/ec/distributeOrder/v1/getPurchaseAndSaleDistributeOrderList?access_token=" +  token + "&page=" + page + "&pageSize=" + pageSize ,
          {
            startDate: new Date(newDate).format("yyyy-MM-dd"), //开始日期
            endDate: new Date(this.formDatas.val7).format("yyyy-MM-dd"), // 结束日期
            flag: this.formDatas.val5,//识别checkbox
            orid: this.formDatas.val2,//订单号
            orderStatus:'99',
            sale:0,//0位采购单查询
          }
        )
        .then(response => {
          
          this.tableData = response.data.data.items; //渲染表格数据
          this.total = response.data.data.totalCount; //表格数据条数
          this.pageSize = response.data.data.pageSize; //一页展示多少条
          // let formPage = response.data.data.startIndex; //page分页
          // let itemOptionList = response.data.data.ddztlist; //订单状态
          
          // this.formItemList[0].optionList = itemOptionList.map(item => {
          //   return {
          //     value: item.pmcd,
          //     label: item.pmva
          //   };
          // });
          
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
      let pageName = name.page
			this.isLoading = true;
      let token = sessionStorage.getItem("name");
      let page = pageName;
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
            // corpName:this.formDatas.val8,
            orderStatus: this.formDatas.val1,//订单状态
            sale:0,//0位采购单查询
          }
        )
        .then(response => {
          
          // startIndex
          this.tableData  = response.data.data.items;
          this.total = response.data.data.totalCount;
          this.currentPage = response.data.data.startIndex;
          this.pageSize = response.data.data.pageSize; //一页展示多少条

          if (this.isQuery) {
            this.watchTotal = tablePageSize;
          }
          this.rowData = null;
          
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
      let pageSize = this.pageSize;
      this.$http.post(
          this.baseURL + "/ec/distributeOrder/v1/getPurchaseAndSaleDistributeOrderList?access_token=" +  token + "&page=" + page + "&pageSize=" + pageSize ,
          {
            startDate: new Date(this.formDatas.val6).format("yyyy-MM-dd"), //开始日期
            endDate: new Date(this.formDatas.val7).format("yyyy-MM-dd"), // 结束日期
            flag: this.formDatas.val5,//识别checkbox
            lpr:this.formDatas.val4,
            // corpName:this.formDatas.val8,
            orid: this.formDatas.val2,//订单号
            orderStatus: this.formDatas.val1,//订单状态
            sale:0,//0位采购单查询
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

.width {
  float: left;
}
/*.cardTitle {*/
    /*margin-bottom: 20px;*/
    /*height: 34px;*/
    /*line-height: 34px;*/
    /*font-weight: 600;*/
    /*font-size: 17px;*/
/*}*/
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
</style>
