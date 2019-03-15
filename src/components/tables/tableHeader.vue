
<template>
    <div class="title">
        <span class="w_Left fl">
            <span class="tit ">{{title}}</span>
            <span class="refeach cursor ">刷新</span>
        </span>
        <span class="w_Right fr">
            <!-- <span class="small">-</span>
            <span class="close">X</span> -->
        </span> 
    </div>
    
</template>

<script>

    export default {
        props: ['title'],
        data () {
            return {
                
            }
        },
        methods:{
          
        }
    }
</script>

 <style lang="less" scoped>
    .cursor{ cursor: pointer; }
    .fl{float:left}
    .fr{float:right}
    .title {
        height:50px;
        padding:0px 20px;
        border-bottom:1px solid #EFEFEF;
        .tit{
            margin-right:40px;
            font-size: 17px;
            color: #666666;
            margin-top:10px;
        }
        .refeach{
            display:inline-block;
            text-align: center;
            font-size: 12px;
            color: #5DB2FF;
            border:1px solid #5DB2FF;
            border-radius: 50px;
            width:70px;
            line-height:30px;
            margin-top:8px;
       }
       .w_Right{
           margin-top:15px;
           color:#999;
           font-size:14px;
            .small{
                font-size:18px;
                margin-right:10px;
            }
        }
        &:after{
            display:block;
            clear:both;
            content:"";
            visibility:hidden;
            height:0
        }
    }
    
</style>


