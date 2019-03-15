let req = {

};
//获取表格当前页数据并用vuex记录
req.currentPageData = (url, vm, method) => {
    // vm.Cookie.set('name', '26d5b0e2-92e3-4c8d-bb14-67b176711805');
    let a = '';
    vm.loading = true;
    vm.refreshUrlQuery();
    for (let i in vm.urlQuery) {
        if (vm.urlQuery[i] !== '' && vm.urlQuery[i] !== undefined) {
            a += `&${i}=${vm.urlQuery[i]}`
        }
    }
    url = vm.lee + url + '?access_token=' + sessionStorage.getItem('name') + a;
    if (method == 'get') {
        return new Promise((resolve, reject) => {
            vm.$http.get(url, { headers: { 'Content-Type': 'application/json' } })
                .then(res => {
                    if (res.data.code === 200) {
                        let data1 = res.data.data;
                        if (data1) {
                            if (!data1.items) {
                                vm.tableData = []
                            } else {
                                vm.tableData = data1.items;
                            }
                            vm.total = data1.totalCount;
                            vm.pageNum = data1.pageSize;
                        } else {
                            vm.tableData = [];
                            vm.total = 0;
                        }
                        vm.currentRowData = {};
                        vm.loading = false;
                        vm.spinShow = false;
                        resolve()
                    } else {
                        vm.$req.showMessageModal(vm, res, 1);
                        vm.loading = false;
                        vm.spinShow = false;
                        reject()
                    }
                })
        })
    } else if (method == 'post' || !method) {
        return new Promise((resolve, reject) => {
            vm.$http.get(url, { headers: { 'Content-Type': 'application/json' } })
                .then(res => {
                    if (res.data.code === 200) {
                        let data1 = res.data.data;
                        if (data1) {
                            if (!data1.items) {
                                vm.tableData = []
                            } else {
                                vm.tableData = data1.items;
                            }
                            vm.total = data1.totalCount;
                            vm.pageNum = data1.pageSize;
                        } else {
                            vm.tableData = [];
                            vm.total = 0;
                        }
                        vm.currentRowData = {};
                        vm.loading = false;
                        vm.spinShow = false;
                        resolve()
                    } else {
                        vm.$req.showMessageModal(vm, res, 1);
                        vm.loading = false;
                        vm.spinShow = false;
                        reject()
                    }
                })
        })
    }
};

req.getFormDatasAdd = (vm) => {
    vm.$store.commit('saveListPagePars', { //记录增查改的数据
        path: vm.$route.path,
        formDatas1: vm.formDatas1,
        index: vm.currentIndex,
    });
};

req.chooseTreeNode = (url, vm, data) => { //展开树形控件
    url = vm.lee + url;
    data['access_token'] = sessionStorage.getItem('name');
    return vm.$http.get(url, {
        params: data
    })
};

req.addNewData = (url, vm, data, method, noSingle, name) => { //新增数据保存，成功后关闭页面并跳转到该数据表格
    let str = noSingle ? '&' : '?';
    url = vm.lee + url + str + 'access_token=' + sessionStorage.getItem('name');
    return new Promise((resolve, reject) => {
        vm.$http.post(url, data)
            .then(res => {
                if (res.data.code === 200) {
                    vm.$req.showModal(res, vm, name);
                    vm.currentRowData = {};
                    vm.btnLoading = false;
                    resolve(1)
                } else {
                    vm.$req.showMessageModal(vm, res, 1);
                    vm.btnLoading = false;
                    reject()
                }
            })
            .catch(error => {
                vm.btnLoading = false;
                vm.$Modal.error({
                    title: "温馨提示",
                    content: "接口异常, 请联系管理人员"
                })
            })
    })
};

