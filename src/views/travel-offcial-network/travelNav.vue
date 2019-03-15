<template>
    <div class="travelNav-scope">
        <nav class="nav-main">
            <Menu mode="horizontal" :active-name="activeName" class="nav-ul" @on-select="changeActiveName">
                <MenuItem name="1"  to="/travelNav/sowingMap/index">
                    首页
                </MenuItem>

                <MenuItem name="2"  :to="url">
                    门票
                </MenuItem>

                <MenuItem name="3"   to="/travelNav/strategy/travelStrategy">
                    攻略
                </MenuItem>
                <MenuItem name="4"   to="/travelNav/information/freshInfo">
                    资讯
                </MenuItem>
            </Menu>
        </nav>
        <router-view/>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        name: "travelNav",
            computed:{
                ...mapState({
                    activeName:state=>sessionStorage.getItem('activeName')||state.home.activeName
                }),
                url: function(){
                    let lgtp = sessionStorage.getItem('lgtp');
                    console.log(lgtp);
                    if(lgtp=== '02'){
                        return '/travelNav/commonTt/distributor-order/order-choose';
                    }
                    return '/travelNav/commonTt/allScenicSpots';
                }
            },

        methods:{
            ...mapMutations([
                'changeActiveName'
            ]),
            toThePage: function(value){
                this.$router.push({name:value});
            }
        }
    }
</script>

<style scoped lang="less">
    .travelNav-scope{
        .nav-main{
            font-family: 'SourceHanSansCN-Regular';
        }
    }
</style>