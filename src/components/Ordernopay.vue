<template>
  <div id="app">
    <el-container>
      <el-header height="67px">
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">
            <img src="../assets/logo.png" width="150px" height="50px" >
          </div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">
            <el-menu  class="el-menu-demo" mode="horizontal"  :default-active="$route.path" router>
              <el-menu-item index="/home" >首页</el-menu-item>
              <el-menu-item index="/cart">购物车</el-menu-item>
              <el-menu-item index="/myCurriculum">我的课程</el-menu-item>
              <el-submenu index="2">
                <template slot="title">我的订单</template>
                <el-menu-item index="/ordernopay">待付款</el-menu-item>
                <el-menu-item index="2-2">评价</el-menu-item>
                <el-menu-item index="2-3">退款/售后</el-menu-item>
                <!--                <el-submenu index="2-4">-->
                <!--                  <template slot="title">选项4</template>-->
                <!--                  <el-menu-item index="2-4-1">选项1</el-menu-item>-->
                <!--                  <el-menu-item index="2-4-2">选项2</el-menu-item>-->
                <!--                  <el-menu-item index="2-4-3">选项3</el-menu-item>-->
                <!--                </el-submenu>-->
              </el-submenu>
              <el-menu-item index="3" disabled>消息中心</el-menu-item>
              <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
          </div></el-col>
          <el-col :span="4" v-if="islogin()"><div class="grid-content bg-purple" >
            <el-button @click="gt" >登录</el-button>
            <el-button @click="gt">注册</el-button>
          </div></el-col>
          <el-col :span="4" v-if="!islogin()"><div class="grid-content bg-purple">
            <el-button @click="gt" v-on:click="logout">登出</el-button>
          </div></el-col>
        </el-row>
      </el-header>
      <el-main>
        <h1 style="font-size: 30px;height: 50px">待支付订单</h1>
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <!----------------------------->
          <el-table-column
            type="selection"
            width="150">
          </el-table-column>
          <!----------------------------->


          <el-table-column
            label="课程名称"
            width="320"
            prop="lesson_info">
          </el-table-column>
          <!----------------------------->
          <el-table-column
            label="老师名称"
            width="320"
            prop="t_name">
          </el-table-column>

          <el-table-column
            prop="lesson_price"
            label="课程价格"
            width="320">
          </el-table-column>
        </el-table>

        <div style="margin-top: 20px">
<!--          <el-button @click="toggleSelection([tableData[0], tableData[1]])">切换第二、第三行的选中状态</el-button>-->
<!--          <el-button @click="toggleSelection()">取消选择</el-button>-->
          <el-button @click="save()">支付</el-button>
        </div>
      </el-main>


    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    this.fetchData();
  },
  name: "Ordernopay",
  data() {
    return {
      tableData: [{
        id: null,
        lesson_info: '',
        teacher_name: '',
        lesson_price: null
      }],
      multipleSelection: [],
      loading:false
    }
  },

  methods: {
    save:function (){
      var rowData=this.$refs.multipleTable.selection;
      if(rowData.length==0){
        this.$message.error('请选择未支付的订单');
      }else {
        this.$router.push({
          name:'pay',
          params:{
            orders:rowData
          }
        });
      }

    },
    fetchData:function (){
      //loading
      const TIME_COUNT = 2;
      if(!this.timer){
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(()=>{
          if(this.count > 0 && this.count <= TIME_COUNT){
            this.count--;
          }else{
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;

            this.loading=false;
          }
        },1000)
      }
      if (sessionStorage.getItem("islogin")==null||sessionStorage.getItem("islogin")==0){
        this.$confirm('您还未登录无法查看订单, 是否登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$message({
            type: 'success',
            message: '已跳转到登陆界面'
          });
          this.$router.push("/login");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已跳转到主界面'
          });
          this.$router.push("/home");
        });
      }else{
        var vm=this;
        this.$axios({
          method:'get',
          url:'http://localhost:8099/getOrdernopay?id='+sessionStorage.getItem("islogin")
        }).then(function (resp){
          console.log(resp.data);
          vm.tableData=resp.data;
        });
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    logout:function (){
      sessionStorage.setItem("islogin",0);
      // this.$router.push("/home");
    },
    gt(){
      this.$router.push("/login")
    },
    islogin(){
      if (sessionStorage.getItem("islogin")==0||sessionStorage.getItem("islogin")==null){
        //用户已经登录 不显示
        return 1;
      }else {
        return 0;
      }
    }
  }
}
</script>

<style scoped>
.el-header{
  line-height: 60px;
  text-align: center;
}


.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  height: 900px;
  line-height: 80px;
}
</style>
