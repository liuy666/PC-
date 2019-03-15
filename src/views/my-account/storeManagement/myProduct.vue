<template>
    <div>
        <Row>
            <div>
                <Breadcrumb separator=">" :style="{margin: '24px 0'}">
                    <BreadcrumbItem>我的账户</BreadcrumbItem>
                    <BreadcrumbItem>店铺管理</BreadcrumbItem>
                    <BreadcrumbItem>我的产品</BreadcrumbItem>
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
                    <p>我的产品列表</p>
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
                    <p slot="header">设置售价</p>
                    <div class="ivu-modal-body-div" style="padding-top: 40px;">
                        <detail-form1
                                :isListPage="true"
                                :isMixed="false"
                                :formDatas="formDatas_dialog"
                                :formItemList="formItemList_dialog"
                                :label-width="200"
                                :needListBtn="false">
                        </detail-form1>
                    </div>
                    <div slot="footer" style="text-align: center">
                        <Button class="op-btns cancel-btn" @click="hideModal">取消</Button>
                        <Button type="primary" class="op-btns ok-btn" :loading="btnLoading" @click="editPrice">保存</Button>
                    </div>
                </Modal>
                <Modal v-model="isModalShow1" width="500" :closable="true" :mask-closable="false">
                    <p slot="header">温馨提示</p>
                    <div class="ivu-modal-body-div" style="font-size: 14px; height: 120px">
                        <span>确认{{up}}该产品吗？</span>
                    </div>
                    <div slot="footer" style="text-align: center">
                        <Button class="op-btns cancel-btn" @click="hideModal">取消</Button>
                        <Button type="primary" class="op-btns ok-btn" :loading="btnLoading" @click="editUpDown">确定</Button>
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
                up: '',
                spinShow: true,
                btnLoading: false,
                formDatas: {},
                isModalShow: false,
                isModalShow1: false,
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
                        title: "产品名称",
                        key: "sztickettypename",
                    },
                    {
                        title: "服务商名称",
                        key: "szscenicname",
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
                        title: "售价",
                        key: "distributePrice",
                        width: 100,
                        render: (h, params) => {
                            return h('span', `￥${params.row.distributePrice}`)
                        }
                    },
                    // {
                    //     title: "结算价",
                    //     key: "jsprice",
                    //     width: 100,
                    //     render: (h, params) => {
                    //         let price = '';
                    //         if (params.row.commisionType) {
                    //             price = params.row.commisionNum * params.row.mactualsaleprice * 0.01
                    //         } else {
                    //             price = params.row.commisionNum
                    //         }
                    //         const jsprice = params.row.mactualsaleprice - price
                    //         return h('span', `￥${jsprice.toFixed(2)}`)
                    //     }
                    // },
                    {
                        title: "说明",
                        width: 150,
                        render: (h ,params) => {
                            const text = params.row.upDown ? '下架' : '上架';
                            return h('div', [
                                // h('span', {
                                //     'class': 'hover_span',
                                //     style: {
                                //         marginRight: '10px'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.isModalShow = true;
                                //             this.formDatas_dialog = {
                                //                 salePrice: params.row.distributePrice,
                                //                 sztickettypename: params.row.sztickettypename,
                                //                 priceId: params.row.icrowdkindpriceid,
                                //                 groupId: params.row.groupId,
                                //                 up: params.row.upDown ? 1 : 0,
                                //             }
                                //         }
                                //     }
                                // }, '设置售价'),
                                h('span', {
                                    'class': 'hover_span',
                                    on: {
                                        click: () => {
                                            this.up = text;
                                            this.isModalShow1 = true;
                                            this.formDatas_dialog = {
                                                salePrice: params.row.distributePrice,
                                                sztickettypename: params.row.sztickettypename,
                                                priceId: params.row.icrowdkindpriceid,
                                                groupId: params.row.groupId,
                                                up: params.row.upDown ? 0 : 1,
                                            }
                                        }
                                    }
                                }, text)
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
                formDatas_dialog: {},
                formItemList_dialog: [
                    {
                        type: 1,
                        label: '产品名称',
                        keyName: 'sztickettypename',
                        class: '.float_option_big',
                        disabled: true
                    },
                    {
                        type: 1,
                        label: '设置店铺销售价',
                        keyName: 'salePrice',
                        class: '.float_option_big',
                    },
                ]
            };
        },
        methods: {
            getFormData (obj) {
                this.getTableData(obj)
            },
            clearFormData () {
                this.formDatas = {}
            },
            editPrice() {
                this.btnLoading = true;
                let obj = JSON.parse(JSON.stringify(this.formDatas_dialog));
                delete obj.sztickettypename;
                let paramStr = this.QS.stringify({
                    ...obj,
                    access_token: sessionStorage.getItem('name')
                });
                this.$http.post(`${this.lee}/ec/distributorShop/v1/updateDistributorSalePriceOrUpDown?${paramStr}`)
                    .then(res => {
                        if (res.data.code === 200) {
                            this.getTableData(this.formDatas);
                            this.$req.showMessageModal(this, '设置店铺销售价成功！' ,1);
                        } else {
                            this.$req.showMessageModal(this, res ,1);
                        }
                        this.btnLoading = false;
                        this.isModalShow = false
                    })
            },
            editUpDown() {
                this.btnLoading = true;
                let obj = JSON.parse(JSON.stringify(this.formDatas_dialog));
                delete obj.sztickettypename;
                let paramStr = this.QS.stringify({
                    ...obj,
                    access_token: sessionStorage.getItem('name')
                });
                this.$http.post(`${this.lee}/ec/distributorShop/v1/updateDistributorSalePriceOrUpDown?${paramStr}`)
                    .then(res => {
                        if (res.data.code === 200) {
                            this.getTableData(this.formDatas);
                            this.$req.showMessageModal(this, `产品${this.up}成功！` ,1);
                        } else {
                            this.$req.showMessageModal(this, res ,1);
                        }
                        this.btnLoading = false;
                        this.isModalShow1 = false
                    })
            },
            hideModal() {
                this.isModalShow = false;
                this.isModalShow1 = false;
            },
            getTableData(obj) {
                this.loading = true;
                let data = '';
                if (obj) {
                    data = {
                        access_token: sessionStorage.getItem('name'),
                        ...obj
                    };
                } else {
                    data = {
                        access_token: sessionStorage.getItem('name'),
                    };
                }
                this.$http.get(`${this.lee}/ec/distributorShop/v1/queryProductListForDistributor`, {
                    params: data
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
                    this.spinShow = false;
                }).catch(error => {
                    this.loading = false;
                    this.spinShow = false;
                });
            }
        },
        created () {
            this.getTableData()
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
