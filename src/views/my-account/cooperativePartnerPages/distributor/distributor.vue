<template>
    <div id="distributionSummary">
        <Row>
            <Breadcrumb separator=">" :style="{margin: '24px 0'}">
                <BreadcrumbItem>我的账户</BreadcrumbItem>
                <BreadcrumbItem>合作伙伴</BreadcrumbItem>
                <BreadcrumbItem>我的分销商</BreadcrumbItem>
            </Breadcrumb>
            <div v-show="currentIndex === 1">
                <detail-form1
                        :isListPage="true"
                        :formDatas="formDatas"
                        :formItemList="formItemList"
                        :need-list-reset="true"
                        @clearFormData="clearFormData"
                        @getFormData="getFormData">
                </detail-form1>
                <div slot="title" class="cardTitle2">
                    <p>分销商列表</p>
                    <div class="addGroupBtn">
                        <Button @click="changeIndex(2)"><Icon type="md-add" size="18" color="#4E81F0" class="top2px"/><span class="addGroup">添加分销商</span></Button>
                    </div>
                </div>
                <radio-table
                        :colname="colname"
                        :total='total'
                        :tableData="tableData"
                        :pageNum="pageNum"
                        :pageCode="pageCode"
                        :loading="loading"
                        :isBorder="true"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                ></radio-table>
            </div>
            <!--新增-->
            <div v-show="currentIndex === 2">
                <div slot="title" class="cardTitle2">
                    <p>添加分销商</p>
                </div>
                <detail-form-area
                        :form-datas="formDatas_add"
                        :form-item-list="formItemList_add"
                        :rule-datas="ruleDatas_add"
                        :label-width="labelWidth_add"
                        :is-list-page="false"
                        :is-mixed="false"
                        :is-close="isClose"
                        :title-list="titleList_add"
                        :btn-loading="btnLoading"
                        @getFormData="getFormData_add"
                        @closeCurrentPage="closeCurrentPage"
                ></detail-form-area>
            </div>
            <!--查看-->
            <div v-show="currentIndex === 3">
                <div slot="title" class="cardTitle2">
                    <p>查看分销商</p>
                </div>
                <view-del-detail
                        :formDatas="formDatas_view"
                        :formItemList="formItemList_view"
                        :label-width="200"
                        :title-list="titleList_view"
                        :is-view="true"
                        :is-show="true"
                        :showTwoCol = "true"
                        :is-close="isClose"
                        @closeCurrentPage="closeCurrentPage"
                ></view-del-detail>
            </div>
            <!--开户-->
            <div v-show="currentIndex === 4">
                <div slot="title" class="cardTitle2">
                    <p>开户信息</p>
                </div>
                <detail-form-area
                        :form-datas="formDatas_account"
                        :form-item-list="formItemList_account"
                        :rule-datas="ruleDatas_account"
                        :is-list-page="false"
                        :is-mixed="false"
                        :need-save="needSave"
                        :is-close="isClose"
                        :btn-loading="btnLoading"
                        :label-width="195"
                        :title-list="titleList_account"
                        :disabledEndDate="disabledEndDate"
                        :disabledEnd="disabledEnd"
                        @getFormData="getFormData_account"
                        @closeCurrentPage="closeCurrentPage"
                ></detail-form-area>
            </div>
            <!--密码初始化-->
            <div v-show="currentIndex === 5">
                <detail-form1
                        :isListPage="false"
                        :is-mixed="false"
                        :formDatas="formDatas_pwd"
                        :formItemList="formItemList_pwd"
                        :rule-datas="ruleDatas_pwd"
                        :is-close="isClose"
                        @getFormData="getFormData_pwd"
                        @closeCurrentPage="closeCurrentPage">
                </detail-form1>
            </div>


            <!--<router-link :to="{path:'/my-account/FillInDistributor'}">-->
            <!--<Button type="ghost" class="addDistributor">开户信息</Button>-->
            <!--</router-link>-->
            <loading v-if="spinShow"></loading>
        </Row>
    </div>
</template>

