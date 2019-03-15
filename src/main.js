import Vue from 'vue';
import App from './App.vue';
import Box from './Box.vue';
import router from './router/index.js';
import store from './store/store.js';
import common from './libs/common1.js';
import totalList from './libs/const.js';
import vfilters from '@/libs/filter.js';
import iView from 'iview';
import axios from 'axios';
import QS from 'qs';
// import $ from 'jquery';
import Cookie from 'js-cookie';
import globalComponents from './libs/globalComponent';
import handleTools from '@/libs/HandleTools.js';
import http from '@/libs/http.js';
import http2 from '@/libs/http2.js';
import req from '@/libs/req.js';
import reg from '@/libs/reg.js';
// import jianrong from '@/libs/jianrong.js';
import VueAMap from 'vue-amap';
import "babel-polyfill";
import './assets/fonts/SourceHansans-Bold/SourceHanSans-Bold.css';
import './assets/fonts/SourceHansans-Heavy/SourceHanSans-Heavy.css';
import './assets/fonts/SourceHansans-Light/SourceHanSans-Light.css';
import './assets/fonts/SourceHansans-Medium/SourceHanSans-Medium.css';
import './assets/fonts/SourceHansans-Normal/SourceHanSans-Normal.css';
import './assets/fonts/SourceHansans-Regular/SourceHanSans-Regular.css';
import 'iview/dist/styles/iview.css';
import './styles/ectrip.less';
import './styles/GlobalStyles.less';
import './styles/common_style.less';
import './styles/loginRegistra.less';
import './styles/bottomLink.less';
import './styles/dialog.less';

import sowingMap from './views/travel-offcial-network/sowingMap';
import graphicCode from './components/main-components/graphic-code.vue';
Vue.use(globalComponents);
Vue.use(iView);
Vue.prototype.$vfilters = vfilters;
Vue.prototype.baseURL = process.env.NODE_ENV === "production" ? '' : '/api';
Vue.prototype.baseEaApiURL = process.env.NODE_ENV === "production" ? '' : '/ecApi';
Vue.prototype.lee = process.env.NODE_ENV === "production" ? '' : '/lee';
Vue.prototype.fm = process.env.NODE_ENV === 'production' ? '' : '/fm';
Vue.prototype.$handle = handleTools;
Vue.prototype.$common = common;
Vue.prototype.$api = http;
Vue.prototype.$bApi = http2;
Vue.prototype.$req = req;
Vue.prototype.$reg = reg;
Vue.prototype.$http = axios;
Vue.prototype.$$totalList = totalList;
Vue.prototype.QS = QS;
Vue.prototype.Cookie = Cookie;
Vue.prototype.imgPath = 'http://zscw.yilvbao.cn/';


Vue.component('sowingMap', sowingMap);
Vue.component('graphic-code', graphicCode);

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '43dc89a281dc12fcdbbe4230a54f25b9',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});


new Vue({
  router,
  store,
  render: h => h(Box),
  mounted() {
    // 解決刷新后 vuex重置的问题。
    this.$store.commit('initMenuIndex');
    // 初始化门票页的路由
    this.$store.commit('initRoute');
    // 初始化底部链接的菜单name
	this.$store.commit('initLinksName');
	
    window.onresize = (e) => {
        let bannerPageList = ['ticket', 'travel', 'information', 'index_home'];
        if(this.$handle.isExist(router.history.current.name, bannerPageList)) {
			const currVideoWidth = document.querySelector('video').clientWidth;
			const storedVideoWidth = window.parseInt(sessionStorage.getItem('videoWidth'));
			const currWinWidth = document.documentElement.clientWidth;
			const storedWinWidth = window.parseInt(sessionStorage.getItem('winWidth'));
			// 如果是video全屏导致的窗口大小改变则不刷新
			if(currVideoWidth > storedVideoWidth && currVideoWidth === currWinWidth) {
				// console.log(currVideoWidth, storedVideoWidth,currWinWidth,storedWinWidth)
				// console.log(1)
				return;
			} else if (currVideoWidth === storedVideoWidth && currVideoWidth < currWinWidth && currWinWidth === storedWinWidth) {
				// console.log(currVideoWidth, storedVideoWidth,currWinWidth,storedWinWidth)
				// console.log(2)
				return;
			} else {
				// console.log(3)
				sessionStorage.setItem('winWidth',currWinWidth);
				// ff浏览器似乎有内部机制阻止了频率过高的 reload，造成不起作用的假象
				if(/firefox/.test(window.navigator.userAgent.toLowerCase())) {
					setTimeout(() => {
						window.location.reload();
					},500);
				} else {
					window.location.reload();
				}
			}
        }
    };
  }
}).$mount('#app');