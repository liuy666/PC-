<style lang="less">
@import '../../assets/iconfont/iconfont.css';
#my-account {
    background: #f5f8fb;
    overflow: hidden;
    .row {
        width: 1200px;
        min-width: 1200px;
        margin: 20px auto;
        max-width: 1440px;
        background: #fff;
        .menu {
            min-height: 1000px;
            .ivu-menu {
                // padding-bottom: 50px;
                .removePadding {
                    padding: 0 !important;
                    background-color: rgba(255, 255, 255, 1);
                    a {
                        display: block;
                        height: 40px;
                        line-height: 40px;
                        padding-left: 26.5%; /*63px  1920分辨率*/
                        font-size: 14px;
                        color: #666666;
                    }
                }
            }
        }
        .content {
            min-height: 1000px;
            // min-width: 1280px;
            padding: 0 30px;
            background-color: rgba(255, 255, 255, 1);
            border-left: 1px solid #dcdee2;
        }
        .ivu-menu-item {
            &-active {
                background-color: rgba(238, 242, 251, 1) !important;
                // &:after {
                //   position: absolute;
                //   top: 0;
                //   right: 0;
                //   content: "";
                //   width: 4px;
                //   height: 40px;
                //   background-color: #4e81f0;
                // }
            }
            a:hover {
                background-color: rgba(238, 242, 251, 1) !important;
            }
            .router-link-active {
                background-color: rgba(238, 242, 251, 1) !important;
                position: relative;
                color: #4e81f0 !important;
                &:after {
                    position: absolute;
                    top: 0;
                    left: 0;
                    content: "";
                    width: 4px;
                    height: 40px;
                    background-color: #4e81f0;
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
}
.content {
  min-height: 1000px;
  // min-width: 1280px;
  padding: 0 30px;
  background-color: rgba(255, 255, 255, 1);
  /*border-left: 1px solid #DBDBDE;*/
}
.ivu-menu-item {
  .router-link-active {
    background-color: rgba(238, 242, 251, 1) !important;
    position: relative;
    color: #4e81f0 !important;
    // &:after {
    //   position: absolute;
    //   top: 0;
    //   right: 0;
    //   content: "";
    //   width: 4px;
    //   height: 40px;
    //   background-color: #4e81f0;
    // }
  }
}
.left-menu-title {
  height: 40px;
  line-height: 40px;
  padding-left: 18%; /*43px  1920分辨率*/
  background-color: #4e81f0;
  color: rgba(255, 255, 255, 1);
  &-small {
    margin-left: 4px;
    font-size: 16px;
    font-weight: bold;
    font-family: SourceHanSansCN-Bold;
    letter-spacing: 1px;
  }
  &-children {
    padding: 13px 0;
    background-color: rgba(255, 255, 255, 1);
  }
  .ivu-icon {
    position: relative;
    bottom: 1px;
  }
}
</style>

<template>
	<div id="my-account">
        <Row class="row">
            <!-- 左侧菜单 -->
            <Col span="4" class-name="menu">
                <Menu theme="light" width="300px;">
                    <!-- 后面应改成由实际路由表遍历生成 -->
                    <Submenu name="1">
                        <template slot="title">
                            <Icon custom="iconfont icon-icon_a2" />
                            用户信息
                        </template>
                        <MenuItem name="1-1" class="removePadding">
                            <router-link :to="{name: 'my-profile'}">我的资料</router-link>
                        </MenuItem>
                        <MenuItem name="1-3" class="removePadding">
                            <router-link :to="{name: 'update-password'}">修改密码</router-link>
                        </MenuItem>
                    </Submenu>
                    <!-- <div>
                        <div class="left-menu-title">
                            <Icon type="logo-buffer" size="16"/>
                            <span class="left-menu-title-small">产品管理</span>
                        </div>
                        <div class="left-menu-title-children">
                            <MenuItem name="2-1" class="removePadding">
                                <router-link :to="{name: 'productInformation'}">产品预定</router-link>
                            </MenuItem>
                        </div>
                    </div> -->
                    <Submenu name="3" v-if="ustp !== '03'">
                        <template slot="title">
                            <Icon custom="iconfont icon-icon_a6" />
                            店铺管理
                        </template>
                        <MenuItem name="3-1" class="removePadding">
                            <router-link :to="{name: 'myStore'}">我的店铺</router-link>
                        </MenuItem>
                        <MenuItem name="3-2" class="removePadding">
                            <router-link :to="{name: 'myProduct'}">我的产品</router-link>
                        </MenuItem>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            <Icon custom="iconfont icon-icon_a3" />
                            采购管理
                        </template>
                        <MenuItem name="4-1" class="removePadding">
                            <router-link :to="{name: 'productInformation'}">产品预定</router-link>
                        </MenuItem>
                        <MenuItem name="4-2" class="removePadding">
                            <router-link :to="{name:'purchaseOrder'}">采购订单</router-link>
                        </MenuItem>
                        <MenuItem name="4-3" class="removePadding">
                            <router-link :to="{name:'ARefundOrders'}">采购退款订单</router-link>
                        </MenuItem>
                    </Submenu>
                    <Submenu name="5">
                        <template slot="title">
                            <Icon custom="iconfont icon-icon_a_sel6" />
                            销售管理
                        </template>
                        <MenuItem name="5-1" class="removePadding">
                            <router-link :to="{name:'SOSalesOrder'}">销售订单</router-link>
                        </MenuItem>
                        <MenuItem name="5-2" class="removePadding">
                            <router-link :to="{name: 'SalesRefundOrder'}">销售退款订单</router-link>
                        </MenuItem>
                    </Submenu>
                    <Submenu name="6">
                        <template slot="title">
                            <Icon custom="iconfont icon-icon_a_sel" />
                            统计分析
                        </template>
                        <MenuItem name="6-1" class="removePadding">
                            <router-link :to="{name: 'distributionSummary'}">销售出票汇总</router-link>
                        </MenuItem>
                        <MenuItem name="6-2" class="removePadding">
                            <router-link :to="{name: 'reviseOrderStatistics'}">销售退款订单统计</router-link>
                        </MenuItem>
                        <MenuItem name="6-3" class="removePadding">
                            <router-link :to="{name: 'OrderChangeStatistics'}">订单变更统计</router-link>
                        </MenuItem>
                        <MenuItem name="6-4" class="removePadding">
                            <router-link :to="{name: 'OrderForm'}">订单变更明细</router-link>
                        </MenuItem>
                    </Submenu>
                    <Submenu name="7">
                        <template slot="title">
                            <Icon custom="iconfont icon-icon_a1" />
                            合作伙伴
                        </template>
                        <MenuItem name="7-1" class="removePadding">
                            <router-link :to="{name: 'MySupplier'}">我的供应商</router-link>
                        </MenuItem>
                        <MenuItem name="7-2" class="removePadding" v-if="ustp !== '03'">
                            <router-link :to="{name: 'distributor'}">我的分销商</router-link>
                        </MenuItem>
                        <MenuItem name="7-3" class="removePadding" >
                            <router-link :to="{name: 'distributorGroup'}">分销商分组</router-link>
                        </MenuItem>
                    </Submenu>
                    <Submenu name="8" :style="{display:'none'}">
                        <template slot="title">
                            <Icon custom="iconfont icon-icon_a1" />
                            结算管理
                        </template>
                        <MenuItem name="8-1" class="removePadding">
                            <a href="https://jicheng.upaypal.cn" target="_blank">查看余额</a>
                        </MenuItem>
                        <MenuItem name="8-2" class="removePadding">
                            <a href="https://jicheng.upaypal.cn" target="_blank">充值</a>
                        </MenuItem>
                        <MenuItem name="8-3" class="removePadding">
                            <a href="https://jicheng.upaypal.cn" target="_blank">提现</a>
                        </MenuItem>
                        <MenuItem name="8-4" class="removePadding">
                            <a href="https://jicheng.upaypal.cn" target="_blank">收支明细</a>
                        </MenuItem>
                    </Submenu>
                    <Submenu name="9">
                        <template slot="title">
                            <Icon custom="iconfont icon-icon_a_sel1" />
                            财务管理
                        </template>
                        <MenuItem name="9-1" class="removePadding">
                            <router-link :to="{name: 'distribution'}">分销账户管理</router-link>
                        </MenuItem>
                        <MenuItem name="9-2" class="removePadding">
                            <router-link :to="{name: 'accountsDue'}">应收款账单</router-link>
                        </MenuItem>
                        <MenuItem name="9-3" class="removePadding"> 
                            <router-link :to="{name: 'supCredit'}">供应账户管理</router-link>
                        </MenuItem>
                        <MenuItem name="9-4" class="removePadding">
                            <router-link :to="{name: 'AccountsPay'}">应付款账单</router-link>
                        </MenuItem>
                            <MenuItem name="9-5" class="removePadding">
                            <a href="https://jicheng.upaypal.cn" target="_blank">支付中心</a>
                        </MenuItem>
                    </Submenu>
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
export default {
  computed: {
    ustp () {
      return sessionStorage.getItem('ustp')
    }
  },
  methods: {

  }
}
</script>