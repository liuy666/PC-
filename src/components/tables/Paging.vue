
<template>
    <div class="w_footer">
        <div class="footer">
            <div class="right"> <Page :total="totalPage" show-sizer show-elevator show-total  @on-change="pageChange" @on-page-size-change="pageSizeChange"  /></div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['totalPage'],
        methods:{
            pageChange(page){
                this.$emit('getPage',page,'');
            },
            pageSizeChange(pageSize){
                this.$emit('getPage','',pageSize);
            }
        }
    }
</script>

 <style lang="less" scoped>
  .w_footer{
        padding: 0 8px 0 30px;
       .footer{ 
            width:100%;
            padding:14px 0;
            display: flex;
            font-size:14px;
            color: #666666;
            .right{
                text-align: right;
                margin:0 auto;
            }
        }
    }
</style>


