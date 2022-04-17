<template>
  <el-col :span="12">
    <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="width: 200px">
      <el-menu-item index="1" @click.native="MenuSerch">
        <i class="el-icon-search"></i>
        <span slot="title" >物流查询</span>
      </el-menu-item>
      <el-menu-item index="3" @click.native="OrderManagement" :disabled="isShowList" :class="isShowList===true ? '.onlyRead':''">
        <i class="el-icon-document"></i>
        <span slot="title" >订单管理</span>
      </el-menu-item>
      <el-menu-item index="4" @click.native="CarManagment" :disabled="isShowList" :class="isShowList===true ? '.onlyRead':''">
        <i class="el-icon-truck"></i>
        <span slot="title" >车辆管理</span>
      </el-menu-item>
      <el-menu-item index="5" @click.native="NoticeManagment" :disabled="isShowList" :class="isShowList===true ? '.onlyRead':''">
        <i class="el-icon-setting"></i>
        <span slot="title" >公告管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: "MenuList",
  data(){
    return{
    }
  },
  props:['isShowList'],
  methods: {
    MenuSerch(){
      this.$router.push({
        name:'logQuery',
        query:{

        }
      })
    },
    OrderManagement(){
      this.$router.push({
        name:'orderManagment',
        query:{

        }
      })
    },
    CarManagment(){
      this.$router.push({
        name:'carManagment',
        query:{

        }
      })
    },
    NoticeManagment(){
      this.$router.push({
        name:'noticeManagment',
        query:{

        }
      })
    }
  },

}
</script>

<style scoped>
.onlyRead{
  pointer-events: none;
}

</style>
