<template>
  <div id="app">
    <el-container>
      <el-header height="67px">
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">
            <img src="../assets/logo.png" width="150px" height="50px" >
          </div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light" >
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
              <!--              <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
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
      <el-main >
        <div class="content">
          <div class="seckill">
            <div class="seckill-content" style="margin-top: 50px">
              <div style="height: 40px">
<!--                <span style="font-size: 30px">我的课程</span>-->
                <h1 style="font-size: 30px">我的课程</h1>
              </div>
              <div class="seckill-item" v-for="(item, index) in curriculums" :key="index">
                <div class="seckill-item-img">
                  <img :src="item.img" @click="goStudy(item.id)">
                </div>
                <div class="seckill-item-info">
                  <p style="font-size: 22px">{{item.info}}</p>
                  <p>{{item.tname}}老师</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer height="760px">
      </el-footer>


    </el-container>
  </div>
</template>

<script>
export default {
  name: "MyCurriculum",
  created() {
    this.shuaxin();
    this.getList();
  },
  methods:{
    shuaxin:function (){
      // this.$router.go(0);
    },
    gotohome:function (){
      this.$router.push("/home");
    },
    logout:function (){
      sessionStorage.setItem("islogin",0);
      // this.$router.push("/home");
    },
    goStudy(cid){
      this.$router.push("/videoStudy/"+cid)
    },
    islogin(){
      if (sessionStorage.getItem("islogin")==0||sessionStorage.getItem("islogin")==null){
        //用户已经登录 不显示
        return 1;
      }else {
        return 0;
      }
    },
    gt(){
      this.$router.push("/login")
    },
    getList:function (){
      var vm=this
      this.$axios({
        method:'get',
        url:'http://localhost:8099/getmylesson?uid='+sessionStorage.getItem("islogin")
      }).then(function (resp){
        vm.curriculums=resp.data
      });
    }
  },
  components: {

  },
  data(){
    return{
      seen:true,
      imgs:[
        'static/banner_1.png',
        'static/banner_2.png',
        'static/banner_3.png',
        'static/banner_4.png',
      ],
      curriculums:null
      // curriculums:[
      //   {
      //     img:'static/curriculum1.png',
      //     info:'mysql实战',
      //     price:'12元',
      //     address:'http://www.baidu.com',
      //     count:'10',
      //     id:'3'
      //   }
      // ]
    }
  }
}
</script>

<style scoped>

.el-header, .el-footer {
  /*background-color: #B3C0D1;*/
  /*color: #333;*/
  text-align: center;
  line-height: 60px;
}


.el-main {
  padding-top: 0px;
  /*background-color: #E9EEF3;*/
  /*color: #333;*/
  text-align: center;
  line-height: 10px;
}
.container {
  background-color: #F6F6F6;
}
.content {
  width: 1008px;
  margin: 0px auto;
}
.seckill {
  width: 100%;
  height: 330px;
  margin: 15px auto;
  background-color: #fff;
}

.seckill-content {
  width: 100%;
  height: 280px;
}

.seckill-item {
  width: 220px;
  height: 280px;
  margin-top: 15px;
  margin-left: 15px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
  float: left;
}
.seckill-item-img {
  width: 220px;
  height: 180px;
  margin: 0px auto;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}
.seckill-item-img img {
  width: 110px;
  height: 130px;
  margin-left: 15px;
  margin-top: 35px;
  transition: margin-top 0.3s;
}
.seckill-item-img:hover img {
  margin-top: 6px;
  transition: margin-top 0.3s;
}
.seckill-item-info {
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 10px;
  font-size: 15px;
  color: #009688;
}
.seckill-item-info i:first-child {
  font-size: 14px;
}

.seckill-price {
  margin-top: 35px;
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold;
}






#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 0px;*/
}
</style>
