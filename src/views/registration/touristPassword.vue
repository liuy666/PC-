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
            <div>
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
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="72" label-position="left">
                <FormItem label="用户名：" prop="username">
                    <Input v-model="formInline.username" style="width: 302px"placeholder="请正确激活的手机号码" @on-change="tishi=false"/>
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
        name: "touristPassword",
        data:function(){
            let that = this;
            const validateUserCheck = function(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else if (!/^1[34578]\d{9}$/.test(value)) {
                    console.log(that);
                    callback(new Error('请输入正确的手机号'));
                } else if(that.tishi){
                    callback(new Error('用户名不存在'));
                }else{
                    callback();
                }
            }
            return{
                formInline:{
                    username:'',
                },
                ruleInline:{
                    username:[
                        {validator:validateUserCheck, trigger: 'blur' }
                    ],

                },
                tishi: false
            }
        },
        methods:{
            handleSubmit (name,formData) {
                let that = this;
                this.$refs[name].validate(function(valid){
                    if (valid) {
                        let paramsData = {
                            lgtp:'01',
                            url: window.location.hostname
                        },
                            params = {
                                usid:formData.username
                            };
                        that.checkMobile({paramsData:paramsData,params:params})
                            .then(function(response){
                                if(response.code !== 200){
                                    that.tishi = true;
                                    return;
                                }
                                that.tishi = false;
                                sessionStorage.setItem('forgetPhone',formData.username);
                                that.$router.push({name:'touristPassword2'});
                            }).catch(function(){
                            that.tishi = true;
                        })

                    } else {

                    }
                })
            },
            ...mapActions([
                'checkMobile'
            ]),
        }
    }
</script>

<style scoped lang="less">
    .registra-tourist {
        box-shadow: none;
    }
    .z-mgl {
        width: 374px;
    }
</style>