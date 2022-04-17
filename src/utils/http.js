import Vue from 'vue'
import axios from 'axios'
import router from "../router";
import store from "../store";

axios.defaults.baseURL = 'http://localhost:8081'; // 设置axios的基础请求路径
axios.defaults.timeout = 2000; // 设置axios的请求时间

axios.loadData = async function (url) {
    const resp = await axios.get(url);
    return resp.data;
};
// 添加请求拦截器
axios.interceptors.request.use(config => {
// 在发送请求之前做些什么
//判断是否存在token，如果存在将每个页面header都添加token
    if(store.state.token){
        config.headers.common['Authorization']=store.state.token.token
    }

    return config;
}, error => {
// 对请求错误做些什么
    return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(
    response => {

        return response;
    },
    error => {

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    this.$store.commit('del_token');
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
            }
        }
        return Promise.reject(error.response.data)
    });


Vue.prototype.$http = axios;// 将axios添加到 Vue的原型，这样一切vue实例都可以使用该对象
