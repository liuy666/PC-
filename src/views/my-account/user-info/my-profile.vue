<style scoped lang="less">
</style>

<template>
    <div id="myProfile">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <div style="min-height:1000px;">
			<Breadcrumb separator=">" :style="{margin: '24px 0'}">
				<BreadcrumbItem>我的账户</BreadcrumbItem>
				<BreadcrumbItem>用户信息</BreadcrumbItem>
				<BreadcrumbItem>我的资料</BreadcrumbItem>
			</Breadcrumb>
            <div slot="title" class="cardTitle1">
                <p>我的资料</p>
            </div>
            <detail-form
                :formDatas="formDatas"
                :formItemList="formItemList"
                btnName="确定"
                :isHasTable="false"
                :btnLabelWidth="220"
                :labelWidth="220"
                :ruleDatas="ruleDatas"
                @getFormData="handleSubmit"></detail-form>
        </div>
    </div>
</template>

<script>
export default {
  name: "my-profile",
  data () {
    return {
      isShowLoading: false,
      formDatas: {
        lname: "",
        lgtp: "",
        mobile: "",
        email: "",
        // text: "** 如需修改手机号、邮箱",//暂时隐藏因为跳转的链接无法用当前账号登录
        // tourlicensecode: '', // 旅行社许可证号不能为空
        businesslicensescode: '', // 营业执照号码不能为空
        corpname: '', // 所属公司名称不能为空
        addr: '',
        postno: '',
        telno: '',
        faxno: '',
        qq: '',
        bname: '',
        bank: '',
        account: '',
        lastdate: '',
        logtimes: '',
        ldate: '',
        lpdate: ''
      },
      ruleDatas: {
        lname: [
          {
            required: true,
            message: "注册人姓名不能为空",
            trigger: "blur"
          }
        ],
        // tourlicensecode: [
        // 	{
        // 		required: true,
        // 		message: "旅行社许可证号不能为空",
        // 		trigger: "blur"
        // 	}
        // ],
        businesslicensescode: [
          {
            required: true,
            message: "营业执照号码不能为空",
            trigger: "blur"
          }
        ],
        corpname: [
          {
            required: true,
            message: "所属公司名称不能为空",
            trigger: "blur"
          }
        ]
      },
      formItemList: [
        {
          label: "注册人姓名",
          type: 1,
          keyName: "lname"
        },
        {
          label: "注册类别", // （01：散客，02：旅行社）
          type: 8,
          keyName: "lgtp"
        },
        {
          label: "手机号码",
          type: 8,
          keyName: "mobile",
          // btnName: "验证手机"
        },
        {
          label: "Email",
          type: 8,
          keyName: "email",
          // btnName: "验证Email"
        },
        // {
        // 	label: "",
        // 	type: 8.2,
        // 	keyName: "text",
        // 	href: "https://www.upaypal.net",
        // 	// aText: "请点击这里"//暂时隐藏因为跳转的链接无法用当前账号登录
        // },
        // {
        // 	label: "旅行社许可证号",
        // 	type: 1,
        // 	keyName: "tourlicensecode"
        // },
        {
          label: "营业执照号码",
          type: 1,
          keyName: "businesslicensescode"
        },
        {
          label: "所属公司",
          type: 1,
          keyName: "corpname"
        },
        {
          label: "联系地址",
          type: 1,
          keyName: "addr"
        },
        {
          label: "邮编",
          type: 1,
          keyName: "postno"
        },
        {
          label: "座机号码",
          type: 1,
          keyName: "telno"
        },
        {
          label: "传真",
          type: 1,
          keyName: "faxno"
        },
        {
          label: "QQ",
          type: 1,
          keyName: "qq"
        },
        {
          label: "开户人",
          type: 1,
          keyName: "bname"
        },
        {
          label: "开户行",
          type: 1,
          keyName: "bank"
        },
        {
          label: "银行账号",
          type: 1,
          keyName: "account"
        },
        {
          label: "上次登录时间",
          type: 8,
          keyName: "lastdate"
        },
        {
          label: "共登录次数",
          type: 8,
          keyName: "logtimes"
        },
        {
          label: "注册日期",
          type: 8,
          keyName: "ldate"
        },
        {
          label: "上次修改密码",
          type: 8,
          keyName: "lpdate"
        }
      ],
      saveData: null
    };
  },
  // 进入页面前获取数据进行页面初始化
  async created () {
    this.isShowLoading = true;
    const res = await this.$api.get(this.lee + '/ec/custom/getCustom', {
      usid: sessionStorage.getItem('userName'),
      info: 'info'
    });
    console.log(res);
    if (!res) {
      this.isShowLoading = false;
      return;
    }

    let data = res.data.custom;
    this.saveData = { ...data };
    for (let attr in this.formDatas) {
      for (let item in data) {
        if (attr === item) {
          this.formDatas[attr] = data[item];
        }
        if (attr === 'lgtp') {
          if (data[attr] === '01') {
            this.formDatas[attr] = '散客';
          }
          if (data[attr] === '02') {
            this.formDatas[attr] = '分销商';
          }
        }
      }
    }
    this.isShowLoading = false;
  },
  methods: {
    async handleSubmit () {
      this.isShowLoading = true;
      let bodyParams = null;
      for (let attr in this.formDatas) {
        if (this.formDatas[attr] === '散客') {
          bodyParams = Object.assign({}, bodyParams, {
            [attr]: '01'
          });
        } else if (this.formDatas[attr] === '旅行社') {
          bodyParams = Object.assign({}, bodyParams, {
            [attr]: '02'
          });
        } else if (attr !== 'text') {
          bodyParams = Object.assign({}, bodyParams, {
            [attr]: this.formDatas[attr]
          });
        }
      }
      console.log(bodyParams);
      bodyParams = Object.assign({}, this.saveData, bodyParams);
      const submit = await this.$api.put(this.lee + '/ec/custom/updateCustom', {
        usid: sessionStorage.getItem('userName'),
      }, bodyParams);
      console.log(submit);
      if (!submit) {
        this.isShowLoading = false;
        return;
      }

      const reQuery = await this.$api.get(this.lee + '/ec/custom/getCustom', {
        usid: sessionStorage.getItem('userName'),
        info: 'info'
      });
      console.log(reQuery);
      if (!reQuery) {
        this.$Modal.warning({
          title: '温馨提示',
          content: '用户信息保存成功已经成功，但重新查询时遇到异常，请刷新后查看'
        });
        this.isShowLoading = false;
        return;
      }

      this.$Modal.success({
        title: '操作成功',
        content: '用户信息保存成功'
      });
      this.isShowLoading = false;
    }
  }
}
</script>


