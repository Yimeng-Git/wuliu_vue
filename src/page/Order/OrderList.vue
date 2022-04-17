<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="订单号" style="float: left;margin-left: 10px">
        <el-input v-model="formInline.user" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item style="float: right ;margin-right: 40px">
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item style="float: right ;margin-right: 20px">
        <el-button type="success" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>
  <el-table
      :data="tableData"
      style="width: 100%"
      max-height="500">
    <el-table-column
        fixed
        prop="date"
        label="日期"
        width="150">
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        width="120">
    </el-table-column>
    <el-table-column
        prop="province"
        label="省份"
        width="120">
    </el-table-column>
    <el-table-column
        prop="city"
        label="市区"
        width="120">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址"
        width="300">
    </el-table-column>
    <el-table-column
        prop="zip"
        label="邮编"
        width="120">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="120">
      <template slot-scope="scope">
        <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small">
          移除
        </el-button>
        <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
            >
          修改
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      background
      layout="prev, pager, next"
      :total="100"
      style="margin-top: 20px">
  </el-pagination>
</div>
</template>

<script>
export default {
  name: "LogList",
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    onSubmit() {
      console.log('submit!');
    }
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },]
    }
  },
}
</script>

<style scoped>

</style>
