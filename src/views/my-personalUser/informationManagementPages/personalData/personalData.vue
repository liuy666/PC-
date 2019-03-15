<template>
    <div class="frequentContacts" id="personal-data">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>

        <div slot="title" class="cardTitle1">
            <p>常用联系人</p>
            <div class="addGroupBtn">
                <Button @click="newContact"><Icon type="md-add" size="18" color="#4E81F0" class="top2px"/><span class="addGroup">新增联系人</span></Button>
            </div>
        </div>

        <radioTable
            :colname="colnames"
            :total='total'
            :tableData="tableData"
            @on-change="changePage"
            @changePage="handleChangePage"
            @on-page-size-change="changePageSize"
            ></radioTable>

    <Modal v-model="modal5" width="600" :closable="true" :mask-closable="false" :transfer="false">
          <p slot="header">编辑联系人</p>
        <div class="ivu-modal-body-bigdiv">
            <detail-form
                    :formDatas="formDatas"
                    :btnLabelWidth="220"
                    :isHasTable="false"
                    :ruleDatas="ruleDatas"
                    :labelWidth="85"
                    :labelPosition="'left'"
                    :formItemList="formItemList"
                    :isBtn='false'></detail-form>
            <Checkbox v-model="compileSingle" @on-change="changeCompile" class="CheckboxHeight">设为默认旅客</Checkbox>
            <div class="Acommitment">
                <span class="Acommitment-title">易旅通郑重承诺：</span>
                <span class="Acommitment-content">我们将尊重您的个人隐私，您的个人信息不会被公开。</span>
            </div>
          </div>


          <div slot="footer" style="text-align: center">
              <Button type="primary" class="op-btns ok-btn" @click="EditorsSaveAxios">确定</Button>
          </div>
      </Modal>
    <!-- 新建联系人 -->
     <Modal v-model="modal6" width="600" :closable="true" :mask-closable="false" :transfer="false">
          <p slot="header">新建联系人</p>
          <div class="ivu-modal-body-bigdiv">
            <detail-form
                    :isHasTable="false"
                    :formDatas="formDatas"
                    :btnLabelWidth="220"
                    :labelWidth="85"
                    :ruleDatas="ruleDatas"
                    :labelPosition="'left'"
                    :formItemList="formItemList"
                    :isBtn='false'></detail-form>
            <Checkbox v-model="single" @on-change="changeSingle" class="CheckboxHeight">设为默认旅客</Checkbox>
            <div class="Acommitment">
                <span class="Acommitment-title">易旅通郑重承诺：</span>
                <span class="Acommitment-content">我们将尊重您的个人隐私，您的个人信息不会被公开。</span>
            </div>
          </div>


          <div slot="footer" style="text-align: center">
              <Button type="primary" class="op-btns ok-btn" @click="EditorsSave">确定</Button>
          </div>
      </Modal>
    </div>
</template>

