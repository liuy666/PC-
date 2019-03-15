<template>
    <div class="MyInformation">
        <Card style="min-height:1000px;">
        <p slot="title" class="cardTitle">
            <span>常用联系人</span>
        </p>  
        <div class="fill-information">
            
        <detail-form 
            :isListPage="true"
            :formDatas="formDatas"
            :isHasTable="false"
            btnName="查询"
            :btnLabelWidth="220"
            :labelWidth="220"
            :formItemList="formItemList"></detail-form>
        </div>
        <div class="Acommitment">
            <span class="Acommitment-title">易旅通郑重承诺：</span>
            <span class="Acommitment-content">我们将尊重您的个人隐私，您的个人信息不会被公开。</span>
        </div>
        <Button type="primary" class="footer-save">保存</Button>
        </Card>  
    </div>    
</template>

<script>
export default {
  data() {
    return {
      percent: 0,
      animal: "",
      petName: "",
      detailedAddress: "",
      realName: "",
      emailAddress: "",
      value1: [],
      formDatas: {
        val1: "",
        val2: "",
        val3: "",
        val4: "",
        val5: "",
        val6: "",
        val7: "",
        val8: "",
        val9: "",
        val10: "",
      },
      formItemList: [
        {
          keyName: "val1",
          type: 1,
          label: "中文名字",
          optionList: []
        },
        {
          keyName: "val2",
          type: 1,
          label: "英文名字"
        },
        {
          label: "性别",
          type: 2,
          keyName: "val3",
          optionList: [
            {
              value: 0,
              label: "男"
            },
            {
              value: 1,
              label: "女"
            },
          ]
        },
        {
          keyName: "val4",
          type: 1,
          label: "国籍"
        },
        {
          keyName: "val5",
          type: 5,
          label: "出生年月日",
          double:false
        },
        {
          keyName: "val6",
          type: 1,
          label: "手机号"
        },
        {
          keyName: "val7",
          type: 1,
          label: "邮箱地址"
        },
        {
          label: "证件类型",
          type: 2,
          keyName: "val8",
          optionList: [
            {
              value: 0,
              label: "身份证"
            },
            {
              value: 1,
              label: "护照"
            },
          ]
        },
        {
          keyName: "val9",
          type: 1,
          label: ""
        },
        {
          label: "",
          type: 2,
          keyName: "val10",
          optionList: [
            {
              value: 0,
              label: "默认游客"
            },
          ]
        },
      ]
    };
  },

  methods: {

  }
};
</script>

<style>
.fill-information {
  float: left;
}
.footer-save {
  padding: 7px 51px;
  margin-top: 20px;
  float: left;
}
.Acommitment {
  width: 100%;
  background: #f2f6fe;
  border: 1px solid #aec7ff;
  border-radius: 2px;
  padding: 32px 0 32px 68px;
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
  top: 99px;
  width: 22%;
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
  padding-bottom: 35px;
}
.user-name-block {
  float: left;
  margin-top: 20.5px;
}
.head-portrait-user-name img {
  width: 105px;
  height: 105px;
  display: inline-block;
  border: 0;
  border-radius: 50%;
  background: red;
  float: left;
  margin-right: 30px;
}
.cardTitle {
  font-size: 20px;
  color: #191919;
}
</style>

