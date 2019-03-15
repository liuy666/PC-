export default {
  // 授信---业务类别
  credit(type) {
    switch (type) {
      case 'TRADE':
        return '交易';
        break;
      case 'CREDITADD':
        return '授信增额';
        break;
        case 'CREDITREDUCE':
          return '授信减额';
          break;
      case 'REFUND':
        return '退款';
        break;
      case 'SETTLECYCLE':
        return '结算确认循环授信';
        break;
      default:
        return '';
    }
  },
  advance(type) {
    switch (type) {
      case 'TRADE':
        return '交易';
        break;
      case 'CREDITADD':
        return '预付款收取登记';
        break;
      // case 'CREDITREDUCE':
      //   return '预付款减额';
      //   break;
      case 'REFUND':
        return '退款';
        break;
      case 'SETTLECYCLE':
        return '结算确认循环授信';
        break;
      default:
        return '';
    }
  },
  // 应收款账单---结算状态
  account(type) {
    switch (type) {
      case 'PENDING':
        return '待结算';
        break;
      case 'PARTIAL_PAY':
        return '已部分付款';
        break;
      case 'FULL_PAY':
        return '已付款';
        break;
      case 'FINISHED':
        return '确认完成';
        break;
      case 'REFUND':
        return '退款';
        break;
      default:
        return '';
    }
  },
  // 收入---交易状态/订单状态
  income(type) {
    switch (type) {
      case 'PENDING':
        return '待付款';
        break;
      case 'TOBECONFIRM':
        return '已付款待确认';
        break;
      case 'SUCCESS':
        return '交易成功';
        break;
      case 'CLOSE':
        return '交易关闭';
        break;
      case 'REFUNDED':
        return '退款撤单';
        break;
      case 'OUT_DATED':
        return '失效';
        break;
      default:
        return '';
    }
  },
  // 退款---退款状态
  refund(type) {
    switch (type) {
      case 'PENDING':
        return '退款中';
        break;
      case 'SUCCESS':
        return '退款成功';
        break;
      case 'FAILD':
        return '退款失败';
        break;
      case 'INVALID':
        return '失效';
        break;
      default:
        return ' ';
    }
  },
  // 销售收款---交易状态
  sale(type) {
    switch (type) {
      case 'PENDING':
        return '待付款';
        break;
      case 'TOBECONFIRM':
        return '已付款待确认';
        break;
      case 'SUCCESS':
        return '交易成功';
        break;
      case 'FALSE':
        return '交易失败';
        break;
      case 'CLOSE':
        return '交易结束不可再操作';
        break;
      case 'REEFUNDED':
        return '退款撤单';
        break;
      case 'OUT_DATED':
        return '失效';
        break;
      default:
        return '';
    }
  },
  // 通道---支付状态
  payState(type) {
    switch (type) {
      case 'PENDING':
        return '未支付';
        break;
      case 'PARTIAL_PAY':
        return '部分支付';
        break;
      case 'PAID':
        return '已完成支付';
        break;
      case 'INVALID':
        return '失效';
        break;
      case 'FALSE':
        return '支付失效';
        break;
      default:
        return ' ';
    }
  },
  // 通道---退款状态
  refundState(type) {
    switch (type) {
      case 'NO_REFUND':
        return '无退款';
        break;
      case 'REFUNDING':
        return '退款中';
        break;
      case 'REFUNDED':
        return '退款结束';
        break;
      default:
        return ' ';
    }
  },
  // 通道---支付类型
  payStyle(type) {
    switch (type) {
      case 'IN_FULL':
        return '全额支付';
        break;
      case 'FREE_INSTALMENTS':
        return '分步支付';
        break;
      case 'PREAUTHORIZATION':
        return '预授权';
        break;
      case 'BY_INSTALMENT_SCHEDULE':
        return '分期支付';
        break;
      case 'NO_CREDIT':
        return '白条支付';
        break;
      default:
        return ' ';
    }
  },
  // 通道---业务类型
  BusinessType(type) {
    switch (type) {
      case 'TRADE':
        return '交易订单';
        break;
      case 'REFUND':
        return '退款单';
        break;
      case 'CHARGE':
        return '充值单';
        break;
      case 'AGENCY':
        return '代付单';
        break;
      case 'TRANSFER':
        return '转账单';
        break;
      case 'WITHDRAW':
        return '提现单';
        break;
      case 'TRAVELIN':
        return '旅游卡入园订单';
        break;
      case 'PAYMENT':
        return '支付单';
        break;
      case 'BAAPAYMENT':
        return '代扣单';
        break;
      default:
        return '';
    }
  },
  // 收款设置---支付渠道
  paySoure(type) {
    switch (type) {
      case 'WXPAY':
        return '支付宝';
        break;
      case 'WXMPPAY':
        return '微信支付';
        break;
      case 'ALIPAY':
        return '微信公众号支付';
        break;
      case 'CPCN':
        return '中金支付';
        break;
      case 'UNIONPAY':
        return '银联';
        break;
      default:
        return '';
    }
  },
  // 收款设置---应用场景
  AppScene(type) {
    switch (type) {
      case 'ALL':
        return '不限';
        break;
      case 'B2B':
        return '企业网银';
        break;
      case 'B2C':
        return '个人网银';
        break;
      case 'QPAY':
        return '快捷支付';
        break;
      default:
        return '';
    }
  },
  // 收款设置---状态
  state(type) {
    switch (type) {
      case 'OPENED':
        return '已开通';
        break;
      case 'NONACTIVEED':
        return '未开通';
        break;
      default:
        return '';
    }
  },
  // 报表---时间
  time(type) {
    switch (type) {
      case 'MONTH':
        return '按月';
        break;
      default:
        return '';
    }
  }
};