<style lang="less" scoped>
    .baseStyle {
        line-height: 21px!important; 
        height: 23px!important; 
        width: 23px!important;
    }
    .incre {
        margin-left: 12px;
        background: #4e81f0  
    }
    .reduce {
        margin-right: 12px; 
    }
</style>

<template>
    <div>
        <Button 
            size='small'
            icon='md-remove'
            shape= "circle"
            @click="reduce"
            class="reduce baseStyle"></Button>
        <span>{{ amount }}</span>
        <Button 
            type='primary'
            size='small'
            icon='md-add'
            shape= "circle"
            @click="increase"
            class="incre baseStyle"></Button>
    </div>
    
</template>

<script>
    export default {
        name: 'Amount',
        data() {
            return {}
        },
        computed: {
            amount() {
                let currAmount = this.$store.state.distributorOrder.ticketInfo.filter(item => {
                    return item.ticketId === this.ticketId;
                })[0].amount;
                return currAmount;
            }
        },
        props: {
            ticketId: {
                type: Number
            }
        },
        methods: {
            increase() {
                this.$store.commit('increase',this.ticketId);
            },
            reduce() {
                this.$store.commit('reduce',this.ticketId);
            }
        }
    }
</script>

