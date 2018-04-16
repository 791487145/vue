<template>
	<div id="tmpl">
		<div class="loginbg" ref="logBg">
				<img src="../../../statics/imgs/SHOUYE_03.png">
			<div class="loginbgin">
				<img src="../../../statics/imgs/SHOUYE_31.png">
			</div>
			<div class="loging">
				<input class="user" type="number" placeholder="请输入手机号" v-model="phone">
				<img :src="imgurlok" alt="" class="tip01">
				<input class="pwd" type="password" placeholder="请输入密码" v-model="pwd">
				<img :src="imgurlok" alt="" class="tip02">
					<span @click="submit" class="divcssss">登录</span>
				
				<router-link  to="/loginphone">
					<span id="username" class="divcssss">验证码登录</span>	
				</router-link>
				<div class="under">
					<router-link  to="/register">
						<span class="zhuce">注册账号</span>	
					</router-link>
					<router-link  to="/setpwd">
						<span class="remember">忘记密码？</span>	
					</router-link>				
				</div>
				<div class="other">
					<div class="left"></div>
						<div class="tip">第三方登录</div>
					<div class="right"></div>
					<div class="others">
						<div>
							<img src="../../../statics/imgs/xinxixiugai_29.png" @click="wxlogin">
						</div>
						<div>
							<img src="../../../statics/imgs/xinxixiugai_41.png" @click="qq">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import common from "../../kits/common.js"; //api
