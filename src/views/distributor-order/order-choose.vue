<template>
  <div id="orderChoose">
    <template v-if="isShowLoading">
      <loading></loading>
    </template>
    <Menu theme="light" active-name="1-1" width="200px" style="float: left;margin-left: 32px;" class="menuStyle">
      <MenuItem name="1-1">{{ providerName }}</MenuItem>
    </Menu>
    <div class="wrap">
      <h3>基本信息</h3>
      <detail-form :isHasTable="false" :formDatas="formDatas" :isBtn="false" :ruleDatas="ruleValidate" :formItemList="formItemList" @showTreeModal="showTreeModal" @clickTreeNode="clickTreeNode" @expandTree="expandTree">
      </detail-form>
      <h3 v-show="isShowInfo" style="margin-top: 35px;">入园信息</h3>
      <div class="touristList">
        <div class="tourist" v-for="(item,idx) in touristList" :key="idx" style="width: 50%;float: left;margin-bottom: 30px;">
          <detail-form :isHasTable="false" :formDatas="item.formDatas" :isBtn="false" :ruleDatas="ruleValidate" :formItemList="item.formItemList">
          </detail-form>
        </div>
      </div>

      <radio-table :colname="colnames" :total="total" :tableData="tableData" :isRadio="true" :isPage="false" :isAddClickEvent="true" @selected="handleSelect">
      </radio-table>
      <Button type="primary" class="submitBtn" @click="submitChoose">确定</Button>
    </div>
  </div>
</template>

