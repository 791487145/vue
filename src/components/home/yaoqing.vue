<template>
        <div>
          <mt-popup v-model="show" :closeOnClickModal="closeOnClickModal">
              <div class="yaoqing">
                    <img src="../../../statics/imgs/xxx.png" @click="toback">
                    <span>您已邀请好友45人</span>
              </div>
          </mt-popup>
        </div>
</template>
      
<script>
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import common from "../../kits/common.js"; //api
export default {
  name: "yaoqing",
  created() {
    let vm = this;
  },
  mounted() {
      let vm = this;
      let token = window.localStorage.getItem("token");
      var url = common.apimain + "/api/rodeFee/ifGet";
      var json = {
        token: token
      };
      //console.log(json)
      vm.$http.post(url, json, { emulateJSON: true }, { timeout: 15000 }).then(
        response => {
          var body = response.body;
          console.log(body);
          if (body.code == 1000) {
           
           
          } else {
              
            Toast({ message: body.message, duration: 800 });
          }
        },
        response => {
          //console.log('网络连接错误，请稍后重试');
          Toast({ message: '网络连接错误，请稍后重试', duration: 800 });
        }
      );
  },
  data() {
    return {
      show: true,
      closeOnClickModal: false,
    };
  },
  watch: {
  },
  methods:{
    toback(){
      //关闭邀请人数框;
     // console.log(this.$refs.colseYQ.style)
     this.$router.back(-1);
     console.log(123)
    },
  },
};
</script>
      
<style scoped>
.mint-popup {
  width: 100%;
  height: 30%;
}
.yaoqing{
  position: fixed;
  width: 100%;
  height: 80px;
  background-color: #fff;
  top: 50%;
  margin-top: -40px;
}
.yaoqing img{
  width: 25px;
  position: absolute;
  top: 0;
  right: 0;
}

</style>
      