<template>
	<Spin fix size="large">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>加载中...</div>
    </Spin>
</template>

<script>
	export default {

	}
</script>

<style scoped lang="less">
	.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>
