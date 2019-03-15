<template>
    <div class="distributionSummary">
    <template v-if="isShowLoading">
            <loading></loading>
    </template>
        <Breadcrumb separator=">" :style="{margin: '24px 0'}">
            <BreadcrumbItem>我的账户</BreadcrumbItem>
            <BreadcrumbItem>统计分析</BreadcrumbItem>
            <BreadcrumbItem>订单变更统计</BreadcrumbItem>
        </Breadcrumb>
        <detail-form
            :isListPage="true"
            :formDatas="formDatas"
            btnName="统计"
            :btnWidth="1"
            :formItemList="formItemList"
            @getFormData="handleQuery"
            @setDay="setDay"
            @setWeek="setWeek"
            @setMonth="setMonth"
            @setTriduum="setTriduum"
            @setHebdomad="setHebdomad"></detail-form>

    <div class="footer-from" >
        <p slot="title" class="cardTitle annual">
            <span>订单变更统计</span>
        </p>

        <div class="radioTableHeight">
          <radioTable
              :loading="isLoading"
              :colname="colnames"
              :total="total"
              :tableData="tableData"></radioTable>
        </div>
    </div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      userEndTime:Object(),
      userStartTime:Object(),
      billingUserName:'',
      isShow:false,
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
      isLoading: false,
      value1: "1",
      visible: false,
      isShowLoading: false,
      formDatas: {
        val1: 0,
        val2: "99",
        val3: '',
        val4: new Date(),
      },
      formItemList: [
        {
          keyName: "val2",
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
              value:'99',
              label:'包含列表中所有订单状态'
            },]
        },
        {
          label: "",
          type: 2,
          keyName: "val1",
          class:'width',
          labelWidth:55,
          optionList: [
            {
              value: 0,
              label: "按消费（游览）日期查询"
            },
            {
              value: 1,
              label: "按下订单日期查询"
            },
            {
              value: 2,
              label: "按支付日期查询"
            },
          ]
        },
        {
          keyNameStart: "val3",
          keyNameEnd: "val4",
          labelWidth:112,
          class:'width',
          type: 5,
          label: "最新更新时间",
          double: true,
          isShowOptions:true
        },
      ],

      colnames: [
        {
          title: "订单号",
          key: "orid",
          width: 180
        },
        {
          title: "订单状态",
          key: "ddzt",
        },
        {
          title: "原人数",
          key: "ynumb",
        },
        {
          title: "现人数",
          key: "numb",
        },
        {
          title: "差额人数",
          // key: "szscenicname",
          render: (h, params) => {
            return h(
              'span',
              params.row.numb - params.row.ynumb
            )
          }
        },
        {
          title: "退票率",
          // key: "szscenicname",
          render: (h, params) => {
            let figureName = params.row.numb - params.row.ynumb;
            let figureNumber = figureName / params.row.numb;
            let str = Number(figureNumber).toFixed(2);
            str+="%";
            return h(
              'span',
              str
            )
          }
        },
      ],
      tableData: []
    };
  },
  created() {
    this.ordersAxios();
  },
  methods: {
    ordersAxios() {
      this.isShowLoading = true;
      this.$http.get(this.baseURL + "/ec/countOrder/searchListOrderes", {
          params: {
            access_token: sessionStorage.getItem("name"),
            usid: sessionStorage.getItem("userName"),
            // url: window.location.host,
            // page:'1'
          }
        })
        .then((response) => {

          let tdlblistOptionList = response.data.data.ddztlist;
          let date = new Date();
          this.formDatas.val3 = date;
          let newDate =  date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
          this.billingUserName = sessionStorage.getItem("userName");
          this.userStartTime = new Date(newDate).format("yyyy-MM-dd")
          this.userEndTime = new Date(this.formDatas.val4).format("yyyy-MM-dd")
          this.isShowLoading = false;
        return;
        })
        .catch((error) => {
          this.isShowLoading = false;
          return;

        });
    },


    handleQuery() {
      this.isShowLoading = true;

      this.userStartTime = new Date(this.formDatas.val3).format("yyyy-MM-dd")
      this.userEndTime = new Date(this.formDatas.val4).format("yyyy-MM-dd")
      if(this.userEndTime < this.userStartTime) {
        this.$Modal.error({
            title: '温馨提示',
            content: '结束日期不能小于当前日期'
        });
      this.isShowLoading = false;
      return;
      }
      let radioBtn = this.formDatas.val1;
      let ddztName = this.formDatas.val2;
      let token = sessionStorage.getItem("name");
      let usid = sessionStorage.getItem("userName");
      let url = window.location.host;
      // let url = 'localhost';
      this.$http.post(this.baseURL + "/ec/countOrder/checkupListOrderes?access_token=" +
            token +
            "&usid=" +
            usid +
            "&url=" +
            url,
          {
            startDate: new Date(this.formDatas.val3).format("yyyy-MM-dd"), //开始日期
            endDate: new Date(this.formDatas.val4).format("yyyy-MM-dd"),// 结束日期
            radiobutton2: this.formDatas.val1,
            ddzt: this.formDatas.val2,
          }
        )
        .then(response => {

          let tdlblistOptionList = response.data.data.ddztlist;
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
          let itemTableList = response.data.data.list;
          this.tableData = itemTableList;

          this.isShowLoading = false;
          return;
        }).catch(error => {
          this.isShowLoading = false;
          return;

        });
    },
    handleClose() {
      this.visible = false;
    },
    handleOpen() {
      this.visible = true;
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
    setTriduum(e) {
      const date = new Date();
      this.formDatas.val4 = date;
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
      this.formDatas.val3 = new Date();
      return date;
      // e.preventDefault();
      this.$emit("setTriduum");
    },
    // 未来一周
    setHebdomad(e) {
      const date = new Date();
      this.formDatas.val4 = date;
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
      this.formDatas.val3 = new Date();
      return date;
      // e.preventDefault();
      this.$emit("setHebdomad");
    },

  }
};
</script>

<style scoped>
.footer-text span {
  margin-left: 20px;
}
.annual {
  text-align: center;
}
.annual > span {
  float: inherit;
  font-weight: 600;
}
.footer-btn {
  font-size: 14px;
  color: #4e81f0;
}
.cardTitle {
  height: 25px;
  font-size: 16px;
}
.footer-text-block {
  text-align: right;
  margin: 15px 0;
  width: 100%;
  text-align: center;
  font-size: 14px;
}
.footer-text,
.print-time {
  display: inline-block;
}
#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 14px;
}

#customers td,
#customers th {
  border: 1px solid #e8eaec;
  padding: 3px 7px 2px 7px;
}

#customers th {
  text-align: left;
  padding-top: 5px;
  padding-bottom: 4px;
  background-color: #f8f8f9;
  color: #515a6e;
}

#customers tr.alt td {
  color: #000000;
  background-color: #f8f8f9;
}
.ivu-breadcrumb {
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 10px;
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
.radioTableHeight {
    height: 523px;
    overflow: hidden;
    overflow-y: auto;
    min-width: 457px;
    border: 1px solid #e8eaec;
}
.footer-from {
  height: 1033px
}
</style>
