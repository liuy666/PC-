<template>
    <div class="purchaseOrder">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>

		<!-- <Breadcrumb separator=">" :style="{margin: '24px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>我的账户</BreadcrumbItem>
            <BreadcrumbItem>订单管理</BreadcrumbItem>
            <BreadcrumbItem>销售订单</BreadcrumbItem>
            <BreadcrumbItem>订单详情</BreadcrumbItem>
        </Breadcrumb> -->


        <!-- <radioTable 
                :colname="colnames"
                :total='total'
                :tableData="tableData"
                :loading="isLoading"
                @changePage="handleChangePage"></radioTable> -->
	<!-- 订单明细 -->
			<Table 
				:columns="colnames" 
				:data="tableData"></Table>
                    <Button type="primary">打印订单</Button>

        <p slot="title" class="cardTitle">
            <span>订单明细</span>
        </p>        
        <p slot="title" class="amend-cardTitle">
            <span>订单备注：修改备注</span>
        </p>
                <!-- <radioTable 
                :colname="colnames1"
                :total='total'
                :tableData="tableData1"
                :loading="isLoading"
                @changePage="handleChangePage"></radioTable> -->
				<Table 
				:columns="colnames1" 
				:data="tableData1"></Table>
                    <Button type="primary">修改联系人</Button>
                    <Button type="primary">全部退订</Button>
				<Table 
				:columns="colnames2" 
				:data="tableData2"></Table>
		<!--  -->
	<!-- 订单处理详情列表 -->
        <p slot="title" class="cardTitle">
            <span>订单处理详情列表</span>
        </p>
			<Table 
			:columns="colnames3" 
			:data="tableData3"></Table>		
	<!-- 游客信息4 -->
        <p slot="title" class="cardTitle">
            <span>游客信息</span>
        </p>
			<Table 
			:columns="colnames4" 
			:data="tableData4"></Table>	
	<!-- 游客信息5 -->
        <p slot="title" class="cardTitle">
            <span>游客信息</span>
        </p>
			<Table 
			:columns="colnames5" 
			:data="tableData5"></Table>
    </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      isShowLoading: false,
      isRadio: true,
      isLoading: false,
      modal10: false,
      animal: "爪哇犀牛",
      formDatas: {
        placeholder: "",
        xxxx: ""
      },
      formItemList: [
        {
          keyName: "xxx2",
          type: 4,
          label: "订单状态",
          optionList: [
            {
              value: "1111",
              label: "122"
            }
          ]
        },
        {
          keyName: "placeholder",
          type: 1,
          label: "指定订单号"
        },
        {
          keyName: "placeholder",
          type: 1,
          label: "领票(联系人)"
        },
        {
          keyName: "placeholder",
          type: 1,
          label: "产品信息"
        },
        {
          keyName: "placeholder",
          type: 11,
          label: "最新更新时间",
          double: true,
          isShowOptions: true
        }
      ],
      colnames: [
        {
          title: "供应商订单号：201807200000000008",
          key: "list"
        },
        {
          title: "订单状态：已支付（温馨提示：退款详情查看订单变更详情信息）",
          key: "age"
        }
      ],
      total: 0,
      // key值
      tableData: [
        {
          list: "关联订单号：2018072000000000008"
        },
        {
          list: "关联订单号：2018072000000000008"
        }
      ],
      //
      colnames1: [
        {
          title: "服务商：剑门关旅游开发股份有限公司",
          key: "list"
        },
        {
          title: "买家：张三",
          key: "age"
        },
        {
          title: " ",
          key: "null"
        }
      ],
      tableData1: [
        {
          list: "游览日期：2018-07-20"
        },
        {
          list: "段先生",
          age: "领票人证件号码：110101199201014512",
          null: "领票人手机号码：13813811381"
        }
      ],
      colnames2: [
        {
          title: "产品名",
          key: "productName",
		  align:'center',
		  render: (h, params) => {
			  return h('div',[
				  h(
					  'span',
					  {
						  props: {
							  type: 'text',
							  size:'small'
						  },
						  style: {
							  color: '#4E81F0'
						  },
					  },'名字（实名制）'),
			  ])
		  }
        },
        {
          title: "游览日期",
          key: "age"
        },        
		{
          title: "入园时段",
          key: "timeFrame",
		  width: 200
        },
		{
          title: "产品",
          key: "product",
		  width: 240
        },
		{
          title: "单价",
          key: "unitPrice",
		  width: 90
        },
		{
          title: "数量",
          key: "quantity",
		  width: 70
        },
		{
          title: "佣金",
          key: "commission",
		  width: 70
        },
		{
			title:'金额',
			key:'price',
		  	width: 90
		}
      ],
      tableData2: [
        {
          productName: "",
          age: "2018-07-20",
          timeFrame: "景区营业时间内全天有效",
          product: "门票+名（实名制）【全价票】",
          unitPrice: "￥0.02",
          quantity: "2",
          commission: "2",
		  price: '￥0.02'
        },
      ],
      colnames3: [
        {
          title: "产品名",
          key: "productName",
		  align:'center',
		  render: (h, params) => {
			  return h('div',[
				  h(
					  'span',
					  {
						  props: {
							  type: 'text',
							  size:'small'
						  },
						  style: {
							  color: '#4E81F0',
							  marginRight:'20px'
						  },
					  },'服务商：剑门关旅游开发股份有限公司'),
					  h(
					  'span',
					  {
						  props: {
							  type: 'text',
							  size:'small'
						  },
						  style: {
							  color: '#4E81F0',
							  marginRight:'20px'
						  },
					  },'订单类型：预定订单'),
					  h(
					  'span',
					  {
						  props: {
							  type: 'text',
							  size:'small'
						  },
						  style: {
							  color: '#4E81F0',
							  marginRight:'20px'
						  },
					  },'单次游览日期：2018-7-20'),					  
					  h(
					  'span',
					  {
						  props: {
							  type: 'text',
							  size:'small'
						  },
						  style: {
							  color: '#4E81F0',
							  marginRight:'20px'
						  },
					  },'金额：￥0.00'),					  
					  h(
					  'span',
					  {
						  props: {
							  type: 'text',
							  size:'small'
						  },
						  style: {
							  color: '#4E81F0',
							  marginRight:'20px'
						  },
					  },'支付金额：￥0.00'),
			  ])
		  }
        },
		{
          title: "单价",
          key: "unitPrice",
		  width: 90
        },
		{
          title: "数量",
          key: "quantity",
		  width: 70
        },
		{
          title: "佣金",
          key: "commission",
		  width: 70
        },
		{
			title:'金额',
			key:'price',
		  	width: 90
		}
      ],
      tableData3: [
        {
          productName: "",
          unitPrice: "￥0.02",
          quantity: "2",
          commission: "2",
		  price: '￥0.02'
        },
      ],
      colnames4: [
        {
          title: "姓名：",
          key: "name",
        },
        {
          title: "游览日期：",
          key: "IDNumber"
        },        
		{
          title: "入园时段：",
          key: "phone",
        },
      ],
      tableData4: [
        {
          name: "强强强",
          IDNumber: "42070000060006",
          phone: "13477073304",
        },
      ],
      colnames5: [
        {
          title: "处理时间",
          key: "name",
        },
        {
          title: "处理信息",
          key: "IDNumber"
        },        
		{
          title: "处理人",
          key: "phone",
        },
      ],
      tableData5: [
        {
          name: "2018-07-20 11:54:50",
          IDNumber: "预定时间",
          phone: '66666fd',
        },
        {
          name: "2018-07-20 11:54:50",
          IDNumber: "预定时间",
          phone: '66666fd',
        },
      ],
    };
  },
  async created() {},
  methods: {
    handleQuery() {},
    handleChangePage() {}
  }
};
</script>

<style>
.cardTitle {
  font-size: 16px;
  color: #4e81f0;
  margin: 20px 0;
  font-weight: 600;
}
.amend-cardTitle {
  margin-bottom: 15px;
}
.ivu-btn-primary {
  background: none;
  color: #2d8cf0;
}
.ivu-breadcrumb>span:last-child {
    color: #4E81F0
}

</style>
