<template>
    <div>
        <div class="common-tt">
            <h2 class="h2-tt SHCN-M" v-html="bigTitle"></h2>
            <div class="en-tt SHCN-H" v-html="enTitle"></div>
            <div class="en-little-tt" v-html="enLittleTitle"></div>
            <div class="triangle"></div>
            <router-view/>
        </div>
    </div>

</template>

<script>
    export default {
        name: "commonTt",
        props:['bigTitle','enTitle','enLittleTitle']
    }
</script>

<style scoped lang="less">
    @import "./common_tt.less";


</style>