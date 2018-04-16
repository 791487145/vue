<template>
	<div id="tmpl">
	<!-- 返回功能 -->
		
		<div class="loginbg" ref="logBg">
			<img src="../../../statics/imgs/SHOUYE_03.png">
			<com-header :title="title"></com-header>
			<div class="loging">
				<!--<input class="user" type="text" placeholder="用户名(4-15位字母或数字)" v-model="username">-->
				<!-- <img src="../../../statics/imgs/denglu109.png" alt="" class="tipuser"> -->
				<!--<img :src="imgurlok" alt="" class="tipuser">-->
				<input class="phone" type="number" placeholder="请输入常用手机号" v-model="phone">
				<!-- <img src="../../../statics/imgs/denglu109.png" alt="" class="tipphone"> -->
				<img :src="imgurlok" alt="" class="tipphone">
				<input class="code" type="number" placeholder="请输入验证码" v-model="code">
				<input class="pwd" type="password" placeholder="设置登录密码，不少于6位" v-model="pwd">
				<!-- <img src="../../../statics/imgs/denglu109.png" alt="" class="tippwd"> -->
				<img :src="imgurlok" alt="" class="tippwd">
				<input class="pwd-code" type="number" placeholder="请输入推广码(非必填项)" v-model="promote_code">
					<button  id="code"  @click="get">获取验证码{{second}}</button>
					<span id="submit" @click="submit" ref="zhuce" class="divcssss">注册</span>	
				
				<div class="under">
						
						<div class="left" @click="yes">
						<a href="javascript:;" class="yes">
							<img v-if="isshow" src="../../../statics/imgs/SHOUYE_70.png">
						</a>
						
								已阅读并同意
						</div>
						<router-link to="agree">
							<div class="right"><<软件许可及服务协议>></div>	
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
import { Toast } from 'mint-ui';
import common from '../../kits/common.js';//api
import "../../kits/jquery.min.js";
import { Indicator } from 'mint-ui';
import bus from '../../kits/bus.js';
import comHeader from '../../kits/comheader';
import imgurlok from '../../../statics/imgs/denglu109.png';
import imgurlno from '../../../statics/imgs/denglu117.png';
	export default{
		data(){
			return{
				title:'用户注册',
				username:'',
				phone:'',
				pwd:'',
				code:'',
				promote_code:'',
				isshow:true,
				second:'',
				phonetrue:false,
				pwdtrue:false,
				imgurlok:imgurlok,
				imgurlno:imgurlno,
				  auths: [],
			}
		},
		components: {
            "com-header":comHeader,
        },
		methods:{
			yes:function(){
				if(this.isshow){
					this.isshow = false;
					
				}else{
					this.isshow = true;
				
				}
			},
			submit:function(){
				if(this.phonetrue&&this.pwdtrue&&this.code){
							//提交注册
							//console.log(this.username)
							var url = common.apimain + '/api/user/register';
							var json = {
								phone:this.phone,
								password:this.pwd,
								code:this.code,
								promote_code:this.promote_code,
								source:'2'
								};
							if(this.isshow){
								Indicator.open();
								this.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
									var body = res.body;
									//console.log(body);
									if(body.code == 1000){
										Indicator.close();
										Toast({message: body.message,duration: 800});
										this.$router.push({path:'/home'});
										//注册成功生成cookies
										var cookies = body.data.token;	
									    localStorage.setItem('cookies', cookies);

									}

									else{
										Indicator.close();
										//console.log(body.message);
										Toast({message: body.message,duration: 800});
									}
								},function(){
												//console.log('失败了');
												Indicator.close();
												Toast('网络连接错误');
								});
							}else{
								Toast("请阅读协议并同意");
								
							}
				}
				else{
					Toast({message: '请检查输入信息',duration: 800});
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
					}
					else if(that.second <= 1){
						that.second = null;
						clearInterval(timedao);
					}
				
				},1000)
			},
			//手机是否注册
			get:function(){
				if(this.phonetrue){
					
					var that = this;
					$('#code').attr('disabled','disabled');

						$('#code').css('background','#656565');
							that.timeup();//改变button属性 调用定时器
					//console.log(this.$http);
					//验证手机是否被注册
					var url = common.apimain + '/api/user/vertify/phone';
					var json = {
						phone:this.phone
						}; 
					this.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
						var body = res.body;
						if(body.code == 1000){

								//未注册发送请求验证码
								//console.log(this)
								var url2 = common.apimain + '/api/user/sendCode';
								var json2 = {
									phone:this.phone,
									method:'1'
									};
 								this.$http.post(url2,json2,{emulateJSON: true},{timeout:15000}).then(function(res){
										var body = res.body;
										if(body.code == 1000){											
											Toast('发送成功');
										}else{
											Toast(body.message);
										}
									},function(){
										Toast('网络连接错误');
									})
							
							 setTimeout(function(){   //定时器控制button属性
								//console.log(123)
								$('#code').css('background','#4171AE');
								$('#code').attr('disabled',false);
								this.second = null ;
							},30000)

							}else if(body.code == 2000){
							//其他情况提示
							Toast('该手机已注册');//
							$('#code').css('background','#4171AE');
							$('#code').attr('disabled',false);
							this.second = null ;
						}else{
							Toast(body.message);
							this.second = null ;
							$('#code').css('background','#4171AE');
							$('#code').attr('disabled',false);
						}
					},function(){
						Toast('网络连接错误');
					});

				}else{
					Toast("请检查手机号格式")
				}
				
			},
			backto(){
				//利用路由对象中go（-1）实现
				this.$router.go(-1);
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
			this.$refs.logBg.style.height = document.documentElement.clientHeight+"px";
			 plus.oauth.getServices(
      function(services) {
        that.auths = services;
      },
      function(e) {
        console.log("获取登录服务列表失败：" + e.message + " - " + e.code);
	  }
			 )
		},
		watch:{
			phone(newval,oldval){
				var re =/^1[3|4|5|8|7][0-9]\d{8}$/;
				 var result=  re.test(newval);
				 if(!result){
					// $(".tipphone").attr("src",'../../../statics/imgs/denglu117.png');
					var imgurl = this.imgurlno;
					$(".tipphone").attr("src",imgurl);
					 this.phonetrue = false;
				 }else{
					// $(".tipphone").attr("src",'../../../statics/imgs/denglu109.png');
					var imgurl = this.imgurlok;
					$(".tipphone").attr("src",imgurl);
					 this.phonetrue = true;
				 }
			},
			username(newval,oldval){
				var re =/^[A-Za-z0-9]{4,15}$/;
				 var result=  re.test(newval);
				 if(!result){
					 //$(".tipuser").attr("src",'../../../statics/imgs/denglu117.png');
					 var imgurl = this.imgurlno;
					$(".tipuser").attr("src",imgurl);
					 this.usertrue = false;
				 }else{
					// $(".tipuser").attr("src",'../../../statics/imgs/denglu109.png');
					var imgurl = this.imgurlok;
					$(".tipuser").attr("src",imgurl);
					 this.usertrue = true;
				 }
			},
			pwd(newval,oldval){
				var re =/^[A-Za-z0-9]{6,12}$/;
				 var result=  re.test(newval);
				 if(!result){
					 //$(".tippwd").attr("src",'../../../statics/imgs/denglu117.png');
					 var imgurl = this.imgurlno;
					$(".tippwd").attr("src",imgurl);
					 this.pwdtrue = false;
				 }else{
					// $(".tippwd").attr("src",'../../../statics/imgs/denglu109.png');
					var imgurl = this.imgurlok;
					$(".tippwd").attr("src",imgurl);
					 this.pwdtrue = true;
				 }
			},
		},
	}
