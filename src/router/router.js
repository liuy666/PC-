// 左侧菜单路由，用于登录后，需要根据不同角色控制菜单权限的路由--个人用户路由
export const personalUserRoutes = {
  path: '/my-personalUser',
  name: 'personalUserHome',
  redirect: '/my-personalUser/MyETravelAgent',
  meta: {
    dutyId: 11000
  },
  component: () =>
    import('@/views/my-personalUser/personalUserHome.vue'),
  children: [{
      path: '/my-personalUser/MyOrder', //我的订单
      name: 'MyOrder',
      meta: {
        dutyId: 11001
      },
      component: () =>
        import('@/views/my-personalUser/orderCenterPages/MyOrder/MyOrder.vue')
    },
    {
      path: '/my-personalUser/MyUnsubscribe', //我的退订
      name: 'MyUnsubscribe',
      meta: {
        dutyId: 11002
      },
      component: () =>
        import('@/views/my-personalUser/orderCenterPages/MyUnsubscribe/MyUnsubscribe.vue')
    },
    {
      path: '/my-personalUser/MyOrderForm', //订单金额表
      name: 'MyOrderForm',
      meta: {
        dutyId: 11003
      },
      component: () =>
        import('@/views/my-personalUser/orderCenterPages/MyOrderForm/MyOrderForm.vue')
    },
    {
      path: '/my-personalUser/MyInformation', //我的信息
      name: 'MyInformation',
      meta: {
        dutyId: 11004
      },
      component: () =>
        import('@/views/my-personalUser/informationManagementPages/MyInformation/MyInformation.vue')
    },
    {
      path: '/my-personalUser/changePassword', //修改密码
      name: 'changePassword',
      meta: {
        dutyId: 11005
      },
      component: () =>
        import('@/views/my-personalUser/securityCenterPages/changePassword/changePassword')
    },
    {
      path: '/my-personalUser/frequentContacts', //常用联系人
      name: 'frequentContacts',
      meta: {
        dutyId: 11006
      },
      component: () =>
        import('@/views/my-personalUser/informationManagementPages/frequentContacts/frequentContacts')
    },
    {
      path: '/my-personalUser/MyOrderDetailsPage', //常用联系人
      name: 'MyOrderDetailsPage',
      meta: {
        dutyId: 11007
      },
      component: () =>
        import('@/views/my-personalUser/orderCenterPages/MyOrderDetailsPage/MyOrderDetailsPage')
    },
    {
      path: '/my-personalUser/personalData', //常用联系人
      name: 'personalData',
      meta: {
        dutyId: 11008
      },
      component: () =>
        import('@/views/my-personalUser/informationManagementPages/personalData/personalData')
    },
    {
      path: '/my-personalUser/MyETravelAgent',
      name: 'MyETravelAgent', //我的易旅宝
      meta: {
        dutyId: 11009
      },
      component: () =>
        import('@/views/my-personalUser/orderCenterPages/MyETravelAgent/MyETravelAgent')

    },
    {
      path: '/my-personalUser/DetailsMyCancellation',
      name: 'DetailsMyCancellation', //我的退订详情
      meta: {
        dutyId: 11010
      },
      component: () =>
        import('@/views/my-personalUser/orderCenterPages/DetailsMyCancellation/DetailsMyCancellation')

    },
    {
      path: '/my-personalUser/distributorDetails', //我的订单详情
      name: 'distributorDetails',
      meta: {
        dutyId: 11011
      },
      component: () =>
        import('@/views/my-personalUser/orderCenterPages/distributorDetails/distributorDetails')
    },
    {
      path: '/my-personalUser/myDeal', //我的交易
      name: 'my-deal',
      meta: {
        dutyId: 11012
      },
      component: () =>
        import('@/views/my-personalUser/settlementManagement/myDeal/my-deal')
    },
    {
      path: '/my-personalUser/myDealDetail', //我的交易详情
      name: 'my-deal-detail',
      meta: {
        dutyId: 11013
      },
      component: () =>
        import('@/views/my-personalUser/settlementManagement/myDeal/my-deal-detail')
    },
    {
      path: '/my-personalUser/myBankCard', //我的银行卡
      name: 'my-bank-card',
      meta: {
        dutyId: 11014
      },
      component: () =>
        import('@/views/my-personalUser/settlementManagement/myBankCard/my-bank-card')
    },

  ]
};

