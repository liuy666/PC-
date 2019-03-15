<template>
    <div id="distribute_group">
        <Row>
            <Breadcrumb separator=">" :style="{margin: '24px 0'}">
                <BreadcrumbItem>我的账户</BreadcrumbItem>
                <BreadcrumbItem>合作伙伴</BreadcrumbItem>
                <BreadcrumbItem>分销商分组</BreadcrumbItem>
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
                    <p>分销商分组列表</p>
                    <div class="addGroupBtn">
                        <Button @click="goGroupAdd"><Icon type="md-add" size="18" color="#4E81F0" class="top2px"/><span class="addGroup">添加分销商分组</span></Button>
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
            <div v-show="currentIndex === 3">
                <div slot="title" class="cardTitle2">
                    <p>查看分销商分组</p>
                </div>
                <view-del-detail
                        :formDatas="formDatas_view"
                        :formItemList="formItemList_view"
                        :is-view="true"
                        :is-show="true"
                        :is-close="isClose"
                        @closeCurrentPage="closeCurrentPage"
                ></view-del-detail>
            </div>
            <loading v-if="spinShow"></loading>
        </Row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentIndex: 1,
                spinShow: true,
                isClose: false,
                btnLoading: false,
                tipName: '',
                formDatas: {
                    flag: 0
                },
                formItemList: [
                    {
                        type: 13,
                        keyName: 'flag',
                        label: '',
                        labelWidth: 1,
                        class: 'float_option_45',
                        optionList: [
                            {
                                value: 0,
                                labelName: '按分组名称',
                            },
                            {
                                value: 1,
                                labelName: '按分销商用户名模糊查询',
                                keyName: 'pmcd',
                                type: 1
                            }
                        ]
                    },
                ],
                colname: [
                    {
                        title: '编号',
                        key: 'seq',
                    },
                    {
                        title: '分组名称',
                        key: 'pmcd'
                    },
                    {
                        title: '分销商用户名',
                        render: (h, params) => {
                            let arr = JSON.parse(params.row.customListJson);
                            if (arr.length) {
                                arr = arr.filter(item => {
                                    return item !== null
                                });
                                let arr1 = [];
                                arr.map(item => {
                                    arr1.push(item.usid)
                                });
                                return h('span', arr1.join(','))
                            } else {
                               return h('span', '无') 
                            }
                        }
                    },
                    // {
                    //     title: '佣金',
                    //     render: (h, params) => {
                    //         const num = params.row.commisionNum;
                    //         const text = params.row.commisionType ? `按比例${num}%` : `固定佣金${num}元`;
                    //         return h('span', text)
                    //     }
                    // },
                    {
                        title: '状态',
                        render: (h, params) => {
                            const text = params.row.byisuse ? '启用' : '禁用';
                            return h('span', text)
                        }
                    },
                    {
                        title: '配置状态',
                        render: (h, params) => {
                            const text = params.row.configStatus ? '已配置' : '未配置';
                            return h('span', text)
                        }
                    },
                    {
                        title: '操作',
                        width: 200,
                        render: (h, params) => {
                            return h('span', [
                                h('span', {
                                    'class': 'hover_span',
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: 'configurationProduct',
                                                params: {
                                                    id: params.row.seq
                                                }
                                            })
                                        }
                                    },
                                }, '配置产品'),
                                h('span', {
                                    'class': 'hover_span',
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.goGroupEdit(params.row.seq)
                                        }
                                    },
                                }, '修改'),
                                h('span', {
                                    'class': 'hover_span',
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.changeIndex(3, params.row.seq)
                                        }
                                    },
                                }, '查看'),
                                h('span', {
                                    'class': 'hover_span',
                                    on: {
                                        click: () => {
                                            this.showDisableDialog(params.row, params.index)
                                        }
                                    },
                                }, '删除')
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
                formDatas_view : {},
                formItemList_view: [
                    {
                        label: '服务商名称',
                        keyName: 'szscenicname',
                        noShow: true
                    },
                    {
                        label: '价格分组',
                        keyName: 'pmcd'
                    },
                    // {
                    //     label: '佣金',
                    //     keyName: 'commisionNum'
                    // },
                    {
                        label: '分销商',
                        keyName: '',
                        showElement: true,
                        table: true,
                        width: '40%',
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
                        ],
                        tableData: []
                    },
                    {
                        label: '使用状态',
                        keyName: 'byisuse',
                    }
                ]
            }
        },
        methods: {
            changeIndex (index,id) {
                this.spinShow = true;
                if (index === 3) {
                    this.setViewInitData(index,id)
                }
            },
            changePage (pageCode) {
                this.pageCode = pageCode;
                this.$req.currentPageData('/ticket/jgfz/v1/queryJgfzList', this, 'get')
            },
            changePageSize (pageSize) {
                this.pageNum = pageSize;
                this.$req.currentPageData('/ticket/jgfz/v1/queryJgfzList', this, 'get')
            },
            getFormData (obj) {
                this.formDatas = obj;
                this.pageCode = 1;
                this.pageNum = 10;
                this.$req.currentPageData('/ticket/jgfz/v1/queryJgfzList', this, 'get')
            },
            clearFormData () {
                this.formDatas = {
                    flag: 0
                };
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pageNum,
                    page: this.pageCode,
                    pmcd: this.formDatas.pmcd,
                    usid: this.formDatas.usid,
                };
            },
            goGroupAdd () {
                this.$router.push({
                    name: 'addDistributorGroups'
                })
            },
            goGroupEdit (id) {
                this.$router.push({
                    name: 'editDistributorGroups',
                    params: {
                        id: id
                    }
                })
            },
            setViewInitData (type,id) {
                this.$http.get(this.lee+'/ticket/jgfz/v1/queryJgfzById',{
                    params: {
                        access_token: sessionStorage.getItem('name'),
                        seq: id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        data.byisuse = data.byisuse ? '启用' : '禁用';
                        data.commisionNum = data.commisionType ? `按比例${data.commisionNum}%` : `固定佣金${data.commisionNum}元`;
                        this.formDatas_view = data;
                        this.formItemList_view[2].tableData = JSON.parse(data.customListJson).filter(item => {
                            return item !== null
                        });
                        let height = this.formItemList_view[2].tableData.length * 40 + 34;
                        this.formItemList_view[2].height = height > 434 ? 434 : height
                    } else {
                        this.$req.showMessageModal(this, res ,1)
                    }
                    this.spinShow = false;
                    this.currentIndex = type
                });
            },
            //删除分销商分组
            showDisableDialog (row, index) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: `确认删除该分销商分组？`,
                    closable: true,
                    loading: true,
                    onOk: async () => {
                        const url = `${this.lee}/ticket/jgfz/v1/deleteJgfz?seq=${row.seq}&access_token=${sessionStorage.getItem('name')}`;
                        const res = await this.$http.delete(url);
                        if (res.data.code === 200) {
                            this.$Modal.remove();
                            setTimeout(() => {
                                this.$req.currentPageData('/ticket/jgfz/v1/queryJgfzList', this, 'get');
                                this.$req.showMessageModal(this, '分销商分组删除成功', 3)
                            }, 500)
                        } else {
                            this.$Modal.remove();
                            setTimeout(() => {
                                this.$req.showMessageModal(this, res, 1)
                            }, 500)
                        }
                    },
                })
            },
            closeCurrentPage() {
                this.currentIndex = 1;
            }
        },
        created () {
            this.$req.currentPageData('/ticket/jgfz/v1/queryJgfzList', this, 'get');
        },
        watch: {
            'formDatas.flag' (val) {
                if (val) {
                    this.formItemList[0].optionList[1].keyName = 'usid';
                    this.$set(this.formDatas, 'pmcd', '')
                } else {
                    this.formItemList[0].optionList[1].keyName = 'pmcd';
                    this.$set(this.formDatas, 'usid', '')
                }
            }
        }
    }
</script>

<style>

</style>
