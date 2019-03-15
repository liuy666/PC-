<template>
    <div class="width-1200 registra-tourist found-password">
        <h2>游客</h2>
        <hr>

        <h3>密码找回</h3>

        <div class="steps">
            <div class="active">
                <span>1</span>
                <span>填写账户名</span>
                <div class="tri-r1">
                    <div class="tri-r">

                    </div>
                </div>
                <!--<div class="tri-r2">-->
                <!--<div class="tri-r">-->

                <!--</div>-->
                <!--</div>-->
            </div>
            <div class="active">
                <span>2</span>
                <span>验证身份</span>
                <div class="tri-r1">
                    <div class="tri-r">

                    </div>
                </div>
                <div class="tri-r2">
                    <div class="tri-r">

                    </div>
                </div>
            </div>
            <div>
                <span>3</span>
                <span>设置新密码</span>
                <div class="tri-r1">
                    <div class="tri-r">

                    </div>
                </div>
                <div class="tri-r2">
                    <div class="tri-r">

                    </div>
                </div>
            </div>
            <div>
                <span>4</span>
                <span>完成</span>
                <!--<div class="tri-r1">-->
                <!--<div class="tri-r">-->
                <!--</div>-->
                <!--</div>-->
                <div class="tri-r2">
                    <div class="tri-r">
                    </div>
                </div>
            </div>
        </div>
        <div class="z-mgl">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="86" label-position="left">
                <FormItem label="手机号：">
                    <div class="z-fntsz" v-html="phoneNumber"></div>
                </FormItem>
                <FormItem label="验证码：" prop="vericode">
                    <Input v-model="formInline.vericode"  style="width: 100px" type="text"/>
                    <graphic-code gheight="30" gwidth="87" class="z-gra" ref="gra"></graphic-code>
                </FormItem>
                <FormItem label="手机验证：" prop="phoneyz">
                    <Input v-model="formInline.phoneyz" style="width: 100px"/>
                    <!--<Button type="primary"   class="btn btn2" :disabled="!/^1[34578]\d{9}$/.test(formInline.phoneNumber)" @click="sendRegistraVerificationCode(formInline.phoneNumber)">获取短信验证码</Button>-->
                    <Button type="primary" class="btn btn2" @click="getYzm" v-html="yzmObj.tishi" :disabled="yzmObj.timelimit"></Button>
                    <!--<Button type="primary"   class="btn btn2" >42秒后可重发</Button>-->
                </FormItem>
                <div class="mg1">
                    <Button type="primary" long  class="btn btn1 btn-next" @click="handleSubmit('formInline',formInline)">下一步</Button>
                </div>
                <br>
            </Form>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "touristPassword2",
        data:function(){
            let that = this;
            const validateVriCode = function(rule, value, callback){
                let val = value? value.toLowerCase():value;
                if(value === ''){
                    callback(new Error('请输入验证码'));
                }else if(val !== that.$refs['gra'].verifyCode.options.code.toLowerCase()){
                    callback(new Error('验证码错误'));
                    // that.yzmObj.timelimit = true
                    that.$refs['gra'].verifyCode.refresh();
                }else{
                   // that.yzmObj.timelimit = false
                    callback();
                }
            };
            const validatePhoneyz = function(rule, value, callback){
                if(!value){
                    callback(new Error('请输入短信验证码'));
                } else {
                    callback();
                }
            };
            return{
                formInline:{
                    phoneyz:'',
                },
                ruleInline:{
                    phoneyz:[
                        { validator: validatePhoneyz, trigger: 'blur' }
                    ],
                    vericode:[
                        { validator: validateVriCode, trigger: 'blur' }
                    ]
                },
                yzmObj:{
                    tishi:'发送验证码',
                    timelimit: false
                }
            }
        },
        computed:{
          phoneNumber(){
              let forgetPhone = sessionStorage.getItem('forgetPhone');
              let jiamiPhone = forgetPhone.substr(0,3)+'****'+forgetPhone.substr(7,4);
              return jiamiPhone;
          }
        },
        methods:{
            handleSubmit (name,formData) {
                let that = this;
                this.$refs[name].validate(function(valid){
                    if (valid) {
                        let paramsData = {
                            mobileCode:formData.phoneyz,
                            lgtp:'01',
                            url: window.location.hostname
                        };
                        let params = {
                            usid:sessionStorage.getItem('forgetPhone')
                        };
                        that.retrievePwdByMobile({paramsData:paramsData,params:params})
                            .then(function(response){
                                if(!response){
                                    return false;
                                }
                                sessionStorage.setItem('forgetPhone1',response.data.usid);
                                that.$router.push({name:'touristPassword3'});
                            })
                    } else {
                        console.log(2);
                    }
                })
            },
           async getYzm(){
                let that = this;
                this.yzmObj.timelimit = true;
               let seconds = 60;
               setTimeout(function time() {
                   if (seconds <= 0) {
                       that.yzmObj.tishi = '发送验证码';
                       that.yzmObj.timelimit = false;
                       return;
                   }
                   that.yzmObj.tishi = seconds + 's后可重发';
                   seconds--;
                   setTimeout(time,1000);
               },1000);
               let wait = await this.sendVerificationCode( {phoneNumber:sessionStorage.getItem('forgetPhone'),type:'0015'})
                   .then(function(response){
                    if(response&&response.code === 200){
                        // that.yzmObj.timelimit = false;
                        return true;
                    }

                });
               if(!wait){
                   seconds = 0;
               }
            },
            ...mapActions([
                'sendVerificationCode',
                'retrievePwdByMobile'
            ])
        }
    }
</script>

<style scoped lang="less">
    .btn2{
        margin-left: 24px;
    }
    .z-mgl {
        width: 374px;
    }
    .z-gra{
        margin-left: 25px;
        height: 32px;
        display: inline-block;
        vertical-align: bottom;
    }
</style>
