import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from '@/router/router.js';
import Cookie from 'js-cookie';
import iView from 'iview';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'hash',
  	routes
});

export default router;


// 路由前置守卫
router.beforeEach((to, from, next) => {
	// console.log(to);
	// console.log(from);
	if(to.meta.dutyId >= 11000 && to.meta.dutyId < 11099) {
		if(!sessionStorage.getItem('userName')) {
			iView.Modal.error({
				title: '温馨提示',
				width: 500,
				content: '请登录后再继续操作！',
				onOk: () => {
                    router.push({
						name: 'login'
					});
				}
			});
			next(false);
		} else if(sessionStorage.getItem('lgtp') !== '01') {
			let nextRoute = sessionStorage.getItem('fxsId') ? {
				path: '/index_home',
				query: {
					fxsId: sessionStorage.getItem('fxsId')
				}
			} : {
				path: '/index_home'
			};
			iView.Modal.error({
				title: '温馨提示',
				width: 500,
				content: '您不是散客用户，请停止非法的访问！',
                onOk: () => {
                    router.push(nextRoute);
                }
			});
			next(false);
		} else {
			next();
		}
	} else if(to.meta.dutyId >= 12000 && to.meta.dutyId < 12099) {
		if(!sessionStorage.getItem('userName')) {
			iView.Modal.error({
				title: '温馨提示',
				width: 500,
				content: '请登录后再继续操作！',
                onOk: () => {
                    router.push({
                        name: 'login'
                    });
                }
			});
			next(false);
		} else if(sessionStorage.getItem('lgtp') !== '02') {
			let nextRoute = sessionStorage.getItem('fxsId') ? {
				path: '/index_home',
				query: {
					fxsId: sessionStorage.getItem('fxsId')
				}
			} : {
				path: '/index_home'
			};
			iView.Modal.error({
				title: '温馨提示',
				width: 500,
				content: '您不是分销商用户，请停止非法的访问！',
                onOk: () => {
                    router.push(nextRoute);
                }
			});
			next(false);
		} else {
			next();
		}
	} else {
		next();
	}
});

// 路由后置守卫
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
});

