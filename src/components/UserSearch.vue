<template>
  <el-container>
    <el-header>
      <div width="400px" style="float: left;margin-left: 60px"><span class="wuliu" size="20px" style="margin-left: -40px">物流查询系统</span></div>
      <el-button type="primary" size="mini" plain style="float: right;margin-top: 16px" @click="adminLogin">登录</el-button>
    </el-header>
    <el-main>
      <!-- 公告信息栏 -->
      <div class="topStyle">
        <span  class="el-icon-s-promotion" style="float: left;margin-left: 25%;margin-right: -50%;font-size: 17px;line-height: 107px;">公告：</span>
        <div ref="outDiv" class="outDiv">
          <p class="scrollP">
            <span class="topTiele" ref="spanWid"><span style="display: inline-block;width: 40px" v-show="isShowIntval"></span>{{roomTitle}}</span>
            <span class="topTiele" ref="spanWid1" v-show="isShowIntval"><span style="display: inline-block;width: 40px"></span>{{roomTitle}}</span>
          </p>
        </div>
      </div>
      <!--   订单号输入框   -->
      <div style="margin-top: 15px;width: 600px;margin: 5px auto" >
        <el-input placeholder="请输入订单号" v-model="waynumber" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="userSearch"></el-button>
        </el-input>
      </div>
      <!--   订单信息展示   -->
      <div class="wayInfo" v-show="isShowInfo">
        <el-descriptions title="订单信息"  style="line-height: 10px;color: #009dff">
          <el-descriptions-item label="订单号">{{ waybill.tntnumber }}</el-descriptions-item>
          <el-descriptions-item label="寄件人姓名">{{ waybill.senname }}</el-descriptions-item>
          <el-descriptions-item label="寄件人地址">{{waybill.senaddress}}</el-descriptions-item>
          <el-descriptions-item label="寄件人手机号">{{waybill.senphonenum}}</el-descriptions-item>
          <el-descriptions-item label="寄件人邮编">{{ waybill.senzipcode }}</el-descriptions-item>
          <el-descriptions-item label="物品名称">{{ waybill.senphonenum }}</el-descriptions-item>
          <el-descriptions-item label="收件人姓名">{{ waybill.rename }}</el-descriptions-item>
          <el-descriptions-item label="收件人手机号">{{ waybill.recphonenum }}</el-descriptions-item>
          <el-descriptions-item label="收件人地址">{{ waybill.recaddress }}</el-descriptions-item>
          <el-descriptions-item label="收件人邮编">{{ waybill.reczipcode }}</el-descriptions-item>
          <el-descriptions-item label="车辆编号">{{ waybill.carnum }}</el-descriptions-item>
          <el-descriptions-item label="到达状态">
            <el-tag size="small" >{{ waybill.arrive }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "UserSearch",
  data() {
    return {
      waynumber: '',
      roomTitle:'物流查询系统第一次测试公告，本公告可以循环播放1111。物流查询系统第一次测试公告，本公告可以循环播放222。',
      isShowIntval:false,
      isShowInfo:false,
      waybill:
          {
            id:'',
            tntnumber:'',
            senname:'',
            senaddress:'',
            senzipcode:'',
            senphonenum:'',
            goodsname:'',
            rename:'',
            recphonenum:'',
            recaddress:'',
            reczipcode:'',
            carnum:'',
            arrive:'',
            status:''
          }
    }
  },
  methods:{
    userSearch(){
      this.isShowInfo=true
      if(this.waynumber!==''){
        this.$http.get("/waybill/number/"+this.waynumber,).then(res=>{
            this.waybill=res.data;
        })
      }
    },
    // 标题是否需要滚动
    marqueeFun() {
      clearInterval(this.setIntval);
      this.setIntval = null;
      // this.$refs.spanWid.offsetWidth 只是获取当前元素宽度， this.$refs是vue里面dom元素写法，可修改
      if (this.$refs.spanWid.offsetWidth >= this.$refs.outDiv.offsetWidth) {
        this.isShowIntval = true;
        this.setIntval = setInterval(() => {
          this.marquee();
        }, 40);
      } else {
        this.isShowIntval = false;
        if (this.setIntval) {
          clearInterval(this.setIntval);
          this.setIntval = null;
        }
      }
    },
    marquee() {
      if (this.$refs.outDiv) {
        if (this.$refs.outDiv.scrollLeft - this.$refs.spanWid1.offsetWidth >= 0) {
          this.$refs.outDiv.scrollLeft -= this.$refs.spanWid.offsetWidth;
        } else {
          this.$refs.outDiv.scrollLeft++;
        }
      }
    },
    adminLogin(){
      this.$router.push({
        path:'login',
        query:{

        }
      })
    }
  },
  mounted() {

    let _this = this;//赋值vue的this
    _this.marqueeFun(); // 直接调用

    /*公告*/
    this.$http.get("/procalamation/newNotice").then(res=>{
      this.roomTitle=res.data.data.content
    })

  }

}
</script>

<style scoped>
.el-header{
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  /*background-color: #E9EEF3;*/
  /*color: #333;*/
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
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
.topStyle {
  margin-top: 50px;
  position: absolute;
  top: 0;
  width: 100%;
  height: 97px;
  text-align: center;
  line-height: 97px;
  /*background: url("../assets/img.png") no-repeat center center;*/
  background-size: 100% 100%;
}

 /*设置标题可显示的宽度*/
   .outDiv {
     width: 30%;
     height: 97px;
     text-align: center;
     line-height: 80px;
     overflow: hidden;
     margin: 0 auto;
   }

.scrollP {
  white-space: nowrap;
  text-align: center;
}

.topTiele {
  font-size: 17px;
  font-weight: 600;
  background-image: -webkit-linear-gradient(bottom, #f32525, #f80000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /*font-family: Microsoft YaHei;*/
  display: inline-block;
}
.wayInfo{
  margin-left: 150px;
  margin-top: 50px;
}
</style>
