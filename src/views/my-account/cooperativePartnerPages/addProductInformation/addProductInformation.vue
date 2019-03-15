<template>
    <div class="distributionSummary">
    <template v-if="isShowLoading">
            <loading></loading>
    </template>
        <!-- <Breadcrumb separator=">" :style="{margin: '24px 0'}">
        <BreadcrumbItem>我的账户</BreadcrumbItem>
        <BreadcrumbItem>合作伙伴</BreadcrumbItem>
        <BreadcrumbItem>分销商分组</BreadcrumbItem>
        <BreadcrumbItem>配置产品</BreadcrumbItem>
        <BreadcrumbItem>添加产品信息</BreadcrumbItem>
    </Breadcrumb> -->
    <!--  -->
        <p slot="title" class="cardTitle">
            <span>添加产品信息</span>
        </p>  
        <Row>
            <Col span="8">编号：11111</Col>
            <Col span="8">分组名称：剑门关小组</Col>
            <Col span="8">佣金：固定佣金5元</Col>
        </Row>
        <RadioGroup v-model="animal">
            <Radio label="按用户名"></Radio>
            <Radio label="按旅行社名称模糊查询"></Radio>
        </RadioGroup>
            <Row>

            <detail-form 
                span="12"
                :isListPage="true"
                :formDatas="formDatas"
                :formItemList="formItemList"
                @getFormData="handleQuery"></detail-form>
            </Row>
        <p slot="title" class="cardTitle">
            <span>产品列表</span>
            <router-link :to="{path:'/addDistributorGroups'}">
                <Button  class="addDistributor">新增</Button>
            </router-link>
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

            <Button type="primary">确定</Button>
            <Button>重置</Button>
            <Button>取消</Button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShowLoading: false,
                animal: '',
                formDatas: {
                    placeholder: '',
                },
                formItemList: [
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'产品编号'
                    },
                    {
                        keyName:'placeholder',
                        type:1,
                        label:'产品名称',
                    },

                ],
                colnames:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: "编号",
                        key: "orid",
                    },
                    {
                        title: "产品编号",
                        key: "name",
                    },
                    {
                        title: "主图",
                        key: "userName",
                    },
                    {
                        title: "最新更新时间",
                        width: 130,
                        key: "phoneNumber",
                    },
                    {
                        title: "服务商名称",
                        width: 130,
                        key: "landlineNumber",
                    },
                    {
                        title: "产品名称",
                        key: "registrationDate",
                    },
                    {
                        title: "单价",
                        key: "mont",
                    },
                    {
                        title: "佣金",
                        key: "commission",
                    },
                    {
                        title: "结算价",
                        key: "settlementPrice",
                    },
                ],
                tableData: [
                    {
                        DistributorName:'1',
                        name:'张三',
                        userName:'15623',
                        phoneNumber:'13920162543',
                        landlineNumber:'023-6543276',
                        unitPrice:'￥0.01',
                        registrationDate:'启用',
                        commission:'￥0.01',
                        settlementPrice:'￥100',
                    },
                ]
            }
        },
        
        created(){
            // this.configurationAxios()
        },
        methods: {
            
            // configurationAxios(){
            //     let token = sessionStorage.getItem("name");
            //     let usid = 'test';
            //     let page = '1';
            //     let pageSize = '10';
            //     let url = 'localhost';
            //     this.$http.post(this.baseURL + '/ec/orderManage/orderMoneyChangeViewList?access_token='+token + '&usid=' + usid + '&page=' + page + '&pageSize=' + pageSize + '&url=' + url, {
            //         orid: '',
            //         radiobutton2: 1,
            //         radiobutton1: 0,
            //         startDate:'2016-01-01',//开始日期
            //         endDate:'2018-08-01',// 结束日期
            //         ddzt:99
            //     }).then((response) => {
            //         console.log(response)
            //         let formListItems = response.data.data.PaginationSupport.items;

            //     }).catch((error) => {
            //         console.log(error)
            //     })
            // },

            handleQuery() {},
            remove(index) {
                this.tableData.splice(index, 1);
            }
        }
    }
</script>

<style>
.cardTitle {
    margin-bottom: 10px;
}
.addDistributor {
    float: right;
    color: #4E81F0;
    border: 1px solid #4E81F0;
}
.ivu-page {
    margin-top: 20px;
    text-align: center;
}
.ivu-breadcrumb>span:last-child {
    color: #4E81F0
}
</style>
