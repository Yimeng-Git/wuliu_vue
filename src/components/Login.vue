<template>
<div class="login-container">

  <div class="login" style="" >
    <h2>登录</h2>
    <el-input v-model="userLogin.username" placeholder="请输入用户名" class="login-input"></el-input>
    <el-input v-model="userLogin.password" placeholder="请输入密码" class="login-input" type="password"></el-input><br/>
<!--    <el-radio v-model="radio" label="1" style="margin-top: 15px">用户</el-radio>-->
<!--    <el-radio v-model="radio" label="2" style="margin-top: 15px">管理员</el-radio><br>-->
    <el-button type="primary"  class="login-btn" @click="LoginUser">登录</el-button><el-button  class="login-btn" @click="indexUser">注册</el-button>
  </div>
</div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: `Login`,
  data() {
    return {
      isShow: false,
      dialogVisible: false,
      imgCode: undefined,
      //表单用户登入数据
      loading: false,
      userLogin: {
        username: "admin",
        password: "admin",
      },
      checked: true,
      //验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 3,
            max: 99,
            message: "长度在 3 到 99 个字符",
            trigger: "blur",
          },
        ],
      },
     };
  },

  methods:{
    ...mapMutations(['changeLogin']),
    indexUser(){
      this.$router.push({
        path:'indexUser',
        query:{

        }
      })
    },
    LoginUser(){
        //用户登录
       this.$http.post("/user/login" ,{
           username:this.userLogin.username,
           password:this.userLogin.password
       }).then(resp=>{
         // console.log(resp.data)
         localStorage.setItem("token", resp.data);
         // // 将用户token保存到vuex中
         this.$store.commit("setToken", resp.data);
         //获取用户名
         this.$store.commit("getName", this.userLogin.username);
         if (resp.data){
                this.$router.push({
                  name:'logQuery',
                  query:{
                     name:this.userLogin.username
                  }
                })
              }
            console.log(resp.data)
       }).catch(err=>{
         alert("请求失败！")
         console.log(err)
       })


    },

  },
  // mounted() {
  //   console.log(this.$route.query.a)
  // }
}
</script>

<style scoped>
.login-container {
  position:fixed;
    top: 0;
  left: 0;
  width:100%;
  height:100%;
  min-width: 1000px;
  z-index:-10;
  zoom: 1;
  background-color: #fff;
  background: url("../assets/bg.jpg") no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
.login {
  padding-top: 10px;
  margin: 150px auto;
  width: 400px;
  height: 310px;
  /*border: 1px solid red;*/
  position: relative;
  background-color: rgb(255, 255, 255 ,0.5);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.login-input{
  width: 300px;
  height: 40px;
  padding-top: 30px;
}
.login-btn{
  margin: 20px 20px;
}

</style>
