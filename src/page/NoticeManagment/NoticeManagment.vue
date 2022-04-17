<template>
  <!--  <NoticeList title="标题" :isShow=true></NoticeList>-->
  <div>
    <el-form :inline="true" :model="queryMap" class="demo-form-inline">
      <el-form-item label="标题" style="float: left;margin-left: 10px">
        <el-input v-model="queryMap.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item style="float: right ;margin-right: 40px">
        <el-button type="primary" @click="SelectPro">查询</el-button>
      </el-form-item>
      <el-form-item style="float: right ;margin-right: 20px">
        <el-button type="success" @click="dialog = true">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="Procalamations"
        style="width: 100%"
        max-height="500">
      <el-table-column
          fixed
          prop="protime"
          label="日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="title"
          label="标题"
          width="250">
      </el-table-column>
      <el-table-column
          prop="content"
          label="内容"
          width="630">
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
              @click.native.prevent="updateRow(scope.row)"
              type="text"
              size="small"
          >
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
        title="发布新公告"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="Procalamation">
          <el-form-item label="标题" :label-width="formLabelWidth" style="margin-right: 20px">
            <el-input v-model="Procalamation.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth" style="margin-right: 20px">
            <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 10}"
                placeholder="请输入内容"
                v-model="Procalamation.content">
            </el-input>
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
    <!--  修改  -->
    <el-drawer
        title="修改公告"
        :before-close="updatePro"
        :visible.sync="dialog2"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="Procalamation">
          <el-form-item label="标题" :label-width="formLabelWidth" style="margin-right: 20px">
            <el-input v-model="Procalamation.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth" style="margin-right: 20px">
            <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 10}"
                placeholder="请输入内容"
                v-model="Procalamation.content">
            </el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()">
            {{ loading2 ? '提交中 ...' : '确 定' }}
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
  name: "NoticeManagment",
  data() {
    return {
      table: false,
      dialog: false,
      dialog2: false,
      loading: false,
      loading2: false,
      formLabelWidth: '80px',
      timer: null,
      total: 0, //总共多少条数据
      queryMap: {pageNum: 1, pageSize: 10, title: ''}, //查询对象
      Procalamations: [{
        pid: '',
        title: '测试公告',
        content: '测试公告内容',
        protime: '2022-04-10',
      }],
      Procalamation: {
        title: '',
        content: '',
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    //分页查询
    getProcalamationList() {
      this.$http.get("/procalamation/getAll", {
        params: this.queryMap
      }).then(res => {
        // console.log(res)
        this.Procalamations = res.data.data.list;
        this.total = res.data.data.total;
        // eslint-disable-next-line no-unused-vars
      }).catch(error => {
        return this.$message.error("获取用户列表失败");
      })
    },
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getProcalamationList();
    },
    //翻页
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getProcalamationList();
    },
    SelectPro() {
      this.getProcalamationList();
    },
    //删除
    deleteRow(rows) {
      this.$confirm('你确定删除吗？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            this.$http.delete('/procalamation/delete/' + rows.pid).then(res => {
              // console.log(res)
              this.getProcalamationList();
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
    //编辑
    // eslint-disable-next-line no-unused-vars
    updateRow(rows) {
      this.$http.get('/procalamation/edit/' + rows.pid).then(res => {
        // console.log(res)
        this.Procalamation = res.data.data;
        this.dialog2 = true;
      })
      // this.dialog2 = true;
    },
    //添加
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要发布公告吗？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            console.log(done)
            this.$http.post('/procalamation/add', this.Procalamation).then(res => {
              // console.log(res)
              this.getProcalamationList();
            })
            done();
            this.loading = false;
            this.$message({
              message: '添加成功',
              type: 'success'
            });

          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
    },
    //修改
    updatePro(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定修改公告吗？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            // console.log(done)
            this.$http.put('/procalamation/update', this.Procalamation).then(res => {
              // console.log(res)
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.getProcalamationList();
            })
            done();
            this.loading = false;

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
      this.dialog2 = false;
      this.loading2 = false;
      clearTimeout(this.timer);
    }

  },


  mounted() {
    // console.log(this.Procalamations[0].name)
    this.getProcalamationList();
  }

}
</script>

<style scoped>

</style>
