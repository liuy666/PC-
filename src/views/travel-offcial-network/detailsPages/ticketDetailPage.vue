<template>
    <div class="ticket-detail-page common-second">
        <div class="breadcrumb width-1200">
            <Breadcrumb separator="＞">
                <BreadcrumbItem :to="{name: 'ticket'}">景点门票</BreadcrumbItem>
                <!--<BreadcrumbItem to="/">四川省景点门票</BreadcrumbItem>-->
                <!--<BreadcrumbItem to="/">广元景点门票</BreadcrumbItem>-->
                <BreadcrumbItem v-html="provider.szscenicname"></BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="width-1200 main-container">
            <div class="position-rel">
                <h2 v-html="provider.szscenicname" style="display: inline-block; vertical-align: middle;margin-right: 16px">
                </h2>
                <div class="A-grade SHCN-N" style="display: inline-block; vertical-align: middle">{{ provider.strgrade }}</div>
                <hr>
                <div class="first-main-container clearAll">
                    <div>
                        <!--<div class="z-ht" v-html="showimg"></div>-->
                        <!--showImg.upadder||-->
                        <!--showImg.upname||-->
                        <img :src="showimg.upadder" alt="图片加载失败">
                        <div class="z-div-1 z-ovhid">
                            <div class="z-div-1 j-div">
                                <img v-for="item in imgList" :src="item.upadder" alt="图片加载失败" :key="item.upadder" @click="changeShowimg(item)">
                                <!--<img>-->
                                <!--<img>-->
                                <!--<img>-->
                            </div>
                        </div>
                        <Button type="primary" @click="moveDown" class="mr-15 z-bdr1 btn-up"></Button>
                        <Button type="primary" @click="moveUp" class="mr-15 z-bdr1 btn-down"></Button>
                    </div>
                    <div class="first-right-container">
                        <div class="clearAll">
                            <span>
                                景区地址：
                            </span>
                            <div>
                                <p v-html="provider.szaddress"></p>
                                <!--<div class="maolink">-->
                                    <!--<Anchor show-ink>-->
                                        <!--<AnchorLink href="#map" title="查看地图" show-ink="false"/>-->
                                    <!--</Anchor>-->
                                <!--</div>-->

                                <p class="look-map"><span class="SHCN-N"><a href="javascript:void(0)" @click="goAnchor('#map')">查看地图</a></span></p>
                            </div>
                        </div>
                        <div class="clearAll">
                            <span>
                                营业时间：
                            </span>
                            <div>
                                <p v-html="provider.businesshours"></p>
                                <!--<p>8:00-18:00（旺季4月1日至11月19日）。</p>-->
                            </div>
                        </div>
                        <!--<div class="clearAll">-->
                            <!--<span>-->
                                <!--服务保障：-->
                            <!--</span>-->
                            <!--<div>-->
                                <!--<p>-->
                                    <!--入园保障-->
                                <!--</p>-->
                            <!--</div>-->
                        <!--</div>-->
                        <div class="right-footer SHCN-M">
                            <Button type="primary" @click="reserve">立即预订</Button>
                            <span class="SHCN-B" v-html="plistTotalPrice+'元'"></span>
                            <span>￥</span>
                            <span>共计:</span>
                        </div>
                    </div>
                </div>
                <div>
                    <hr>
                    <h2>
                        门票
                    </h2>
                    <div class="margin-top-20">
                        <Row >
                            <Col span="12">
                                <label class="ticket-pre-info">游玩日期：</label>
                                <DatePicker
                                        :options="options1"
                                        :editable="false"
                                        :clearable="false"
                                        placeholder="请选择游玩日期"
                                        style="width: 200px"
                                        v-model="dateTime"
                                        format="yyyy-MM-dd"
                                        @on-change="getProviderIndex({id:id,dateTime:dateTime})" >
                                </DatePicker>
                            </Col>
                        </Row>
                    </div>
                    <hr>
                    <!--ticketData1-->
                    <Table class="ticket-table" width="1148"  :columns="ticketColumn1" :data="plist"></Table>

                </div>
            </div>



            <!--<img class="art-img">-->
            <div class="bf-info-container-div"><hr class="bf-info-container"></div>

            <div>
                <!--theme="primary"-->
                <Menu mode="horizontal" active-name="#l1" @on-select="goAnchor">
                    <MenuItem name="#l1" >
                        预订须知
                    </MenuItem>
                    <MenuItem name="#l2">
                        景点介绍
                    </MenuItem>
                    <MenuItem name="#l3">
                        交通指南
                    </MenuItem>
                </Menu>

                <div class="info-container">
                    <a name="introduce"></a>
                    <h2 id="l1">预订须知</h2>
                    <!--<h3>免票政策</h3>-->
                    <!--<p>a. 1米（含）以下的儿童免票。</p>-->
                    <!--<p>b. 现役军人、军残证、离休干部、烈属证（凭有限制证件享受观光B票）免票。</p>-->
                    <!--<p>* 以上信息仅供参考，具体以景区当日信息为准。</p>-->
                    <!--<p>* 以上政策仅免大门票。</p>-->
                    <!--<p>* 如有其他消费项目，请按规定另行付费。</p>-->
                    <!--<h3>免票政策</h3>-->
                    <!--<p>景区规定统一售价，暂无其他优惠政策。.</p>-->
                    <div v-html="provider.strbookdescription">

                    </div>
                    <hr>
                    <h2 id="l2">景点介绍</h2>
                    <!--<h3>曾家山简介</h3>-->
                    <!--<div class="scenic-spots-div">-->
                        <!--<p>曾家山景区位于秦巴南麓、川陕结合部的广元市朝天区，辖6乡1镇，70000人，曾家山景区平均海拔是1600米，总面积是586平方公里，森林覆-->
                            <!--盖率74%，地质景观独特，享有“溶洞王国”、“石林洞乡”之美称。年均气温12℃，夏季平均气温23℃，冬季平均气温零下6℃，是春踏青、夏避暑、秋观红叶、冬赏雪的旅游休闲胜地。</p>-->
                        <!--<p>景区由“五大园区”（即：森林景观园、农业观光园、民俗风情园、地质博览园、生态养生园）、“八大景点”（即：川洞庵、石笋坪、汉王洞、吊滩河、麻柳峡、观音寺、鸳鸯池、落水洞）和“100公里生态新村长廊”构成。</p>-->
                    <!--</div>-->
                    <!--<h3>温馨提示：</h3>-->
                    <!--<div class="remin-tips">-->
                        <!--<p>1.在不能满足设备安全运行的恶劣天气，无法抗拒的自然灾害情况下（如雷电、雨雪、冰雹、大雾、暴雨、台风等），景区部分项目将临时关闭或部分关闭，表演会取消或部分取消。</p>-->
                        <!--<p>2.严禁倒票，一经发现，相关电子门票作废，入园现场将不予承认，易旅宝将不予退费并将相关账号、手机号列入黑名单。请广大用户选择易旅宝官方网站或官方合作渠道购买，维护自身权益不被侵犯。</p>-->
                           <!--<p> 3.景区活动内容如有变动，以当日公告为准。景区所有项目均会定期进行日检、周检、月检和年度检修，相关检修工作可能会造成部分项目运行时间的延迟或暂停对游客开放，详情以景区现场公告为准。</p>-->
                            <!--<p>4.为保障您的出游安全，易旅宝建议您订购在线支付产品时选购相关旅游保险。</p>-->
                    <!--</div>-->
                    <div v-html="provider.note">

                    </div>
                    <hr>
                    <a id="map"></a>
                    <h2 id="l3">交通指南</h2>
                    <!--<img class="traffic-img">-->

                    <div class="amap-page-container traffic-img">

                        <!--amap-manager="amapManager"-->

                        <el-amap ref="map" vid="amapDemo"  :center="provider.longitude?provider.longitude.split(','):'23.03,-113.75'" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
                            <!--<el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker>-->
                            <el-amap-marker v-for="(marker, index) in markers"
                                            :key="index"
                                            :position="provider.longitude?provider.longitude.split(','):'23.03,-113.75'"
                                            :events="marker.events" :visible="marker.visible"
                                            :draggable="marker.draggable"
                                            :vid="index"></el-amap-marker>
                            <!--<el-amap-marker v-for="(marker, index) in markers" :key="index" :position="provider.longitude?provider.longitude.split(','):'23.03,-113.75'" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>-->
                        </el-amap>
                        <!--<div class="toolbar">-->
                            <!--position: [{{ lng }}, {{ lat }}] address: {{ address }}-->
                        <!--</div>-->

                        <!--<div class="toolbar">-->
                            <!--<button @click="getMap()">get map</button>-->
                        <!--</div>-->
                    </div>
                    <div class="traffic-div clearAll" v-html="provider.szlocation">
                        <!--<h3>周边交通：</h3>-->
                        <!--<div>-->
                            <!--<p>酒店位于甘孜州美丽的海螺沟景区内，邻近贡嘎神汤温泉，位置优越，周边环境优美。</p>-->
                            <!--<p>距离贡嘎神汤温泉约1公里；</p>-->
                            <!--<p>距离磨西镇车站约6公里；</p>-->
                            <!--<p>距离康定机场约87公里。</p>-->
                        <!--</div>-->
                    </div>
                </div>
            </div>

        </div>

        <div v-html="reserveObj" v-show="false"></div>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    import {mapState,mapActions,mapMutations} from 'vuex';
    export default {
        name: "ticketDetailPage",
        props: ['id'],
        data: function () {
            let that = this;
            return {
                isZero:true,
                spinShow: false,
                ticketColumn1: [
                    {
                        title: '票类',
                        key: 'strbycategorytype',
                        align: 'center',
                    },
                    {
                        title: '产品名称',
                        key: 'sztickettypename',
                        align: 'center',
                    },
                    {
                        title: '选择时间段',
                        // key:'c',
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.int3 === 1) {
                                return h('div', [
                                    h('Select',
                                        {
                                            props: {
                                                value: params.row.id + ';' + params.row.currstock,
                                                'label-in-value': true
                                            },
                                            on: {
                                                'on-change': (event) => {
                                                    // console.log(event);
                                                    that.ticketDetailSelect({
                                                        id: params.row.icrowdkindid,
                                                        ID: params.row.itickettypeid,
                                                        label: event.label,
                                                        value: event.value
                                                    });
                                                }
                                            },
                                        }, params.row.timeList.map(item => {
                                            // const date = item.date.split('-')[1];
                                            // const date1 = this.dateTime.format('hh:mm');
                                            // let disabled = false;
                                            // if (this.toTime(date1) > this.toTime(date)) {
                                            //     disabled = true
                                            // }
                                            return h('Option', {
                                                props: {
                                                    label: item.date,
                                                    value: item.id + ';' + item.currstock,
                                                    // disabled: disabled
                                                }
                                            })
                                        })),
                                    h('div', [
                                        '余票：' + (+params.row.currstock === -1 ? '充足': params.row.currstock)
                                    ])
                                ])
                            } else {
                                return h('div', [
                                    '景区营业时间内全天有效'
                                ])
                            }

                        },

                    },
                    {
                        title: '票种',
                        // key:'szcrowdkindname',
                        align: 'center',
                        render: function (h, params) {
                            return h('div', [
                                h('span', params.row.szcrowdkindname),
                                h('span', params.row.isrealname === 1 ? '(实名制)' : '')

                            ])
                        },
                        className: 'choose-time-column',

                    },
                    {
                        title: '挂牌价',
                        key: 'listingprice',
                        align: 'center',
                        render: (h, params) => {
                            return h('span',`￥${params.row.listingprice}元`)
                        }
                    },
                    {
                        title: '实际售价',
                        key: 'mactualsaleprice',
                        align: 'center',
                        className: 'demo-table-price-column',
                        render: (h, params) => {
                            return h('span',`￥${params.row.mactualsaleprice ? params.row.mactualsaleprice : 0}元`)
                        }
                    },
                    {
                        title: '票数',
                        // key:'aaa',
                        align: 'center',
                        render: function (h, params) {
                            return h('div', [
                                h('Button', {
                                    class: {
                                        'btn3': true,
                                        'bg1': params.row.number > 0 ? false : true
                                    },
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        // icon: 'minus-round',
                                        icon:'md-remove',
                                    },
                                    style: {
                                        marginRight: '11px',
                                        lineHeight: '11px',
                                        borderRadius: '2px 0 0 2px'
                                    },
                                    on: {
                                        click: function () {
                                            if (params.row.number > 0) {
                                                // params.row.number--;
                                                // that.reserveObj[params.row.itickettypeid] --;
                                                that.ticketDetailReduce({
                                                    id: params.row.icrowdkindid,
                                                    ID: params.row.itickettypeid
                                                });
                                            }
                                        }
                                    }
                                }),
                                h('Input', {
                                    class: {
                                        'inpt1': true,
                                    },
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                        // readonly: true,
                                        value: params.row.number,
                                        // model:this.number,
                                        number: true,
                                        // maxlength:2,
                                        // 'v-model':this.number
                                    },
                                    on: {
                                        'on-blur': function (event) {
                                            console.log(that.ticketData1)
                                            // params.row.number = val;
                                            // that.reserveObj[params.row.itickettypeid] = val;
                                            that.ticketDetailInput({
                                                id: params.row.icrowdkindid,
                                                ID: params.row.itickettypeid,
                                                value: parseInt(event.target.value)
                                            });
                                        }
                                    }
                                }),
                                h('Button', {
                                    class: {
                                        'btn3': true,
                                    },
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        // icon: 'plus-round',
                                        icon:'md-add',
                                    },
                                    style: {
                                        marginLeft: '11px',
                                        lineHeight: '11px',
                                        borderRadius: '0 2px 2px 0'
                                    },
                                    on: {
                                        click: function () {
                                            // if(params.row.currstock == -1){
                                            //     params.row.number++;
                                            //     that.reserveObj[params.row.itickettypeid] ++;
                                            // }else{
                                            //     if(params.row.number < params.row.currstock){
                                            //         params.row.number++;
                                            //         that.reserveObj[params.row.itickettypeid] ++;
                                            //     }
                                            // }
                                            that.ticketDetailAdd({
                                                id: params.row.icrowdkindid,
                                                ID: params.row.itickettypeid
                                            });
                                            // params.row.number++;
                                            // that.reserveObj[params.row.itickettypeid] ++;
                                        }
                                    }
                                })

                            ])
                        }
                    }
                ],
                ticketData1: [
                    {a: '成人票', b: '曾家山门票成人票【门票】', c: '当天23:59前', d: '60元', e: '在线支付', int3: 1},
                    {a: '成人票', b: '曾家山门票成人票【门票】', c: '当天23:59前', d: '60元', e: '在线支付', int3: 2},
                    {a: '成人票', b: '曾家山门票成人票【门票】', c: '当天23:59前', d: '60元', e: '在线支付', int3: 2},
                ],
                dateTime: new Date(),
                totalNum: 0,
                flag: 0,
                // amapManager,
                zoom: 12,
                center: [121.5273285, 31.21515044],
                events: {
                    init: (o) => {
                        // console.log(o.getCenter())
                        // console.log(this.$refs.map.$$getInstance())
                        // let { lng, lat } = o.lnglat;
                        // self.lng = lng;
                        // self.lat = lat;
                        o.getCity(result => {
                            console.log(result)
                        })
                    },
                    'moveend': () => {
                    },
                    'zoomchange': () => {
                    },
                    'click': (e) => {
                        // alert('map clicked');
                    }
                },
                plugin: ['ToolBar', {
                    pName: 'MapType',
                    defaultType: 0,
                    events: {
                        init(o) {
                            console.log(o);
                        }
                    }
                }],
                markers: [
                    {
                        position: [121.5273285, 31.21515044],
                        events: {
                            click: () => {
                                // alert('click marker');
                            },
                            dragend: (e) => {
                                console.log('---event---: dragend')
                                this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                            }
                        },
                        visible: true,
                        draggable: false,
                        template: '<span>1</span>',
                    }
                ],
            }
        },
        mounted() {
            // this.$store.dispatch('getProviderIndex',{id:this.id,dateTime:this.dateTime})
            // console.log(this);
            this.getProviderIndex({id: this.id, dateTime: this.dateTime});
            console.log('mounted');

        },
        computed:{
            ...mapState({
                plist: state => state.home.plistObj.plist,
                plistTotalPrice: state => state.home.plistObj.totalPrice,
                reserveObj: state => {
                    let obj = {};
                    // console.log(222);
                    console.log(state.home.plistObj.plist);
                    if (state.home.plistObj.plist) {
                        state.home.plistObj.plist.forEach(function (value) {
                            // console.log(value);
                            // console.log(value.itickettypeid);
                            let a = value.itickettypeid + '-' + value.icrowdkindid;
                            console.log(a);
                            obj[a] = value.number;
                            // console.log(obj[value.itickettypeid]);
                        });

                        console.log(obj);
                        return obj;
                    }


                },
                maxFlag: state => state.home.plistObj.imgList.length - 3,
                imgList: state => state.home.plistObj.imgList,
                showimg: state => state.home.showimg,
                provider: state => state.home.provider,
                imaxdata: state => state.home.provider.imaxdata
            }),
            options1: function(){
                let that = this;

                return{
                    disabledDate (date) {
                        let imaxdata = that.imaxdata || 0;
                        if(date.valueOf() < Date.now() - 86400000||date.valueOf() > Date.now() + imaxdata*24*60*60*1000){
                            return true;
                        }
                    }
                }
            }
        },
        methods:{
            reserve () {
                let num = 0;
                let newArr = [];
                let status = 1;
                Object.values(this.reserveObj).forEach(function(value){
                    if (!value) {
                        newArr.push(value)
                    } else {
                        num = value
                    }
                });

                if(num === 0){
                    this.$Modal.info({
                        title: '温馨提示',
                        content: '请选择预定一种票类'
                    });
                    return
                }

                if (newArr.length < Object.values(this.reserveObj).length -1) {
                    this.$Modal.info({
                        title: '温馨提示',
                        content: '只能预定一种票类'
                    });
                    return
                }

                if(!this.dateTime){
                    this.$Modal.info({
                        title: '温馨提示',
                        content: '请选择游玩日期'
                    });
                    return
                }

                sessionStorage.setItem('ys-num',num);

                let playtime = new Date(this.dateTime).format('yyyy-MM-dd');
                let orders = [];
                let object = {};
                let arr = {};//判断实名制与非实名制;
                let that = this;
                Object.keys(this.reserveObj).forEach(function(data){
                    that.plist.forEach(function(obj){
                        if(data === obj.itickettypeid+'-'+obj.icrowdkindid && that.reserveObj[data]!=0){
                           arr[obj.isrealname] = true;
                            if(obj.int3 === 1){
                                if(that.toTime(that.dateTime.format('hh:mm')) > that.toTime(obj.enddate)) {
                                    that.$req.showMessageModal(that, '该预约时段已过，请重新选择', 1);
                                    status = 0;
                                    return
                                }
                                object = {
                                    playtime: playtime,
                                    icrowdkindid: obj.icrowdkindid,
                                    itickettypeid: obj.itickettypeid,
                                    icrowdkindpriceid: obj.icrowdkindpriceid,
                                    iscenicid: obj.iscenicid,
                                    num: that.reserveObj[data],
                                    endtime: obj.enddate,
                                    starttime: obj.startdate,
                                    timeid: obj.id
                                };
                            }else{
                                object = {
                                    playtime: playtime,
                                    icrowdkindid: obj.icrowdkindid,
                                    icrowdkindpriceid: obj.icrowdkindpriceid,
                                    itickettypeid: obj.itickettypeid,
                                    iscenicid: obj.iscenicid,
                                    num: that.reserveObj[data]
                                };
                            }
                            orders.push(object);
                                object = {};
                        }
                    })
                });

                if(!status) return;

                console.log(Object.keys(arr).length);
                if(Object.keys(arr).length === 2){
                    this.$Modal.info({
                        title: '温馨提示',
                        content: '实名制与非实名制产品不可同时预定'
                    });
                    return
                }

                console.log(Object.keys(arr)[0]);
                if(Object.keys(arr)[0] === '1'){
                    sessionStorage.setItem('firstStepShow','1');
                }else{
                    sessionStorage.setItem('firstStepShow','0');
                }

                let params = orders,
                    paramsData = {
                    playtime:  playtime,
                    iscenicid: parseInt(this.id),
                    usid: sessionStorage.getItem('userName')||''
                };


                // this.$api.post(this.baseURL +'/ec/book/v1/destine',paramsData,params)
                //     .then(function(response){
                //         console.log(response);
                //         if(response.code === 200){
                //             let arr = response.data;
                //
                //             sessionStorage.setItem('order',JSON.stringify(arr));
                //             that.$router.push({name:'firstStepOfTicketPay'});
                //         }
                //     })
                // this.$store.dispatch('destine',{paramsData:paramsData,params:params});

                this.spinShow = true;
                this.destine({paramsData:paramsData,params:params,that:this});

            },
            // getProviderIndex: function(){
            //     this.$store.dispatch('getProviderIndex',{id:this.id,dateTime:this.dateTime})
            //
            // },
            moveDown: function(){
                if(this.flag <=0){
                    return;
                }
                this.flag--;
                $('.j-div').animate({top:'+=104px'})
            },
            moveUp: function(){
                if(this.flag >=this.maxFlag){
                    return;
                }
                this.flag++;
                $('.j-div').animate({top:'-=104px'})
            },
            goAnchor(selector) {
                console.log(selector);
                let anchor = this.$el.querySelector(selector);
                document.body.scrollTop = anchor.offsetTop;
                document.documentElement.scrollTop = anchor.offsetTop;
            },
            toTime(time) {
                let timeArr = time.split(':');
                return parseInt(timeArr[0] * 60) + parseInt(timeArr[1])
            },
            ...mapActions([
                'getProviderIndex',
                'destine'
            ]),
            ...mapMutations([
                'ticketDetailAdd',
                'ticketDetailReduce',
                'ticketDetailInput',
                'ticketDetailSelect',
                'changeShowimg'
            ])
        },
        created(){
            this.$store.commit('setMenuIndex','2');
        },
    }