import "../../kits/jquery.min.js";
import imgurlok from "../../../statics/imgs/denglu109.png";
import imgurlno from "../../../statics/imgs/denglu117.png";
export default {
  data() {
    return {
      content:'登录',
      username: "",
      phone:null,
      pwd: "",
      phonetrue: false,
      pwdtrue: false,
      imgurlok: imgurlok,
      imgurlno: imgurlno,
      auths: [],
      uuid: ""
    };
  },
  methods: {
    submit: function() {
      if (this.phonetrue && this.pwdtrue) {
        //console.log(this.username);
        //console.log(this.pwd);
        var url = common.apimain + "/api/user/login";
        var json = {
          phone: this.phone,
          password: this.pwd,
          uuid: this.uuid
        };
        Indicator.open();
        this.$http
          .post(url, json, { emulateJSON: true }, { timeout: 15000 })
          .then(
          	
            function(res) {
              var body = res.body;
              //console.log(body)
              if (body.code == 1000) {
                Indicator.close();
                Toast({ message: body.message, duration: 800 });
                //保存token;
                var token = body.data.token;
                localStorage.setItem("token", token);
                this.$router.push({ path: "/home" });
              } else if (body.code == 2000) {
                Indicator.close();
                Toast({ message: body.message, duration: 800 });
                var cookies = body.data.token;
                localStorage.setItem("cookies", cookies);
                this.$router.push({
                  path: "/loginphone/activation/" + this.username
                });
              } else {
                Indicator.close();
                Toast({ message: body.message, duration: 800 });
              }
            },
            function() {
              //console.log('失败了');
              Indicator.close();
              Toast("网络连接错误");
            }
          );
      } else {
        Toast({ message: "请检查您的用户名或密码", duration: 800 });
      }
    },
    //第三方登录
    wxlogin() {
      this.authLogin("weixin");
    },
    qq() {
      this.authLogin("qq");
    },
    sina() {
      	Toast({message: "暂未开通",duration: 800});
    },
    authLogin(type) {
      var that = this;
      var auto = that.auths;
      //   console.log("123"+auto)
      var s = null;
      for (var i = 0; i < auto.length; i++) {
        if (auto[i].id == type) {
          s = auto[i];
          break;
        }
      }
      console.log("123" + s);
      console.log("123" + s.authResult);
      if (!s.authResult) {
        s.login(
          function(e) {
            Toast("登录认证成功！");
            that.authUserInfo(type);
          },
          function(e) {
            Toast("登录认证失败！");
          }
        );
      } else {
        Toast("已经登录认证！");
      }
    },
    //微信登录
    authUserInfo(type) {
      var that = this;
      var s;
      var auto = that.auths;
      for (var i = 0; i < auto.length; i++) {
        if (auto[i].id == type) {
          s = auto[i];
          break;
        }
      }
      console.log("456" + s);
      s.getUserInfo(
        function(e) {
          var josnStr = JSON.stringify(s.userInfo);
          var jsonObj = s.userInfo;
          console.log("获取用户信息成功：" + josnStr);

          if (type == "qq") {
            var url = common.apimain + "/api/oauth";
            var json = {
              type: "qq",
              qq_openid: jsonObj.openid,
              figureurl_qq_2: jsonObj.figureurl_2,
              nickname: jsonObj.nickname
            };
            console.log("qq" + jsonObj.openid);
            console.log("qq" + jsonObj.figureurl_2);
            console.log("qq" + jsonObj.nickname);
            that.$http
              .post(url, json, { emulateJSON: true }, { timeout: 15000 })
              .then(
                function(res) {
                  console.log("qq" + res);
                  if (res.body.code == 1000) {
                    var token = res.body.data.token;
                    localStorage.setItem("token", token);
                    this.$router.push({ path: "/home" });
                  } else {
                    Toast({ message: body.message, duration: 800 });
                  }
                },
                function() {
                  Toast("网络连接错误");
                  console.log("网络连接错误");
                }
              );
          } else if (type == "weixin") {
            var url = common.apimain + "/api/oauth";
            var json = {
              type: "weixin",
              wx_openid: jsonObj.openid,
              wx_unionid: jsonObj.unionid,
              headimgurl:jsonObj.headimgurl,
              nickname: jsonObj.nickname
            };
            console.log("weixin" + jsonObj.openid);
            console.log("weixin" + jsonObj.unionid);
            console.log("weixin" + jsonObj.nickname);
            console.log("weixin" + jsonObj.headimgurl);
            that.$http
              .post(url, json, { emulateJSON: true }, { timeout: 15000 })
              .then(
                function(res) {
                  console.log("weixin" + res);
                  if (res.body.code == 1000) {
                    var token = res.body.data.token;
                    localStorage.setItem("token", token);
                    this.$router.push({ path: "/home" });
                  } else {
                    Toast({ message: body.message, duration: 800 });
                  }
                },
                function() {
                  Toast("网络连接错误");
                  console.log("网络连接错误");
                }
              );
          }
          console.log("789");
        },
        function(e) {
          alert("获取用户信息失败：" + e.message + " - " + e.code);
          console.log("101112");
        }
      );
    },
    //注销
    authLogout() {
      for (var i in this.auths) {
        var s = this.auths[i];
        if (s.authResult) {
          s.logout(
            function(e) {
              console.log("注销登录认证成功！");
            },
            function(e) {
              console.log("注销登录认证失败！");
            }
          );
        }
      }
    }
  },
  mounted() {
    this.uuid = plus.device.uuid;
    //console.log('uuid'+this.uuid);
    var that = this;
    plus.oauth.getServices(
      function(services) {
        that.auths = services;
      },
      function(e) {
        console.log("获取登录服务列表失败：" + e.message + " - " + e.code);
      }
    );
    //this.$refs.logBg.style.height = document.documentElement.clientHeight+"px";
  },
  watch: {
//  username(newval, oldval) {
//    //console.log(newval,oldval)
//    var re = /^[A-Za-z0-9]{4,15}$/;
//    var result = re.test(newval);
//    if (!result) {
//      //console.log(123)
//      var imgurl = this.imgurlno;
//      $(".tip01").attr("src", imgurl);
//      this.phonetrue = false;
//    } else {
//      var imgurl = this.imgurlok;
//      $(".tip01").attr("src", imgurl);
//      this.phonetrue = true;
//    }
//  },
    pwd(newval, oldval) {
      //console.log(newval,oldval)
      var re = /^[A-Za-z0-9]{6,12}$/;
      var result = re.test(newval);
      if (!result) {
        var imgurl = this.imgurlno;
        $(".tip02").attr("src", imgurl);
        this.pwdtrue = false;
      } else {
        var imgurl = this.imgurlok;
        $(".tip02").attr("src", imgurl);
        this.pwdtrue = true;
      }
    },
    phone(newval,oldval){
				var re =/^1[3|4|5|8|7][0-9]\d{8}$/;
				 var result=  re.test(newval);
				 if(!result){
						var imgurl = this.imgurlno;
					$(".tip01").attr("src",imgurl);
					 this.phonetrue = false;
				 }else{
					//  $(".tip01").attr("src",'../../../statics/imgs/denglu109.png');
					var imgurl = this.imgurlok;
					$(".tip01").attr("src",imgurl);
					 this.phonetrue = true;
				 }
	}
    // nametrue(newval,oldval){
    // 	console.log(newval)
    // },
    // pwdtrue(newval,oldval){
    // 	console.log(newval)
    // }
  }
};
</script>