<script>
import Amount from "@/views/distributor-order/amount.vue";
// import RowSelect from '@/views/travel-offcial-network/distributor-order/row-select.vue';
export default {
  name: "order-first",
  data() {
    return {
      total: 0,
      tableData: [],
      rowData: null,

      /* 领票人 */
      formDatas: {
        rzti: new Date(), // 游览日期
        szregionalid: "", // 客源地id，请求用
        regionName: "", // 客源地名称
        daoyou: "", // 取票人
        mobile: "", // 联系方式
        zjhm: "" // 证件号码
      },
      ruleValidate: {
        rzti: [
          {
            required: true,
            message: "请选择游览日期",
            trigger: "blur"
          }
        ],
        regionName: [
          {
            required: true,
            message: "请选择客源地",
            trigger: "blur"
          }
        ],
        daoyou: [
          {
            required: true,
            message: "请填写取票人姓名",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            message: "请填写手机号码",
            trigger: "blur"
          }
        ],
        zjhm: [
          {
            required: true,
            message: "请填写身份证号码",
            trigger: "blur"
          }
        ]
      },
      formItemList: [
        {
          type: 5,
          label: "游览日期",
          keyName: "rzti",
          isAddTips: true,
          tips: "",
          startOptions: null
        },
        {
          type: 9,
          label: "客源地",
          keyName: "regionName",
          btnLabel: "选择",
          treeData: [],
          title: "选择客源地"
        },
        {
          type: 1,
          keyName: "daoyou",
          label: "取票人姓名",
          placeholder: "请填写取票人姓名"
        },
        {
          type: 1,
          keyName: "mobile",
          label: "手机号码",
          placeholder: "请填写手机号码"
        },
        {
          type: 1,
          keyName: "zjhm",
          label: "身份证号码",
          placeholder: "请输入18位身份证号码"
        }
      ],
      colnames: [
        {
          title: "票名",
          key: "sztickettypename",
          minWidth: 180
        },
        {
          title: "选择时间段",
          minWidth: 200,
          render: (h, params) => {
            if (params.row.isTime === 0) {
              // 0--景区营业时间内全天有效  1--分时预约
              return h("span", "景区营业时间内全天有效");
            }
            if (params.row.isTime === 1) {
              let list = params.row.timeList.map(item => {
                return {
                  value: item.id,
                  label: item.showDate
                };
              });
              return h(
                "div",
                {
                  on: {
                    click: e => {
                      e.stopPropagation();
                    }
                  }
                },
                [
                  h(
                    "Select",
                    {
                      props: {
                        value: this.fsList.filter(
                          item => item.ticketId === params.row.icrowdkindpriceid
                        )[0].fstimeid,
                        "label-in-value": true
                      },
                      on: {
                        "on-change": options => {
                          // console.log(options)
                          this.fsList.filter(
                            item =>
                              item.ticketId === params.row.icrowdkindpriceid
                          )[0].fstimeid = options.value;
                          this.fsList.filter(
                            item =>
                              item.ticketId === params.row.icrowdkindpriceid
                          )[0].fsVal = options.label;
                          // console.log(this.fsList);
                        }
                      }
                    },
                    list.map(item => {
                      return h("Option", {
                        props: {
                          value: item.value,
                          label: item.label,
                          transfer: true
                        }
                      });
                    })
                  )
                ]
              );
            }
          }
        },
        {
          title: "票种",
          key: "szcrowdkindname",
          minWidth: 180
        },
        {
          title: "单价",
          render: (h, params) => {
            return h("span", "¥ " + params.row.mactualsaleprice);
          },
          width: 100
        },
        {
          title: "佣金",
          width: 100,
          render: (h, params) => {
            if (params.row.commisionType === 0) {
              return h("span", "¥ " + params.row.commision);
            }
            if (params.row.commisionType === 1) {
              return h("span", params.row.commision + " %");
            }
          }
        },
        {
          title: "结算价",
          render: (h, params) => {
            // return h('span', '¥ ' + params.row.jsprice);
            if (params.row.commisionType === 0) {
              return h(
                "span",
                "¥ " +
                  (params.row.mactualsaleprice - params.row.commision).toFixed(
                    2
                  )
              );
            }
            if (params.row.commisionType === 1) {
              return h(
                "span",
                "¥ " +
                  (
                    params.row.mactualsaleprice *
                    (1 - params.row.commision / 100)
                  ).toFixed(2)
              );
            }
          },
          width: 100
        },
        {
          title: "预定数量",
          width: 140,
          render: (h, params) => {
            return h(Amount, {
              props: {
                ticketId: params.row.icrowdkindpriceid
              }
            });
          }
        },
        {
          title: "小计",
          width: 100,
          render: (h, params) => {
            let amount = this.$store.state.distributorOrder.ticketInfo.filter(
              item => item.ticketId === params.row.icrowdkindpriceid
            )[0].amount;
            if (params.row.commisionType === 0) {
              let calc1 =
                amount * (params.row.mactualsaleprice - params.row.commision);
              // return h('span', '¥ ' + (Math.floor(calc1 * 100) / 100).toFixed(2));
              return h("span", "¥ " + calc1.toFixed(2));
            } else if (params.row.commisionType === 1) {
              let calc2 =
                amount *
                (params.row.mactualsaleprice *
                  (1 - params.row.commision / 100));
              // return h('span', '¥ ' + (Math.floor(calc2 * 100) / 100).toFixed(2));
              return h("span", "¥ " + calc2.toFixed(2));
            }
          }
        }
      ],
      provider: null,
      isShowLoading: false,
      fsList: []
    };
  },
  async created() {
    // console.log(this.$route);
    this.isShowLoading = true;
    this.$store.commit("setStep", 0);
    const res = await this.$api.get(
      this.lee + "/ec/distribute/v1/getProductListForDistributor",
      {
        host: window.location.hostname,
        usid: sessionStorage.getItem("userName"),
        tourDate: this.$handle.formatDate(new Date())
      }
    );
    // console.log(res);
    if (!res) {
      this.isShowLoading = false;
      return;
    }

    // 如果返回数据为空对象，则不做操作
    if (res.data && Object.keys(res.data).length) {
      // 无效票的数组
      let invalidList = [];

      // 如果有分时预约，且返回了时段数组，则存入键值对象数组
      res.data.edmcrowdkindpricetabLis.forEach(item => {
        if (item.isTime === 1) {
          if (item.timeList && item.timeList.length) {
            this.fsList.push({
              ticketId: item.icrowdkindpriceid,
              fstimeid: item.timeList[0].id,
              fsVal: item.timeList[0].showDate
            });
          } else {
            invalidList.push(item.icrowdkindpriceid);
          }
        }
      });

      // 如果有无效票，则过滤掉
      let filterList = [];
      if (invalidList.length) {
        filterList = res.data.edmcrowdkindpricetabLis.filter(item => {
          return !this.$handle.isExist(item.icrowdkindpriceid, invalidList);
        });
      } else {
        filterList = res.data.edmcrowdkindpricetabLis;
      }

      // // console.log(filterList)
      // 门票的下单信息列表,存入vuex，如果返回结果为空数组，则存空数组
      let ticketInfo = [];
      if (filterList.length) {
        ticketInfo = filterList.map(item => {
          let configObj = {
            ticketId: item.icrowdkindpriceid, // 票种id，只能买一种票
            amount: 0, // 数量
            isRealName: item.ipeoplenumrange // 是否实名制 0不是 1是
          };
          if (item.ipeoplenumrange === 1) {
            // 实名制
            configObj = {
              ...configObj,
              touristList: []
            };
          }
          return configObj;
        });
      }
      this.$store.commit("saveAmountList", ticketInfo);

      this.provider = Object.assign({}, this.provider, {
        providerId: res.data.provider.iscenicid,
        providerName: res.data.provider.szscenicname,
        maxDate: res.data.provider.imaxdata // 游览日期上限天数
      });
      this.formItemList[0].tips =
        "* 游览日期最多延后" + res.data.provider.imaxdata + "天";
      this.formItemList[0].startOptions = Object.assign(
        {},
        this.formItemList[0].startOptions,
        {
          disabledDate(date) {
            return (
              date &&
              (date.valueOf() >
                Date.now() + res.data.provider.imaxdata * 1000 * 24 * 3600 ||
                date.valueOf() < Date.now() - 24 * 3600 * 1000)
            );
          }
        }
      );
      // console.log(this.provider)
      this.tableData = filterList;
      this.total = filterList.length;
    }
    this.isShowLoading = false;
  },
  computed: {
    // 景区服务商名称
    providerName() {
      if (!this.provider) {
        return "";
      }
      return this.provider.providerName;
    },
    touristList() {
      let ticketInfo = this.$store.state.distributorOrder.ticketInfo;
      if (
        this.rowData &&
        this.rowData.ipeoplenumrange === 1 &&
        ticketInfo.filter(
          item => item.ticketId === this.rowData.icrowdkindpriceid
        )[0].touristList.length
      ) {
        return ticketInfo.filter(
          item => item.ticketId === this.rowData.icrowdkindpriceid
        )[0].touristList;
      } else {
        return [];
      }
    },
    isShowInfo() {
      let ticketInfo = this.$store.state.distributorOrder.ticketInfo;
      if (
        this.rowData &&
        this.rowData.ipeoplenumrange === 1 &&
        ticketInfo.filter(
          item => item.ticketId === this.rowData.icrowdkindpriceid
        )[0].touristList.length
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    // 展开客源地树菜单
    async showTreeModal() {
      this.isShowLoading = false;
      const region = await this.$api.get(
        this.lee + "/sys/sourceRegion/v1/getLowerRegion",
        {
          iregionalid: 0
        }
      );
      this.formItemList[1].treeData = region.data.map(item => {
        return {
          title: item.szregionalname,
          loading: false,
          children: [],
          treeId: item.szregionalid,
          hasnext: item.hasnext
        };
      });
      this.isShowLoading = false;
      this.$store.commit("changeTreeStatus", true);
    },
    // 点击树菜单节点触发
    async clickTreeNode(nodeArray) {
      this.$store.commit("changeTreeStatus", false);
      const getSzinnername = await this.$api.get(
        this.lee + "/sys/sourceRegion/v1/querySourceregionById",
        {
          iregionalid: nodeArray[0].treeId
        }
      );
      if (!getSzinnername) {
        return;
      }

      this.formDatas.regionName = getSzinnername.data.szinnername;
      this.formDatas.szregionalid = nodeArray[0].treeId;
    },
    // 展开下一级树菜单
    async expandTree({ itemInfo, callback }) {
      if (itemInfo.hasnext === "true") {
        const nextRegionRes = await this.$api.get(
          this.lee + "/sys/sourceRegion/v1/getLowerRegion",
          {
            iregionalid: itemInfo.treeId
          }
        );
        if (!nextRegionRes) {
          return;
        }

        const nextTreeData = nextRegionRes.data.map(item => {
          if (item.hasnext === "false") {
            return {
              title: item.szregionalname,
              treeId: item.szregionalid
            };
          } else {
            return {
              title: item.szregionalname,
              loading: false,
              children: [],
              treeId: item.szregionalid,
              hasnext: item.hasnext
            };
          }
        });
        callback(nextTreeData);
      } else {
        return;
      }
    },
    // 选择一种门票
    handleSelect(rowData) {
      console.log(rowData);
      this.rowData = rowData;
    },
    // 提交订单
    async submitChoose() {
      if (!this.rowData) {
        this.$Modal.warning({
          title: "温馨提示",
          content: "请选择一种门票！"
        });
        return;
      }
      if (
        !this.$store.state.distributorOrder.ticketInfo.find(
          item => item.ticketId === this.rowData.icrowdkindpriceid
        ).amount
      ) {
        this.$Modal.warning({
          title: "温馨提示",
          content: "您忘记添加门票啦！"
        });
        return;
      }

      let content1 = "",
        content2 = "",
        content3 = "",
        content4 = "",
        content5 = "",
        isValited = true,
        isCurrDay = false;

      /* 验证日期是否正确，不能小于当前日期，不能大于上限日期 */
      // 处理已选择日期，舍去时分秒
      let dateString = this.$handle.formatDate(this.formDatas.rzti), // 转成 yyy-mm-dd 格式
        date = new Date(dateString + "T00:00:00"), // 重新转成日期标准格式
        milliseconds = date.getTime(); // 得到具体毫秒值

      // 处理当前日期，舍去时分秒
      let currDateString = this.$handle.formatDate(new Date()),
        currDate = new Date(currDateString + "T00:00:00"),
        currMilliseconds = currDate.getTime(),
        dateInterval = (milliseconds - currMilliseconds) / 1000 / 3600 / 24;

      if (dateInterval < 0) {
        content1 = "游览日期不能小于当前日期！";
        isValited = false;
      } else if (dateInterval > this.provider.maxDate) {
        content1 = "游览日期最多延后" + this.provider.maxDate + "天！";
        isValited = false;
      } else if (dateInterval === 0) {
        isCurrDay = true;
      }

      // 验证其他值
      let regPhone = /^(13[0-9]|14[5-9]|15[0-9]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
      if (this.formDatas.regionName === "") {
        content2 = "客源地不能为空！";
        isValited = false;
      }
      if (this.formDatas.daoyou === "") {
        content3 = "取票人姓名不能为空！";
        isValited = false;
      }
      if (this.formDatas.mobile === "") {
        content4 = "取票人手机号码不能为空！";
        isValited = false;
      } else if (!regPhone.test(this.formDatas.mobile)) {
        content4 = "请输入正确的11位取票人手机号码！";
        isValited = false;
      }
      if (this.formDatas.zjhm === "") {
        content5 = "取票人身份证号码不能为空！";
        isValited = false;
      } else if (!this.$handle.validateReg.idCard(this.formDatas.zjhm)) {
        content5 = "请输入正确的取票人身份证号码！";
        isValited = false;
      }

      if (!isValited) {
        this.$Modal.warning({
          title: "温馨提示",
          render: h => {
            return h(
              "div",
              {
                style: {
                  marginLeft: "15px"
                }
              },
              [
                h(
                  "p",
                  {
                    style: {
                      fontSize: "12px",
                      marginBottom: "10px"
                    }
                  },
                  content1
                ),
                h(
                  "p",
                  {
                    style: {
                      fontSize: "12px",
                      marginBottom: "10px"
                    }
                  },
                  content2
                ),
                h(
                  "p",
                  {
                    style: {
                      fontSize: "12px",
                      marginBottom: "10px"
                    }
                  },
                  content3
                ),
                h(
                  "p",
                  {
                    style: {
                      fontSize: "12px",
                      marginBottom: "10px"
                    }
                  },
                  content4
                ),
                h(
                  "p",
                  {
                    style: {
                      fontSize: "12px",
                      marginBottom: "10px"
                    }
                  },
                  content5
                )
              ]
            );
          }
        });
        return;
      }

      // 如果是实名制票 需验证是否完整填写入园信息 且身份证号唯一
      if (this.rowData.ipeoplenumrange === 1) {
        let ticketInfo = this.$store.state.distributorOrder.ticketInfo,
          chooseTicket = ticketInfo.filter(item => {
            return item.ticketId === this.rowData.icrowdkindpriceid;
          }),
          list = chooseTicket[0].touristList;

        // 验证填写信息是否为空
        let isFull = list.every(item => {
          let valueList = Object.values(item.formDatas);
          if (valueList.indexOf("") === -1) {
            return true;
          } else {
            return false;
          }
        });
        if (!isFull) {
          this.$Modal.warning({
            title: "温馨提示",
            render: h => {
              return h(
                "div",
                {
                  style: {
                    paddingTop: "20px",
                    paddingLeft: "15px"
                  }
                },
                [
                  h(
                    "p",
                    {
                      style: {
                        fontSize: "12px",
                        marginBottom: "10px"
                      }
                    },
                    "您选择的是实名制门票，需要填写完整的实名入园信息！"
                  ),
                  h(
                    "p",
                    {
                      style: {
                        fontSize: "12px",
                        marginBottom: "10px"
                      }
                    },
                    "(注：每一张实名制门票都需要填写个人的入园信息)"
                  )
                ]
              );
            }
          });
          return;
        }

        // 验证手机号码格式是否正确
        let phoneList = list.map(item => {
          return item.formDatas.telNumber;
        });

        // 存储错误的手机号码
        let errorPhoneList = [];
        phoneList.forEach(item => {
          if (!this.$handle.validateReg.phoneNumber(parseInt(item))) {
            errorPhoneList.push(item);
          }
        });

        // 判断错误的手机号码列表是否为空
        if (errorPhoneList.length) {
          this.$Modal.warning({
            title: "温馨提示",
            content:
              "您填写的以下手机号码（" +
              errorPhoneList.join("、") +
              "）格式错误，请重新输入！"
          });
          return;
        }

        // 验证身份证是否重复及是否正确
        // 获取填写的实名制入园人身份证号码列表 idCardList
        let idCardList = list.map(item => {
          return item.formDatas.idNumber;
        });

        // 判断去重前后的身份证号码列表长度是否一致
        let newIdCardList = this.$handle.removeRepeat(idCardList);
        // console.log(newIdCardList)
        if (idCardList.length !== newIdCardList.length) {
          this.$Modal.warning({
            title: "温馨提示",
            content: "实名制门票的身份证号码不能重复，请重新输入！"
          });
          return;
        }

        // 存储错误的身份证号码
        let errorIdList = [];
        idCardList.forEach(item => {
          if (!this.$handle.validateReg.idCard(parseInt(item))) {
            errorIdList.push(item);
          }
        });

        // 判断错误的身份证号码列表是否为空
        if (errorIdList.length) {
          this.$Modal.warning({
            title: "温馨提示",
            content:
              "您填写的以下身份证号码（" +
              errorIdList.join("、") +
              "）不正确，请重新输入！"
          });
          return;
        }
      }

      let currRow = this.$store.state.distributorOrder.ticketInfo.find(
        item => item.ticketId === this.rowData.icrowdkindpriceid
      );
      // 获取门票数量
      let num = currRow.amount;

      // 计算小计
      let totalPrice = 0;
      if (this.rowData.commisionType === 0) {
        let calc3 =
          num * (this.rowData.mactualsaleprice - this.rowData.commision);
        // totalPrice = (Math.floor(calc3 * 100) / 100).toFixed(2);
        totalPrice = calc3.toFixed(2);
      }
      if (this.rowData.commisionType === 1) {
        let calc4 =
          num *
          (this.rowData.mactualsaleprice * (1 - this.rowData.commision / 100));
        // totalPrice = (Math.floor(calc4 * 100) / 100).toFixed(2);
        totalPrice = calc4.toFixed(2);
      }
      if (totalPrice < 0) {
        this.$Modal.warning({
          title: "温馨提示",
          content: "您的佣金设置不合理，无法下单！"
        });
        return;
      }

      // 领票人
      let lprInfoJson = [
        {
          daoyou: this.formDatas.daoyou,
          iscenicid: this.provider.providerId,
          mobile: this.formDatas.mobile,
          rzti: this.$handle.formatDate(this.formDatas.rzti),
          szregionalid: this.formDatas.szregionalid,
          zjhm: this.formDatas.zjhm,
          zjlb: "01"
        }
      ];

      // 订单参数
      let orderPojoJson = [
        {
          basnum: 0,
          freenum: 0,
          icrowdkindid: "1",
          icrowdkindpriceid: this.rowData.icrowdkindpriceid,
          ipeoplenumrange: this.rowData.ipeoplenumrange,
          iscenicid: this.provider.providerId,
          isenough: true,
          issale: 0,
          itickettypeid: this.rowData.itickettypeid,
          listingprice: this.rowData.listingprice,
          mactualsaleprice: this.rowData.mactualsaleprice,
          monthpoint: "0",
          numb: num,
          point: "0",
          scheme: 0,
          scnum: 0,
          totalnum: num,
          yearpoint: "0"
        }
      ];

      // 如果是分时预约票
      if (this.rowData.isTime === 1) {
        let fstimeid = this.fsList.find(
          item => item.ticketId === this.rowData.icrowdkindpriceid
        ).fstimeid;
        let fsVal = this.fsList.find(
            item => item.ticketId === this.rowData.icrowdkindpriceid
          ).fsVal,
          start = fsVal.split("-")[0],
          end = fsVal.split("-")[1];

        if (isCurrDay) {
          let totalMinutes =
            parseInt(end.split(":")[0]) * 60 + parseInt(end.split(":")[1]);
          let currMinutes =
            new Date().getHours() * 60 + new Date().getMinutes();
          if (currMinutes >= totalMinutes) {
            this.$Modal.warning({
              title: "温馨提示",
              content:
                "您设置当日的分时预约时段（" +
                fsVal +
                "）在当前时间（" +
                new Date().getHours() +
                "-" +
                new Date().getMinutes() +
                "）之前，请重新选择！"
            });
            return;
          }
        }
        orderPojoJson[0]["fstimeid"] = fstimeid;
        orderPojoJson[0]["fsstarttime"] = start;
        orderPojoJson[0]["fsendtime"] = end;
      }

      let urlParams = {
        usid: sessionStorage.getItem("userName"),
        lprInfoJson: JSON.stringify(lprInfoJson),
        orderPojoJson: JSON.stringify(orderPojoJson),
        orderChannel: "PC",
        channelName: this.provider.providerName
      };
      let urlParams2 = {
        lprlist: lprInfoJson,
        list: orderPojoJson
      };

      let distributeTouristsJson = [];
      // 入园信息（非实名制没有入园信息）
      if (this.rowData.ipeoplenumrange === 1) {
        let realNameList = currRow.touristList;
        realNameList.forEach(item => {
          item.formDatas = {
            ...item.formDatas,
            scenicId: this.provider.providerId,
            icrowdkindPriceId: this.rowData.icrowdkindpriceid
          };
          distributeTouristsJson.push(item.formDatas);
        });
        urlParams = {
          ...urlParams,
          distributeTouristsJson: JSON.stringify(distributeTouristsJson)
        };
        urlParams2 = {
          ...urlParams2,
          tourist: distributeTouristsJson
        };
      }

      this.isShowLoading = true;

      const confirmOrder = await this.$api.post(
        this.lee + "/ec/distribute/v1/bookProductForDistributor",
        urlParams
      );
      // console.log(confirmOrder);
      if (!confirmOrder) {
        this.isShowLoading = false;
        return;
      }

      this.isShowLoading = false;

      if(this.rowData.commisionType === 0) {
        this.rowData.jsprice = (this.rowData.mactualsaleprice -this.rowData.commision).toFixed(2)
      } else if (this.rowData.commisionType === 1) {
        this.rowData.jsprice = (this.rowData.mactualsaleprice * (1 - this.rowData.commision / 100)).toFixed(2)
      }

      this.$router.push({
        name: "order-confirm",
        params: {
          pageData: confirmOrder,
          usid: sessionStorage.getItem("userName"),
          orderInfo: {
            ...urlParams2
          },
          orderChannel: "PC",
          channelName: this.provider.providerName,
          totalPrice,
          otherInfo: {
            szcrowdkindname: this.rowData.szcrowdkindname,
            commisionType: this.rowData.commisionType,
            commision: this.rowData.commision,
            jsprice: this.rowData.jsprice
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
#orderChoose {
  max-width: 1440px;
  padding-top: 32px;
  background: #fff;
  margin: 0 auto;
  color: #5e5e60;
  overflow: hidden;
  .wrap {
    width: 1122px;
    float: left;
    padding: 0 40px;
    border-left: 1px solid #dbdbde;
    h3 {
      font-size: 20px;
      height: 20px;
      line-height: 1;
      color: #191919;
      margin-bottom: 32px;
      font-family: SourceHanSansCN-Medium;
    }
    .submitBtn {
      width: 240px;
      display: block;
      height: 40px;
      background-color: #4b7ff0;
      color: #fff;
      font-size: 16px;
      letter-spacing: 6px;
      margin: 80px auto 120px;
      &:hover {
        background: #306bea;
      }
    }
    .touristList {
      overflow: hidden;
    }
  }
}
@media all and (min-width: 1349px) and (max-width: 1355px) {
  #orderChoose {
    max-width: 1372px;
    .menuStyle {
      margin-left: 10px !important;
      margin-bottom: 40px;
    }
    .wrap {
      padding: 0 15px;
    }
  }
}
@media all and (max-width: 1348px) {
  #orderChoose {
    .menuStyle {
      margin-left: 55px !important;
      margin-bottom: 40px;
    }
    .wrap {
      padding: 0 15px;
      margin-left: 45px;
      border-left: 0;
    }
  }
}
</style>
