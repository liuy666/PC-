import detailForm from '@/components/main-components/detail-form.vue';
import radioTable from '@/components/tables/radio-table';
import loading from '@/components/main-components/loading.vue';
import detailForm1 from '@/components/main-components/detail-form1.vue';
import detailFormArea from '@/components/main-components/detail-form-area.vue';
import viewDelDetail from '@/components/main-components/view-del-detail.vue';
import bankCard from '@/components/main-components/bank-card.vue';

//核心部分，在我们使用Vue.use()时，自动调用的是install，而install导出的必须是的组件
const globalComponents = {
    install: function(Vue) {
        Vue.component('detailForm', detailForm);
        Vue.component('radioTable', radioTable);
        Vue.component('loading', loading);
        Vue.component('detailForm1', detailForm1);
        Vue.component('detailFormArea', detailFormArea);
        Vue.component('viewDelDetail', viewDelDetail);
        Vue.component('bankCard', bankCard);
    }
};

export default globalComponents;