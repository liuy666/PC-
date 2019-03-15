import http from '../../libs/http1.js';
import {clearObj,format,calc} from '../../libs/common.js';
import vue from 'vue';
import {baseEaApiURL} from '../../main.js';
import iView from "iview";
import Cookie from 'js-cookie';
import axios from 'axios';
import router from '../../router'

// let urlhead = '/ecApi';

// let urlhead = process.env.NODE_ENV === "production" ? '' : '/ecApi';

let urlhead = process.env.NODE_ENV === "production" ? '' : '/lee';
// let urlhead = '';

// let setTime = function(state){
//     setTimeout(function(){
//         state.isLoading = false;
//     },1000);
// }





const home = {
    state: {
        isLoading: false,
        // activeName:'1',
        logoPic:'',
        hotLine:'',
        footFirstLine:'',
        listVideos:[],
        listBanner:'',
        ticketList:[],
        strategyList:[],
        activeName:'1',
        strategyDetail:{},
        strategyPage:0,
        infoDetail:{},
        infoTotalPage:0,
        ticketLists:[],
        strategyLists:[],
        infoLists:[],
        infoList:[],
        prdlist:[],
        plistObj:{totalPrice:0},//门票详情
        destineArr:[],//门票详情立即预定
        showimg:{
            upadder:'',
            upname:''
        },
        provider:{
            imaxdata:0
        },
        items1:[],//首页底部4条，订单指南，注册与登录，等
        items2:[],
        items3:[],
        items4:[],
        items5:[],
        menuFlag2:'1',
        menuFlag1:'',
        article:{
            amnote:'',
            dtmakedate:''
        },
        lingpiaouser:null,
        lingpiaouserList:''
    },
    mutations: {
        /*预定信息 table + -按钮方法*/
        orderAdd(state,id){
            if(state.destineArr.length === 0){
                state.destineArr = JSON.parse(sessionStorage.getItem('destineArr'));
            }
            state.destineArr.orderInfo.forEach(function(data){
                if(data.icrowdkindid === id){
                    data.num++;
                    // data.xjmoney +=data.price;
                    data.xjmoney = calc(data.price,data.xjmoney,'add');
                    // state.destineArr.xjcount +=data.price;
                    state.destineArr.xjcount = calc(data.price,state.destineArr.xjcount,'add');
                    state.destineArr.numCount++;
                }
            });
        },
        orderReduce(state,id){
            state.destineArr.orderInfo.forEach(function(data){
                if(data.icrowdkindid === id ){
                    if(data.num>0){

                        if(  state.destineArr.numCount<=1){
                            iView.Modal.error({
                                title: '温馨提示',
                                width: 500,
                                content: '至少要预订一种票类'

                            });
                            return;
                        }
                        data.num--;
                        // data.xjmoney -=data.price;
                        data.xjmoney = calc(-data.price,data.xjmoney,'add');
                        // state.destineArr.xjcount -=data.price;
                        state.destineArr.xjcount = calc(-data.price,state.destineArr.xjcount,'add');
                        state.destineArr.numCount--;
                    }
                }
            });
        },
        orderInput(state,{id,value}){

            let count = 0,
                numCount = 0;
            state.destineArr.orderInfo.forEach(function(data){
                if(data.icrowdkindid === id){
                        data.num = value;
                }
            });
            state.destineArr.orderInfo.forEach(function(data){

                    // data.xjmoney = value*data.price;
                    data.xjmoney = calc(value,data.price,'multiply');
                    // count +=data.xjmoney;
                    count = calc(data.xjmoney,count,'add');
                    numCount +=parseInt(value);
                    state.destineArr.numCount = numCount;
            });

            // state.destineArr.orderInfo.forEach(function(data){
            //         // if(data.num>0){
            //         count +=data.xjmoney;
            //         // data.xjmoney =data.price*value;
            //
            //         // }
            //
            // });

            state.destineArr.xjcount = count;
        },

        /*获取预定信息*/
        getdestineArr(state,destinerArr){
            state.destinArr = destinerArr;
        },

        /*门票详情 table + - select按钮方法*/
        ticketDetailAdd(state,{id,ID}){
            state.plistObj.plist.forEach(function(data){
                if(data.icrowdkindid === id && data.itickettypeid===ID){
                    data.number++;
                    // state.plistObj.totalPrice +=data.mactualsaleprice;
                    state.plistObj.totalPrice = calc(data.mactualsaleprice,state.plistObj.totalPrice,'add');

                }
            });
        },
        ticketDetailReduce(state,{id,ID}){
            state.plistObj.plist.forEach(function(data){
                if(data.icrowdkindid === id && data.itickettypeid===ID){
                    if(data.number>0){
                        data.number--;
                        // state.plistObj.totalPrice -=data.mactualsaleprice;
                        state.plistObj.totalPrice = calc(-data.mactualsaleprice,state.plistObj.totalPrice,'add');

                    }
                }
            });
        },
        ticketDetailInput(state,{id,ID,value}){

            let count = 0;

            state.plistObj.plist.forEach(function(data){
                if(data.icrowdkindid === id && data.itickettypeid===ID){
                    data.number = parseInt(value);

                    // count += parseInt(value)*data.mactualsaleprice;
                }
            });
            state.plistObj.plist.forEach(function(data){

                let singlePrice = calc(data.number,data.mactualsaleprice,'multiply');

                // count += data.number*data.mactualsaleprice;
                count = calc(singlePrice,count,'add');

            });

            state.plistObj.totalPrice = count;

        },
        ticketDetailSelect(state,{id,ID,label,value}){
            state.plistObj.plist.forEach(function(data){
                if(data.icrowdkindid === id && data.itickettypeid === ID){
                    let Arr = value.split(";");
                    data.id = Arr[0];
                    let arr = label.split("-");
                   data.startdate = arr[0];
                   data.enddate = arr[1];
                    data.currstock =  Arr[1];

                }
            });
        },


        changeShowimg(state,obj){
            state.showimg.upname = obj.upname;
            state.showimg.upadder = obj.upadder;
        },

        // /*防止刷新页面时activeName变成1*/
        changeActiveName(state,num){

            state.activeName = num;
            sessionStorage.setItem('activeName',num);
        },

        changeMenuFlag2(state,val){
            state.menuFlag2 = val;
            sessionStorage.setItem('menuFlag2',val);
        },
        changeMenuFlag1(state,val){
            console.log(val);
            state.menuFlag1 = val;
            sessionStorage.setItem('menuFlag1',val);
        },
        // changeArticle(state,val){
        //     state.article = val;
        //     sessionStorage.setItem('article', JSON.stringify(val));
        // }
    },
    actions: {
        // requestForHome(context){
        //     let state = context.state;
        //     state.isLoading = true;
        //     let params = {url:window.location.hostname,usid:sessionStorage.getItem('userName')};
        //     http.get(urlhead+'/ec/home/v1/getHomeBaseInfo',params)
        //         .then(function(response){
        //             // console.log(response)
        //             let data = response.data;


        //             state.logoPic = data.domain.logoPic;
        //             sessionStorage.setItem('logoPic',data.domain.logoPic);
        //             state.hotLine = data.domain.logoMark.split("#")[0];
        //             sessionStorage.setItem('hotLine', data.domain.logoMark.split("#")[0]);
        //             state.footFirstLine = data.domain.logoMark.split("#")[1];
        //             state.listVideos = data.listVideos;
        //             state.listBanner = data.dsListBanner;
        //             sessionStorage.setItem('footFirstLine',data.domain.logoMark.split("#")[1]);
        //             state.prdlist = data.prdlist;
        //             // sessionStorage.setItem('listBanner',JSON.stringify(data.listBanner));

        //         });
        //         // .finally(function(){
        //         //     setTime(state);
        //         // });
        // },
        // ticketForHome(context,{page,pageSize}){
        //     let state = context.state;
        //     state.isLoading = true;
        //     let params = {url:window.location.hostname,usid:sessionStorage.getItem('userName'),page:page,pageSize:pageSize};
        //     http.get(urlhead+'/ec/home/v1/getHomeTicket',params)
        //         .then(function(response){
        //             let data = response.data;


        //             state.ticketList = data.ticketList.items;


        //         });
        //         // .finally(function(){
        //         //     setTime(state);
        //         // });
        // },
        // strategyForHome(context,{page,pageSize}){
        //     let state = context.state;
        //     state.isLoading = true;
        //     let params = {url:window.location.hostname,usid:sessionStorage.getItem('userName'),page:page,pageSize:pageSize};
        //     http.get(urlhead+'/ec/home/v1/getHomeStrategy',params)
        //         .then(function(response){

        //             // (response.code !==200)&&return;
        //             let data = response.data;


        //             let arr = [];
        //             arr.push(data.strategy.items[0]);
        //             state.strategyList = arr;
        //             state.infoList = data.information.items;
        //             if(state.infoList.length> 14){
        //                 let arr = [];
        //                 for(let i=0; i<14;i++){
        //                     arr.push(state.infoList[i]);
        //                 }
        //                 state.infoList = arr;
        //             }
        //             state.infoList.forEach(function(obj,index,arr){
        //                 state.infoDetail[obj.amid] = {
        //                     amtopicf : obj.amtopicf,
        //                     dtmakedate : obj.dtmakedate,
        //                     amnote : obj.amnote
        //                 };
        //             });



        //         });
        //         // .finally(function(){
        //         //     setTime(state);
        //         // });
        // },
        // strategyForList(context,{page,pageSize}){
        //     let state = context.state;
        //     // state.isLoading = true;
        //     let params = {url:window.location.hostname,usid:sessionStorage.getItem('userName'),page:page,pageSize:pageSize};
        //     http.get(urlhead+'/ec/home/v1/getStraPage',params)
        //         .then(function(response){
        //             let data = response.data;


        //             state.strategyLists = data.PaginationSupport.items;
        //             state.strategyPage = data.PaginationSupport.totalCount;

        //             // state.listBanner =  data.dsListBanner;
        //             // sessionStorage.setItem('listBanner','');
        //             // JSON.stringify(data.listBanner)

        //             state.strategyLists.forEach(function(obj,index,arr){
        //                 state.strategyDetail[obj.amid] = {
        //                     amtopicf : obj.amtopicf,
        //                     dtmakedate : obj.dtmakedate,
        //                     amnote : obj.amnote
        //                 };
        //             });

        //             sessionStorage.setItem('strategyDetail',JSON.stringify(state.strategyDetail));



        //         });
        //         // .finally(function(){
        //         //     setTime(state);
        //         // });
        // },
        // infoForList(context,{page,pageSize}){
        //     let state = context.state;
        //     // state.isLoading = true;
        //     let params = {url:window.location.hostname,usid:sessionStorage.getItem('userName'),page:page,pageSize:pageSize};
        //     http.get(urlhead+'/ec/home/v1/getInfoPage',params)
        //         .then(function(response){
        //             let data = response.data;


        //             state.infoLists = data.PaginationSupport.items;
        //             state.infoTotalPage = data.PaginationSupport.totalCount;

        //             // state.listBanner = data.dsListBanner;
        //             state.infoLists.forEach(function(obj,index,arr){
        //                 state.infoDetail[obj.amid] = {
        //                     amtopicf : obj.amtopicf,
        //                     dtmakedate : obj.dtmakedate,
        //                     amnote : obj.amnote
        //                 };
        //             });
        //             sessionStorage.setItem('infoDetail',JSON.stringify(state.infoDetail));



        //         });
        //         // .finally(function(){
        //         //     setTime(state);
        //         // });
        // },
        // ticketForList(context,{page,pageSize}){
        //     let state = context.state;
        //     // state.isLoading = true;
        //     let params = {url:window.location.hostname,usid:sessionStorage.getItem('userName'),page:page,pageSize:pageSize};
        //     http.get(urlhead+'/ec/home/v1/getHomeTicket',params)
        //         .then(function(response){
        //             let data = response.data;


        //             state.ticketLists = data.ticketList.items;
        //             // state.listBanner = data.dsListBanner;



        //         });
        //         // .finally(function(){
        //         //     setTime(state);
        //         // });
        // },

        /*门票详情*/
        getProviderIndex(context,{id,dateTime}){
            let state = context.state;
            // state.isLoading = true;
            let params = {
                url:window.location.hostname,
                // usid:sessionStorage.getItem('userName'),
                iscenicid:id,
                dateTime:dateTime?new Date(dateTime).format('yyyy-MM-dd'):(new Date().format('yyyy-MM-dd'))
            };
            let url = urlhead+'/ec/book/getProviderIndex';
            if (sessionStorage.getItem('fxsId')) {
                url = urlhead+'/ec/distributorShop/v1/queryProductViewForDistributor';
                params = {
                    ...params,
                    usid: sessionStorage.getItem('fxsId')
                }
            }
            clearObj(params);

            http.get(url,params)
                .then(function(response){
                    let data = response.data;

                    if(response.code === 200){
                        let arr = [];
                        let obj = {};
                        data.plist.forEach(function(Data){
                            if (Data.int3 && Data.timeList && Data.timeList.length === 0) {
                                console.log('分时预约时间段为空数组')
                            } else if (Data.int3 && !Data.timeList) {
                                console.log('分时预约为null')
                            } else {
                                Data.priceList.forEach(function(value){
                                    obj = {
                                        strbycategorytype:Data.strbycategorytype,
                                        sztickettypename:Data.sztickettypename,
                                        int3:Data.int3,
                                        itickettypeid:Data.itickettypeid,
                                        iscenicid:Data.iscenicid,
                                        timeList:(Data.timeList&&Data.timeList.length!==0)?Data.timeList:[],
                                        currstock: (Data.timeList&&Data.timeList.length!==0)?Data.timeList[0].currstock:'',
                                        enddate: (Data.timeList&&Data.timeList.length!==0)?Data.timeList[0].enddate:'',
                                        startdate: (Data.timeList&&Data.timeList.length!==0)?Data.timeList[0].startdate:'',
                                        id: (Data.timeList&&Data.timeList.length!==0)?Data.timeList[0].id:'',
                                        icrowdkindid:value.icrowdkindid,
                                        isrealname:value.isrealname,
                                        mactualsaleprice:value.mactualsaleprice,
                                        listingprice:value.listingprice,
                                        szcrowdkindname:value.szcrowdkindname,
                                        number : 0,
                                    };
                                    if (sessionStorage.getItem('fxsId')) {
                                        obj = {
                                            ...obj,
                                            icrowdkindpriceid:value.icrowdkindpriceid
                                        }
                                    }
                                    arr.push(obj);
                                    obj = {};
                                });
                            }
                        });
                        state.plistObj = {totalPrice:0,plist:arr,imgList:data.provider.list};
                        state.provider = data.provider;
                        state.showimg.upadder = data.provider.list[0].upadder;
                        state.showimg.upname = data.provider.list[0].upname;

                    }else{
                        state.plistObj = {totalPrice:0,plist:[],imgList:data.provider.list};
                    }
                });
                // .finally(function(){
                //     setTime(state);
                // });
        },

        /*门票详情立即预定*/
        destine(context,{paramsData,params,that}){
            let state = context.state;
            // state.isLoading = true;
            let url = urlhead +'/ec/book/v1/destine';
            if (sessionStorage.getItem('fxsId')) {
                url = urlhead +'/ec/distributorShop/v1/destine';
                paramsData = {
                    ...paramsData,
                    fxid: sessionStorage.getItem('fxsId')
                }
            }
            http.post2(url,paramsData,params,that)
                .then(function(response){
                    if(response.code === 200){
                        let data = response.data;
                        if(data.lingpiaouserList){
                            let obj = null;
                            state.lingpiaouser = obj;
                            sessionStorage.setItem('lingpiaouser',JSON.stringify(obj));
                            data.lingpiaouserList.forEach(function(item,index,arr){
                                if(item.isfirst){
                                    let obj = {
                                        mobile: item.mobile,
                                        username: item.username,
                                        zjhm: item.zjhm
                                    };
                                    state.lingpiaouser = obj;
                                    sessionStorage.setItem('lingpiaouser',JSON.stringify(obj));
                                }
                            });

                            state.lingpiaouserList = data.lingpiaouserList;
                            sessionStorage.setItem('lingpiaouserList',JSON.stringify(data.lingpiaouserList));
                        } else{
                            let obj = null;
                            let arr =[];
                            state.lingpiaouser = obj;
                            sessionStorage.setItem('lingpiaouser',JSON.stringify(obj));

                            state.lingpiaouserList = arr;
                            sessionStorage.setItem('lingpiaouserList',JSON.stringify(arr));
                        }

                        state.destineArr = data;
                        let count = 0;
                        data.orderInfo.forEach(function(Data){
                            // count +=Data.num;
                            count = calc(Data.num,count,'add');
                        });
                        state.destineArr.numCount = count;

                        sessionStorage.setItem('destineArr',JSON.stringify(state.destineArr));
                        router.push({name:'firstStepOfTicketPay'});
                        // window.open(`${window.location.host}/#/stepFirst`, '_blank')
                    }
                })
                .catch(() => {
                    that.spinShow = false
                })
                // .finally(function(){
                //     setTime(state);
                // });
        },

        /*4.23	下发短信验证码接口*/
        sendVerificationCode(context,{phoneNumber,type}){
            let state = context.state;
            // state.isLoading = true;
            // 类型（0010注册、0015找回密码、0018领票人）
            let params = {
                mobile: phoneNumber,
                type: type,
                url: window.location.hostname
            };
            return http.get2(urlhead+'/ec/book/sendVerificationCode1',params)
                .then(function(response){
                    let data = response.data;

                    return Promise.resolve(response);


                });
                // .finally(function(){
                //     setTime(state);
                // });
        },
        /*4.10	下发注册短信验证码接口*/
        sendRegistraVerificationCode(context,phoneNumber){
            let state = context.state;
            // state.isLoading = true;
            // let custom = {
            //     mobile: phoneNumber,
            // };
            let params = {
                // custom: custom,
                mobile: phoneNumber,
            };
            let paramsData = {
                access_token:''
            };
           return http.post(urlhead+'/ec/custom/sendRegMessage',paramsData,params)
                .then(function(response){
                    let data = response.data;

                    return Promise.resolve(response);

                });
                // .finally(function(){
                //     setTime(state);
                // });
        },

        /*4.5	保存订单登录检查接口*/
        checkLogin(context,{paramsData,params},fun){
            let state = context.state;
            // state.isLoading = true;
            return http.post2(urlhead +'/ec/custom/v1/checkLogin',paramsData,params)
                .then(function(response){
                    return Promise.resolve(response);
                })
                .catch(function(error){
                    return Promise.reject(error);
                })
               // .finally(function(){
               //     setTime(state);
               // });
        },

        /*4.6	保存订单接口*/
        saveOrderInfo(context,{paramsData,params}){
            let state = context.state;
            let url = urlhead + '/ec/book/v1/saveOrderInfo';
            // if(sessionStorage.getItem('fxsId')) {
            //     url = urlhead + '/ec/distributorShop/v1/saveOrderForDistributor';
            //     paramsData = {
            //         ...paramsData,
            //         fxid: sessionStorage.getItem('fxsId')
            //     }
            // }
            // state.isLoading = true;
            return http.post(url, paramsData, params)
                .then(function(response){
                    return Promise.resolve(response);
                    // if(response.code === 200){
                    //     window.location.replace(response.data.view);
                    // }
                });
                // .finally(function(){
                //     setTime(state);
                // });
        },

        /*4.11	注册接口*/
        addCustomInfo(context,{paramsData,params}){
            let state = context.state;
            // state.isLoading = true;
            return http.post(urlhead + '/ec/custom/v1/addCustomInfo',paramsData,params)
                .then(function(response){
                    if(response.code === 200){
                        iView.Modal.success({
                            title: '温馨提示',
                            width: 500,
                            content: '注册成功'

                        });
                    }
                });
                // .finally(function(){
                //     setTime(state);
                // });
        },

        /*4.8	散客,分销商用户登录接口*/
        tologin(context,{usid,pwd}){
            let state = context.state;
            // state.isLoading = true;
            let params = {
                usid: usid,
                pwd: pwd,
                url:window.location.hostname
            };
            return http.get(urlhead+'/ec/custom/login',params)
                .then(function(response){
                    let data = response.data;

                    Cookie.set('userName', data.custom.usid);        // 用户名
                    Cookie.set('lgtp', data.custom.lgtp);        // 用户类别
                    Cookie.set('ustp', data.custom.ustp);        // 分销商等级

                    let tokenData = {
                        username:data.custom.usid,
                        password:pwd,
                        grant_type:"password",
                        scope:"app",
                        client_id:"android",
                        client_secret:"android"
                    };
                    return Promise.resolve(tokenData);
                });
                // .finally(function(){
                //     setTime(state);
                // });

        },

        /*4.1	获取令牌接口*/
        getToken(context,{paramsData}){
            let state = context.state;
            // state.isLoading = true;

            return axios.post(  urlHead +'/uaa/oauth/token',vue.QS.stringify(paramsData))
                .then(function(response){
                    console.log(response);
                    let data = response.data;
                    Cookie.set('name', data.access_token);    // 存储 token
                    let lgtp = sessionStorage.getItem('lgtp');
                    if(sessionStorage.getItem('notredirect')){
                        sessionStorage.removeItem('notredirect');
                        return;
                    }
                    if(lgtp === '01'){
                        vue.$router.push({
                            name: 'MyInformation'
                        });
                    }else if(lgtp === '02'){
                        vue.$router.push({
                            name: 'purchaseOrder'
                        });
                    }else{
                        iView.Modal.error({
                            title:'未获取token信息，请刷新后重试',
                            width: 500,
                            content: '至少要预订一种票类'

                        });
                    }


                });
                // .finally(function(){
                //     setTime(state);
                // });
        },

        /*4.32	首页底部链接接口*/
        // rqHomeBt(context,cmid){
        //     let state = context.state;
        //     // state.isLoading = true;
        //     let params = {
        //         page: 1,
        //         pageSize: 10,
        //         serverUrl: window.location.hostname,
        //         cmid: cmid
        //     };
        //     return http.get(urlhead+'/ec/articleManager/v1/list',params)
        //         .then(function(response){
        //             let data = response.data;
        //             switch (data.items[0].cmid){
        //                 case 2:
        //                     state.items1 = data.items;
        //                     sessionStorage.setItem('items1',JSON.stringify(data.items));
        //                     break;
        //                 case 3:
        //                     state.items2 = data.items;
        //                     sessionStorage.setItem('items2',JSON.stringify(data.items));
        //                     break;
        //                 case 4:
        //                     state.items3 = data.items;
        //                     sessionStorage.setItem('items3',JSON.stringify(data.items));
        //                     break;
        //                 case 5:
        //                     state.items4 = data.items;
        //                     sessionStorage.setItem('items4',JSON.stringify(data.items));
        //                     break;
        //                 default:
        //                     state.items5 = data.items;

        //                     state.menuFlag1 = data.items[0].amid;
        //                     console.log(state.menuFlag1);
        //                     sessionStorage.setItem('menuFlag1', data.items[0].amid);
        //                     sessionStorage.setItem('items5',JSON.stringify(data.items));
        //                     break;
        //             }

        //         });
        //         // .finally(function(){
        //         //     setTime(state);
        //         // });
        // },

        /*4.31	首页底部链接跳转页面数据接口*/
        // rqBtArticle(context,amid){
        //     let state = context.state;
        //     // state.isLoading = true;

        //     let params = {
        //         usid:sessionStorage.getItem('userName'),
        //         amid:amid
        //     };
        //     return http.get(urlhead+'/ec/home/v1/getGLContent',params)
        //         .then(function(response){
        //             let data = response.data;
        //             state.article = data.article;

        //             sessionStorage.setItem('article', JSON.stringify(data.article));
        //         });
        //         // .finally(function(){
        //         //     setTime(state);
        //         // });
        // },

        /*4.33	找回密码校验验证码接口*/
        retrievePwdByMobile(context,{paramsData,params}){
            return http.post2(urlhead +'/ec/custom/retrievePwdByMobile',paramsData,params);
        },

        /*4.34	找回密码提交接口*/
        submitPasswordSave(context,{paramsData,params}){
            return http.put2(urlhead +'/ec/custom/submitPasswordSave',paramsData,params);
        },

        /*4.35	找回密码校验手机号码接口*/
        checkMobile(context,{paramsData,params}){
            return http.post2(urlhead +'/ec/custom/checkMobile',paramsData,params);
        }
    }
};

export default home;