// 左侧菜单路由，用于登录后，需要根据不同角色控制菜单权限的路由--分销商路由
export const appRoutes = {
  path: '/my-account',
  name: 'myAccount',
  meta: {
    dutyId: 12000
  },
  redirect: '/my-account/purchaseOrder',
  component: () =>
    import('@/views/my-account/my-account.vue'),
  children: [
    /**
     * 分销商--用户信息
     */
    {
      path: '/my-account/my-profile',
      name: 'my-profile',
      title: '我的资料',
      meta: {
        dutyId: 12001
      },
      component: () =>
        import('@/views/my-account/user-info/my-profile.vue')
    },
    {
      path: '/my-account/update-password',
      name: 'update-password',
      title: '修改密码',
      meta: {
        dutyId: 12002
      },
      component: () =>
        import('@/views/my-account/user-info/update-password.vue')
    },
    /**
     * 分销商--产品管理
     */
    {
      path: '/my-account/productInformation', //产品信息
      meta: {
        dutyId: 12003
      },
      name: 'productInformation',
      title: '产品信息',
      component: () =>
        import('@/views/my-account/productManagementPages/productInformation/productInformation.vue')
    },
    /**
     * 分销商--店铺管理
     */
    {
      path: '/my-account/myStore', //我的店铺
      meta: {
        dutyId: 12003
      },
      name: 'myStore',
      title: '我的店铺',
      component: () =>
        import('@/views/my-account/storeManagement/myStore.vue')
    },
    {
      path: '/my-account/myProduct', //我的产品
      meta: {
        dutyId: 12003
      },
      name: 'myProduct',
      title: '我的店铺',
      component: () =>
        import('@/views/my-account/storeManagement/myProduct.vue')
    },
    /**
     * 分销商--订单管理
     */
    {
      path: '/my-account/SOSalesOrder', //销售订单
      name: 'SOSalesOrder',
      title: '销售订单',
      meta: {
        dutyId: 12004
      },
      component: () =>
        import('@/views/my-account/orderManagementPages/SOSalesOrder/SOSalesOrder')
    },
    {
      path: '/my-account/purchaseOrder', //采购订单
      name: 'purchaseOrder',
      title: '采购订单',
      meta: {
        dutyId: 12005
      },
      component: () =>
        import('@/views/my-account/orderManagementPages/purchaseOrder/purchaseOrder.vue')
    },
    {
      path: '/my-account/ARefundOrders', //采购退款订单
      meta: {
        dutyId: 12006
      },
      name: 'ARefundOrders',
      title: '采购退款订单',
      component: () =>
        import('@/views/my-account/orderManagementPages/ARefundOrders/ARefundOrders.vue')
    },
    {
      path: '/my-account/SalesRefundOrder', //销售退款订单
      name: 'SalesRefundOrder',
      title: '销售退款订单',
      meta: {
        dutyId: 12007
      },
      component: () =>
        import('@/views/my-account/orderManagementPages/SalesRefundOrder/SalesRefundOrder')
    },
    // 修改订单统计 链到添加分销商分组页面
    {
      path: '/my-account/OrderForm', //订单金额表
      title: '订单金额表',
      meta: {
        dutyId: 12008
      },
      name: 'OrderForm',
      component: () =>
        import('@/views/my-account/orderManagementPages/OrderForm/OrderForm')
    },
    {
      path: '/my-account/distributionSummary', //分销商网上出票汇总
      name: 'distributionSummary',
      title: '分销商网上出票汇总',
      meta: {
        dutyId: 12009
      },
      component: () =>
        import('@/views/my-account/orderManagementPages/distributionSummary/distributionSummary.vue')
    },
    {
      path: '/my-account/OrderChangeStatistics', //订单变化统计
      meta: {
        dutyId: 12010
      },
      title: '订单变化统计',
      name: 'OrderChangeStatistics',
      component: () =>
        import('@/views/my-account/orderManagementPages/OrderChangeStatistics/OrderChangeStatistics')
    },
    /**
     * 合作伙伴
     */
    {
      path: '/my-account/MySupplier', //我的供应商
      meta: {
        dutyId: 12011
      },
      name: 'MySupplier',
      title: '我的供应商',
      component: () =>
        import('@/views/my-account/cooperativePartnerPages/MySupplier/MySupplier.vue')
    },
    {
      path: '/my-account/distributor', //我的分销商
      name: 'distributor',
      title: '我的分销商',
      meta: {
        dutyId: 12012
      },
      component: () =>
        import('@/views/my-account/cooperativePartnerPages/distributor/distributor.vue')
    },
    {
      path: '/my-account/distributorGroup', //分销商分组
      meta: {
        dutyId: 12013
      },
      name: 'distributorGroup',
      title: '分销商分组',
      component: () =>
        import('@/views/my-account/cooperativePartnerPages/distributorGroup/distributorGroup.vue')
    },
    {
      path: '/my-account/addDistributorGroups', //新增分销商分组
      meta: {
        dutyId: 12014
      },
      title: '新增分销商分组',
      name: 'addDistributorGroups',
      component: () =>
        import('@/views/my-account/cooperativePartnerPages/addDistributorGroups/addDistributorGroups.vue')
    },
    {
      path: '/my-account/editDistributorGroups/:id', //修改分销商分组
      meta: {
        dutyId: 12014
      },
      title: '修改分销商分组',
      name: 'editDistributorGroups',
      component: () =>
        import('@/views/my-account/cooperativePartnerPages/addDistributorGroups/addDistributorGroups.vue')
    },
    {
      path: '/my-account/configurationProduct/:id', //配置产品
      meta: {
        dutyId: 12015
      },
      title: '配置产品',
      name: 'configurationProduct',
      component: () =>
        import('@/views/my-account/cooperativePartnerPages/configurationProduct/configurationProduct.vue')
    },
    /**
     * 不在菜单显示的其他路由
     */
    {
      path: '/my-account/orderDetails', //订单详情
      name: 'orderDetails',
      title: '订单详情',
      meta: {
        dutyId: 12016
      },
      component: () =>
        import('@/views/my-account/orderManagementPages/orderDetails/orderDetails.vue'),
    },
    {
      path: '/my-account/MySalesOrder', //采购退款订单详情
      name: 'MySalesOrder',
      title: '采购退款订单详情',
      meta: {
        dutyId: 12017
      },
      component: () =>
        import('@/views/my-account/orderManagementPages/MySalesOrder/MySalesOrder')
    },
    {
      path: '/my-account/pushMembers', //团队成员
      meta: {
        dutyId: 12018
      },
      title: '团队成员',
      name: 'pushMembers',
      component: () =>
        import('@/views/my-account/orderManagementPages/pushMembers/pushMembers')
    },

    {
      path: '/my-account/MyARefundOrders', //退款订单详情
      meta: {
        dutyId: 12019
      },
      title: '退款订单详情',
      name: 'MyARefundOrders',
      component: () =>
        import('@/views/my-account/orderManagementPages/MySalesOrder/MyARefundOrders')
    },
    {
      path: '/my-account/reviseOrderStatistics', //修改订单统计
      meta: {
        dutyId: 0
      },
      title: '修改订单统计',
      name: 'reviseOrderStatistics',
      component: () =>
        import('@/views/my-account/orderManagementPages/reviseOrderStatistics/reviseOrderStatistics')
    },
    //fjy 财务管理--分销商
    {
      path: '/fnance-manage/distribution',
      meta: {
        dutyId: 1208
      },
      title: '分销账户管理',
      name: 'distribution',
      component: () =>
        import('@/views/fnance-manage/distribution/disCredit')
    },
    //供应商
    {
      path: '/fnance-manage/supCredit',
      meta: {
        dutyId: 1208
      },
      title: '供应账户管理',
      name: 'supCredit',
      component: () =>
        import('@/views/fnance-manage/Supplier/supCredit')
    },
    //是否开户
    {
      path: '/isopen',
      meta: {
        dutyId: 1209
      },
      title: '分销账户管理',
      name: 'isopen',
      component: () =>
        import('@/views/fnance-manage/paymentCredit/isOpen.vue')
    },

    //授信
    {
      path: '/credit',
      meta: {
        dutyId: 1210
      },
      title: '分销账户管理',
      name: 'credit',
      component: () =>
        import('@/views/fnance-manage/paymentCredit/credit.vue')
    },
    //开通授信
    {
      path: '/openCredit',
      meta: {
        dutyId: 1211
      },
      title: '分销账户管理',
      name: 'openCredit',
      component: () =>
        import('@/views/fnance-manage/paymentCredit/openCredit.vue')
    },
    //预付款
    {
      path: '/Advance',
      meta: {
        dutyId: 1211
      },
      title: '分销账户管理',
      name: 'Advance',
      component: () =>
        import('@/views/fnance-manage/paymentCredit/Advance.vue')
    },
    //开通预付款
    {
      path: '/openAdvance',
      meta: {
        dutyId: 1211
      },
      title: '分销账户管理',
      name: 'openAdvance',
      component: () =>
        import('@/views/fnance-manage/paymentCredit/openAdvance.vue')
    },
    {
      path: '/fnance-manage/accountsDue',
      meta: {
        dutyId: 1212
      },
      title: '应收款账单',
      name: 'accountsDue',
      component: () =>
        import('@/views/fnance-manage/paymentCredit/accountsDue')
    },
    {
      path: '/fnance-manage/accountsDueDetail',
      meta: {
        dutyId: 1212
      },
      title: '应收款账单详情',
      name: 'accountsDueDetail',
      component: () =>
        import('@/views/fnance-manage/paymentCredit/accountsDueDetail')
    },
    {
      path: '/fnance-manage/AccountsPay',
      meta: {
        dutyId: 1213
      },
      title: '应付款账单',
      name: 'AccountsPay',
      component: () =>
        import('@/views/fnance-manage/paymentCredit/AccountsPay')
    },
    {
      path: '/fnance-manage/AccountsPayDetail',
      meta: {
        dutyId: 1214
      },
      title: '应付款账单详情',
      name: 'AccountsPayDetail',
      component: () =>
        import('@/views/fnance-manage/paymentCredit/AccountsPayDetail')
    },
    {
      path: '/fnance-manage/payInfoSubmit',
      meta: {
        dutyId: 1215
      },
      title: '应付款信息提交',
      name: 'payInfoSubmit',
      component: () =>
        import('@/views/fnance-manage/paymentCredit/payInfoSubmit')
    },
  ]
};

