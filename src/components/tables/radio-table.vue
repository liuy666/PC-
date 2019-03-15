<template>
    <div id="radioTable">
        
        <!-- 通用表格配置说明
        border：是否显示纵向边框，默认显示
        loading：表格是否加载中，默认关闭
        columns：表格列的配置描述
        data：显示的结构化数据
        row-class-name：行的 className 的回调方法，传入参数：row：当前行数据 index：当前行的索引
        on-row-click="selected：单击某一行时触发 -->
        <Table
            v-if="!isAddClickEvent"
            :border="isBorder"
            :size="tableSize"
            :stripe="isStripe"
            :loading="loading"
            :columns="colname"
            :data="tableDataNew"
            :row-class-name="rowClassName"
            @on-selection-change="selectHasChange"
            :show-header="isHideHeader"></Table>
            <!-- @on-row-click="selected" -->
        
        <Table 
            v-else
            :border="isBorder"
            :stripe="isStripe"
            :loading="loading"
            :columns="colname"
            :data="tableDataNew"
            :row-class-name="rowClassName"
            @on-row-click="selected"></Table>

        <!-- 分页器配置说明
        数据总数： total；
        当前页码，支持 .sync 修饰符： current
        每页条数： page-size
        每页条数切换的配置： page-size-opts，目前固定每页10页，可更改
        页码改变的回调，返回改变后的页码： on-change
        切换每页条数时的回调，返回切换后的每页条数： on-page-size-change -->
        <div class="page_content" v-if="isPage">
            <div class="page_button" v-if="total>0">
                <Page
                    :total="total"
                    :current="currentPage" 
                    :page-size="pageNumNew" 
                    :page-size-opts="pageNumSelect"
                    prev-text="上一页"
                    next-text="下一页"
                    @on-change="changePage" 
                    @on-page-size-change="changePageSize">
                </Page>
            </div>
            <!-- <div v-if="total>0" class="page_show">共{{pages}}页/{{total}}条数据</div>
            <div v-else class="page_show">暂无数据</div> -->
            <!--<div v-if="total>0 && total>=pageNumNew" class="page_show">-->
                <!--显示-->
                <!--<span class="show_span">{{ start }}</span>-->
                  <!-- - -->
                <!--<span class="show_span">{{ end }}</span>-->
                <!--项，共-->
                <!--<span class="show_span">{{ total }}</span>-->
                <!--项-->
            <!--</div>-->
            <!--<div v-else-if="total>0 && total<pageNumNew" class="page_show">-->
                <!--显示-->
                <!--<span class="show_span">{{ start }}</span>-->
                  <!-- - -->
                <!--<span class="show_span">{{ total }}</span>-->
                <!--项，共-->
                <!--<span class="show_span">{{ total }}</span>-->
                <!--项-->
            <!--</div>-->
            <!--<div v-else v-show="total>0" class="page_show">暂无数据</div>-->
        </div>
    </div>
</template>

