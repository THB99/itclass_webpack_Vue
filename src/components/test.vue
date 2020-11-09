<template>
<div>
  <input id="file" type="file" @change='save($event)'>
  <el-button  @click="shangchuan()">上传</el-button>
</div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var Bucket ='itclass-1300650300';//腾讯云对象储存桶名
var Region = 'ap-nanjing';//对象储存你所处的地区编号，这里是广州
var cos = new COS({
  getAuthorization: function (options,callback) {
    var authorization = COS.getAuthorization({
      SecretId: '', //这是密钥ID
      SecretKey: '', //这是密钥的钥匙
      Method: options.Method,
      Key: options.Key,
      Query: options.Query,
      Headers: options.Headers,
      Expires: 60,
    });
    callback(authorization);
  }
});
export default {
  data(){
    return{
      video:null,
    }
  },
  name: "test",
  methods: {
    save:function (e){
      this.video=e
    },
    shangchuan() {
      var file = this.video.target.files[0];
      if (!file) return;
      // 分片上传文件
      cos.putObject({
        Bucket: Bucket,
        Region: 'ap-nanjing',
        Key: file.name,
        Body: file,
        onProgress: function (progressData, callback) {
          logger.log(JSON.stringify(progressData));
        },
      }, function (err, data) {
      });

    }
  }
}
</script>

<style scoped>

</style>
