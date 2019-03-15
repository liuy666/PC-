
<template>
<div>
  <Row>
      <Card>
          <Breadcrumb separator=">" :style="{margin: '24px 0'}">
              <BreadcrumbItem>我的账户</BreadcrumbItem>
              <BreadcrumbItem>财务管理</BreadcrumbItem>
              <BreadcrumbItem>预付款账户</BreadcrumbItem>
              <BreadcrumbItem>开通预付款账户</BreadcrumbItem>
          </Breadcrumb>
          <Row :style="{borderBottom:'1px dashed #dcdee2',paddingLeft:'100px'}">
            <Col span="24" :style="{marginTop:'20px'}">
                <span>用户编号：</span>
                <span >{{this.$route.query.usid?this.$route.query.usid:''}}</span>
            </Col>
            <Col span="24" :style="{marginBottom:'20px',marginTop:'20px'}">
                <span>用户昵称：</span>
                <span >{{this.$route.query.userName?this.$route.query.userName:''}}</span>
            </Col>
            <Col span="24" :style="{marginBottom:'20px'}">
                <span>公司名称：</span>
                <span >{{this.$route.query.corpname?this.$route.query.corpname:''}}</span>
            </Col>
        </Row>　
        <Row :style="{borderBottom:'1px dashed #dcdee2',paddingLeft:'100px',marginTop:'20px'}">
            <Col span="24" :style="{marginBottom:'20px'}">
                <span>余额预警值：</span>
                 <InputNumber :max="9999999" :min="0" v-model="warmVal" placeholder="请输入余额预警值" :style="style"></InputNumber>
            </Col>
        </Row>　 
         <Row :style="{marginTop:'20px',fontSize:'16px',textAlign:'center'}" >
              <Button type="primary" shape="circle" :style="[styleW,styleR]" @click="save">提交</Button>
              <Button  shape="circle" :style="[styleW]" @click="$router.back(-1)">取消</Button>
         </Row>
      </Card>
  </Row>
</div>
    
</template>

<script>
export default {
  data () {
    return {
      style: { width: '220px', marginLeft: '10px' },
      styleW: { width: '60px', height: '30px' },
      styleR: { marginRight: '10px' },
      warmVal: 0,
      token: sessionStorage.getItem("name"),
    };
  },
  methods: {
    async save () {
      if (!this.warmVal) {
        this.$Modal.warning({
          title: '温馨提示',
          content: '余额预警值不能为空'
        });
        return false;
      }
      try {
        var url = `${this.fm}/finance/advancePay/advancePayCreate/${this.$route.query.marketplaceId}/${this.$route.query.merchantId}/${this.$route.query.consumerId}`;
        url += '?' + this.QS.stringify({
          access_token: this.token,
          warningAmount: this.warmVal
        });
        this.$http.post(url).then(res => {
          var data = res.data;
          if (data.return_code === 'SUCCESS') {
            this.$router.push({ path: '/Advance', query: this.$route.query });
          } else if (data.return_code === 'FAIL') {
            if (data.return_msg) {
              this.$Modal.warning({
                title: '温馨提示',
                content: data.return_msg
              });
            } else {
              this.$Modal.warning({
                title: '温馨提示',
                content: '开通失败'
              });
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

 <style lang="less" scoped>
.ivu-modal-body {
  padding: 0px;
}
//复选框样式
.ivu-checkbox-group {
  display: inline-block;
  margin-left: 15px;
}
.ul {
  overflow: hidden;
  width: 450px;
  span {
    float: left;
    border: 1px solid #dddddd;
    width: 40px;
    line-height: 30px;
    text-align: center;
  }
}
</style>

<style scoped>
.bodyTit >>> .ivu-radio-wrapper {
  min-height: 30px !important;
}
</style>
