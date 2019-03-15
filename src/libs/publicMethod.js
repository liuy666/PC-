export default {
    // 授信管理--
    settlementCycle (settle) {
        var m;
        switch (settle.settlementType) {
            case 'DAY':
                if (typeof (settle.settlementDays) !== 'undefined') {
                    return '间隔周期：T+' + settle.settlementDays + '天';
                } else {
                    return '间隔周期：未设置';
                }
                break;
            case 'WEEK':
                m = settle.settlementCycle.split(',').length;
                let week = [];
                for (let i = 0; i < m; i++) {
                    switch (settle.settlementCycle.split(',')[i]) {
                        case '1':
                            week.push(' 周一');
                            break;
                        case '2':
                            week.push(' 周二');
                            break;
                        case '3':
                            week.push(' 周三');
                            break;
                        case '4':
                            week.push(' 周四');
                            break;
                        case '5':
                            week.push(' 周五');
                            break;
                        case '6':
                            week.push(' 周六');
                            break;
                        case '7':
                            week.push(' 周日');
                            break;
                        default:
                            return;
                    }
                }
                return '每周结算：' + week.toString();
                break;
            case 'MONTH':
                m = settle.settlementCycle.split(',').length;
                let month = [];
                for (let i = 0; i < m; i++) {
                    if (settle.settlementCycle.split(',')[i] !== '32') {
                        month.push(settle.settlementCycle.split(',')[i] + '日');
                    }
                }
                for (let i = 0; i < m; i++) {
                    if (settle.settlementCycle.split(',')[i] === '32') {
                        month.push('月末最后一天');
                    }
                }
                return '每月结算：' + month;
                break;
            case 'YEAR':
                m = settle.settlementCycle.split(',').length;
                let year = [];
                for (let i = 0; i < m; i++) {
                    year.push(settle.settlementCycle.split(',')[i].replace('/', '月') + '日');
                }
                return '每年结算：' + year;
                break;
            case 'STAGE':
                return '每期结算：' + settle.settlementCycle.split(',')[0] + '天为一期，第' + settle.settlementCycle.split(',')[1] + '天为初始结算日';
                break;
            case 'EXCESS':
                return '待结算金额超过：' + settle.settlementCycle + '元，进行结算';
                break;
            default:
        }
    },
    // 时间格式
    fmt (fmt, timeStamp) {
        let date = new Date(timeStamp);
        var o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            's+': date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (0[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    }
};
