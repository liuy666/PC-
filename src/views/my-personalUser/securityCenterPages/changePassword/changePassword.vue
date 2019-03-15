<style scoped lang="less">
</style>

<template>
    <div id="updatePassword">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
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
                @getFormData="handleSubmit">
        </detail-form>

        
        <!-- <Button @click="instance('error')">Error</Button> -->
    </div>
</template>

<script>
export default {
  name: "update-password",
  data() {
    const validateNewPwd = (rule, value, callback) => {
      const reg = /^[_a-zA-Z0-9]{8,15}$/;
      if (value === "") {
        callback(new Error("新密码不能为空"));
      } else if (!reg.test(value)) {
        callback(new Error("密码格式为8-15位英文字母、数字和字符组合"));
      } else {
        callback();
      }
    };
    const validateNewPwd2 = (rule, value, callback) => {
      if (value !== this.formDatas.var2) {
        callback(new Error("前后密码不一致"));
      } else {
        callback();
      }
    };
    return {
      errorText: "",
      modal13: false,
      isShowLoading: false,
      formDatas: {
        var1: "",
        var2: "",
        var3: ""
      },
      ruleDatas: {
        var1: [
          {
            required: true,
            message: "旧密码",
            trigger: "blur"
          }
        ],
        var2: [
          {
            required: true,
            validator: validateNewPwd,
            trigger: "blur",
            message: "密码只能由8-15位非空白字符组成"
          }
        ],
        var3: [
          {
            required: true,
            validator: validateNewPwd2,
            trigger: "blur"
          }
        ]
      },
      formItemList: [
        {
          label: "旧密码",
          type: 1,
          keyName: "var1",
          inputType: 'password'
        },
        {
          label: "新密码",
          type: 1,
          keyName: "var2",
          isAddTips: true,
          inputType: 'password'
        },
        {
          label: "确认新密码",
          type: 1,
          keyName: "var3",
          inputType: 'password'
        }
      ]
    };
  },
  async created() {
    // 进入页面前获取数据进行页面初始化
  },
  methods: {
    handleSubmit() {
      this.isShowLoading = true;
      let formerPass = this.formDatas.var1;
      let newPass = this.formDatas.var2;
      let token = sessionStorage.getItem("name");
      let op = 1;
      let url = window.location.host;
      this.$http
        .put(
          this.baseURL +
            "/ec/custom/updatePassword?access_token=" +
            token +
            "&op=" +
            op +
            "&url=" +
            url,
          {
            password: formerPass,
            password2: newPass,
            usid: sessionStorage.getItem("userName"),
            lgtp: "01"
          }
        )
        .then(response => {
          
          if(this.formDatas.val2 !== this.formDatas.val3) {
            this.$Modal.error({
              title: "温馨提示",
              content: '新密码填写错误,重新填写'
            });
          }
          if (response.data.code === 400) {
            this.$Modal.error({
              title: "温馨提示",
              content: response.data.msg
            });
          } else if (response.data.code === 500) {
            this.$Modal.error({
              title: "温馨提示",
              content: response.data.msg
            });
          } else if (response.data.code === 404) {
            this.$Modal.error({
              title: "温馨提示",
              content: response.data.msg
            });
          }else if (response.data.code === 200) {
            this.$Modal.success({
              title: "温馨提示",
              content: '修改成功'
            });
          }
          this.isShowLoading = false;
          return;

          // let errorMessage = response.data.code;
          // if(errorMessage == 400) {

          // }
        })
        .catch(error => {
          
          this.isShowLoading = false;
          return;
        });
    }
  }
};
</script>