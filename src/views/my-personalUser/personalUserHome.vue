<style lang="less">
    @import '../../assets/iconfont/iconfont.css';
    #my-account {
        background: #f5f8fb;
        overflow: hidden;
        .row {
            width: 1200px;
            min-width: 1200px;
            margin: 20px auto;
            background: #fff;
            .menu {
                min-height: 1000px;
                // border-right: 1px solid #ccc;
                .ivu-menu {
                    // padding-bottom: 50px;
                    .removePadding {
                        padding: 0 !important;
                        background-color: rgba(255,255,255,1);
                        a {
                            display: block;
                            height: 40px;
                            line-height: 40px;
                            padding-left: 26.5%;      /*63px  1920分辨率*/
                            font-size: 14px;
                            color: #666666;
                        }
                    }
                }
            }
            .content {
                min-height: 1000px;
                padding: 0 30px;
                background-color: rgba(255,255,255,1);
                border-left: 1px solid #dcdee2
            }
            .ivu-menu-item {
                &-active {
                    background-color: rgba(238, 242, 251, 1) !important;
                }
                a:hover{
                    background-color: rgba(238,242,251,1) !important;
                }
                .router-link-active {
                    background-color: rgba(238,242,251,1) !important;
                    position: relative;
                    color: #4E81F0 !important;
                    &:after {
                        position: absolute;
                        top: 0;
                        left: 0;
                        content:"";
                        width: 4px;
                        height: 40px;
                        background-color: #4E81F0;
                    }
                }
            }
            .ivu-menu-submenu{
                &:hover{
                    color: #4e81f0 !important;
                }
                &-title{
                    color: #333333;
                    &:hover{
                        color: #4e81f0;
                    }
                }
            }
            .ivu-menu-child-item-active{
                .ivu-menu-submenu-title{
                    background: #fff !important;
                    color: #4e81f0 !important;
                }
                
            }
        }
        .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after{
            width: 0
        }
        // .ivu-menu-vertical.ivu-menu-light:after {
        //     content: '';
        //     display: block;
        //     width: 1px;
        //     height: 100%;
        //     background: #dcdee2;
        //     position: absolute;
        //     top: 0;
        //     bottom: 0;
        //     right: -1px;
        //     z-index: 1;
        // }
    }
    .left-menu-title {
        height: 40px;
        line-height: 40px;
        padding-left: 18%;    /*43px  1920分辨率*/
        background-color: #4E81F0;
        color:rgba(255,255,255,1);
        &-small {
            margin-left: 4px;
            font-size: 16px;
            font-weight: bold;
            font-family:SourceHanSansCN-Bold;
            letter-spacing: 1px;
        }
        &-children {
            padding: 13px 0;
            background-color: rgba(255,255,255,1);
        }
    }
</style>

<template>
	<div id="my-account">
        <Row class="row">
            <!-- 左侧菜单 -->
            <Col span="4" class-name="menu">
                <Menu 
                    theme="light"
                    width="300px;">
                    <!-- 后面应改成由实际路由表遍历生成 -->
                    <Submenu name="1">
                        <template slot="title">
                            <Icon custom="iconfont icon-icon_dingdanzhongxin" />
                            订单中心
                        </template>
                        <MenuItem name="1-1" class="removePadding">
                            <router-link :to="{name: 'MyETravelAgent'}">我的易旅通</router-link>
                        </MenuItem>
                        <MenuItem name="1-2" class="removePadding">
                            <router-link :to="{name: 'MyOrder'}">我的订单</router-link>
                        </MenuItem>
                        <MenuItem name="1-3" class="removePadding">
                            <router-link :to="{name: 'MyUnsubscribe'}">我的退订</router-link>
                        </MenuItem>
                        <!-- <MenuItem name="1-4" class="removePadding">
                            <router-link :to="{name: 'MyOrderForm'}">订单金额表</router-link>
                        </MenuItem> -->
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon custom="iconfont icon-icon_changyongxinxiguanli" />
                            常用信息管理
                        </template>
                        <MenuItem name="2-1" class="removePadding">
                            <router-link :to="{name: 'MyInformation'}">我的信息</router-link>
                        </MenuItem>
                        <MenuItem name="2-2" class="removePadding">
                            <router-link :to="{name: 'personalData'}">常用联系人</router-link>
                        </MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon custom="iconfont icon-icon_anquanzhongxin" />
                            安全中心
                        </template>
                            <MenuItem name="3-1" class="removePadding">
                                <router-link :to="{name:'changePassword'}">修改密码</router-link>
                            </MenuItem>
                    </Submenu>
                    <!-- <div>
                        <div class="left-menu-title">
                            <Icon type="ios-card" size="16"/>
                            <span class="left-menu-title-small">结算管理</span>
                        </div>
                        <div class="left-menu-title-children">
                            <MenuItem name="4-1" class="removePadding">
                                <a href="https://jicheng.upaypal.cn" target="_blank">查看余额</a>
                            </MenuItem>
                            <MenuItem name="4-2" class="removePadding">
                                <a href="https://jicheng.upaypal.cn" target="_blank">充值</a>
                            </MenuItem>
                            <MenuItem name="4-3" class="removePadding">
                                <a href="https://jicheng.upaypal.cn" target="_blank">提现</a>
                            </MenuItem>
                            <MenuItem name="4-4" class="removePadding">
                                <a href="https://jicheng.upaypal.cn" target="_blank">收支明细</a>
                            </MenuItem>
                            <MenuItem name="4-5" class="removePadding">
                                <router-link :to="{name:'my-deal'}">我的交易</router-link>
                            </MenuItem>
                            <MenuItem name="4-6" class="removePadding">
                                <router-link :to="{name:'my-bank-card'}">我的银行卡</router-link>
                            </MenuItem>
                        </div>
                    </div> -->
                </Menu>
            </Col>
            <!-- 右侧内容区 -->
            <Col span="20" class-name="content">
                <router-view></router-view>
            </Col>
        </Row>
        
        </div>
</template>

<script>
	export default {}
</script>