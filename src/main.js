import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import App from './App'
import store from './store'
import fly from './utils/api'
import Toast from '@vant/weapp/dist/toast/toast'

Vue.use(MpvueRouterPatch);

Vue.prototype.$toast = Toast;

Vue.prototype.$fly = fly;

Vue.config.productionTip = false;


import ImageUpload from './components/upload-images';
Vue.component('ImageUpload', ImageUpload);

const app = new Vue({
    mpType: 'app',
    store,
    ...App
});
app.$mount();
