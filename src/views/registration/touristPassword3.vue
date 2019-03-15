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
            <div class="active">
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
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="114" label-position="left">
                <FormItem label="请输入新密码：" prop="newpassword">
                    <Input v-model="formInline.newpassword" style="width: 302px" type="password"/>
                </FormItem>
                <FormItem label="请确认新密码：" prop="qrnewpassword">
                    <Input v-model="formInline.qrnewpassword" style="width: 302px" type="password"/>
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
    import {mapActions} from 'vuex';
    export default {
        name: "touristPassword3",
        data () {
            const validateNewpassword = (rule, value, callback) => {
                const reg = /^[^\s]{8,15}$/;
                if (!value) {
                    callback(new Error('请输入新密码'));
                } else if (!reg.test(value)) {
                    callback(new Error('密码只能由8-15位非空白字符组成'));
                } else {
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请确认密码'));
                } else if (value !== this.formInline.newpassword) {
                    callback(new Error('2次密码输入不一致，请核对'));
                } else {
                    callback();
                }
            };
            return{
                formInline: {
                    newpassword: '',
                    qrnewpassword: ''
                },
                ruleInline:{
                    newpassword:[
                        { validator:validateNewpassword, trigger: 'blur' }
                    ],
                    qrnewpassword:[
                        { validator:validatePassCheck, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            handleSubmit (name,formData) {
                let that = this;
                this.$refs[name].validate(function(valid){
                    if (valid) {
                        let paramsData = {
                            op:'1',
                            url: window.location.hostname
                        };
                        let params = {
                            usid:sessionStorage.getItem('forgetPhone1'),
                            password: formData.newpassword,
                            password2: formData.newpassword,
                            lgtp: '01'
                        };
                        that.submitPasswordSave({paramsData:paramsData,params:params})
                            .then(function(response){
                                if(response.code !== 200){
                                    return;
                                }
                                that.$router.push({name:'touristPassword4'});
                            });
                    } else {
                        console.log(2);
                    }
                })
            },
            ...mapActions([
                'submitPasswordSave'
            ]),
        }
    }
</script>

<style scoped lang="less">
    .btn2{
        margin-left: 24px;
    }
</style>