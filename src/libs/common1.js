let common = {

};

common.getCurrentDate = (date, AddDayCount) => { //获取年月日转化格式,AddDayCount传1，为明天，-1为昨天
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

common.getCurrentDate1 = (date,AddDatCount) =>{//本周，本月
    let [myDate,lastday,firstday] = ['', '', ''],
        arr = [];
    if (date) {
        myDate = new Date(date)
    } else {
        myDate = new Date()
    }
    let today = myDate.getDay(),
        tomonth = myDate.getMonth();
    let getMyDate = (myDate)=>{
        let [month, day] = ['',''];
        day = myDate.getDate();
        month = myDate.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`
        }
        if (day < 10) {
            day = `0${day}`
        }
        myDate = `${myDate.getFullYear()}-${month}-${day}`;
        return myDate
    };
    switch(AddDatCount){
        case -1:
            if(today){
                myDate.setDate(myDate.getDate() - today + 7);
                lastday = getMyDate(myDate);
                myDate.setDate(myDate.getDate() - 6);
                firstday = getMyDate(myDate);
            }else{
                myDate.setDate(myDate.getDate());
                lastday = getMyDate(myDate);
                myDate.setDate(myDate.getDate() - 7);
                firstday = getMyDate(myDate);
            }
            break;
        case -2:
            myDate.setMonth(myDate.getMonth()+1);
            myDate.setDate(0);
            lastday = getMyDate(myDate);
            myDate.setDate(1);
            firstday = getMyDate(myDate);
            break;
        case -4://这个是为了返回本月的最后一天
            myDate.setMonth(myDate.getMonth()+1);
            myDate.setDate(0);
            lastday = getMyDate(myDate);
            firstday = getMyDate(myDate);
        default:
            firstday = myDate;
            lastday = myDate;
            break;
    }

    arr[0] = lastday;
    arr[1] = firstday;
    return arr;

}

common.getCurrentTime = (time) => { //获取年月日转化格式
    let [myTime, hour, minute] = ['', '', ''];
    console.log(time);
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

common.showMessageModal = (vm, res, type) => { //对话框提示,1为错误,2为警告
    if (type === 1) {
        if (typeof res === 'object') {
            vm.$Modal.error({
                title: "温馨提示",
                content: res.data.msg
            });
        } else {
            vm.$Modal.error({
                title: "温馨提示",
                content: res
            });
        }
    } else if (type === 2) {
        vm.$Modal.warning({
            title: "温馨提示",
            content: res
        });
    } else if (type === 3) {
        vm.$Modal.success({
            title: "温馨提示",
            content: res
        });
    }
};

common.emptyObj = (obj)=>{
    for (let key in obj){
        if(!obj[key]&&obj[key]!==0&&obj[key]!=='0'){
            delete obj[key];
        }

        if(key.indexOf('Time') > -1 && obj[key]){
            try{
                obj[key] = common.getCurrentDate(obj[key]);
            }
            catch (e) {
                // throw new Error(e);
            }

        }
    }
};

common.changeDisabledEndDate = (val,disabledEnd,disabledEndDate)=>{
    let time = 0;
    disabledEnd = Date.parse(val);
    // time = Math.floor((new Date().getTime() - disabledEnd)/86400000);
    // time = time > 29 ? 29 : time;
    disabledEndDate = [-1,0];
    return {disabledEnd,disabledEndDate}
};

export default common;