<script>
import radiocom from './radio-com.vue';
export default {
  name: 'radio-table',
  components: {
    radiocom
  },
  props: {
    // 是否显示表头
    isHideHeader: {
      type: Boolean,
      default: true
    },
    // 是否为表格开头列添加单选框，默认不添加
    isRadio: {
      type: Boolean,
      default: false
    },
    // 是否显示纵向边框，默认添加
    isBorder: {
      type: Boolean,
      default: true
    },
    // 是否显示斑马纹
    isStripe: {
      type: Boolean,
      default: true
    },
    //表格大小
    tableSize: {
      type: String,
      default: 'default'
    },
    // 表头字段，必须传入配置数组
    colname: {
      type: Array,
      required: true
    },
    // 表格数据，必须传入数据数组
    tableData: {
      type: Array,
      required: true
    },
    // 数据总条数，必须传入，用于分页
    total: {
      type: Number,
      required: true
    },
    // 被监听的数据总条数，可选，用于解决分页器页码不更新，值和total相同
    watchTotal: {
      type: Number
    },
    // 分页器初始页码，默认显示第1页
    pageCode: {
      type: Number,
      default: 1
    },
    //每页条数，默认显示10条
    pageNum: {
      type: Number,
      default: 10
    },
    //设置每页条数，默认只能选10条，可传入数组更改，如:[10,15,20]
    pageNumSelect: {
      type: Array,
      default () {
        return [10]
      }
    },
    // 表格区域是否显示加载中状态
    loading: {
      type: Boolean,
      default: false
    },
    // 是否添加行点击事件
    isAddClickEvent: {
      type: Boolean,
      default: false
    },
    // 是否需要分页器
    isPage: {
      type: Boolean,
      default: true
    },
  },
  data () {
    return {
      start: 0,
      end: 0,
      currentPage: 1,
      pageNumNew: '',
      tableDataNew: []
    };
  },
  methods: {
    //多选，选项发生变化，返回已选择的数组
    selectHasChange (arr) {
      this.$emit('selectHasChange', arr)
    },

    // 父组件接收绑定selected事件,以便于拿到该行数据id进行操作
    selected (row, index) {

      for (let obj of this.tableDataNew) {
        obj._selected = false
      }
      this.tableDataNew[index]._selected = true;
      this.$emit('selected', this.tableDataNew[index])
    },

    //选择页码
    changePage (num) {
      this.currentPage = num;
      this.setEnd(num);
      //父组件接收当前页码
      this.$emit('changePage', num)
    },

    //选择每页可显示的最大数据条数
    changePageSize (num) {
      this.pageNumNew = num;
      this.setEnd(this.currentPage);
      //父组件接收每页条数
      this.$emit('changePageSize', num)
    },

    //表格正下方从几到几
    setEnd (current) {
      this.start = (current - 1) * this.pageNumNew + 1;
      this.end = current * this.pageNumNew;
      if (this.total > 0 && this.end > this.total) {
        this.end = this.total
      }
    },

    //深拷贝表格数据，并且给每一项赋selected属性
    deepCopy () {
      let arr = JSON.parse(JSON.stringify(this.tableData));
      for (let obj of arr) {
        obj._selected = false
      }
      this.tableDataNew = arr;
    },

    // 如果该行有byisuse字段且为值0，表示禁用，则该行显示灰色[该字段可以更改]
    rowClassName (row, index) {
      if (this.tableData.length > 0 && this.tableData[index].byisuse != undefined) {
        if (this.tableData[index].byisuse != 1) {
          return "row-disabled";
        }
      }
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.total / this.pageNumNew)
    }
  },
  watch: {
    // 传入数据数组时做深拷贝
    tableData () {
      this.deepCopy()
    },
    pageCode () {
      this.currentPage = this.pageCode;
      this.setEnd(this.pageCode)
    },
    watchTotal () {
      let current = this.$store.state.ticketManagement.currentPageNum;
      this.setEnd(current);
      this.currentPage = current;
    }
  },
  created () {
    this.currentPage = this.pageCode;
    this.pageNumNew = this.pageNum;
    this.setEnd(this.currentPage);
    this.deepCopy();
    for (let obj of this.colname) {
      obj.align = 'center'
    }
  },
  mounted () {
    // 如果添加isRadio且为true，且表格配置数组第一项的表头为空，则添加单选框
    if (this.isRadio && this.colname[0].title != ' ') {
      this.colname.unshift(
        {
          title: ' ',
          width: 60,
          align: 'center',
          fixed: 'left',
          render: (h, params) => {
            return h(radiocom, {
              props: {
                selected: params.row._selected
              }
            }, '');
          }
        }
      );
    }
  }
};
</script>

<style lang="less">
#radioTable {
  .ivu-radio-group {
    display: block;
  }
  .ivu-radio-wrapper {
    margin-right: 0;
  }
  .ivu-radio {
    margin-right: 0;
  }
  .ivu-page {
    &-item,
    &-prev,
    &-next {
      min-width: 24px;
      height: 24px;
      line-height: 24px;
      border-radius: 0;
      a {
        position: relative;
        top: -1px;
        margin: 0 6px;
      }
    }
    &-prev,
    &-next {
      border: 1px solid #dcdee2;
      padding: 0 2px;
      &:hover {
        border-color: #4e81f0;
        a {
          color: #4e81f0;
        }
      }
    }
    &-item {
      &:hover {
        border-color: #4e81f0;
        a {
          color: #4e81f0;
        }
      }
      &-active {
        background-color: #4e81f0;
        border-color: #4e81f0;
        a {
          color: #ffffff;
        }
        &:hover {
          border-color: #4e81f0;
          a {
            color: #ffffff;
          }
        }
      }
      &-jump-prev,
      &-jump-next {
        &:hover {
          a {
            color: #4e81f0;
          }
        }
      }
    }
    &-disabled {
      &:hover {
        border-color: #dcdee2;
        a {
          color: #ccc;
        }
      }
    }
    /*&-prev {*/
    /*min-width: 24px;*/
    /*height: 24px;*/
    /*line-height: 24px;*/
    /*border-radius: 0;*/
    /*a {*/
    /*position: relative;*/
    /*top: -1px*/
    /*}*/
    /*}*/
    /*&-next {*/
    /*min-width: 24px;*/
    /*height: 24px;*/
    /*line-height: 24px;*/
    /*border-radius: 0;*/
    /*a {*/
    /*position: relative;*/
    /*top: -1px*/
    /*}*/
    /*}*/
  }
}
</style>
