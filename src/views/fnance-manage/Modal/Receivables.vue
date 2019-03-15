
<template>
  <div>
      <Modal v-model="isreceivables" :styles="{ width: '1200px'}" :closable="false" :mask-closable="false">
        <div >
          <div style="cursor:default;">
              <div class="title">
                  确认收款
              </div>
              <div class="w_query">
                <Row>
                  <Col span="8">
                      <span>单号：</span>
                      <span>43242353464565654645</span>
                  </Col>   
                <Col span="8">
                      <span>创建时间：</span>
                      <span>2018-80-14</span>
                  </Col> 
                  <Col span="8">
                      <span>结算状态：</span>
                      <span>已付款</span>
                  </Col> 
                  <Col span="8">
                      <span>下级代理商：</span>
                      <span>2018-80-14</span>
                  </Col> 
                  <Col span="8">
                      <span>应结算金额：</span>
                      <span>10元</span>
                  </Col>
                  </Row> 
              </div>
              <div class="table">
                  <Table border :columns="columnsTit" :data="columnsData">
                  </Table>
              </div>
          </div>
        </div>
        <div slot="footer" style="text-align:center">
            <Row >
                <Col span="24" >
                    <Button  shape="circle" :style="[styleR,styleW]"  @click="cacle">取消</Button>
                    <Button type="primary" shape="circle" :style="styleW80">确认收款</Button>
                </Col>
            </Row>
        </div>
    </Modal>
  </div>   
</template>

<script>

export default {
  props: {
    receivablesBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      styleW:{ width: '60px', height: '30px' },
      styleW80: { width: '80px', height: '30px' },
      styleR: { marginRight: '10px' },
      isreceivables: false,
      columnsTit: [
        {
          title: '收款银行',
          key: 'bank',
          align: 'center'
        },
        {
          title: '收款银行开户名',
          key: 'bankName',
          align: 'center'
        },
        {
          title: '收款银行账号',
          key: 'bankNum',
          align: 'center'
        },
        {
          title: '银行流水号',
          key: 'bankSerail',
          align: 'center'
        },
        {
          title: '付款金额',
          key: 'money',
          align: 'center'
        }

      ],
      columnsData: [
        {
          bank: '1',
          bankName: '张三',
          bankNum: 'Lake Park',
          bankSerail: '服务商',
          money: '188'
        }
      ]
    };
  },
  watch: {
    receivablesBtn (TF) {
      this.isreceivables = TF;
    }
  },
  methods: {
    cacle () {
      this.isreceivables = false;
      this.$emit('receivablesBtnFn', this.tisreceivables);
    }
  }
};
</script>

 <style lang="less" scoped>
.title {
  line-height: 60px;
  width: 100%;
  background: #eef2fb;
  color: #1c2438;
  font-size: 16px;
  text-align: center;
}
.w_query {
  padding: 30px 20px;
  span {
    font-size: 14px;
  }
}
.table {
  padding: 0px 20px 30px;
  .ivu-table-cell {
    padding: 0;
  }
}
</style>


