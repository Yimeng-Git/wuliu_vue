<template>
  <div>
    <el-form :inline="true" :model="queryMap" class="demo-form-inline">
      <el-form-item label="订单号" style="float: left;margin-left: 10px">
        <el-input v-model="queryMap.tntnumber" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="物流状态" style="float: left">
        <el-select v-model="queryMap.status" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option label="运输中" value="0"></el-option>
          <el-option label="回收站" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float: right ;margin-right: 40px">
        <el-button type="primary" @click="SelectWay">查询</el-button>
      </el-form-item>
      <el-form-item style="float: right ;margin-right: 20px">
        <el-button type="success" @click="dialog = true">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table
        :data=tableData
        style="width: 100%"
        max-height="500">
      <el-table-column
          fixed
          prop="id"
          label="序列号"
          width="100">
      </el-table-column>
      <el-table-column
          prop="tntnumber"
          label="订单号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="carnum"
          label="车辆编号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="startTime"
          label="出发时间"
          width="200">
      </el-table-column>
      <el-table-column
          prop="arriveTime"
          label="预计到达时间"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="120">
        <template slot-scope="scope">
          <el-button
              @click.native.prevent="deleteRow(scope.row)"
              type="text"
              size="small"
              v-show="scope.row.status==0 ? false : true">
            移除
          </el-button>
          <el-button
              @click.native.prevent="success(scope.row)"
              type="text"
              size="small"
              v-show="scope.row.status==0 ? true : false"
          >
            到达
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
        title="订单调度"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="traninfo" label-width="120px">
          <!--          <el-form-item label="订单号" :label-width="formLabelWidth"-->
          <!--                        style="width: 300px;">-->
          <!--            <el-input v-model="traninfo.tntnumber" style="width: 220px;margin-left: 40px"></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item label="订单号" style="margin-left: -30px">
            <el-select
                v-model="traninfo.tntnumber"
                placeholder="请选择订单"
                @click.native="queryway"
                style="margin-left: -80px">
              <el-option v-for="waybill in waybills" :key="waybill.wid" :label="waybill.tntnumber"
                         :value="waybill.tntnumber"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车辆编号" style="margin-left: -30px">
            <el-select
                v-model="traninfo.carnum"
                placeholder="请选择车辆"
                @click.native="queryCar"
                style="margin-left: -80px">
              <el-option v-for="car in cars" :key="car.cid" :label="car.carnum" :value="car.carnum"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预计到达时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                              v-model="traninfo.arriveTime"
              ></el-date-picker>
            </el-col>
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
  name: "LogQuery",
  data() {
    return {
      table: false,
      dialog: false,
      loading: false,
      formLabelWidth: '80px',
      timer: null,
      total: 0, //总共多少条数据
      queryMap: {pageNum: 1, pageSize: 10, tntnumber: '', status: ''}, //查询对象
      tableData: [{
        id: '',
        startTime: '',
        tntnumber: '',
        carnum: '',
        arriveTime: '',
        status: '',
      }, {
        id: '',
        startTime: '',
        tntnumber: '',
        carnum: '',
        arriveTime: '',
        status: '',
      }],
      traninfo: {
        startTime: '',
        tntnumber: '',
        carnum: '',
        arriveTime: '',
        status: '',
      },
      cars: [{
        cid: '',
        carnum: '',
        area: '',
        destination: '',
      }],
      waybills: [{
        wid: '',
        tntnumber: '',
        senname: '',
        senaddress: '',
        senzipcode: '',
        senphonenum: '',
        goodsname: '',
        recname: '',
        recphonenum: '',
        recaddress: '',
        reczipcode: '',
        carnum: '',
        arrive: ''
      }],
    }
  },
  methods: {
    deleteRow(rows) {
      console.log(rows)
      this.$confirm('你确定删除吗？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            this.$http.delete('/traninfo/delete/' + rows.tntnumber).then(res => {
              console.log(res)
              this.getConsumerList();
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
    success(rows) {
      // console.log(rows)
      // eslint-disable-next-line no-unused-vars

      this.$confirm('你确定已到达？').then(_ => {
        this.$http.put('/traninfo/success/',
            {
              tntnumber: rows.tntnumber,
              carnum: rows.carnum
            }
        ).then(res => {
          console.log(res)
          this.getConsumerList();
        })
        // eslint-disable-next-line no-unused-vars
      }).catch(_ => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
      // this.$http.put('/waybill/success/' + rows.tntnumber).then(res => {
      //   console.log(res)
      //   this.getConsumerList();
      // })
    },
    onSubmit() {
      console.log('submit!');
    },
    SelectWay() {
      this.getConsumerList();
    },
    //分页查询
    getConsumerList() {
      this.$http.get("/traninfo/findAll", {
        params: this.queryMap
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
        // eslint-disable-next-line no-unused-vars
      }).catch(error => {
        return this.$message.error("获取用户列表失败");
      })
    },
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getConsumerList();
    },
    //翻页
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getConsumerList();
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要添加物流信息吗？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            if (this.traninfo.tntnumber !== '' && this.traninfo.carnum !== '') {
              // console.log(done)
              // eslint-disable-next-line no-unused-vars
              this.$http.post('/traninfo/add', this.traninfo).then(res => {
                // console.log(res)
                this.getConsumerList();
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
    },
    queryCar() {
      this.$http.get("/car/all").then(res => {
        console.log(res)
        this.cars = res.data.data;
        // eslint-disable-next-line no-unused-vars
      }).catch(error => {
        return this.$message.error("获取列表失败");
      })
    },
    queryway() {
      this.$http.get("/waybill/all").then(res => {
        console.log(res)
        this.waybills = res.data.data;
        // eslint-disable-next-line no-unused-vars
      }).catch(error => {
        return this.$message.error("获取列表失败");
      })
    }

  },
  mounted() {
    this.getConsumerList();
  },

}
</script>

<style scoped>

</style>
