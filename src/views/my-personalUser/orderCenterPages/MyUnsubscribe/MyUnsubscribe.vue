  <template>
    <div class="purchaseOrder">
        <template v-if="isShowLoading">
            <loading></loading>
    </template>
  
        <div slot="title" class="cardTitle1">
            <p>我的退订</p>
        </div>
        <detail-form 
            :isListPage="true"
            :formDatas="formDatas"
            btnName="查询"
            :btnWidth="1"
            :formItemList="formItemList"
            @getFormData="handleQuery"
            @setDay="setDay"
            @setWeek="setWeek"
            @setMonth="setMonth"></detail-form>
    <!--  -->



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
      unsubscribe: false,
      first: false,
      value1:'1',
      pageNumSelect: 0,
      isLoading: false,
      pageSize:0,
      total: 0,
      pageNumNew:10,
      start: 0,
      watchTotal: 0,
      end: 0,
      totalCount:0,
      currentProviderId:0,
      currentPage: 1,
      isShowLoading: false,
      isRadio: true,
      modal10: false,
      visible:false,
      formDatas: {
        val1: "",
        val2: 0,
        val3: new Date(),
        val4: new Date(),
      },
      formItemList: [
        {
          keyName: "val1",
          type: 1,
          label: "输入订单号",
          class:'width',
          labelWidth: 100
        },
        {
          label: "查询条件",
          type: 2,
          keyName: "val2",
          class:'width',
          labelWidth: 125,
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
          keyNameStart: "val3",
          keyNameEnd: "val4",
          type: 5,
          label: "选择时间",
          class:'width',
          double: true,
          isShowDate:true,
          class: 'float_option_big',
          labelWidth: 85,
        },
      ],
      colnames: [
        {
          title: "原订单号",
          // key: "srid",
          width: 170,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    display: "block",
                  },
                  on: {
                    click: () => {
                      let oridName = params.row.srid;
                      let usidName = params.row.usid;
                      let saleName = 1;
                      if(/(^\d{8}000\d{6})/.test(oridName) === true){
                        this.$router.push({
                          query: {orid:oridName, usid:usidName},
                          name: 'DetailsMyCancellation',
                        });
                      } else if(/(^\d{8}000\d{6})/.test(oridName) === false) {
                        this.$router.push({
                            query: {orid:oridName, usid:usidName},
                            name: 'distributorDetails',
                            params:{sale: saleName},
                        });
                      }
                    }
                  }
                },
                params.row.srid
              ),
            ]);
          }
        },
        // {
        //   title: "退订单号",
        //   key: "orid",
        //   width: 170,
        // },
        {
          title: "入园人",
          key: "ornm",
          width: 130
        },
        {
          title: "退订日期",
          key: "orda",
          width: 170
        },
        {
          title: "退订金额",
          width: 90,
          render: (h, params) => {
            return h(
              'span','￥' + params.row.tpmont
            )
          }
        },
        {
          title: "手续费",
          width: 90,
          render: (h, params) => {
            return h(
              'span', '￥' + params.row.tpsx
            )
          }
        },
        {
          title: "实退金额",
          width: 90,
          render: (h, params) => {
            return h (
              'span', '￥' + (params.row.tpmont - params.row.tpsx)
            )
          }
        },
        {
          title: "修改方式",
          key: "strtpfs",
          width: 110
        },
        {
          title: "退订类别",
          key: "strtdlb",
          width: 150
        },
        {
          title: "退订状态",
          key: "strddzt",
          width: 130,
          render: (h, params) => {
            if(params.row.strddzt === '退款中' || params.row.strddzt === '已退订(退款中)' || params.row.strddzt === '全退订(退订已退款)' || params.row.strddzt === '已支付(退款中)' || params.row.strddzt === '全退订' || params.row.strddzt === '全退订(退款中)'){
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
        }
      ],
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
      let token = sessionStorage.getItem("name");
      let page = this.currentPage
      let usid = sessionStorage.getItem("userName");
      let pageSize = '10';
      let url = window.location.host;
      let date = new Date();
      this.formDatas.val3 = date;
      let newDate = date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
      this.$http.post(this.baseURL + '/ec/cancelOrder/queryCancelOrder?access_token='+token + '&usid=' + usid + '&page=' + page + '&pageSize=' + pageSize + '&url=' + url,{
            startDate:new Date(newDate).format("yyyy-MM-dd"),//开始日期
            endDate:new Date(this.formDatas.val4).format("yyyy-MM-dd"),// 结束日期
            tdlb: 99,
            tpfs: 99,
            radiobutton2: this.formDatas.val2
      }).then((response) => {
        
        let itemTableList =  response.data.data.PaginationSupport.items;//渲染表格数据
        let pageSize = response.data.data.PaginationSupport.pageSize;//一页展示多少条
        let tablePageSize = response.data.data.PaginationSupport.totalCount;//表格数据条数
        let formPage = response.data.data.PaginationSupport.startIndex;//page分页
        let itemOptionList = response.data.data.tdlblist;//订单状态
        this.total = tablePageSize;
        this.pageSize = pageSize;
        this.tableData = itemTableList;

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
      }).catch((error) => {
        
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
              
          });
      }
    },

    submitForm(name){
      this.isLoading = true;
      let pageSizeName = name.page
      let token = sessionStorage.getItem("name");
      let page = pageSizeName
      let usid = sessionStorage.getItem("userName");
      let pageSize = '10';
      let url = window.location.host;
      this.$http.post(this.baseURL + '/ec/cancelOrder/queryCancelOrder?access_token='+token + '&usid=' + usid + '&page=' + page + '&pageSize=' + pageSize + '&url=' + url,{
        startDate:new Date(this.formDatas.val3).format("yyyy-MM-dd"),//开始日期
        endDate:new Date(this.formDatas.val4).format("yyyy-MM-dd"),// 结束日期
        tdlb: 99,
        tpfs: 99,
        radiobutton2: this.formDatas.val2
      }).then(response => {
          
          let itemTableList = response.data.data.PaginationSupport.items;
          let tablePageSize = response.data.data.PaginationSupport.totalCount;
          let tablePageStartIndex = response.data.data.PaginationSupport.startIndex;
          let pageSize = response.data.data.PaginationSupport.pageSize; //一页展示多少条
          this.currentPage = tablePageStartIndex
          this.tableData = itemTableList;
          this.pageSize = pageSize;
          this.total = tablePageSize;
        // for (let j = 0; j < itemTableList.length; j++) {
        //     let pmcdType = itemTableList[j].tpfs;
        //     if (pmcdType == "00") {
        //       pmcdType = "未付款";
        //       itemTableList[j].tpfs = pmcdType;
        //     } else if (pmcdType == "02") {
        //       pmcdType = "已支付";
        //       itemTableList[j].tpfs = pmcdType;
        //     } else if (pmcdType == "11") {
        //       pmcdType = "已出票";
        //       itemTableList[j].tpfs = pmcdType;
        //     } else if (pmcdType == "23") {
        //       pmcdType = "已支付[申请单]";
        //       itemTableList[j].tpfs = pmcdType;
        //     } else if (pmcdType == "30") {
        //       pmcdType = "已退订(退款中)";
        //       itemTableList[j].tpfs = pmcdType;
        //     } else if (pmcdType == "33") {
        //       pmcdType = "退款失败";
        //       itemTableList[j].tpfs = pmcdType;
        //     } else if (pmcdType == "99") {
        //       pmcdType = "包含列表中所有订单状态";
        //       itemTableList[j].tpfs = pmcdType;
        //     } else if (pmcdType == "27") {
        //       pmcdType = "全退订";
        //       itemTableList[j].tpfs = pmcdType;
        //     }
        //   }
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
          if(this.isQuery){
            this.watchTotal = tablePageSize
          }
          this.rowData = null
          
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
          
      let userStartTime = new Date(this.formDatas.val3).format("yyyy-MM-dd")
      let userEndTime = new Date(this.formDatas.val4).format("yyyy-MM-dd")
      if(userEndTime < userStartTime) {
        this.$Modal.error({
            title: '温馨提示',
            content: '结束日期不能小于当前日期'
        });
        this.isShowLoading = false;
        return;
      }
      let token = sessionStorage.getItem("name");
      let page =  1
      let usid = sessionStorage.getItem("userName");
      let pageSize = this.pageSize;
      let url = window.location.host;
      this.$http.post(this.baseURL + '/ec/cancelOrder/queryCancelOrder?access_token='+token + '&usid=' + usid + '&page=' + page + '&pageSize=' + pageSize + '&url=' + url,{
        startDate:new Date(this.formDatas.val3).format("yyyy-MM-dd"),//开始日期
        endDate:new Date(this.formDatas.val4).format("yyyy-MM-dd"),// 结束日期
        tdlb: 99,
        tpfs: 99,
        radiobutton2: this.formDatas.val2,
        orid:this.formDatas.val1,
      }).then((response) => {
        this.currentPage = 1
        let listItems = response.data.data.PaginationSupport.items;
        this.tableData = listItems;
        this.total = response.data.data.PaginationSupport.totalCount
        // for(let i = 0; i<listItems.length; i++) {
        //   this.formDatas.val1 = listItems[i].orid;
        //   this.tableData = listItems;
          
        //   this.pageSize = response.data.data.PaginationSupport.pageSize
        //   this.pageStartIndex = response.data.data.PaginationSupport.startIndex
        //   this.total = response.data.data.PaginationSupport.totalCount
        //   let pageSize = response.data.data.PaginationSupport.pageSize;//一页展示多少条
        //   this.pageSize = PageSize
        //   this.currentPage = pageStartIndex
        // }
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
      this.formDatas.val3 = date;
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 3);
      this.formDatas.val4 = new Date();
      return date;
      this.$emit("setDay");
    },
 // 设置近一周
    setWeek(e) {
      const date = new Date();
      this.formDatas.val3 = date;
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      this.formDatas.val4 = new Date();
      return date;
      this.$emit("setWeek");
    },
    // 设置近一月
    setMonth(e) {
      const date = new Date();
      this.formDatas.val3 = date;
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
      this.formDatas.val4 = new Date();
      return date;
      // e.preventDefault();
      this.$emit("setMonth");
    },
    // 未来三天
    // setTriduum(e) {
    //   const date = new Date();
    //   this.formDatas.val4 = date;
    //   date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
    //   this.formDatas.val3 = new Date();
    //   return date;
    //   // e.preventDefault();
    //   this.$emit("setTriduum");
    // },
    // // 未来一周
    // setHebdomad(e) {
    //   const date = new Date();
    //   this.formDatas.val4 = date;
    //   date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
    //   this.formDatas.val3 = new Date();
    //   return date;
    //   // e.preventDefault();
    //   this.$emit("setHebdomad");
    // },

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
.cardTitle1 p {
  font-size: 16px
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
.width {
  float: left;
}
</style>
