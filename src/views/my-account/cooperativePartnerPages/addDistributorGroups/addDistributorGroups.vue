<template>
    <div>
        <Row>
            <div>
                <Breadcrumb separator=">" :style="{margin: '24px 0'}">
                    <BreadcrumbItem>我的账户</BreadcrumbItem>
                    <BreadcrumbItem>合作伙伴</BreadcrumbItem>
                    <BreadcrumbItem>分销商分组</BreadcrumbItem>
                </Breadcrumb>
                <div slot="title" class="cardTitle2">
                     <p>{{ pageName }}</p>
                </div>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas_add"
                        :formItemList = "formItemList_add"
                        :rule-datas="ruleDatas_add"
                        :btn-loading="btnLoading"
                        @getFormData = "getFormData"
                        @clearFormData="clearFormData"
                        @chooseBtnEvent = "chooseBtnEvent"
                        @focusInput="focusInput"
                        @backBeforePage="backBeforePage"
                ></detail-form1>
                <div>
                    <Modal v-model="isShow" :mask-closable="false" :closable="true" :width="900">
                        <p slot="header">选择用户</p>
                        <div class="ivu-modal-body-div">
                            <detail-form1
                                    :isListPage="true"
                                    :isMixed="false"
                                    :formName="formName"
                                    :formDatas="formDatas_group"
                                    :formItemList="formItemList_group"
                                    :labelWidth="110"
                                    :btn-label-width="40"
                                    @getFormData="getFormData1"
                                    @clearFormData="clearFormData1"
                            ></detail-form1>
                            <radio-table
                                    :colname="colname"
                                    :total='total'
                                    :tableData="tableData"
                                    :tableSize="tableSize"
                                    :isRadio="false"
                                    :pageNum="pageNum"
                                    :pageCode="pageCode"
                                    :loading="loading"
                                    @selectHasChange="selectHasChange"
                                    @changePage="changePage"
                                    @changePageSize="changePageSize"
                            ></radio-table>
                        </div>
                        <div slot="footer" style="text-align:center" >
                            <Button type="primary" class="op-btns ok-btn" @click="sureEvent">确定</Button>
                            <Button class="op-btns cancel-btn" @click="cancelEvent">关闭</Button>
                        </div>
                    </Modal>
                </div>
            </div>
            <loading v-if="spinShow"></loading>
        </Row>
    </div>
</template>

