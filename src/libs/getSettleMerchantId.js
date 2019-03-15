import axios from 'axios';
import Qs from 'qs';
export default {
  // 获取结算商户号ID
  async getId(agent, token, type) {
    var url = `${agent}/finance/basis/getSettleMerchantId`;
    url += '?' + Qs.stringify({
      access_token: token,
      type: type
    });
    var data = await axios.get(url).then(res => {
      return res.data
    }).catch(err => {
      return err
    });
    if (data.return_code === 'SUCCESS') {
      return [data.platformId, data.merchantId, data.consumerId];
    } else {
      alert(data.return_msg)
    }
  }
};