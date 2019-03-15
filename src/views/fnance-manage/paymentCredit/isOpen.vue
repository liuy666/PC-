
<template>
<div>
    <div class="isopen">{{this.$route.query._PAY=='CREDIT_PAY'?'未开通授信账户':'未开通预付款账户'}} 
      <span @click="goToOpen">去开通</span>
      <Button  shape="circle" :style="{width:'55px',marginLeft:'10px'}" @click="$router.back(-1)">返回</Button>
    </div>  
</div>
    
</template>

<script>
export default {
  methods: {
    goToOpen () {
      var path = '';
      if (this.$route.query.pathType === 'credit') {
        path = '/openCredit';
      } else {
        path = '/openAdvance';
      }
      this.$router.push({
        path: path,
        query: {
          usid: this.$route.query.usid,
          type: this.$route.query,
          marketplaceId: this.$route.query.marketplaceId,
          merchantId: this.$route.query.merchantId,
          No: this.$route.query.No,
          userName: this.$route.query.userName,
          corpname: this.$route.query.corpname,
          consumerId: this.$route.query.consumerId,
          scenicareacode: this.$route.query.scenicareacode,
          agentCode: this.$route.query.agentCode
        }
      });
    }
  }
};
</script>

 <style lang="less" scoped>
.isopen {
  background: #fff;
  padding: 20px;
  font-size: 16px;
  color: #666;
  border: 1px solid #efefef;
  span {
    color: #4e81f0;
    cursor: pointer;
  }
}
</style>


