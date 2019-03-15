<template>
    <div class="frequentContacts">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <p slot="title" class="cardTitle">
            <span>团队成员</span>
        </p>  

        
        <!--  -->
        <radioTable 
            :loading="isLoading"
            :colname="colnames"
            :total="total" 
            :tableData="tableData"
            :watchTotal="watchTotal"
            @on-change="changePage"
            @changePage="handleChangePage"
            @on-page-size-change="changePageSize"></radioTable>

    </div>
</template>

<script>
export default {
  data() {
    return {
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
      rowData: null,
      isQuery: false,
      isShowLoading:false,
      isLoading: false,
      oridParams:'',
      colnames: [
        {
          title: "编号",
          key: "orid",
          width:200,
        },
        {
          title: "服务商",
          key: "szscenicname",
          width:150,
        },
        {
          title: "票名称",
          key: "sztickettypename",
          width:150,
        },
        {
          title: "姓名",
          key: "cname",
          width:100,
        },
        {
          title: "证件类别",
          key: "pmva",
          width:100,
        },
        {
          title: "证件号码 / 出生日期",
          key: "idcard",
          width:200,
        },
        {
          title: "是否小孩",
          key: "ischild",
          width:100,
        },
        {
          title: "手机号码",
          key: "mbnumber",
          width:150,
        },
        
      ],
      tableData: []
    };
  },
  created(){
      this.pushMembersAxios();
  },
  methods: {
      pushMembersAxios(){
          this.oridParams = this.$route.params.orid;
          this.$http.get(this.baseURL + '/ec/realname/v1/listByOrid', {
              params: {
                access_token: sessionStorage.getItem("name"),
                orid: this.oridParams,
                page: this.currentPage,
                pageSize: "10",
                url: window.location.host
              }
          }).then((response) => {
                
                let itemTableList = response.data.data.PaginationSupport.items; //渲染表格数据
                let tablePageSize = response.data.data.PaginationSupport.totalCount; //表格数据条数
                let pageSize = response.data.data.PaginationSupport.pageSize; //一页展示多少条
                let formPage = response.data.data.PaginationSupport.startIndex; //page分页
                let itemOptionList = response.data.data.ddztlist; //订单状态
                this.total = tablePageSize;
                this.pageSize = pageSize;
                this.tableData = itemTableList;
                
                for (let j = 0; j < itemTableList.length; j++) {
                    let pmcdType = itemTableList[j].ischild;
                    if (pmcdType == "0") {
                    pmcdType = "是";
                    itemTableList[j].ischild = pmcdType;
                    } else if (pmcdType == "1") {
                    pmcdType = "否";
                    itemTableList[j].ischild = pmcdType;
                    }
                }
          }).catch((error) => {
              
          })
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
      let pageSizeName = name.page;
      let formPageSize = this.total;
      this.$http
        .get(this.baseURL + "/ec/realname/v1/listByOrid", {
          params: {
            access_token: sessionStorage.getItem("name"),
            orid: this.oridParams,
            page: pageSizeName,
            pageSize: "10",
            url:window.location.host
          }
        })
        .then(response => {
          
          // startIndex
          let itemTableList = response.data.data.PaginationSupport.items;
          let tablePageSize = response.data.data.PaginationSupport.totalCount;
          let tablePageStartIndex = response.data.data.PaginationSupport.startIndex;
          let pageSize = response.data.data.PaginationSupport.pageSize; //一页展示多少条
          this.currentPage = tablePageStartIndex;
          this.pageSize = pageSize;
          this.tableData = itemTableList;
          this.total = tablePageSize;
            for (let j = 0; j < itemTableList.length; j++) {
                let pmcdType = itemTableList[j].ischild;
                if (pmcdType == "0") {
                pmcdType = "是";
                itemTableList[j].ischild = pmcdType;
                } else if (pmcdType == "1") {
                pmcdType = "否";
                itemTableList[j].ischild = pmcdType;
                }
            }
          if (this.isQuery) {
            this.watchTotal = tablePageSize;
          }
          this.rowData = null;
        })
        .catch(error => {
          
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
    newContact(){
        this.modal5 = true
    },
  },
};
</script>

<style scoped>
.Acommitment {
  width: 100%;
  background: #f2f6fe;
  border: 1px solid #aec7ff;
  border-radius: 2px;
  padding: 32px 0 32px 68px;
  float: left;
}
.Acommitment-content {
  color: #5e5e60;
  margin-top: 10px;
  display: block;
}
.Acommitment-title {
  display: block;
  font-weight: 600;
  font-size: 14px;
  color: #f54112;
}
</style>

