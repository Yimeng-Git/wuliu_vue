import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        //赋值
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        username: '',
        password: '',
    },
    mutations: {
        setToken(state, token) {
            state = token;
            //   传进来的对象里有token这个属性
            localStorage.setItem("token", token);
        },
        delToken(state) {
            // eslint-disable-next-line no-unused-vars
            state = '';
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("password");
        },
        getName(state, username) {
            state = username;
            localStorage.setItem("username", username);
        },
        getPassword(state, password) {
            state = password;
            localStorage.setItem("password", password);
        }
    }
})
export default store;