<script>
    export default {
        data () {
            const validateAmount = (rule, value, callback) => {
                const reg = /(^\d+$)|(^\d+[\.]{1}[0-9]{1,2}$)/;
                if (this.formDatas_add.commisionType) {
                    if (!this.formDatas_add.percentAmount) {
                        callback(new Error('佣金比例不能为空'))
                    } else if (!reg.test(this.formDatas_add.percentAmount)) {
                        callback(new Error('请输入不小于0的数，可保留两位小数'))
                    } else {
                        callback()
                    }
                } else {
                    if (!this.formDatas_add.fixedAmount) {
                        callback(new Error('固定佣金不能为空'))
                    } else if (!reg.test(this.formDatas_add.fixedAmount)) {
                        callback(new Error('请输入不小于0的数，可保留两位小数'))
                    } else {
                        callback()
                    }
                }
            };
            return {
                spinShow: true,
                pageName: '',
                btnLoading: false,
                id: '',
                formName: 'listForm',
                isShow: false,
                tableSize: 'small',
                tipName: '',
                formDatas_add: {},
                ruleDatas_add: {
                    pmcd: [
                        { required: true, message: '价格分组不能为空', trigger: 'blur' }
                    ],
                    commisionType: [
                        { required: true, validator: validateAmount, trigger: 'blur' }
                    ]
                },
                formItemList_add: [
                    {
                        type: 1,
                        label: '价格分组',
                        keyName: 'pmcd',
                        // optionList: [],
                    },
                    // {
                    //     type: 13,
                    //     label: '佣金',
                    //     keyName: 'commisionType',
                    //     errMsg: '',
                    //     optionList: [
                    //         {
                    //             value: 0,
                    //             labelName: '固定佣金',
                    //             keyName: 'fixedAmount',
                    //             className: 'input-tiny',
                    //             dec: ' 元'
                    //         },
                    //         {
                    //             value: 1,
                    //             labelName: '按佣金比例',
                    //             keyName: 'percentAmount',
                    //             className: 'input-tiny',
                    //             dec: ' %'
                    //         },
                    //     ]
                    // },
                    {
                        type: 10,
                        label: '分销商',
                        keyName: 'userIdList',
                        btnLabel: '选择',
                        noshow: false,
                    },
                    {
                        type: 21,
                        label: '',
                        keyName: '',
                        width: '50%',
                        size: 'small',
                        border: true,
                        colname: [
                            {
                                title: '编号',
                                key: 'usid',
                                align: 'center'
                            },
                            {
                                title: '分销商名称',
                                key: 'corpname',
                                align: 'center'
                            },
                            {
                                title: '操作',
                                align: 'center',
                                render: (h, params) => {
                                    return h('span', {
                                        'class': 'hover_span',
                                        on: {
                                            click: () => {
                                                this.removeRow(params.row, params.index)
                                            }
                                        }
                                    }, '删除')
                                }
                            },
                        ],
                        tableData: [],
                        noShow: true
                    },
                    {
                        type: 2,
                        label: '使用状态',
                        keyName: 'byisuse',
                        optionList: [
                            {
                                value: 0,
                                labelName: '禁止'
                            },
                            {
                                value: 1,
                                labelName: '启用'
                            }
                        ]
                    },
                ],
                formDatas_group: {},
                formItemList_group: [
                    {
                        type: 1,
                        label: '名称模糊查询',
                        keyName: 'query'
                    }
                ],
                colname: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        key: 'usid'
                    },
                    {
                        title: '分销商名称',
                        key: 'corpname'
                    },
                    {
                        title: '联系人',
                        key: 'lname'
                    },
                    {
                        title: '手机号码',
                        key: 'mobile'
                    }
                ],
                tableData:[],
                total: 0,
                loading: false,
                pageCode: 1,
                pageNum: 10,
                urlQuery:{},
                showTable: [],  //多选表格选中确认后下方表格数据
                usidArr: [] //多选表格选中确认后下方表格数据主键
            }
        },
        methods: {
            //多选表格选项变化返回已选项
            selectHasChange (arr) {
                let table = JSON.parse(JSON.stringify(this.tableData));
                table.map(item => {
                    this.$set(item, '_checked', false)
                });
                arr.map(item => {
                    this.$set(item, '_checked', true);
                    if (this.showTable.length > 0) {
                        if (this.usidArr.indexOf(item.usid) === -1) {
                            this.showTable.push(item);
                            this.usidArr.push(item.usid)
                        }
                    } else {
                        this.showTable.push(item);
                        this.usidArr.push(item.usid)
                    }
                    for (let obj of table) {
                        if (item.usid === obj.usid) {
                            this.$set(obj, '_checked', true)
                        }
                    }
                });
                this.tableData = table;
                this.tableData.map(item => {
                    let index = this.usidArr.indexOf(item.usid);
                    if (index > -1 && !item._checked) {
                        this.usidArr.splice(index, 1);
                        this.showTable.splice(index, 1);
                    }
                });
            },
            async getFormData1 (data) {   //对话框条件查询
                this.formDatas_group = data;
                this.pageCode = 1;
                this.pageNum = 10;
                await this.$req.currentPageData('/ec/custom/v1/querySonDistributor', this, 'get');
                this.checkIschecked();
            },
            clearFormData () {

            },
            clearFormData1 () {
                this.formDatas_group = {}
            },
            async changePage (pageCode) {
                this.pageCode = pageCode;
                await this.$req.currentPageData('/ec/custom/v1/querySonDistributor', this, 'get');
                this.checkIschecked();
            },
            async changePageSize (pageSize) {
                this.pageNum = pageSize;
                await this.$req.currentPageData('/ec/custom/v1/querySonDistributor', this, 'get');
                this.checkIschecked();
            },
            setPageName () {
                if(this.$route.name.indexOf('add') != -1){
                    this.pageName = '添加分销商分组';
                    this.tipName = '分销商分组新增';
                    this.setAddInitData()
                } else {
                    this.pageName = '修改分销商分组';
                    this.tipName = '分销商分组修改';
                    this.setEditInitData()
                }
            },
            setAddInitData () {
                this.formItemList_add[0]['disabled'] = false;
                this.formDatas_add = {
                    byisuse: 1,
                    commisionType: 0,
                    configStatus: 0,  //隐含参数--产品状态
                };
                this.spinShow = false
            },
            setEditInitData () {
                this.formItemList_add[0]['disabled'] = true;
                this.$http.get(this.lee+'/ticket/jgfz/v1/queryJgfzById',{
                    params: {
                        access_token: sessionStorage.getItem('name'),
                        seq: this.$route.params.id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        this.formDatas_add = data;
                        if (this.formDatas_add.commisionType) {
                            this.formDatas_add.percentAmount = this.formDatas_add.commisionNum
                        } else {
                            this.formDatas_add.fixedAmount = this.formDatas_add.commisionNum
                        }
                        let arr = JSON.parse(data.customListJson);
                        if (arr.length) {
                            arr = arr.filter(item => {
                                return item !== null
                            });
                            let arr1 = [];
                            arr.map(item => {
                                this.usidArr.push(item.usid)
                            });
                        }
                        this.$set(this.formDatas_add, 'userIdList', this.usidArr.join(','));
                        this.showTable = JSON.parse(data.customListJson).filter(item => {
                             return item !== null
                        });
                        if (this.showTable.length) {
                            let height = this.showTable.length * 40 + 34;
                            this.formItemList_add[2].noShow = false;
                            this.showTable.map(item => {
                                this.$set(item, '_checked', true);
                            });
                            this.formItemList_add[2].tableData = JSON.parse(JSON.stringify(this.showTable));
                            this.formItemList_add[2].height = height > 434 ? 434 : height;
                        }
                        this.spinShow = false
                    } else {
                        this.$req.showMessageModal(this, res, 1);
                        this.spinShow = false
                    }
                });
            },
            async chooseBtnEvent () {
                this.formDatas_group = {};
                await this.$req.currentPageData('/ec/custom/v1/querySonDistributor', this, 'get');
                this.checkIschecked();
                this.isShow = true;
            },
            checkIschecked () {   //判断表格项是否之前被勾选，如果是，赋上_checked:true
                this.tableData.map(item => {
                    if (this.usidArr.length) {
                        let index = this.usidArr.indexOf(item.usid);
                        if (index > -1) {
                            this.$set(item, '_checked', true)
                        }
                    }
                });
            },
            sureEvent () {
                if (this.showTable.length) {
                    this.$set(this.formDatas_add, 'userIdList', this.usidArr.join(','));
                    let height = this.showTable.length * 40 + 34;
                    this.formItemList_add[2].noShow = false;
                    this.formItemList_add[2].tableData = JSON.parse(JSON.stringify(this.showTable));
                    this.formItemList_add[2].height = height > 434 ? 434 : height;
                    this.isShow = false
                } else {
                    this.$req.showMessageModal(this, '请至少选择一条数据', 2);
                }
            },
            cancelEvent () {
                this.isShow = false
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    query: this.formDatas_group.query,
                    pageSize: this.pageNum,
                    page: this.pageCode,
                    usId: sessionStorage.getItem('userName'),
                    host: window.location.hostname
                };
            },
            focusInput (val) {   //输入框聚焦改变对应的单选值
                this.formDatas_add.commisionType = val
            },
            removeRow (row, index) {   //分销商下方表格行数据
                this.$Modal.confirm({
                    title: `温馨提示`,
                    content: '确定删除该条记录',
                    onOk: () => {
                        this.showTable.splice(index, 1);
                        this.formItemList_add[2].tableData = JSON.parse(JSON.stringify(this.showTable));
                        if (!this.showTable.length) {
                            this.formItemList_add[2].noShow = true;
                        }
                        this.formItemList_add[2].height -= 40;
                        this.usidArr.splice(index, 1);
                        this.$set(this.formDatas_add, 'userIdList', this.usidArr.join(','));
                        setTimeout(() => {  //不设置延迟或延迟时间太短 ，执行onOK时第二个对话框的确定按钮也会被点击
                            this.$req.showMessageModal(this, '删除成功', 3)
                        }, 300);
                    }
                });
            },
            async getFormData (obj) {
                this.btnLoading = true;
                // if (!this.formValidation(obj)) return;
                obj = JSON.parse(JSON.stringify(obj));
                obj.commisionNum = obj.fixedAmount ? obj.fixedAmount : obj.percentAmount;
                delete obj.fixedAmount;
                delete obj.percentAmount;
                if (this.pageName === '添加分销商分组') {
                    this.$req.addNewData('/ticket/jgfz/v1/saveJgfz?strutsAction=1', this, obj, 'post', true, 'distributorGroup')
                } else if (this.pageName === '修改分销商分组') {
                    this.$req.editData('/ticket/jgfz/v1/saveJgfz?strutsAction=2', this, obj, 'post', true, 'distributorGroup')
                }

            },
            backBeforePage () {
                this.$router.push({
                    name: 'distributorGroup'
                })
            },
        },
        created () {
            this.setPageName();
            // this.formDatas_add = {
            //     byisuse: 1,
            //     commisionType: 0,
            //     configStatus: 0,  //隐含参数--产品状态
            // };
            // this.spinShow = false;
        },
        watch: {
            'formDatas_add.commisionType' (val) {   //监听佣金类型变化清空输入框的值
                if (val) {
                    this.$set(this.formDatas_add, 'fixedAmount', '');
                } else {
                    this.$set(this.formDatas_add, 'percentAmount', '');
                }
            }
        }
    }
</script>

<style scoped>

</style>
