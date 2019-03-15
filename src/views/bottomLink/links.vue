<template>
    <div id="links">
        <div class="wrap">
            <!-- <Breadcrumb class="">
                <BreadcrumbItem to="/travelNav/sowingMap/index">首页</BreadcrumbItem>
                <BreadcrumbItem>帮助中心</BreadcrumbItem>
                <BreadcrumbItem v-html="h2tt"></BreadcrumbItem>
            </Breadcrumb> -->

            <div class="links_main">
                <Menu :active-name="activeName" @on-select="changeActiveName" class="leftMenu">
                    <MenuItem name="2">订购指南</MenuItem>
                    <MenuItem name="3">注册与登录</MenuItem>
                    <MenuItem name="4">网上支付</MenuItem>
                    <MenuItem name="5">沟通与服务</MenuItem>
                    <MenuItem name="7">关于我们</MenuItem>
                    <MenuItem name="9">联系我们</MenuItem>
                    <MenuItem name="10">招聘英才</MenuItem>
                </Menu>
                <div class="right">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "links",
        data() {
            return {}
        },
        computed: {
            activeName() {
                return this.$store.state.app.currName; // sessionStorage.getItem('currName') ? sessionStorage.getItem('currName') : this.currName;
            }
        },
        created() {
            console.log(this.$route)
            if(!Object.keys(this.$route.query).length) {
                let type = this.$route.params.type;
                if(type === 'article') {
                    this.$store.commit('setLinksName',String(this.$route.params.obj.cmid));
                    sessionStorage.setItem('currName',String(this.$route.params.obj.cmid));
                    this.$router.push({
                        name: 'article',
                        params: {
                            id: this.$route.params.obj.amid
                        }
                    });
                }
                if(type === 'list') {
                    this.$store.commit('setLinksName',String(this.$route.params.listId));
                    sessionStorage.setItem('currName',String(this.$route.params.listId));
                    this.$router.push({
                        name: 'list',
                        params: {
                            listId: this.$route.params.listId
                        }
                    });
                }
            } else {
                let obj = JSON.parse(this.$route.query.obj),
                    type = obj.type;
                // console.log(this.$route)
                if(type === 'article') {
                    this.$store.commit('setLinksName',String(obj.cmid));
                    sessionStorage.setItem('currName',String(obj.cmid));
                    this.$router.push({
                        name: 'article',
                        params: {
                            id: obj.amid
                        }
                    });
                }
            }
        },
        watch: {
            '$route'(to,from) {
                console.log(from);
                console.log(to);
                if(from.name === 'article' && to.name === 'links' && to.params.type === 'article' && Object.keys(to.params.obj).length) {
                    this.$store.commit('setLinksName',String(to.params.obj.cmid));
                    sessionStorage.setItem('currName',String(to.params.obj.cmid));
                    this.$router.push({
                        name: 'article',
                        params: {
                            id: to.params.obj.amid
                        }
                    });
                }
            }
        },
        methods:{
            changeActiveName(name) {
                this.$store.commit('setLinksName',name);
                sessionStorage.setItem('currName',name);
                this.$router.push({
                    name: 'list',
                    params: {
                        listId: parseInt(name)
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">
    #links{
        background: #F5F8FB;
        padding: 40px 0;
        .wrap {
            width: 1200px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 4px;
            box-shadow: 1px 2px 4px rgba(0,0,0,.2);
            .links_main {
                overflow: hidden;
                .leftMenu {
                    float: left;
                    min-height: 800px;
                }
                .right {
                    float: left;
                    margin-left: 40px;
                    width: 75%;
                }
            }
        }
    }
</style>