<template>
    <div class="distributionSummary">
    <template v-if="isShowLoading">
            <loading></loading>
    </template>
                <Breadcrumb separator=">" :style="{margin: '24px 0'}">
                    <BreadcrumbItem>我的账户</BreadcrumbItem>
                    <BreadcrumbItem>统计分析</BreadcrumbItem>
                    <BreadcrumbItem>销售退款订单统计</BreadcrumbItem>
                </Breadcrumb>


        <detail-form 
            :isListPage="true"
            :formDatas="formDatas"
            btnName="统计"
            :formItemList="formItemList"
            :btnWidth="1"
            @getFormData="handleQuery"
            @setDay="setDay"
            @setWeek="setWeek"
            @setMonth="setMonth"
            @setTriduum="setTriduum"
            @setHebdomad="setHebdomad"></detail-form>
                
    <div class="footer-from" >
        <p slot="title" class="cardTitle annual">
            <span>销售退款订单统计</span>
        </p>   

    <table id="customers">
      <tr>
          <th>服务商名称</th>
          <th>产品名称</th>
          <th>单价</th>
          <th>退订数量</th>
          <th>退订优惠数量</th>
          <th>退订金额</th>
          <th>退订手续费</th>
          <th>实退订金额</th>
      </tr>
      <tr class="alt" v-for="(item,index) in tableList" :key="index">
          <td>{{item.strpdno}}</td>
          <td>{{item.strprno}}</td>
          <td>{{item.pric}}</td>
          <td>{{item.numb}}</td>
          <td>{{item.yhnumb}}</td>
          <td>{{item.amnt}}</td>
          <td>{{item.mhandcharge}}</td>
          <td>{{item.amnt - item.yhamnt.toFixed(2)}}</td>
      </tr>
      <tr>
          <td></td>
          <td colspan="2">服务商小计</td>
          <td>{{unsubscribeNumber}}</td>
          <td>{{discountQuantityReturned}}</td>
          <td>{{unsubscribeAmount}}</td>
          <td>{{cancellationFee}}</td>
          <td>{{actualAmount}}</td>
          
      </tr>
      <tr class="alt" v-for="(item,index) in tableList2" :key="index">
          <td>{{item.strpdno}}</td>
          <td>{{item.strprno}}</td>
          <td>{{item.zpric}}</td>
          <td>{{item.znumb}}</td>
          <td>{{item.zyhnumb}}</td>
          <td>{{item.zamnt}}</td>
          <td>{{item.mhandcharge}}</td>
          <td>{{item.zamnt - item.zyhamnt.toFixed(2)}}</td>
      </tr>
      <tr>
          <td></td>
          <td colspan="2">服务商小计</td>
          <td>{{unsubscribeNumberJ}}</td>
          <td>{{discountQuantityReturnedJ}}</td>
          <td>{{unsubscribeAmountJ}}</td>
          <td>{{cancellationFeeJ}}</td>
          <td>{{actualAmountJ}}</td>
      </tr>
      <tr class="alt">
          <td colspan="3">总计</td>
          <td>{{unsubscribeNumber + unsubscribeNumberJ}}</td>
          <td>{{discountQuantityReturned + discountQuantityReturnedJ}}</td>
          <td>{{unsubscribeAmount + unsubscribeAmountJ}}</td>
          <td>{{cancellationFee + cancellationFeeJ}}</td>
          <td>{{actualAmount + actualAmountJ}}</td>
      </tr>
    </table>
    </div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      userNameId:'',
      discountQuantityReturnedJ:0,
      actualAmountJ:0,
      cancellationFeeJ:0,
      unsubscribeAmountJ:0,
      unsubscribeNumberJ:0,

      discountQuantityReturned:0,
      actualAmount:0,
      cancellationFee:0,
      unsubscribeAmount:0,
      unsubscribeNumber:0,

      currentSelectionDate:'',//当前选择日期
      currentEndDate:'',//当前结束日期
      tableList:'',
      tableList2:'',
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
        val3: new Date(),
        val4: new Date(),
        val5: "",
        val6: "99",
        val7: 2,
      },
      formItemList: [
        {
          keyName: "val2",
          type: 4,
          class:'width',
          labelWidth:88,
          label: "退订类别",
          optionList: []
        },
        {
          keyName: "val6",
          type: 4,
          class:'width',
          labelWidth:200,
          label: "退订方式",
          optionList: []
        },
        {
          label: "",
          type: 2,
          keyName: "val1",
          class:'width',
          labelWidth:8,
          optionList: [
            {
              value: 0,
              label: "按首日游览日期查询"
            },
            {
              value: 1,
              label: "按退订日期查询"
            },
          ]
        },
        {
          label: "",
          type: 2,
          keyName: "val7",
          class:'width',
          labelWidth:115,
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
          keyName: "val5",
          type: 4,
          class:'width',
          labelWidth:1,
          label: "",
          optionList: []
        },
        {
          keyNameStart: "val3",
          keyNameEnd: "val4",
          type: 5,
          label: "从",
          labelWidth:50,
          class:'width',
          double: true,
          isShowOptions:true
        },
        
      ]
    };
  },
  created() {
    this.ordersAxios();
  },
  methods: {
    ordersAxios() {
          this.isShowLoading = true;
      this.$http
        .get(this.baseURL + "/ec/cancelOrder/searchCancelOrder", {
          params: {
            access_token: sessionStorage.getItem("name"),
            usid: sessionStorage.getItem("userName"),
            // url: window.location.host,
            page:'1',
          }
        })
        .then(response => {
          
          this.userNameId = sessionStorage.getItem("userName")
          let date = new Date();
          this.formDatas.val3 = date;
          let newDate =  date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
          this.currentSelectionDate =  new Date(newDate).format("yyyy-MM-dd");
          this.currentEndDate =  new Date(this.formDatas.val4).format("yyyy-MM-dd");
          let tdlblistOptionList = response.data.data.tdlblist; 
          let tpfslistList = response.data.data.tpfslist;
          let childCustomList = response.data.data.childCustom;
          this.formItemList[0].optionList = tdlblistOptionList.map(item => {//订单类别
            return {
              value: item.pmcd,
              label: item.pmva
            };
          });
          this.formItemList[1].optionList = tpfslistList.map(item => {//退订方式
            return {
              value: item.pmcd,
              label: item.pmva
            };
          })
          this.formItemList[4].optionList = childCustomList.map(item => {//指定用户
            return {
              label: item.lname,
              value: item.usid
            };
          })
          
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
      this.currentSelectionDate =  new Date(this.formDatas.val3).format("yyyy-MM-dd");
      this.currentEndDate =  new Date(this.formDatas.val4).format("yyyy-MM-dd");
      if(this.currentEndDate < this.currentSelectionDate) {
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
      this.$http.post(this.baseURL + "/ec/cancelOrder/cancelcountquery?access_token=" +
            token +
            "&usid=" +
            usid +
            "&url=" +
            url,
          {
            startDate: new Date(this.formDatas.val3).format("yyyy-MM-dd"), //开始日期
            endDate: new Date(this.formDatas.val4).format("yyyy-MM-dd"),// 结束日期
            radiobutton2: this.formDatas.val1,
            radiobutton1:this.formDatas.val7,
            childCustom:this.formDatas.val5,
            tdlb:99,
            tpfs:99,
          }
        )
        .then(response => {
          this.tableList = response.data.data.list;
          this.tableList2 = response.data.data.list2;
          let forTableList = response.data.data.list;
          let forTableList2 = response.data.data.list2;
          
          this.unsubscribeNumber = 0;
          this.discountQuantityReturned = 0;
          this.unsubscribeAmount = 0;
          this.cancellationFee = 0;
          this.actualAmount = 0;

          this.unsubscribeNumberJ = 0;
          this.discountQuantityReturnedJ = 0;
          this.unsubscribeAmountJ = 0;
          this.cancellationFeeJ = 0;
          this.actualAmountJ = 0;

          for(let i = 0; i < forTableList.length; i++) {
            this.unsubscribeNumber += forTableList[i].numb;//退订数量
            this.discountQuantityReturned += forTableList[i].yhnumb//退订优惠数量
            this.unsubscribeAmount += forTableList[i].amnt;//退订金额
            this.cancellationFee += forTableList[i].mhandcharge//退订手续费
            this.actualAmount += forTableList[i].amnt - forTableList[i].yhamnt//实退订金额 - yhamnt
          }
            for(let j = 0; j < forTableList2.length; j++) {
              this.unsubscribeNumberJ +=  forTableList2[j].znumb//退订数量
              this.discountQuantityReturnedJ +=  forTableList2[j].zyhnumb //退订优惠数量
              this.unsubscribeAmountJ +=  forTableList2[j].zamnt//退订金额
              this.cancellationFeeJ +=  forTableList2[j].mhandcharge//退订手续费
              this.actualAmountJ += forTableList2[j].zamnt - forTableList2[j].zyhamnt //实退订金额 - yhamnt
            }
          this.isShowLoading = false;
          return;
        })
        .catch(error => {
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

.cardTitle1 {
  font-size: 17px;
  font-weight: 600;
  color: #4e81f0;
}
.annual {
    text-align: center;
}
.annual > span {
    float: inherit;
    font-weight: 600
}
.footer-btn {
    font-size: 16px;
    color: #4E81F0
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
.footer-text-block span {
  margin-right: 25px;
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
  padding: 15px 7px ;
  font-size: 14px;
}

#customers th {
  text-align: center;
  padding: 15px 7px ;
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
.footer-from span {
  color: black
}
</style>
