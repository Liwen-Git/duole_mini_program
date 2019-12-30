import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import App from './App'
import store from './store'
import fly from './utils/api'

Vue.use(MpvueRouterPatch);

Vue.prototype.$fly = fly;

Vue.config.productionTip = false;

const app = new Vue({
    mpType: 'app',
    store,
    ...App
});
app.$mount();
