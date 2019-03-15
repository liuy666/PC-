<template>
    <div class="purchaseOrder">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>

	<!-- 订单明细 -->

                <Breadcrumb separator=">" :style="{margin: '24px 0'}" >
                    <BreadcrumbItem>我的账户</BreadcrumbItem>
                    <BreadcrumbItem>订单管理</BreadcrumbItem>
                    <BreadcrumbItem v-if="this.$route.params.sale === 2">销售订单</BreadcrumbItem>
                    <BreadcrumbItem v-if="this.$route.params.sale === 2">销售详情列表</BreadcrumbItem>
                    <BreadcrumbItem v-if="this.$route.params.sale !== 2">采购订单</BreadcrumbItem>
                    <BreadcrumbItem v-if="this.$route.params.sale !== 2">采购详情列表</BreadcrumbItem>
                </Breadcrumb>   
      <table id="customers">
        <tr>
          <th>供应商订单号：{{supplier}}</th>
          <th>订单状态：<span :style="sizeColor">{{orderStatusText}}</span></th>
        </tr>

        <tr>
          <td colspan="12">关联分销商订单号：{{AffiliatedSupplier}}</td>
        </tr>
        <tr>
          <td colspan="12">订单金额：￥{{orderAmountText}}</td>
        </tr>
    </table>

        <p slot="title" class="cardTitle">
            <span>订单明细</span>
        </p>        
        <p slot="title" class="amend-cardTitle">
            <span>订单备注：{{noteContent}}<a @click="btnModifyRemark()" >修改备注</a></span>
        </p>

    <Modal
        title="修改备注"
        v-model="modifyRemark"
        :mask-closable="false"
        @on-ok="confirmModificationRemarks">
        <div class="Modify-the-remark"></div>
                <detail-form 
                    :isListPage="true"
                    :formDatas="formDatas"
                    :formItemList="formItemList1"
                    :isBtn="false"
                    :btnLabelWidth="100"
                    :labelWidth="170"
                    :isHasTable='false'></detail-form>
    </Modal>

            <div class="title-name">服务商：{{titleName}}</div>
            <radioTable 
                :loading="isLoading"
                :isPage="false"
                :colname="colnames6"
                :total="total" 
                :tableData="tableData6"
                :isHideHeader="false"></radioTable>
<div class="locationWrong">

  <!-- 修改游览日期 -->
    <Button @click="btnModifyTourDate()" class="btnModifyTourDate" v-show="BrowseVisible">修改游览日期</Button>
    <Modal
        title="修改游览日期"
        v-model="modifyTourDate"
        :mask-closable="false"
        @on-ok="dateSet">
                <detail-form 
                    :isListPage="true"
                    :formDatas="formDatas"
                    :formItemList="formItemList2"
                    :isBtn="false"
                    :btnLabelWidth="100"
                    :labelWidth="100"
                    :isHasTable='false'></detail-form>
                    <div class="mysaleDate">
                      修改游览日期：<DatePicker type="date" v-model="tourValueDate"  :options="startTimeOptions" placeholder="请选择日期" style="width: 200px"></DatePicker>
                    </div>
    </Modal>

   
    <Button @click="instance" v-show="visible" >全部退订</Button>
      <Button :to="skiprl" target="_blank" type="primary" @click="btnPayNow" v-show="bleeeeeeeee">立即支付</Button>
</div>

<!-- 退订确认框 修改 by liuy 2018-8-29 11:44:55 -->
<Modal v-model="isUnreg" width="360">
	<p slot="header" style="color:#5db2ff;">
		<span>全部退订</span>
	</p>
	<div style="text-align:center">
		<p style="font-size:16px; line-height:30px;margin-top:10px;">是否全部退订？</p>
	</div>
	<div slot="footer" style="text-align:center" >
		<Button 
			type="primary" 
			:loading="modalLoading" 
			@click="sureEvent">确定</Button>
		<Button @click="cancelEvent">取消</Button>
	</div>
