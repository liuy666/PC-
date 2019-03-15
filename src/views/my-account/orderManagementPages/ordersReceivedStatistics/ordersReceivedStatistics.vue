<template>
    <div class="distributionSummary">
    <template v-if="isShowLoading">
            <loading></loading>
    </template>

                <Dropdown trigger="custom" :visible="visible" style="margin-left: 20px">

                <DropdownMenu slot="list">
                    <p>常用于各种自定义下拉内容的场景。</p>
                    <div style="text-align: right;margin:10px;">
                        <Button type="primary" @click="handleClose">关闭</Button>
                    </div>
                </DropdownMenu>
            </Dropdown>


    <detail-form 
    :isListPage="true"
    :formDatas="formDatas"
    btnName="统计"
    :formItemList="formItemList"
    @getFormData="handleQuery"></detail-form>
                
            最新更新时间：<DatePicker :value="valueDateOne" format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 200px"></DatePicker> 至
            <DatePicker :value="valueDateTwo" format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 200px"></DatePicker>

            <template >
                <a class="float" @click="setDay">[近三天]</a>
                <a class="float" @click="setWeek">[近一周]</a>
                <a class="float" @click="setMonth">[近一月]</a>
                <a class="float" @click="setTriduum">[未来三天]</a>
                <a class="float" @click="setHebdomad">[未来一周]</a>
            </template>
 
    <div class="footer-form" v-show="isShow" >
        <p slot="title" class="cardTitle annual">
            <span>订单统计报表</span>
        </p>   
        <p slot="title" class="cardTitle">
            <span>订单明细：日期为：2018-07-24 到 2018-07-24</span>
        </p>        
        <p slot="title" class="cardTitle">
            <span>编制单位：环球雅途旅业控股集团有限公司</span>
        </p>
    <table id="customers">
    <tr>
        <th>服务商名称</th>
        <th>产品类别</th>
        <th>产品名称</th>
        <th>单价</th>
        <th>数量</th>
        <th>优惠数量</th>
        <th>总金额</th>
    </tr>

    <tr>
        <td rowspan="3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>

    <tr class="alt">
        <td></td>
        <td colspan="2">类别小计</td>
        <td></td>
        <td>0</td>
        <td>0</td>
    </tr>

    <tr>
        <td colspan="3">服务商小计</td>
        <td></td>
        <td>0</td>
        <td>0</td>
    </tr>

    <tr class="alt">
        <td colspan="4">总合计</td>
        <td>0</td>
        <td>0</td>
        <td></td>
    </tr>

    </table>
        <div class="footer-text-block">
        <div class="footer-text">
            <span class="touching">制单：</span>
            <span class="audit">审核：</span>
        </div>
        <div class="print-time">
            <span class="print">打印时间：2018-07-24 15:15:21</span>
        </div><br/>
    <Button type="text" class="footer-btn">存为Excel</Button>
    </div>
    </div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      isShow: false,
      valueDateOne: new Date(),
      valueDateTwo: new Date(),
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
        val1: "",
        val2: "",
        val3:'',
      },
      formItemList: [
        {
          label: "",
          type: 2,
          keyName: "val1",
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
            }
          ]
        },
        {
          label: "服务商",
          type: 1,
          keyName: "val2"
        },
        {
          keyName: "val3",
          type: 4,
          label: "订单状态",
          optionList: []
        }
      ]
    };
  },
  created() {
    this.ordersAxios();
  },
  methods: {
    ordersAxios() {
      this.$http
        .get(this.baseURL + "/ec/orderManage/v1/orderCount", {
          params: {
            access_token: sessionStorage.getItem("name"),
            usid: sessionStorage.getItem("userName"),
            url: window.location.host
          }
        })
        .then(response => {
          
          let itemOptionList = response.data.data.ddztlist; //订单状态
          this.formItemList[2].optionList = itemOptionList.map(item => {
            return {
              value: item.pmcd,
              label: item.pmva
            };
          });
        })
        .catch(error => {
          
        });
    },


    handleQuery() {
    let radioBtn = this.formDatas.val1;
    let noteName = this.formDatas.val2;
    let ddztName = this.formDatas.val3;
      let token = sessionStorage.getItem("name");
      let usid = sessionStorage.getItem("userName");
      let url = window.location.host;
      this.$http.post(this.baseURL + "/ec/orderManage/queryOrderList?access_token=" +
            token +
            "&usid=" +
            usid +
            "&url=" +
            url,
          {
            startDate: "2018-07-01", //开始日期
            endDate: "2018-08-01", // 结束日期
            ddzt: ddztName,
            iscenicid: 9999,
            radiobutton2: radioBtn,
            note: noteName
          }
        )
        .then(response => {
            this.isShow = true
          
        })
        .catch(error => {
          
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
      this.valueDateOne = date;
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 3);
      return date;
      this.$emit("setDay");
    },
    // 设置近一周
    setWeek(e) {
      const date = new Date();
      this.valueDateOne = date;
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
      this.$emit("setWeek");
    },
    // 设置近一月
    setMonth(e) {
      const date = new Date();
      this.valueDateOne = date;
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
      return date;
      // e.preventDefault();
      this.$emit("setMonth");
    },
    // 未来三天
    setTriduum(e) {
      const date = new Date();
      this.valueDateTwo = date;
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
      this.valueDateOne = new Date();
      return date;
      // e.preventDefault();
      this.$emit("setMonth");
    },
    // 未来一周
    setHebdomad(e) {
      const date = new Date();
      this.valueDateTwo = date;
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
      this.valueDateOne = new Date();
      return date;
      // e.preventDefault();
      this.$emit("setMonth");
    },

    
  }
};
</script>

<style>
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
  text-align: right;
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
  border: 1px solid #98bf21;
  padding: 3px 7px 2px 7px;
}

#customers th {
  font-size: 1.1em;
  text-align: left;
  padding-top: 5px;
  padding-bottom: 4px;
  background-color: #a7c942;
  color: #ffffff;
}

#customers tr.alt td {
  color: #000000;
  background-color: #eaf2d3;
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
</style>
