import _cookie from 'js-cookie';
const user = {
    state: {
        // 主页导航索引
        menuIndex: '',
        // 门票页的路由name
        route: '',
        // 底部链接当前导航索引
        currName: '',
        //登录用户名
        userName: '',
    },
    mutations: {
        setMenuIndex(state,val) {
            state.menuIndex = val;
            sessionStorage.setItem('meunIndex',val);
        },
        initMenuIndex(state) {
            state.menuIndex = sessionStorage.getItem('meunIndex') || '1';
        },
        // 需要首先判断本地存储是否有fsxId
        initRoute(state) {
            if(!sessionStorage.getItem('lgtp') || sessionStorage.getItem('lgtp') === '01') {
                state.route = 'ticket';
            } else {
                state.route = sessionStorage.getItem('route') || 'ticket';
            }
        },
        initLinksName(state) {
            state.currName = sessionStorage.getItem('currName') || '2';
        },
        // 需要首先判断本地存储是否有fsxId
        setRoute(state,val) {
            state.route = val;
        },
        setLinksName(state,val) {
            state.currName = val;
        },
        setUserName (state) {
            state.userName = sessionStorage.getItem('userName') || '';
        }
    }
};

export default user;