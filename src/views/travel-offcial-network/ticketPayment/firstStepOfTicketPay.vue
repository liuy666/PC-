<template>
    <div class="scope-first-container common-second" id="firstStep">
        <Form ref="totalInfo" :model="totalInfo" :label-width="96" label-position="left" :rules="ruleValidate">
                <div class="reservations-dialog" v-if="showReservations">
                    <p>
                        <span>费用包含：</span>
                        <span>曾家山景区门票1张</span>
                    </p>
                    <hr>
                    <p>
                        <span>入园须知：</span>
                        <span>入园时间：8:30～18:00（淡季：11月1日至次年4月30日）；8:00～18:30（旺季：5月1日至10月30日）</span>
                    </p>
                    <p>
                        <span>入园地点：</span>
                        <span>四川省广元市朝天区曾家镇曾家山景区</span>
                    </p>
                    <p class="enter-way">
                        <span>入园方式：</span>
                        <span>1.凭易旅宝订单短信中心的订单号</span>
                        <span>2.手机号码</span>
                        <span>3.姓名</span>
                        <span>4.辅助码换票入园</span>
                    </p>
                    <hr>
                    <p>
                        <span>取票时间：</span>
                        <span>8:30～18:00（淡季：11月1日至次年4月30日）；8:00～18:30（旺季：5月1日至10月30日）</span>
                    </p>
                    <p>
                        <span>取票地点：</span>
                        <span>四川省广元市朝天区曾家镇曾家山景区游客中心前台</span>
                    </p>
                    <hr>
                    <p>
                        <span class="important-tips">重要提示：</span>
                        <span>景区游客中心到景区大门口还有一段距离，为了保证游客正常入园至少提前30分钟取票！</span>
                    </p>
                </div>
                <h3>预订信息</h3>
                <!--<FormItem label="门票类型：">-->
                    <!--<p>曾家山景区门票电子票<span class="adult-ticket">(成人票)</span><span class="reservations" @click="toggleShowReservations">预订说明</span></p>-->
                <!--</FormItem>-->
                <!--<FormItem label="游玩日期：">-->
                    <!--<Row>-->
                        <!--<Col span="12">-->
                            <!--<DatePicker type="date" placeholder="请选择游玩日期" style="width: 200px"></DatePicker>-->
                        <!--</Col>-->
                    <!--</Row>-->
                <!--</FormItem>-->
                <!--<FormItem label="门票数量：" class="numInput-item">-->
                    <!--&lt;!&ndash;<Button type="primary" class="downBt">-</Button>&ndash;&gt;-->
                    <!--<Button type="primary" icon="md-remove"></Button>-->
                    <!--<Input v-model="totalInfo.num" style="width: 40px" class="numInput"/>-->
                    <!--&lt;!&ndash;<Button type="primary" class="upBt">+</Button>&ndash;&gt;-->
                    <!--<Button type="primary" icon="md-add"></Button>-->
                <!--</FormItem>-->
                <!--<FormItem label="费用明细：">-->
                    <!--<p>-->
                        <!--成人票1张x60-->
                    <!--</p>-->
                <!--</FormItem>-->

                <Table class="ticket-table" width="1073"  :columns="ticketColumn1" :data="destineArr.orderInfo"></Table>
                <FormItem label="订单总金额：" class="fr position-form-item" :label-width="96">
                    <p class="pay-money">
                        <span class="SHCN-M">￥</span>
                        <span class="SHCN-B" v-html="destineArr.xjcount.toFixed(2)+'元'"></span>
                    </p>
                </FormItem>
                <hr>
                <div v-if="firstStepShow === '1'">
                    <!--<div class="clearAll">-->
                        <!--<h3 class="fl">入园信息</h3>-->
                        <!--<div class="topContacts fr">+常用系人</div>-->
                    <!--</div>-->


                    <!--<div class="contacts">-->
                        <!--<Checkbox :value="item"  v-for="(item,index) in destineArr.lingpiaouserList"  v-if="index < maxShow" :disabled="writeNum === destineArr.numCount && !item.select" @on-change="checkGroupChange(item,index)" v-model="obj[index]">-->
                            <!--<span v-html="item.username"></span>-->
                        <!--</Checkbox>-->
                        <!--<span class="pointer-cursor" @click="checkMore">查看更多</span>-->
                    <!--</div>-->
                    <div>
                        <div class="margin-top-50" v-for="n in destineArr.numCount">
                            <h4 class="inline-block-h3" v-html="'添加入园人信息'+n"></h4>
                            <div v-if="isShowContact" class="topContacts" @click="choosePerson1(n)">常用联系人</div>
                            <FormItem label="姓名：" :prop="'name'+n">
                                <Input v-model="totalInfo['name'+n]" placeholder="请输入证件上的实际姓名"  style="width: 280px" />
                            </FormItem>
                            <FormItem label="身份证号：" :prop="'ID'+n">
                                <Input v-model="totalInfo['ID'+n]" placeholder="请正确输入证件号码，可用于检票"  style="width: 280px" @on-keyup="checkRequire(n)" :data-use="n"/>
                            </FormItem>
                            <!--<FormItem label="手机号码：" :prop="'phoneNumber'+n">-->
                            <!--<Input v-model="totalInfo['phoneNumber'+n]" placeholder="请输入手机号码，用于接收短信" clearable style="width: 280px" @on-change="checkRequire()"/>-->
                            <!--</FormItem>-->
                        </div>
                    </div>

                    <!--<div class="margin-top-50">-->
                    <!--<h4>添加入园人信息2</h4>-->
                    <!--<FormItem label="姓名：" prop="name2">-->
                    <!--<Input v-model="totalInfo.name2" placeholder="请输入证件上的实际姓名" clearable style="width: 280px" />-->
                    <!--</FormItem>-->
                    <!--<FormItem label="身份证号：" prop="ID2">-->
                    <!--<Input v-model="totalInfo.ID2" placeholder="请正确输入证件号码，可用于检票" clearable style="width: 280px" />-->
                    <!--</FormItem>-->
                    <!--<FormItem label="手机号码：" prop="phoneNumber2">-->
                    <!--<Input v-model="totalInfo.phoneNumber2" placeholder="请输入手机号码，用于接收短信" clearable style="width: 280px" />-->
                    <!--</FormItem>-->
                    <!--</div>-->

                    <hr>



                <!--<div class="clearAll">-->
                    <!--<h3 class="fl">入园信息</h3>-->
                    <!--&lt;!&ndash;<div class="topContacts fr">+常用联人</div>&ndash;&gt;-->
                <!--</div>-->



                <!--<div class="contacts">-->
                    <!--<Checkbox :value="item"  v-for="(item,index) in destineArr.lingpiaouserList"  v-if="index < maxShow" :disabled=" !item.iselect&&singleFlag" @on-change="checksingleChange(item)">-->
                        <!--<span v-html="item.username"></span>-->
                    <!--</Checkbox>-->
                    <!--<span class="pointer-cursor" @click="checkMore">查看更多</span>-->
                <!--</div>-->
                </div>
                <div class="clearAll">
                    <h3 class="inline-block-h3">领票人信息</h3>
                    <div v-if="isShowContact" class="topContacts" @click="choosePerson">常用联系人</div>
                    <!--<div class="topContacts fr" @click="modal1 = true">+常用联人</div>-->
                    <!--<Modal-->
                            <!--v-model="modal1"-->
                            <!--title="选择常用联人"-->
                            <!--width="526"-->
                            <!--class="modal-contacts"-->
                            <!--&gt;-->
                        <!--&lt;!&ndash;@on-ok="ok"&ndash;&gt;-->
                        <!--&lt;!&ndash;@on-cancel="cancel"&ndash;&gt;-->
                        <!--&lt;!&ndash;v-model="social"&ndash;&gt;-->
                        <!--<CheckboxGroup >-->
                        <!--<ul class="contacts-container">-->
                            <!--<li>-->
                                <!--<div class="en-index">A</div>-->
                                <!--<ul class="contacts-ul">-->
                                    <!--<li>-->
                                        <!--<div style="position: relative">-->
                                            <!--<Checkbox label="王力宏"></Checkbox>-->
                                            <!--<span class="contacts-edit">编辑</span>-->
                                            <!--<span class="contacts-delete">删除</span>-->
                                        <!--</div>-->
                                    <!--</li>-->

                                    <!--<li>-->
                                        <!--<div style="position: relative">-->
                                            <!--<Checkbox label="王力宏"></Checkbox>-->
                                            <!--<span class="contacts-edit">编辑</span>-->
                                            <!--<span class="contacts-delete">删除</span>-->
                                        <!--</div>-->
                                    <!--</li>-->

                                    <!--<li>-->
                                        <!--<div style="position: relative">-->
                                            <!--<Checkbox label="王力宏"></Checkbox>-->
                                            <!--<span class="contacts-edit">编辑</span>-->
                                            <!--<span class="contacts-delete">删除</span>-->
                                        <!--</div>-->
                                    <!--</li>-->

                                    <!--<li>-->
                                        <!--<div style="position: relative">-->
                                            <!--<Checkbox label="王力宏"></Checkbox>-->
                                            <!--<span class="contacts-edit">编辑</span>-->
                                            <!--<span class="contacts-delete">删除</span>-->
                                        <!--</div>-->
                                    <!--</li>-->

                                    <!--<li>-->
                                        <!--<div style="position: relative">-->
                                            <!--<Checkbox label="王力宏"></Checkbox>-->
                                            <!--<span class="contacts-edit">编辑</span>-->
                                            <!--<span class="contacts-delete">删除</span>-->
                                        <!--</div>-->
                                    <!--</li>-->
                                <!--</ul>-->
                            <!--</li>-->
                            <!--<li>-->
                                <!--<div class="en-index">B</div>-->
                                <!--<ul class="contacts-ul">-->
                                    <!--<li>-->
                                        <!--<div style="position: relative">-->
                                            <!--<Checkbox label="王力宏"></Checkbox>-->
                                            <!--<span class="contacts-edit">编辑</span>-->
                                            <!--<span class="contacts-delete">删除</span>-->
                                        <!--</div>-->
                                    <!--</li>-->

                                    <!--<li>-->
                                        <!--<div style="position: relative">-->
                                            <!--<Checkbox label="王力宏"></Checkbox>-->
                                            <!--<span class="contacts-edit">编辑</span>-->
                                            <!--<span class="contacts-delete">删除</span>-->
                                        <!--</div>-->
                                    <!--</li>-->

                                    <!--<li>-->
                                        <!--<div style="position: relative">-->
                                            <!--<Checkbox label="王力宏"></Checkbox>-->
                                            <!--<span class="contacts-edit">编辑</span>-->
                                            <!--<span class="contacts-delete">删除</span>-->
                                        <!--</div>-->
                                    <!--</li>-->

                                    <!--<li>-->
                                        <!--<div style="position: relative">-->
                                            <!--<Checkbox label="王力宏"></Checkbox>-->
                                            <!--<span class="contacts-edit">编辑</span>-->
                                            <!--<span class="contacts-delete">删除</span>-->
                                        <!--</div>-->
                                    <!--</li>-->

                                    <!--<li>-->
                                        <!--<div style="position: relative">-->
                                            <!--<Checkbox label="王力宏"></Checkbox>-->
                                            <!--<span class="contacts-edit">编辑</span>-->
                                            <!--<span class="contacts-delete">删除</span>-->
                                        <!--</div>-->
                                    <!--</li>-->
                                <!--</ul>-->
                            <!--</li>-->
                        <!--</ul>-->
                        <!--</CheckboxGroup>-->
                        <!--<p class="ticket-tips">提示：易旅宝用户一次最多只能购买5张票，常用联人最多勾选5人</p>-->
                    <!--</Modal>-->

                    <!--<Modal-->
                        <!--v-model="modal1"-->
                        <!--title="选择常用联人"-->
                        <!--width="526"-->
                        <!--class="modal-contacts"-->
                        <!--@on-ok="chooseLpr">-->
                        <!--<div class="contact-div">-->
                            <!--<RadioGroup class="mb1" v-model="lprxx">-->
                                <!--<Radio :label="item" v-for="item in lingpiaouserList" :key="item.seq">-->
                                    <!--<span class="span1" v-html="item.username"></span>-->
                                    <!--<span class="ml1">{{item.mobile|phoneFilters}}</span>-->
                                    <!--<span class="ml2" v-html="item.zjhm"></span>-->
                                <!--</Radio>-->
                                <!--&lt;!&ndash;<Radio label="banner">&ndash;&gt;-->
                                <!--&lt;!&ndash;<span>Banner</span>&ndash;&gt;-->
                                <!--&lt;!&ndash;</Radio>&ndash;&gt;-->
                            <!--</RadioGroup>-->
                        <!--</div>-->
                    <!--</Modal>-->


                    <Modal v-model="modal1" width="530" :closable="true" :mask-closable="false">
                        <p slot="header">选择常用联系人</p>
                        <div class="ivu-modal-body-div" style="height: 400px; overflow-y: auto">
                            <RadioGroup class="mb1" v-model="lprxx">
                                <Radio :label="JSON.stringify(item)" v-for="item in lingpiaouserList" :key="item.seq">
                                    <span class="span1" v-html="item.username"></span>
                                    <span class="ml1">{{item.mobile|phoneFilters}}</span>
                                    <span class="ml2" v-html="item.zjhm"></span>
                                </Radio>
                            </RadioGroup>
                        </div>
                        <div slot="footer" style="text-align: center">
                            <Button type="primary" class="op-btns ok-btn" @click="chooseLpr">确定</Button>
                            <Button class="op-btns cancel-btn" @click="hideModal('modal1')">取消</Button>
                        </div>
                    </Modal>

                    <Modal v-model="modal2" width="530" :closable="true" :mask-closable="false">
                        <p slot="header">选择常用联系人</p>
                        <div class="ivu-modal-body-div" style="height: 400px; overflow-y: auto">
                            <RadioGroup class="mb1" v-model="lprxx1">
                                <Radio :label="JSON.stringify(item)"
                                       v-for="item in lingpiaouserList"
                                       :key="item.seq"
                                       :disabled="(disableArr.indexOf(item.zjhm)!==-1)&&(item.zjhm!==ableObj[personNum])">
                                    <span class="span1" v-html="item.username"></span>
                                    <span class="ml1">{{ item.mobile|phoneFilters }}</span>
                                    <span class="ml2" v-html="item.zjhm"></span>
                                </Radio>
                            </RadioGroup>
                        </div>
                        <div slot="footer" style="text-align: center">
                            <Button type="primary" class="op-btns ok-btn" @click="chooseLpr1">确定</Button>
                            <Button class="op-btns cancel-btn" @click="hideModal('modal2')">取消</Button>
                        </div>
                    </Modal>


                    <!--<Modal v-model="modal2"-->
                            <!--title="选择常用联人"-->
                            <!--width="526"-->
                            <!--class="modal-contacts"-->
                            <!--@on-ok="chooseLpr1">-->
                        <!--<div class="contact-div">-->
                            <!--<RadioGroup class="mb1" v-model="lprxx1">-->
                                <!--<Radio :label="item.username" v-for="item in lingpiaouserList" :key="item.seq" :disabled="(disableArr.indexOf(item.zjhm)!==-1)&&(item.zjhm!==ableObj[personNum])">-->
                                    <!--<span class="span1" v-html="item.username"></span>-->
                                    <!--<span class="ml1">{{item.mobile|phoneFilters}}</span>-->
                                    <!--<span class="ml2" v-html="item.zjhm"></span>-->
                                <!--</Radio>-->
                                <!--&lt;!&ndash;<Radio label="banner">&ndash;&gt;-->
                                <!--&lt;!&ndash;<span>Banner</span>&ndash;&gt;-->
                                <!--&lt;!&ndash;</Radio>&ndash;&gt;-->
                            <!--</RadioGroup>-->
                        <!--</div>-->
                    <!--</Modal>-->

                </div>

                <FormItem label="姓名：" prop="namezj">
                    <Input v-model="totalInfo.namezj" placeholder="请输入证件上的实际姓名"  style="width: 280px" />
                </FormItem>
                <FormItem label="身份证号：" prop="IDzj">
                    <Input v-model="totalInfo.IDzj" placeholder="请正确输入证件号码，可用于检票"  style="width: 280px" />
                </FormItem>
                <FormItem label="手机号码：" prop="phoneNumberzj">
                    <Input v-model="totalInfo.phoneNumberzj" placeholder="请输入手机号码，用于接收短信"  style="width: 280px" />
                </FormItem>
                <FormItem label="验证码：" prop="verificationCode" v-if="!isShowContact">
                    <Input v-model="totalInfo.verificationCode" placeholder="请输入验证码"  style="width: 280px" />
                    <Button @click="getYzm()" :disabled="!/^1[34578]\d{9}$/.test(totalInfo.phoneNumberzj) || yzmObj.timelimit" v-html="yzmObj.tishi" class="margin-left-10"></Button>
                </FormItem>



                <FormItem class="clear-default-left" :label-width="labelWidth">
                    <Checkbox v-model="totalInfo.cyuser">设为常用联系人</Checkbox>
                </FormItem>

                <h3>备注信息</h3>
                <div class="position-rel">
                    <Input v-model="totalInfo.mask" type="textarea" :rows="2" placeholder="请留下您的备注信息,100字以内~" :maxlength="100"/>
                    <div class="zishu">   已输入<span>{{ totalInfo.mask.length }}</span>/100字</div>
                </div>
                <!-- <hr> -->
                <!--<FormItem label="" class="clear-default-left">-->
                    <!--<Checkbox v-model="totalInfo.readed">已阅读并同意易旅宝官网预订条款</Checkbox>-->
                <!--</FormItem>-->

                <FormItem class="clear-default-left bottom-item" :label-width="labelWidth">
                    <Button type="primary" class="submit-order SHCN-M" @click="handleSubmit('totalInfo',totalInfo)">提交订单</Button>
                </FormItem>
            </Form>

        <!--<Input v-focus="111" placeholder="111"/>-->
        <Modal
                v-model="modalLogin"
                title="请登录"
                width="600"
                class="modal-contacts login-modal"
        >
            <div class="login-div">
                <Form ref="totalInfo1" :model="totalInfo1" :label-width="96" label-position="left" :rules="ruleValidate1">
                    <FormItem label="手机号码：" prop="phoneNumbeLogin">
                        <Input v-model="totalInfo1.phoneNumbeLogin" placeholder="请输入您的手机号码"  style="width: 175px" />
                    </FormItem>
                    <FormItem label="密码：" prop="passwordLogin">
                        <Input v-model="totalInfo1.passwordLogin" placeholder="请输入您的账号密码"  style="width: 175px" type="password"/>
                    </FormItem>

                        <Checkbox v-model="isSelect" label="Eat" class="fl">记住密码</Checkbox>
                        <router-link target="_blank" to="/registration/touristPaswd" class="fr"><span class="hover_underline">忘记密码？</span></router-link>
                    <br>

                    <FormItem>
                        <Button @click="handleSubmit1('totalInfo1',totalInfo1)" type="primary" long class="op-btns ok-btn mg1" style="height: 40px">
                            <span style="font-size: 16px">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</span>
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </Modal>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapActions} from 'vuex'
    import {reduceObjInArr,distinct} from '../../../libs/common.js'
    export default {
        name: "firstStepOfTicketPay",
        data:function(){
            let that = this;
            return {
                spinShow: false,
                lprxx:null,
                lprxx1:null,
                totalInfo:{
                    people:[],
                    namezj:this.lingpiaouser?this.lingpiaouser.username:'',
                    IDzj:this.lingpiaouser?this.lingpiaouser.zjhm:'',
                    phoneNumberzj:this.lingpiaouser?this.lingpiaouser.mobile:'',
                    verificationCode:'',
                    mask:'',
                },
                totalInfo1:{
                    phoneNumbeLogin:'',
                    passwordLogin:''
                },
                showReservations:false,
                modal1:false,
                modal2:false,
                ticketColumn1:[
                    {
                        title: '票类',
                        key:'szcrowdkindname',
                        align:'center',
                    },
                    {
                        title: '产品名称',
                        key:'sztickettypename',
                        align:'center',
                        render:(h,params)=>{
                            return h('div',[
                                h('span',params.row.sztickettypename),
                                h('span',params.row.starttime?'('+params.row.starttime+'-'+params.row.endtime+')':'')
                            ])
                        }
                    },
                    {
                        title: '游玩日期',
                        align:'center',
                        render: (h, params) => {
                            return h('span', this.destineArr.playtime)
                        }
                    },
                    {
                        title: '单价',
                        key:'price',
                        align:'center',
                    },
                    {
                        title: '优惠',
                        // key:'d',
                        align:'center',
                        render:(h,params)=>{
                            return h('div','--')
                        }
                    },
                    {
                        title: '票数',
                        key:'aaa',
                        align:'center',
                        render: function(h,params){
                            return h('div',[
                                h('Button',{
                                    class:{
                                        'btn3': true,
                                        'bg1' : false
                                    },
                                    props:{
                                        type:'primary',
                                        size:'small',
                                        // icon:'minus-round',
                                        icon:'md-remove',
                                    },
                                    style:{
                                        marginRight: '11px',
                                        lineHeight: '11px',
                                        borderRadius: '2px 0 0 2px'
                                    },
                                    on: {
                                        click:function(){
                                          if (params.row.icrowdkindid > 0) {
                                            that.orderReduce(params.row.icrowdkindid);
                                          }
                                        }
                                    }
                                }),
                                h('Input',{
                                    class:{
                                        'inpt1': true,
                                    },
                                    props:{
                                        type:'text',
                                        size:'small',
                                        // readonly: true,
                                        value: params.row.num,
                                        // model:this.number,
                                        number: true,
                                        // maxlength:2,
                                        // 'v-model':this.number
                                    },
                                    on:{
                                        'on-blur': (event)=>{
                                            that.orderInput({id:params.row.icrowdkindid,value:parseInt(event.target.value)});
                                        }
                                    }
                                }),
                                h('Button',{
                                    class:{
                                        'btn3': true,
                                    },
                                    props:{
                                        type:'primary',
                                        size:'small',
                                        // icon:'plus-round',
                                        icon:'md-add',
                                    },
                                    style:{
                                        marginLeft: '11px',
                                        lineHeight: '11px',
                                        borderRadius: '0 2px 2px 0'
                                    },
                                    on: {
                                        click:()=>{
                                            that.orderAdd(params.row.icrowdkindid);
                                        }
                                    }
                                })

                            ])
                        }
                    },
                    {
                        title: '金额',
                        key:'xjmoney',
                        align:'center',
                        className: 'demo-table-price-column',
                        render: (h, params) => {
                            return h('span', `￥${params.row.xjmoney.toFixed(2)}元`)
                        }
                    },
                ],
                maxShow: 10,
                cyuser: this.lingpiaouser ? true : false,
                // readed: false,
                writeNum: 0,
                checkList:[],
                singleFlag:false,
                yzmObj:{
                    tishi:'获取验证码',
                    timelimit: false,
                },
                modalLogin:false,
                ruleValidate1:{
                    phoneNumbeLogin:[
                        { required: true, message: '手机号不能为空', trigger: 'blur' },
                        { required: true, message: '请输入正确的手机号码', pattern:/^1[34578]\d{9}$/,trigger: 'blur' }
                    ],
                    passwordLogin:[
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                },
                isSelect:false,
                personNum:'1',
                disableArr:[],
                ableObj:{},
                labelWidth: 1,
                phoneYzm: ''
            }
        },
        filters:{
            phoneFilters: function (val) {
                if(!val) return '';
                let value = val.toString();
                return value.substr(0,3)+' '+value.substr(3,4)+' '+value.substr(7);
            }
        },
        computed: {
            ...mapState({
                destineArr: state => {
                    if(state.home.destineArr.orderInfo){
                        return state.home.destineArr
                    }
                     else{
                        return JSON.parse(sessionStorage.getItem('destineArr'));
                    }
                },
                lingpiaouserList: state => state.home.lingpiaouserList || JSON.parse(sessionStorage.getItem('lingpiaouserList')),
                obj: state => {
                    let obj = {};
                    for(let i=state.home.destineArr.lingpiaouserList.length-1; i>=0;i--){
                        obj[i] = false;
                    }
                    return obj;
                },
                lingpiaouser: state => state.home.lingpiaouser|| sessionStorage.getItem('lingpiaouser'),

            }),
            firstStepShow: function(){
                return sessionStorage.getItem('firstStepShow');
            },
            ruleValidate () {
                const validatePhoneYzm = (rule, value, callback) => {
                    if(!value) {
                        callback(new Error('验证码不能为空'));
                    } else {
                        callback();
                    }
                };

                let tiaojian1 = { required: true, message: '请输入证件上的实际姓名', trigger: 'blur' },
                    tiaojian2 = { required: true, message: '请输入正确的证件号码', pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,trigger: 'blur' },
                    tiaojian3 = { required: true, message: '请输入正确的手机号码', pattern:/^(13[0-9]|14[5-9]|15[0-9]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/,trigger: 'blur' },
                    tiaojianyzm = { required: true, validator: validatePhoneYzm, trigger:'blur' };

                let obj = {};
                let arr1 = [];arr1[0] = tiaojian1;
                let arr2 = [];arr2[0] = tiaojian2;
                let arr3 = [];arr3[0] = tiaojian3;
                let arryzm = [];arryzm[0] = tiaojianyzm;

                for ( let i = this.destineArr.numCount; i > 0; i--) {
                    obj['name'+i] = arr1;
                    obj['ID'+i] = arr2;
                    // obj['phoneNumber'+i] = arr3;
                }
                obj['namezj'] = arr1;
                obj['IDzj'] = arr2;
                obj['phoneNumberzj'] = arr3;
                obj['verificationCode'] = arryzm;
                // return {
                //
                //
                //     name1:[
                //         {required: true, message: '请输入证件上的实际姓名', trigger: 'blur' }
                //     ],
                //     ID1:[
                //         {required: true, message: '请正确输入证件号码', pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,trigger: 'blur' }
                //     ],
                //     phoneNumber1:[
                //         {required: true, message: '请输入手机号码', pattern:/^1[34578]\d{9}$/,trigger: 'blur' }
                //     ]
                //     ,
                //
                //     name2:[
                //         {required: true, message: '请输入证件上的实际姓名', trigger: 'blur' }
                //     ],
                //     ID2:[
                //         {required: true, message: '请正确输入证件号码', pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,trigger: 'blur' }
                //     ],
                //     phoneNumber2:[
                //         {required: true, message: '请输入手机号码', pattern:/^1[34578]\d{9}$/,trigger: 'blur' }
                //     ]
                //     ,
                //
                //     namezj:[
                //         {required: true, message: '请输入证件上的实际姓名', trigger: 'blur' }
                //     ],
                //     IDzj:[
                //         {required: true, message: '请正确输入证件号码', pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,trigger: 'blur' }
                //     ],
                //     phoneNumberzj:[
                //         {required: true, message: '请输入手机号码',pattern:/^1[34578]\d{9}$/, trigger: 'blur' }
                //     ],
                //     verificationCode:[
                //         {required: true, message: '请输入验证码', trigger: 'blur' }
                //     ]
                // }
                // console.log(obj);
                return obj;
            },
            isShowContact () {
                return sessionStorage.getItem('userName')
            }
        },
        methods: {
            toggleShowReservations:function(){
                this.showReservations = !this.showReservations;
                // console.log(JSON.parse(this.obj));
            },
            chooseLpr () {
                // this.$refs['totalInfo'].resetFields();
                const lprxx = JSON.parse(this.lprxx);
                this.totalInfo['namezj'] = lprxx.username;
                this.totalInfo['phoneNumberzj'] = lprxx.mobile;
                this.totalInfo['IDzj'] = lprxx.zjhm;
                this.modal1 = false;
            },
            chooseLpr1 () {
                const lprxx1 = JSON.parse(this.lprxx1);
                if (this.personNum > 1) {
                    for (let i in this.totalInfo) {
                        if (this.totalInfo[i] === lprxx1.zjhm && i !== 'IDzj') {
                            this.$req.showMessageModal(this, '入园人身份证不能重复', 2);
                            return
                        }
                    }
                }
                this.totalInfo['name'+this.personNum] = lprxx1.username;
                this.totalInfo['phoneNumber'+this.personNum] = lprxx1.mobile;
                this.totalInfo['ID'+this.personNum] = lprxx1.zjhm;

                if(this.disableArr.indexOf(lprxx1.zjhm)===-1){
                    this.disableArr.push(lprxx1.zjhm);
                    // console.log(this.personNum);
                    // console.log(this.ableObj[this.personNum]);
                    // console.log(this.ableObj);
                    if(this.ableObj[this.personNum] !== -1){
                        let indexofnum = this.disableArr.indexOf(this.ableObj[this.personNum]);
                        // console.log(indexofnum);
                        this.disableArr.splice(indexofnum,1);
                        // console.log(this.disableArr);
                    }
                }
                // console.log(lprxx1.zjhm);
                this.ableObj[this.personNum] = lprxx1.zjhm;
                // console.log(this.ableObj[this.personNum]);
                this.modal2 = false
            },
            checkGroupChange:function(value,index){
                value.select = value.select ? false : true;
                this.obj[index] = value.select;
                if(value.select){
                    this.writeNum++;
                    this.checkList.push(value);

                    let n = this.writeNum;
                    value.n = n;
                    if(n <= this.destineArr.numCount){
                        this.totalInfo['name'+n] = value.username;
                        this.totalInfo['ID'+n] = value.zjhm;
                        // this.totalInfo['phoneNumber'+n] = value.mobile;
                    }
                }else{
                    this.writeNum--;
                    reduceObjInArr(this.checkList,value);
                    if(value.n){
                       let n = value.n;
                        this.totalInfo['name'+n] = '';
                        this.totalInfo['ID'+n] = '';
                        // this.totalInfo['phoneNumber'+n] = '';
                        value.n = '';
                    }
                }

            },
            checksingleChange(value){
                value.iselect = value.iselect ? false : true;
                this.singleFlag = !this.singleFlag;
                if(value.iselect){
                    this.totalInfo['namezj'] = value.username;
                    this.totalInfo['IDzj'] = value.zjhm;
                    this.totalInfo['phoneNumberzj'] = value.mobile;
                }else{
                    this.totalInfo['namezj'] = '';
                    this.totalInfo['IDzj'] = '';
                    this.totalInfo['phoneNumberzj'] = ''
                }
            },
            checkMore: function(){
                this.maxShow = 10000;
            },
            async handleSubmit (name,formData) {
                let that = this;
                let arr = [];
                for(let i=1; i<= that.destineArr.numCount; i++){     //判断入园人身份证是否重复
                    if (that.totalInfo['ID'+i]) {
                        if (arr.indexOf(that.totalInfo['ID'+i]) === -1) {
                            arr.push(that.totalInfo['ID'+i]);
                        } else {
                            this.$req.showMessageModal(this, '入园人身份证号不能重复', 1);
                            return
                        }
                    } else {
                        break
                    }
                }
                this.$refs[name].validate(async valid => {
                    if (valid) {
                        //散客直接从景区下单,领票人信息
                        let lpr = {
                            zjlb:'01',
                            ornote1:formData.namezj,
                            zjhm:formData.IDzj,
                            mobile:formData.phoneNumberzj,
                            url: window.location.hostname
                        };

                        let orderInfoObject = that.destineArr.orderInfo[0];

                        //散客从分销商下单,领票人信息
                        let lprInfoJson = [{
                            daoyou: formData.namezj,    //姓名
                            iscenicid: orderInfoObject.iscenicid,   //景区id
                            mobile: formData.phoneNumberzj,     //手机号
                            rzti: that.destineArr.playtime,     //游览日期
                            zjhm: formData.IDzj,    //证件号码
                            zjlb: '01'     //证件类别
                        }];

                        //散客从分销商下单,订单信息
                        let orderPojoJson = [{
                            basnum: 0,
                            freenum: 0,
                            icrowdkindid: '1',
                            icrowdkindpriceid: orderInfoObject.priceId,   //人群种类价格id
                            ipeoplenumrange: that.firstStepShow,      //是否实名制
                            iscenicid: orderInfoObject.iscenicid,     //景区id
                            isenough: true,
                            issale: 0,
                            itickettypeid: orderInfoObject.itickettypeid,     //产品id
                            // listingprice: this.rowData.listingprice,
                            // mactualsaleprice: this.rowData.mactualsaleprice,
                            distributePrice: orderInfoObject.price,     //分销商设置售价
                            monthpoint: '0',
                            numb: orderInfoObject.num,     //票数量
                            point: '0',
                            scheme: 0,
                            scnum: 0,
                            totalnum: orderInfoObject.num,    //票数量
                            yearpoint: '0',
                            usid: sessionStorage.getItem('fxsId')     //分销商店铺Id
                        }];

                        //如果是分时预约票，订单信息带上时间参数
                        if(orderInfoObject.timeid) {
                            orderPojoJson[0]['fstimeid'] = orderInfoObject.timeid;
                            orderPojoJson[0]['fsstarttime'] = orderInfoObject.starttime;
                            orderPojoJson[0]['fsendtime'] = orderInfoObject.endtime;
                        }

                        let distributeTouristsJson = [];
                        let orderInfo = [];
                        //入园信息（非实名制没有入园信息）
                        let realnames = [];
                        let object = {};
                        for(let i=1; i<= that.destineArr.numCount; i++){
                            object = {
                                itickettypeid: orderInfoObject.itickettypeid,
                                iscenicid: orderInfoObject.iscenicid,
                                icrowdkindid: orderInfoObject.icrowdkindid,
                                zjtp:'01',
                                cname:that.totalInfo['name'+i],
                                idcard:that.totalInfo['ID'+i]
                            };

                            //散客从景区下单，实名制票入园人信息
                            realnames.push(object);

                            //散客从分销商下单，实名制票入园人信息
                            distributeTouristsJson.push({
                                tourName: that.totalInfo['name'+i],     //入园人姓名
                                idNumber: that.totalInfo['ID'+i],     //入园人身份证
                                scenicId: orderInfoObject.iscenicid,    //景区id
                                icrowdkindPriceId: orderInfoObject.priceId      //商品价格id
                            });
                            object = {};
                        }
                        let realnameObj = JSON.stringify([{realnames: realnames}]);
                        let obj = {};
                        that.destineArr.orderInfo.forEach(function(data){
                            obj = {
                                playtime: that.destineArr.playtime,
                                icrowdkindid: data.icrowdkindid,
                                itickettypeid: data.itickettypeid,
                                priceId: orderInfoObject.priceId,
                                iscenicid: data.iscenicid,
                                num: data.num,
                                starttime: data.starttime || '',
                                endtime: data.endtime || '',
                                timeid: data.timeid || ''
                            };
                            orderInfo.push(obj);
                            obj = {};
                        });

                        let aaa = {
                            cyuser: formData.cyuser ? true :'',      //是否添加常用联系人
                            lpr: JSON.stringify(lpr),
                            note: formData.mask||'',
                            realnames: that.firstStepShow === '1' ? realnameObj : '',
                            url: window.location.hostname,
                        };

                        let urlParams = {
                            usid: sessionStorage.getItem('userName'),
                            lprInfoJson: JSON.stringify(lprInfoJson),
                            orderPojoJson: JSON.stringify(orderPojoJson),
                            orderChannel: 'PC',
                            channelName: orderInfoObject.szscenicname,
                            distributeTouristsJson: JSON.stringify(distributeTouristsJson),
                            cyuser: formData.cyuser ? 1 : 0      //是否添加常用联系人
                        };
                        if(sessionStorage.getItem('name')) {
                            if (sessionStorage.getItem('fxsId')) {
                                that.spinShow = true;
                                const res = await that.$api.post(this.lee + '/ec/distributorShop/v1/bookProductForDistributor',urlParams)
                                if (res) {
                                    this.$api.post(this.lee + '/ec/distributorShop/v1/saveOrderForDistributor', {
                                        usid: sessionStorage.getItem('userName'),
                                        fxid: sessionStorage.getItem('fxsId'),
                                        orderInfo: JSON.stringify({
                                            lprlist: lprInfoJson,
                                            list: orderPojoJson,
                                            tourist: distributeTouristsJson
                                        }),
                                        orderChannel: 'PC',
                                        channelName: orderInfoObject.szscenicname,
                                        remark: formData.mask||'',
                                        // returnUrl: `http://${ window.location.hostname }/#/my-account/MySalesOrder`
                                        returnUrl: 'http://' + window.location.hostname
                                    }).then(res => {
                                        if(res.code === 200) {
                                            window.location.replace(res.data.view);
                                        } else {
                                            that.spinShow = false;
                                        }
                                    })
                                } else {
                                    that.spinShow = false;
                                }
                            } else {
                                let paramsData = {
                                    ...aaa,
                                    usid: sessionStorage.getItem('userName'),
                                    returnUrl: `http://${window.location.hostname}/#/my-personalUser/MyOrderDetailsPage?usid=${sessionStorage.getItem('userName')}`,
                                    orderChannel: 'PC',
                                    channelName: orderInfoObject.szscenicname
                                };

                                that.spinShow = true;

                                that.saveOrderInfo({paramsData:paramsData,params:orderInfo})
                                    .then(function(response) {
                                        if(response.code === 200){
                                            window.location.replace(response.data.view);
                                        } else {
                                            that.spinShow = false;
                                        }
                                    })
                                    .catch(() => {
                                        that.spinShow = false;
                                    })
                            }
                        } else {
                            let paramsData = {
                                flag:'01',    //电商
                                url:window.location.hostname
                            };
                            let params = {
                                mobile: formData.phoneNumberzj,
                                zjlb: '01',
                                zjhm: formData.IDzj,
                                ornote1: formData.namezj,
                                ornote2: parseInt(formData.verificationCode),
                            };
                            that.spinShow = true;
                            that.checkLogin({paramsData:paramsData,params:params})
                                .then(function(response){
                                    if(response.code !== 200){
                                        that.$req.showMessageModal(that, '检查登录接口出错', 1);
                                        that.spinShow = false;
                                        return;
                                    }
                                    if(response.data.type === '01'){
                                        that.$Modal.error({
                                            title: '温馨提示',
                                            content: '验证码校验失败'
                                        });
                                        that.spinShow = false;
                                        return;
                                    }
                                    let paramsData = {};
                                    if(response.data.type==='03'){              //03:未注册的用户自动注册登录
                                        let custom = response.data.custom;
                                        sessionStorage.setItem('userName',custom.usid);  // 用户名
                                        sessionStorage.setItem('lgtp',custom.lgtp);  // 用户类别
                                        sessionStorage.setItem('ustp',custom.ustp);  // 分销商等级
                                        const tokenData = {
                                            username: custom.usid,
                                            password: custom.password,
                                            grant_type: "password",
                                            scope: "app",
                                            client_id: "android",
                                            client_secret: "android"
                                        };
                                        that.$http.post(that.baseURL + '/uaa/oauth/token', that.QS.stringify(tokenData))
                                            .then(async res => {
                                                if(res.status === 200) {
                                                    sessionStorage.setItem('name',res.data.access_token);  // 存储 token
                                                    if(sessionStorage.getItem('fxsId')) {
                                                        const res = await that.$api.post(this.lee + '/ec/distribute/v1/bookProductForDistributor',urlParams)
                                                        if(res) {
                                                            this.$api.post(this.lee + '/ec/distributorShop/v1/saveOrderForDistributor', {
                                                                usid: response.data.custom.usid,
                                                                fxid: sessionStorage.getItem('fxsId'),
                                                                orderInfo: JSON.stringify({
                                                                    lprlist: lprInfoJson,
                                                                    list: orderPojoJson,
                                                                    tourist: distributeTouristsJson
                                                                }),
                                                                orderChannel: 'PC',
                                                                channelName: orderInfoObject.szscenicname,
                                                                remark: formData.mask||'',
                                                                // returnUrl: `http://${ window.location.hostname }/#/my-account/MySalesOrder`
                                                                returnUrl: 'http://' + window.location.hostname
                                                            }).then(res => {
                                                                if(res.code === 200) {
                                                                    window.location.replace(res.data.view);
                                                                } else {
                                                                    that.spinShow = false;
                                                                }
                                                            })
                                                        } else {
                                                            that.spinShow = false;
                                                        }
                                                    } else {
                                                        paramsData = {
                                                            ...aaa,
                                                            usid: response.data.custom.usid,
                                                            returnUrl: `http://${ window.location.hostname}/#/my-personalUser/MyOrderDetailsPage?usid=${response.data.custom.usid}`,
                                                            orderChannel: 'PC',
                                                            channelName: orderInfoObject.szscenicname
                                                            // returnUrl: `http://${ window.location.hostname}`
                                                        };
                                                        that.saveOrderInfo({ paramsData: paramsData, params: orderInfo })
                                                            .then(function(response) {
                                                                if(response.code === 200){
                                                                    window.location.replace(response.data.view);
                                                                } else {
                                                                    that.spinShow = false;
                                                                }
                                                            })
                                                            .catch(() => {
                                                                that.spinShow = false;
                                                            })
                                                    }
                                                } else {
                                                    that.spinShow = false;
                                                    this.$req.showMessageModal(this, '未获取token信息，请刷新后重试', 2)
                                                }
                                            });
                                    }
                                    if(response.data.type === '02'){
                                        if(!sessionStorage.getItem('name')){
                                            sessionStorage.setItem('payFlag', '1');
                                            sessionStorage.setItem('totalInfo', JSON.stringify(that.totalInfo));
                                            that.$router.push({ name: 'login' });
                                            return
                                        }
                                    }
                                })
                                .catch(function(err){
                                    that.$req.showMessageModal(that, err, 1);
                                    that.spinShow = false;
                                })
                        }
                    } else {
                        that.$req.showMessageModal(that, '请先完善领票信息', 2)
                    }
                })
            },
            handleSubmit1(name,formData){
                let that = this;
                this.$refs[name].validate(function(valid){
                    if (valid) {
                        that.tologin({usid:formData.phoneNumbeLogin,pwd:formData.passwordLogin})
                            .then(function(response){
                                sessionStorage.setItem('notredirect','1');
                                that.getToken({paramsData:response})
                                    .then(function(){
                                        that.modalLogin = false;
                                        if(that.isSelect){
                                            let obj = {
                                                usid: formData.phoneNumbeLogin,
                                                pwd: formData.passwordLogin,
                                                url: window.location.hostname,
                                            };
                                            sessionStorage.setItem('userInfo',JSON.stringify(obj));
                                        }else {
                                            sessionStorage.removeItem('userInfo');
                                        }
                                    });
                            })
                    } else {
                        return;
                    }
                })
            },
            checkRequire(n){
                console.log(1);
                let ID = this.totalInfo['ID'+n];
                console.log(ID);
                let N = parseInt(n);
                if(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(ID)){
                    console.log(2);
                    this.ableObj[N] = ID;
                    this.disableArr.push(ID);

                    // let arr = distinct(this.disableArr);
                    // this.disableArr = arr;
                    console.log(this.disableArr);
                }else{
                    if(this.ableObj[N] !== -1){
                        let indexofnum = this.disableArr.indexOf(this.ableObj[N]);
                        this.disableArr.splice(indexofnum,1);
                        console.log(this.disableArr);
                        this.ableObj[N] = -1;
                    }
                }
            },
           async getYzm(){
               let that = this,
                   seconds = 60;
               this.yzmObj.timelimit = true;
               setTimeout(function time() {
                   if (seconds <= 0) {
                       that.yzmObj.tishi = '获取验证码';
                       that.yzmObj.timelimit = false;
                       return;
                   }
                   that.yzmObj.tishi = seconds + 's后重新获取';
                   seconds--;
                   setTimeout(time,1000);
               },1000);

             let wait = await this.sendVerificationCode({phoneNumber:this.totalInfo.phoneNumberzj,type:'0018'})
                    .then(res => {
                        if (res.code === 200) {
                            this.phoneYzm = res.msg;
                            return true;
                        } else {
                            this.$req.showMessageModal(this, '获取验证码失败', 1)
                        }
                    });

             if(!wait){
                 seconds = 0;
             }





                // this.yzmObj.tishi= '获取验证码';
                // this.timelimit = false;

            },
            choosePerson () {
                if (!this.lingpiaouserList.length) {
                    this.$req.showMessageModal(this, '暂无常用联系人可供选择', 2);
                    return false
                }
                if(!sessionStorage.getItem('userName')){
                    this.modalLogin = true;
                    if(this.totalInfo.phoneNumberzj){
                        this.totalInfo1.phoneNumbeLogin = this.totalInfo.phoneNumberzj;
                    }
                }else{
                    this.modal1 = true;
                    this.totalInfo1.phoneNumbeLogin = '';
                    this.totalInfo1.passwordLogin = '';
                }
            },
            choosePerson1 (n) {
                if (!this.lingpiaouserList.length) {
                    this.$req.showMessageModal(this, '暂无常用联系人可供选择', 2);
                    return false
                }
                this.lprxx1 = null;
                if (!sessionStorage.getItem('userName')) {
                    this.modalLogin = true;
                    if(this.totalInfo.phoneNumberzj){
                        this.totalInfo1.phoneNumbeLogin = this.totalInfo.phoneNumberzj;
                    }
                } else {
                    this.personNum = n;
                    if(!this.ableObj[this.personNum]){
                        this.ableObj[this.personNum] = -1;
                    }
                    this.modal2 = true;
                    this.totalInfo1.phoneNumbeLogin = '';
                    this.totalInfo1.passwordLogin = '';
                }
            },
            hideModal (modal) {    //关闭常用联系人弹窗
                if (modal === 'modal1') {
                    this.modal1 = false
                } else if (modal === 'modal2') {
                    this.modal2 = false
                }
            },
            getToken (tokenData) {
                //获取token
                return new Promise(resolve => {
                    this.$http.post(this.baseURL + '/uaa/oauth/token', this.QS.stringify(tokenData))
                        .then(res => {
                            if(res.status === 200) {
                                sessionStorage.setItem('name',res.data.access_token);  // 存储 token
                                resolve()
                            } else {
                                this.$req.showMessageModal(this, '未获取token信息，请刷新后重试', 2);
                            }
                        })
                        .catch(err => {
                            this.$req.showMessageModal(this, '账号不存在', 2)
                        })
                })
            },
            ...mapMutations([
                'orderAdd',
                'orderReduce',
                'orderInput',
                'getdestineArr'
            ]),
            ...mapActions([
                'sendVerificationCode',
                'checkLogin',
                'saveOrderInfo',
                'tologin',
                'getToken'
            ])
        },
        directives: {
            focus: {
                inserted: function(el,binding){
                    let input = document.createElement('input');
                    let div = document.createElement('div');
                    let textdiv = document.createElement('div');
                    if('placeholder' in input){
                    }else{
                        textdiv.innerHTML = binding.value;
                        div.appendChild(textdiv);
                        div.style.position = 'relative';
                        textdiv.style.position = 'absolute';
                        textdiv.style.top = '7px';
                        textdiv.style.left = '8px';
                        textdiv.style.color = '#C5C8D7';
                        textdiv.style.zIndex = '999';
                        el.parentNode.insertBefore(div,el);
                        let input = el.getElementsByTagName('input')[0];
                        input.onfocus = function(){
                            // console.log(1);
                            div.style.display = 'none';
                        };
                        input.onblur = function(){
                            // console.log(2);
                            if(this.value != ''){
                                div.style.display = 'none';
                            }else{
                                div.style.display = 'block';
                            }
                        }
                    }
                }
            }
        },
        created () {
            if (sessionStorage.getItem('totalInfo') && sessionStorage.getItem('userName')) {
                this.totalInfo = JSON.parse(sessionStorage.getItem('totalInfo'));
                sessionStorage.removeItem('totalInfo')
            }
        },
    }
</script>

<style scoped lang="less">
    form {
        position: relative;
    }
    .scope-first-container{
        min-width: 1200px;
        width: 62.5%;
        padding: 56px 64px;
        background: #FFF;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        margin: auto;
        color: #5E5E60;
        p{
            font-size: 14px;
            color: #191919;
            font-weight: 700;
        }
        h3{
            font-size: 20px;
            height: 20px;
            line-height: 1;
            color: #191919;
            margin-bottom: 32px;
            font-family: SourceHanSansCN-Medium;
        }
        .pay-money{
            color: #FF8314 ;
            span:nth-child(1){
                font-size: 20px;
                height: 20px;
                line-height: 1;
                font-weight: 500;
            }
            span:nth-child(2){
                font-size: 32px;
                height: 32px;
                line-height: 1;
                margin-left: 4px;
            }
        }
        .contacts{
            position: relative;
            z-index: 101;
            height: 116px;
            border: 1px solid #ECECEC;
            margin-bottom: 32px;
            padding: 20px 24px;
            background: #FFF;
            li{
                float: left;
                width: 64px;
                height: 14px;
                background: #ccc;
                margin: 12px 32px 12px 0;
            }
        }
        h4{
            font-size: 14px;
            height: 14px;
            line-height: 1;
            color: #191919;
            margin-bottom: 30px;
        }
        .submit-order{
            background: #4B7FF0;
            border-radius: 2px;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            width: 240px;
            height: 40px;
            font-size: 16px;
            &:hover{
                background: #306BEA
            }
        }
        .bottom-item{
            margin-top: 100px
        }
        .bottom-item:after{
            content: ".";
            display: block;
            font-size: 0;
            clear: both;
            height: 44px;
            visiblity: hidden;
        }
        .reservations-dialog{
            width: 800px;
            height: 393px;
            border: 1px solid #DBDBDE;
            position: absolute;
            left: 300px;
            top: 85px;
            padding: 40px;
            z-index: 100;
            background: #FFF;
            font-size: 14px;
            hr{
                margin: 24px 0;
            }
            p{
                span{
                    &:nth-child(1){
                        color: #5E5E60;
                        font-weight: 500;
                    }
                }
                &.enter-way{
                    span{
                        margin-right: 32px;
                        &:nth-child(1){
                            margin-right: 0;
                        }
                    }
                }
                .important-tips{
                    font-size: 14px;
                    color: #F54112 !important;
                }
            }
        }
        .inline-block-h3{
            display: inline-block;
            margin-right: 50px;
        }
        .topContacts{
            font-size: 14px;
            color: #4B7FF0;
            height: 14px;
            line-height: 1;
            /*text-align: right;*/
            display: inline-block;
            cursor: pointer;
        }
        .numInput-item{
            button{
                &:focus{
                    box-shadow: none;
                }
            }
            input:focus{
                box-shadow: none;
            }
        }
    }
    .adult-ticket{
        margin: 0 9px;
    }
    .reservations{
        font-size: 12px;
        color: #5E5E60;
        margin-left: 8px;
        cursor: pointer;
    }
    hr{
        margin-top: 100px;
        margin-bottom: 54px;
        background: #ECECEC;
        height: 1px;
        border: none;
    }
    .contact-div{
        margin: 0 10px;
        padding: 10px;
        height: 275px;
        border: 1px solid #000;
        overflow-y: auto;
    }
    .login-div{
        width: 275px;
        margin: auto;
    }
    .mg1{
        margin-top: 30px;
    }
    .ml1{
        margin-left: 55px;
    }
    .ml2{
        margin-left: 85px;
    }
    .mb1>label{
        margin: 0 0 20px 0;
    }
    .span1{
        width: 60px;
        display: inline-block;
    }
</style>
