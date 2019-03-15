<template>
    <div>
      <Radio v-model="selectedNew"></Radio>
    </div>
</template>

<script>
    export default {
        name: "radio-com",
        props:['selected'],
        data(){
            return{
                selectedNew:''
            }
        },
        created(){
            this.selectedNew = this.selected;
        }
    }
</script>

<style scoped>

</style>