req.editData = (url, vm, data, method, noSingle, name) => { //修改
    let str = noSingle ? '&' : '?';
    url = vm.lee + url + str + 'access_token=' + sessionStorage.getItem('name');
    if (method === 'post' || !method) {
        return new Promise((resolve, reject) => {
            vm.$http.post(url, data)
                .then(res => {
                    if (res.data.code === 200) {
                        vm.$Modal.remove();
                        setTimeout(() => {
                            vm.$req.showModal(res, vm, name);
                            vm.currentRowData = {};
                            vm.btnLoading = false;
                            resolve(1)
                        },500);
                    } else {
                        vm.$req.showMessageModal(vm, res, 1);
                        vm.btnLoading = false;
                        reject()
                    }
                })
                .catch(error => {
                    vm.btnLoading = false;
                    vm.$Modal.error({
                        title: "温馨提示",
                        content: "接口异常, 请联系管理人员"
                    })
                })
        })
    } else if (method === 'put') {
        return new Promise((resolve, reject) => {
            vm.$http.put(url, data)
                .then(res => {
                    if (res.data.code === 200) {
                        vm.$req.showModal(res, vm, name);
                        vm.currentRowData = {};
                        vm.btnLoading = false;
                        resolve(1)
                    } else {
                        vm.$req.showMessageModal(vm, res, 1);
                        vm.btnLoading = false;
                        reject()
                    }
                })
        })
    } else if (method === 'get') {
        return new Promise((resolve, reject) => {
            vm.$http.get(url, {params: data})
                .then(res => {
                    if (res.data.code === 200) {
                        vm.$req.showModal(res, vm, name);
                        vm.currentRowData = {};
                        vm.btnLoading = false;
                        resolve(1)
                    } else {
                        vm.$req.showMessageModal(vm, res, 1);
                        vm.btnLoading = false;
                        reject()
                    }
                })
        })
    }
};

req.showModal = (res, vm, name) => { //新增修改请求成功或失败之后弹框提示
    vm.$Modal.success({
        title: '温馨提示',
        content: `${vm.tipName}成功，欢迎使用环球雅途易旅通`,
        onOk: () => {
            if (vm.isClose === false) {
                vm.currentIndex = 1
            } else {
                vm.$router.push({
                    name: name
                });
            }
        }
    })
};
    // let wait = 3;
    // let timeOut = () => {
    //     if (wait > -1) {
    //         if (wait == 3) {
    //             setTimeout(() => {
    //                 vm.$Modal.success({
    //                     title: `操作成功,${wait}秒后自动关闭`,
    //                     content: `${vm.tipName}成功，欢迎使用环球雅途易旅通`,
    //                     onOk: () => {
    //                         // vm.$common.closePage(vm);
    //                         wait = -1;
    //                         return false
    //                     }
    //                 });
    //                 wait--;
    //                 timeOut()
    //             }, 1)
    //         } else if (wait > 0 && wait < 3) {
    //             setTimeout(() => {
    //                 vm.$Modal.success({
    //                     title: `操作成功,${wait}秒后自动关闭`,
    //                     content: `${vm.tipName}成功，欢迎使用环球雅途易旅通`,
    //                     onOk: () => {
    //                         // vm.$common.closePage(vm);
    //                         wait = -1;
    //                         return false
    //                     }
    //                 });
    //                 wait--;
    //                 timeOut()
    //             }, 1000)
    //         } else {
    //             setTimeout(() => {
    //                 if (vm.isClose === false) {
    //                     vm.currentIndex = 1
    //                 } else {
    //                     vm.$req.closePage(vm);
    //                 }
    //                 vm.$Modal.remove();
    //             }, 1000)
    //         }
    //     } else {
    //         vm.$Modal.remove();
    //         if (vm.isClose === false) {
    //             vm.currentIndex = 1
    //         } else {
    //             vm.$req.closePage(vm);
    //         }
    //     }
    // };
    // return new Promise(resolve => {
    //     timeOut();
    //     resolve()
    // })


req.closePage = (vm) => { //关闭新增，修改，查看等页面，并跳到所属页面
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let lastPageObj = pageOpenedList[0];
    let belongRouterArr = vm.$store.state.page.belongRouterArr;
    if (belongRouterArr.length > 0) { //浏览器无刷新，从哪来回哪去
        for (let obj of belongRouterArr) {
            if (obj.routerName === vm.$route.name) {
                for (let item of pageOpenedList) {
                    if (item.name === obj.belongRouterName) {
                        vm.$req.linkTo(vm, item, pageOpenedList);
                        break;
                    }
                }
                break;
            }
        }
    } else { //浏览器刷新，回到页面数组的上一个
        let len = pageOpenedList.length;
        for (let i = 1; i < len; i++) {
            if (pageOpenedList[i].name === vm.$route.name) {
                if (i < (len - 1)) {
                    lastPageObj = pageOpenedList[i + 1];
                } else {
                    lastPageObj = pageOpenedList[i - 1];
                }
                break;
            }
        }
        vm.$req.linkTo(vm, lastPageObj, pageOpenedList)
    }
};

