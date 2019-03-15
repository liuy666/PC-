<template>
    <div class="MyDistributor">
        <!-- <Breadcrumb separator=">" :style="{margin: '24px 0'}">
            <BreadcrumbItem>我的账户</BreadcrumbItem>
            <BreadcrumbItem>合作伙伴</BreadcrumbItem>
            <BreadcrumbItem>我的分销商</BreadcrumbItem>
        </Breadcrumb> -->
        <p slot="title" class="cardTitle">
            <span>联系信息</span>
        </p> 
        <Form :model="formRight" label-position="right" :label-width="100">
            <FormItem label="分社公司名称：">
                <Input v-model="formRight.input1" />
            </FormItem>
            <FormItem label="用户姓名：">
                <Input v-model="formRight.input2" />
            </FormItem>
            <FormItem label="用户名：">
                <Input v-model="formRight.input3" />
            </FormItem>
            <FormItem label="密码：">
                <Input v-model="formRight.input4" />
            </FormItem>
            <FormItem label="确认密码：">
                <Input v-model="formRight.input5" />
            </FormItem>
            <FormItem label="手机号码：">
                <Input v-model="formRight.input6" />
            </FormItem>
            <FormItem label="座机姓名：">
                <Input v-model="formRight.input7" />
            </FormItem>
            <FormItem label="内部编号：">
                <Input v-model="formRight.input8" />
            </FormItem>
            <Button type="primary">确定</Button>
            <Button type="ghost">取消</Button>
        </Form>

                <Table 
                :columns="colnames" 
                :data="tableData"></Table>

    </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      formRight: {
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
        input7: "",
        input8: ""
      },

      colnames: [
        {
          title: "分销商名称",
          key: "list",
        },
        {
          title: "姓名",
          key: "brokerage",
        },
        {
          title: "手机号",
          key: "settlementPrice",
        },
        {
          title: "操作",
          key: "operation",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    display: "inline-block",
                    marginRight: "15px"
                  },
                  on: {
                    click: () => {
                      // this.show(params.index);
                    }
                  }
                },
                "添加分组"
              ),
            ]);
          }
        }
      ],
      total: 0,
      // key值
      tableData: [
        {
          list: "测试旅游社有限责任公司",
          brokerage: "破皮",
          settlementPrice: "134770733333",
          operation: ""
        }
      ]
    };
  },
  methods: {
    handleChangePage() {}
  }
};
</script>

<style scoped>
.ivu-breadcrumb > span:last-child {
  color: #4e81f0;
}
.ivu-breadcrumb {
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 10px;
}

.cardTitle {
  font-size: 16px;
  font-weight: 600;
  color: black;
}
</style>
