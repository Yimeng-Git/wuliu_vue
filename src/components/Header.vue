<template>
  <div>
    <div width="400px" style="float: left;margin-left: 60px"><span class="wuliu" size="20px" style="margin-left: -40px">物流查询系统</span></div>
    <div style="float: right">
      <el-dropdown size="mini" split-button type="info" style="float: right;">
        用户名
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: `Header`
}
</script>

<style scoped>
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
</style>
