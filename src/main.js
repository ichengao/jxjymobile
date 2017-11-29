import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueVideoPlayer from 'vue-video-player'
import store from './store/index'
import global_ from './components/global.vue'
import $ from 'jquery'

// title值绑定
Vue.directive('title', {
    inserted: function (el, binding) {
        document.title = el.dataset.title
    }
});

router.afterEach((to, from, next) => {
    $('body,html,.main').scrollTop('0');
});

// 引入全局变量
// 全局变量模块挂载到Vue.prototype
Vue.prototype.GLOBAL = global_;

Vue.config.productionTip = false;

Vue.use(VueVideoPlayer);

Vue.use(Mint);

// request请求拦截器
axios.interceptors.request.use(
    config => {
        // 判断是否存在token，如果存在的话，则每个request header都加上token
        if (localStorage.getItem('jxjy_token')) { 
            config.headers.Authorization = localStorage.getItem('jxjy_token');
        };
        config.headers.equipment='02';

        // 判断是否存在uuid，如果存在，每个request header就加上uuid
        if(sessionStorage.getItem('uuid')){ 
            config.headers.uuid = sessionStorage.getItem('uuid');
        };
        
        // 发起请求时等待的弹框
        $("#"+vm.$el.lastChild.previousElementSibling.id).fadeIn();

        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// response响应拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.result == "-1"){
            // token过期或者无效跳转到登录页,然后跳回原页面
            vm.$router.push({path:'/login',query:{'redirect':vm.$route.fullPath}});
        }else{
            // 如果token未过期且返回值token存在就更新token
            if(response.data.token != "" && response.data.token != undefined && response.data.token != null){
                localStorage.setItem('jxjy_token',response.data.token);
            };
        };

        // 判断响应状态码，若是响应成功，那么将弹框隐藏
        var a=response.status;
        if(a == '200'){
            var timer=setTimeout(function(){
                $("#"+vm.$el.lastChild.previousElementSibling.id).fadeOut();
            },500);
        }

        return response;
    },
    err => {
        if(err.message='Network Error'){
            // 提示接口异常
            $("#"+vm.$el.lastChild.previousElementSibling.id).fadeOut(100);
            $("#"+vm.$el.lastChild.id).fadeIn();
            var timer=setTimeout(function(){
                $("#"+vm.$el.lastChild.id).fadeOut();
            },2000);
        }
        return Promise.reject(err);
    }
);

var vm=new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
}).$mount('#app');
