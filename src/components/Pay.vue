<template>
  <div id="app">
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
    <div class="pay-container">
      <Alert show-icon>
        <Icon type="qr-scanner" slot="icon"></Icon>
        <template slot="desc">请扫描右边二维码进行支付</template>
      </Alert>
      <div class="pay-box">
        <div class="pay-demo">
          <img src="static/pay-demo.png">
        </div>
        <div class="pay-qr-scan">
          <img src="static/pay-qrscan.png">
          <div class="pay-tips">
            <a @click="pay()" ><p style="font-size: 20px">点击我, 完成支付</p></a>
<!--            <router-link to="/payDone"><p>点击我, 完成支付</p></router-link>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.thb();
  },
  data(){
    return{
    }
  },
  name: 'Pay',
  methods:{
    pay:function (){
      var vm=this;
      this.$axios({
        method:'post',
        headers : {
          'Content-Type' : 'application/json;charset=utf-8'
        },
        url:'http://localhost:8099/pay',
        transformRequest:[function(data){
          return JSON.stringify(data);
        }],
        data:vm.$route.params.orders
      });
      this.$router.push("/myCurriculum");
    },
    // thb:function (){
    //   this.orders='';
    //   this.orders=this.$route.params.orders;
    //   console.log(this.orders)
    // },
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
};
</script>

<style scoped>
.pay-container {
  margin: 15px auto;
  width: 80%;
  min-width: 1000px;
}
.pay-box {
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pay-demo {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pay-demo img{
  height: 80%;
}
.pay-qr-scan {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.pay-tips {
  width: 50%;
  text-align: center;
  font-size: 14px;
  line-height: 30px;
}
.pay-tips a {
  color: #999999;
}

.el-header {
  /*background-color: #B3C0D1;*/
  /*color: #333;*/
  text-align: center;
  line-height: 60px;
}

</style>
