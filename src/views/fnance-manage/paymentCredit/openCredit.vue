
<template>
<div>
  <Row>
      <Card>
           <Breadcrumb separator=">" :style="{margin: '24px 0'}">
              <BreadcrumbItem>我的账户</BreadcrumbItem>
              <BreadcrumbItem>财务管理</BreadcrumbItem>
              <BreadcrumbItem>授信账户</BreadcrumbItem>
              <BreadcrumbItem>开通授信账户</BreadcrumbItem>
          </Breadcrumb>
        <Row :style="{borderBottom:'1px dashed #dcdee2',paddingLeft:'100px'}">
            <Col span="24" :style="{marginTop:'20px'}">
                <span>用户编号：</span>
                <span >{{this.$route.query.usid?this.$route.query.usid:''}}</span>
            </Col>
            <Col span="24" :style="{marginBottom:'20px',marginTop:'20px'}">
                <span>用户昵称：</span>
                <span >{{this.$route.query.userName?this.$route.query.userName:''}}</span>
            </Col>
            <Col span="24" :style="{marginBottom:'20px'}">
                <span>公司名称：</span>
                <span >{{this.$route.query.corpname?this.$route.query.corpname:''}}</span>
            </Col>
        </Row>
        <Row :style="{borderBottom:'1px dashed #dcdee2',paddingLeft:'100px',marginTop:'20px'}">
          <Col span="24" :style="{marginBottom:'20px'}">
              <span>授信金额：</span>
              <span>{{credit.val}}</span>
               <!-- <Input-number :min="0" :max="9999999" v-model="credit.val" :style="style"></Input-number> -->
          </Col>
          <Col span="24" :style="{marginBottom:'20px',marginTop:'20px'}">
              <span>余额预警值：</span>
               <Input-number :min="0" :max="9999999" v-model="credit.warmVal" placeholder="请输入余额预警值" :style="style"></Input-number>
          </Col>
      </Row>
      <Row :style="{marginTop:'20px',fontSize:'16px',borderBottom:'1px dashed #DBDBDE',paddingLeft:'100px'}" >
          <Col span="24" :style="{textAlign:'left',marginBottom:'10px',position:'relative',zIndex:'2'}" >
          <span :style="{fontSize:'14px',marginRight:'15px'}">结算范围：</span>
          <RadioGroup v-model="payRange" >
            <Radio label="PAIED">已支付订单</Radio>
            <Radio label="VERIFICATION">已核销订单</Radio>
          </RadioGroup>
          </Col>
          <Col span="24" :style="{textAlign:'left',marginBottom:'10px',position:'relative',zIndex:'2',width:'500px'}" >
            <Row>
                <Col span="4" :style="{fontSize:'14px'}">结算时间:</Col>
                <Col span="20">
                  <RadioGroup v-model="vertical" @on-change="change_vertical" >
                      <Radio label="WEEK" :style="{marginBottom:'10px'}">
                          <span>每周结算:</span>
                          <span>
                          <CheckboxGroup v-model="selectTime.week">
                              <Checkbox :disabled="disable.isWeek" label="1">周一</Checkbox>
                              <Checkbox :disabled="disable.isWeek" label="2">周二</Checkbox>
                              <Checkbox :disabled="disable.isWeek" label="3">周三</Checkbox>
                              <Checkbox :disabled="disable.isWeek" label="4">周四</Checkbox>
                              <Checkbox :disabled="disable.isWeek" label="5">周五</Checkbox>
                              <Checkbox :disabled="disable.isWeek" label="6">周六</Checkbox>
                              <Checkbox :disabled="disable.isWeek" label="7">周日</Checkbox>
                          </CheckboxGroup>
                          </span>       
                      </Radio>
                      <Radio label="MONTH" :style="{marginBottom:'10px'}">
                          <span>每月结算:</span>
                          <div class="ul" v-if="disable.isMonth" :style="{fontSize:'12px'}">
                              <span ref='mySpan' v-for="n in day" :key="n" :style="{cursor:'not-allowed',width:n===32?'84px':'41px'}">{{n===32?'月末最后一天':n}}</span>
                          </div>
                          <div class="ul" v-else :style="{fontSize:'12px'}">
                              <span ref='mySpan' v-for="n in day" :key="n" @click="getDay" :style="{width:n===32?'84px':'41px'}">{{n===32?'月末最后一天':n}}</span>
                          </div>
                      </Radio>
                      <Radio label="YEAR" >
                          <span>每年结算:</span> 
                      </Radio> 
                      <Select v-model="selectMonth" size="small" :style="{width:'80px'}" @on-change="selectDayFn"  :disabled="disable.isYear">
                        <Option v-for="item in monthArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                      <span :style="{marginLeft:'5px'}">月</span>
                      <Select v-model="selectDay" size="small" :style="{width:'80px',marginLeft:'20px'}" :disabled="disable.isYear" >
                          <Option v-for="item in dayArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                      <span :style="{marginLeft:'5px'}">日</span>
                      <span v-if="!disable.isYear" :style="{marginLeft:'10px',color:'#4e81f0',cursor:'pointer',fontSize:'14px'}" @click="addDate">保存</span>   
                  </RadioGroup>  
                  <ul :style="{ maxHeight: '300px',overflow: 'auto', paddingRight: '20px',marginBottom:'15px' }">
                    <li :style="{marginLeft:'90px',lineHeight:'40px'}" v-for="i in selectTime.year" :key="i">{{i}}<span @click="deleYear(i)" :style="{color:'red',marginLeft:'10px',cursor:'pointer'}">删除</span></li>
                  </ul>   
              </Col>
            </Row>  
          </Col>
        </Row> 
        <Row :style="{marginTop:'20px',fontSize:'16px',textAlign:'center'}" >
            <Button type="primary" shape="circle" :style="[styleW,styleR]" @click="save">提交</Button>
            <Button  shape="circle" :style="[styleW]" @click="$router.back(-1)" >取消</Button>
        </Row>
    </Card>
  </Row>