<script>
export default {
  data() {
    //邮箱验证
    const validateVal7 = (rule, value, callback) => {
      const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的邮箱地址"));
      } else if(value === '' ) {
        callback(new Error('邮箱地址不能为空'))
      } else {
        callback();
      }
    };
    //身份证验证
    const validateVal9 = (rule, value, callback) => {
      const reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
      if(!reg.test(value)) {
        callback(new Error('请输入正确的身份证'));
      } else if(value === '') {
        callback(new Error('身份证不能为空'))
      } else {
        callback();
      }
    };
    //手机号码验证
    const validateVal6 = (rule, value, callback) => {
      const reg = /^(13[0-9]|14[5-9]|15[0-9]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
      if(!reg.test(value)) {
        callback(new Error('请输入正确的手机号码'));
      } else if(value === ''){
        callback(new Error('手机号码不能为空'))
      } else {
        callback();
      }
    };
    return {
      time: Date.now() - 86400000,
      seqIndexIdNull: 0,
      first: "",
      valueIsfirst: "",
      isfirstName:0,
      indeterminateFalse: false,
      pageNumSelect: 0,
      isLoading: false,
      pageSize: 0,
      total: 0,
      start: 0,
      watchTotal: 0,
      end: 0,
      single: true,
      singleNumber:1,
      compileSingle:false,
      compileSingleNumber: 0,
      totalCount: 0,
      boolNumber:1,
      currentProviderId: 0,
      currentPage: 1,
      pageNumNew: 10,
      rowData: null,
      isQuery: false,
      modal5: false,
      modal6: false,
      isShowLoading: false,
      seqIndexId: Number(),
      formDatas: {
        val1: "",
        val2: "",
        val3: 1,
        val4: "",
        val5: "",
        val6: "",
        val7: "",
        val8: '01',
        val9: "",
        val10: 1,
        val11: ""
      },
      ruleDatas: {
        val1: [
          {
            required:true,
            message:'中文名字不能为空',
            trigger:'blur'
          }
        ],
        val8: [
          {
            required:true,
            message:'证件不能为空',
            trigger:'blur'
          }
        ],
        val9: [
          {
            validator: validateVal9,
            required:true,
            message:'证件不能为空',
            trigger:'blur'
          }
        ],
        val7: [
          {
            validator: validateVal7,
            trigger: "blur"
          }
        ],
        val6: [
          {
            validator: validateVal6,
            required:true,
            trigger:'blur'
          }
        ],
      },
      formItemList: [
        {
          keyName: "val1",
          type: 1,
          label: "中文名字",
          labelWidth:97,
          optionList: []
        },
        {
          keyName: "val2",
          type: 1,
          labelWidth:97,
          label: "英文名字"
        },
        {
          label: "性别",
          type: 2,
          labelWidth:97,
          keyName: "val3",
          optionList: [
            {
              value: 1,
              label: "男"
            },
            {
              value: 2,
              label: "女"
            }
          ]
        },
        {
          keyName: "val4",
          type: 1,
          labelWidth:97,
          label: "国籍"
        },
        {
          keyName: "val5",
          type: 5,
          label: "出生年月日",
          labelWidth:97,
          noTransfer:true,
          startOptions: {
            disabledDate : (date) => {
              return date && date.valueOf() > Date.now()
            }
          }
        },
        {
          keyName: "val6",
          type: 1,
          labelWidth:97,
          label: "手机号",
          dateType: "date"
        },
        {
          keyName: "val7",
          type: 1,
          labelWidth:97,
          label: "邮箱地址"
        },
        {
          label: "选择证件类型",
          type: 2,
          keyName: "val8",
          labelWidth:120,
          optionList: [
            {
              value: '01',
              label: "身份证"
            },
            {
              value: 1,
              label: "护照"
            }
          ]
        },
        {
          placeholder: "输入证件号码",
          keyName: "val9",
          type: 1,
          labelWidth:97,
          label: "证件号码",
        },
        // {
        //   label: "",
        //   type: 3,
        //   keyName: "val10",
        //   labelWidth: 12,
        //   optionList: [
        //     {
        //       value: 'true',
        //       label: "设为默认旅客"
        //     }
        //   ]
        // }
      ],
      colnames: [
        {
          title: "姓名",
          key: "username",
          width:200,
        },
        {
          title: "性别",
          key: "sex",
          width:100,
        },
        {
          title: "手机号",
          key: "mobile",
          width:150,
        },
        {
          title: "证件号码",
          key: "zjhm",
          width:220,
        },
        {
          title: "操作",
          width:268,
          keyName: "val11",
          render: (h, params) => {
            return h("div", [
              h(
                "checkbox",
                {
                  props: {
                    size: "small",
                    value: params.row.isfirst ? true : false
                  },
                  style: {
                    display: "inline-block",
                    marginRight:'25px'
                  },
                  attrs: {
                    label: ""
                  },
                  on: {
                    "on-change": name => {
                      let nameTrue = name;
                      let first = "";
                      if (name == true) {
                        first = "1";
                      } else {
                        first = "0";
                      }

                      const seqIndexId = params.row.seq;
                      const token = sessionStorage.getItem("name");
                      this.$http
                        .put(
                          this.baseURL +
                            "/ec/th/v1/updateIsFirstUser?access_token=" +
                            token +
                            "&seq=" +
                            seqIndexId +
                            "&isfirst=" +
                            first,
                          {}
                        )
                        .then(response => {
                          
                          this.informationAxios();
                        })
                        .catch(error => {
                          
                        });
                    }
                  }
                },
                "默认旅客"
              ),
              h(
                "a",
                {
                  props: {
                    size: "small"
                  },
                  style: {
                    display: "inline-block",
                  },
                  on: {
                    click: () => {
                      this.clickGetAxios(params.row.seq);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  props: {
                    size: "small"
                  },
                  style: {
                    display: "inline-block",
                    marginLeft: "25px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                          title: '消息提示',
                          content: '是否删除这条信息',
                          loading: true,
                          onOk: () => {
                                this.removeIndexAxios(params.row.seq);
                                this.$emit("EditorsSaveAxios", params.row.seq);
                          }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableData: []
    };
  },
  created() {
    this.informationAxios();
  },

  methods: {
    informationAxios() {
      // 页面初始化事件
      this.isShowLoading = true;
      this.$http
        .get(this.baseURL + "/ec/th/v1/viewlistTicketHolder", {
          params: {
            access_token: sessionStorage.getItem("name"),
            usid: sessionStorage.getItem("userName"),
            page: this.currentPage,
            pageSize: "10"
          }
        })
        .then(response => {
          
          let itemTableList = response.data.data.PaginationSupport.items; //渲染表格数据
          let tablePageSize = response.data.data.PaginationSupport.totalCount; //表格数据条数
          let pageSize = response.data.data.PaginationSupport.pageSize; //一页展示多少条
          let formPage = response.data.data.PaginationSupport.startIndex; //page分页
          let itemOptionList = response.data.data.ddztlist; //订单状态
          this.total = tablePageSize;
          this.pageSize = pageSize;
          this.tableData = itemTableList;
          for (let i = 0; i < itemTableList.length; i++) {
            this.valueIsfirst = itemTableList[i].isfirst;
            let gender = itemTableList[i].sex
            if(gender == 1) {
              gender = '男'
              itemTableList[i].sex = gender
            } else if(gender == 2) {
              gender = '女'
              itemTableList[i].sex = gender
            } else {
              gender = ''
              itemTableList[i].sex = gender
            }
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
    //删除事件
    removeIndexAxios(index) {
      this.isShowLoading = true;
      setTimeout(window.location.reload(), 300);
      this.$http
        .delete(this.baseURL + "/ec/th/v1/deleteTicketHolder", {
          params: {
            access_token: sessionStorage.getItem("name"),
            seq: index,
            url: window.location.host
          }
        })
        .then(response => {
          
          let itemTableList = response.data.data.PaginationSupport.items;
          this.tableData = itemTableList;

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
          if(response.data.code === 200) {
            this.informationAxios();
          }
          this.isShowLoading = false;
          return;
        })
        .catch(error => {
          
          this.isShowLoading = false;
          return;
        });
    },
    

    // 编辑
    changeCompile(bool){
      if(bool == true ) {
        this.compileSingleNumber = 1;
        this.compileSingle = true
      } else {
        this.compileSingleNumber = 0;
        this.compileSingle = false
      }
    },
    //点击编辑获取一行信息
    clickGetAxios(seq) {
      this.compileSingleNumber = this.singleNumber
      this.seqIndexId = seq;
      this.isShowLoading = true;
      let ltypeForm = "02";
      let thisDate = this.formDatas.val5;
      let birthDate = new Date(thisDate).format("yyyy-MM-dd");
      this.$http
        .get(this.baseURL + "/ec/th/v1/viewTicketHolder", {
          params: {
            access_token: sessionStorage.getItem("name"),
            seq: this.seqIndexId,
            url: window.location.host
          }
        })
        .then(response => {
          let userMessage = response.data.data.user;
          this.compileSingleNumber = userMessage.isfirst
          let numberFig = Number(userMessage.zjlb);
          this.seqIndexId = userMessage.seq;
          ltypeForm = userMessage.ltype;
          this.formDatas.val1 = userMessage.username;
          this.formDatas.val2 = userMessage.englishsurname;
          this.formDatas.val3 = userMessage.sex;
          this.formDatas.val4 = userMessage.nationality;
          this.formDatas.val5 = userMessage.birthdate;
          this.formDatas.val6 = userMessage.mobile;
          this.formDatas.val7 = userMessage.faxno;
          this.formDatas.val8 = userMessage.zjlb;
          this.formDatas.val9 = userMessage.zjhm;
          this.singleNumber = userMessage.isfirst;
          if(this.compileSingleNumber) {
            this.compileSingle = true
          } else {
            this.compileSingle = false
          }
          this.modal5 = true;
          this.isShowLoading = false;
          return;
        })
        .catch(error => {
          
          this.isShowLoading = false;
          return;
        });
    },
    //点击保存
    EditorsSaveAxios(seq) {
      this.isShowLoading = true;
      let thisDate = this.formDatas.val5;
      let birthDate = new Date(thisDate).format("yyyy-MM-dd");
      let token = sessionStorage.getItem("name");
      let usid = sessionStorage.getItem("userName");
      let action2 = 2;
      let url = window.location.host;
      let modification = {
        seq: this.seqIndexId, //领票人id
        usid: usid, //用户名
        username: this.formDatas.val1, //中文名字
        englishsurname: this.formDatas.val2, //英文名字
        sex: this.formDatas.val3, // 性别
        nationality: this.formDatas.val4, //国籍
        birthdate: birthDate, //出生日期
        mobile: this.formDatas.val6, //手机号码
        faxno: this.formDatas.val7, //邮箱
        zjlb: '01', //证件类型
        zjhm: this.formDatas.val9, //证件号码
        isfirst: this.compileSingleNumber, //是否默认
        ltype: "01" //类型
      };
      this.$http.post( this.baseURL + "/ec/th/v1/saveTicketHolderUser?access_token=" + token + "&usid=" + usid + "&action=" + action2 + "&url=" +  url,  modification )
        .then(response => {
          if(this.formDatas.val6 === '' || this.formDatas.val6 === null){
            this.$Modal.error({
              title: "温馨提示",
              content: '手机号不能为空'
            });
          } else if(this.formDatas.val1 === '' || this.formDatas.val1 === null) {
            this.$Modal.error({
              title: "温馨提示",
              content: '中文名字不能为空'
            });
          } else if(this.formDatas.val9 === '' || this.formDatas.val9 === null) {
            this.$Modal.error({
              title: "温馨提示",
              content: '证件号码不能为空'
            });
          } else if(response.data.code === 200) {
            this.modal5 = false

              this.$Modal.success({
                title: "温馨提示",
                content: '编辑成功',
                onOk: () => {
                  setTimeout(() => {
                    this.informationAxios();
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
          // setTimeout(window.location.reload(), 300)
        })
        .catch(error => {
          
          this.isShowLoading = false;
          return;
        });
    },
    confirmOk(action) {
      
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
      this.isShowLoading = true;
      let pageSizeName = name.page;
      let formPageSize = this.total;
      this.$http
        .get(this.baseURL + "/ec/th/v1/viewlistTicketHolder", {
          params: {
            access_token: sessionStorage.getItem("name"),
            usid: sessionStorage.getItem("userName"),
            page: pageSizeName,
            pageSize: "10",
            url: window.location.host
          }
        })
        .then(response => {
          
          // startIndex
          let itemTableList = response.data.data.PaginationSupport.items;
          let tablePageSize = response.data.data.PaginationSupport.totalCount;
          let tablePageStartIndex =
            response.data.data.PaginationSupport.startIndex;
          let pageSize = response.data.data.PaginationSupport.pageSize; //一页展示多少条
          this.currentPage = tablePageStartIndex;
          this.pageSize = pageSize;
          this.tableData = itemTableList;
          this.total = tablePageSize;

          for (let i = 0; i < itemTableList.length; i++) {
            this.valueIsfirst = itemTableList[i].isfirst;
            let gender = itemTableList[i].sex
            if(gender == 1) {
              gender = '男'
              itemTableList[i].sex = gender
            } else if(gender == 2) {
              gender = '女'
              itemTableList[i].sex = gender
            } else {
              gender = ''
              itemTableList[i].sex = gender
            }
          }
          if (this.isQuery) {
            this.watchTotal = tablePageSize;
          }
          this.rowData = null;
          this.isShowLoading = false;
          return;
        })
        .catch(error => {
          this.isShowLoading = false;
          return;
          
        });
    },
    //选择每页可显示的最大数据条数
    changePageSize(num) {
      this.pageNumNew = num;
      this.setEnd(this.currentPage);
      //父组件接收每页条数
      this.$emit("changePageSize", num);
    },
    //选择页码
    changePage(num) {
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
    },


// 新建
    changeSingle(bool){
      if(bool == false) {
        this.single = false;
        this.boolNumber = 0;
        this.singleNumber = 0;
        this.compileSingleNumber = 0;
      } else {
        this.single = true;
        this.singleNumber = 1;
        this.boolNumber = 1;
        this.compileSingleNumber = 1;
      }
    },
    newContact() {
      this.modal6= true
      this.formDatas.val1 = "";
      this.formDatas.val2 = "";
      this.formDatas.val3 = "";
      this.formDatas.val4 = "";
      this.formDatas.val5 = "";
      this.formDatas.val6 = "";
      this.formDatas.val7 = "";
      this.formDatas.val8 = '01';
      this.formDatas.val9 = "";

      // this.formDatas.val10 = this.boolNumber;
    },
    //保存新建联系人
    EditorsSave() {
      // this.isShowLoading = true;
      let thisDate = this.formDatas.val5;
      let birthDate = new Date(this.formDatas.val5).format("yyyy-MM-dd");

      let token = sessionStorage.getItem("name");
      let action2 = 1;
      let url = window.location.host;
      let usid = sessionStorage.getItem("userName");
      let newlyIncreased  = {
        seq: '', //领票人id
        usid: usid, //用户名
        username: this.formDatas.val1, //中文名字
        englishsurname: this.formDatas.val2, //英文名字
        sex: this.formDatas.val3, // 性别
        nationality: this.formDatas.val4, //国籍
        birthdate: new Date(this.formDatas.val5).format("yyyy-MM-dd"), //出生日期
        mobile: this.formDatas.val6, //手机号码
        faxno: this.formDatas.val7, //邮箱
        zjlb: '01', //证件类型
        zjhm: this.formDatas.val9, //证件号码
        isfirst: this.singleNumber, //是否默认
        ltype: "01" //类型
      };
      this.$http.post(this.baseURL + "/ec/th/v1/saveTicketHolderUser?access_token=" + token + "&usid=" + usid +  "&action=" + action2 + "&url=" + url, newlyIncreased
        )
        .then(response => {
          if(this.formDatas.val1 === '' || this.formDatas.val1 === null){
            this.$Modal.error({
              title: "温馨提示",
              content: '中文名字不能为空'
            });
          } else if(this.formDatas.val6 === '' || this.formDatas.val6 === null) {
            this.$Modal.error({
              title: "温馨提示",
              content: '手机号不能为空'
            });
          } else if(this.formDatas.val9 === '' || this.formDatas.val9 === null ) {
            this.$Modal.error({
              title: "温馨提示",
              content: '请输入正确的身份证'
            });
          } else if(response.data.code === 200) {
            this.modal6 = false
              this.$Modal.success({
                title: "温馨提示",
                content: '新建成功',
                onOk: () => {
                  setTimeout(() => {
                    this.informationAxios();
                  },500);
                }
              });
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
          // setTimeout(window.location.reload(), 300)
        })
        .catch(error => {
          
          this.isShowLoading = false;
          return;
        });

    }
  }
};
</script>

<style scoped lang="less">
    #personal-data {
        .main_picker {
            margin: 0;
        }
        .Acommitment {
            /* width: 80%; */
            background: #f2f6fe;
            border: 1px solid #aec7ff;
            border-radius: 2px;
            padding: 15px 40px;
            margin: 0 auto;
            /*float: left;*/
        }
        .Acommitment-content {
            color: #5e5e60;
            margin-top: 10px;
            display: block;
        }
        .Acommitment-title {
            display: block;
            font-weight: 600;
            font-size: 14px;
            color: #f54112;
        }
        .addBtn {
            display: block;
            text-align: right;
            margin-top: -57px;
            margin-bottom: 30px;
        }
        .ivu-form-item-required .ivu-form-item-label:before {
            content: '*';
            display: inline-block;
            margin-right: 4px;
            line-height: 1;
            font-family: SimSun;
            font-size: 12px;
            color: #ed4014;
            position: absolute;
            left: 40px;
        }
        .ivu-form-label-left .ivu-form-item-label{
            margin-left: 12px;
        }
        .ivu-modal-footer{
            border: none;
        }
    }

    
        .Acommitment {
            /* width: 80%; */
            background: #f2f6fe;
            border: 1px solid #aec7ff;
            border-radius: 2px;
            padding: 15px 40px;
            margin: 0 auto;
            /*float: left;*/
        }
        .Acommitment-content {
            color: #5e5e60;
            margin-top: 10px;
            display: block;
        }
        .Acommitment-title {
            display: block;
            font-weight: 600;
            font-size: 14px;
            color: #f54112;
        }
        .CheckboxHeight {
          padding-bottom:25px;
          font-size: 14px
        }
</style>

