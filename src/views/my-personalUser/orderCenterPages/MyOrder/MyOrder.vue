<template>
    <div class="MyOrder">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>

        <div class="cardTitle"><span >我的订单</span></div>
        <!-- 我的订单 -->
        <div v-show="easyTripTreasure">
            <detail-form
                    :isListPage="true"
                    :formDatas="formDatas"
                    :formItemList="formItemList"
                    :btnLabelWidth="120"
                    :labelWidth="120"
                    @getFormData="handleQuery"
                    @setDay="setDay"
                    @setWeek="setWeek"
                    @setMonth="setMonth"></detail-form>
            <radioTable
                    :loading="isLoading"
                    :colname="colnames"
                    :total="total"
                    :tableData="tableData"
                    :pageCode="currentPage"
                    @on-change="changePage"
                    @changePage="handleChangePage"
                    @on-page-size-change="changePageSize"></radioTable>
        </div>

        <!-- 我的易旅宝 -->
        <div v-show="myOrder">
            <detail-form
                    :isListPage="true"
                    :formDatas="formDatas"
                    :formItemList="formItemList"
                    :btnLabelWidth="120"
                    :labelWidth="120"
                    @getFormData="handleQuery"
                    @setDay="setDay"
                    @setWeek="setWeek"
                    @setMonth="setMonth"></detail-form>
            <!--  -->
            <radioTable
                    :loading="isLoading"
                    :colname="colnames"
                    :total="total"
                    :tableData="tableData"
                    :pageCode="currentPage"
                    @on-change="YLBchangePage"
                    @changePage="myYLBChangePage"
                    @on-page-size-change="myYLBPageSize"></radioTable>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                orderTitleName:'',
                easyTripTreasure:false,
                myOrder:false,
                ddztName:'',
                treasureDdzt:'',
                pageNumSelect: 0,
                pageSize: 0,
                total: 1,
                start: 0,
                watchTotal: 0,
                end: 0,
                page:1,
                totalCount: 0,
                currentProviderId: 0,
                currentPage: 1,
                pageNumNew: 10,
                rowData: null,
                isQuery: false,
                isLoading: false,
                isShowLoading: false,
                animal: "",
                formDatas: {
                    val1: "",
                    val2: "",
                    val3: '99',
                    val4: 0,
                    val5: '',
                    val6: new Date(),
                },
                formItemList: [
                    {
                        keyName: "val1",
                        type: 1,
                        label: "输入订单号",
                        labelWidth:97
                    },
                    {
                        keyName: "val2",
                        type: 1,
                        label: "领票人",
                        labelWidth:75
                    },
                    {
                        keyName: "val3",
                        type: 4,
                        label: "订单状态",
                        optionList: [],
                        labelWidth:82
                    },
                    {
                        label: "搜索条件",
                        type: 2,
                        keyName: "val4",
                        labelWidth:82,
                        class: 'float_option_big',
                        optionList: [
                            {
                                value: 0,
                                label: "按照游览日期查询",

                            },
                            {
                                value: 1,
                                label: "按照下单日期查询"
                            },
                            {
                                value: 2,
                                label: "按照支付日期查询"
                            }
                        ]
                    },
                    {
                        keyNameStart: "val5",
                        keyNameEnd: "val6",
                        type: 5,
                        label: "选择时间",
                        double: true,
                        isShowDate:true,
                        labelWidth:82,
                        class: 'float_option_big',
                    },
                ],
                colnames: [
                    {
                        title: "产品信息",
                        // key: "RefundOrderNumber",
                        width: 187,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "span",
                                    {
                                        props: {
                                            size: "small"
                                        },
                                        style: {
                                            display: "block",
                                            textAlign: "left",
                                            marginTop:'5px'
                                        }
                                    },
                                    params.row.sztickettypename + '(' + params.row.szcrowdkindname + ')'
                                ),
                                h(
                                    "span",
                                    {
                                        props: {
                                            size: "small"
                                        },
                                        style: {
                                            display: "block",
                                            textAlign: "left",
                                            margin:'5px 0'
                                        }
                                    },
                                    "游玩日期：" + params.row.dtstartdate
                                ),
                                h(
                                    "span",
                                    {
                                        props: {
                                            size: "small"
                                        },
                                        style: {
                                            display: "block",
                                            textAlign: "left",
                                            marginBottom:'5px'
                                        }
                                    },
                                    "门票数量：" +  params.row.numb + '张'
                                )
                            ]);
                        }
                    },
                    {
                        title: "订单金额",
                        width:100,
                        render: (h, params) => {
                            return h(
                                "span",
                                params.row.mont + '元'
                            );
                        }
                    },
                    {
                        title: "订单编号",
                        key: "orid",
                        width:180,
                    },
                    {
                        title: "订单状态",
                        // key: "strddzt",
                        width:139,
                        render: (h, params) => {
                            if(params.row.strddzt === '已支付'){
                                return h("div", [
                                    h(
                                        "span",
                                        {
                                            style: {
                                                color: "#57c720"
                                            },
                                        },
                                    params.row.strddzt
                                    ),
                                ]);
                            } else if(params.row.strddzt === '全退订(退款中)' || params.row.strddzt === '已支付(退款中)' || params.row.strddzt ===  '全退订(退订已退款)'){
                                return h("div", [
                                    h(
                                        "span",
                                        {
                                            style: {
                                                color: "#e84d45"
                                            },
                                        },
                                    params.row.strddzt
                                    ),
                                ]);
                            } else if(params.row.strddzt === '垃圾（作废）订单'){
                                return h("div", [
                                    h(
                                        "span",
                                        {
                                            style: {
                                                color: "#999"
                                            },
                                        },
                                    params.row.strddzt
                                    ),
                                ]);
                            } else if(params.row.strddzt === '未付款'){
                                return h("div", [
                                    h(
                                        "span",
                                        {
                                            style: {
                                                color: "#fd9141"
                                            },
                                        },
                                    params.row.strddzt
                                    ),
                                ]);
                            } else {
                                return h("div", [
                                    h(
                                        "span",
                                        {
                                            style: {
                                                color: "#999"
                                            },
                                        },
                                    params.row.strddzt
                                    ),
                                ]);
                            }
                        }
                    },
                    {
                        title: "领票人",
                        key: "ornm",
                        width:171,
                    },
                    {
                        title: "订单操作",
                        key: "serviceCharge",
                        width:160,
                        render: (h, params) => {
                            const regE = /(^\\d{8}000\\d{6})/;
                            return h("div", [
                                h(
                                    "a",
                                    {
                                        props: {
                                            size: "small"
                                        },
                                        style: {
                                            padding: "5px 10px",
                                            display: "block",
                                            borderRadius: "3px"
                                        },

                                        on: {
                                            click: () => {
                                                let oridName = params.row.orid;
                                                let usidName = sessionStorage.getItem("userName");
                                                let incluOrid = oridName.includes('000')
                                                let saleName = 1;
                                                if(params.row.ddzt === '27' && /(^\d{8}000\d{6})/.test(oridName) === true){
                                                    this.$router.push({
                                                        query: {orid:oridName, usid:usidName},
                                                        name: 'DetailsMyCancellation'
                                                    });
                                                } else if(params.row.ddzt !== '27' && /(^\d{8}000\d{6})/.test(oridName) === true) {
                                                    this.$router.push({
                                                        query: {orid:oridName, usid:usidName},
                                                        name: 'MyOrderDetailsPage'
                                                    });
                                                } else if(/(^\d{8}000\d{6})/.test(oridName) === false) {
                                                    this.$router.push({
                                                        query: {orid:oridName, usid:usidName},
                                                        name: 'distributorDetails',
                                                    });
                                                } 
                                            }
                                        }
                                    },
                                    "查看订单"
                                )
                            ]);
                        }
                    }
                ],
                tableData: []
            };
        },
        created(){
            // handleQuery
            if(this.$route.query.ddzt === '00'){
                this.easyTripTreasure = false
                this.myOrder = true;
                this.myETravel();
                return
            } else if(this.$route.query.ddzt === '101') {
                this.easyTripTreasure = false
                this.myOrder = true;
                this.myETravel();
                return
            } else if(this.$route.query.ddzt === '02') {
                this.easyTripTreasure = false
                this.myOrder = true;
                this.myETravel();
                return
            } else if(this.$route.name.indexOf('?') === -1){
                this.easyTripTreasure = true
                this.myOrder = false;
                this.purchaseAxios();
                return
            }
            this.treasureDdzt = this.$route.query.ddzt


        },
        updated(){

        },
        methods: {
            purchaseAxios() {
                this.isShowLoading = true;
                let date = new Date();
                this.formDatas.val5 = date;
                let newDate = date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
                this.$http.get(this.baseURL + "/ec/orderManage/orderViewList", {
                    params: {
                        startDate:new Date(newDate).format("yyyy-MM-dd"),//开始日期
                        endDate:new Date(this.formDatas.val6).format("yyyy-MM-dd"),// 结束日期
                        access_token: sessionStorage.getItem("name"),
                        usid: sessionStorage.getItem("userName"),
                        page: this.currentPage,
                        pageSize: "10",
                        url: window.location.host
                    }
                })
                    .then(response => {
                        
                        let itemTableList = response.data.data.PaginationSupport.items; //渲染表格数据
                        let pageSize = response.data.data.PaginationSupport.pageSize; //一页展示多少条
                        let formPage = response.data.data.PaginationSupport.startIndex; //page分页
                        let itemOptionList = response.data.data.ddztlist; //订单状态
                        let tablePageSize = response.data.data.PaginationSupport.totalCount; //表格数据条数
                        this.total = tablePageSize;
                        this.pageSize = pageSize;
                        this.tableData = itemTableList;
                        if(itemOptionList.strddzt === '已支付') {

                        }
                        this.formItemList[2].optionList = itemOptionList.map(item => {
                            return {
                                value: item.pmcd,
                                label: item.pmva
                            };
                        });
                        // this.orderTitleName = '我的订单'
                        if(response.data.code === 400){
                            this.$Modal.error({
                                title: '温馨提示',
                                content: response.data.msg
                            });
                        } else if(response.data.code === 500) {
                            this.$Modal.error({
                                title: '温馨提示',
                                content: response.data.msg
                            });
                        } else if(response.data.code === 404) {
                            this.$Modal.error({
                                title: '温馨提示',
                                content: response.data.msg
                            });
                        }
                        this.isShowLoading = false;
                        return;
                    })
                    .catch(error => {
                        
                        this.isShowLoading = false;
                        return;
                    });
            },
// ----------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------
//待支付 待出行 我的退订
            myETravel(){

                this.isShowLoading = true;
                let date = new Date();
                // this.formDatas.val5 = new Date();
                this.formDatas.val5 = date;
                let newDate = date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
                this.$http.get(this.baseURL + '/ec/orderManage/orderViewListbyddzt',{
                    params: {
                        startDate:new Date(newDate).format("yyyy-MM-dd"),//开始日期
                        endDate:new Date(this.formDatas.val5).format("yyyy-MM-dd"),// 结束日期
                        access_token:sessionStorage.getItem("name"),
                        ddzt:this.$route.query.ddzt,
                        usid: sessionStorage.getItem("userName"),
                        page:this.currentPage,
                        pageSize:'10',
                        url:window.location.host
                    }
                }).then(response => {
                    if(response.data.code === 200) {
                        let itemTableList = response.data.data.PaginationSupport.items; //渲染表格数据
                        let pageSize = response.data.data.PaginationSupport.pageSize; //一页展示多少条
                        let formPage = response.data.data.PaginationSupport.startIndex; //page分页
                        let itemOptionList = response.data.data.ddztlist; //订单状态
                        let tablePageSize = response.data.data.PaginationSupport.totalCount; //表格数据条数
                        this.total = tablePageSize;
                        this.pageSize = pageSize;
                        this.tableData = itemTableList;
                        this.formItemList[2].optionList = itemOptionList.map(item => {
                            return {
                                value: item.pmcd,
                                label: item.pmva
                            };
                        });
                        // if(this.$route.query.ddzt === '101') {
                        //     this.orderTitleName = '我的退订订单'
                        // } else if(this.$route.query.ddzt === '02') {
                        //     this.orderTitleName = '待出行订单'
                        // } else if(this.$route.query.ddzt === '00') {
                        //     this.orderTitleName = '待支付订单'
                        // }
                    } else if(response.data.code === 400){
                        this.$Modal.error({
                            title: '温馨提示',
                            content: response.data.msg
                        });
                    } else if(response.data.code === 500) {
                        this.$Modal.error({
                            title: '温馨提示',
                            content: response.data.msg
                        });
                    } else if(response.data.code === 404) {
                        this.$Modal.error({
                            title: '温馨提示',
                            content: response.data.msg
                        });
                    }
                    this.isShowLoading = false;
                    return;
                }).catch((error) => {
                    
                    this.isShowLoading = false;
                    return;
                });
                return
            },


            // 翻页查询
            myYLBChangePage(pageNum) {
                let handTotal = this.total;
                if (!this.isQuery) {
                    this.YLBsubmitForm({
                        pageSize: handTotal,
                        page: pageNum
                    });
                } else {
                    this.YLBsubmitForm({
                        pageSize: handTotal,
                        page: pageNum,
                        scenics: this.currentProviderId
                    });
                }
            },

            YLBsubmitForm(name) {
                this.isShowLoading = true;
                let pageSizeName = name.page;
                this.page = pageSizeName
                
                let formPageSize = this.total;
                this.$http.get(this.baseURL + '/ec/orderManage/orderViewListbyddzt',{
                    params: {
                        access_token:sessionStorage.getItem("name"),
                        ddzt:this.$route.query.ddzt,
                        usid: sessionStorage.getItem("userName"),
                        page:pageSizeName,
                        pageSize:'10',
                        url:window.location.host
                    }
                }).then(response => {
                    
                    // startIndex
                    let itemTableList = response.data.data.PaginationSupport.items;
                    let tablePageSize = response.data.data.PaginationSupport.totalCount;
                    let tablePageStartIndex = response.data.data.PaginationSupport.startIndex;
                    let pageSize = response.data.data.PaginationSupport.pageSize; //一页展示多少条
                    this.currentPage = tablePageStartIndex;
                    this.pageSize = pageSize;
                    this.tableData = itemTableList;
                    this.total = tablePageSize;
                    if (this.isQuery) {
                        this.watchTotal = tablePageSize;
                    }
                    this.rowData = null;

                    if(response.data.code === 400){
                        this.$Modal.error({
                            title: '温馨提示',
                            content: response.data.msg
                        });
                    } else if(response.data.code === 500) {
                        this.$Modal.error({
                            title: '温馨提示',
                            content: response.data.msg
                        });
                    } else if(response.data.code === 404) {
                        this.$Modal.error({
                            title: '温馨提示',
                            content: response.data.msg
                        });
                    }
                    this.isShowLoading = false;
                    return;
                })
                    .catch(error => {
                        
                        this.isShowLoading = false;
                        return;
                    });
            },

            // 选择每页可显示的最大数据条数
            myYLBPageSize(num) {
                
                this.pageNumNew = num;
                this.setEnd(this.currentPage);
                //父组件接收每页条数
                this.$emit("myYLBPageSize", num);
            },
            //  选择页码
            YLBchangePage(num) {
                
                this.currentPage = num;
                this.setEnd(num);
                //父组件接收当前页码
                this.$emit("YLBchangePage", num);
            },

            //表格正下方从几到几
            setEnd(current) {
                this.start = (current - 1) * this.pageNumNew + 1;
                this.end = current * this.pageNumNew;
                if (this.total > 0 && this.end > this.total) {
                    this.end = this.total;
                }
            },
            myYLBQuery(name,index){
                
                this.isShowLoading = true;
                let userStartTime = new Date(this.formDatas.val5).format("yyyy-MM-dd")
                let userEndTime = new Date(this.formDatas.val6).format("yyyy-MM-dd")
                if(userEndTime < userStartTime) {
                    this.$Modal.error({
                        title: '温馨提示',
                        content: '结束日期不能小于当前日期'
                    });
                    this.isShowLoading = false;
                    return;
                }
                this.currentPage = name.page;
                // 
                // let token = sessionStorage.getItem("name");
                // let page = pageNumber;
                // let usid = sessionStorage.getItem("userName");
                // let pageSize = '10';
                // let pageSize = this.pageSize;
                // let url = window.location.host;
                this.$http.get(this.baseURL + '/ec/orderManage/orderViewListbyddzt',{
                    params: {
                        access_token:sessionStorage.getItem("name"),
                        ddzt:this.$route.query.ddzt,
                        usid: sessionStorage.getItem("userName"),
                        page:'1',
                        pageSize:'10',
                        url:window.location.host
                    }
                }).then((response) => {
                    
                    
                    
                    let listItems = response.data.data.PaginationSupport.items;
                    this.tableData = listItems;
                    this.total = response.data.data.PaginationSupport.totalCount; //表格数据条数
                    this.currentPage = 1
                    if(response.data.code === 400){
                        this.$Modal.error({
                            title: '温馨提示',
                            content: response.data.msg
                        });
                    } else if(response.data.code === 500) {
                        this.$Modal.error({
                            title: '温馨提示',
                            content: response.data.msg
                        });
                    } else if(response.data.code === 404) {
                        this.$Modal.error({
                            title: '温馨提示',
                            content: response.data.msg
                        });
                    }
                    this.isShowLoading = false;
                    return;
                })
                    .catch((error) => {
                        
                        this.isShowLoading = false;
                        return;
                    });
            },
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

            // 翻页查询
            handleChangePage(pageNum) {
                let handTotal = this.total;
                if (!this.isQuery) {
                    this.submitForm({
                        pageSize: handTotal,
                        page: pageNum
                    });
                } else {
                    this.submitForm({
                        pageSize: handTotal,
                        page: pageNum,
                    });
                }
            },

            submitForm(name) {
                this.isLoading = true;
                let pageSizeName = name.page;
                this.page = pageSizeName
                let formPageSize = this.total;
                this.$http
                    .get(this.baseURL + "/ec/orderManage/orderViewList", {
                        params: {
                            access_token: sessionStorage.getItem("name"),
                            usid: sessionStorage.getItem("userName"),
                            page: pageSizeName,
                            pageSize: "10",
                            ornm: this.formDatas.val2,
                            url: window.location.host
                        }
                    })
                    .then(response => {
                        
                        // startIndex
                        let itemTableList = response.data.data.PaginationSupport.items;
                        let tablePageSize = response.data.data.PaginationSupport.totalCount;
                        let tablePageStartIndex = response.data.data.PaginationSupport.startIndex;
                        let pageSize = response.data.data.PaginationSupport.pageSize; //一页展示多少条
                        this.currentPage = tablePageStartIndex;
                        this.pageSize = pageSize;
                        this.tableData = itemTableList;
                        this.total = tablePageSize;
                        if (this.isQuery) {
                            this.watchTotal = tablePageSize;
                        }
                        this.rowData = null;

                        if(response.data.code === 400){
                            this.$Modal.error({
                                title: '温馨提示',
                                content: response.data.msg
                            });
                        } else if(response.data.code === 500) {
                            this.$Modal.error({
                                title: '温馨提示',
                                content: response.data.msg
                            });
                        } else if(response.data.code === 404) {
                            this.$Modal.error({
                                title: '温馨提示',
                                content: response.data.msg
                            });
                        }
                        this.isLoading = false;
                        return;
                    })
                    .catch(error => {
                        
                        this.isLoading = false;
                        return;
                    });
            },
            //选择每页可显示的最大数据条数
            changePageSize(num) {
                this.pageNumNew = num;
                this.setEnd(this.currentPage);
                //父组件接收每页条数
                this.$emit("changePageSize", num);
            },
            //选择页码
            changePage(num) {
                this.currentPage = num;
                this.setEnd(num);
                //父组件接收当前页码
                this.$emit("changePage", num);
            },

            //表格正下方从几到几
            setEnd(current) {
                this.start = (current - 1) * this.pageNumNew + 1;
                this.end = current * this.pageNumNew;
                if (this.total > 0 && this.end > this.total) {
                    this.end = this.total;
                }
            },
            //查询
            handleQuery(name) {
                this.isShowLoading = true;
                let userStartTime = new Date(this.formDatas.val5).format("yyyy-MM-dd")
                let userEndTime = new Date(this.formDatas.val6).format("yyyy-MM-dd")
                if(userEndTime < userStartTime) {
                    this.$Modal.error({
                        title: '温馨提示',
                        content: '结束日期不能小于当前日期'
                    });
                    this.isShowLoading = false;
                    return;
                }
                this.currentPage = name.page;
                let pageNumber = name.page;
                let token = sessionStorage.getItem("name");
                let page = 1;
                let usid = sessionStorage.getItem("userName");
                let pageSize = '10';
                // let pageSize = this.pageSize;
                let url = window.location.host;
                this.$http.post(this.baseURL + "/ec/orderManage/queryOrderList?access_token=" + token + "&usid=" + usid + "&page=" + page + "&pageSize=" +  pageSize + "&url=" +  url,
                    {
                        startDate: new Date(this.formDatas.val5).format("yyyy-MM-dd"),
                        endDate: new Date(this.formDatas.val6).format("yyyy-MM-dd"),
                        // startDate: "2016-01-01", //开始日期
                        // endDate: "2018-08-01", // 结束日期
                        ornm: this.formDatas.val2,
                        radiobutton2: this.formDatas.val4,
                        orid: this.formDatas.val1,
                        ddzt: this.formDatas.val3
                    }
                )
                    .then((response) => {
                        
                        let listItems = response.data.data.PaginationSupport.items;
                        this.tableData = listItems;
                        let tablePageSize = response.data.data.PaginationSupport.totalCount; //表格数据条数
                        this.total = tablePageSize;
                        this.currentPage = 1
                        if(response.data.code === 400){
                            this.$Modal.error({
                                title: '温馨提示',
                                content: response.data.msg
                            });
                        } else if(response.data.code === 500) {
                            this.$Modal.error({
                                title: '温馨提示',
                                content: response.data.msg
                            });
                        } else if(response.data.code === 404) {
                            this.$Modal.error({
                                title: '温馨提示',
                                content: response.data.msg
                            });
                        }
                        this.isShowLoading = false;
                        return;
                    })
                    .catch((error) => {
                        
                        this.isShowLoading = false;
                        return;
                    });
            },


            // 设置近三天
            setDay(e) {
                // return this.valueDateTwo = new Date();
                // this.$emit('setDay');
                const date = new Date();
                this.formDatas.val5 = date;
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 3);
                this.formDatas.val6 = new Date();
                return date;
                this.$emit("setDay");
            },
            // 设置近一周
            setWeek(e) {
                const date = new Date();
                this.formDatas.val5 = date;
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                this.formDatas.val6 = new Date();
                return date;
                this.$emit("setWeek");
            },
            // 设置近一月
            setMonth(e) {
                const date = new Date();
                this.formDatas.val5 = date;
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
                this.formDatas.val6 = new Date();
                return date;
                // e.preventDefault();
                this.$emit("setMonth");
            },
            // 未来三天
            // setTriduum(e) {
            //   const date = new Date();
            //   this.formDatas.val6 = date;
            //   date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
            //   this.formDatas.val5 = new Date();
            //   return date;
            //   // e.preventDefault();
            //   this.$emit("setTriduum");
            // },
            // // 未来一周
            // setHebdomad(e) {
            //   const date = new Date();
            //   this.formDatas.val6 = date;
            //   date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            //   this.formDatas.val5 = new Date();
            //   return date;
            //   // e.preventDefault();
            //   this.$emit("setHebdomad");
            // },

        },
    };
</script>

<style scoped>
    .search-condition {
        padding-right: 10px;
    }
    .cardTitle {
        font-size: 16px;
        font-weight: bold;
        color: #191919;
        margin-top: 20px
    }
</style>
