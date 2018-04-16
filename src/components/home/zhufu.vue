<template>
    <mt-popup v-model="popupVisible" position="bottom" class="wish_you">
        <header class="header">
                <span @click="toback" class="left">取消</span>
				<h3 class="content">{{title}}</h3>
			</header>
	<div class="bigbox">
        <span>你的名字</span>
        <input type="text" v-model="realname" class="my_name"/>
        <span>好友名字</span>
	    <input type="text" v-model="yourname" class="your_name"/>
        <span>祝福语</span>
	    <textarea name="" id="" cols="30" rows="10" v-model="content" placeholder="10个字以内" maxlength="10"></textarea>
        <mt-button type="danger" size="large" @click="submit">发送祝福</mt-button>
    </div>
    </mt-popup>
</template>
      
<script>
import { Popup } from "mint-ui";
import { Button } from "mint-ui";
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import common from "../../kits/common.js"; //api

export default {
  name: "zhufu",
  created() {},
  mounted() {},
  data() {
    return {
      popupVisible: true,
      title: "新春祝福",
      realname: "",
      yourname: "",
      content: ""
    };
  },
  watch: {},
  methods: {
    toback() {
      this.$router.go(-1);
    },
    submit() {
      let that = this;
      let token = window.localStorage.getItem("token");
      var url = common.apimain + "/api/addAnnouncement";
      var json = {
        token: token,
        content:that.content,
        sender_name:that.realname,
        recipient_name:that.yourname,

      };
      //console.log(json)
      that.$http.post(url, json, { emulateJSON: true }, { timeout: 15000 }).then(
        response => {
          var body = response.body;
          console.log(body);
          if (body.code == 1000) {
           //Toast({message:body.message,duration: 800});
           MessageBox('提示', '操作成功');
            that.$router.push({path:'/home'});
          }else if(body.code == 1013){
               Toast({ message: body.message, duration: 800 });
               that.$router.push({path:'/loginuser'});
          }else{
             //Toast({message:body.message,duration: 800}); 
             MessageBox('提示', body.message);
          }
        },
        response => {
          //console.log('网络连接错误，请稍后重试');
              //Toast({message: "网络连接错误，请稍后重试",duration: 800});
               MessageBox('提示',"网络连接错误，请稍后重试");
        }
      );
    }
  }
};
</script>
      
<style scoped>
.wish_you {
  width: 100%;
  height: 100%;
  max-width: 40rem /* 640/16 */;
  margin: 0 auto;
  background: #fff;
  background-color: rgb(197, 15, 15);
  background: linear-gradient(rgb(188, 3, 21), rgb(197, 8, 66));
}
.bigbox {
  height: auto;

  width: 100%;
  margin: 60px auto;
  padding: 10px;
}
.header {
  height: 3.125rem;
  width: 100%;
  background: red;
  background-size: cover;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: fixed;
}
.left {
  font-size: 0.75rem;
  color: #fff;
  line-height: 3.125rem;
  float: left;
  margin-left: 1.375rem;
  z-index: 110;
}
.content {
  width: 80%;
  height: 3.125rem;
  color: #fff;
  font-size: 1rem;
  text-align: center;
  line-height: 3.125rem;
  font-weight: 600;
  letter-spacing: 0.1875rem;
}
.right {
  float: right;
  font-size: 0.75rem;
  color: #fff;
  line-height: 3.125rem;
}
.right > img {
  width: 100%;
  width: 1.25rem;
  height: 1.25rem;
  margin: -2px 0.875rem;

  z-index: 110;
}
.bigbox span {
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  height: 1.5rem;
  line-height: 24px;
  margin: 0.3125rem;
  letter-spacing: 0.1875rem;
}
.bigbox input {
  display: inline-block;
  width: 100%;
  height: 36px;
  padding: 0 0.625rem;
  margin: 0;
  border: none;
  color: #fff;
  background-color: #de2425;
  border-radius: 18px;
  font-size: 16px;
}
.bigbox textarea {
  background: linear-gradient(rgb(188, 3, 21), rgb(197, 8, 66));
  font-size: 16px;
  color: #fff;
  border: 1px solid #de2425;
  border-radius: 0.875rem;
}
textarea::-webkit-input-placeholder {
          /* placeholder颜色  */
        color: #aab2bd;
        /* placeholder字体大小  */
        font-size: 16px;
         /* placeholder位置  */
        text-align: right;
    }
</style>
      