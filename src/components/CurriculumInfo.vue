<template>
<div class="app">

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
      <el-row type="flex" justify="center " style="margin-top: 30px">
        <el-col :span="4"  >
          <img :src="curriculum.img" style="width: 300px;height: 400px" >
        </el-col>

        <el-col :span="7">
          <el-row justify="start">
            <el-col :span="12"><div class="grid-content bg-purple">课程名称</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">{{curriculum.info}}</div></el-col>
          </el-row>

          <el-row>
            <el-col :span="12"><div class="grid-content bg-purple">课程老师</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">{{curriculum.tname}}</div></el-col>
          </el-row>

          <el-row>
            <el-col :span="12"><div class="grid-content bg-purple">老师介绍</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">{{curriculum.tinfo}}</div></el-col>
          </el-row>
          <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">课程价格</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">{{curriculum.price}}元</div></el-col>
          </el-row>
          <el-row v-if="buy&&!order">
            <el-button style="width: 120px" type="primary" @click="pay(curriculum.id)">购买</el-button>
            <el-popconfirm title="是否加入购物车？" @onConfirm="goCart()">
              <el-button slot="reference" type="primary">加入购物车</el-button>
            </el-popconfirm>
          </el-row>

          <el-row v-if="!buy">
            <el-button style="width: 120px" type="primary" @click="gostudy(curriculum.id)">开始学习</el-button>
          </el-row>

          <el-row v-if="order">
            该课程待付款,&nbsp去&nbsp &nbsp&nbsp   <el-button style="width: 120px" type="primary" @click="goordernopay()">待付订单</el-button>
          </el-row>



        </el-col>
      </el-row>
      <div  align="center" v-if="!buy">
        <span>该课程已经购买</span>
      </div>

    </el-main>
  </el-container>

</div>
</template>

<script>
export default {
  name: "CurriculumInfo",
  created() {
    this.getInfo(this.$route.params.cid);
    this.isbuy();
    this.inorder();
  },
  methods:{
    goordernopay:function (){
      this.$router.push("/ordernopay");
    },
    inorder(){
      var vm=this;
      this.$axios({
        method:'get',
        url:'http://localhost:8099/inordernopay?uid='+sessionStorage.getItem("islogin")+"&cid="+this.$route.params.cid
      }).then(function (resp){
        if(resp.data=='in'){
          vm.order=true
        }else {
          vm.order=false
        }
      });
    },
    gostudy:function (cid){
      this.$router.push("/videoStudy/"+cid)
    },
    pay:function (cid){
      if (sessionStorage.getItem("islogin")==null||sessionStorage.getItem("islogin")==0){
        this.$confirm('您还未登录无法购买, 是否登录?', '提示', {
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

        });
      }else {
        var vm=this;
        this.$axios({
          method:'get',
          url:'http://localhost:8099/buyone?uid='+sessionStorage.getItem("islogin")+"&cid="+cid
        }).then(function (resp){
          vm.$router.push({
            name:'pay',
            params:{
              orders:resp.data
            }
          });
        });
      }
    },
    isbuy:function (){
      var vm=this;
      if (!(sessionStorage.getItem("islogin")==null||sessionStorage.getItem("islogin")==0)){
        //如果没有购买该课程,返回true
        this.$axios({
          method:'get',
          url:'http://localhost:8099/isbuyorder?uid='+sessionStorage.getItem("islogin")+"&lid="+vm.$route.params.cid
        }).then(function (resp){
          if (resp.data=="ok"){
            vm.$notify({
              title: '成功',
              message: '本课程您已经购买,可直接开始学习',
              type: 'success'
            });
            vm.buy=false
          }else {
            vm.buy=true;
          }
        });
      }
    },
    goCart:function (){
      if (sessionStorage.getItem("islogin")==null||sessionStorage.getItem("islogin")==0){
        this.$confirm('您还未登录无法添加购物车, 是否登录?', '提示', {
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

        });
      }else {
        var vm=this;
        //判断课程是否在购物车内
        this.$axios({
          url:'http://localhost:8099/inCart?uid='+sessionStorage.getItem("islogin")+"&lid="+vm.$route.params.cid,
          method:'get'
        }).then(function (resp){
          if (resp.data=="incart"){

            vm.$notify.info({
              title: '提示',
              message: '该课程已加入购物车,请结算'
            });
            vm.$router.push("/cart");
          }else {
            var vm1=vm;
            vm.$axios({
              method:'get',
              url:'http://localhost:8099/addCart?uid='+sessionStorage.getItem("islogin")+"&lid="+vm1.$route.params.cid
            }).then(function (resp){
              if(resp.data=='ok'){
                vm1.$notify({
                  title: '成功',
                  message: '已加入购物车',
                  type: 'success'
                });
              }
            });
            vm.$router.push("/cart")
          }
        });



      }
    },
    getInfo:function (cid){
      var vm =this;
      this.$axios({
        method:'get',
        url:'http://localhost:8099/getInfo?id='+cid,
      }).then(function (resp){
        vm.curriculum=resp.data
      });
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
  },
  data(){
    return{
      curriculum:null,
      buy:true,
      order:null,
      img:null


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

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
