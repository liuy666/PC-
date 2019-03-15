<template>
    <div class="orderAmount">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <p slot="title" class="cardTitle">
            <span>订单金额表</span>
        </p>  
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
      pageSize: 0,
      total: 0,
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
        val3:0,
        val4:new Date(),
        val5:new Date(),

      },
      formItemList: [
        {
          keyName: "val1",
          type: 1,
          label: "输入订单号",
          class:'width',
          labelWidth:97,
        },
        {
          label: "查询条件",
          type: 2,
          keyName: "val3",
          labelWidth:102,
          class:'width',
          optionList: [
            {
              value: 0,
              label: "按照游览日期查询"
            },
            {
              value: 1,
              label: "按照支付日期查询"
            },
          ]
        },
        {
          keyNameStart: "val4",
          keyNameEnd: "val5",
          type: 5,
          labelWidth:112,
          class:'width',
          label: "最新更新时间",
          double: true,
          isShowDate:true
        },

        // {
        //   keyName: "val2",
        //   type: 4,
        //   class:'width',
        //   labelWidth:90,
        //   label: "订单状态",
        //   optionList:[]
        // },
      ],
      colnames: [
        {
          title: "订单号",
          key: "orid"
        },
        {
          title: "起初金额",
          render: (h, params) => {
            return h(
              'span', '￥' + params.row.zfmont
            )
          }
        },
        {
          title: "变动金额",
          render: (h, params) => {
            return h(
              'span', '￥' + params.row.tpmont
            )
          }
        },
        {
          title: "最终金额",
          render:(h, params) => {
            return h (
              'span', '￥' + (params.row.zfmont - params.row.tpmont).toFixed(2)
            )
          }
        },
        {
          title: "订单状态",
          // key: "strddzt",
          render: (h, params) => {
            if(params.row.strddzt === '已支付'){
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
            } else if(params.row.strddzt === '全退订' || params.row.strddzt === '已支付(退款中)' || params.row.strddzt ===  '全退订(退订已退款)'){
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
          title: "下单用户",
          render:(h, params) => {
            return h('div', [
              params.row.usid
            ])
          }
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
      this.$http
        .post(
          this.baseURL +
            "/ec/orderManage/orderMoneyChangeViewList?access_token=" +
            token +
            "&usid=" +
            usid +
            "&page=" +
            page +
            "&pageSize=" +
            pageSize +
            "&url=" +
            url,
          {
            radiobutton2: this.formDatas.val3,
            startDate: new Date(newDate).format("yyyy-MM-dd"), //开始日期
            endDate: new Date(this.formDatas.val5).format("yyyy-MM-dd"), // 结束日期
            ddzt: 99
          }
        )
        .then(response => {
          
          let formListItems = response.data.data.PaginationSupport.items;
          let formListTotal = response.data.data.PaginationSupport.totalCount;
          this.total = formListTotal
          this.tableData = formListItems;
          
          let itemOptionList = response.data.data.ddztlist;//订单状态
          // this.formItemList[0].optionList = itemOptionList.map(item => {
          //   return {
          //     value: item.pmcd,
          //     label: item.pmva
          //   };
          // });
          
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
      this.isLoading = true
      let pageSizeName = name.page;
      let formPageSize = this.total;
      let token = sessionStorage.getItem("name");
      let usid = sessionStorage.getItem("userName");
      let page = pageSizeName;
      let pageSize = "10";
      let url = window.location.host;
      this.$http
        .post(
          this.baseURL +
            "/ec/orderManage/orderMoneyChangeViewList?access_token=" +
            token +
            "&usid=" +
            usid +
            "&page=" +
            page +
            "&pageSize=" +
            pageSize +
            "&url=" +
            url,
          {
            radiobutton2: this.formDatas.val3,
            startDate:  new Date(this.formDatas.val4).format("yyyy-MM-dd"), //开始日期
            endDate:  new Date(this.formDatas.val5).format("yyyy-MM-dd"), // 结束日期
            ddzt: 99
          }
        )
        .then(response => {
          
          // startIndex
          let formTableList = response.data.data.PaginationSupport.items;
          let formTablepageSize = response.data.data.PaginationSupport.pageSize;
          let formTableTotal = response.data.data.PaginationSupport.totalCount;
          let formTableStartIndex = response.data.data.PaginationSupport.startIndex;
          this.tableData = formTableList
          this.currentPage = formTableStartIndex
          this.pageSize = formTablepageSize
          this.total = formTableTotal
          if(this.isQuery){
            this.watchTotal = tablePageSize
          }
        this.isLoading = false
        this.isShowLoading = false;
        return;
        })
        .catch(error => {
        this.isLoading = false
        this.isShowLoading = false;
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
      let userStartTime = new Date(this.formDatas.val4).format("yyyy-MM-dd")
      let userEndTime = new Date(this.formDatas.val5).format("yyyy-MM-dd")
      if(userEndTime < userStartTime) {
        this.$Modal.error({
            title: '温馨提示',
            content: '结束日期不能小于当前日期'
        });
        this.isShowLoading = false;
        return;
      }
      let token = sessionStorage.getItem("name");
      let page = 1
      let usid = sessionStorage.getItem("userName");
      let pageSize = '10';
      let url = window.location.host;

      this.$http.post(this.baseURL + '/ec/orderManage/queryOrderList?access_token='+token + '&usid=' + usid + '&page=' + page + '&pageSize=' + pageSize + '&url=' + url,{
        startDate:new Date(this.formDatas.val4).format("yyyy-MM-dd"),//开始日期
        endDate:new Date(this.formDatas.val5).format("yyyy-MM-dd"), // 结束日期
        radiobutton2:this.formDatas.val3,
        orid:this.formDatas.val1,
        ddzt: this.formDatas.val2
      }).then((response) => {
        
        this.tableData = response.data.data.PaginationSupport.items;
        this.total = response.data.data.PaginationSupport.totalCount
        this.currentPage = 1

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

<style >
.cardTitle {
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
  color: #191919;
}
.search-condition {
  padding-right: 10px;
}
.width {
  float: left;
}
</style>
