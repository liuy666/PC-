import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home.js';
import app from './modules/app.js';
import page from './modules/page.js';
import http from "../libs/http";
import distributorOrder from './modules/distributorOrder.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {

  },

  modules: {
   home,
   app,
   distributorOrder,
   page
  }
});