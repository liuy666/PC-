

<template>
    <div class="MyOrder">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <div class="title-containers">
        <div class="head-portrait-user-name">
            <img src="../../../../assets/portrait.png" alt="用户头像">
            <div class="user-name-block">
                <span class="user-name">{{usidData}}</span><span><router-link :to="{name:'MyInformation'}"><a class="personalData">个人信息</a></router-link></span><br />
                <span class="user-name">已绑定手机<span class="user-phone">{{mobileData}}</span></span><br />
                <span class="user-name">{{email}}</span><br />
            </div>
        </div>
        
            <div class="right-content-block">
                <router-link :to="{name:'MyOrder'}">
                    <div class="all-orders">
                        <img src="../../../../assets/icon_order.png">
                        <span class="all">全部订单</span>
                    </div>
                </router-link>
                <router-link :to="{name:'MyOrder',query:{ddzt:'00'}}">
                    <div class="all-orders">
                        <img src="../../../../assets/icon_pay.png">
                        <span class="all">待支付（{{wzfsizeData}}）</span>
                    </div>
                </router-link>
                <router-link :to="{name:'MyOrder',query:{ddzt:'02'}}">
                    <div class="all-orders">
                        <img src="../../../../assets/icon_travel.png">
                        <span class="all">待出行（{{wxfsizeData}}）</span>
                    </div>
                </router-link>
                <router-link :to="{name:'MyOrder',query:{ddzt:'101'}}">
                <div class="all-orders">
                    <img src="../../../../assets/icon_refund.png">
                    <span class="all">我的退订（{{wshsizeData}}）</span>
                </div>
                </router-link>
            </div>
