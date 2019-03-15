const distributorOrder = {
    state: {
        // 是否显示树菜单
        isShowTree: false,
        // 门票的下单预订数量和票id的键值对数组
        ticketInfo: [],
        // 进度条的值
        currStep: 0
    },
    mutations: {
        // 打开/关闭客源地树菜单
        changeTreeStatus(state,val) {
            state.isShowTree = val;
        },
        // 保存门票的数量和票id到数组
        saveAmountList(state,list) {
            state.ticketInfo = list;
        },
        // 新增一张票
        increase(state,ticketId) {
            let operateRow = state.ticketInfo.filter(item => {
                return item.ticketId === ticketId;
            })[0];
            operateRow.amount += 1;
            if(operateRow.isRealName === 1) {
                operateRow.touristList.push({ // 入园信息输入框配置对象
                    formDatas: {
                        tourName: '', // 姓名
                        idNumber: '', // 身份证号码
                        telNumber: '' // 手机号码
                    },
                    formItemList: [
                        {
                            type: 1,
                            keyName: 'tourName',
                            label: '姓名',
                            placeholder: '请输入证件上你实际姓名'
                        },
                        {
                            type: 1,
                            keyName: 'idNumber',
                            label: '身份证号码',
                            placeholder: '请输入身份证号码，可用于检票'
                        },
                        {
                            type: 1,
                            keyName: 'telNumber',
                            label: '手机号码',
                            placeholder: '请输入手机号码，用于接收短信'
                        }
                    ],
                });
            }
        },
        // 减少一张票
        reduce(state,ticketId) {
            let operateRow = state.ticketInfo.filter(item => {
                return item.ticketId === ticketId;
            })[0];

            // let amount = operateRow.amount;
            if(operateRow.amount <= 0) {
                return;
            }
            operateRow.amount -= 1;
            // state.ticketInfo.filter(item => item.ticketId === ticketId)[0].amount = amount;
            if(operateRow.isRealName === 1) {
                operateRow.touristList.pop();
            }
        },
        setStep(state,val) {
            state.currStep = val;
        }
    }
};

export default distributorOrder;