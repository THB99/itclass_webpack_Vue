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

        <div style="margin: 0 auto;display: block;width: 800px">
          <h1>{{lesson.info}}</h1>
          <video-player  class="video-player vjs-custom-skin"
                         style="width: 800px"
                         ref="videoPlayer"
                         :playsinline="true"
                         :options="playerOptions"
          ></video-player>
        </div>

      </el-main>
      <el-footer height="760px">
      </el-footer>


    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    this.getVideo();
  },
  name: "videoStudy",
  data(){
    return{
      lesson: {
        info:'',
        video:'',
        img:''
      },
      playerOptions : {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          // src: sessionStorage.getItem("video"),  // 路径
          src: '',  // 路径
          type: 'video/mp4'  // 类型
        }],
        // poster: sessionStorage.getItem("img"), //你的封面地址
        poster: '', //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      }
    }
  },
  methods:{
    getVideo(){
      var vm=this;
      this.$axios({
        method:'get',
        url:'http://localhost:8099/getInfo?id='+this.$route.params.id
      }).then(function (resp){
        vm.lesson=resp.data;
        // console.log("info:   "+vm.lesson.img)
        // sessionStorage.("img",vm.lesson.img)
        // sessionStorage.setItemsetItem("video",vm.lesson.video)
        vm.playerOptions['sources'][0]['src'] = vm.lesson.video;
        vm.playerOptions['poster'] = vm.lesson.img;
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
</style>
