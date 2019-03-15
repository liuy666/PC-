<template>
    <div class="orderAmount">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <Breadcrumb separator=">" :style="{margin: '24px 0'}">
            <BreadcrumbItem>我的账户</BreadcrumbItem>
            <BreadcrumbItem>统计分析</BreadcrumbItem>
            <BreadcrumbItem>订单变更明细</BreadcrumbItem>
        </Breadcrumb>

        <detail-form 
            :isListPage="true"
            :formDatas="formDatas"
            btnName="查询"
            :btnWidth="1"
            :formItemList="formItemList"
            @getFormData="handleQuery"
            @setDay="setDay"
            @setWeek="setWeek"
            @setMonth="setMonth"
            @setTriduum="setTriduum"
            @setHebdomad="setHebdomad"></detail-form>
        <div slot="title" class="cardTitle2">
            <p>订单变更明细</p>
        </div>
        <!--  -->
        <radioTable 
            :colname="colnames"
            :total='total'
            :tableData="tableData"
            :loading="isLoading"
            :pageCode="currentPage"
            @on-change="changePage"
            @changePage="handleChangePage"
            @on-page-size-change="changePageSize"></radioTable>
    </div>
</template>

<script>
export default {
  data() {
    return {
      valueDateOne:new Date,
      valueDateTwo:new Date,
      pageNumSelect: 0,
      pageSize: 10,
      total: 1,
      start: 0,
      watchTotal: 0,
      end: 0,
      totalCount: 0,
      currentProviderId: 0,
      currentPage: 1,
      pageNumNew: 10,
      isQuery: false,
      isLoading: false,
      isShowLoading: false,
      animal: "",
      formDatas: {
        val1:'',
        val2:'99',
        val3:1,
        val4:new Date(),
        val5:new Date(),
        val6:2,

      },
      formItemList: [
        {
          keyName: "val1",
          type: 1,
          label: "指定订单号查询",
          class:'width',
          labelWidth:128,
        },
        {
          keyName: "val2",
          type: 4,
          class:'width',
          labelWidth:200,
          label: "订单状态",
          optionList:[
            // {
            //   value:'00',
            //   label:'未付款'
            // },
            // {
            //   value:'02',
            //   label:'已支付'
            // },
            // {
            //   value:'11',
            //   label:'已出票'
            // },
            // {
            //   value:'99',
            //   label:'包含列表中所有订单状态'
            // },
            ]
        },
        {
          label: "",
          type: 2,
          keyName: "val3",
          labelWidth:7,
          class:'width',
          optionList: [
            {
              value: 1,
              label: "按照游览日期查询"
            },
            {
              value: 2,
              label: "按照支付日期查询"
            },
          ]
        },
        {
          label: "",
          type: 2,
          keyName: "val6",
          labelWidth:157,
          class:'width',
          optionList: [
            {
              value: 2,
              label: "所有子用户"
            },
            {
              value: 3,
              label: "指定子用户："
            },
          ]
        },
        {
          keyName: "val7",
          type: 4,
          class:'width',
          labelWidth:1,
          label: "",
          optionList:[]
        },
        {
          keyNameStart: "val4",
          keyNameEnd: "val5",
          type: 5,
          labelWidth:45,
          class:'width',
          label: "从",
          double: true,
          isShowOptions:true
        },
      ],
      colnames: [
        {
          title: "订单号",
          key: "orid"
        },
        {
          title: "期初金额",
          render: (h, params) => {
            return h (
              'span', '￥' + params.row.zfmont
            )
          }
        },
        {
          title: "变更金额",
          render: (h, params) => {
            return h (
              'span', '￥' + params.row.changedAmont
            )
          }
        },
        {
          title: "最终金额",
          render: (h, params) => {
            return h (
              'span', '￥' + params.row.changeMont
            )
          }
        },
        {
          title: "订单状态",
          key: "ddztStr",
          render: (h, params) => {
            if(params.row.ddztStr === '已出票'){
                return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "#57c720"
                            },
                        },
                    params.row.ddztStr
                    ),
                ]);
            } else if(params.row.ddztStr === '已退订(退款中)' || params.row.ddztStr === '全退订'){
                return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "#e84d45"
                            },
                        },
                    params.row.ddztStr
                    ),
                ]);
            } else if(params.row.ddztStr === '未付款'){
                return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "#fd9141"
                            },
                        },
                    params.row.ddztStr
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
                    params.row.ddztStr
                    ),
                ]);
            }
        }
        },
        {
          title: "下单用户",
          key: "cUsid",
        }
      ],
      tableData: []
    };
  },
  created() {
    this.configurationAxios();
  },
  methods: {
    configurationAxios() {
        this.isShowLoading = true;
      let token = sessionStorage.getItem("name");
      let usid = sessionStorage.getItem("userName");
      let page = this.currentPage;
      let pageSize = "10";
      let url = window.location.host;
      
      let date = new Date();
      this.formDatas.val4 = date;
      let newDate =  date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
      this.$http.post(this.baseURL + "/ec/distributeOrder/v1/OrderChangedAmontStatic?access_token=" + token + "&page=" + page + "&pageSize=" + pageSize + "&usid=" + usid,
          {
            // radiobutton2: this.formDatas.val3,
            // radiobutton1: 2,
            // startDate: new Date(newDate).format("yyyy-MM-dd"), //开始日期
            // endDate: new Date(this.formDatas.val5).format("yyyy-MM-dd"), // 结束日期
            // ddzt: this.formDatas.val2,
            // childCustom: 'distribute001',
            // orid:this.formDatas.val1
            
            radiobutton2: this.formDatas.val3,
            radiobutton1: this.formDatas.val6,
            startDate: new Date(newDate).format("yyyy-MM-dd"), //开始日期
            endDate: new Date(this.formDatas.val5).format("yyyy-MM-dd"), // 结束日期
            ddzt: this.formDatas.val2,
            childCustom: this.formDatas.val7,
            orid:this.formDatas.val1
          }
        )
        .then(response => {
          
          let formListItems = response.data.data.ps.items;
          let formListTotal = response.data.data.ps.totalCount;
          this.total = formListTotal
          this.tableData = formListItems;
          
          let itemOptionList = response.data.data.childCustom;//指定子用户
          this.formItemList[4].optionList = itemOptionList.map(item => {
            return {
              value: item.usid,
              label: item.lname
            };
          });

          let ddztlistList = response.data.data.ddztlist;//订单状态
          this.formItemList[1].optionList = ddztlistList.map(item => {
            return {
              value: item.pmcd,
              label: item.pmva
            };
          });
          

        this.isShowLoading = false;
        return;
        })
        .catch(error => {
        this.isShowLoading = false;
        return;
          
        });
    },

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
      let usid = sessionStorage.getItem("userName");
      let page = name.page;
      let pageSize = "10";
      let url = window.location.host;
      
      let date = new Date();
      this.formDatas.val4 = date;
      let newDate =  date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
      this.$http.post( this.baseURL + "/ec/distributeOrder/v1/OrderChangedAmontStatic?access_token=" + token + "&page=" + page + "&pageSize=" + pageSize + "&usid=" + usid,
          {
            radiobutton2: this.formDatas.val3,
            radiobutton1: this.formDatas.val6,
            startDate: new Date(newDate).format("yyyy-MM-dd"), //开始日期
            endDate: new Date(this.formDatas.val5).format("yyyy-MM-dd"), // 结束日期
            ddzt: this.formDatas.val2,
            childCustom: this.formDatas.val7,
            orid:this.formDatas.val1
          }
        )
        .then(response => {
          
          // startIndex
          let formTableList = response.data.data.ps.items;
          let formTablepageSize = response.data.data.ps.pageSize;
          let formTableTotal = response.data.data.ps.totalCount;
          let formTableStartIndex = response.data.data.ps.startIndex;
          this.tableData = formTableList
          this.currentPage = formTableStartIndex
          this.pageSize = formTablepageSize
          this.total = formTableTotal
          if(this.isQuery){
            this.watchTotal = tablePageSize
          }
          
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
        let currentSelectionDate = new Date(this.formDatas.val4).format("yyyy-MM-dd");
        let currentEndDate = new Date(this.formDatas.val5).format("yyyy-MM-dd");
          if(currentEndDate < currentSelectionDate) {
            this.$Modal.error({
                title: '温馨提示',
                content: '结束日期不能小于当前日期'
            });
            
        this.isShowLoading = false;
        return;
          }
        this.isShowLoading = true;
      let token = sessionStorage.getItem("name");
      let usid = sessionStorage.getItem("userName");
      let page = this.currentPage;
      let pageSize = "10";
      let url = window.location.host;
      this.$http.post(this.baseURL + "/ec/distributeOrder/v1/OrderChangedAmontStatic?access_token=" + token + "&page=" + page + "&pageSize=" + pageSize + "&usid=" + usid,
          {
            radiobutton2: this.formDatas.val3,
            radiobutton1: this.formDatas.val6,
            startDate: new Date(this.formDatas.val4).format("yyyy-MM-dd"), //开始日期
            endDate: new Date(this.formDatas.val5).format("yyyy-MM-dd"), // 结束日期
            ddzt: this.formDatas.val2,
            childCustom: this.formDatas.val7,
            orid:this.formDatas.val1
          }
        )
        .then((response) => {
        
        let listItems = response.data.data.ps.items;
        this.tableData = listItems;
        this.total = response.data.data.ps.totalCount
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
      }).catch((error) => {
        this.isShowLoading = false;
        return;
        
      })
    },
    // 设置近三天
    setDay(e) {
      // return this.valueDateTwo = new Date();
      // this.$emit('setDay');
      const date = new Date();
      this.formDatas.val4 = date;
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 3);
      this.formDatas.val5 = new Date();
      return date;
      this.$emit("setDay");
    },
    // 设置近一周
    setWeek(e) {
      const date = new Date();
      this.formDatas.val4 = date;
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      this.formDatas.val5 = new Date();
      return date;
      this.$emit("setWeek");
    },
    // 设置近一月
    setMonth(e) {
      const date = new Date();
      this.formDatas.val4 = date;
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
      this.formDatas.val5 = new Date();
      return date;
      // e.preventDefault();
      this.$emit("setMonth");
    },
    // 未来三天
    setTriduum(e) {
      const date = new Date();
      this.formDatas.val5 = date;
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
      this.formDatas.val4 = new Date();
      return date;
      // e.preventDefault();
      this.$emit("setTriduum");
    },
    // 未来一周
    setHebdomad(e) {
      const date = new Date();
      this.formDatas.val5 = date;
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
      this.formDatas.val4 = new Date();
      return date;
      // e.preventDefault();
      this.$emit("setHebdomad");
    },

  }
};
</script>

<style>
/*.cardTitle {*/
  /*margin-top: 20px;*/
  /*font-size: 17px;*/
  /*font-weight: 600;*/
  /*color:#4e81f0*/
/*}*/
.search-condition {
  padding-right: 10px;
}
.width {
  float: left;
}
</style>