</script>

<style scoped>
	#tmpl{
		margin-top: 0;
		margin-bottom: 0;
	}
	#back{
		width: 60px;
		position: absolute;
		top: 13px;
		left: 13px;
		z-index: 101;
	}
	#back a{
		position: relative;
		color: white;
		font-size: 1.125rem /* 18/16 */;
	}
	#back img{
		position: absolute;
		width: 1rem /* 16/16 */;
		height: 1.5rem /* 24/16 */;
		top: 0rem /* 0/16 */;
		left: -1.0625rem /* 17/16 */;
	}
	header{
		width: 100%;
		position: absolute;
		top: 0;
		height: 50px;
		background-color: #4171AE;
		color: #F4F3F9;
		text-align: center;
		font-weight: 500;
		font-family: "Microsoft YaHei";
		line-height: 3.125rem /* 50/16 */;
		font-size: 1.125rem /* 18/16 */;
		position: fixed;
		position: fixed;
	}
	.loginbg img{
		width: 100%;
		height: 100%;
		vertical-align:bottom;
	}
	.loginbgin{
		z-index: 100;
		position: absolute;
		margin-top: -170%;
		margin-left: 15%;
		width: 70%;
	}
	.loging{
		width: 100%;
		height: 30px;
		position: absolute;
		margin-top: -145%;

	}
	#submit{
		display: inline-block;
		width: 80%;
		height:45px;
		line-height: 45px;
		text-align: center;
		margin-left: 10%;
		margin-top: 8%;
		font-weight: normal;
		font-family: "Microsoft YaHei";
		font-size: 1rem /* 16/16 */;
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
		top: 194%;
		left: 60%;
		text-align: center;
	}
	.isdis{
		background-color: #929292 !important;
	}
	.loging input{
		border: 0;
		background-size: 400px;
		background-repeat :no-repeat;
		background-color: rgba(255,255,255,0);
		padding-left: 12%;
		margin-left: 10%;
		margin-right: 10%;
		width: 80%;
		font-size: 1rem /* 16/16 */;
		position: relative;
		font-weight: 500;
	}

	.loging .user{
		background-image: url(../../../statics/imgs/SHOUYE_37.png);
		
	}
	.loging .tipuser{
		position: absolute;
		width: 1.125rem /* 18/16 */;
		height: 1.125rem /* 18/16 */;
		top: .6875rem /* 11/16 */;
		right:2.3125rem /* 37/16 */;
	}	
	.loging .phone{
		background-image: url(../../../statics/imgs/SHOUYE_28.png);
		
	}
	.loging .tipphone{
		position: absolute;
		width: 1.125rem /* 18/16 */;
		height: 1.125rem /* 18/16 */;
		top: 0.5rem /* 67/16 */;
		right:2.3125rem /* 37/16 */;
	}	
	.loging .code{
		background-image: url(../../../statics/imgs/SHOUYE_21.png);
		
	}
	.loging .pwd{
		background-image: url(../../../statics/imgs/SHOUYE_40.png);
		
	} 
	.loging .tippwd{
		position: absolute;
		width: 1.125rem /* 18/16 */;
		height: 1.125rem /* 18/16 */;
		top: 7.5rem /* 177/16 */;
		right:2.3125rem /* 37/16 */;
	}	
	.loging .pwd-code{
		background-image: url(../../../statics/imgs/SHOUYE_24.png);
		
	}
	.loging .under{
		width: 100%;
		padding-top:10px;
		position: relative;
	}
	.loging .under .yes{
		width: 18px;
		height: 18px;
		position:absolute;
		top:13px;
		left: 64px;
		border: 1px solid #4171AE;
		border-radius: 9px;
	}
	.loging .under img{
		position:absolute;
		left: 0px;
	}
	.loging .under div{
		display: inline-block;
		width: 45%;
		height: 15px;
		font-size: 9px;
		font-family: "Microsoft YaHei";
		color: #868686;
	}
	.loging .under .left{
		text-align: right;
	}
	.loging .under .right{
		text-align: left;
		color:#4171AE;
	}
	
	.other{
		position: relative;
		width: 90%;
		padding-left: 10%;
	}
	.other .left{
		width: 35%;
		margin-top: 16%;
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
		margin-left: -7%;

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