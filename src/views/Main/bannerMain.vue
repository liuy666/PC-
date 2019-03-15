<template>
    <div id="bannerMain">
        <!-- 导航 -->
        <nav class="nav-main nav-position">
            <Menu mode="horizontal" :active-name="menuIndex" class="nav-ul" @on-select="handleSelect">
                <MenuItem name="1" >首页</MenuItem>
                <MenuItem name="2" >门票</MenuItem>
                <MenuItem name="3" >攻略</MenuItem>
                <MenuItem name="4" >资讯</MenuItem>
            </Menu>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'bannerMain',
        data() {
            return {
                homePage: {
                    name: 'index_home'
                }
            }
        },
        created() {
            // console.log(this.$route);
            // 如果路由带有query参数，并且fxsId存在，则显示分销商店铺数据
            let query = this.$route.query;
            if(Object.keys(query).length && query.fxsId) {
                sessionStorage.setItem('fxsId', query.fxsId);
            }
        },
        computed: {
            menuIndex() {
                return String(this.$store.state.app.menuIndex);
            },
            gotoWhere() {
                return this.$store.state.app.route;
            },
            home() {
                return sessionStorage.getItem('fxsId') ? {
                    ...this.homePage,
                    query: {
                        fxsId: sessionStorage.getItem('fxsId')
                    }
                } : this.homePage;
            }
        },
        methods: {
            // 选择菜单（MenuItem）时触发
            handleSelect(name) {
                this.$store.commit('setMenuIndex',name);

                switch(name){
                    case "1":
                        this.$router.push(this.home);
                        break;
                    case "2":
                        this.$router.push({name:this.gotoWhere});
                        break;
                    case "3":
                        this.$router.push({name:'travel'});
                        break;
                    case "4":
                        this.$router.push({name:'information'});
                        break;
                    default:
                        break;

                }
            },
            toPage(num){
                console.log(num);
            },
        }
    }
</script>

<style lang="less" scoped>
    #bannerMain {
        position: relative;
        .nav-position {
            position: absolute;
            top: -47px;
            left: 0;
            right: 0;
        }
    }
</style>
