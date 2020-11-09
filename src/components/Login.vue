<template>
<div class="login_box">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <h3>欢迎登录</h3>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>

  </el-form>

</div>
</template>

<script>
export default {
  data(){
    return{
      ruleForm:{
        name:'',
        password:''
      },
      rules:{
        name:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        var vm=this;
        if (valid) {
          this.$axios({
            method:'get',
            url:'http://localhost:8099/login?name='+vm.ruleForm.name+"&password="+vm.ruleForm.password
          }).then(function (response){
           if (response.data.id==0){
             //登陆失败
             vm.$message.error("账户/密码错误");
             sessionStorage.setItem("islogin",0);
           }else {
             //登陆成功
             sessionStorage.setItem("islogin",response.data.id);
             // vm.$router.push("/home");
             vm.$router.go(-1)
           }
          });
        }
      });
    }

  }
}
</script>





<style scoped>
.login_box{
  margin:150px auto;
  width: 500px;
  height: 300px;
  border:1px solid #DCDFE6;

  padding: 0px 70px 20px 30px;
  /*y圆角*/
  border-radius: 20px;
  /*阴影*/
  box-shadow: 0px 0px 20px #DCDFE6 ;
}
</style>
