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
				<input class="pwd" type="number" placeholder="验证码" v-model="code">
					<button id="code" @click="get">获取验证码{{second}}</button>
					<span @click="submit">登录</span>	
				
				<router-link  to="/loginuser">
					<span id="username">账号登录</span>	
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
import { Toast } from 'mint-ui';//提示信息
import { MessageBox } from 'mint-ui';//提示判断
import { Indicator } from 'mint-ui';//提示加载
import common from '../../kits/common.js';//api
import "../../kits/jquery.min.js";
import imgurlok from '../../../statics/imgs/denglu109.png';
import imgurlno from '../../../statics/imgs/denglu117.png';

	export default{
		data(){
			return{
				phone:null,
				code:'',
				second:'',
				phonetrue:false,
				imgurlok:imgurlok,
				imgurlno:imgurlno,
				uuid:'',//获取手机识别码
				  auths: [],
			}
		},
		
		methods:{
			submit:function(){
				if(this.phonetrue){
							//手机验证码登录
						Indicator.open();
						var url = common.apimain + '/api/user/vertify';
						var json = {
							phone:this.phone,
							code:this.code,
							uuid:this.uuid,
						}
						//console.log(json)
						this.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
							var body = res.body;
							//console.log(body)
							if(body.code == 1000){
								Indicator.close();
								//Toast(body.message);
								var token = body.data.token;
     							localStorage.setItem('token', token);
								this.$router.push({path:'/home'})
							}else if(body.code == 2000){
								Indicator.close();
								//Toast(body.message);
								var cookies = body.data.token;	
								localStorage.setItem('cookies', cookies);
								this.$router.push({path:'/loginphone/activation/'+this.phone});
							}else{
								Indicator.close();
								Toast({message: body.message,duration: 800});
							}
						},function(){
							//console.log('失败了');
							Indicator.close();
							Toast({message: '网络连接错误',duration: 800});
						})
				}else{
					Toast({message: '请检查手机号码格式',duration: 800});
				}
				
				
			},
			timeup:function(){ //倒计时
				this.second = 30 ;
				var that = this;
				var timedao = setInterval(function(){
					that.second =that.second-1;
					if(that.second ==  0){
						that.second = null;
						clearInterval(timedao);
						//console.log(that.second)
					}else if(that.second <= 1){
						that.second = null;
						clearInterval(timedao);
					}
				
				},1000)
			},
			//手机是否注册
			get:function(){
				//console.log(this.$http);
				//验证手机是否被注册
				var that = this;
				$('#code').attr('disabled','disabled');	
					$('#code').css('background','#656565');
						that.timeup();
								var url = common.apimain + '/api/user/vertify/phone';
								var url2 = common.apimain + '/api/user/sendCode';
								var json = {phone:that.phone};
								var json2 = {phone:that.phone,method:'4'};
								that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
									var body = res.body;
									//console.log(body)
									if(body.code == 1000){
											//未注册提示注册

											MessageBox.confirm('您的手机还未注册，是否现在注册？').then(action => {
  												that.$router.push({path:'/register'});
											});
										$('#code').css('background','#4171AE');
										$('#code').attr('disabled',false);
										this.second = null ;

									}else if(body.code == 2000){

										//发送验证码
												that.$http.post(url2,json2,{emulateJSON: true},{timeout:15000}).then(function(res){
													var body = res.body;
													//console.log(body)
													if(body.code == 1000){
														Toast({message: '验证码已发送',duration: 800});
														
													}else{
														Toast({message: body.message,duration: 800});
														$('#code').css('background','#4171AE');
														$('#code').attr('disabled',false);
														this.second = null ;
													}
												},function(){
												
													Toast({message: '网络连接错误',duration: 800});
												});
									}else{
										Indicator.close();
										Toast({message: body.message,duration: 800});
										$('#code').css('background','#4171AE');
										$('#code').attr('disabled',false);
										this.second = null ;
									}
								},function(){
									
									Toast({message: '网络连接错误',duration: 800});
								})
						 setTimeout(function(){   //定时器控制button属性
								
								$('#code').css('background','#4171AE');
								$('#code').attr('disabled',false);
							},30000)
				
			},
			plusReady(){  
				this.uuid= plus.device.uuid;
				console.log('uuid'+this.uuid);
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
		mounted(){
			var that = this;
			if(window.plus){  
				that.plusReady(); 	
			}else{  
				that.plusReady();    
			}  
			//this.$refs.logBg.style.height = document.documentElement.clientHeight+"px";
			 plus.oauth.getServices(
      function(services) {
        that.auths = services;
      },
      function(e) {
        console.log("获取登录服务列表失败：" + e.message + " - " + e.code);
      }
    );
		},
		watch:{
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
		}
		
	}
