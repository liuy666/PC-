<template>
    <div>
        <Row>
            <div>
                <Breadcrumb separator=">" :style="{margin: '24px 0'}">
                    <BreadcrumbItem>我的账户</BreadcrumbItem>
                    <BreadcrumbItem>合作伙伴</BreadcrumbItem>
                    <BreadcrumbItem>我的供应商</BreadcrumbItem>
                </Breadcrumb>
                <div slot="title" class="cardTitle2">
                    <p>供应商列表</p>
                </div>
                <radio-table
                        :colname="colname"
                        :total='total'
                        :tableData="tableData"
                        :pageNum="pageNum"
                        :pageCode="pageCode"
                        :loading="loading"
                        :isBorder="true"
                        :isPage="false"
                ></radio-table>
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
                formDatas: {},
                colname:[
                    {
                        title: "序号",
                        render: (h, params) => {
                            return h('span',params.index + 1)
                        }
                    },
                    {
                        title: "用户编号",
                        key: "usid",
                    },
                    {
                        title: "供应商名称",
                        key: "name",
                    },
                    {
                        title: "结算商户名称",
                        key: "adminLogin",
                    },
                    {
                        title: "联系人",
                        key: "businessContact",
                    },
                    {
                        title: "联系人电话",
                        key: "businessTel",
                    }
                ],
                tableData: [],
                pageCode: 1,
                pageNum: 100,
                total: 0,
                loading: false,
                urlQuery:{},
            }
        },
        methods: {
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pageNum,
                    page: this.pageCode,
                    scenicId: 2
                };
            },
        },
        async created () {
            const obj = {
                access_token: sessionStorage.getItem('name'),
                pageSize: this.pageNum,
                page: this.pageCode
            };
            const res = await this.$http.get(`${this.lee}/ec/distributor/v1/getMySupplierList`, { params: obj });
            if (res.data.code === 200) {
                this.tableData.push(res.data.data);
            } else {
                this.$req.showMessageModal(this, res , 1)
            }
            this.spinShow = false
        },
    }
</script>

<style lang="less">

</style>