//下拉框里面默认的显示字段key和对应的属性value

const totalList = {};

//交易状态
totalList.tradingStateStatusList = [
    {
        value: 'PENDING',
        label: '待支付'
    },
    {
        value: 'TOBECONFIRM',
        label: '待确认'
    },
    {
        value: 'REFUNDED',
        label: '退款'
    },
    {
        value: 'SUCCESS',
        label: '已成功'
    },
    {
        value: 'CLOSE',
        label: '关闭'
    },
    {
        value: 'FALSE',
        label: '失败'
    },
    {
        value: 'OUT_DATED',
        label: '超时'
    },
];

//资金去向
// totalList.capitalWhereaboutsStatusList = [
//     {
//         value: '1',
//         label: '收入'
//     },
//     {
//         value: '2',
//         label: '支出'
//     },
// ];

// 业务类型
totalList.businessTypeStatusList = [
    {
        value: 'TRADE',
        label: '交易订单'
    },
    {
        value: 'REFUND',
        label: '退款单'
    },
    {
        value: 'CHARGE',
        label: '充值单'
    },
    {
        value: 'AGENCY',
        label: '代付单'
    },
    {
        value: 'TRANSFER',
        label: '转账单'
    },
    {
        value: 'WITHDRAW',
        label: '提现单'
    },
    {
        value: 'TRAVELIN',
        label: '旅游卡入园订单'
    },
    {
        value: 'PAYMENT',
        label: '支付单'
    },
    {
        value: 'BAAPAYMENT',
        label: '代扣单'
    },
];

//支付方式
totalList.paymentMethodStatusList = [
    {
        value: 'IN_FULL',
        label: '全额支付'
    },
    {
        value: 'FREE_INSTALMENTS',
        label: '分步支付'
    },
    {
        value: 'PREAUTHORIZATION',
        label: '预授权'
    },
    {
        value: 'BY_INSTALMENT_SCHEDULE',
        label: '分期支付'
    },
    {
        value: 'ON_CREDIT',
        label: '白条支付'
    },
];


export default totalList;