</div>

    <!--  -->

        <!--  -->
        <span class="radioTableTitleName">全部订单</span>
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
export default {
  data() {
    return { 
      wshsizeData:'',
      toPerform:'02',
      unpaid:'00',
      mobileData:'',
      usidData:'',
      email:'',
      wzfsizeData:'',
      wxfsizeData:'',
      pageNumSelect: 0,
      pageSize: 0,
      total: 0,
      start: 0,
      watchTotal: 0,
      end: 0,
      page:1,
      totalCount: 0,
      currentProviderId: 0,
      currentPage: 1,
      pageNumNew: 10,
      rowData: null,
      isQuery: false,
      isLoading: false,
      isShowLoading: false,
      animal: "",
      total: 0,
      formDatas: {
        val1: "",
        val2: "",
        val3: "",
        val4: "",
        val5: new Date(),
        val6: new Date(),
      },
      colnames: [
        {
          title: "产品信息",
          width: 178,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    display: "block",
                    textAlign: "left",
                    marginTop:'5px'
                  }
                },
                params.row.sztickettypename + '(' + params.row.szcrowdkindname + ')'
              ),
              h(
                "span",
                {
                  style: {
                    display: "block",
                    textAlign: "left",
                    margin: "5px 0"
                  }
                },
                "游玩日期：" + params.row.dtstartdate
              ),
              h(
                "span",
                {
                  style: {
                    display: "block",
                    textAlign: "left",
                    marginBottom:'5px'
                  }
                },
                "门票数量：" +  params.row.numb + '张'
              )
            ]);
          }
        },
        {
          title: "订单金额",
          width:90,
          render: (h, params) => {
            return h(
              "span",
              params.row.mont + '元'
            );
          }
        },
        {
          title: "订单编号",
          key: "orid",
          width: 180,
        },
        {
          title: "订单状态",
          width: 149,
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
            } else if(params.row.strddzt === '全退订(退款中)' || params.row.strddzt === '已支付(退款中)' || params.row.strddzt ===  '全退订(退订已退款)'){
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
          title: "领票人",
          key: "ornm",
          width: 180,
        },
        {
          title: "订单操作",
          key: "serviceCharge",
          width: 160,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  props: {
                    size: "small"
                  },
                  style: {
                    padding: "5px 10px",
                    display: "block",
                    borderRadius: "3px"
                  },
                  
                  on: {
                    click: () => {
                      
                      let oridName = params.row.orid;
                      let usidName = sessionStorage.getItem("userName");
                      let incluOrid = oridName.includes('000')
                      if(params.row.ddzt === '27' && /(^\d{8}000\d{6})/.test(oridName) === true){
                          this.$router.push({
                              query: {orid:oridName, usid:usidName},
                              name: 'DetailsMyCancellation'
                          });
                      } else if(params.row.ddzt !== '27' && /(^\d{8}000\d{6})/.test(oridName) === true) {
                          this.$router.push({
                              query: {orid:oridName, usid:usidName},
                              name: 'MyOrderDetailsPage'
                          });
                      } else if(/(^\d{8}000\d{6})/.test(oridName) === false) {
                          this.$router.push({
                              query: {orid:oridName, usid:usidName},
                              name: 'distributorDetails'
                          });
                      }
                    }
                  }
                },
                "查看订单"
              )
            ]);
          }
        }
      ],
      tableData: []
    };
  },
  created(){
      this.purchaseAxios();
  },
  methods: {
    purchaseAxios() {
          this.isShowLoading = true;
      this.$http.get(this.baseURL + "/ec/orderManage/getFirstPageView", {
          params: {
            access_token: sessionStorage.getItem("name"),
            usid: sessionStorage.getItem("userName"),
            page: this.currentPage,
            pageSize: "10",
            url: window.location.host
          }
        })
        .then(response => {
          
          let itemTableList = response.data.data.PaginationSupport.items; //渲染表格数据
          let tablePageSize = response.data.data.PaginationSupport.totalCount; //表格数据条数
          let pageSize = response.data.data.PaginationSupport.pageSize; //一页展示多少条
          let formPage = response.data.data.PaginationSupport.startIndex; //page分页
          let itemOptionList = response.data.data.ddztlist; //订单状态
          this.wzfsizeData = response.data.data.wzfsize;//待支付
          this.wxfsizeData = response.data.data.wxfsize;//待执行
          this.wshsizeData = response.data.data.tdsize;//我的退订
          this.total = tablePageSize;
          this.pageSize = pageSize;
          this.tableData = itemTableList;
          this.usidData = response.data.data.usid;
          this.mobileData = response.data.data.custom.mobile;
          this.email = response.data.data.custom.email;
          if(this.wzfsizeData == ''){
            this.wzfsizeData = 0
          } else if(this.wxfsizeData == '') {
            this.wxfsizeData = 0
          } else if(this.wshsizeData == '') {
            this.wshsizeData = 0
          } else if(response.data.code === 500) {
            this.wzfsizeData = 0
            this.wxfsizeData = 0
            this.wshsizeData = 0
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
      let pageSizeName = name.page;
      this.page = pageSizeName
      let formPageSize = this.total;
      this.$http
        .get(this.baseURL + "/ec/orderManage/orderViewList", {
          params: {
            access_token: sessionStorage.getItem("name"),
            usid: sessionStorage.getItem("userName"),
            page: this.page,
            pageSize: "10",
            url: window.location.host
          }
        })
        .then(response => {
          let itemTableList = response.data.data.PaginationSupport.items;
          let tablePageSize = response.data.data.PaginationSupport.totalCount;
          let tablePageStartIndex = response.data.data.PaginationSupport.startIndex;
          let pageSize = response.data.data.PaginationSupport.pageSize; //一页展示多少条
          this.currentPage = tablePageStartIndex;
          this.pageSize = pageSize;
          this.tableData = itemTableList;
          this.total = tablePageSize;
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
    
    // 设置近三天
    setDay(e) {
      // return this.valueDateTwo = new Date();
      // this.$emit('setDay');
      const date = new Date();
      this.formDatas.val5 = date;
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 3);
      this.formDatas.val6 = new Date();
      return date;
      this.$emit("setDay");
    },
    // 设置近一周
    setWeek(e) {
      const date = new Date();
      this.formDatas.val5 = date;
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      this.formDatas.val6 = new Date();
      return date;
      this.$emit("setWeek");
    },
    // 设置近一月
    setMonth(e) {
      const date = new Date();
      this.formDatas.val5 = date;
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
      this.formDatas.val6 = new Date();
      return date;
      // e.preventDefault();
      this.$emit("setMonth");
    },
    // 未来三天
    setTriduum(e) {
      const date = new Date();
      this.formDatas.val6 = date;
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
      this.formDatas.val5 = new Date();
      return date;
      // e.preventDefault();
      this.$emit("setTriduum");
    },
    // 未来一周
    setHebdomad(e) {
      const date = new Date();
      this.formDatas.val6 = date;
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
      this.formDatas.val5 = new Date();
      return date;
      // e.preventDefault();
      this.$emit("setHebdomad");
    },

  }
};
</script>

<style lang="less" scoped>
.user-phone {
  margin-left: 10px;
}
.personalData {
  display: inline-block;
  margin-left: 20px;
}
.radioTableTitleName {
  font-weight: 600;
  color: black;
  font-size: 16px;
  margin-bottom: 20px;
  display: block
}
.title-containers {
    margin-bottom: 30px;
    border-bottom: 1px solid #ECECEC;
}
.MyOrder {
  width: 100%;
}
.cardTitle {
  font-size: 20px;
  color: #191919;
}
.search-condition {
  padding-right: 10px;
}
.head-portrait-user-name {
    display: inline-block;
    width: 40%;
    position: relative;
    border:0;
}
.head-portrait-user-name img {
    width: 120px;
    height:120px;
    border-radius: 50%;
    display: inline-block;
    background: #ccc;
    margin-top: 20px;
}
.user-name-block {
    display: inline-block;
    position: absolute;
    top: 57px;
    left: 145px;
}
.user-name-block::after {
    content: "";
    position: absolute;
    right: -100px;
    width: 1px;
    top: 7%;
    height: 40px;
    border-right: 1px solid #ccc;
}
.right-content-block {
    text-align: right;
    display: inline-block;
    width: 60%;
}
.all-orders {
    width: 130px;
    height: 130px;
    text-align: center;
    color: black;
    display: inline-block;
}
.all-orders img {
    width: 80px;
    height: 80px;
    display: block;
    border-radius: 50%;
    margin: 0 auto;
}
.all-orders .all {
    display: block;
    margin-top: 15px;
}
</style>