</script>

<style lang="less">
    .ticket-detail-page{
        background: #F5F8FB;
        padding-bottom: 20px;
        .main-container{
            >div{
                padding: 26px 26px 20px;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                margin-bottom: 20px;
                background: #FFF;
            }
            .first-main-container{
                height: 349px;
                >div{
                    float: left;
                    &:nth-of-type(1){
                        width: 698px;
                        height: 349px;
                        margin-right: 46px;
                    }
                    &:nth-of-type(2){
                        width: 359px;
                        height: 349px;
                        padding-top: 40px;
                    }
                    div.z-div-1{
                        float: left;
                        width: 201px;
                        height: 300px;
                        margin-bottom: 13px;
                        position: relative;
                        >img{
                            float: left;
                            width: 201px;
                            height: 91px;
                            margin-bottom: 13px;
                            cursor: pointer;
                            /*&:nth-child(1){*/
                            /*background: #ccc;*/
                        /*}*/
                            /*&:nth-child(2){*/
                                /*background: red;*/
                            /*}*/
                            /*&:nth-child(3){*/
                                /*background: yellow;*/
                            /*}*/
                            /*&:nth-child(4){*/
                                /*background: black;*/
                            /*}*/
                        }
                    }
                    >img{
                        float: left;
                        width: 483px;
                        height: 349px;
                        margin: 0 13px 0 0;
                    }
                    .ivu-btn-primary{
                        width: 93px;
                        height: 36px;
                        border-radius: 0;
                        -webkit-border-radius: 0;
                        -moz-border-radius: 0;
                        &:hover{
                            background: #306BEA
                        }
                    }
                }
            }
            .first-right-container{
                position: relative;
                >div{
                    margin-bottom: 20px;
                    >span{
                        display: inline-block;
                        width: 70px;
                        font-size: 14px;
                        color: #5E5E60;
                        float: left;
                    }
                    >div{
                        float: left;
                        >p{
                            font-size: 14px;
                            color: #191919;
                            font-weight: 700;
                            >span{
                                font-size: 12px;
                                color: #5E5E60;
                                font-weight: 500;
                                margin-left: 13px;
                            }
                        }
                    }
                }
                .right-footer{
                    z-index: 999;
                    width: 359px;
                    height: 40px;
                    position: absolute;
                    bottom: -159px;
                    right: -42.5px;
                    *{
                        float: right
                    }
                    .ivu-btn-primary{
                        width: 128px;
                        height: 40px;
                        background: #4B7FF0;
                        border-radius: 2px;
                        -webkit-border-radius: 2px;
                        -moz-border-radius: 2px;
                        >span {
                        float: initial
                        }
                    }
                    >span{
                        width: auto;
                        height: 33px;
                        line-height: 51px;
                        margin-right: 8px;
                        &:nth-of-type(1){
                            font-size: 36px;
                            color: #FF7F0D;
                            line-height: 37.5px;
                            margin-right: 21px
                        }
                        &:nth-of-type(2){
                            font-size: 20px;
                            color: #FF8314;
                        }
                        &:nth-of-type(3){
                            font-size: 14px;
                            color: #191919;
                        }
                    }
                }
            }
        }
        h2{
            font-size: 16px;
            color: #080C17;
            font-family: SourceHanSansCN-Medium;
        }
        h3{
            font-size: 14px;
            color: #191919;
            margin-top: 32px;
            margin-bottom: 16px;
            font-family: SourceHanSansCN-Medium;
        }
        hr{
            margin: 34px 0;
        }
        .art-img{
            width: 100%;
            height: 135px;
            background: #5E5E60;
            margin-bottom: 20px;
        }
        .bf-info-container{
            &-div{
                position: relative;
                padding: 0 !important;
                margin-bottom: 0 !important;
            }
            position: absolute;
            top: 65px;
            margin: 0;
            width: 100%;
            background: #4B7FF0;
            height: 2px;
            border: none;
            z-index: 901
        }
        .info-container{
            padding: 32px 0;
            h2{
                margin-bottom: 32px;
            }
            p{
                font-size: 14px;
                color: #5E5E60;
                line-height: 20px;
                margin-bottom: 4px;
            }
            .scenic-spots-div{
                p{
                    margin-bottom: 36px;
                    &:last-child{
                        margin-bottom: 0;
                    }
                }
            }
            .remin-tips{
                p{
                    margin-bottom: 20px;
                }
            }
        }
        .traffic-img{
            width: 100%;
            height: 460px;
            margin: 32px 0;
        }
        .traffic-div{
            >*{
                float:left;
                margin-top: 0;
                margin-right: 16px;
            }

            p{
                margin-bottom: 0;
            }
        }
    }
    .A-grade{
        background: #F5A623;
        /*width: 70px;*/
        padding: 0 4px;
        height: 17px;
        font-size: 12px;
        color: #FFFFFF;
        text-align: center;
        line-height: 17px;
        /*position: absolute;*/
        left: 23.5%;
        top: 38px;
      }
    .ticket-pre-info{
        font-size: 14px;
        /*display: inline-block;*/
        color: #5E5E60;
        margin-right: 16px;
    }
    .maolink{
        margin: 10px 0 0 -18px;
    }
    /*.j-div{*/
        /*position:relative;*/
    /*}*/
    /*.amap-demo {*/
        /*height: 300px;*/
    /*}*/
    .look-map{
        background: url('../../../assets/icon_location10.png') no-repeat left center;
    }
</style>
