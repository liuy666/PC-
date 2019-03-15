<style lang="less" scoped>
    .firstText {
        margin-bottom: 20px;
        .userId {
            font-size: 16px;
            font-weight: bold;
            color: #191919;
        }
    }
    .remind {
        border:1px solid #4B7FF0; 
        overflow: hidden;
        height: 45px;
        line-height: 45px;
        font-size: 13px;
        &>span {
            float: left;
            margin: 0 55px 0 10px;
            a {
                color: #333;
            }
            i {
                font-style: normal;
            }
        }
    }
    .tableTitle {
        overflow:hidden;
        background-color: #4B7FF0;
        height: 35px;
        line-height: 35px;
        padding: 0 10px;
        color: #fff;
        a {
            color: #F0EAEA
        }
    }    
</style>

<template>
    <div id="firstPage">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <Card style="width:90%; min-height: 1000px;" :bordered="false">
            <p class="firstText"><span class="userId">{{ userId }}</span>，欢迎您！上次登录时间：{{ lastTime }}</p>
            <!-- <div style="overflow:hidden; margin: 20px 0 20px;">
                <span style="float: left;">帐号安全度：</span>
                <Progress :percent="percent" :stroke-width="20" style="width:60%; float:left; margin:0 10px 0 20px;"/>
                <span style="float:left; color:gray"><a href="#">{{ unverifiedItem }}</a></span>
            </div> -->
            <div class="remind">
                <span>订单提醒：<a href="">未支付订单(<i style="color: red">{{ notPayment }}</i>)</a></span>
                <span><a href="#">未消费订单(<i style="color: red">{{ notSpending }}</i>)</a></span>
                <span><a href="#">待审核订单(<i>{{ toAudit }}</i>)</a></span>
                <span><a href="#">预付款余额：<i style="color: red">{{ sum }}</i><span style="color: red">元</span></a></span>
            </div>
            <p class="tableTitle">
                <span style="float: left;">最近订单</span>
                <a href="#" style="float: right;">全部订单</a>
            </p>
            <radioTable 
                :colname="colnames"
                :total="total"
                :tableData="tableData"
                :loading="isLoading"
                @changePage="handleChangePage"></radioTable>
        </Card>
    </div>
</template>

<script>
    export default {
        name: 'first-page',
        data() {
            return {
                userId: '',
                lastTime: '',
                notPayment: '',
                notSpending: '',
                toAudit: '',
                sum: '',
                isShowLoading: false,
                // unverifiedItem: 'X手机未验证',
                // percent: 25,

                /* 表格属性 */
                colnames: [
                    {
                        title: '订单号',
                        minWidth: 160,
                        render: (h,params) => {
                            return h('a',params.row.orid);
                        }
                    },
                    {
                        title: '服务商',
                        key: 'szscenicname',
                        minWidth: 170
                    },
                    {
                        title: '游览日期',
                        key: 'dtstartdate',
                        width: 120
                    },
                    {
                        title: '订单金额',
                        width: 100,
                        render: (h,params) => {
                            return h('span',`${ params.row.zfmont - params.row.tpmont + params.row.tpsx }元`);
                        }
                    },
                    {
                        title: '订单状态',
                        width: 100,
                        render: (h,params) => {
                            if(params.row.strddzt == '已出票' && params.row.scenictype == '06') {
                                return h('span','已入住');
                            } else {
                                return h('span',params.row.strddzt);
                            }
                        }
                    },
                    {
                        title: '领票人（联系人）',
                        key: 'ornm',
                        minWidth: 130
                    },
                    {
                        title: '操作',
                        minWidth: 170,
                        render: (h,params) => {
                            if(params.row.ddzt == '00' && params.row.isrealnam == true) {
                                if(params.row.expire == 1) {
                                    return h('div',[
                                        h('span',{
                                            style: {
                                                marginRight: '10px'
                                            }
                                        },'订单已过期'),
                                        h('a','团队成员')
                                    ]);
                                } else {
                                    return h('div',[
                                        h('a',{
                                            style: {
                                                marginRight: '10px'
                                            }
                                        },'支付订单'),
                                        h('a','团队成员')
                                    ]);
                                }
                            } else if(params.row.ddzt != '00' && !params.row.isrealnam) {
                                return h('a','查看详情');
                            } else if(params.row.ddzt != '00') {
                                return h('div',[
                                    h('a',{
                                        style: {
                                            marginRight: '10px'
                                        }
                                    },'查看详情'),
                                    h('a','团队成员')
                                ]);
                            } else {
                                if(params.row.expire == 1) {
                                    return h('span','订单已过期');
                                } else {
                                    return h('a','支付订单');
                                }
                            }
                        }
                    }
                ],
                total: 0,
                tableData: [],
                isLoading: false
            }
        },
        // 初始化页面
        async created() {
            this.isShowLoading = true;
            const res = await this.$api.get(this.lee + '/ec/orderManage/getFirstPageView',{
                usid: sessionStorage.getItem("userName"),
                page: 1,
                pageSize: 10
            });
            console.log(res);
            if(!res) {
                this.isShowLoading = false;
                return;
            }

            this.tableData = res.data.PaginationSupport.items;
            this.total = res.data.PaginationSupport.totalCount;
            this.userId = res.data.usid;
            this.lastTime = res.data.lastdate;
            this.notPayment = res.data.wzfsize,
            this.notSpending = res.data.wxfsize,
            this.toAudit = res.data.wshsize,
            this.sum = res.data.money,
            this.isShowLoading = false;
        },
        methods: {
            handleChangePage() {

            }
        }
    }
</script>