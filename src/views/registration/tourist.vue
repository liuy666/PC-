<template>
    <div id="register">
        <div class="registra-tourist width-1200">
            <h2>游客注册</h2>
            <hr>
            <div class="mg2">
                <Form ref="formInline"
                    :model="formInline"
                    :rules="ruleInline"
                    :label-width="80"
                    label-position="left">
                    <!-- <h3>基本信息</h3> -->
                    <FormItem label="手机号码" prop="phoneNumber">
                        <Input v-model.trim="formInline.phoneNumber" style="width: 264px" placeholder="请输入11位手机号码" @input="validateTel" :maxlength="11" />
                        <!-- <span class="tips666">请使用大陆手机号注册，系统严格保密</span> -->
                    </FormItem>
                    <!-- <FormItem label="验证码" prop="vericode">
                        <Input v-model="formInline.vericode"  style="width: 100px;text-align: left; display: inline-block" type="text" placeholder="输入图形验证码" />
                        <graphic-code gheight="30" gwidth="87" class="z-gra" ref="gra"></graphic-code>
                    </FormItem> -->
                    <FormItem label="激活码" prop="yzm">
                        <Input v-model.trim="formInline.yzm"  style="width: 100px; text-align: left; display: inline-block" placeholder="输入短信激活码" />
                        <Button class="jhm btn btn2" type="primary" :disabled="(!isvalid) || isRegister || yzmObj.timelimit"
                                @click="getYzm" v-html="yzmObj.tishi">
                        </Button>
                    </FormItem>
                    <FormItem label="登录密码" prop="password">
                        <Input v-model.trim="formInline.password" placeholder="请输入8-15位数字、字母或数字字母组合"  style="width: 264px" type="password"/>
                        <!-- <span class="tips666">8-15位数字、字母或数字字母组合</span> -->
                    </FormItem>

                    <FormItem label="确认密码" prop="confirmPassword">
                        <Input v-model.trim="formInline.confirmPassword" placeholder="请再次输入密码"  style="width: 264px" type="password"/>
                    </FormItem>
                </Form>
                <div class="wrap">
                    <Checkbox label="Eat" class="agree" v-model="formInline.agree" >我同意注册服务条款</Checkbox>
                    <a class="tiaokuan" @click="toTioakuan">《环球雅途易旅通注册服务条款》</a>
                </div>
                <div style="text-align: center">
                    <Button
                        type="primary"
                        long
                        class="btn btn1 mg1"
                        :disabled="!formInline.agree"
                        @click="handleSubmit('formInline')">
                        <span>注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</span>
                    </Button>
                </div>
                <div class="registed">
                    <router-link :to="{name:'login'}" class="lianjie">我已经注册，点击登录</router-link>
                </div>
            </div>
            <Modal v-model="isModalShow" width="1000" :closable="true" :mask-closable="false">
                <p slot="header">注册服务条款</p>
                <div>
                    <member></member>
                </div>
                <div slot="footer" style="text-align: center">
                    <Button type="primary" class="op-btns ok-btn" @click="hideModal">确定</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
    import member from './membershipClause'
    export default {
        name: "tourist",
        components: {
            member:  member
        },
        data () {
            let that = this;
            const validatePassCheck = function(rule, value, callback){
                if (value === '') {
                    callback(new Error('请确认密码'));
                } else if (value !== that.formInline.password) {
                    console.log(that);
                    callback(new Error('2次密码输入不一致，请重新输入'));
                } else {
                    callback();
                }
            };
            const validatePwd = (rule, value, callback) => {
        		let reg = /^[0-9a-zA-Z]{8,15}$/;
                if(value === '') {
                    callback(new Error('登录密码不能为空'));
                } else if(!reg.test(value)) {
                    callback(new Error('登录密码由8到15位数字或字母（区分大小写）组成'));
                } else {
                    callback();
                }
        	};
            const validateVriCode = function(rule, value, callback){
                let val = value? value.toLowerCase():value;
                if(value === ''){
                    callback(new Error('请输入验证码'));
                }else if(val !== that.$refs['gra'].verifyCode.options.code.toLowerCase()){
                    callback(new Error('验证码错误'));
                    that.$refs['gra'].verifyCode.refresh();
                }else{
                    callback();
                }
            };
            const validatePhone = (rule,value,callback) => {
        		let reg = /^(13[0-9]|14[5-9]|15[0-9]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
        		if(value === '') {
        			callback(new Error('手机号码不能为空'));
        		} else if(!reg.test(value)) {
        			callback(new Error('请输入11位有效手机号码'));
        		} else {
        			callback();
        		}
        	}
            return {
                isModalShow: false,
                isDisabled: false,
                formInline: {
                    phoneNumber:'',
                    yzm:'',
                    password:'',
                    confirmPassword:'',
                    agree:false,
                },
                ruleInline: {
                    password:[
                        {
                            required: true,
                            validator: validatePwd,
                            trigger: 'blur'
                        }
                    ],
                    confirmPassword:[
                        { validator:validatePassCheck,trigger: 'blur',required: true}
                    ],
                    phoneNumber:[
                        {
                            required: true,
                            validator: validatePhone,
                            trigger: 'blur'
                        }
                    ],
                    yzm:[
                        { required: true, message: '请输入验证码', pattern:/^\d{4}$/,trigger: 'blur' }
                    ],
                    // vericode:[
                    //     { validator:validateVriCode,trigger: 'blur',required: true}
                    // ]
                },
                yzmObj: {
                    tishi:'获取短信激活码',
                    timelimit: false
                },
                isRegister: true, // 是否已经注册
                isvalid: false,
            }
        },
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        this.execute();
                    } else {
                        return;
                    }
                });
            },
            async execute() {
                const registerRes = await this.$api.post(this.lee + '/ec/custom/v1/addCustomInfo',{
                    vertifycode : this.formInline.yzm,
                    url: window.location.hostname
                },{
                    lgtp: '01',
                    password: this.formInline.password,
                    password2: this.formInline.password,
                    mobile: this.formInline.phoneNumber,
                },true);
                console.log(registerRes);
                if(!registerRes) {
                    return;
                }

                this.$Modal.confirm({
                    title: '注册成功',
                    width: 500,
                    content: '【环球雅途】恭喜您注册成为环球雅途电商的会员',
                    okText: '前往登录',
                    cancelText: '前往首页',
                    onOk: () => {
                        this.$router.push({
                            name:'login'
                        });
                    },
                    onCancel: () => {
                        this.$store.commit('setMenuIndex','1');
                        this.$router.push({
                            name:'index_home'
                        });
                    }
                });
            },
            async getYzm(){
                this.yzmObj.timelimit = true;
                let seconds = 60,
                    that = this;
                setTimeout(function time() {
                    if (seconds <= 0) {
                        that.yzmObj.tishi = '获取验证码';
                        that.yzmObj.timelimit = false;
                        return;
                    }
                    that.yzmObj.tishi = seconds + 's后可重发';
                    seconds--;
                    setTimeout(time,1000);
                },1000);
                const res = await this.$api.post(this.lee + '/ec/custom/sendRegMessageCustom',{
                    url: window.location.hostname
                },{
                    mobile: this.formInline.phoneNumber,
                },true);
                console.log(res);

                if(!res) {
                    // this.yzmObj.timelimit = false;
                    seconds = 0;
                    return;
                }

            },
            //弹出条款框
            toTioakuan(){
                this.isModalShow = true;
            },
            hideModal () {
                console.log(123);
                this.isModalShow = false
            },
            // 验证手机号是否已经注册
            async validateTel(val) {
                if(val.length === 11) {
                    let reg = /^(13[0-9]|14[5-9]|15[0-9]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
                    if(!reg.test(this.formInline.phoneNumber)) {
                        this.isvalid = false;
                        return;
                    } else {
                        this.isvalid = true;
                    }
                    // if(!reg.test(this.formInline.phoneNumber)) {
                    //     return;
                    // }
                    // console.log(this.formInline.phoneNumber);
                    const isRegister = await this.$api.get2(this.lee + '/ec/custom/newCheckMobile',{
                        mobile: this.formInline.phoneNumber,
                        lgtp: '01',
                        url: window.location.hostname
                    });
                    console.log(isRegister);
                    if(!isRegister) {
                        this.isRegister = true;
                        return;
                    }
                    if(isRegister.data) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '该手机号已经注册过了，请直接登录！'
                        });
                        this.isRegister = true;
                    } else {
                        this.isRegister = false;
                    }
                } else {
                    this.isRegister = true;
                    return;
                }
            }
        },

    }
</script>

<style scoped lang="less">
    #register {
        background-color: #F5F8FB;
        padding: 30px 0 52px;
    }

    .mg1{
        margin: 0 0 24px 0;
    }

    .btn2{
        margin-left: 16px;
    }

    .yzm{
        width: 87px;
        height: 30px;
        margin-left: 16px;
        background: #ECECEC;
        border: none;

    }

    .z-gra{
        margin-left: 17px;
        height: 32px;
        display: inline-block;
        vertical-align: bottom;
    }
</style>
