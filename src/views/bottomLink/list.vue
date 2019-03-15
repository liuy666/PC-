<style lang="less" scoped>
    #list {
        max-width: 100%;
        ul {
            width: 100%;
            padding-top: 40px;
            li {
                width: 92%;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 40px;
                font-size: 16px;
                border-bottom: 1px dashed #ccc;
                margin: 0 12px 12px 30px;
                overflow: hidden;
                a {
                    color: #191919;
                }
            }
        }
    }
</style>


<template>
    <div id="list">
        <ul>
            <li v-for="(item,idx) in list" :key="idx">
                <router-link :to="{ name: 'article', params: { id: item.amid}}">{{ item.amtopicf }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                getList: [],
            }
        },
        computed: {
            list() {
                return this.getList;
            }
        },
        watch: {
            '$route'(to) {
//                 console.log(to.params.listId)
                this.getLists(to.params.listId);
            }
        },
        async created() {
            let listId = this.$route.params.listId;
            // console.log(listId);
            this.getLists(listId);
        },
        methods: {
            async getLists(listId) {
                // console.log(1)
                const res = await this.$api.get2(this.lee + '/ec/articleManager/v1/list',{
                    page: 1,
                    pageSize: 10,
                    serverUrl: window.location.hostname,
                    cmid: listId
                });
                // console.log(res);

                this.getList = res.data.items;
            }
        }
    }
</script>