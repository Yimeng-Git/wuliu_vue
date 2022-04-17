import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store=new  Vuex.Store({
    state:{
        //赋值
        token:localStorage.getItem('token') ? localStorage.getItem('token'):'',
        username:''
    },
    mutations:{
        setToken(state,token){
            state=token;
            //   这段代码token.token , 是因为在login.vue中调用这个放法传进来的是一个对象
            // （即使你觉的你传进来的是一个字符串，不知道为什么会被放到object里去），
            //   传进来的对象里有token这个属性
            localStorage.setItem("token",token);
        } ,
        delToken(state){
            // eslint-disable-next-line no-unused-vars
            state='';
            localStorage.removeItem("token");
        },
        getName(state,username){
            state=username;
            localStorage.setItem("username",username);
        }
    }
})
export default store;