req.linkTo = (vm, item, pageOpenedList) => { //移除Vuex中路由数组中对应路由并跳转
    vm.$store.commit('removeTag', vm.$route.name);
    vm.$store.commit('closePage', vm.$route.name);
    pageOpenedList = vm.$store.state.app.pageOpenedList;
    sessionStorage.pageOpenedList = JSON.stringify(pageOpenedList);
    vm.$router.push({ name: item.name, params: item.argu });
};

req.getCurrentDate = (date, AddDayCount) => { //获取年月日转化格式,AddDayCount传1，为明天，-1为昨天
    let [myDate, year, month, day] = ['', '', '',''];
    if (date) {
        myDate = new Date(date)
    } else {
        myDate = new Date()
    }
    if (AddDayCount !== undefined) {
        myDate.setDate(myDate.getDate() + AddDayCount);
    }
    day = myDate.getDate();
    month = myDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    return `${myDate.getFullYear()}-${month}-${day}`
};

req.getCurrentTime = (time) => { //获取年月日转化格式
    let [myTime, hour, minute] = ['', '', ''];
    myTime = new Date(time);
    hour = myTime.getHours();
    minute = myTime.getMinutes();
    if (hour < 10) {
        hour = `0${hour}`
    }
    if (minute < 10) {
        minute = `0${minute}`
    }
    return `${hour}:${minute}`
};

req.getScenicList = (vm, index, hasAll) => { //获取景区服务商下拉列表 (公用)
    return new Promise((resolve, reject) => {
        vm.$http.get(vm.baseUrl + '/ticket/provider/v1/getScenicProviderByServerName', {
            params: {
                access_token: sessionStorage.getItem('name'),
                url: window.location.hostname
            }
        })
            .then(res => {
                if (res.data.code === 200) {
                    let options = [];
                    res.data.data.forEach(element => {
                        let oneOption = {};
                        oneOption["value"] = element.iscenicid;
                        oneOption["label"] = element.szscenicname;
                        options.push(oneOption);
                    });
                    if (hasAll) {
                        // vm.formItemList[index].optionList = options;
                        resolve(options)
                    } else {
                        options.shift();
                        // vm.formItemList[index].optionList = options;
                        resolve(options)
                    }
                } else {
                    vm.$Modal.error({
                        title: "温馨提示",
                        content: res.data.msg
                    });
                    vm.spinShow = false
                }
            })
    });
};

req.getProductInfoByScenicId = (vm, iscenicid, index, url) => { //根据服务商id获取票、产品列表
    return new Promise((resolve, reject) => {
        let obj = {};
        if (url) {
            url = vm.baseUrl + '/ticket/combinationTicket/v1/getComposeProductByScenicId';
            obj = {
                access_token: sessionStorage.getItem('name'),
                scenicId: iscenicid
            }
        } else {
            url = vm.baseUrl + '/ticket/ticket/v1/getProductInfoByScenicId';
            obj = {
                access_token: sessionStorage.getItem('name'),
                iscenicid: iscenicid
            }
        }
        vm.$http.get(url, {
            params: obj
        })
            .then(res => {
                if (res.data.code == 200) {
                    let options = [];
                    res.data.data.forEach(element => {
                        let oneOption = {};
                        oneOption['value'] = element.itickettypeid;
                        oneOption['label'] = element.sztickettypename;
                        options.push(oneOption);
                    });
                    // vm.formItemList[index].optionList = options;
                    resolve(options)
                } else {
                    vm.$Modal.error({
                        title: "温馨提示",
                        content: res.data.msg
                    });
                    vm.spinShow = false
                }
            })
    })
};