</div>
</template>
<script>
export default {
  data () {
    return {
      style: { width: '220px', marginLeft: '10px' },
      styleW: { width: '60px', height: '30px' },
      styleR: { marginRight: '10px' },
      token: sessionStorage.getItem("name"),
      btnList: [
        {
          type: 1,
          btnlabel: '刷新'
        }
      ],
      model: {
        isopenCredit: false
      },
      credit: {
        val: 0, // 授信余额
        warmVal: 0, // 授信预警值
        user: ''
      },
      payRange: '', // 结算范围
      vertical: '', // 结算时间--类型
      disable: {
        isWeek: true,
        isMonth: true,
        isYear: true
      },
      selectTime: {
        week: [], // 结算时间--周
        days: [], // 结算时间--月
        year: [] // 每年结算--月-日
      },
      selectMonth: '', // 每年结算--选择月
      selectDay: '', // 每年结算--选择日
      dayArr: [] // 根据月份判断出天数数组
    };
  },
  computed: {
    // 结算时间--月
    day: function () {
      return 32;
    },
    // 每年结算--选择月
    monthArr: function () {
      var arr = [];
      for (var i = 1; i < 13; i++) {
        arr.push({
          value: i < 10 ? '0' + i : i,
          label: i < 10 ? '0' + i : i
        });
      }
      return arr;
    }
  },
  methods: {
    // 结算时间--月
    getDay (event) {
      var el = event.currentTarget;
      var elVal = el.innerText;
      if (el.getAttribute('isCheck') && el.getAttribute('isCheck') === 'true') {
        el.style.color = '';
        el.style.backgroundColor = '';
        el.setAttribute('isCheck', 'false');
        var index = this.selectTime.days.indexOf(elVal);
        if (index > -1) {
          this.selectTime.days.splice(index, 1);
        }
      } else {
        el.style.color = '#fff';
        el.style.backgroundColor = '#4e81f0';
        el.setAttribute('isCheck', 'true');
        this.selectTime.days.push(elVal);
      }
    },
    // 每年结算--选择日
    selectDayFn (month) {
      this.selectDay = '';
      var year = new Date().getFullYear();
      var curDate = new Date(year, month, 0).getDate() + 1;
      var arr = [];
      for (var i = 1; i < curDate; i++) {
        arr.push({
          value: i < 10 ? '0' + i : i,
          label: i < 10 ? '0' + i : i
        });
      }
      this.dayArr = arr;
    },
    // 每年结算--年--添加
    addDate () {
      if (!this.selectMonth) {
        this.$Modal.warning({
          title: '温馨提示',
          content: '请选择月'
        });
        return false;
      }
      if (!this.selectDay) {
        this.$Modal.warning({
          title: '温馨提示',
          content: '请选择日'
        });
        return false;
      }
      this.selectTime.year.push(this.selectMonth + '月' + this.selectDay + '日');
      var noSameEl = [];
      for (var i = 0; i < this.selectTime.year.length; i++) {
        if (noSameEl.indexOf(this.selectTime.year[i]) === -1) {
          noSameEl.push(this.selectTime.year[i]);
        } else {
          this.$Modal.warning({
            title: '温馨提示',
            content: '不能重复保存'
          });
        }
      }
      this.selectTime.year = noSameEl;
      this.selectMonth = '';
      this.selectDay = '';
    },
    // 每年结算--年--删除
    deleYear (i) {
      this.selectTime.year.splice(i, 1);
    },
    // 结算时间结束
    change_vertical (style) {
      switch (style) {
        case 'WEEK':
          this.disable.isWeek = false;
          this.disable.isMonth = true;
          this.disable.isYear = true;
          this.selectTime.days = [];
          var els = this.$refs.mySpan;
          for (const el of els) {
            el.style.color = '';
            el.style.backgroundColor = '';
            el.setAttribute('isCheck', 'false');
          }
          this.selectTime.year = [];
          this.selectMonth = '';
          this.selectDay = '';
          break;
        case 'MONTH':
          this.disable.isWeek = true;
          this.disable.isMonth = false;
          this.disable.isYear = true;
          this.selectTime.week = [];
          this.selectTime.year = [];
          this.selectMonth = '';
          this.selectDay = '';
          break;
        case 'YEAR':
          this.disable.isWeek = true;
          this.disable.isMonth = true;
          this.disable.isYear = false;
          this.selectTime.week = [];
          this.selectTime.days = [];
          var elss = this.$refs.mySpan;
          for (const el of elss) {
            el.style.color = '';
            el.style.backgroundColor = '';
            el.setAttribute('isCheck', 'false');
          }
          break;
      }
    },
    save () {
      if (!this.credit.warmVal) {
        this.$Modal.warning({
          title: '温馨提示',
          content: '余额预警值不能为空'
        });
        return false;
      } else if (!this.payRange) {
        this.$Modal.warning({
          title: '温馨提示',
          content: '请选择结算范围'
        });
        return false;
      } else if (!this.vertical) {
        this.$Modal.warning({
          title: '温馨提示',
          content: '请选择结算时间'
        });
        return false;
      }
      var cycleTime = [];
      if (!this.disable.isWeek) {
        if (this.selectTime.week.length <= 0) {
          this.$Modal.warning({
            title: '温馨提示',
            content: '每周结算：至少保存一个结算日期'
          });
          return false;
        } else {
          cycleTime = this.selectTime.week.sort(function (a, b) { return b < a ? 1 : -1; });
        }
      } else if (!this.disable.isMonth) {
        if (this.selectTime.days.length <= 0) {
          this.$Modal.warning({
            title: '温馨提示',
            content: '每月结算：至少保存一个结算日期'
          });
          return false;
        } else {
          var month = [];
          this.selectTime.days.map((item) => {
            item = item.replace('月末最后一天', 32);
            month.push(parseInt(item));
          });
          // cycleTime = this.selectTime.days;
          cycleTime = month.sort(function (a, b) { return b < a ? 1 : -1; });
        }
      } else if (!this.disable.isYear) {
        if (this.selectTime.year.length <= 0) {
          this.$Modal.warning({
            title: '温馨提示',
            content: '每年结算：至少保存一个结算日期'
          });
          return false;
        } else {
          var time = [];
          this.selectTime.year.map((item) => {
            item = item.replace('月', '/');
            item = item.replace('日', '');
            time.push(item);
          });
          cycleTime = time.sort(function (a, b) { return b < a ? 1 : -1; });
        }
      };
      try {
        var url = `${this.fm}/finance/credit/creditAccounts/${this.$route.query.marketplaceId}/${this.$route.query.merchantId}/${this.$route.query.consumerId}`;
        url += '?' + this.QS.stringify({
          access_token: this.token,
          amount: this.credit.val.toString(),
          warningAmount: this.credit.warmVal.toString(), // 余额预警值
          settlementRange: this.payRange, // 结算范围
          settlementType: this.vertical, // 结算类型  WEEK MONTH YEAR
          settlementCycle: cycleTime.toString(),// 结算周期
          scenicareacode: this.$route.query.scenicareacode,
          agentCode: this.$route.query.agentCode
        });
        this.$http.post(url).then(res => {
          var data = res.data;
          if (data.return_code === 'SUCCESS') {
            this.$router.push({ path: '/credit', query: this.$route.query });
          } else {
            this.$Modal.warning({
              title: '温馨提示',
              content: data.return_msg || data.msg
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

 <style lang="less" scoped>
.ivu-modal-body {
  padding: 0px;
}
//复选框样式
.ivu-checkbox-group {
  display: inline-block;
  margin-left: 15px;
}
.ul {
  overflow: hidden;
  width: 450px;
  margin-left: 20px;
  margin-top: 10px;
  span {
    float: left;
    border: 1px solid #dddddd;
    width: 40px;
    line-height: 30px;
    text-align: center;
  }
}
</style>

<style scoped>
.bodyTit >>> .ivu-radio-wrapper {
  min-height: 30px !important;
}
</style>
