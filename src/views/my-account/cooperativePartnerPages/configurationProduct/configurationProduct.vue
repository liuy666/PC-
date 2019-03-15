<template>
    <div id="config-product">
        <Row>
            <Breadcrumb separator=">" :style="{margin: '24px 0'}">
                <BreadcrumbItem>我的账户</BreadcrumbItem>
                <BreadcrumbItem>合作伙伴</BreadcrumbItem>
                <BreadcrumbItem to="/my-account/distributorGroup">分销商分组</BreadcrumbItem>
                <BreadcrumbItem>配置产品</BreadcrumbItem>
            </Breadcrumb>
            <div v-show="currentIndex === 1">
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :formDatas="formDatas"
                        :formItemList="formItemList"
                        :needListBtn="false">
                </detail-form1>
                <div slot="title" class="cardTitle2">
                    <p>配置产品信息</p>
                    <div class="addGroupBtn">
                        <Button @click="changeIndex(2)"><Icon type="md-add" size="18" color="#4E81F0" class="top2px"/><span class="addGroup">新增</span></Button>
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
            <div v-show="currentIndex === 2">
                <div slot="title" class="cardTitle2">
                    <p>添加配置产品</p>
                </div>
                <detail-form1
                        :form-datas="formDatas_add"
                        :is-list-page="false"
                        :is-mixed="false"
                        :needReset="false"
                        :is-close="isClose"
                        :form-item-list="formItemList_add"
                        @getFormData="getFormData_add"
                        @closeCurrentPage="closeCurrentPage"
                        @selectHasChanged="selectHasChanged"
                ></detail-form1>
            </div>
            <div v-show="currentIndex === 3">
                <div slot="title" class="cardTitle2">
                    <p>修改配置产品</p>
                </div>
                <detail-form1
                        :form-datas="formDatas_edit"
                        :is-list-page="false"
                        :is-mixed="false"
                        :needReset="false"
                        :is-close="isClose"
                        :ruleDatas="ruleDatas_edit"
                        :form-item-list="formItemList_edit"
                        @getFormData="getFormData_edit"
                        @closeCurrentPage="closeCurrentPage"
                ></detail-form1>
            </div>
            <loading v-if="spinShow"></loading>
        </Row>
    </div>
</template>

