<template>
    <div id="productInformation">
        <Row>
            <div>
                <Breadcrumb separator=">" :style="{margin: '24px 0'}">
                    <BreadcrumbItem>我的账户</BreadcrumbItem>
                    <BreadcrumbItem>采购管理</BreadcrumbItem>
                    <BreadcrumbItem>产品预定</BreadcrumbItem>
                </Breadcrumb>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :formDatas="formDatas"
                        :formItemList="formItemList"
                        :need-list-reset="true"
                        @clearFormData="clearFormData"
                        @getFormData="getFormData">
                </detail-form1>
                <div slot="title" class="cardTitle2">
                    <p>产品预定列表</p>
                    <div class="addGroupBtn">
                        <Button @click="goDistributorOrder"><Icon type="md-add" size="18" color="#4E81F0" class="top2px"/><span class="addGroup">立即预定</span></Button>
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
                ></radio-table>
                <Modal v-model="isModalShow" width="600" :closable="true" :mask-closable="false">
                    <p slot="header">预定规则</p>
                    <div class="ivu-modal-body-div">
                        <Table
                                :columns="this.dialogColName"
                                :data="this.dialogTableData"
                                :stripe="true"
                                :showHeader="false"
                                :size="'small'">
                        </Table>
                    </div>
                    <div slot="footer" style="text-align: center">
                        <Button type="primary" class="op-btns ok-btn" @click="hideModal">确定</Button>
                    </div>
                </Modal>
            </div>
            <loading v-if="spinShow"></loading>
        </Row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                spinShow: true,
                btnLoading: false,
                formDatas: {},
                isModalShow: false,
                formItemList: [
                    {
                        type: 1,
                        label: '产品编号',
                        keyName: 'icrowdkindpricecode',
                        labelWidth: 85
                    },
                    {
                        type: 1,
                        label: '产品名称',
                        keyName: 'sztickettypename',
                        labelWidth: 85
                    }
                ],
                colname:[
                    {
                        title: "序号",
                        key: "corpname",
                        width: 60,
                        render: (h, params) => {
                            return h('span', params.index + 1)
                        }
                    },
                    {
                        title: "产品编号",
                        width: 160,
                        key: "icrowdkindpricecode",
                    },
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
                        width: 100,
                        render: (h, params) => {
                            return h('span', `￥${params.row.mactualsaleprice}`)
                        }
                    },
                    {
                        title: "佣金",
                        width: 100,
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
                        width: 100,
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
                        title: "说明",
                        width: 150,
                        render: (h ,params) => {
                            let aaa = '';
                            if (Date.parse(params.row.enddata) < Date.parse(new Date())) {
                                aaa = '已过期'
                            }
                            if (aaa === '已过期') {
                                return  h('span', aaa)
                            } else {
                                return h('span', {
                                    'class': 'hover_span',
                                    // style: {
                                    //     marginRight: '10px'
                                    // },
                                    on: {
                                        click: () => {
                                            if (params.row.ticketbackrule) {
                                                const ticketbackrule = params.row.ticketbackrule;
                                                this.$http.get(this.lee + '/ticket/ticketXgz/v1/ticketbackruleView', {
                                                    params:{
                                                        access_token: sessionStorage.getItem('name'),
                                                        gzid: ticketbackrule.gzid
                                                    }
                                                }).then(res => {
                                                    if (res.data.code === 200) {
                                                        let data = res.data.data;
                                                        data.xyjs4 = data.xyjs4 ? '出票后' : '出票前';
                                                        data.isvalid = data.isvalid ? '启用' : '禁用';
                                                        data.xyjs2 = data.xyjs2 ? '能退票' : '不能退票';
                                                        data.time = `在游玩日期前${data.changebackrate[0].time}天可退`;
                                                        data.tdfl = data.changebackrate[0].tdfl;
                                                        data.sznote = data.changebackrate[0].sznote || '';
                                                        this.dialogTableData = [
                                                            {
                                                                option: '产品名称',
                                                                detail: params.row.sztickettypename
                                                            },
                                                            {
                                                                option: '服务商名称',
                                                                detail: params.row.szscenicname
                                                            },
                                                            {
                                                                option: '预定须知',
                                                                // detail: '123'
                                                            },
                                                            {
                                                                option: '退订规则',
                                                                detail: `<div>退顶规则名称：${ticketbackrule.gzname}</div><div>计算方式：按天</div><div>出票前后：${data.xyjs4}</div><div>使用状态：${data.isvalid}</div><div>可退票日期：${data.time}</div><div>退票费率：${data.tdfl}</div><div>备注：${data.sznote}</div>`
                                                            }
                                                        ];
                                                        this.isModalShow = true
                                                    } else {
                                                        this.$req.showMessageModal(this, res, 1)
                                                    }
                                                });
                                            } else {
                                                this.$req.showMessageModal(this, '该产品暂无预定规则', 3)
                                            }
                                        }
                                    }
                                }, '预定规则')
                            }
                        }
                    }
                ],
                tableData: [],
                pageCode: 1,
                pageNum: 10,
                total: 0,
                loading: false,
                urlQuery:{},
                dialogColName: [
                    {
                        title: '选项',
                        key: 'option',
                        align: 'center',
                        className: 'dialog-option',
                        width: 150
                    },
                    {
                        title: '明细',
                        key: 'detail',
                        render: (h,params) => {
                            return h('div', {
                                style: {
                                    padding: '11px 0',
                                    fontSize: '14px'
                                },
                                domProps: {
                                    innerHTML: params.row.detail
                                }
                            })
                        }
                    },
                ],
                dialogTableData: []
            };
        },
        methods: {
            // changePage () {},
            // changePageSize () {},
            //条件查询
            getFormData (obj) {
                this.loading = true;
                this.$http.get(`${this.lee}/ec/distributor/v1/getMyProduct`, {
                    params: {
                        access_token: sessionStorage.getItem('name'),
                        ...obj
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        if (!data.length) {
                            this.spinShow = false;
                        }
                        this.tableData = data;
                    } else {
                        this.$req.showMessageModal(this, res ,1);
                    }
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                });
            },
            //重置查询条件
            clearFormData () {
                this.formDatas = {};
            },
            hideModal () {
                this.isModalShow = false
            },
            goDistributorOrder () {
                this.$router.push({
                    name: 'distributor-order'
                })
            }
        },
        created () {
            this.$http.get(`${this.lee}/ec/distributor/v1/getMyProduct`, {
                params: {
                    access_token: sessionStorage.getItem('name'),
                }
            }).then(res => {
                if (res.data.code === 200) {
                    let data = res.data.data;
                    if (!data.length) {
                        this.spinShow = false;
                    }
                    this.tableData = data;
                } else {
                    this.$req.showMessageModal(this, res ,1);
                }
                this.spinShow = false;
            }).catch(error => {
                this.spinShow = false;
            });
        }
};
</script>

<style lang="less">
    .dialog-option{
        font-size: 14px;
        color: #191919;
        font-weight: bold;
    }
</style>
