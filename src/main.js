// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { getSelectorRange, wrapTagsHtml } from '@/assets/js/tool.js';
import Vue from 'vue';
import App from './App';
import router from './router';
import '@/assets/css/style.less';
Vue.config.productionTip = false;

const proFns = { getSelectorRange, wrapTagsHtml };
Object.keys(proFns).forEach(fnName => {
  Vue.prototype[fnName] = fnName;
});
Vue.prototype.getSelectorRange = getSelectorRange;
Vue.prototype.wrapTagsHtml = wrapTagsHtml;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