<style scoped>
#tmpl {
  margin-top: 0;
  margin-bottom: 0;
}

.loginbg img {
  width: 100%;
  height: 100%;
  vertical-align: bottom;
}
.loginbgin {
  z-index: 100;
  position: absolute;
  margin-top: -151%;
  margin-left: 15%;
  width: 70%;
}
.loging {
  width: 80%;
  height: 5.9375rem;
  position: absolute;
  margin-top: -103%;
  margin-left: 10%;
}
.loging span {
  display: inline-block;
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  margin-left: 0px;
  margin-top: 3%;
  font-weight: normal;
  font-family: "Microsoft YaHei";
  border-radius: 1px;
}
#username {
  display: inline-block;
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  margin-left: 0px;
  margin-top: 3%;
  font-weight: normal;
  font-family: "Microsoft YaHei";
  border-radius: 1px;
}
.loging input {
  border: 0;
  font-size: 0.875rem;
  background-color: rgba(255, 255, 255, 0);
  padding-left: 15%;
  position: relative;
  font-weight: 500;
  font-size: 16px;
}
.loging .tip01 {
  position: absolute;
  width: 1.125rem;
  height: 1.125rem;
  top: 0.5625rem;
  right: 0.0625rem;
}
.loging .tip02 {
  position: absolute;
  width: 1.125rem;
  height: 1.125rem;
  top: 3.9375rem;
  right: 1px;
}
.loging .user {
  background-image: url(../../../statics/imgs/SHOUYE_37.png);
  background-size: 400px;
  background-repeat: no-repeat;
}
.loging .pwd {
  background-image: url(../../../statics/imgs/SHOUYE_40.png);
  background-size: 400px;
  background-repeat: no-repeat;
}
.loging .under {
  width: 100%;
}
.loging .under span {
  background-color: rgba(255, 255, 255, 0);
  width: 40%;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  font-weight: normal;
  font-family: "Microsoft YaHei";
}
.loging .under .zhuce {
  text-align: left;
  float: left;
}
.loging .under .remember {
  text-align: right;
  float: right;
}
.other {
  position: relative;
}
.other .left {
  width: 35%;
  margin-top: 13%;
  border-top: 1px solid #4171ae;
  position: relative;
}
.other .right {
  width: 35%;
  margin-top: 0%;
  border-top: 1px solid #4171ae;
  position: relative;
  left: 65%;
}
.other .tip {
  position: absolute;
  width: 90px;
  color: #4171ae;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  top: -10px;
  left: 50%;
  text-align: center;
  margin-left: -14%;
}
.other .others {
  /* background-color: pink; */
  margin-top: 10%;
}
.other .others div {
  display: inline-block;
  /* background-color: red; */
  width: 32%;
  margin-left: 16%;
}
.other .others img {
  width: 55%;
}
</style>