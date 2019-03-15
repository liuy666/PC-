
<template>
  <!-- 结算周期 -->
    <Modal v-model="model.isCycleModifi" :styles="{width: '700px!important'}" :closable="false" :mask-closable="false">
        <div >
            <div class="AdjustCredit">
                <div class="title">
                    <span class="tit">结算周期</span>
                </div>
                <div class="body">
                    <div class="bodyTit" >
                        <Row>
                            <Col span="4">
                            <span>结算时间：</span>
                            </Col>
                            <Col span="20">
                                <RadioGroup v-model="vertical" @on-change="change_vertical">
                                    <Radio label="WEEK" :style="{marginBottom:'10px'}">
                                    <span>每周结算:</span>
                                    <span>
                                        <CheckboxGroup v-model="selectTime.week" >
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
                                    <Radio label="MONTH" :style="{marginBottom:'20px'}">
                                        <span>每月结算:</span>
                                        <div class="ul" v-if="disable.isMonth" :style="{fontSize:'12px'}">
                                            <span ref="mySpan" v-for="n in day" :key="n" :style="{cursor:'not-allowed',width:n===32?'84px':'42px'}">{{n===32?'月末最后一天':n}}</span>
                                        </div>
                                        <div class="ul" v-else :style="{fontSize:'12px'}">
                                            <span  ref="mySpan" v-for="n in day" :key="n" :style="{width:n===32?'84px':'42px'}" @click="getDay" >{{n===32?'月末最后一天':n}}</span>
                                        </div>
                                    </Radio>
                                    <Radio label="YEAR" >
                                        <span>每年结算:</span>
                                    </Radio>   
                                    <Select v-model="selectMonth" size="small" :style="{width:'80px'}" @on-change="selectDayFn" :disabled="disable.isYear">
                                        <Option v-for="item in monthArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <span :style="{marginLeft:'5px'}">月</span>
                                    <Select v-model="selectDay" size="small" :style="{width:'80px',marginLeft:'20px'}" :disabled="disable.isYear">
                                        <Option v-for="item in dayArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <span :style="{marginLeft:'5px'}">日</span>
                                    <span v-if="!disable.isYear" :style="{marginLeft:'10px',color:'#4e81f0',cursor:'pointer'}" @click="addDate">保存</span> 
                                </RadioGroup>  
                                 <ul>
                                    <li :style="{marginLeft:'90px',lineHeight:'30px'}" v-for="i in selectTime.year" :key="i">{{i}}<span @click="deleYear(i)" :style="{color:'red',marginLeft:'10px'}">删除</span></li>
                                </ul>
                            </Col>
                        </Row>  
                    </div>
            
                </div>
                
            </div>
        </div>
        <div slot="footer">
             <Row >
                <Col span="24" style="text-align:center">
                    <Button  shape="circle" :style="[styleW,styleR]"  @click="cacle">取消</Button>
                    <Button type="primary" shape="circle" :style="styleW80" @click="sure">确认调整</Button>
                </Col>
            </Row>
        </div>
    </Modal>
</template>

<script>

export default {
  props: {
    isCycleModifi: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      styleW: { width: '60px', height: '30px' },
      styleW80: { width: '80px', height: '30px' },
      styleR: { marginRight: '10px' },
      token: sessionStorage.getItem("name"),
      model: {
        isCycleModifi: false
      },
      vertical: '', // 结算时间
      selectTime: {
        week: [], // 结算时间--周
        days: [], // 结算时间--月
        year: [] // 每年结算--月-日
      },
      disable: {
        isWeek: true,
        isMonth: true,
        isYear: true
      },
      selectMonth: '', // 每年结算--选择月
      selectDay: '', // 每年结算--选择日
      dayArr: [] // 根据月份判断出天数数组
    };
  },
  watch: {
    isCycleModifi (TF) {
      this.model.isCycleModifi = TF;
    },
    info: {
      handler (newValue) {
        if (Object.keys(newValue).length !== 0) {
          this.defalueVal();
        }
      },
      deep: true
    }
  },
  computed: {
    // 结算时间--月
    day: function () {
      return 32
      // var curDate = new Date();
      // var curMonth = curDate.getMonth();
      // curDate.setMonth(curMonth + 1);
      // curDate.setDate(0);
      // return curDate.getDate();
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
    defalueVal () {
      if (this.info.settlementCycle) {
        var objWeek = [
          { key: '周一', val: '1' },
          { key: '周二', val: '2' },
          { key: '周三', val: '3' },
          { key: '周四', val: '4' },
          { key: '周五', val: '5' },
          { key: '周六', val: '6' },
          { key: '周日', val: '7' }
        ];
        var typeArr = this.info.settlementCycle.split('：');
        switch (typeArr[0]) {
          case '每周结算':
            for (const w of typeArr[1].split(', ')) {
              for (const item of objWeek) {
                if (w.trim() === item.key) {
                  this.selectTime.week.push(item.val);
                }
              }
            }
            this.disable.isWeek = false;
            this.vertical = 'WEEK';
            break;
          case '每月结算':
            this.selectTime.days = [];
            typeArr[1].split(',').map((item) => {
              item = item.replace('日', '');
              this.selectTime.days.push(item);
            });

            var lis = this.$refs.mySpan;
            for (const el of lis) {
              for (const day of this.selectTime.days) {
                if (el.innerText === day) {
                  el.style.color = '#fff';
                  el.style.backgroundColor = '#4e81f0';
                  el.setAttribute('isCheck', 'true');
                }
              }
            }
            this.disable.isMonth = false;
            this.vertical = 'MONTH';
            break;
          case '每年结算':
            this.selectTime.year = typeArr[1].split(',');
            this.disable.isYear = false;
            this.vertical = 'YEAR';
            break;
        }
      }
    },
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
    // 取消
    cacle () {
      this.model.isCycleModifi = false;
      this.selectTime.year = [];
      this.selectTime.week = [];
      this.selectTime.days = [];
      this.defalueVal();
      this.$emit('isCycleModifiFn', this.model.isCycleModifi);
    },
    // 确认修改周期
    async sure () {
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
      }

      try {
        var url = `${this.fm}/finance/credit/creditAccounts/${this.info.marketplaceId}/${this.info.merchantId}/${this.info.id}`;
        url += '?' + this.QS.stringify({
          access_token: this.token,
          warningAmount: this.info.warnMoney, // 授信预警值
          settlementRange: this.info._cycle, // 结算范围
          settlementCycle: [...new Set(cycleTime)].toString(), // 结算周期
          settlementType: this.vertical, // 结算类型  WEEK MONTH YEAR
          marketPlaceList: this.info._marketPlaceList
        });
        this.$http.put(url).then(res => {
          var data = res.data;
          if (data.return_code === 'SUCCESS') {
            this.model.isCycleModifi = false;
            this.$emit('isCycleModifiFn', this.model.isCycleModifi);
          } else if (data.return_code === 'FAIL') {
            this.$Modal.warning({
              title: '温馨提示',
              content: data.return_msg
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
.AdjustCredit {
  background: #fff;
  .title {
    line-height: 60px;
    width: 100%;
    background: #eef2fb;
    color: #1c2438;
    font-size: 16px;
    text-indent: 20px;
  }
  .body {
    .bodyTit {
      color: #666666;
      padding: 30px 50px;
      text-align: left;
    }
  }
}
//复选框样式
.ivu-checkbox-group {
  display: inline-block;
  margin-left: 15px;
}

.ul {
  overflow: hidden;
  margin-left: 18px;
  margin-top: 5px;
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



