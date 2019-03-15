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
    <div id="userOperateLog">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <Card style="min-height:1000px;">
            <p slot="title" class="commonTitleStyle">用户操作日志</p>
            <div class="tableTitle">用户操作日志</div>
            <radioTable
                :loading="isLoading"
                :colname="colnames"
                :total="total"
                :tableData="tableData"
                :watchTotal="watchTotal"
                @on-change="changePage"
                @changePage="handleChangePage"
                @on-page-size-change="changePageSize"></radioTable>
        </Card>  
    </div>
</template>

<script>
export default {
  name: "user-operate-log",
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
      isShowLoading: false,
      isLoading: false,
      colnames: [
        // 调试接口时，请用实际接口参数替换 var1-var3
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
    this.userOperateAxios();
  },
  methods: {
    userOperateAxios() {
      this.$http
        .get(this.baseURL + "/ec/custom/findHCustomLog", {
          params: {
            access_token: sessionStorage.getItem("name"),
            usid: "PNjmQ3e",
            page: "1",
            pageSize: "10",
            url: window.location.host
          }
        })
        .then(response => {
          console.log(response);
          let formTableList = response.data.data.items; //渲染表格数据
          let formTablepageSize = response.data.data.pageSize; //渲染表格数据
          let formTableTotal = response.data.data.totalCount; //渲染表格数据
          this.tableData = formTableList;
          this.pageSize = formTablepageSize;
          this.total = formTableTotal;
        })
        .then(error => {
          console.log(error);
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
      console.log(",,,1", name);
      let pageSizeName = name.page;
      let formPageSize = this.total;
      this.$http
        .get(this.baseURL + "/ec/custom/findHCustomLog", {
          params: {
            access_token: sessionStorage.getItem("name"),
            usid: "PNjmQ3e",
            page: pageSizeName,
            pageSize: "10",
            url: window.location.host
          }
        })
        .then(response => {
          console.log(response);
          // startIndex
          // let formTableList = response.data.data.items;//渲染表格数据
          // let formTablepageSize = response.data.data.pageSize;//渲染表格数据
          // let formTableTotal = response.data.data.totalCount;//渲染表格数据
          // this.tableData = formTableList
          // this.pageSize = formTablepageSize
          // this.total = formTableTotal

          let formTableList = response.data.data.items;
          let formTablepageSize = response.data.data.pageSize;
          let formTableTotal = response.data.data.totalCount;
          let formTableStartIndex = response.data.data.startIndex;
          this.tableData = formTableList;
          this.currentPage = formTableStartIndex;
          this.pageSize = formTablepageSize;
          this.total = formTableTotal;
          if (this.isQuery) {
            this.watchTotal = tablePageSize;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //选择每页可显示的最大数据条数
    changePageSize(num) {
      console.log("1", num);
      this.pageNumNew = num;
      this.setEnd(this.currentPage);
      //父组件接收每页条数
      this.$emit("changePageSize", num);
    },
    //选择页码
    changePage(num) {
      console.log("2", num);
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
    }
  }
};
</script>