// 主页路由，用于登录前，不需要控制菜单权限的路由
export const otherRoutes = {
  path: '/',
  name: 'Box',
  redirect: '/index_home',
  component: () =>
    import('@/App.vue'),
  children: [
	  {
    path: '/',
    name: 'App',
    redirect: '/index_home',
    component: () =>
      import('@/views/Main.vue'),
    children: [
      // 有banner的页面
      {
        path: '/banner_main',
        name: 'banner_main',
        redirect: '/index_home',
        component: () =>
          import('@/views/Main/bannerMain.vue'),
        children: [
			{
				path: '/_bannerMain',
				name: '_bannerMain',
				redirect: '/index_home',
				component: () => import('@/views/Main/_bannerMain.vue'),
				children: [
					{
						path: '/index_home',
						name: 'index_home',
						title: '首页',
						component: () => import('@/views/Main/home.vue')
					},
					{
						path: '/ticket',
						name: 'ticket',
						title: '景区门票',
						component: () => import('@/views/Main/ticket.vue')
					},
					{
						path: '/travel',
						name: 'travel',
						title: '旅游攻略',
						component: () => import('@/views/Main/travel.vue')
					},
					{
						path: '/information',
						name: 'information',
						title: '新鲜资讯',
						component: () => import('@/views/Main/information.vue')
					}
				]
			},
			personalUserRoutes
        ]
      },
      // 没有banner的页面
      {
        path: '/other_main',
        name: 'other_main',
        redirect: '/index_home',
        component: () =>
          import('@/views/Main/otherMain.vue'),
        children: [
          // 底部链接
          {
            path: '/links',
            name: 'links',
            tilte: '站内地图',
            component: () =>
              import('@/views/bottomLink/links.vue'),
            children: [{
                path: '/article/:id',
                name: 'article',
                component: () =>
                  import('@/views/bottomLink/article.vue')
              },
              {
                path: '/list/:listId',
                name: 'list',
                component: () =>
                  import('@/views/bottomLink/list.vue')
              }
            ]
          },
          // 文章详情页
          {
            path: '/articleDetail/:aId',
            name: 'articleDetail',
            component: () =>
              import('@/views/detailPage/articleDetail.vue')
          },
          {
            path: '/ticketDetailPage/:id',
            name: 'ticketDetailPage',
            component: () =>
              import('@/views/travel-offcial-network/detailsPages/ticketDetailPage.vue'),
            props: true
          },
          {
            path: '/stepFirst',
            name: 'firstStepOfTicketPay',
            component: () =>
              import('@/views/travel-offcial-network/ticketPayment/firstStepOfTicketPay.vue'),
          },
          // 分销商下单
          {
            path: '/distributor-order',
            name: 'distributor-order',
            meta: {
              dutyId: 12020
            },
            redirect: '/distributor-order/order-choose',
            component: () =>
              import('@/views/distributor-order/order-steps.vue'),
            children: [{
                path: 'order-choose',
                name: 'order-choose',
                meta: {
                  dutyId: 12021
                },
                component: () =>
                  import('@/views/distributor-order/order-choose.vue')
              },
              {
                path: 'order-confirm',
                name: 'order-confirm',
                meta: {
                  dutyId: 12022
                },
                component: () =>
                  import('@/views/distributor-order/order-confirm.vue')
              }
            ]
          },
          {
            path: '/registration/tourist',
            name: 'tourist',
            component: () =>
              import('@/views/registration/tourist.vue'),
          },
          {
            path: '/registration/touristPaswd',
            name: 'touristPassword',
            component: () =>
              import('@/views/registration/touristPassword.vue'),
          },
          {
            path: '/registration/touristPaswd2',
            name: 'touristPassword2',
            component: () =>
              import('@/views/registration/touristPassword2.vue'),
          },
          {
            path: '/registration/touristPaswd3',
            name: 'touristPassword3',
            component: () =>
              import('@/views/registration/touristPassword3.vue'),
          },
          {
            path: '/registration/touristPaswd4',
            name: 'touristPassword4',
            component: () =>
              import('@/views/registration/touristPassword4.vue'),
          },
          {
            path: '/registration/memberCla',
            name: 'membershipClause',
            component: () =>
              import('@/views/registration/membershipClause.vue'),
          },
        ]
      },
      appRoutes,
    ]
  }],
};


//登录注册路由
export const loginRoutes = {
  // path: '/registration',
  // name: 'hdFt',
  // component: () => import('@/views/registration/hdFt.vue'),
  // children:[
  //     {
  path: '/registration/login',
  name: 'login',
  component: () =>
    import('@/views/registration/login.vue'),
  //     }
  // ]
};

//404路由
export const notFound = {
  path: '*',
  name: 'notFound',
  component: () =>
    import('@/views/registration/notFound.vue'),
};


export const routes = [
  otherRoutes,
  loginRoutes,
  notFound
];