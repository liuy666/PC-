<style scoped lang="less">
.tableTitle {
  line-height: 30px;
  height: 30px;
  background-color: #4b7ff0;
  padding-left: 12px;
  color: #fff;
}
</style>

<template>
    <div id="historyOperateLog">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        
        <detail-form 
            :isListPage="true"
            :formDatas="formDatas"
            btnName="查询"
            :formItemList="formItemList"
            @getFormData="handleQuery"></detail-form>

        <Card style="min-height:1000px;">
            <p slot="title" class="commonTitleStyle">操作日志查询</p>
            <div class="tableTitle">操作日志查询</div>
            <radioTable
                :loading="isLoading"
                :colname="colnames"
                :total="total"
                :tableData="tableData"
                :watchTotal="watchTotal"
                @on-change="changePage"
                @changePage="handleChangePage"
                @on-page-size-change="changePageSize">
            </radioTable>
        </Card>  
    </div>
</template>

<script>
export default {
  name: "OperationLogQuery",
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
      
      isShowLoading: false,
      isLoading: false,
      formDatas: {
        val1: ""
      },
      formItemList: [
        {
          keyName: "val1",
          type: 1,
          label: "订单号"
        }
      ],
      colnames: [
        {
          title: "功能号",
          key: "pmva"
        },
        {
          title: "操作概要",
          key: "logdatetime"
        },
        {
          title: "操作日期",
          key: "note"
        }
      ],
      total: 0,
      tableData: []
    };
  },
  async created() {
    // 进入页面前获取数据进行页面初始化
    this.historyAxios();
  },
  methods: {
    historyAxios() {
      this.$http.get(this.baseURL + "/ec/orderManage/queryOrderLog", {
          params: {
            access_token: sessionStorage.getItem("name"),
            usid: sessionStorage.getItem("userName"),
            page: this.currentPage,
            pageSize: "10",
            url: window.location.host
          }
        })
        .then(response => {
          
          let formTableList = response.data.data.PaginationSupport.items; //渲染表格数据
          let formTablepageSize = response.data.data.PaginationSupport.pageSize;//渲染表格数据
          let formTableTotal = response.data.data.PaginationSupport.totalCount;//渲染表格数据
          this.tableData = formTableList;
          this.pageSize = formTablepageSize
          this.total = formTableTotal
        })
        .then(error => {
          
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
      let pageSizeName = name.page
      let formPageSize = this.total;
      this.$http.get(this.baseURL + "/ec/orderManage/queryOrderLog", {
          params: {
            access_token: sessionStorage.getItem("name"),
            usid: sessionStorage.getItem("userName"),
            page: pageSizeName,
            pageSize: "10",
            url: window.location.host
          }
        })
        .then(response => {
          
          // startIndex
          // let formTableList = response.data.data.PaginationSupport.items;
          // let formTablepageSize = response.data.data.PaginationSupport.pageSize;
          // let formTableTotal = response.data.data.PaginationSupport.totalCount;
          // let formTableStartIndex = response.data.data.PaginationSupport.startIndex;
          // this.tableData = formTableList
          // this.currentPage = formTableStartIndex
          // this.pageSize = formTablepageSize
          // this.total = formTableTotal
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
    handleQuery() {
        let handFormInput = this.formItemList.val1;
        this.$http.get(this.baseURL + '/ec/orderManage/queryOrderLog',{
            params: {
                access_token: sessionStorage.getItem("name"),
                usid: sessionStorage.getItem("userName"),
                page: '1',
                pageSize: "10",
                url: window.location.host,
                orid: handFormInput,
            },
        }).then((response) => {
            
            let listItems = response.data.data.PaginationSupport.items;
            for(let i = 0; i<listItems.length; i++){
              let handItems = response.data.data.PaginationSupport.items;
                this.val1 = listItems[i].pmva;

                this.tableData = handItems;
                this.pageSize = response.data.data.PaginationSupport.pageSize;
                this.pageStartIndex = response.data.data.PaginationSupport.startIndex;
                this.total = response.data.data.PaginationSupport.totalCount;
                let pageSize = response.data.data.PaginationSupport.pageSize; //一页展示多少条
                this.pageSize = PageSize;
                this.currentPage = pageStartIndex;
            }
        }).catch((error) => {
            
        })
    },
  }
};
</script>