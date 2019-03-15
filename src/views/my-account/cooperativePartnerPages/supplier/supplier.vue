<template>
    <div class="distributionSummary">
    <template v-if="isShowLoading">
            <loading></loading>
    </template>
        <!-- <Breadcrumb separator=">" :style="{margin: '24px 0'}">
        <BreadcrumbItem>我的账户</BreadcrumbItem>
        <BreadcrumbItem>合作伙伴</BreadcrumbItem>
        <BreadcrumbItem>我的供应商</BreadcrumbItem>
    </Breadcrumb> -->
    <!--  -->
        <detail-form 
            :isListPage="true"
            :formDatas="formDatas"
            :formItemList="formItemList"
            @getFormData="handleQuery"></detail-form>
        <p slot="title" class="cardTitle">
            <span>供应商列表</span>
        </p>  

        <!--  -->
            <!-- <radioTable 
                :colname="colnames"
                :total='total'
                :tableData="tableData"
                :loading="isLoading"
                @changePage="handleChangePage"></radioTable> -->
                <Table 
                :columns="colnames" 
                :data="tableData"></Table>
                <Page :total="100" size="small" show-elevator show-sizer></Page>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShowLoading: false,
                formDatas: {
                    placeholder: '',
                },
                formItemList: [
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'用户编号'
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'供应商名称',
                        double: true,
                    }
                ],
                colnames:[
                    {
                        title: "供应商订单号",
                        key: "serialNumber",
                    },
                    {
                        title: "用户编号",
                        key: "editNumber",
                    },
                    {
                        title: "供应商名称",
                        key: "supplier",
                    },
                    {
                        title: "结算商户名称",
                        key: "commercialTenant",
                    },
                    {
                        title: "联系人",
                        key: "linkman",
                    },
                    {
                        title: "联系人电话",
                        key: "phone",
                    },
                ],
                tableData: [
                    {
                        serialNumber:'01',
                        editNumber:'分组1',
                        supplier:'明月峡景区',
                        commercialTenant:'32165461687184984',
                        linkman:'老板',
                        phone:'13477073300',
                    },
                ]
            }
        },
        methods: {
            handleQuery() {},
        }
    }
</script>

<style>
.ivu-page {
    margin-top: 20px;
    text-align: center;
}
.ivu-breadcrumb>span:last-child {
    color: #4E81F0
}
</style>
