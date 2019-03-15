<template>
    <div class="distributionSummary">
    <template v-if="isShowLoading">
            <loading></loading>
    </template>
        <!-- <Breadcrumb separator=">" :style="{margin: '24px 0'}">
        <BreadcrumbItem>我的账户</BreadcrumbItem>
        <BreadcrumbItem>合作伙伴</BreadcrumbItem>
        <BreadcrumbItem>分销商分组</BreadcrumbItem>
        <BreadcrumbItem>分销商分组详情</BreadcrumbItem>
    </Breadcrumb> -->
    <!--  -->
        <p slot="title" class="add-cardTitle">
            <span>添加分销商分组</span>
        </p>  
        <div class="serial-number">
            <span>编号：</span>
            <span class="serial-content">111111</span>
        </div>
        <div class="serial-number">
            <span>分组名称：</span>
            <span class="serial-content">分组名称</span>
        </div>
        <div class="serial-number">
            <span>佣金：</span>
            <span class="serial-content">固定佣金5元</span>
        </div>
        <div class="serial-number">
            <span>分销商：</span>
            <span class="serial-content">阿里巴巴</span>
        </div>

        <Modal
            v-model="modification"
            title="修改分销商分组">
            <div class="serial-number">
                <span class="serial-number-text">编号：</span>
                <span class="serial-number-content">01</span>
            </div>
            <div class="serial-number">
                <span class="distributor-text">分销商名称：</span>
                <span class="distributor-content">剑门关</span>
            </div>
            <span class="groups-user">用户查询：</span><Select v-model="model1" style="width:200px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
            
        </Modal>

        <Modal
            v-model="removeBtn"
            title="移除"
            @on-ok="ok"
            @on-cancel="cancel">
            <span class="hint-html">确定移除该条记录？</span>            
        </Modal>
        <!--  -->
            <Table 
            :columns="colnames" 
            :data="tableData"></Table>
                

        <div class="footer-btn">
            <Button type="primary">关闭</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                removeBtn:false,
                modification:false,
                value2: '',
                isShowLoading: false,
                modal1: false,
                animal:'',
                model1: '',

                // 
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                ],
                // 
                colnames:[
                    {
                        title: "编号",
                        key: "DistributorName",
                    },
                    {
                        title: "分销商名称",
                        key: "userName",
                    },
                    {
                        title: "操作",
                        key: "operation",
                        render:(h,params) => {
                            return h('div', [
                                h(
                                    'a',
                                    {
                                        props: {
                                            type:'text',
                                            size:'small'
                                        },
                                        style:{
                                            display:'inline-block',
                                            marginRight:'15px'
                                        },
                                        on: {
                                            click:() => {
                                                this.removeBtn = true
                                                // this.remove(params, 1)
                                            },
                                            
                                        }
                                    },'移除'
                                ),
                                h(
                                    'a',
                                    {
                                        props: {
                                            type:'text',
                                            size:'small'
                                        },
                                        style:{
                                            display:'inline-block',
                                            marginRight:'15px'
                                        },
                                        on: {
                                            click:() => {
                                                this.modification = true
                                            }
                                        }
                                    },'修改'
                                ),
                            ])
                        }
                    },
                ],
                tableData: [
                    {
                        DistributorName:'测试旅行社有限责任公司',
                        name:'张三',
                        userName:'15623',
                        phoneNumber:'13920162543',
                        landlineNumber:'023-6543276',
                        registrationDate:'启用',
                        operation:'',
                    },
                    {
                        DistributorName:'测试旅行社有限责任公司',
                        userName:'15623',
                        operation:'',
                    },
                    {
                        DistributorName:'测试旅行社有限责任公司',
                        userName:'15623',
                        operation:'',
                    },
                ],
                colnames1:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: "编号",
                        width: 90,
                        key: "DistributorName",
                    },
                    {
                        title: "分销商名称",
                        width: 200,
                        key: "userName",
                    },
                    {
                        title: "手机号",
                        key: "operation",
                    },
                ],
                tableData1: [
                    {
                        DistributorName:'11111',
                        name:'张三',
                        userName:'15623',
                        phoneNumber:'13920162543',
                        operation:'13477073333',
                    },
                    {
                        DistributorName:'11111',
                        userName:'15623',
                        operation:'13477073333',
                    },
                    {
                        DistributorName:'11111',
                        userName:'15623',
                        operation:'13477073333',
                    },
                ]
            }
        },
        methods: {
            handleQuery() {},
            ok (index) {
                this.remove(index, 1);
                this.$Message.info('删除成功');
            },
            cancel () {
                this.$Message.info('取消成功');
            },
            remove(index) {
                this.tableData.splice(index,1)
            }
        }
    }
</script>

<style>
.add-cardTitle {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
}
.serial-number {
    margin: 15px 0;
    padding-left: 30px;
}
.serial-number > span {
    width: 10%;
    display: inline-block;
    text-align: right;
}
.serial-number .serial-content {
    width: 10%;
    display: inline-block;
    text-align: left;
    padding-left: 20px;
}
.footer-btn {
    text-align: center;
    margin-top: 20px;
}
.ivu-breadcrumb {
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 10px;
}
.ivu-breadcrumb>span:last-child {
    color: #4E81F0
}
</style>