</Modal>

          <div class="mySalesDate2">
            <radioTable 
                :loading="isLoading"  
                :isPage="false"
                :colname="colnames2"
                :total="total" 
                :tableData="tableData2"></radioTable>
                <div class="mySalesDate2-table">
                  <span class="orderProcessingMoney">金额：<span>￥</span>{{listMont}}</span>
                  <span class="orderProcessingpaymentAmount">支付金额：<span>￥</span>{{listMont}}</span>
                </div>
          </div> 
		<!--  -->
	<!-- 订单处理详情列表 -->
        <p slot="title" class="cardTitle">
            <span>订单处理详情列表</span>
        </p>
        <div class="Order-processing-detail-list">
          <span>服务商：{{titleName}}</span>
          <span>订单类型：预定订单</span>
          <span>首次游览日期：{{new Date(tourValueDate).format("yyyy-MM-dd")}}</span>
          <span>金额：￥{{listMont}}</span>
          <span>支付金额：￥{{listMont}}</span>
        </div>
            <radioTable 
                :loading="isLoading"
                :colname="colnames3"
                :isPage="false"
                :total="total" 
                :tableData="tableData3"></radioTable>

	<!-- 游客信息4 -->
        <p slot="title" class="cardTitle">
            <span>游客信息</span>
        </p>
      
            <radioTable 
                :loading="isLoading"
                :colname="colnames4"
                :isPage="false"
                :total="total" 
                :tableData="tableData4"></radioTable>
	<!-- 游客信息5 -->
        <p slot="title" class="cardTitle">
            <span>订单跟踪信息</span>
        </p>
      
            <radioTable 
                :loading="isLoading"
                :colname="colnames5"
                :isPage="false"
                :total="total" 
                :tableData="tableData5"></radioTable>
    </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return { 
      
      bleeeeeeeee:false, 
      time: Date.now() - 86400000,
    startTimeOptions: {
      disabledDate: date => {
        // this成功指向vue实例
        return date && date.valueOf() < this.time 
      }
    },
      sizeColor:{},
      numShow: false,
		  isUnreg: false,
		  modalLoading: false, // 退订按钮确定后的加载中状态
      immediatePayment:false,
      BrowseVisible:false,
      visible:false,
      noteContent:'',
      skiprl:'',
      titleName: "",
      tourValueDate: "",
      scenicIdIndex: "",
      modifyOrder: false,
      modifyTourDate: false,
      modifyRemark: false,
      modifyContact: false,
      oridParams: "",
      usidParams: "",
      yorderFacilitator: "",
      yorderOrderType: "",
      yorderDate: "",
      yorderMoney: "",
      yorderPayment: "",
      supplier: "",
      orderStatusText: "",
      AffiliatedSupplier: "",
      orderAmountText: "",
      listMont: 0,
      listTpmont: 0,
      tpmontUndf: 0,
      total: 0,
      result: 0,
      isShowLoading: false,
      isRadio: true,
      isLoading: false,
      modal10: false,
      animal: "爪哇犀牛",
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
        val10: ""
      },
      formItemList: [
        {
          keyName: "val1",
          type: 1,
          label: "联系人姓名"
        },
        {
          keyName: "val2",
          type: 1,
          label: "身份证"
        },
        {
          keyName: "val3",
          type: 1,
          label: "联系电话"
        }
      ],
      formItemList1: [
        {
          keyName: "val4",
          type: 1,
          label: "修改备注"
        }
      ],
      formItemList2: [
        // {
        //   keyNameStart: "val5",
        //   type: 5,
        //   label: "修改游览日期",
        //   double: false,
        // }
      ],
      formItemList3: [
        {
          keyName: "val6",
          type: 8,
          label: "产品名称"
        },
        {
          keyName: "val7",
          type: 8,
          label: "订单编号"
        },
        {
          keyName: "val8",
          type: 8,
          label: "入园时间"
        },
        {
          keyName: "val9",
          type: 8,
          label: "门票价格"
        },
        {
          keyName: "val10",
          type: 8,
          label: "原支付金额"
        }
      ],
      // key值

      colnames2: [
        {
          title: "产品名",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h("span"),
              params.row.productInfo.sztickettypename
            ]);
          }
        },
        {
          title: "游览日期",
          width: 170,
          render: (h, params) => {
            return h("div", [h("span"), params.row.orderInfo.stdt]);
          }
        },
        {
          title: "入园时段",
          width: 231,
          render: (h, params) => {
            if (
              params.row.productInfo.bespeakStartTime != null && params.row.productInfo.bespeakStartTime != ""
            ) {
              return h("div", [
                h("span", "游览日期："),
                params.row.productInfo.starttime +
                  "-" +
                  params.row.productInfo.bespeakEndTime
              ]);
            } else {
              return h("div", [h("span", "景区营业时间内全天有效")]);
            }
          }
        },
        {
          title: "产品",
          width: 220,
          render: (h, params) => {
            return h("div", [
              h("span"),
              params.row.productInfo.sztickettypename +
                "[" +
                params.row.productInfo.szcrowdkindname +
                "]"
            ]);
          }
        },
        {
          title: "单价",
          width: 100,
          render: (h, params) => {
            return h("div", [h("span"),'￥' +  params.row.orderInfo.price]);
          }
        },
        {
          title: "数量",
          width: 100,
          render: (h, params) => {
            return h("div", [h("span"), params.row.orderInfo.numb]);
          }
        },
        {
          title: "佣金",
          width: 100,
          render: (h, params) => {
            return h("div", [h("span"),'￥' +  params.row.orderInfo.commision]);
          }
        },
        {
          title: "金额",
          width: 100,
          render: (h, params) => {
            return h("div", [h("span"), '￥' + params.row.orderInfo.amnt]);
          }
        }
      ],
      tableData2: [],

      colnames3: [
        {
          title: "产品名",
          render: (h, params) => {
            return h("div", [
              h("span"),
              params.row.productInfo.sztickettypename
            ]);
          }
        },
        {
          title: "单价",
          width: 100,
          render: (h, params) => {
            return h("div", [h("span"),'￥' + params.row.orderInfo.price]);
          }
        },
        {
          title: "数量",
          width: 100,
          render: (h, params) => {
            return h("div", [h("span"), params.row.orderInfo.numb]);
          }
        },
        {
          title: "佣金",
          width: 100,
          render: (h, params) => {
            return h("div", [h("span"), '￥' + params.row.orderInfo.commision]);
          }
        },
        {
          title: "金额",
          width: 100,
          render: (h, params) => {
            return h("div", [h("span"),'￥' +  params.row.orderInfo.amnt]);
          }
        }
      ],
      tableData3: [],
      colnames4: [
        {
          title: "姓名",
          key: "tourName"
        },
        {
          title: "证件号码",
          key: "idNumber"
        },
        {
          title: "电话",
          key: "telNumber"
        }
      ],
      tableData4: [],
      colnames5: [
        {
          title: "处理时间",
          key: "dtDate"
        },
        {
          title: "处理信息",
          key: "processDetail"
        },
        {
          title: "处理人",
          key: "usid"
        }
      ],
      tableData5: [],

      colnames6: [
        {
          // title: "服务商：四川省剑门关发展投资有限公司",
          // key: "list",
          render: (h, params) => {
            return h("div", [
              h("span", {}, "游览日期："),
              h("span", params.row.orderInfo.stdt),

              h(
                "span",
                {
                  style: {
                    marginLeft: "40px"
                  }
                },
                "领票人姓名："
              ),
              h("span", params.row.orderInfo.ornm),

              h(
                "span",
                {
                  style: {
                    marginLeft: "40px"
                  }
                },
                "领票人证件号码："
              ),
              h("span", params.row.orderInfo.orhm),

              h(
                "span",
                {
                  style: {
                    marginLeft: "40px"
                  }
                },
                "领票人手机号码："
              ),
              h("span", params.row.orderInfo.orph)
            ]);
          }
        }
      ],
      tableData6: []
    };
  },
  async created() {
    // this.mySalesAxios();
      this.isShowLoading = true;
    /* 如果是结算返回则延时5秒 */
       
      if(this.$route.params.sale === 2) {
        this.sales1();
      } else if (this.$route.fullPath.indexOf("?") === -1) {
        this.oridParams = this.$route.query.orid;
        this.usidParams = this.$route.query.usid;
        this.mySalesAxios();
      } else if(this.$route.params === 1){
        this.numShow = false
      } else if(this.$route.params === 1){} else {
        this.isShowLoading = true;
        this.oridParams = this.$route.query.orid;
        this.usidParams = this.$route.query.usid;
        setTimeout(() => {
          this.mySalesAxios();  
          // this.isShowLoading = false;
          // return;
        },);
      };
  },
  beforeMounted() {},
  methods: {
	  cancelEvent() { // 取消退订
		this.isUnreg = false;
	  },
	  sureEvent() { // 确定退订确定退订
	  this.modalLoading = true;
		      let token = sessionStorage.getItem("name");
          let oridName = this.$route.query.orid;
          let userName = sessionStorage.getItem("userName");
          let refundFeeName =  this.orderAmountText;
          this.$http.post(this.baseURL + '/ec/distribute/v1/distributeOrderRefund?access_token=' + token + '&orid=' + oridName + '&usid=' + userName + '&refundFee=' + refundFeeName, {

          }).then(response => {
            this.mySalesAxios();
            if(response.data.code === 200){
              this.modalLoading = false;
              this.isUnreg = false;
              this.$Modal.success({
                  title: '温馨提示',
                  content: response.data.msg
              });
            } else if(response.data.code === 400){
              this.modalLoading = false;
              this.isUnreg = false;
              this.$Modal.error({
                  title: '温馨提示',
                  content: response.data.msg
              });
			}
          }).catch(error => {
              this.modalLoading = false;
              this.isUnreg = false;
          })
	  },
    mySalesAxios() {
      this.isShowLoading = true;
      this.$http
        .get(
          this.baseURL +
            "/ec/distributeOrder/v1/getPurchaseDistributeOrderDetail",
          {
            params: {
              access_token: sessionStorage.getItem("name"),
              orid: this.$route.query.orid,
              url: window.location.host
            }
          }
        )
        .then(response => {
          if(response.data.code === 200){
          this.supplier = response.data.data.orderInfo.mOrid; //供应商单号
          this.orderStatusText = response.data.data.orderInfo.strddzt; //订单状态
          this.AffiliatedSupplier = response.data.data.orderInfo.cOrid; //订单状态
          this.orderAmountText = response.data.data.orderInfo.amnt; //订单金额
          this.tableData5 = response.data.data.orderFlow;
          let userId = sessionStorage.getItem("userName")
          
          if(this.orderStatusText === '已支付' || this.orderStatusText === '已出票' || this.orderStatusText === '已付款'){
            this.sizeColor = {
              	color:'#57c720'
            }
          } else if(this.orderStatusText === '全退订(退款中)' || this.orderStatusText === '已支付(退款中)' || this.orderStatusText === '已退订(退款中)' || this.orderStatusText ===  '全退订(退订已退款)' || this.orderStatusText === '全退订'){
            this.sizeColor = {
              	color: "#e84d45"
            }
          } else if(this.orderStatusText === '垃圾（作废）订单'){
              this.sizeColor = {
                color: "#999"
              }
            } else if(this.orderStatusText === '未付款' ){
              this.sizeColor = {
                color: "#fd9141"
               }
            } else {
              this.sizeColor = {
                color: "#999"
              }
            };
			if(response.data.data.orderInfo.usid !== userId) {
				this.visible = false
				this.BrowseVisible = false
				this.bleeeeeeeee = false;
			} else if(response.data.data.orderInfo.strddzt == '已支付') {
				this.visible = true
				this.BrowseVisible = true
			} else if(response.data.data.orderInfo.strddzt === '未付款'){
				this.visible = false
				this.BrowseVisible = false
				this.bleeeeeeeee = true;
			} else if(response.data.data.orderInfo.strddzt === '已出票') {
				this.visible = false	
				this.BrowseVisible = false;
			} else if(selaName != 1 || selaName == undefined){
				this.visible = false
				this.BrowseVisible = false
			} else {
				this.visible = true
				this.BrowseVisible = true
			};
				let routeName = this.$route.name;
				let selaName = this.$route.params.sale;
				
				let orderDetailsList4 = response.data.data.tourist; //游客信息orderInfo
				let orderDetailsList6 = response.data.data; //订单明细
				let orderDetailsList2 = response.data.data; //订单明细
				this.scenicIdIndex = response.data.data.orderInfo.stdt

				this.tableData4 = orderDetailsList4;
				this.tableData6 = Array(orderDetailsList6);
				this.tableData2 = Array(orderDetailsList2);
				this.tableData3 = Array(orderDetailsList2);

				this.listMont = response.data.data.orderInfo.amnt;

				this.formDatas.val1 = orderDetailsList6.orderInfo.ornm; //联系人姓名
				this.formDatas.val2 = orderDetailsList6.orderInfo.orhm; //身份证
				this.formDatas.val3 = orderDetailsList6.orderInfo.orph; //联系电话

				this.tourValueDate = orderDetailsList6.orderInfo.stdt; //游览日期
				this.titleName = orderDetailsList6.productInfo.szscenicname; //游览日期
				
				this.noteContent = response.data.data.orderInfo.note;
				
				let noteDateContent = response.data.data.orderInfo.note;
				noteDateContent = this.formDatas.val4
			} else if (response.data.code === 400) {
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
    
sales1() {
      this.isShowLoading = true;
      this.$http
        .get(
          this.baseURL +
            "/ec/distributeOrder/v1/getSaleDistributeOrderDetail",
          {
            params: {
              access_token: sessionStorage.getItem("name"),
              orid: this.$route.query.orid,
              url: window.location.host
            }
          }
        )
        .then(response => {
          this.supplier = response.data.data.orderInfo.mOrid; //供应商单号
          this.orderStatusText = response.data.data.orderInfo.strddzt; //订单状态
          this.AffiliatedSupplier = response.data.data.orderInfo.cOrid; //订单状态
          this.orderAmountText = response.data.data.orderInfo.amnt; //订单金额
          this.tableData5 = response.data.data.orderFlow;
          let userId = sessionStorage.getItem("userName")
          if(response.data.data.orderInfo.usid !== userId) {
            this.visible = false
            this.BrowseVisible = false
            this.bleeeeeeeee = false;
          } else if(response.data.data.orderInfo.strddzt == '已支付') {
            this.visible = true
            this.BrowseVisible = true
          } else if(response.data.data.orderInfo.strddzt === '未付款'){
            this.visible = false
            this.BrowseVisible = false
            this.bleeeeeeeee = true;
          } else if(response.data.data.orderInfo.strddzt === '已出票') {
            this.visible = false
			      this.BrowseVisible = false;
          } else if(selaName != 1 || selaName == undefined){
            this.visible = false
            this.BrowseVisible = false
          } else {
            this.visible = true
            this.BrowseVisible = true
          }
          let routeName = this.$route.name;
          let selaName = this.$route.params.sale;
          
          let orderDetailsList4 = response.data.data.tourist; //游客信息orderInfo
          let orderDetailsList6 = response.data.data; //订单明细
          let orderDetailsList2 = response.data.data; //订单明细
          this.scenicIdIndex = response.data.data.orderInfo.stdt

          this.tableData4 = orderDetailsList4;
          this.tableData6 = Array(orderDetailsList6);
          this.tableData2 = Array(orderDetailsList2);
          this.tableData3 = Array(orderDetailsList2);

          this.listMont = response.data.data.orderInfo.amnt;

          this.formDatas.val1 = orderDetailsList6.orderInfo.ornm; //联系人姓名
          this.formDatas.val2 = orderDetailsList6.orderInfo.orhm; //身份证
          this.formDatas.val3 = orderDetailsList6.orderInfo.orph; //联系电话

          this.tourValueDate = orderDetailsList6.orderInfo.stdt; //游览日期
          this.titleName = orderDetailsList6.productInfo.szscenicname; //游览日期
          
          this.noteContent = response.data.data.orderInfo.note;
          
          let noteDateContent = response.data.data.orderInfo.note;
          noteDateContent = this.formDatas.val4
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
    //立即支付
    btnPayNow() {
      this.isShowLoading = true;
      this.$http.get(this.baseURL + "/ec/orderManage/v1/orderRePay", {
          params: {
            access_token: sessionStorage.getItem("name"),
            orid: this.$route.query.orid,
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
          this.skiprl = response.data.data.url;
          window.location.replace(this.skiprl);
          this.isShowLoading = false;
          return;
        })
        .catch(error => {
          this.isShowLoading = false;
          return;
        });
    },
    // 加加减减
    minus() {
      if (this.result !== 0) {
        this.result--;
        this.numberGagarinMoney -= this.formDatas.val15;
      }
    },
    plus() {
      if (this.result < this.ticketQuantity) {
        this.result++;
        this.numberGagarinMoney += this.formDatas.val15;
      }
    }, 
    // 修改游览日期
    btnModifyTourDate() {
      this.modifyTourDate = true;
    },
    dateSet() {
      this.isShowLoading = true;
      let token = sessionStorage.getItem("name");
      let oridName = this.$route.query.orid;
      let DateValue = new Date(this.tourValueDate).format("yyyy-MM-dd"); 
      let scenicIdIndex = this.scenicIdIndex;
      let usidName = sessionStorage.getItem("userName");
      this.$http.post(this.baseURL + "/ec/distribute/v1/distributeOrderUpdateStdt?access_token=" + token + "&orid=" + oridName + "&tourDate=" + DateValue + "&usid=" + usidName 
        )
        .then(response => {
          
          if(response.data.code === 200){
              this.$Modal.success({
                title: "温馨提示",
                content: '修改成功',
                onOk: () => {
                  setTimeout(() => {
                    this.mySalesAxios();
                  },500);
                }
              });
          } else if (response.data.code === 400) {
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

    //修改备注
    btnModifyRemark() {
      this.modifyRemark = true;
      this.formDatas.val4 = this.noteContent 
    },
    confirmModificationRemarks() {
          this.isShowLoading = true
        this.$http.get(this.baseURL + '/ec/distribute/v1/updatedistributeNote', {
            params: {
                access_token: sessionStorage.getItem("name"),
                orid: this.$route.query.orid,
                note: this.formDatas.val4,
            }
        }).then((response) => {
          if(response.data.code === 200){
              this.$Modal.success({
                title: "温馨提示",
                content: '修改成功',
                onOk: () => {
                  setTimeout(() => {
                    this.mySalesAxios();
                  },500);
                }
              });
          } else if(response.data.code === 400){
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
             let noteDateContent = response.data.data.orderInfo.note;
            noteDateContent = this.formDatas.val4
          this.isShowLoading = false;
          return;
        }).catch((error) => {
          this.isShowLoading = false;
          return;
        })
    },
    // 全部退订
    btnModifyOrder() {
      this.modifyOrder = true;
	},
	instance() {
		this.isUnreg = true;
	},
    // instance() {
    //   this.$Modal.info({
    //     title: "全部退订",
    //     content: "是否全部退订？",
    //     onOk: () => {
    //       setTimeout(() => {
    //       let token = sessionStorage.getItem("name");
    //       let oridName = this.$route.query.orid;
    //       let userName = sessionStorage.getItem("userName");
    //       let refundFeeName =  this.orderAmountText;
    //       this.$http.post(this.baseURL + '/ec/distribute/v1/distributeOrderRefund?access_token=' + token + '&orid=' + oridName + '&usid=' + userName + '&refundFee=' + refundFeeName, {

    //       }).then(response => {
    //         this.mySalesAxios();
    //         if(response.data.code === 200){
    //           this.$Modal.success({
    //               title: '温馨提示',
    //               content: response.data.msg
    //           });
    //         } else if(response.data.code === 400){
    //           this.$Modal.error({
    //               title: '温馨提示',
    //               content: response.data.msg
    //           });
    //         }

    //       }).catch(error => {
    //       })
    //     },500)
    //     }
    //   });
    // },
    determineCancel(){
        
    },

    handleQuery() {},
    handleChangePage() {}
  }
};
</script>


<style scoped>
.Modify-the-remark {
  margin-top: 20px;
}
.mysaleDate {
  margin: 30px 0 30px 100px;
}
.mySalesDate2-table {
    border: 1px solid #ccc;
    text-align: right;
    padding: 10px 25px;
    border-top: 0;
    font-size: 14px;
    position: relative;
    margin-top: 0px
}
.btnModifyTourDate {
  margin-right: 10px;
}
.Order-processing-detail-list {
  margin-bottom: 10px;
  font-size: 14px;
}
.locationWrong {
  margin: 16px 20px 20px;
  text-align: center;
  position: relative;
  /* z-index: 9999; */
}
.div-table {
  border: 1px solid #ccc;
  text-align: right;
  margin-top: -69px;
  padding: 10px 25px;
  border-top: 0;
  font-size: 14px;
}
.cardTitle {
  font-size: 16px;
  color: #4e81f0;
  margin: 42px 0 5px;
  font-weight: 600;
}
.amend-cardTitle {
  margin-bottom: 15px;
}
.ivu-btn-primary {
  background: none;
  color: #2d8cf0;
}
.ivu-breadcrumb > span:last-child {
  color: #4e81f0;
}

#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-top: 20px;
}

#customers td,
#customers th {
  border: 1px solid #e8eaec;
  padding: 10px;
  text-align: left;
}

#customers th {
  text-align: left;
  padding:10px;
  background-color: #f8f8f9;
  color: #515a6e;
}

#customers tr.alt td {
  color: #000000;
  background-color: #eaf2d3;
}
.title-name {
  width: 100%;
  border: 1px solid #ccc;
  border-bottom: 0;
  text-align: center;
  padding: 8px 0;
  background-color: #f8f8f9;
  font-size: 14px;
}
.Order-processing-detail-list span {
  margin-right: 25px;
}
.amend-cardTitle a {
  margin-left: 20px;
}
.orderProcessingMoney {
  margin-right: 20px;
  display: inline-block;
}
</style>
