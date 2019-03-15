<template>
    <div class="MyInformation">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <div slot="title" class="cardTitle1">
            <p>个人资料</p>
        </div>
        <div class="head-portrait-user-name">
            <img src="../../../../assets/portrait.png" alt="用户头像">
            <div class="user-name-block">
                <span class="user-name">{{userName}}</span><br />
                    <!-- <span class="fulfillment-schedule">资料完整度：</span>
                    <Progress :percent="45" status="active"></Progress> -->
            </div>
        </div>
        <div class="fill-information">
      <div class="textLeft">
        <detail-form 
            :isListPage="true"
            :formDatas="formDatas"
            :isHasTable="false"
            :btnLabelWidth="90"
            :labelWidth="75"
            :labelPosition="'left'"
            :isBtn='false'
            :formItemList="formItemList"></detail-form>
    </div>
        </div>
        <div class="Acommitment">
            <span class="Acommitment-title">易旅通郑重承诺：</span>
            <span class="Acommitment-content">我们将尊重您的个人隐私，您的个人信息不会被公开。</span>
        </div>
        <Button type="primary" class="footer-save" @click="myInformBtn">保存</Button>
    </div>    
</template>

<script>
export default {
  data() {
    return {
      userName:'',
      percent: 0,
      animal: "",
      petName: "",
      detailedAddress: "",
      realName: "",
      emailAddress: "",
      value1: [],
      isShowLoading:false,
      formDatas: {
        val1: "",
        val2: "",
        val3: "",
        val4: "",
        val5: 1,
        val6: "",
        val7: "",
      },
      formItemList: [
        {
          keyName: "val1",
          type: 1,
          labelWidth:97,
          label: "昵称",
        },
        {
          keyName: "val2",
          labelWidth:97,
          type: 1,
          label: "真实姓名"
        },
        {
          keyName: "val3",
          type: 8,
          labelWidth:97,
          label: "手机号"
        },
        {
          keyName: "val4",
          type: 1,
          labelWidth:97,
          label: "电子邮箱"
        },
        {
          label: "性别",
          type: 2,
          labelWidth:97,
          keyName: "val5",
          isAddTips: true,
          optionList: [
            {
              value: 1,
              label: "男"
            },
            {
              value: 2,
              label: "女"
            }
          ]
        },
        {
          placeholder:'请选择',
          keyName: "val6",
          labelWidth:97,
          type: 5,
          label: "出生日期",
          startOptions: {
            disabledDate : (date) => {
              return date && date.valueOf() > Date.now()
            }
          }
        },
        {
          placeholder:'请填写详细地址',
          keyName: "val7",
          labelWidth:97,
          type: 1,
          label: "所在地址"
        },
      ]
    };
  },
  created() {
    this.myInformAxios();
  },
  computed: {},

  methods:{
    myInformAxios(){
          this.isShowLoading = true;
      this.$http.get(this.baseURL + '/ec/custom/getCustom',{
        params: {
          access_token:sessionStorage.getItem("name"),
          usid:sessionStorage.getItem("userName"),
          info:'info',
        }
      }).then((response) => {
        
        let userInformation = response.data.data.custom;
        this.formDatas.val1 = userInformation.note6; 
        this.formDatas.val2 = userInformation.lname;
        this.formDatas.val3 = userInformation.mobile;
        this.formDatas.val4 = userInformation.email;
        this.formDatas.val5 = userInformation.inote3;
        this.formDatas.val6 = userInformation.note7;
        this.formDatas.val7 = userInformation.addr;
        this.userName = response.data.data.custom.usid
          this.isShowLoading = false;
          return;
      }).catch((error) => {
          this.isShowLoading = false;
          return;
        
      })
    },

    myInformBtn(){
        this.isShowLoading = true;
        // if(this.formDatas.val1 == '' || this.formDatas.val1 == null) {
        //     this.$Modal.error({
        //         title: '操作失败',
        //         content: '请输入正确的昵称'
        //     });
        //   this.isShowLoading = false;
        //     return
        // } else if(this.formDatas.val2 == '' || this.formDatas.val2 == null) {
        //     this.$Modal.error({
        //         title: '操作失败',
        //         content: '请输入正确的真实姓名'
        //     });
        //   this.isShowLoading = false;
        //     return
        // } else if(this.formDatas.val4 === null ) {
        //     this.$Modal.error({
        //         title: '操作失败',
        //         content: '请输入正确的邮箱地址'
        //     });
        //   this.isShowLoading = false;
        //     return
        // } else if(this.formDatas.val7 == '' || this.formDatas.val7 == null ) {
        //     this.$Modal.error({
        //         title: '操作失败',
        //         content: '请输入正确的所在地址'
        //     });
        //   this.isShowLoading = false;
        //     return
        // } else if(this.formDatas.val5 == '' || this.formDatas.val5 == null) {
        //     this.$Modal.error({
        //         title: '操作失败',
        //         content: '请输入正确的性别'
        //     });
        //   this.isShowLoading = false;
        //     return
        // }
      let token = sessionStorage.getItem("name");
      let usid = sessionStorage.getItem("userName");
      let url = window.location.host;
      this.$http.put(this.baseURL + '/ec/custom/updateCustom?access_token=' + token ,{
        note6: this.formDatas.val1,
        lname: this.formDatas.val2,
        mobile: this.formDatas.val3,
        email: this.formDatas.val4,
        inote3: this.formDatas.val5,
        note7: new Date(this.formDatas.val6).format("yyyy-MM-dd"),
        addr: this.formDatas.val7,
        usid:sessionStorage.getItem("userName"),
      }).then((response) => {
        
         if(response.data.code === 200) {
            this.$Modal.success({
                title: '操作成功',
                content: '修改成功'
            });
          } else if(response.data.code === 400){
            this.$Modal.error({
                title: '操作失败',
                content: response.data.msg
            });
          }else if(response.data.code === 404){
            this.$Modal.error({
                title: '操作失败',
                content: response.data.msg
            });
          }else if(response.data.code === 500){
            this.$Modal.error({
                title: '操作失败',
                content: response.data.msg
            });
          } 
          this.isShowLoading = false;
          return;
      }).catch((error) => {
          this.isShowLoading = false;
          return;
      })
    },
  },
};
</script>

