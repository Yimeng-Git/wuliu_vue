<template>
  <el-container>
    <el-header>
      <div width="400px" style="float: left;margin-left: 60px"><span class="wuliu" size="20px"
                                                                     style="margin-left: -40px">物流查询系统</span></div>
      <div style="float: right">
        <el-dropdown size="mini" split-button type="primary" style="float: right;">
          {{ username }}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="dialog = true">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="Leave">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="201px">
        <MenuList :isShowList="isShowList"></MenuList>
      </el-aside>
      <el-drawer
          title="修改密码"
          :before-close="handleClose"
          :visible.sync="dialog"
          direction="rtl"
          custom-class="demo-drawer"
          ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="密码" prop="pass" style="margin-right: 50px">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass" style="margin-right: 50px">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <!--            <el-form-item>-->
            <!--              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>-->
            <!--              <el-button @click="resetForm()">返回</el-button>-->
            <!--            </el-form-item>-->
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">
              {{ loading ? '提交中 ...' : '确 定' }}
            </el-button>
          </div>
        </div>
      </el-drawer>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuList from "@/components/MenuList";

export default {
  name: `Home`,
  components: {MenuList},
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      table: false,
      dialog: false,
      loading: false,
      formLabelWidth: '80px',
      timer: null,
      username: '',
      ruleForm: {
        password: '',
        checkPass: '',
      },
      rules: {
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    UpdateUser() {
      this.dialog = true
    },
    Leave() {
      //删除token
      this.$store.commit("delToken");
      this.$router.push({
        path: '/login'
      });
    },
    // submitForm(formName) {
    //   // eslint-disable-next-line vue/no-mutating-props
    //   this.isShowUpdate = false
    //   this.$router.replace('/login')
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!');
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // },
    resetForm() {
      this.isShowUpdate = false
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }

      this.$confirm('确定要修改密码吗？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            if (this.ruleForm.password !== '') {
              // console.log(done)
              this.$http.put('/user/update', {
                username: this.username,
                password: this.ruleForm.password
                // eslint-disable-next-line no-unused-vars
              }).then(res => {
                // console.log(res)
                this.$router.replace('/login')
              })
              done();
              this.loading = false;
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            } else {
              this.$message({
                type: 'info',
                message: '修改失败'
              });
            }
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
  },
  computed: {
    isShowList() {
      return this.$route.query.radio
    }
  },
  mounted() {
    this.username = localStorage.getItem("username")
  }
}
</script>

<style scoped>
.el-header {
  background-color: #333;
  color: #333;
  /*text-align: center;*/
  line-height: 50px;
}

.el-aside {
  background-color: #545C64;
  color: #333;
  text-align: center;
  line-height: 200px;
  /*height: 700px;*/
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.wuliu {
  color: #009dff;
  font-size: 20px;
  font-style: italic;
  font-weight: bold;
  line-height: 60px;
  background-image: -webkit-linear-gradient(bottom, rgb(201, 115, 255), rgb(20, 11, 255));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}

.updateUser {
  width: 260px;
  height: 200px;
  margin: 20px auto;
  padding-top: 40px;
  padding-right: 60px;
  border-radius: 5px;
  background-color: #B3C0D1;
}
</style>
