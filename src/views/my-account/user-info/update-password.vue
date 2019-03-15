<style scoped lang="less">

</style>

<template>
    <div id="updatePassword">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <div style="min-height:1000px;">
            <Breadcrumb separator=">" :style="{margin: '24px 0'}">
				<BreadcrumbItem>我的账户</BreadcrumbItem>
				<BreadcrumbItem>用户信息</BreadcrumbItem>
				<BreadcrumbItem>修改密码</BreadcrumbItem>
			</Breadcrumb>
            <div slot="title" class="cardTitle1">
                <p>修改密码</p>
            </div>
            <detail-form
                :formDatas="formDatas"
                :formItemList="formItemList"
                btnName="修改"
                :isHasTable="false"
                :btnLabelWidth="140"
                :labelWidth="140"
                :ruleDatas="ruleDatas"
                @getFormData="handleSubmit"></detail-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "update-password",
        data(){
            const validateNewPwd = (rule, value, callback) => {
                const reg = /^[_a-zA-Z0-9]{8,15}$/;
                if (value === '') {
                    callback(new Error('新密码不能为空'));
                } else if(!reg.test(value)) {
                    callback(new Error('密码格式为8-15位英文字母、数字和字符组合'));
                } else {
                    callback();
                }
            };
            const validateNewPwd2 = (rule, value, callback) => {
                if (value !== this.formDatas.password2) {
                    callback(new Error('前后密码不一致'));
                } else {
                    callback();
                }
            };
            return{
                isShowLoading: false,
                formDatas: {
                    password: '',
                    password2: '',
                    newPwd: ''
                },
                ruleDatas: {
                    password: [
                        {
                            required: true,
                            message: '旧密码不能为空',
                            trigger: 'blur'
                        }
                    ],
                    password2: [
                        {
                            validator: validateNewPwd,
                            trigger: 'blur',
                            required: true,
                        }
                    ],
                    newPwd: [
                        {
                            validator: validateNewPwd2,
                            trigger: 'blur',
                            required: true,
                        }
                    ],
                },
                formItemList: [
                    {
                        label: '旧密码',
                        type: 1,
                        keyName: 'password'
                    },
                    {
                        label: '新密码',
                        type: 1,
                        keyName: 'password2',
                        isAddTips: true,
                        tips: '（密码由8-15位英文字母、数字和字符组合）',
                        inputType: 'password'
                    },
                    {
                        label: '确认新密码',
                        type: 1,
                        keyName: 'newPwd',
                        inputType: 'password'
                    }
                ]
            }
        },
        async created() {
            // 进入页面前获取数据进行页面初始化
            this.formDatas.password = '';
            this.formDatas.password2 = '';
            this.formDatas.newPwd = '';
        },
        methods: {
            async handleSubmit() {
                this.isShowLoading = true;
                const res = await this.$api.put(this.lee + '/ec/custom/updatePassword',{
                    op: 1
                },{
                    password: this.formDatas.password,
                    password2: this.formDatas.password2,
                    usid: sessionStorage.getItem('userName'),
                    lgtp: '02'
                });
                if(!res) {
                    this.isShowLoading = false;
                    return;
                }
                this.$Modal.success({
                    title: '操作成功',
                    content: '密码修改成功，请牢记您的新密码：' + this.formDatas.password2,
                    onOk: () => {
                      this.logout()
                    }
                });
                this.isShowLoading = false;
            },
            logout () {
            sessionStorage.removeItem('name');
                  sessionStorage.removeItem('userName');
                  this.$store.commit('setUserName');
                  sessionStorage.removeItem('lgtp');
                  sessionStorage.removeItem('ustp');
                  this.$store.commit('setMenuIndex','1');
                  sessionStorage.setItem('route','ticket');
                  this.$store.commit('setRoute','ticket');
                  if (this.$route.name !== 'index_home') {
                      // this.$router.push({
                      //     name: 'index_home'
                      // });
                      let fxsId = sessionStorage.getItem('fxsId');
                      if (fxsId) {
                          this.$router.push({
                              path: '/index_home',
                              query: {
                                  fxsId
                              }
                          });
                      } else {
                          this.$router.push({
                              name: 'index_home'
                          });
                      }
                  } else {
                      window.location.reload()
                  }
            }
        }
    }
</script>
