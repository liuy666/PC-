const page = {
    state: {
        listPagePars: [],
        httpArr: [],
        level: 1,
        treeType: '',
        belongRouterArr: [],
    },
    mutations: {
        saveListPagePars: (state,{ path, pars, index, tableData, total }) => {
            pars = JSON.parse(JSON.stringify(pars));
            let arr = state.listPagePars;
            let obj = {
                path: path,
                pars: pars,
                index: index,
                tableData: tableData,
                total: total
            };
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].path == path && arr[i].index == index) {
                    state.listPagePars.splice(i, 1, obj);
                    return;
                }
            }
            state.listPagePars.push(obj);
        },
        saveHttpArr: (state,item) => {
            state.httpArr.push(item);
        },
        saveBelongRouter: (state,item) => {
            state.belongRouterArr.push(item);
        },
    }
};
export default page;
