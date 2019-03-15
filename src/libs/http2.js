import http from './http.js';
import common from './common1';

let lee = process.env.NODE_ENV === "production" ? '' : '/lee',
 fm = process.env.NODE_ENV === "production" ? '' : '/fm',
 api = process.env.NODE_ENV === "production" ? '' : '/api';

const http2 = {};

let totalMethods = {
    getEndString(urlParams){
        let endString='';
        for(let key in urlParams){
            endString+='/';
            endString+=urlParams[key];
        }
        return endString;
    }
};

// //获取散户token
// http2.GetToken = function(params){
//     return http.get(api+'/uaa/oauth/token');
// }

//获取平台号，商户ID号
http2.SettleMerchantId = function(vm,params){
    // params.usid = sessionStorage.getItem("userName");
    // console.log(1113);
    // a36798d1-57c1-48dd-8fe2-c80851147ed8
    // Object.assign(params,{'access_token':'a36798d1-57c1-48dd-8fe2-c80851147ed8'});
    return http.get(fm+'/finance/basis/getSettleMerchantId',params)
        .then( res=>{
            if(res){
                if(parseInt(res.merchantId) === 0){
                    common.showMessageModal(vm,'当前用户未开户',2);
                    return;
                }
                return res;
            }else{
                return;
            }

    });

};

http2.MyDeal = (urlParams,params)=>{
    let endString= totalMethods.getEndString(urlParams);
    return http.get(fm+'/finance/basis/invoices'+endString,params);
};

http2.MyDealDetial = (urlParams,params)=>{
    let endString= totalMethods.getEndString(urlParams);
    return http.get(fm+'/finance/basis/invoicesDetail'+endString,params);
};

http2.MyBankCard = (urlParams)=>{
    let endString= totalMethods.getEndString(urlParams);
    return http.get(fm+'/finance/basis/getCards'+endString);
}

export default http2;