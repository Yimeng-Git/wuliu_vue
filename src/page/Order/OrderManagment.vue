<template>
  <div>
    <el-form :inline="true" :model="queryMap" class="demo-form-inline">
      <el-form-item label="订单号" style="float: left;margin-left: 10px">
        <el-input v-model="queryMap.tntnumber" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="运输状态" style="float: left">
        <el-select v-model="queryMap.status" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option label="运输中" value="0"></el-option>
          <el-option label="已到达" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float: right ;margin-right: 40px">
        <el-button type="primary" @click="SelectWay">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
        :data=tableData
        style="width: 100%"
        max-height="500">
      <el-table-column
          fixed
          prop="tntnumber"
          label="编号"
          width="100">
      </el-table-column>
      <el-table-column
          prop="senname"
          label="发件人姓名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="senaddress"
          label="发件人地址"
          width="120">
      </el-table-column>
      <el-table-column
          prop="senzipcode"
          label="发件人邮编"
          width="120">
      </el-table-column>
      <el-table-column
          prop="senphonenum"
          label="发件人手机号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="goodsname"
          label="物品名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="recname"
          label="收件人姓名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="recphonenum"
          label="收件人手机号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="recaddress"
          label="收件人地址"
          width="120">
      </el-table-column>
      <el-table-column
          prop="reczipcode"
          label="收件邮编"
          width="120">
      </el-table-column>
      <el-table-column
          prop="carnum"
          label="运输车辆"
          width="120">
      </el-table-column>
      <el-table-column
          prop="arrive"
          label="运输状态"
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
              size="small">
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
      total: 0, //总共多少条数据
      queryMap: {pageNum: 1, pageSize: 10, tntnumber: '', status: ''}, //查询对象
      tableData: [{
        tntnumber: '1001',
        senname: '王小虎',
        senaddress: '上海市普陀区金沙江路 1518 弄',
        senzipcode: '20160502',
        senphonenum: '152832719283',
        goodsname: '物品名称',
        recname: '收件人姓名',
        recphonenum: '125281633213',
        recaddress: '上海市普陀区金沙江路 1518 弄',
        reczipcode: '20160502',
        carnum: 'A180',
        arrive: '未到达'
      }, {
        tntnumber: '1001',
        senname: '王小虎',
        senaddress: '上海市普陀区金沙江路 1518 弄',
        senzipcode: '20160502',
        senphonenum: '152832719283',
        goodsname: '物品名称',
        recname: '收件人姓名',
        recphonenum: '125281633213',
        recaddress: '上海市普陀区金沙江路 1518 弄',
        reczipcode: '20160502',
        carnum: 'A180',
        arrive: '未到达'
      }],
    }
  },
  methods: {
    deleteRow(rows) {
      // console.log(rows)
      this.$confirm('你确定删除吗？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            this.$http.delete('/waybill/delete/' + rows.tntnumber).then(res => {
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
        this.$http.put('/waybill/success/' + rows.tntnumber).then(res => {
          // console.log(res)
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
      this.$http.get("/waybill/findAll", {
        params: this.queryMap
      }).then(res => {
        // console.log(res)
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

  },
  mounted() {
    this.getConsumerList();
  },

}
</script>

<style scoped>

</style>