req.getSelectItem = (url, vm, index, value, label, hasAll, parentId, val) => { //获取下拉列表(注意，如果需要根据某个id获取下拉列表，则传parentId和val)
    url = vm.lee + url;
    let obj = { access_token: sessionStorage.getItem('name') };
    if (parentId) {
        obj[parentId] = val
    }
    return new Promise((resolve, reject) => {
        vm.$http.get(url, {
            params: obj
        })
            .then(res => {
                if (res.data.code == 200) {
                    let options = [];
                    res.data.data.forEach(element => {
                        let oneOption = {};
                        oneOption["value"] = element[value];
                        oneOption["label"] = element[label];
                        options.push(oneOption);
                    });
                    if (hasAll) {
                        // vm.formItemList[index].optionList = options;
                        resolve(options)
                    } else {
                        options.shift();
                        // vm.formItemList[index].optionList = options;
                        resolve(options)
                    }
                } else {
                    vm.$Modal.error({
                        title: "温馨提示",
                        content: res.data.msg
                    });
                    vm.spinShow = false
                }
            })
    })
};

req.getHotel = (vm, index, hasAll) => { //获取酒店下拉列表 (公用)
    return new Promise((resolve, reject) => {
        vm.$http.get(vm.baseUrl + '/ticket/provider/v1/getHotelName', {
            params: {
                access_token: sessionStorage.getItem('name'),
                url: window.location.hostname
            }
        })
            .then(res => {
                if (res.data.code === 200) {
                    let options = [];
                    res.data.data.forEach(element => {
                        let oneOption = {};
                        oneOption["value"] = element.iscenicid;
                        oneOption["label"] = element.szscenicname;
                        options.push(oneOption);
                    });
                    if (hasAll) {
                        // vm.formItemList[index].optionList = options;
                        resolve(options)
                    } else {
                        options.shift();
                        // vm.formItemList[index].optionList = options;
                        resolve(options)
                    }
                } else {
                    vm.$Modal.error({
                        title: "温馨提示",
                        content: res.data.msg
                    });
                    vm.spinShow = false
                }
            })
    });
};

req.addOrsubtractRow = (num, index, keyName, vm) => { //新增修改增加减少行
    let i = '';
    for (let j = 0; j < vm.formItemList1.length; j++) {
        if (vm.formItemList1[j].keyName == keyName) {
            i = j;
            break;
        }
    }
    if (num === 1) {
        if (vm.formItemList1[i].colList.length > 1) {
            vm.formDatas1[keyName].splice(index, 1);
            vm.formItemList1[i].colList.splice(index, 1)
        } else {
            vm.$Modal.warning({
                title: '温馨提示您',
                content: '至少保留一条选项'
            })
        }
    } else {
        let obj = {};
        for (let k in vm.formDatas1[keyName][0]) {
            obj[k] = ''
        }
        vm.formDatas1[keyName].push(obj);
        vm.formItemList1[i].colList.push(vm.formItemList1[i].colList[0])
    }
};

req.showMessageModal = (vm, res, type) => { //对话框提示,1为错误,2为警告
    if (type === 1) {
        if (typeof res === 'object') {
            vm.$Modal.error({
                title: "温馨提示",
                content: res.data.msg,
                closable: true,
            });
        } else {
            vm.$Modal.error({
                title: "温馨提示",
                content: res,
                closable: true,
            });
        }
    } else if (type === 2) {
        vm.$Modal.warning({
            title: "温馨提示",
            content: res,
            closable: true,
        });
    } else if (type === 3) {
        vm.$Modal.success({
            title: "温馨提示",
            content: res,
            closable: true,
        });
    }
};

req.getMainHeight = (vm) => { //获取单页高度
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    vm.elHeight = `${h - 100 -36}px`; //减100因为顶部为100固定高,36为margin
};

req.toTreeData = (data) => { //一维数组转树形结构
    function tree(idutyid) {
        let arr = [];
        data.filter(item => {
            return item.iparentid === idutyid
        }).forEach(item => {
            arr.push({
                id: item.idutyid,
                title: item.szdutyname,
                checked: item.checked,
                expand: true,
                children: tree(item.idutyid)
            })
        });
        return arr
    }
    return tree(0) // 第一级节点的父id，是null或者0，视情况传入
};

req.validateDate = (vm,start,end) => {
    if (Date.parse(start) > Date.parse(end)) {
        vm.$req.showMessageModal(vm, '起始日期不能大于结束日期', 2);
        return 0
    } else {
        return 1
    }
};


export default req;