</script>

<style scoped>
	#tmpl{
		margin-top: 0;
		margin-bottom: 0;
	}
	
	.loginbg img{
		width: 100%;
		height: 100%;
		vertical-align:bottom;
	}
	.loginbgin{
		z-index: 100;
		position: absolute;
		margin-top: -151%;
		margin-left: 15%;
		width: 70%;
	}
	.loging{
		width: 80%;
		height: 30px;
		position: absolute;
		margin-top: -103%;
		margin-left: 10%;
	}
	.loging span{
		display: inline-block;
		width: 100%;
		height:45px;
		background-color:#4171AE ;
		line-height: 45px;
		text-align: center;
		margin-left: 0px;
		margin-top: 3%;
		color:  #F4F3F9;
		font-weight: normal;
		font-family: "Microsoft YaHei";
		border-radius: 1px;
	}
	#username{
		display: inline-block;
		width: 100%;
		height:45px;
		background-color:#F4F3F9;
		line-height: 45px;
		text-align: center;
		margin-left: 0px;
		margin-top: 3%;
		color:   #4171AE ;
		font-weight: normal;
		font-family: "Microsoft YaHei";
		border-radius: 1px;
	}
	#code{
		position: absolute;
		width: 30%;
		height: 27px;
		background-color:  #4171AE;
		color: #F4F3F9;
		font-size: 14px;
		font-family: "Microsoft YaHei";
		line-height: 25px;
		top: 187%;
		left: 68%;
	}
	.loging input{
		border: 0;
		position: relative;
		background-color: rgba(255,255,255,0);
		padding-left: 15%;
		font-weight: 500;
		font-size: 16px;
	}
	.loging .tip01{
		position: absolute;
		width: 1.125rem /* 18/16 */;
		height: 1.125rem /* 18/16 */;
		top: .5625rem /* 9/16 */;
		right:.0625rem /* 1/16 */;
	}
	.loging .user{
		background-image: url(../../../statics/imgs/SHOUYE_28.png);
		background-size: 400px;
		background-repeat :no-repeat;
	}	
	.loging .pwd{
		background-image: url(../../../statics/imgs/SHOUYE_40.png);
		background-size: 400px;
		background-repeat :no-repeat;
	}
	.loging .under{
		width: 100%;
	}
	.loging .under span{
		background-color: rgba(255,255,255,0);
		width: 40%;
		height: 20px;
		line-height: 20px;
		font-size: 12px;
		font-weight: normal;
		font-family: "Microsoft YaHei";
	}
	.loging .under .zhuce{
		text-align: left;
		float: left;
	}	
	.loging .under .remember{
		text-align: right;
		float: right;
	}
	.other{
		position: relative;
	}
	.other .left{
		width: 35%;
		margin-top: 13%;
		border-top:1px solid  #4171AE;
		position: relative;

	}
	.other .right{
		width: 35%;
		margin-top: 0%;
		border-top:1px solid #4171AE;
		position: relative;
		left: 65%;
	}
	.other .tip{
		position: absolute;
		width: 90px;
		color: #4171AE;
		font-size: 14px;
		font-family: "Microsoft YaHei";
		top:-10px;
		left: 50%;
		text-align: center;
		margin-left: -14%;

	}
	.other .others{
		/* background-color: pink; */
		margin-top: 10%;
	}
	.other .others div{

		display: inline-block;
		/* background-color: red; */
		width: 32%;
		margin-left: 16%;
	}
	.other .others img{
		width: 55%;
	}
</style>