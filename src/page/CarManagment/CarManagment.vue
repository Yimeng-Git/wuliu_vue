<template>
  <div>
    <el-form :inline="true" :model="queryMap" class="demo-form-inline">
      <el-form-item label="车辆编号" style="float: left;margin-left: 10px">
        <el-input v-model="queryMap.carnum" placeholder="车辆编号"></el-input>
      </el-form-item>
      <el-form-item label="运输状态" style="float: left">
        <el-select v-model="queryMap.status" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option label="空闲中" value="0"></el-option>
          <el-option label="运输中" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float: right ;margin-right: 40px">
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item style="float: right ;margin-right: 20px">
        <el-button type="success" @click="dialog = true">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="cars"
        style="width: 100%"
        max-height="500">
      <el-table-column
          fixed
          prop="cid"
          label="序号"
          width="150">
      </el-table-column>
      <el-table-column
          prop="carnum"
          label="车辆编号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="area"
          label="地区"
          width="120">
      </el-table-column>
      <el-table-column
          prop="destination"
          label="目的地"
          width="120">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态"
          width="120">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.status==='空闲中'?'error':scope.row.status=='运输中'?'success':'info'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="120">
        <template slot-scope="scope">
          <el-button
              @click.native.prevent="deleteRow(scope.row)"
              type="text"
              size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
        title="登记车辆"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="car">
          <el-form-item label="车辆编号" :label-width="formLabelWidth" style="margin-right: 20px">
            <el-input v-model="car.carnum"></el-input>
          </el-form-item>
          <el-form-item label="所属地" :label-width="formLabelWidth" style="margin-right: 20px">
            <el-input v-model="car.area"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">
            {{ loading ? '提交中 ...' : '确 定' }}
          </el-button>
        </div>
      </div>
    </el-drawer>
    <el-pagination
        style="margin-top:10px;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.queryMap.pageNum"
        :page-size="this.queryMap.pageSize"
        layout="prev, pager, next"
        :total="total"
    ></el-pagination>
  </div>
</template>


<script>

export default {
  name: "CarManagment",
  data() {
    return {
      table: false,
      dialog: false,
      loading: false,
      formLabelWidth: '80px',
      timer: null,
      total: 0, //总共多少条数据
      queryMap: {pageNum: 1, pageSize: 10, carnum: '', status: ''}, //查询对象
      cars: [{
        cid: '1',
        carnum: 'A180',
        area: '上海',
        destination: '河南',
        status: '0'
      }],
      car: {
        carnum: '',
        area: '',
        destination: '',
      }
    }
  },
  methods: {
    deleteRow(rows) {
      this.$confirm('你确定删除吗？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            this.$http.delete('/car/delete/' + rows.cid).then(res => {
              // console.log(res)
              this.getCarList();
            })
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
    },
    onSubmit() {
      this.getCarList()
    },
    //分页查询
    getCarList() {
      this.$http.get("/car/findAll", {
        params: this.queryMap
      }).then(res => {
        // console.log(res)
        this.cars = res.data.data.list;
        this.total = res.data.data.total;
        // eslint-disable-next-line no-unused-vars
      }).catch(error => {
        return this.$message.error("获取列表失败");
      })
    },
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getCarList();
    },
    //翻页
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getCarList();
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要添加车辆吗？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            if (this.car.carnum !== '' && this.car.area !== '') {
              // console.log(done)
              this.$http.post('/car/add', this.car).then(res => {
                // console.log(res)
                this.getCarList();
              })
              done();
              this.loading = false;
              this.$message({
                message: '添加成功',
                type: 'success'
              });
            } else {
              this.$message({
                type: 'info',
                message: '添加失败'
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
  mounted() {
    this.getCarList();
  }
}
</script>

<style scoped>

</style>
