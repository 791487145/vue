// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import Vuex from 'vuex'
import store from './vuex/store'

Vue.use(Vuex)

//导入mitui
import 'mint-ui/lib/style.min.css';
import Mint from 'mint-ui';
Vue.use(Mint);
import { DatetimePicker } from 'mint-ui';

Vue.component(DatetimePicker.name, DatetimePicker);

//导入MUI
import '../statics/mui/css/mui.css';
//import './kits/mui.min.js';

//导入element ui
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

//导入VueResource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.http = axios;
//import VueAxios from 'vue-axios'

//导入全局样式
import '../statics/css/site.css'
//import './reset.css'


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    render: h => h(App)
})

Vue.http.interceptors.push((request, next) => {
    　//console.log(this)//此处this为请求所在页面的Vue实例
    var that = this
      // modify request
     // request.method = 'POST';//在请求之前可以进行一些预处理和配置
    
      // continue to next interceptor
    　　next((response) => {//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
            if(response.body.code == 1013){
                console.log(1013)
                //alert('登录过期，请重新登录')
                //console.log( that.$router)
                //that.$router.push({path:'/loginuser'});
                //window.location.pathname = '/loginuser'
            }
        　　
    　　　　return response;
    
      });
});