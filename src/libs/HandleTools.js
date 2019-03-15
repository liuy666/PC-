let handleTools = {

    /**
     * 格式化标准时间为字符串格式
     * @param {string} date -- 待格式化的日期字符串
     * @return {string} newDate --  格式化后的日期字符串 yyyy-mm-dd
     */
    formatDate(date) {
        if(date instanceof Date) {
            let year = date.getFullYear(),
                month = ('0' + (date.getMonth() + 1)).slice(-2),
                day = ('0' + date.getDate()).slice(-2),
                newDate = year + '-' + month + '-' + day;
            return newDate;
        } else {
            return date;
        }
    },

    /**
     * 对象深拷贝
     * @param {object} source -- 源对象  
     * @return {string} sourceCopy -- 拷贝后返回的对象 
     */
    objDeepCopy(source) {
        let sourceCopy = {};
        for (let attr in source) {
            sourceCopy[attr] = source[attr];
        }
        // console.log(sourceCopy);
        return sourceCopy;
    },

    /**
     * 数组对象深拷贝
     * @param {object} source -- 源数组  
     * @return {string} newArray -- 拷贝后返回的数组
     */
    arrayObjDeepCopy(source) {
        let newArray = [].concat(JSON.parse(JSON.stringify(source)));
        // console.log(newArray);
        return newArray;
    },

    /**
     * 从数组中查找给定值，找到返回true，否则返回false
     * @param {array} array -- 待查找数组
     * @param {string/number} id -- 给定的查找值
     * @return {boolean} true/false
     */
    isExist(id,array) {
        if(array.indexOf(id) > -1) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * 从数组去重
     * @param {array} array -- 待去重的数组
     * @return {array} 去重后的新数组
     */
    removeRepeat(array) {
        let result = array.sort().reduce((init, current)=>{
            if(init.length===0 || init[init.length-1]!==current){
                init.push(current);
            }
            return init;
        }, []);
        return result;
    },

    /**
     * 正则验证
     */
    validateReg: {
        // 身份证验证
        idCard(num) {
            let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
            return reg.test(num) ? true : false;
        },
        // 手机验证
        phoneNumber(num) {
            let reg = /^(13[0-9]|14[5-9]|15[0-9]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
            return reg.test(num) ? true : false;
        }
    }
};

export default handleTools;