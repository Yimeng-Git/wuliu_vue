<template>
  <div class="login-container">
  <div class="index-user">
    <h2>注册新用户</h2>
    <el-form :inline="true" :model="userinfo" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名">
        <el-input type="text" v-model="userinfo.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" style="margin-left: -80px">
        <el-radio-group v-model="userinfo.sex" style="margin-left: 15px">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="userinfo.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="userinfo.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="userinfo.age"></el-input>
      </el-form-item><br>
      <el-form-item label="手机号" prop="phonemun" >
        <el-input type="text"  v-model="userinfo.phonemun"  autocomplete="off" max="11"></el-input>
      </el-form-item><br>
      <el-form-item prop="email" label="邮箱">
        <el-input type="text" v-model="userinfo.eMail" autocomplete="off"></el-input>
      </el-form-item><br>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item><br>
    </el-form>
  </div>
  </div>
</template>

<script>
export default {
  name: `Index`,
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.userinfo.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userinfo.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let checkMobile = (rule, value, callback) => {
      // 验证手机号的正则表达式
      const regMobile = /^1(3|4|5|6|7|8|9)\d{9}$/;

      if (regMobile.test(value)) {
        // 合法的手机号
        return callback()
      }
      // 不合法
      callback(new Error('请输入合法的手机号'))
    };
    var isEmail = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        const email = reg.test(value);
        if (!email) {
          callback(new Error("邮箱格式如:admin@163.com"));
        } else {
          callback();
        }
      }
    };

    return {
      userinfo:{
        username:'',
        sex:'男',
        password: '',
        checkPass: '',
        age: '',
        phonemun:'',
        eMail:'',
      },


      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ],
        phonemun:[
          {validator: checkMobile, trigger: 'blur'}
        ],
        eMail: [
          { validator: isEmail, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      if (this.userinfo.username !== ''&&this.userinfo.password !== '' && this.userinfo.checkPass !== ''&&this.userinfo.age !== ''&&this.userinfo.phonemun !== ''&&this.userinfo.eMail !== '') {
        this.$http.post("/user/register",
            {
              username: this.userinfo.username,
              password: this.userinfo.password,
              gender: this.userinfo.sex,
              age: this.userinfo.age,
              phonemun: this.userinfo.phonemun,
              eMail: this.userinfo.eMail
            }
        ).then(res => {
          console.log(res.data)
          if (res.data.code === 200) {
            this.$message({
              message: '注册成功',
              type: 'success'
            });
            this.$router.push('/login');
          } else {
            this.$message({
              message: '注册失败',
              type: 'error'
            });
          }
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style scoped>
h2{
margin-top: 50px;
margin-bottom: 20px;
}
.index-user{
  margin: 10px auto;
  width: 400px;
  height: 500px;
}
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
</style>