<script>
    export default {
        data() {
            //开户管理--合约起止时间
            const settlementDays = (rule, value, callback) => {
                if (!this.formDatas_account.contractStartTime && !this.formDatas_account.contractEndTime) {
                    callback(new Error('合约起止时间不能为空'))
                } else if (!this.formDatas_account.contractStartTime && this.formDatas_account.contractEndTime) {
                    callback(new Error('合约起始时间不能为空'))
                } else if (this.formDatas_account.contractStartTime && !this.formDatas_account.contractEndTime) {
                    callback(new Error('合约截止时间不能为空'))
                } else if (Date.parse(this.formDatas_account.contractStartTime) > Date.parse(this.formDatas_account.contractEndTime) ) {
                    callback(new Error('合约起始时间不能大于结束时间'))
                } else {
                    callback();
                }
            };
            return {
                currentIndex: 1,
                spinShow: true,
                isClose: false,
                btnLoading: false,
                tipName: '',
                formDatas: {},
                formItemList: [
                    {
                        keyName:'corpname',
                        type:1,
                        label:'分销商名称',
                        labelWidth: 98
                    },
                    {
                        keyName:'mobile',
                        type:1,
                        label:'手机号码',
                        labelWidth: 90
                    },
                    {
                        keyName:'usid',
                        type:1,
                        label:'用户名',
                        labelWidth: 70
                    },
                    {
                        keyName:'ldate',
                        type:11,
                        label:'注册时间',
                        labelWidth: 85
                    }
                ],
                colname:[
                    {
                        title: "分销商名称",
                        key: "corpname",
                        minWidth:147
                    },
                    {
                        title: "联系人",
                        key: "lname",
                        minWidth: 110
                    },
                    {
                        title: "用户名",
                        key: "usid",
                        minWidth:110
                    },
                    {
                        title: "手机号码",
                        key: "mobile",
                        minWidth:120
                    },
                    // {
                    //     title: "座机号码",
                    //     key: "telno",
                    //     minWidth:110
                    // },
                    {
                        title: "注册时间",
                        key: "ldate",
                        minWidth:140
                    },
                    {
                        title: "所在分组",
                        key: "jgfzName",
                        minWidth:120
                    },
                    {
                        title: "操作",
                        minWidth: 290,
                        render:(h,params) => {
                            let status = params.row.status === '02' ? '启用' : '停用';
                            return h('span', [
                                h('span', {
                                    'class': 'hover_span',
                                    style:{
                                        marginRight:'10px'
                                    },
                                    on: {
                                        click:() => {
                                            this.changeIndex(3, params.row.usid)
                                        }
                                    }
                                },'查看'),
                                h('span', {
                                    'class': 'hover_span',
                                    style:{
                                        marginRight:'10px'
                                    },
                                    on: {
                                        click:() => {
                                            this.showDisableDialog(params.row, status)
                                        }
                                    }
                                }, status),
                                h('span', {
                                    'class': 'hover_span',
                                    style:{
                                        marginRight:'10px'
                                    },
                                    on: {
                                        click:() => {
                                            this.changeIndex(5, params.row.usid, params.row)
                                        }
                                    }
                                },'初始化密码'),
                                h('span', {
                                    'class': 'hover_span',
                                    // style:{
                                    //     marginRight:'10px'
                                    // },
                                    on: {
                                        click : () => {
                                            this.changeIndex(4, params.row.usid)
                                        }
                                    }
                                },'开户管理'),
                                // h('span', {
                                //     'class': 'hover_span',
                                //     on: {
                                //         click:() => {
                                //
                                //         }
                                //     }
                                // },'授信管理'),
                            ])
                        }
                    },
                ],
                tableData: [],
                pageCode: 1,
                pageNum: 10,
                total: 0,
                loading: false,
                urlQuery:{},
                //新增----------
                labelWidth_add : 110,
                formDatas_add : {},
                formItemList_add: [
                    {
                        label : "用户名",
                        keyName : "usid",
                        type : 1,
                        hasDec : "数字英文字母组成,最少4位",
                        isRedDec : true,
                        disabled: false,
                        divIndex : 0
                    },
                    {
                        label : "登录密码",
                        keyName : "password",
                        type : 1,
                        isRedDec : true,
                        noShow: false,
                        inputType: 'password',
                        labelWidth: 200,
                        divIndex : 0
                    },
                    {
                        label : "用户状态",
                        keyName : "statusName",
                        type : 1,
                        disabled : true,
                        noShow: true,
                        divIndex : 0,
                    },
                    {
                        label : "用户注册类型",
                        keyName : "lgtpName",
                        type : 1,
                        disabled : true,
                        noShow: true,
                        labelWidth: 200,
                        divIndex : 0
                    },
                    {
                        label : "团队用户类别",
                        keyName : "ttlbName",
                        type : 1,
                        disabled : true,
                        noShow: true,
                        divIndex : 0
                    },
                    {
                        label : "是否主用户",
                        keyName : "ustpName",
                        type : 1,
                        disabled : true,
                        noShow: true,
                        divIndex : 0
                    },
                    {
                        label : "业务类型",
                        keyName : "szbusinessname",
                        type : 1,
                        disabled : true,
                        noShow: true,
                        divIndex : 0
                    },
                    {
                        type : 22,
                        label : "所属地",
                        keyName : "szregionalname",
                        keyName1 : 'iregionalid',
                        btnLabel : "选择",
                        title: '选择地区',
                        multiple: false,
                        showCheckBox: false,
                        treeModal: false,
                        treeData: [],
                        treeType: 4,
                        divIndex : 0
                    },
                    {
                        label : "电子邮件",
                        keyName : "email",
                        type : 1,
                        labelWidth: 200,
                        divIndex : 0
                    },
                    {
                        label : "内部编号",
                        keyName : "bname",
                        type : 1,
                        hasDec : "注：输入大于0的整数",
                        isRedDec : true,
                        divIndex : 0,
                        noShow: true,
                    },
                    {
                        label : "景区企业",
                        keyName : "icompanyinfoid",
                        keyName1 : 'icompanyinfoid',
                        type : 1,
                        divIndex : 0,
                        disabled: true,
                        noShow: true
                        // optionList: []
                    },
                    {
                        label : "联系人",
                        keyName : "lname",
                        type : 1,
                        divIndex : 1
                    },
                    {
                        label : "地址",
                        keyName : "addr",
                        labelWidth: 200,
                        type : 1,
                        divIndex : 1
                    },
                    {
                        label : "手机号码",
                        keyName : "mobile",
                        type : 1,
                        hasDec : "",
                        isRedDec : true,
                        divIndex : 1
                    },
                    {
                        label : "联系电话",
                        keyName : "telno",
                        type : 1,
                        divIndex : 1,
                        noShow: true,
                    },
                    {
                        label : "QQ",
                        keyName : "qq",
                        labelWidth: 200,
                        type : 1,
                        divIndex : 1
                    },
                    {
                        label : "MSN",
                        keyName : "msn",
                        type : 1,
                        divIndex : 1
                    },
                    {
                        label : "企业名称",
                        keyName : "corpname",
                        type : 1,
                        divIndex : 2
                    },
                    {
                        label : "旅行社许可证号",
                        keyName : "tourlicensecode",
                        type : 1,
                        noShow: true,
                        divIndex : 2
                    },
                    {
                        label : "营业执照号码",
                        keyName : "businesslicensescode",
                        labelWidth: 200,
                        type : 1,
                        divIndex : 2
                    },
                    {
                        label : "企业传真",
                        keyName : "faxno",
                        type : 1,
                        divIndex : 2
                    },
                    {
                        label : "企业邮编",
                        keyName : "postno",
                        labelWidth: 200,
                        type : 1,
                        divIndex : 2
                    },
                    {
                        label : "企业网址",
                        keyName : "notea",
                        type : 1,
                        divIndex : 2
                    },
                    {
                        label : "企业简介",
                        keyName : "noteb",
                        type : 7,
                        class : 'one-row-class',
                        divIndex : 2
                    }
                ],
                ruleDatas_add : {
                    usid: [
                        { required: true, validator: this.$reg.usid, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, validator: this.$reg.mobile, trigger: 'blur' }
                    ],
                    email: [
                        { required: true, validator: this.$reg.email, trigger: 'blur' }
                    ],
                    szregionalname: [
                        { required: true, message: '所属地不能为空', trigger: 'change' }
                    ],
                    bname: [
                        { required: true, validator: this.$reg.bname, trigger: 'blur' }
                    ],
                    // tourlicensecode: [
                    //     { required: true, message: '旅行社许可证号不能为空', trigger: 'blur' }
                    // ],
                    businesslicensescode: [
                        { required: true, message: '营业执照号码不能为空', trigger: 'blur' }
                    ],
                    corpname: [
                        { required: true, message: '企业名称不能为空', trigger: 'blur' }
                    ],
                    lname: [
                        { required: true, message: '联系人不能为空', trigger: 'blur' }
                    ],
                    addr: [
                        { required: true, message: '地址不能为空', trigger: 'blur' }
                    ],
                    telno: [
                        { required: true, validator: this.$reg.telno, trigger: 'blur' }
                    ],
                    postno: [
                        { validator: this.$reg.postno, trigger: 'blur' }
                    ],
                },
                titleList_add : [
                    {
                        titleName : '基本资料'
                    },
                    {
                        titleName : '联系信息'
                    },
                    {
                        titleName : '企业信息'
                    },
                ],
                //查看----------
                formDatas_view : {},
                formItemList_view :[
                    {
                        label : '用户编号',
                        keyName : 'usid',
                        divIndex : 0
                    },
                    {
                        label : '用户状态',
                        keyName : 'statusName',
                        divIndex : 0
                    },
                    {
                        label : '用户注册类型',
                        keyName : 'lgtpName',
                        divIndex : 0
                    },
                    {
                        label : "团队用户类别",
                        keyName : "ttlbName",
                        divIndex : 0
                    },
                    {
                        label : "是否主用户",
                        keyName : "ustpName",
                        divIndex : 0
                    },
                    {
                        label : '业务类型',
                        keyName : 'szbusinessname',
                        type: null,
                        divIndex : 0,
                        optionList : []
                    },
                    {
                        label : '所属地',
                        keyName : 'szregionalname',
                        divIndex : 0
                    },
                    {
                        label : '电子邮件',
                        keyName : 'email',
                        divIndex : 0
                    },
                    {
                        label : '内部编号',
                        keyName : 'bname',
                        isHidden: true,
                        type: 1,
                        divIndex: 0
                    },
                    {
                        label: '用户级别',
                        keyName: 'note2',
                        isHidden: true,
                        type: 4,
                        optionList: [],
                        divIndex: 0,
                    },
                    {
                        label : '联系人',
                        keyName : 'lname',
                        divIndex : 1
                    },
                    {
                        label : '地址',
                        keyName : 'addr',
                        divIndex : 1
                    },
                    {
                        label : '手机号码',
                        keyName : 'mobile',
                        divIndex : 1
                    },
                    {
                        label : '联系号码',
                        keyName : 'telno',
                        divIndex : 1
                    },
                    {
                        label : '身份证',
                        keyName : 'note10',
                        divIndex : 1,
                        isHidden: false
                    },
                    {
                        label : 'QQ',
                        keyName : 'qq',
                        divIndex : 1
                    },
                    {
                        label : 'MSN',
                        keyName : 'msn',
                        divIndex : 1
                    },
                    {
                        label : "企业名称",
                        keyName : "corpname",
                        divIndex : 2
                    },
                    {
                        label : "旅行社许可证号",
                        keyName : "tourlicensecode",
                        divIndex : 2
                    },
                    {
                        label : "营业执照号码",
                        keyName : "businesslicensescode",
                        divIndex : 2
                    },
                    {
                        label : "企业传真",
                        keyName : "faxno",
                        isHidden : false,
                        divIndex : 2
                    },
                    {
                        label : "企业邮编",
                        keyName : "postno",
                        isHidden : false,
                        divIndex : 2
                    },
                    {
                        label : "企业网址",
                        keyName : "notea",
                        divIndex : 2
                    },
                    {
                        label : "企业简介",
                        keyName : "noteb",
                        divIndex : 2
                    },
                    {
                        label : '结算系统用户编号',
                        keyName : 'hqytId',
                        divIndex : 3
                    },
                    {
                        label : '结算系统用户账号',
                        keyName : 'applicationName',
                        divIndex : 3
                    },
                    {
                        label : "授信服务（免费）",
                        keyName : "aaa",
                        divIndex : 4
                    },
                    {
                        label : "收款通道业务服务",
                        keyName : "bbb",
                        divIndex : 4
                    },
                    {
                        label : "预付款管理服务（免费）",
                        keyName : "ccc",
                        divIndex : 4
                    },
                ],
                titleList_view : [
                    {
                        titleName : '基本资料'
                    },
                    {
                        titleName : '联系信息'
                    },
                    {
                        titleName : '企业信息'
                    },
                    {
                        titleName : '结算信息'
                    },
                    {
                        titleName : '默认开通服务'
                    },
                ],
                //开户----------
                needSave: true,
                disabledEnd: 0,
                disabledEndDate: [99999,99999],
                ruleDatas_account: {
                    applicationName: [
                        { required: true, validator: this.$reg.applicationName, trigger: 'blur' }
                    ],
                    companyName: [
                        { required: true, message: '企业名称不能为空', trigger: 'blur' }
                    ],
                    website: [
                        { validator: this.$reg.website, trigger: 'blur' }
                    ],
                    registrationNumber: [
                        { required: true, message: '工商注册号不能为空', trigger: 'blur' }
                    ],
                    organizationCode: [
                        { required: true, message: '组织机构代码不能为空', trigger: 'blur' }
                    ],
                    corporate: [
                        { required: true, message: '法人信息不能为空', trigger: 'blur' }
                    ],
                    corporateIdentity: [
                        { required: true, validator: this.$reg.IDcard, trigger: 'blur' }
                    ],
                    businessContact: [
                        { required: true, message: '业务联系人不能为空', trigger: 'blur' }
                    ],
                    businessTel: [
                        { required: true, validator: this.$reg.mobile, trigger: 'blur' }
                    ],
                    businessContactEmail: [
                        { required: true, validator: this.$reg.email, trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '开户城市不能为空', trigger: 'blur' }
                    ],
                    subbranch: [
                        { required: true, message: '开户支行不能为空', trigger: 'blur' }
                    ],
                    settleBankAccount: [
                        { required: true, message: '银行账号不能为空', trigger: 'blur' }
                    ],
                    settleBankAccountName: [
                        { required: true, message: '银行开户名不能为空', trigger: 'blur' }
                    ],
                    settlementDays: [
                        { required: true, validator: this.$reg.settlementDays, trigger: 'blur' }
                    ],
                    contractStartTime: [
                        { required: true, validator: settlementDays, trigger: 'blur' }
                    ]
                },
                formDatas_account : {},
                formItemList_account: [
                    {
                        type: 1,
                        label: '结算系统商户账号',
                        keyName: 'applicationName',
                        // class: 'one-row-class',
                        // className: 'input-50',
                        divIndex: 0
                    },
                    {
                        type: 1,
                        label: '企业名称',
                        keyName: 'companyName',
                        // class: 'one-row-class',
                        // className: 'input-50',
                        divIndex: 0
                    },
                    {
                        type: 1,
                        label: '企业网站',
                        keyName: 'website',
                        // class: 'one-row-class',
                        // className: 'input-50',
                        divIndex: 0
                    },
                    {
                        type: 1,
                        label: '企业地址',
                        keyName: 'address',
                        // class: 'one-row-class',
                        // className: 'input-50',
                        divIndex: 0
                    },
                    {
                        type: 1,
                        label: '工商注册号',
                        keyName: 'registrationNumber',
                        divIndex: 0
                    },
                    {
                        type: 1,
                        label: '组织结构代码',
                        keyName: 'organizationCode',
                        divIndex: 0
                    },
                    {
                        type: 1,
                        label: '法人',
                        keyName: 'corporate',
                        divIndex: 0
                    },
                    {
                        type: 1,
                        label: '法人身份证',
                        keyName: 'corporateIdentity',
                        divIndex: 0
                    },
                    {
                        type: 4,
                        label: '行业类别',
                        keyName: 'providerType',
                        optionList: [],
                        divIndex: 0
                    },
                    {
                        label : '开户状态',
                        keyName : 'openState',
                        type : 4,
                        disabled: true,
                        noShow: true,
                        divIndex : 0,
                        optionList: [
                            {
                                value: 0,
                                label: '开户中'
                            },
                            {
                                value: 1,
                                label: '成功'
                            },
                            {
                                value: 2,
                                label: '失败'
                            },
                        ]
                    },
                    {
                        label : '结算审核原因',
                        keyName : 'refuseReason',
                        type : 7,
                        disabled: true,
                        noShow: true,
                        divIndex : 0
                    },
                    {
                        type: 1,
                        label: '业务联系人',
                        keyName: 'businessContact',
                        // class: 'one-three-class',
                        divIndex: 1
                    },
                    {
                        type: 1,
                        label: '财务联系人',
                        keyName: 'customerContact',
                        // class: 'one-three-class',
                        divIndex: 1
                    },
                    {
                        type: 1,
                        label: '业务联系人手机',
                        keyName: 'businessTel',
                        // class: 'one-three-class',
                        divIndex: 1
                    },
                    {
                        type: 1,
                        label: '财务联系人手机',
                        keyName: 'customerTel',
                        // class: 'one-three-class',
                        divIndex: 1
                    },
                    {
                        type: 1,
                        label: '业务联系人邮箱',
                        keyName: 'businessContactEmail',
                        // class: 'one-three-class',
                        divIndex: 1
                    },
                    {
                        type: 1,
                        label: '财务联系人邮箱',
                        keyName: 'customerContactEmail',
                        // class: 'one-three-class',
                        divIndex: 1
                    },
                    {
                        type: 1,
                        label: '技术联系人',
                        keyName: '',
                        class: 'one-three-class',
                        divIndex: 1,
                        noShow: true,
                    },
                    {
                        type: 1,
                        label: '技术联系人手机',
                        keyName: '',
                        class: 'one-three-class',
                        divIndex: 1,
                        noShow: true,
                    },
                    {
                        type: 1,
                        label: '技术联系人邮箱',
                        keyName: '',
                        class: 'one-three-class',
                        divIndex: 1,
                        noShow: true,
                    },
                    {
                        label : '合约时间',
                        keyName : 'contractStartTime',
                        keyName1 : 'contractEndTime',
                        type : 11,
                        double : true,
                        divIndex : 2
                    },
                    {
                        type: 4,
                        label: '结算银行',
                        keyName: 'bankId',
                        optionList: [],
                        divIndex: 2
                    },
                    {
                        type: 1,
                        label: '开户城市',
                        keyName: 'city',
                        divIndex: 2
                    },
                    {
                        type: 1,
                        label: '开户支行',
                        keyName: 'subbranch',
                        divIndex: 2
                    },
                    {
                        type: 1,
                        label: '银行开户名',
                        keyName: 'settleBankAccountName',
                        divIndex: 2
                    },
                    {
                        type: 1,
                        label: '银行账号',
                        keyName: 'settleBankAccount',
                        divIndex: 2
                    },
                    {
                        type: 4,
                        label: '结算费率',
                        keyName: 'settlementRate',
                        optinonList: [],
                        divIndex: 2
                    },
                    {
                        type: 16,
                        label: '结算周期',
                        keyName: 'settlementDays',
                        textConBefore: 'T + ',
                        textConAfter: ' 天',
                        divIndex: 2
                    },
                    {
                        label : "授信服务（免费）",
                        keyName : "aaa",
                        type : 1,
                        disabled: true,
                        divIndex : 3
                    },
                    {
                        label : "收款通道业务服务",
                        keyName : "bbb",
                        type : 1,
                        disabled: true,
                        divIndex : 3
                    },
                    {
                        label : "预付款管理服务（免费）",
                        keyName : "ccc",
                        type : 1,
                        disabled: true,
                        divIndex : 3
                    },
                ],
                titleList_account : [
                    {
                        titleName : '企业信息'
                    },
                    {
                        titleName : '联系信息'
                    },
                    {
                        titleName : '结算信息'
                    },
                    {
                        titleName : '默认开通服务'
                    },
                ],
                //密码初始化-----------
                formDatas_pwd: {},
                ruleDatas_pwd: {
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                },
                formItemList_pwd: [
                    {
                        type: 1,
                        label: '用户名',
                        keyName: 'usid',
                        disabled: true
                    },
                    {
                        type: 1,
                        label: '密码',
                        keyName: 'password',
                        inputType: 'password',
                        hasDec: '初始密码(66666666)',
                        isRedDec: true
                    },
                ],
            }
        },
        methods: {
            changeIndex (index,id,row) {
                this.spinShow = true;
                if (index === 2) {
                    this.tipName = '分销商新增';
                    this.setAddInitData(index)
                } else if (index === 3) {
                    this.setViewInitData(index,id)
                } else if (index === 4) {
                    this.tipName = '分销商开户';
                    this.setAccountInitData(index,id)
                } else if (index === 5) {
                    this.tipName = '密码初始化';
                    this.setPwdInitData(index,id,row)
                }
            },
            changePage (pageCode) {
                this.pageCode = pageCode;
                this.$req.currentPageData('/ec/distributor/v1/getMyDistributorList', this, 'get')
            },
            changePageSize (pageSize) {
                this.pageNum = pageSize;
                this.$req.currentPageData('/ec/distributor/v1/getMyDistributorList', this, 'get')
            },
            getFormData (obj) {
                this.formDatas = obj;
                if (this.formDatas.ldate) {
                    this.formDatas.ldate = this.$req.getCurrentDate(this.formDatas.ldate)
                }
                this.$req.currentPageData('/ec/distributor/v1/getMyDistributorList', this, 'get')
            },
            clearFormData () {
                this.formDatas_add = {};
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pageNum,
                    page: this.pageCode,
                    corpname: this.formDatas.corpname,
                    mobile: this.formDatas.mobile,
                    usid: this.formDatas.usid,
                    ldate: this.formDatas.ldate,
                };
            },
            //新增初始化
            async setAddInitData(index) {
                this.formDatas_add = {
                    status: '01',
                    lgtp: '02',
                    // ustp: '01',
                    usqx: '11110001000000000000',
                    ttlb: '01',
                    ibusinessid: 2,
                    susid: '0',
                    // ustpName: '是',
                    // statusName: '有效用户',
                    // lgtpName: '团体用户',
                    // ttlbName: '分销商',
                    // szbusinessname: '分销商业务',
                };
                this.spinShow = false;
                this.currentIndex = index
            },
            //新增保存
            async getFormData_add (obj) {
                this.btnLoading = true;
                let aaa = '';
                if(this.currentIndex === 2){
                    aaa = await this.$req.addNewData('/ec/custom/v1/CustomInfoSave?flag=1', this, obj, 'post', true)
                }
                this.$req.currentPageData('/ec/distributor/v1/getMyDistributorList', this, 'get')

            },
            //查看初始化
            async setViewInitData (index,id) {
                this.$http.get(this.lee+'/ec/custom/v1/getCustomInfoById',{
                    params: {
                        access_token: sessionStorage.getItem('name'),
                        usid: id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = {
                            ...res.data.data.custom,
                            hqytId: res.data.data.pc ? res.data.data.pc.hqytId : '',
                            applicationName: res.data.data.pc ? res.data.data.pc.applicationName : '',
                            note10: res.data.data.pc ? res.data.data.pc.corporateIdentity : ''
                        };
                        switch (data.status) {
                            case '00': data.statusName = '未审核用户'; break;
                            case '01': data.statusName = '有效用户'; break;
                            case '02': data.statusName = '无效用户'; break;
                            case '03': data.statusName = '审核未通过用户'; break;
                            default: break
                        }
                        data.lgtpName = data.lgtp === '01' ? '散客用户' : '团体用户';
                        data.ttlbName = data.ttlb === '01' ? '分销商' : '导游';
                        data.ustpName = data.ustp === '01'? '是' : '否';
                        this.formDatas_view = data;
                        if (res.data.data.pc && res.data.data.pc.openState === 1) {
                            this.$set(this.formDatas_view, 'aaa', '开通');
                            this.$set(this.formDatas_view, 'bbb', '开通');
                            this.$set(this.formDatas_view, 'ccc', '开通');
                            this.titleList_view = [
                                {
                                    titleName : '基本资料'
                                },
                                {
                                    titleName : '联系信息'
                                },
                                {
                                    titleName : '企业信息'
                                },
                                {
                                    titleName : '结算信息'
                                },
                                {
                                    titleName : '默认开通服务'
                                },
                            ]
                        } else {
                            this.titleList_view = [
                                {
                                    titleName : '基本资料'
                                },
                                {
                                    titleName : '联系信息'
                                },
                                {
                                    titleName : '企业信息'
                                },
                                {
                                    titleName : '结算信息'
                                }
                            ]
                        }
                    } else {
                        this.$req.showMessageModal(this, res, 1)
                    }
                    this.spinShow = false;
                    this.currentIndex = index;
                })
            },
            //分销商停用
            showDisableDialog (row, status) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: `确认${status}该分销商？`,
                    loading: true,
                    onOk: async () => {
                        const url = '/ec/custom/v1/passCustom';
                        let obj = {
                            ibusinessid: row.ibusinessid,
                            note2: row.note2,
                            bname: row.bname,
                            usid: row.usid,
                            lgtp: row.lgtp,
                            ustp: row.ustp,
                            ttlb: row.ttlb,
                            status: row.status !== '02' ? '02' : '01'    //01为启用，02为停用
                        };
                        this.tipName = row.status !== '02' ? '分销商停用' : '分销商启用';
                        const aaa = await this.$req.editData(url, this, obj, 'post');
                        if (aaa) this.$req.currentPageData('/ec/distributor/v1/getMyDistributorList', this, 'get')
                    },
                })
            },
            //获取银行列表 结算费率列表
            getSelectData() {
                return new Promise((resolve,reject) => {
                    this.$http.get(this.lee+'/ticket/provider/v1/queryProviderCompanySelectDataInit',{
                        params: {
                            access_token: sessionStorage.getItem('name')
                        }
                    }).then(res => {
                        if(res.data.code === 200){
                            let options1= [], options2 = [], options3 = [];
                            res.data.data.banks.forEach(element => {
                                let oneOption = {};
                                oneOption["value"] = element.id;
                                oneOption["label"] = element.name;
                                options1.push(oneOption);
                            });
                            res.data.data.rates.forEach(element => {
                                let oneOption = {};
                                oneOption["value"] = element.id;
                                oneOption["label"] = element.memo;
                                options2.push(oneOption);
                            });
                            res.data.data.parameters.forEach(element => {
                                let oneOption = {};
                                oneOption["value"] = element.id;
                                oneOption["label"] = element.name;
                                options3.push(oneOption);
                            });
                            this.formItemList_account[8].optionList = options3;
                            this.formItemList_account[21].optionList = options1;
                            this.formItemList_account[26].optionList = options2;
                            // this.formItemList_account[26].optionList = [{
                            //     value: 2,
                            //     label: '零费率'
                            // }];
                            resolve()
                        }else{
                            this.$req.showMessageModal(this, res, 1);
                            this.spinShow = false;
                            reject();
                        }
                    })
                })
            },
            //开户页面初始化
            async setAccountInitData (index,id) {
                await this.getSelectData();
                this.tipName = '分销商开户';
                this.$http.get(this.lee+'/ticket/provider/v1/queryCreateAccount', {
                    params: {
                        access_token: sessionStorage.getItem('name'),
                        scenicidOrUsid: id,
                        type: '01'
                    }
                }).then(res => {
                    if(res.data.code === 200) {
                        this.needSave = res.data.data.openState === 1 ? false : true
                        this.formDatas_account = res.data.data;
                        this.$set(this.formDatas_account, 'usid', id);
                        this.$set(this.formDatas_account, 'type', '01');
                        this.$set(this.formDatas_account, 'aaa', '开通');
                        this.$set(this.formDatas_account, 'bbb', '开通');
                        this.$set(this.formDatas_account, 'ccc', '开通');
                        this.formDatas_account.providerType = parseInt(this.formDatas_account.providerType);
                        if (!this.formDatas_account.bankId) {
                            this.formDatas_account.bankId = this.formItemList_account[21].optionList[0].value
                        }
                        if (!this.formDatas_account.settlementRate) {
                            this.formDatas_account.settlementRate = this.formItemList_account[26].optionList[0].value
                        }
                        if (!this.formDatas_account.providerType) {
                            this.formDatas_account.providerType = this.formItemList_account[8].optionList[0].value
                        }
                        const openState = this.formDatas_account.openState;
                        if (typeof openState !== 'number') {
                            this.formItemList_account[9].noShow = true;
                        } else {
                            this.formItemList_account[9].noShow = false;
                        }
                        if (openState === 2 && this.formDatas_account.refuseReason) {
                            this.formItemList_account[10].noShow = false
                        } else {
                            this.formItemList_account[10].noShow = true
                        }
                        if (this.formDatas_account.settleBankAccount) {
                            this.formItemList_account[25]['disabled'] = true
                        } else {
                            this.formItemList_account[25]['disabled'] = false
                        }
                    } else {
                        this.$req.showMessageModal(this, res, 1)
                    }
                    this.spinShow = false;
                    this.currentIndex = index
                })
            },
            //开户页面保存
            async getFormData_account (obj) {
                this.btnLoading = true;
                this.$set(obj, 'type', '01');
                obj = JSON.parse(JSON.stringify(obj));
                obj.contractStartTime = this.$req.getCurrentDate(obj.contractStartTime);
                obj.contractEndTime = this.$req.getCurrentDate(obj.contractEndTime);
                const aaa = await this.$req.editData('/ticket/provider/v1/saveAccount', this, obj,'post');
                if (aaa) this.$req.currentPageData('/ec/distributor/v1/getMyDistributorList', this, 'get')
            },
            setPwdInitData (index,id) {
                this.formDatas_pwd = {
                    usid: id,
                    password: '66666666'
                };
                this.spinShow = false;
                this.currentIndex = index
            },
            async getFormData_pwd (obj) {
                let url = '/ec/custom/v1/initCustomPwdSave?';
                let params = {
                    usid: obj.usid,
                    pwd: obj.password,
                    flag: 1,
                };
                for (let i in params) {
                    url += `${i}=${params[i]}&`
                }
                url = url.substr(0,url.length-1);
                const aaa = await this.$req.editData(url, this, {}, 'post', true);
                if (aaa) this.$req.currentPageData('/ec/distributor/v1/getMyDistributorList', this, 'get')
            },
            closeCurrentPage() {
                this.currentIndex = 1;
            }
        },
        created () {
            this.$req.currentPageData('/ec/distributor/v1/getMyDistributorList', this, 'get')
        },
        watch: {
            'formDatas_account.contractStartTime' (val) {
                this.disabledEnd = Date.parse(val);
                this.disabledEndDate = [-1,99999];
            }
        }
    }
</script>

<style lang="less">

</style>
