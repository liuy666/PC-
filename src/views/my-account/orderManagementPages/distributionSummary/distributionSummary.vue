<template>
    <div class="distributionSummary">
    <template v-if="isShowLoading">
            <loading></loading>
    </template>
        <Breadcrumb separator=">" :style="{margin: '24px 0'}">
            <BreadcrumbItem>我的账户</BreadcrumbItem>
            <BreadcrumbItem>统计分析</BreadcrumbItem>
            <BreadcrumbItem>销售出票汇总</BreadcrumbItem>
        </Breadcrumb>
    <!--  -->
        <detail-form 
            :formDatas="formDatas"
            btnName="统计"
            :btnWidth="30"
            :formItemList="formItemList"
            @getFormData="handleQuery"
            @setDay="setDay"
            @setWeek="setWeek"
            @setMonth="setMonth"
            @setTriduum="setTriduum"
            @setHebdomad="setHebdomad"></detail-form>
                
    <div class="footer-from" >
        <p slot="title" class="cardTitle annual">
            <span>销售出票汇总</span>
        </p>   

    <table id="customers" >
      <tr>
          <th>服务商名称</th>
          <th>分销商名称</th>
          <th>产品名称</th>
          <th>单价</th>
          <th>数量</th>
          <th>优惠数量</th>
          <th>佣金</th>
          <th>总金额</th>
      </tr>

      <tr  v-for="(item,index) in trtDList" :key="index">
          <td >{{item.SZSCENICNAME}}</td>
          <td>{{item.CORPNAME}}</td>
          <td>{{item.SZTICKETTYPENAME}}</td>
          <td>{{item.PRIC}}</td>
          <td>{{item.NUMB}}</td>
          <td>{{item.YHNUMB}}</td>
          <td>{{item.COMMISION}}</td>
          <td>{{(item.AMNT - item.COMMISION).toFixed(2)}}</td>
      </tr>

      <!-- <tr class="alt">
          <td></td>
          <td></td>
          <td colspan="2">小计</td>
          <td>{{numberAmount}}</td>
          <td>{{discountAmount}}</td>
          <td></td> 
          <td>￥{{aggregateAmount}}</td>
      </tr>

      <tr>
          <td></td>
          <td colspan="3">合计</td>
          <td>{{numberAmount}}</td>
          <td>{{discountAmount}}</td>
          <td></td>
          <td>￥{{aggregateAmount}}</td>
      </tr> -->

      <tr class="alt">
          <td colspan="4">总计</td>
          <td>{{numberAmount.toFixed(0)}}</td>
          <td>{{discountAmount.toFixed(0)}}</td>
          <td>{{commission.toFixed(2)}}</td>
          <td>{{aggregateAmount.toFixed(2)}}</td>
      </tr>

    </table>
    </div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      currentSelectionDate: "", //当前选择日期
      currentEndDate: "", //当前结束日期
      userNameId: "",
      numberAmount: 0,
      commission: 0,
      discountAmount: 0,
      aggregateAmount: 0,
      NUMBList: "",
      trtDList: "",
      isShow: false,
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
        val2: "",
        val3: new Date(),
        val4: new Date()
      },
      formItemList: [
        {
          label: "",
          type: 2,
          keyName: "val1",
          class: "width",
          labelWidth: 1,
          optionList: [
            {
              value: 0,
              label: "指定年份"
            },
            {
              value: 1,
              label: "指定月份"
            },
            {
              value: 2,
              label: "指定日期段"
            }
          ]
        },
        {
          keyNameStart: "val3",
          keyNameEnd: "val4",
          type: 5,
          label: "从",
          labelWidth: 20,
          class: "width",
          double: true
          // isShowOptions:true
        }
      ]
    };
  },
  created() {
    this.ordersAxios();
  },
  methods: {

    ordersAxios() {
      this.isShowLoading = true;
      let token = sessionStorage.getItem("name");
      let usidName = sessionStorage.getItem("userName");
      let date = new Date();
      this.formDatas.val3 = date;
      let newDate = date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
      this.$http
        .post(
          this.baseURL +
            "/ec/allOrderManage/v1/querytorderSaleCount?access_token=" +
            token +
            "&usid=" +
            usidName,
          {
            startDate: new Date(newDate).format("yyyy-MM-dd"),
            endDate: new Date(this.formDatas.val4).format("yyyy-MM-dd"),
            radiobutton2: this.formDatas.val1
          }
        )
        .then(response => {
          this.userNameId = sessionStorage.getItem("userName");
          let tdlblistOptionList = response.data.data.list;
          this.trtDList = response.data.data.list;
          let firstTrtList = response.data.data.list;
          this.currentSelectionDate = new Date(this.formDatas.val3).format("yyyy-MM-dd");
          this.currentEndDate = new Date(this.formDatas.val4).format("yyyy-MM-dd");
          for (let i = 0; i < firstTrtList.length; i++) {
            this.numberAmount += firstTrtList[i].NUMB; //数量
            this.discountAmount += firstTrtList[i].YHNUMB; //优惠数量
            this.commission += firstTrtList[i].COMMISION; //佣金
            this.aggregateAmount += firstTrtList[i].AMNT - firstTrtList[i].COMMISION.toFixed(2); //总金额
          }

          this.isShowLoading = false;
          return;
        })
        .catch(error => {
          this.isShowLoading = false;
          return;
        });
    },


    handleQuery() {
      this.isShowLoading = true;
      this.currentSelectionDate = new Date(this.formDatas.val3).format("yyyy-MM-dd");
      this.currentEndDate = new Date(this.formDatas.val4).format("yyyy-MM-dd");
      if (this.currentEndDate < this.currentSelectionDate) {
        this.$Modal.error({
          title: "温馨提示",
          content: "结束日期不能小于当前日期"
        });

        this.isShowLoading = false;
        return;
      }
      let radioBtn = this.formDatas.val1;
      let ddztName = this.formDatas.val2;
      let token = sessionStorage.getItem("name");
      let usid = sessionStorage.getItem("userName");
      let url = window.location.host;
      this.$http
        .post(
          this.baseURL +
            "/ec/allOrderManage/v1/querytorderSaleCount?access_token=" +
            token +
            "&usid=" +
            usid +
            "&url=" +
            url,
          {
            startDate: new Date(this.formDatas.val3).format("yyyy-MM-dd"), //开始日期
            endDate: new Date(this.formDatas.val4).format("yyyy-MM-dd"), // 结束日期
            radiobutton2: this.formDatas.val1
          }
        )
        .then(response => {
          
          let tdlblistOptionList = response.data.data.list;
          this.trtDList = response.data.data.list;
          let firstTrtList = response.data.data.list;
          this.numberAmount = 0;
          this.discountAmount = 0;
          this.commission = 0;
          this.aggregateAmount = 0;
          for (let i = 0; i < firstTrtList.length; i++) {
            this.numberAmount += firstTrtList[i].NUMB; //数量
            this.discountAmount += firstTrtList[i].YHNUMB; //优惠数量
            this.commission += firstTrtList[i].COMMISION; //佣金
            this.aggregateAmount += firstTrtList[i].AMNT - firstTrtList[i].COMMISION.toFixed(2); //总金额
          }
          if (response.data.code === 400) {
            this.$Modal.error({
              title: "温馨提示",
              content: response.data.msg
            });
          } else if (response.data.code === 500) {
            this.$Modal.error({
              title: "温馨提示",
              content: response.data.msg
            });
          } else if (response.data.code === 404) {
            this.$Modal.error({
              title: "温馨提示",
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
    }
  }
};
</script>
<style scoped>
.cardTitle1 {
  font-size: 17px;
  font-weight: 600;
  color: #2d8cf0;
}
.annual {
  text-align: center;
}
.annual > span {
  float: inherit;
  font-weight: 600;
}
.footer-btn {
  font-size: 16px;
  color: #4e81f0;
}
.cardTitle {
  font-size: 16px;
}
.footer-text-block {
  text-align: center;
  margin: 15px 0;
  width: 100%;
  font-size: 16px;
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
  font-size: 16px;
}

#customers td,
#customers th {
  font-size: 1em;
  border: 1px solid #e8eaec;
  padding: 15px 7px;
  font-size: 14px;
}

#customers th {
  text-align: center;
  padding: 15px 7px;
  background-color: #f8f8f9;
  color: #515a6e;
}

#customers tr.alt td {
  color: #000000;
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
</style>