<script>
    export default {
        data() {
            const validateAmount = (rule, value, callback) => {
                const reg = /(^\d+$)|(^\d+[\.]{1}[0-9]{1,2}$)/;
                if (!value) {
                    callback(new Error('佣金比例不能为空'))
                } else if (!reg.test(value)) {
                    callback(new Error('请输入不小于0的数，可保留两位小数'))
                } else {
                    callback()
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
                        type: 9,
                        label: '编号',
                        keyName: 'seq',
                        class: 'float_option_small',
                        labelWidth: 55
                    },
                    {
                        type: 9,
                        label: '分组名称',
                        keyName: 'pmcd',
                        // class: 'float_option_small',
                        labelWidth: 85
                    },
                    // {
                    //     type: 9,
                    //     label: '佣金',
                    //     keyName: 'commisionNum',
                    //     class: 'float_option_small',
                    //     labelWidth: 50
                    // },
                ],
                colname:[
                    {
                        title: "产品编号",
                        width: 140,
                        key: "icrowdkindpricecode",
                    },
                    // {
                    //     title: "主图",
                    //     key: "usid",
                    //     align: 'center'
                    // },
                    // {
                    //     title: "最新更新时间",
                    //     key: "mobile",
                    //     align: 'center'
                    // },
                    {
                        title: "服务商名称",
                        key: "szscenicname",
                    },
                    {
                        title: "产品名称",
                        key: "sztickettypename",
                    },
                    {
                        title: "单价",
                        key: "mactualsaleprice",
                        width: 120,
                        render: (h, params) => {
                            return h('span', `￥${params.row.mactualsaleprice}`)
                        }
                    },
                    {
                        title: "佣金",
                        width: 120,
                        render: (h, params) => {
                            let price = '';
                            if (params.row.commisionType) {
                                price = params.row.commisionNum * params.row.mactualsaleprice * 0.01
                            } else {
                                price = params.row.commisionNum
                            }
                            return h('span', `￥${price.toFixed(2)}`)
                        }
                    },
                    {
                        title: "结算价",
                        key: "jsprice",
                        width: 120,
                        render: (h, params) => {
                            let price = '';
                            if (params.row.commisionType) {
                                price = params.row.commisionNum * params.row.mactualsaleprice * 0.01
                            } else {
                                price = params.row.commisionNum
                            }
                            const jsprice = params.row.mactualsaleprice - price
                            return h('span', `￥${jsprice.toFixed(2)}`)
                        }
                    },
                    {
                        title: "操作",
                        width: 120,
                        render: (h ,params) => {
                            return h('div', [
                                h('span', {
                                    'class': 'hover_span',
                                    style: {
                                        marginRight: '10px',
                                    },
                                    on: {
                                        click: () => {
                                            this.changeIndex(3, params.row)
                                        }
                                    }
                                }, '修改'),
                                h('span', {
                                    'class': 'hover_span',
                                    on: {
                                        click: () => {
                                            this.deleteConfigProduct(params.row.icrowdkindpriceid)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                tableData: [],
                pageCode: 1,
                pageNum: 10,
                total: 0,
                loading: false,
                urlQuery:{},
                formDatas_add: {},
                formItemList_add: [
                    {
                        type: 21,
                        label: '',
                        keyName: 'crowKingPriceIds',
                        labelWidth: 1,
                        tableData: [],
                        height: '',
                        border: true,
                        colname: [
                            {
                                type: 'selection',
                                width: 60,
                                align: 'center'
                            },
                            // {
                            //     title: "序号",
                            //     key: "corpname",
                            //     align: 'center',
                            //     width: 60,
                            //     render: (h, params) => {
                            //         return h('span', params.index + 1)
                            //     }
                            // },
                            {
                                title: "产品编号",
                                width: 140,
                                key: "icrowdkindpricecode",
                                align: 'center'
                            },
                            // {
                            //     title: "主图",
                            //     key: "usid",
                            //     align: 'center'
                            // },
                            // {
                            //     title: "最新更新时间",
                            //     key: "mobile",
                            //     align: 'center'
                            // },
                            {
                                title: "服务商名称",
                                key: "szscenicname",
                                width: 140,
                                align: 'center'
                            },
                            {
                                title: "产品名称",
                                key: "sztickettypename",
                                width: 140,
                                align: 'center'
                            },
                            {
                                title: "单价",
                                key: "mactualsaleprice",
                                // width: 80,
                                align: 'center',
                                render: (h, params) => {
                                    return h('span', `￥${params.row.mactualsaleprice}`)
                                }
                            },
                            {
                                title: "结算价",
                                key: "jsprice",
                                // width: 80,
                                align: 'center',
                                render: (h, params) => {
                                    return h('span', `￥${params.row.jsprice}`)
                                }
                            },
                            {
                                title: '佣金类型',
                                width: 170,
                                align: 'center',
                                render: (h,params) => {
                                    let arr = [
                                        {
                                            value: 0,
                                            label: '固定佣金(元)',
                                        },
                                        {
                                            value: 1,
                                            label: '按比例(%)',
                                        }
                                    ];
                                    return h('Select', {
                                        props: {
                                            value: params.row.commisionType
                                        },
                                        style: {
                                            width: '120px'
                                        },
                                        on: {
                                            'on-change': (val) => {   //render无法双向绑定，故用此方法伪双向
                                                params.row.commisionType = val;
                                                this.formItemList_add[0].tableData[params.index] = params.row;
                                                this.changeInput(this.formItemList_add[0].tableData)
                                            }
                                        }
                                    }, arr.map(item => {
                                        return h('Option',{
                                            props:{
                                                value:item.value,
                                                label:item.label
                                            }
                                        })
                                    }))
                                }
                            },
                            {
                                title: '佣金数值',
                                width: 100,
                                align: 'center',
                                render: (h, params) => {
                                    return h('Input', {
                                        props: {
                                            value: params.row.commisionNum
                                        },
                                        style: {
                                            width: '60px',
                                        },
                                        on: {    //render无法双向绑定，故用此方法伪双向
                                            input: (val) => {
                                                params.row.commisionNum = val;
                                                this.formItemList_add[0].tableData[params.index] = params.row;
                                                this.changeInput(this.formItemList_add[0].tableData)
                                            }
                                        }
                                    })
                                }
                            },
                        ],
                    }
                ],
                formDatas_edit: {},
                ruleDatas_edit: {
                    commisionNum: [
                        { required: true, validator: validateAmount, trigger: 'blur' }
                    ]
                },
                formItemList_edit: [
                    {
                        type: 1,
                        label: '服务商',
                        keyName: 'szscenicname',
                        disabled: true
                    },
                    {
                        type: 1,
                        label: '产品',
                        keyName: 'sztickettypename',
                        disabled: true
                    },
                    {
                        type: 1,
                        label: '实际售价',
                        keyName: 'mactualsaleprice',
                        disabled: true
                    },
                    {
                        type: 2,
                        label: '佣金类型',
                        keyName: 'commisionType',
                        optionList: [
                            {
                                value: 0,
                                labelName: '固定佣金(元)'
                            },
                            {
                                value: 1,
                                labelName: '按比例(%)'
                            }
                        ]
                    },
                    {
                        type: 1,
                        label: '佣金',
                        keyName: 'commisionNum',
                    },
                ],
            }
        },
        methods: {
            changeIndex (index,row) {
                this.spinShow = true;
                if (index === 2) {
                    this.tipName = '添加产品信息';
                    this.setAddInitData(index)
                } else if (index === 3) {
                    this.tipName = '修改产品信息';
                    this.setEditInitData(index,row)
                }
            },
            changePage (pageCode) {
                this.pageCode = pageCode;
                this.$req.currentPageData('/ticket/crowdKindPrice/v1/getCrowKindPriceByJgfzId', this, 'get')
            },
            changePageSize (pageSize) {
                this.pageNum = pageSize;
                this.$req.currentPageData('/ticket/crowdKindPrice/v1/getCrowKindPriceByJgfzId', this, 'get')
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pageNum,
                    page: this.pageCode,
                    fzId: this.$route.params.id
                };
            },
            deleteConfigProduct(icrowdkindpriceid) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '确定删除该配置产品？',
                    loading: true,
                    onOk: async () => {
                        let url = `${this.lee}/ticket/crowdKindPrice/v1/deletePriceInfoByJgfzAndPriceId`;
                        url = `${url}?groupId=${this.$route.params.id}&priceId=${icrowdkindpriceid}&access_token=${sessionStorage.getItem('name')}`;
                        const res = await this.$http.delete(url);
                        this.$Modal.remove();
                        if (res.data.code === 200) {
                            setTimeout(() => {
                                this.$req.showMessageModal(this, '删除成功', 3);
                                this.$req.currentPageData('/ticket/crowdKindPrice/v1/getCrowKindPriceByJgfzId', this, 'get')
                            }, 300)
                        } else {
                            setTimeout(() => {
                                this.$req.showMessageModal(this, res, 1)
                            }, 300)
                        }
                    }
                });

            },
            //获取列表表单页部分数据
            getListFormData () {
                return new Promise(resolve => {
                    this.$http.get(this.lee+'/ticket/jgfz/v1/queryJgfzById', {
                        params: {
                            access_token: sessionStorage.getItem('name'),
                            seq: this.$route.params.id
                        }
                    }).then(res => {
                        if (res.data.code === 200) {
                            let data = res.data.data;
                            this.formDatas = {
                                seq: data.seq,
                                pmcd: data.pmcd,
                                commisionNum: data.commisionType ? `按比例${data.commisionNum}%` : `固定佣金${data.commisionNum}元`
                            };
                            this.commisionNum = data.commisionNum;
                            this.commisionType = data.commisionType;
                            resolve()
                        } else {
                            this.$req.showMessageModal(this, res, 1);
                            this.spinShow = false
                        }
                    });
                })
            },
            selectHasChanged (arr) {
                let arr1 = [];
                let table = JSON.parse(JSON.stringify(this.formItemList_add[0].tableData));
                for (let obj of table) {
                    obj._checked = false
                }
                if (arr.length > 0) {
                    for (let item of arr) {
                        // item._checked = true;
                        arr1.push({
                            priceId: item.icrowdkindpriceid,
                            commisionType: item.commisionType,
                            commisionNum: item.commisionNum,
                            mactualsaleprice: item.mactualsaleprice,
                        });
                        for (let obj of table) {
                            if (item.icrowdkindpriceid === obj.icrowdkindpriceid) {
                                obj._checked = true
                            }
                        }
                    }
                }
                this.formItemList_add[0].tableData = table;
                this.$set(this.formDatas_add, 'crowKingPriceIds', arr1)
            },
            //输入框值改变，更新选中行的数据
            changeInput (data) {
                let arr = [];
                for (let item of data) {
                    if (item._checked) arr.push({
                        priceId: item.icrowdkindpriceid,
                        commisionType: item.commisionType,
                        commisionNum: item.commisionNum,
                        mactualsaleprice: item.mactualsaleprice,
                    })
                }
                this.$set(this.formDatas_add, 'crowKingPriceIds', arr)
            },
            //产品配置表单验证
            formValidation () { //表单验证
                const reg = /(^\d+$)|(^\d+[\.]{1}[0-9]{1,2}$)/;
                let arr = [];
                if (!this.formDatas_add.crowKingPriceIds || !this.formDatas_add.crowKingPriceIds.length) {
                    this.$req.showMessageModal(this, '请选择产品进行配置', 2);
                    return 0
                } else {
                    this.formDatas_add.crowKingPriceIds.map(item => {
                        if (!item.commisionNum && item.commisionNum != 0) {
                            this.$req.showMessageModal(this, '佣金不能为空', 2);
                            return 0
                        } else if (!reg.test(item.commisionNum)) {
                            this.$req.showMessageModal(this, '佣金请输入不小于0的数，可保留两位小数', 2);
                            return 0
                        } else if (reg.test(item.commisionNum)) {
                            let num = '';
                            if (item.commisionType) {
                                num = parseFloat(item.commisionNum) * item.mactualsaleprice * 0.01
                            } else {
                                num = parseFloat(item.commisionNum)
                            }
                            if (num >= parseFloat(item.mactualsaleprice)) {
                                this.$req.showMessageModal(this, '佣金须小于实际售价', 2);
                                return 0
                            } else {
                                arr.push(item)
                            }
                        }
                    });
                    if (this.formDatas_add.crowKingPriceIds.length === arr.length) {
                        return 1
                    }
                }
            },
            setAddInitData (index) {
                this.$http.get(`${this.lee}/ec/distributor/v1/getMyProduct`, {
                    params: {
                        access_token: sessionStorage.getItem('name'),
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        if (!data.length) {
                            this.spinShow = false;
                            this.$req.showMessageModal(this, '该景区服务商暂时无产品可配,请先创建产品', 2);
                            return 0
                        }
                        // let height = (data.length * 48 + 40) > 524 ? 524 : data.length * 48 + 40;
                        // data.map(item => {
                        //     item.szscenicname = this.pars.formDatas.szscenicname
                        // });
                        this.formItemList_add[0].tableData = data;
                        // this.formItemList_add[0].height = height;
                    } else {
                        this.$req.showMessageModal(this, res ,1);
                    }
                    this.spinShow = false;
                    this.currentIndex = index
                });
            },
            async getFormData_add (obj) {
                if(!this.formValidation()) return;
                this.btnLoading = true;
                obj = JSON.parse(JSON.stringify(obj));
                this.$set(obj, 'fzId', this.formDatas.seq);
                obj.crowKingPriceIds = JSON.stringify(obj.crowKingPriceIds);
                let url = `/ticket/crowdKindPrice/v1/saveJgfzAndProducts?${this.QS.stringify(obj)}`;
                const aaa = await this.$req.editData(url, this, {}, 'get', true);
                if (aaa) {
                    this.$req.currentPageData('/ticket/crowdKindPrice/v1/getCrowKindPriceByJgfzId', this, 'get')
                }
            },
            setEditInitData (index, row) {
                this.formDatas_edit = {
                    szscenicname: row.szscenicname,
                    sztickettypename: row.sztickettypename,
                    mactualsaleprice: row.mactualsaleprice,
                    commisionType: row.commisionType,
                    commisionNum: row.commisionNum,
                    priceId: row.icrowdkindpriceid,
                    fzId: this.$route.params.id
                };
                this.currentIndex = index;
                this.spinShow = false
            },
            async getFormData_edit (obj) {
                let num = '';
                if (obj.commisionType) {
                    num = parseFloat(obj.mactualsaleprice) * parseFloat(obj.commisionNum) * 0.01
                } else {
                    num = obj.commisionNum
                }
                if (num >= obj.mactualsaleprice) {
                    this.$req.showMessageModal(this, '佣金须小于实际售价', 1);
                    return false
                }
                this.btnLoading = true;
                let priceId = [{
                    commisionType: obj.commisionType,
                    commisionNum: obj.commisionNum,
                    priceId: obj.priceId,
                }];
                let data = {
                    fzId: obj.fzId,
                    priceId: JSON.stringify(priceId)
                };
                let url = '/ticket/crowdKindPrice/v1/updateJgfzAndProducts';
                const aaa = await this.$req.editData(url, this, data, 'get');
                if (aaa) this.$req.currentPageData('/ticket/crowdKindPrice/v1/getCrowKindPriceByJgfzId', this, 'get')
            },
            closeCurrentPage() {
                this.currentIndex = 1;
            }
        },
        async created () {
            await this.getListFormData();
            this.$req.currentPageData('/ticket/crowdKindPrice/v1/getCrowKindPriceByJgfzId', this, 'get')
        },

    }
</script>

<style lang="less">
    /*#config-product {*/
        /*.ivu-input {*/
            /*text-align: center;*/
        /*}*/
    /*}*/
</style>
