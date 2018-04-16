<template>
	<div id="tmpl">
		<div class="loginbg" ref="logBg">
			<img src="../../../statics/imgs/SHOUYE_03.png">
			<div class="loginbgin">
				<img src="../../../statics/imgs/SHOUYE_06.png">
			</div>
			<div class="loging">
			<router-link  to="/loginuser">
				<span>登录</span>	
			</router-link>
			<router-link  to="/register">
				<span>注册</span>	
			</router-link>	
				
			</div>
		</div>
		<!-- 首次运行轮播 -->
		<lunbo-one :iframe="iframe" @hide-picker="hidePicker"></lunbo-one>
	</div>
</template>

<script>
import LunboOne from "../home/lunboone.vue";
export default {
  components: {
    LunboOne
  },
  data() {
    return {
      iframe: false
    };
  },
  mounted() {
    this.$refs.logBg.style.height =
      document.documentElement.clientHeight + "px";
    let token = window.localStorage.getItem("token");
    let cookies = window.localStorage.getItem("cookies");
    if (token != null) {
      this.$router.push({ path: "/home" });
    } else if (cookies != null) {
      this.$router.push({ path: "/loginuser" });
	 
    }else{
		 this.isshow();
	}
  },
  methods: {
    isshow(e) {
      this.iframe = true;
    },
    hidePicker() {
      this.iframe = false;
    }
  }
};
</script>

<style scoped>
#tmpl {
  margin-top: 0;
  margin-bottom: 0;
}
.loginbg {
  position: relative;
  max-width: 640px;
  min-width: 320px;
  margin: 0 auto;
}
.loginbg img {
  width: 100%;
  height: 100%;
  vertical-align: bottom;
}
.loginbgin {
  z-index: 100;
  position: absolute;
  margin-top: -125%;
}
.loginbgin img {
  width: 74%;
}
.loging {
  width: 100%;
  height: 30px;
  position: absolute;
  margin-top: -50%;
}
.loging span {
  display: inline-block;
  width: 42%;
  height: 40px;
  background-color: #4171ae;
  line-height: 40px;
  text-align: center;
  margin-left: 5%;
  color: #f4f3f9;
  font-family: "Microsoft YaHei";
  font-size: 14px;
  border-radius: 1px;
}
</style>