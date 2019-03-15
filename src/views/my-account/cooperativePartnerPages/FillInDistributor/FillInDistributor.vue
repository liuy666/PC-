<template>
    <div class="distributionSummary">
    <template v-if="isShowLoading">
            <loading></loading>
    </template>
    <div class="Account-holder-information">
        <span>[  ]开户信息</span>
    </div>
        <!-- <Breadcrumb separator=">" :style="{margin: '24px 0'}">
        <BreadcrumbItem>我的账户</BreadcrumbItem>
        <BreadcrumbItem>合作伙伴</BreadcrumbItem>
        <BreadcrumbItem>我的分销商</BreadcrumbItem>
    </Breadcrumb> -->
    <!--  -->
        <p slot="title" class="cardTitle">
            <span>企业信息</span>
        </p>  
        <detail-form 
            :isListPage="true"
            :formDatas="formDatas"
            :formItemList="formItemList"
            @getFormData="handleQuery"></detail-form>

            <!--  -->
        <p slot="title" class="cardTitle">
            <span>联系信息</span>
        </p>  
        <detail-form 
            :isListPage="true"
            :formDatas="formDatas"
            :formItemList="formItemList1"
            @getFormData="handleQuery"></detail-form>
            <!--  -->
        <p slot="title" class="cardTitle">
            <span>结算信息</span>
        </p>  
        <detail-form 
            :isListPage="true"
            :formDatas="formDatas"
            :formItemList="formItemList2"
            @getFormData="handleQuery"></detail-form>
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
                        label:'结算系统账号'
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'行业类别',
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'商户名称',
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'企业网站',
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'企业地址',
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'工商注册号',
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'组织结构代码',
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'法人',
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'法人身份证',
                    }
                ],
                formItemList1: [
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'业务联系人'
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'客服联系人',
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'业务联系手机',
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'客服联系手机',
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'业务联系邮箱',
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'客服联系邮箱',
                    }
                ],
                formItemList2: [
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'结算银行'
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'开户城市',
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'开户支行',
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'银行开户名',
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'银行账号',
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'结算周期：'+'结算周期T+',
                    }
                ],
            }
        },
        methods: {
            handleQuery() {},
        }
    }
</script>

<style>
.cardTitle {
    font-size:16px;
    font-weight: 600
}
.ivu-breadcrumb {
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 10px;
}
.Account-holder-information {
    position: absolute;
    right: 20px;
}
.ivu-breadcrumb>span:last-child {
    color: #4E81F0
}
</style>
