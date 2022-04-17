import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login";
import Index from "@/components/Index";
import Home from "@/components/Home";
import LogQuery from "@/page/LogisticsQuery/LogQuery";
import OrderManagment from "@/page/Order/OrderManagment";
// import UpdateUserInfo from "@/components/UpdateUserInfo";
import CarManagment from "@/page/CarManagment/CarManagment";
import NoticeManagment from "@/page/NoticeManagment/NoticeManagment";
import UserSearch from "@/components/UserSearch";
import axios from "axios";


Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router=new VueRouter({
    routes:[{
        path:'/',
        redirect:'/userSearch'
        },
        {
            name:'login',
            path:'/login',
            component:Login,
            meta:{title:'登录',assert:false},
        },

        {
          name:'userSearch',
          path:'/userSearch',
          component:UserSearch,
          meta:{title:'查询',assert:false},
        },
        {
            name:'indexUser',
            path:'/indexUser',
            component:Index,
            meta:{title:'注册',assert:true},
        },
        {
            name:'home',
            path:'/home',
            component:Home,
            meta:{title:'主页',assert:true},
            children:[{
                name:'logQuery',
                path:'logQuery',
                component:LogQuery,
                meta:{title:'查询',assert:true},
                },
                {
                name:'orderManagment',
                path:'orderManagment',
                component:OrderManagment,
                meta:{title:'订单管理',assert:true},
                },

                {
                    name:'carManagment',
                    path:'carManagment',
                    component:CarManagment,
                    meta:{title:'车辆管理',assert:true},
                },
                {
                    name:'noticeManagment',
                    path:'noticeManagment',
                    component:NoticeManagment,
                    meta:{title:'公告管理',assert:true},
                },

            ]
        },


    ]
})
router.beforeEach((to, from, next) => {
    /*判断是否需要拦截*/
    if (to.meta.assert===true){
        /*是否是从登录进来*/
        if (from.fullPath==='/login' || from.fullPath==='/indexUser'){
            /*不应该被拦截*/
            /* 路由发生变化修改页面title */
            if (to.meta.title) {
                document.title = to.meta.title
            }
            next()
        } else {
                let token = localStorage.getItem('token');
                if (token === null || token === '') {
                    next('/login');
                } else {
                    axios.get("/user/verify",{
                        params:{
                            token:token
                        }
                    }).then(resp=>{
                        console.log(resp.data)
                        if(resp.data){
                            console.log("没拦截")
                            next();
                        }else {
                            console.log("被拦截")
                            next('/login');
                        }
                    })
                }
            // /*是否是登录后列表的跳转*/
            // if (from.fullPath!==`/home/${from.name}`){
            //     /*被拦截*/
            //     next('/login')
            // }
            // next()
        }
    }
    next()
    // if (to.path === '/login') {
    //     next();
    // } else {
    //     let token = localStorage.getItem('token');
    //     if (token === null || token === '') {
    //         next('/login');
    //     } else {
    //         axios.get("/user/verify",{
    //             params:{
    //                 token:token
    //             }
    //         }).then(resp=>{
    //             console.log(resp.data)
    //             if(resp.data){
    //                 console.log("没拦截")
    //                 next();
    //             }else {
    //                 console.log("被拦截")
    //                 next('/login');
    //             }
    //         })
    //     }
    // }
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆

export default router
