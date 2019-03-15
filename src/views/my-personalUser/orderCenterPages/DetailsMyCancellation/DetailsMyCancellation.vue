<template>
    <div class="MyOrderDetailsPage">

        <template v-if="isShowLoading">
            <loading></loading>
        </template>

        <p slot="title" class="cardTitle">
            <span>我的退订详情</span>
        </p>     
                <div class="non-payment-prompt-message" v-show="offStocks">
            <Row>
                <Col span="12">
                    <span class="prompt-message1">您的订单还未支付！</span>
                    <!-- <span class="prompt-message2">请您在提交订单后0小时{{minutes}}分{{seconds}}秒内支付，否则订单会被自动取消！</span> -->
                    <span class="prompt-message2">订单将在 {{pastDueDate}} 后过期</span>
                </Col>
                <Col span="12">
                    <div class="payment-amount-block">
                        合计：<span class="dollar-sign"><span class="dollar">￥</span>{{amountTotal}}元</span>
                        <Button type="primary" class="btnConfirm" :to="skiprl" target="_blank"  @click="btnPayNow" >立即支付</Button>
                    </div>
                </Col>
            </Row>    
        </div> 
            
        <div class="header-form-text">
            <span class="order-number">订单号：{{orderConfirmationNumber}}</span>
            <span class="order-date">创建时间： {{creationTime}}  {{dateCreated}}</span>
        </div>

        
        <radioTable 
            :colname="colnames"
            :total='total'
            :tableData="tableData"
            :isPage="false"
            :loading="isLoading"></radioTable>

        <!-- <div class="A-refund-of" v-show="refund">已全部退订</div> -->

        <div class="booking-details">
            <p slot="title" class="cardTitle">
                <span>预订信息</span><span class="Due-that">预订说明</span>
            </p>   

            <div class="Way-park">
                入园方式：<span class="Way-park-text">无需取票，凭二维码或身份证直接入园，也可到景区门口指定地点兑票</span>
            </div>
            <div class="effective-date">
                有效日期：<span class="effective-date-text">{{yxrq}}日内有效</span>
            </div>

            <div class="Reservation-form">
                <Row>
                    <Col span="11" >
                        <radioTable 
                            :colname="colnames2"
                            :total='total'
                            :isPage="false"
                            :tableData="tableData2"
                            :loading="isLoading"></radioTable>
                    </Col>
                    <Col span="11" style="float:right">
                        <radioTable 
                            :colname="colnames1"
                            :total='total'
                            :isPage="false"
                            :tableData="tableData1"
                            :loading="isLoading"></radioTable>
                    </Col>
                </Row>
            </div>

            <div class="order-status-block">
                <p slot="title" class="cardTitle">
                    <span>订单状态</span>
                </p>   
                <Steps :current="completeNumber" size="small">
                    <Step title="已下单"></Step>
                    <Step :title="pmvaName"></Step>
                </Steps>
                <div class="underway">
                    <span class="date"> {{creationTime}}  {{dateCreated}}</span>
                </div>
                <div class="floatRight">
                    <span class="date"> {{numberPmva}}</span>
                </div>
            </div>

            <div class="footer-hint-block">
                <span class="friendly-reminder">温馨提醒：</span>
                <span>请不要将银行卡、密码、手机验证码提供给他人</span>
                <span>我们不会通过任何非官方电话、QQ、微博、微信与您联系。任何以预定房间取消，订单取消等理由要求您进行退款或取消订单的都是骗子</span>
                <span>官方客服电话：465163415</span>
            </div>
        </div>

        <!--  修改游玩日期    -->
        <Modal
            v-model="ChangeDateVisit"
            title="修改游玩日期"
            @on-ok="changeDateVisitOk"
            :closable="true"
            :mask-closable="false">
            
                <detail-form 
                    :isListPage="true"
                    :formDatas="formDatas"
                    :formItemList="formItemList2"
                    :isBtn="false"
                    :btnLabelWidth="200"
                    :labelWidth="200"
                    :isHasTable='false'></detail-form>
                    <div class="DateVisit-date">
                    <span>游玩日期：</span><DatePicker type="date" placeholder="请选择时间" :options="startTimeOptions" :value="dateAndTime" @on-change="printingDate" style="width: 200px"></DatePicker>
                  </div>
            <span class="groups-user">温馨提示：游玩日期入园当天不可修改，需提前一天进行修改。</span>
        </Modal>

        <Modal
            v-model="ChangeDateVisitWarmPrompt"
            title="温馨提示"
            :closable="true"
            :mask-closable="false">
            <div class="serial-number subpage">
                <span class="serial-number-content">游玩时间修改成功，请于当日准时入园。</span>
                <span class="serial-number-content orange-hint">如有问题请联系工作人员，或官方客服电话4000-132165131</span>
            </div>
        </Modal>


        <!--  修改取票人信息   -->
        <Modal
            v-model="TicketTakerInformation"
            @on-ok="TicketTakerInformationOk"
            title="修改取票人信息"
            :closable="true"
            :mask-closable="false">
            <div class="serial-number-formCustom">
              <div class="null-block"></div>
                <detail-form 
                    :isListPage="true"
                    :formDatas="formDatas"
                    :formItemList="formItemList"
                    :isBtn="false"
                    :btnLabelWidth="100"
                    :labelWidth="100"
                    :isHasTable='false'></detail-form>
            </div>
        </Modal>

        <Modal
            v-model="TicketTakerInformationWarmPrompt"
            title="温馨提示"
            @on-ok="ModifyTicketHolderInformation"
            :closable="true"
            :mask-closable="false">
            <div class="serial-number subpage">
                <span class="serial-number-content">取票人信息修改成功，</span>
                <span class="serial-number-content">请于入园当日前到所属景区窗口，或者二维码入园。</span>
                <span class="serial-number-content orange-hint">如有问题请联系工作人员，或官方客服电话4000-132165131</span>
            </div>
        </Modal>

        <!--  修改预定订单   -->
        <Modal
            v-model="ReviseReservationOrder"
            @on-ok="ReviseReservationOrderOk"
            title="修改预定订单"
            :closable="true"
            :mask-closable="false">
            
                <detail-form 
                    :isListPage="true"
                    :formDatas="formDatas"
                    :formItemList="formItemList3"
                    :isBtn="false"
                    :btnLabelWidth="200"
                    :labelWidth="200"
                    :isHasTable='false'></detail-form>
            
            <div class="serial-number ReviseReservationOrde-block">
                <span class="serial-number-text">预定门票数量<span class="quotes">：</span></span>
                <div class="coutter-wrapper">
                    <button type="button" @click="minus()" class="subtract">-</button>
                    <!-- <button type="button" class="quantity" >{{ result }}</button> -->
                    <input type="text"  value="1" class="quantity"  v-model="result" disabled>
                    <button type="button" @click="plus()" class="plus">+</button>
                </div>
            </div>
            <div class="serial-number ReviseReservationOrde-block quotes-pric">
                <span class="serial-number-text">现支付金额<span class="quotes">：</span></span>
                <span class="serial-number-content">{{numberGagarinMoney.toFixed(2)}}</span>
            </div>
            <div class="ReviseReservationOrder-hint">温馨提示：退订门票相关订单信息在我的退订订单中显示</div>
        </Modal>

        <Modal
            v-model="ReviseReservationOrderWarmPrompt"
            title="温馨提示"
             @on-ok="modifyReservation"
            :closable="true"
            :mask-closable="false">
            <div class="serial-number subpage">
                <span class="serial-number-content">预订订单修改成功，部分退订订单请在我的订单中查询。</span>
                <span class="serial-number-content orange-hint">如有问题请联系工作人员，或官方客服电话4000-132165131</span>
            </div>
        </Modal>

         <!--  全部退订   -->
        <Modal
            v-model="AllUnsubscribe"
            @on-ok="AllUnsubscribeOk"
            title="全部退订"
            :closable="true"
            :mask-closable="false">
                <detail-form 
                    :isListPage="true"
                    :formDatas="formDatas"
                    :formItemList="formItemList1"
                    :isBtn="false"
                    :btnLabelWidth="200"
                    :labelWidth="200"
                    :isHasTable='false'></detail-form>
            <div class="ReviseReservationOrder-hint">温馨提示：门票一经退订，需重新预订</div>
        </Modal>

        <Modal
            v-model="AllUnsubscribeWarmPrompt"
            title="温馨提示"
            @on-ok="AllUnsubscribeAll"
            :closable="true"
            :mask-closable="false">
            <div class="serial-number subpage">
                <span class="serial-number-content">订单已全部退订，退订订单请在我的订单中查询。</span>
                <span class="serial-number-content orange-hint">如有问题请联系工作人员，或官方客服电话4000-132165131</span>
            </div>
        </Modal>
    </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        if (this.formCustom.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Age cannot be empty"));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please enter a numeric value"));
        } else {
          if (value < 18) {
            callback(new Error("Must be over 18 years of age"));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    return {
      
      
    time: Date.now() - 86400000,
    startTimeOptions: {
      disabledDate: date => {
        // this成功指向vue实例
        return date && date.valueOf() < this.time 
      }
    },
      yxrq:'',
      scenicAreaIdName:'',
      forOrdeListData:'',
      dateAndTime:'',
      oridParams: "",
      refund: false,
      offStocks: false,
      completeNumber: 1,
      pastDueDate:'',
      numberPmva: "",
      amountTotal: "",
      skiprl: "",
      minutes: 20,
      seconds: 0,
      money: 19.22,
      numberTickets: 0,
      result: 0,
      ticketQuantity: 0,
      numbTickets: "",
      orzjZjlb: "",
      numberGagarinMoney: 0.0,
      minute: "20",
      second: "00",
      moneyList: "",
      dataListMorder: "",
      VisitorsDataList: "",
      isShowLoading: false,
      digitalLine: Number(),
      pmvaName: "",
      orderConfirmationNumber: "",
      creationTime: "",
      dateCreated: "",
      pmavData: "",
      formCustom: {
        passwd: "",
        passwdCheck: "",
        age: ""
      },
      formDatas: {
        val1: "",
        val2: "",
        val3: "",
        val4: "",
        val5: "",
        val6: "",
        val7: "",
        val8: "",
        val9: "",
        val10: "",
        val11: "",
        val12: "",
        val13: "",
        val14: "",
        val15: "",
        val16: "",
        val17: ""
      },
      formItemList: [
        {
          keyName: "val1",
          type: 1,
          label: "姓名"
        },
        {
          keyName: "val2",
          type: 1,
          label: "身份证"
        },
        {
          keyName: "val3",
          type: 1,
          label: "手机号码"
        }
      ],
      formItemList1: [
        {
          keyName: "val4",
          type: 8,
          label: "产品名称"
        },
        {
          keyName: "val5",
          type: 8,
          label: "订单编号"
        },
        {
          keyName: "val6",
          type: 8,
          label: "入园时间"
        },
        {
          keyName: "val7",
          type: 8,
          label: "门票价格"
        },
        {
          keyName: "val8",
          type: 8,
          label: "门票数量"
        },
        {
          keyName: "val9",
          type: 8,
          label: "预定金额"
        }
      ],
      formItemList2: [
        {
          keyName: "val10",
          type: 8,
          label: "之前预定游玩日期"
        },
        // {
        //   keyName: "val11",
        //   type: 5,
        //   label: "游玩日期"
        // }
      ],
      formItemList3: [
        {
          keyName: "val12",
          type: 8,
          label: "产品名称"
        },
        {
          keyName: "val13",
          type: 8,
          label: "订单编号"
        },
        {
          keyName: "val14",
          type: 8,
          label: "入园时间"
        },
        {
          keyName: "val15",
          type: 8,
          label: "门票价格"
        },
        {
          keyName: "val16",
          type: 8,
          label: "原支付金额"
        }
      ],
      ruleCustom: {
        passwd: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        age: [{ validator: validateAge, trigger: "blur" }]
      },

      AllUnsubscribe: false,
      AllUnsubscribeWarmPrompt: false,

      ReviseReservationOrder: false,
      ReviseReservationOrderWarmPrompt: false,

      TicketTakerInformation: false,
      TicketTakerInformationWarmPrompt: false,

      ChangeDateVisitWarmPrompt: false,
      ChangeDateVisit: false,

      isLoading: false,
      total: 0,
      colnames: [
        {
          title: "产品信息",
          // key: 'RefundOrderNumber',
          width: 160,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.sztickettypename +
                  "(" +
                  params.row.szcrowdkindname +
                  ")"
              )
            ]);
          }
        },
        {
          title: "游玩日期",
          key: "dtstartdate",
          width: 158
        },
        {
          title: "入园时间",
          // key: 'TimePark',
          width: 200,
          render: (h, params) => {
            if (params.row.starttime != null && params.row.starttime != "") {
              return h("div", [
                h("span", {}, ""),
                h("span", params.row.starttime + ' - ' + params.row.endtime),
              ]);
            } else {
              return h("div", [h("span", {}, "景区营业时间内全天有效")]);
            }
          }
        },
        {
          title: "价格",
          width: 100,
          render: (h, params) => {
            return h (
              'span','￥' + params.row.pric
            )
          }
        },
        {
          title: "数量",
          key: "numb",
          width: 100,
        },
        {
          title: "总金额",
          // key: 'totalMoney',
          width: 100,
          render: (h, params) => {
            return h("div", [h("span",'￥' + (params.row.amnt - params.row.yhamnt))]);
          }
        },

        {
          title: "订单状态",
          width: 120,
          // render: (h, params) => {
          //   return h("div", params.row.pmva);
          // }
          render: (h, params) => {
            if(params.row.pmva === '退款中' || params.row.strddzt === '全退订' || params.row.strddzt === '已支付(退款中)' || params.row.strddzt ===  '全退订(退订已退款)'){
                return h("div", [
                    h(
                        "span",
                        {
                            style: {
                                color: "#e84d45"
                            },
                        },
                    params.row.pmva
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
                    params.row.pmva
                    ),
                ]);
            }
        }
        },
        // {
        //   title: "订单操作",
        //   // key: "serviceCharge",
        //   width: 127,
        //   render: (h, params) => {
        //     if (params.row.ddzt != "02" && params.row.ddzt != "11" && params.row.ddzt != "98" && params.row.ddzt != "30" && params.row.ddzt != "27" ) {
        //       
        //       return h("div", [
        //         h("a",{style: {display: "block",marginTop:'5px'},
        //             on: {
        //               click: () => {
        //                 this.BtnChangeDateVisitOk();
        //               }
        //             }
        //           },
        //           "修改游玩日期"
        //         )
        //       ]);
        //     };
        //     if (params.row.ddzt === "02") {
        //       return h("div", [
        //         h("a",{style: {display: "block",marginTop:'5px'},
        //             on: {
        //               click: () => {
        //                 this.TicketTakerInformationAxios();
        //               }
        //             }
        //           },
        //           "修改取票人信息"
        //         ),
        //         h("a",{style: {display: "block",marginTop:'5px'},
        //             on: {
        //               click: () => {
        //                 this.ReviseReservationOrder = true;
        //                 this.RevisYDDH();
        //               }
        //             }
        //           },
        //           "修改预定订单"
        //         ),
        //         h("a",{style: {display: "block",margin:'5px 0'},
        //               on: {
        //                 click: () => {
        //                   if(params.row.ddzt != '02' && params.row.ddzt != '23'){
        //                     this.$Modal.error({
        //                         title: '温馨提示',
        //                         content: '当前订单状态不能退订'
        //                     });
        //                   } else if(params.row.ddzt === '' && params.row.ddzt === null){
        //                     this.$Modal.error({
        //                         title: '温馨提示',
        //                         content: '当前订单状态不能退订'
        //                     });
        //                    } else {
        //                       this.AllUnsubscribe = true;
        //                       this.AllUnsubscribeAll();
        //                    }
        //                 }
        //               }
        //             },
        //             "全部退订"
        //           )
        //       ]);
        //     };
        //     // if (params.row.ddzt === '02' || params.row.ddzt === '23') {
        //     //   if(params.row.ddzt !== null || params.row.ddzt !== '') {
        //     //     return h("div", [
        //     //       h("a",{style: {display: "block"},
        //     //           on: {
        //     //             click: () => {
        //     //               this.AllUnsubscribe = true;
        //     //               this.AllUnsubscribeAll();
        //     //             }
        //     //           }
        //     //         },
        //     //         "全部退订"
        //     //       )
        //     //     ]);
        //     //   }
        //     // } 
        //   }
        // }
      ],
      tableData: [],
      colnames1: [
        {
          title: "入园人姓名",
          key: "cname",
          width: 100
        },
        {
          title: "身份证",
          key: "idcard"
        },
        {
          title: "手机号码",
          key: "mbnumber"
        }
      ],
      tableData1: [],
      colnames2: [
        {
          width: 100,
          title: "领票人姓名",
          key: "ornm"
        },
        {
          title: "身份证",
          key: "orhm"
        },
        {
          title: "手机号码",
          key: "orph"
        }
      ],
      tableData2: []
    };
  },

  created() {

      this.isShowLoading = true;
    /* 如果是结算返回则延时5秒 */
    if (this.$route.fullPath.indexOf("?") === -1) {
      if(this.$route.query.fxid){
        sessionStorage.setItem('fxsId',this.$route.query.fxid)
      }
      this.oridParams = this.$route.query.orid;
      this.usidParams = this.$route.query.usid;
      this.ITviewDetailsAxios();
    } else {
      this.oridParams = this.$route.query.orid;
      this.usidParams = this.$route.query.usid;
      setTimeout(() => {
        this.ITviewDetailsAxios();
      },);
    }
  },

  mounted() {},

  watch: {},

  computed: {},

  methods: {
    ITviewDetailsAxios() {
      this.isShowLoading = true;
      this.$http
        .get(this.baseURL + "/ec/orderManage/orderDetailView", {
          params: {
            access_token: sessionStorage.getItem("name"),
            usid: sessionStorage.getItem("userName"),
            orid: this.oridParams,
            url: window.location.host
          }
        })
        .then(response => {
          
          
          // this.scenicAreaIdName = response.data.data.torder[0].iscenicid;
          let morderList = response.data.data.morder;
          let torderListData = response.data.data.torderlist;
          let realnamesList = response.data.data.realnames;
          let torderTableList = response.data.data.torder;
          let yorderDataList = response.data.data.yorderlist;
          this.pmvaName = morderList.pmva;
          this.VisitorsDataList = torderTableList;
          this.dataListMorder = morderList;
          this.moneyList = torderListData;
          this.yxrq = yorderDataList[0].dtstartdate + ' 至 ' + yorderDataList[0].dtenddate + ' '
          this.amountTotal = morderList.zfmont - morderList.tpmont;
          if (this.pmvaName == "已支付" || this.pmvaName == "已出票") {
            this.numberPmva = morderList.dtmakedate;
            this.completeNumber = 2;
            this.offStocks = true;
          } else if (this.pmvaName == "退款中" || this.pmvaName == "退款失败") {
            this.offStocks = false;
            this.refund = true;
          } 
          if(this.pmvaName !== "未付款") {
            this.offStocks = false;
          } else {
            this.offStocks = true;
          }
          yorderDataList.forEach(item => {
            item["pmva"] = morderList.pmva;
            item["ddzt"] = morderList.ddzt;
          });
          this.tableData2 = torderTableList;
          this.tableData1 = realnamesList;
          this.tableData = yorderDataList;
          // this.tableData = torderListData;
          this.orderConfirmationNumber = morderList.orid;
          this.creationTime = morderList.orda;
          this.dateCreated = morderList.orti;
          this.pmavData = morderList.pmva;
          this.pastDueDate = moment(new Date(`${morderList.orda}  ${morderList.orti}`).getTime() + 30 * 60 * 1000).format('YYYY-MM-DD HH:mm');
          //倒计时20分钟
          // var _this = this;
          // var time = window.setInterval(function() {
          //   if (_this.seconds === 0 && _this.minutes !== 0) {
          //     _this.seconds = 59;
          //     _this.minutes -= 1;
          //   } else if (_this.minutes === 0 && _this.seconds === 0) {
          //     _this.seconds = 0;
          //     window.clearInterval(time);
          //   } else {
          //     _this.seconds -= 1;
          //   }
          // }, 1000);

          if (response.data.code == 400) {
            this.$Modal.error({
              title: "温馨提示",
              content: response.data.msg,
            });
          } else if (response.data.code == 500) {
            this.$Modal.error({
              title: "温馨提示",
              content: response.data.msg
            });
          } else if (response.data.code == 404) {
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

    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },

    //修改游玩日期
    BtnChangeDateVisitOk() {
      this.ChangeDateVisit = true;
      let beforeDate = this.moneyList;
      for (let i = 0; i < beforeDate.length; i++) {
        this.dateAndTime = beforeDate[i].dtstartdate;
        this.formDatas.val10 = beforeDate[i].dtstartdate;
      }
    },
    changeDateVisitOk() {
      this.isShowLoading = true;
      let beforeDate = this.moneyList;
      for (let i = 0; i < beforeDate.length; i++) {
        this.formDatas.val10 = beforeDate[i].dtstartdate;
      }
      // let xgDate = new Date(this.formDatas.val11).format("yyyy-MM-dd");
      let xgDate = this.dateAndTime;
      // let dateList = xgDate;
      // this.formDatas.val10 = this.moneyList[0].dtstartdate;
      let iscenicidName = this.scenicAreaIdName;
      let oridName = this.dataListMorder.orid;
      let token = sessionStorage.getItem("name");
      let url = window.location.host;
      this.$http
        .put(
          this.baseURL +
            "/ec/orderManage/v1/editFirsDate?access_token=" +
            token +
            "&orid=" +
            oridName +
            "&iscenicid=" +
            iscenicidName +
            "&date=" +
            xgDate +
            "&url=" +
            url,
          {}
        )
        .then(response => {
          
          this.ChangeDateVisitOk = true;
          if (response.data.code === 400) {
            this.$Modal.error({
              title: "温馨提示",
              content: '调用结算系统系统异常'
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

          if(response.data.code === 200){
            setTimeout(() => {
              this.ITviewDetailsAxios();
            },);
            setTimeout(() => {
              this.$Modal.success({
                title: "温馨提示",
                content: response.data.msg,
                onOk: () => {
                  this.ChangeDateVisitWarmPrompt = true
                }
              });
            },);
          };
          this.isShowLoading = false;
          return;
        })
        .catch(error => {
          this.isShowLoading = false;
          return;
          
        });
    },
    printingDate(date){
      this.dateAndTime = date
    },


    ////////////
    minus() {
      if (this.result !== 0) {
        this.result--;
        this.numberGagarinMoney -= this.formDatas.val15;
        let minusResult = this.result
        let minusNumberMoney = this.numberGagarinMoney
        sessionStorage.setItem("resultMinus",minusResult)
        sessionStorage.setItem("numberMinus",minusNumberMoney.toFixed(2))
      }
    },
    plus() {
      if (this.result < this.ticketQuantity) {
        this.result++;
        this.numberGagarinMoney += this.formDatas.val15;
        let plusResult = this.result
        let plusNumberMoney = this.numberGagarinMoney
        sessionStorage.setItem("resultplus",plusResult)
        sessionStorage.setItem("numberplus",plusNumberMoney.toFixed(2))
      }
    },

    //修改取票人信息
    TicketTakerInformationAxios() {
      this.TicketTakerInformation = true;
      let VisitorsList = this.VisitorsDataList;
      for (let i = 0; i < VisitorsList.length; i++) {
        this.formDatas.val1 = VisitorsList[i].ornm;
        this.formDatas.val2 = VisitorsList[i].orhm;
        this.formDatas.val3 = VisitorsList[i].orph;
        this.orzjZjlb = VisitorsList[i].orzj;
      }
    },
    TicketTakerInformationOk() {
      this.isShowLoading = true;
      let token = sessionStorage.getItem("name");
      let oridName = this.dataListMorder.orid;
      let iscenicidName = this.scenicAreaIdName;
      let url = window.location.host;
      this.$http.put(this.baseURL + "/ec/orderManage/v1/editOrderLxr?access_token=" + token + "&orid=" + oridName + "&iscenicid=" + iscenicidName + "&url=" +  url,
          {
            username: this.formDatas.val1,
            zjhm: this.formDatas.val2,
            mobile: this.formDatas.val3,
            zjlb: this.orzjZjlb
          }
        )
        .then(response => {
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
          
          if(response.data.code === 200){
            setTimeout(() => {
              this.ITviewDetailsAxios();
            },);
            setTimeout(() => {
              this.$Modal.success({
                title: "温馨提示",
                content: response.data.msg,
                onOk: () => {
                  this.TicketTakerInformationWarmPrompt = true
                }
              });
            },);
          };
          
          
          this.isShowLoading = false;
          return;
        })
        .catch(error => {
          this.isShowLoading = false;
          return;
          
        });
    },
    ModifyTicketHolderInformation() {},

    //修改预定订单
    RevisYDDH(){
      let iscenicidName = this.scenicAreaIdName;
      this.$http.get(this.baseURL + "/ec/orderManage/v1/editOrderView", {
          params: {
            access_token: sessionStorage.getItem("name"),
            orid: this.dataListMorder.orid,
            usid: this.$route.query.usid,
            iscenicid: this.scenicAreaIdName,
            url: window.location.host
          }
        })
        .then(response => {
          
          let btnTorderLists = response.data.data.torderlists;
          let btnTordersList = response.data.data.torders;
          this.forOrdeListData = btnTorderLists;
          for (let i = 0; i < btnTorderLists.length; i++) {

            // this.forOrdeListData = btnTorderLists[i]
            
            // sztickettypename
            this.formDatas.val12 = btnTorderLists[i].sztickettypename;
            this.formDatas.val13 = btnTorderLists[i].orid;
            this.formDatas.val14 = btnTorderLists[i].dtstartdate;
            // this.result = btnTorderLists[i].numb
            this.formDatas.val15 = btnTorderLists[i].pric;
            this.formDatas.val16 = btnTorderLists[i].amnt - btnTorderLists[i].yhamnt;
            this.numberGagarinMoney = btnTorderLists[i].amnt - btnTorderLists[i].yhamnt;
            this.result = btnTorderLists[i].numb;
            this.numberTickets = btnTorderLists[i].numb;
            this.ticketQuantity = btnTorderLists[i].numb;
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
          
        })
        .catch(error => {
          
        });
    },
    ReviseReservationOrderOk() {
      this.isShowLoading = true;
      let token = sessionStorage.getItem("name");
      let oridName = this.dataListMorder.orid;
      let usidName = this.$route.query.usid;
      
      let confirmOrderListDate = this.forOrdeListData
      // let single = confirmOrderListDate.numb 
      // single = this.result 
      

      confirmOrderListDate[0].numb = sessionStorage.getItem("resultMinus")//数量
      confirmOrderListDate[0].amnt = sessionStorage.getItem("numberMinus")//总金额
      // let a = $.extend(true,confirmOrderListDate,single)
      // let obj = Object.assign(confirmOrderListDate, single)
      let iscenicidName = this.scenicAreaIdName;
            // url: window.location.host
            // this.creationTime
            
      this.$http.put(this.baseURL + "/ec/orderManage/v1/editOrderSaveSk?access_token=" + token + '&orid=' + oridName + '&usid=' + usidName + '&iscenicid=' + iscenicidName, 
          confirmOrderListDate
        ).then(response => {
          
          
          
          if(response.data.code === 200){
              this.$Modal.success({
                title: "温馨提示",
                content: '修改成功',
                onOk: () => {
                  this.ReviseReservationOrderWarmPrompt = true;
                  setTimeout(() => {
                    this.ITviewDetailsAxios();
                  },500);
                }
              });
          };
          let btnTorderLists = response.data.data.torderlists;
          let btnTordersList = response.data.data.torders;
          for (let i = 0; i < btnTorderLists.length; i++) {
            // sztickettypename
            this.formDatas.val12 = btnTorderLists[i].sztickettypename;
            this.formDatas.val13 = btnTorderLists[i].orid;
            this.formDatas.val14 = btnTorderLists[i].dtstartdate;
            // this.result = btnTorderLists[i].numb
            this.formDatas.val15 = btnTorderLists[i].pric;
            this.formDatas.val16 = btnTorderLists[i].amnt - btnTorderLists[i].yhamnt;
            this.numberGagarinMoney = btnTorderLists[i].amnt - btnTorderLists[i].yhamnt;
            this.result = btnTorderLists[i].numb;
            this.numberTickets = btnTorderLists[i].numb;
            this.ticketQuantity = btnTorderLists[i].numb;
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

    modifyReservation() {},

    //点击立即支付
    btnPayNow() {
      this.isShowLoading = true;
      this.$http.get(this.baseURL + "/ec/orderManage/v1/orderRePay", {
          params: {
            access_token: sessionStorage.getItem("name"),
            orid: this.orderConfirmationNumber,
            url: window.location.host
          }
        })
        .then(response => {
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
          
          let skipURL = window.location.host + this.$route.fullPath
          this.skiprl = response.data.data.url + '&returnUrl=' + skipURL;
          this.isShowLoading = false;
          return;
        })
        .catch(error => {
          this.isShowLoading = false;
          return;
          
        });
    },
    //全部退订
    AllUnsubscribeOk() {
      this.isShowLoading = true;
      let iscenicidName = this.scenicAreaIdName;
      let oridName = this.dataListMorder.orid;
      let token = sessionStorage.getItem("name");
      let usidName = sessionStorage.getItem("userName");
      let url = window.location.host;
      this.$http
        .put(
          this.baseURL +
            "/ec/orderManage/v1/backOrderAll?access_token=" +
            token +
            "&usid=" +
            usidName +
            "&iscenicid=" +
            iscenicidName +
            "&orid=" +
            oridName +
            "&url=" +
            url,
          {}
        )
        .then(response => {
          
          this.formDatas.val5 = this.dataListMorder.orid;
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

          if(response.data.code === 200){
            setTimeout(() => {
              this.ITviewDetailsAxios();
            },);
            setTimeout(() => {
              this.$Modal.success({
                title: "温馨提示",
                content: response.data.msg,
                onOk: () => {
                  this.AllUnsubscribeWarmPrompt = true
                }
              });
            },);
          };
          this.isShowLoading = false;
          return;
        })
        .catch(error => {
          
          this.isShowLoading = false;
          return;
        });
    },

    AllUnsubscribeAll() {
      this.formDatas.val4 = this.moneyList[0].sztickettypename;
      this.formDatas.val5 = this.dataListMorder.orid;
      if (this.dataListMorder.starttime != null && this.dataListMorder.starttime != "" ) {
        this.formDatas.val6 = this.dataListMorder.starttime;
      } else {
        this.formDatas.val6 = "景区营业时间内全天有效";
      }
      this.formDatas.val7 = this.moneyList[0].pric;
      this.formDatas.val8 = this.moneyList[0].numb;
      this.formDatas.val9 = this.moneyList[0].amnt - this.moneyList[0].yhamnt;
    }
  }
};
</script>

<style scoped>
.subpage:first-child {
  margin-top: 15px;
}
.null-block {
  margin-top: 25px;
}
.DateVisit-date {
  margin-left: 128px;
  margin-bottom: 20px;
}
.DateVisit-date span {
  margin-right: 10px;
}
.underway {
  display: inline-block;
}
.subpage .serial-number-text {
  display: block;
  font-size: 18px;
  color: #191919;
}
.subpage span {
  display: block;
}
.subpage .orange-hint {
  color: #ff7f0d;
}
.input-width {
  width: 70%;
}
.serial-number-formCustom {
  margin-left: 50px;
}

.groups-user,
.ReviseReservationOrder-hint {
  text-align: center;
  display: block;
  color: #f54112;
}
.ReviseReservationOrder-hint {
  margin-bottom: 10px;
}
.serial-number {
  margin-left: 110px;
}
.ReviseReservationOrde-block {
  margin-left: 104px;
}
.AllUnsubscribe-block {
  margin-left: 142px;
}
.subpage {
  margin-left: 0;
  text-align: center;
}
.serial-number span {
  margin-bottom: 15px;
  display: inline-block;
}

.coutter-wrapper {
  display: inline-block;
}
.coutter-wrapper .subtract,
.coutter-wrapper .plus {
  width: 20px;
  background: #4b7ff0;
  color: #fff;
  border: 0;
  border-radius: 5px;
}
.coutter-wrapper .quantity {
  background: none;
  width: 20px;
  border: 0;
  text-align: center;
}
.order-status-block .cardTitle {
  margin-bottom: 10px;
}
.Order-submitted-successfully {
  margin-top: 10px;
}
.footer-hint-block {
  padding: 15px 0 15px 30px;
  background: #f2f6fe;
  border: 1px solid #aec7ff;
  border-radius: 2px;
  margin: 25px 0 50px;
}
.footer-hint-block span {
  display: block;
}
.order-status-block span {
  display: block;
  color: #191919;
}
.friendly-reminder {
  font-size: 18px;
  color: #ee3100;
  margin: 0 0 15px;
}
.order-status-block .date {
  color: #5e5e60;
}
.Reservation-form {
  margin-top: 20px;
}
.MyOrderDetailsPage {
  font-size: 14px;
}
.Way-park {
  margin: 32px 0 16px;
}
.Way-park-text,
.effective-date-text {
  color: #191919;
  padding-left: 10px;
}
.Due-that {
  font-size: 12px;
  color: #5e5e60;
  float: inherit;
  padding-left: 10px;
}
.header-form-text {
  margin: 22px 0 32px;
}
.order-number {
  padding-right: 20px;
}
.cardTitle {
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
  color: #191919;
}
.btnConfirm {
  font-size: 16px;
  padding: 9px 32px;
  margin: 0 30px 10px;
}
.dollar {
  font-size: 20px;
  color: #ff8314;
}
.dollar-sign {
  font-size: 22px;
  color: #ff7f0d;
}
.payment-amount-block {
  text-align: right;
}
.prompt-message2 {
  font-size: 15px;
  color: #191919;
  display: block;
}
.prompt-message1 {
  font-size: 22px;
  color: #f54112;
}
.non-payment-prompt-message {
  margin: 48px 0 0 0px;
  padding: 0 0 56px;
}

.floatRight {
  margin-left: 340px;
  display: inline-block;
}
.quotes {
  margin-right: 14px;
}
.quotes-pric .quotes{
  margin-right: 15px;
}
.quotes-pric {
  margin-left: 117px;
}
/* .A-refund-of {
  margin-top: -105px;
  position: relative;
  z-index: 9;
  width: 90%;
  background: #fff;
  height: 26px;
  margin-left: 10px;
  text-align: center;
  position: absolute;
  top: 15%;
} */
</style>
