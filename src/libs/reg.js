//自定义表单验证
let reg = {

};
//手机
reg.mobile = (rule, value, callback) => {
    const reg = /^(13[0-9]|14[5-9]|15[0-9]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
    if (!value) {
        let str = '手机号码不能为空';
        callback(new Error(str))
    } else if (!reg.test(value)) {
        let str = '手机号码格式错误';
        callback(new Error(str))
    } else {
        callback();
    }
};
//邮箱
reg.email = (rule, value, callback) => {
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    if (!value) {
        let str = '电子邮件地址不能为空';
        callback(new Error(str))
    } else if (!reg.test(value)) {
        let str = '电子邮件地址格式错误';
        callback(new Error(str))
    } else {
        callback();
    }
};

//身份证
reg.IDcard = (rule, value, callback) => {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!value) {
        let str = '身份证号不能为空';
        callback(new Error(str))
    } else if (!reg.test(value)) {
        let str = '身份证格式不正确';
        callback(new Error(str))
    } else {
        callback();
    }
};

//内部编号
reg.bname = (rule, value, callback) => {
    const reg = /^[1-9]\d*$/;
    if (!value) {
        let str = '内部编号不能为空';
        callback(new Error(str))
    } else if (!reg.test(value)) {
        let str = '只能输入大于0的数字';
        callback(new Error(str))
    } else {
        callback();
    }
};
//固话或者手机
reg.telno = (rule, value, callback) => {
    const reg1 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    const reg2 = /^(13[0-9]|14[5-9]|15[0-9]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
    if (!value) {
        callback(new Error('电话号码不能为空'))
    } else if (value.indexOf('-') === -1 && !reg2.test(value)) {
        callback(new Error('电话号码格式错误'))
    } else if (value.indexOf('-') > -1 && !reg1.test(value)) {
        callback(new Error('电话号码格式错误'))
    } else {
        callback();
    }
};

//系统设置--电商用户管理/用户名
reg.usid = (rule, value, callback) => {
    const reg = /^[0-9A-Za-z]{4,}$/;
    if (!value) {
        let str = '用户名不能为空';
        callback(new Error(str))
    } else if (!reg.test(value)) {
        let str = '请输入4位以上包含数字字母的用户名';
        callback(new Error(str))
    } else {
        callback();
    }
};

//系统设置--电商用户管理/企业邮编
reg.postno = (rule, value, callback) => {
    const reg = /^[1-9][0-9]{5}$/;
    if (!reg.test(value) && value) {
        let str = '请输入正确的邮编';
        callback(new Error(str))
    } else {
        callback();
    }
};

//网址
reg.website = (rule, value, callback) => {
    const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    if (!reg.test(value) && value) {
        let str = '请输入正确的网址';
        callback(new Error(str))
    } else {
        callback();
    }
};

//开户管理--结算系统商户账号
reg.applicationName = (rule, value, callback) => {
    const reg = /^[a-zA-Z][a-zA-Z_0-9]{4,31}$/;
    if (!value) {
        callback(new Error('结算系统商户账号不能为空'))
    } else if (!reg.test(value)) {
        callback(new Error('结算系统商户账号限制以字母开头，支持字母、数字、下划线，5到32位'))
    } else {
        callback();
    }
};

//开户管理--结算周期
reg.settlementDays = (rule, value, callback) => {
    const reg = /^\d+$/;
    if (!value) {
        callback(new Error('结算周期不能为空'))
    } else if (!reg.test(value) || parseInt(value) < 1 || parseInt(value) > 365) {
        callback(new Error('结算周期天数为1-365的整数'))
    } else {
        callback();
    }         
};

//基础票/组合票有效天数
reg.validityday = (rule, value, callback) => {
    const reg = /^[1-9]\d*$/;
    if (!value) {
        callback(new Error('有效天数不能为空'))
    } else if (!reg.test(value)) {
        callback(new Error('有效天数为正整数'))
    } else {
        callback();
    }
};
//整数 票号规则管理  不为空+整数+长度不超过两位数
reg.positiveInt = (rule, value, callback) => {
    let EgName = ['iticketnolen', 'intons2', 'itickettypecodepos', 'iserialnolen', 'szticketnosuffix'];
    let ChName = ['票号总长度', '票号前缀长度', '票代码长度', '流水号长度', '票号后缀长度'];
    let dec = '';
    const reg = /^[0-9]\d*$/;
    EgName.forEach((item, index) => {
        if (item == rule.field) {
            dec = ChName[index];
        }
    })
    if (!value) {
        callback(new Error(dec + '不能为空'))
    } else if (!reg.test(value)) {
        callback(new Error(dec + '为正整数'))
    } else if (value.length > 2) {
        callback(new Error(dec + '长度不超过两位'))
    } else {
        callback();
    }
};

//整数 可为空
reg.IsNumber = (rule, value, callback) => {
    const reg = /^[0-9]\d*$/;
    if (!reg.test(value)) {
        callback(new Error('请输入数字'))
    } else {
        callback();
    }
};

//域名
reg.url = (rule, value, callback) => {
    const reg = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/;
    if (!value) {
        callback(new Error('域名名称不能为空'))
    } else {
        callback();
    }
};

export default reg;