<template>
    <div class="scope-container clearAll">
        <router-link :to="{name:componentName,params:{id:id}}">
        <img :src="src">
        <article>
            <h3 v-html="title" class="SHCN-M"></h3>
            <span class="date" v-html="date+'发布'"></span>
            <p v-html="article"></p>
        </article>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "littleArticle",
        props:['title','date','article','id','componentName','src']
    }
</script>

<style scoped>
    .scope-container{
        margin-bottom: 32.7px;
        /*overflow: hidden;*/
    }



    img{
        width: 200px;
        height: 166.3px;
        margin-right: 40px;
        background: #ccc;
    }

    article,img{
        float: left;
    }

    article{
        width: 960px;
    }

    h3{
        font-size: 16px;
        color: #191919;
        height: 16px;
        line-height: 1;
        margin-bottom: 8px;
    }

    span.date{
        display: inline-block;
        font-size: 12px;
        color: #AFB0B3;
        height: 12px;
        line-height: 1;
        margin-bottom: 16px;
    }

    p{
        font-size: 14px;
        color: #5E5E60;
        line-height: 20px;
    }
</style>