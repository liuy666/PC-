<template>
    <div id="v_container" :style="styleObj"></div>
</template>

<script>
    import {GVerify} from '../../libs/common';
    export default {
        name: "graphic-code",
        props:['gwidth','gheight'],
        computed:{
            styleObj(){
                return{
                    width: this.gwidth+'px',
                    height: this.gheight+'px'
                }
            },
        },
        mounted(){
            this.verifyCode = new GVerify("v_container");
        }
    }
</script>

<style scoped>

</style>