<style scoped lang="less">
.textLeft {
  margin-top: 20px;
}
.textLeft .ivu-form-item-label{
  text-align: left;
}
.fill-information {
  float: left;
}
.footer-save {
  padding: 7px 51px;
  margin-top: 20px;
  float: left;
  background: #4E81F0;
  color:#fff;
  &:hover {
    background: #306BEA
  }
}
.Acommitment {
  width: 100%;
  background: #f2f6fe;
  border: 1px solid #aec7ff;
  border-radius: 2px;
  padding: 15px 55px;
  float: left;
}
.Acommitment-content {
  color: #5e5e60;
  margin-top: 10px;
  display: block;
}
.Acommitment-title {
  display: block;
  font-weight: 600;
  font-size: 14px;
  color: #f54112;
}
.modification {
  margin-left: 10px;
}
.phone {
  margin-right: 10px;
}
.pet-name-block {
  padding-top: 20px;
}
.real-name,
.email-address {
  margin-left: 7px;
}
.gender {
  margin-left: 27px;
}
.area {
  margin-right: 20px;
}
.area,
.date-birth {
  margin-left: 20px;
}
.pet-name {
  margin-left: 30px;
}
.nickname {
  margin: 25px 0;
}
.ivu-progress {
  position: absolute;
  top: 140px;
  width: 22%;
}
.main_picker {
  /*margin: 50px 0;*/
}
.cardTitle1 p {
  color: #191919
}
.demo-Circle-inner {
  font-size: 16px;
}
.fulfillment-schedule {
  height: 40px;
  display: inline-block;
  float: left;
  margin-top: 29px;
  padding-right: 30px;
}
.head-portrait-user-name {
  float: left;
  border-bottom: 1px solid #ececec;
  width: 100%;
  padding-bottom: 25px;
}
.user-name-block {
  float: left;
  margin-top: 29px;
}
.head-portrait-user-name img {
  width: 80px;
  height: 80px;
  display: inline-block;
  border: 0;
  border-radius: 50%;
  float: left;
  margin-right: 30px;
}
/*.cardTitle {*/
  /*font-size: 20px;*/
  /*color: #191919;*/
/*}*/
</style>

