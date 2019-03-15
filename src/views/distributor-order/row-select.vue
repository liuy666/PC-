<style lang="less" scoped>

</style>

<template>
    <div>
        <Select :value="timeId" style="width:160px">
            <Option v-for="(item,idx) in list" :value="item.value" :key="idx">{{ item.label }}</Option>
        </Select>
    </div>
</template>

<script>
    export default {
        name: 'rowSelect',
        data() {
            return {
                model1: 2,
                list: [
                    {
                        value: 1,
                        label: '1212'
                    },
                     {
                        value: 2,
                        label: '2232'
                    }
                ]
            }
        },
        mounted() {
            // console.log(this.optionList);
            // console.log(this.timeId);
        },
        computed: {
            timeId() {
                let ticketInfo = this.$store.state.distributorOrder.ticketInfo,
                    currRow = ticketInfo.filter(item => {
                        return item.ticketId === this.ticketId
                    });
                // console.log(ticketInfo)
                // console.log(currRow)
                return currRow[0].time;
            }
        },
        props: {
            ticketId: {
                type: Number
            },
            optionList: {
                type: Array,
                default: []
            }
        },
        methods: {

        }
    }
</script>
