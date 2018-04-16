<template>
	<div id="tmpl">
	
		<div class="loginbg" ref="logBg">
			<img src="../../../statics/imgs/SHOUYE_03.png">
			<com-header :title="title"></com-header>
			<div class="loging">
				<input class="phone" type="number" placeholder="请输入常用手机号" v-model="phone">
				<!-- <img src="../../../statics/imgs/denglu109.png" alt="" class="tipphone"> -->
				<img :src="imgurlok" alt="" class="tipphone">
				<input class="code" type="number" placeholder="请输入验证码" v-model="code">
				<input class="newpwd" type="password" placeholder="请输入新密码" v-model="newpwd">
				<!-- <img src="../../../statics/imgs/denglu109.png" alt="" class="tipnpwd"> -->
				<img :src="imgurlok" alt="" class="tipnpwd">
				<input class="pwd" type="password" placeholder="请确认密码" v-model="pwd">
				<!-- <img src="../../../statics/imgs/denglu109.png" alt="" class="tippwd"> -->
				<img :src="imgurlok" alt="" class="tippwd">
					<span  id="code"  @click="get">获取验证码{{second}}</span>
					<span  id="submit"  @click="submit" class="divcssss">确认修改</span>
			</div>
		</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import common from '../../kits/common.js';//api
import "../../kits/jquery.min.js";
import comHeader from '../../kits/comheader';
import { Indicator } from 'mint-ui';
import imgurlok from '../../../statics/imgs/denglu109.png';
import imgurlno from '../../../statics/imgs/denglu117.png';
	export default{
		data(){
			return{
				title:'找回密码',
				phone:'',
				code:'',
				newpwd:'',
				pwd:'',
				second:'',
				phonetrue:'',
				npwdtrue:'',
				pwdtrue:'',
				imgurlok:imgurlok,
				imgurlno:imgurlno,
			}
		},
		components: {
            "com-header":comHeader,
        },
		methods:{
			submit:function(){	
				if(this.phonetrue&&this.npwdtrue&&this.pwdtrue){
					var url = common.apimain + '/api/user/passwordReset';
					var json = {
						password:this.newpwd,
						repassword:this.pwd,
						phone:this.phone,
						code:this.code
						}
					Indicator.open();
					this.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
						//提交改密码信息
						var body = res.body;
						if(body.code == 1000){
							Indicator.close();
						
							Toast({message:"修改密码成功，请重新登录",duration: 800});
							this.$router.push({path:'/loginphone'});
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
					Toast({message: '请检查您的输入信息',duration: 800});
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
						var url2 = common.apimain + '/api/user/sendCode';
						var json2 = {
							phone:this.phone,
							method:'2'
							};
						this.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
							var body = res.body;
							if(body.code == 1000){				
									//未注册提示手机号有误
									//console.log(this)
								
									Toast({message: '您输入的手机有误！',duration: 800});
										$('#code').css('background','#4171AE');
										$('#code').attr('disabled',false);
										this.second = null ;
							}else{
								//注册了发送短信验证码
								this.$http.post(url2,json2,{emulateJSON: true},{timeout:15000}).then(function(res){
											var body = res.body;
											if(body.code == 1000){
												Toast('验证码发送成功');
												 setTimeout(function(){   //定时器控制button属性
													//console.log(123)
														$('#code').css('background','#4171AE');
														$('#code').attr('disabled',false);
														this.second = null ;
													},30000)

											}else{
												Toast({message: body.message,duration: 800});
													$('#code').css('background','#4171AE');
													$('#code').attr('disabled',false);
													this.second = null ;
											}
										},function(){
											
											Toast({message:'网络连接错误',duration: 800});
										})
							}
						},function(){
							
							Toast({message: '网络连接错误',duration: 800});
						})
				}else{
					
					Toast({message: "请检查手机号码格式",duration: 800});
				}

			},
			backto(){
				//利用路由对象中go（-1）实现
				this.$router.go(-1);
			}
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
			newpwd(newval,oldval){
				var re =/^[A-Za-z0-9]{6,12}$/;
				 var result=  re.test(newval);
				 if(!result){
					// $(".tipnpwd").attr("src",'../../../statics/imgs/denglu117.png');
					var imgurl = this.imgurlno;
					$(".tipnpwd").attr("src",imgurl);
					 this.npwdtrue = false;
				 }else{
					// $(".tipnpwd").attr("src",'../../../statics/imgs/denglu109.png');
					var imgurl = this.imgurlok;
					$(".tipnpwd").attr("src",imgurl);
					 this.npwdtrue = true;
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
		mounted(){
			this.$refs.logBg.style.height = document.documentElement.clientHeight+"px";
		}
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
		font-size: 16px;
	}
	#back img{
		position: absolute;
		width: 1rem /* 16/16 */;
		height: 1.5rem /* 24/16 */;
		top: 0rem /* 0/16 */;
		left: -1.5rem /* 24/16 */;
	}
	header{
		width: 100%;
		position: absolute;
		top: 0;
		height: 3.125rem /* 50/16 */;
		background-color: #4171AE;
		color: #F4F3F9;
		text-align: center;
		font-weight: normal;
		font-family: "Microsoft YaHei";
		line-height: 3.125rem /* 50/16 */;
		font-size: 1rem /* 16/16 */;
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
		width: 80%;
		height: 30px;
		position: absolute;
		margin-top: -130%;
		margin-left: 10%;
	}
	.loging span{
		display: inline-block;
		width: 100%;
		height:45px;
		line-height: 45px;
		text-align: center;
		margin-left: 0px;
		margin-top: 3%;
		font-weight: normal;
		font-family: "Microsoft YaHei";
		border-radius: 1px;
		font-size: 1rem /* 16/16 */;
	}
	#code{
		position: absolute;
		width: 33%;
		height: 30px;
		background-color:  #4171AE;
		color: #F4F3F9;
		font-size: 14px;
		font-family: "Microsoft YaHei";
		line-height: 30px;
		top: 165%;
		left: 67%;
	}
		
	.loging .phone{
		background-image: url(../../../statics/imgs/SHOUYE_28.png);
		
	}
	.loging .tipphone{
		position: absolute;
		width: 1.125rem /* 18/16 */;
		height: 1.125rem /* 18/16 */;
		top: 0rem /* 0/16 */;
		right:0rem /* 0/16 */;
	}
	.loging .code{
		background-image: url(../../../statics/imgs/SHOUYE_21.png);
		
	}
	.loging .newpwd{
		background-image: url(../../../statics/imgs/SHOUYE_40.png);
		
	}
	.loging .tipnpwd{
		position: absolute;
		width: 1.125rem /* 18/16 */;
		height: 1.125rem /* 18/16 */;
		top: 7.5rem /* 120/16 */;
		right:0rem /* 0/16 */;
	}
	.loging .pwd{
		background-image: url(../../../statics/imgs/SHOUYE_401.png);
		
	}
	.loging .tippwd{
		position: absolute;
		width: 1.125rem /* 18/16 */;
		height: 1.125rem /* 18/16 */;
		top: 11.0625rem /* 177/16 */;
		right:0rem /* 0/16 */;
	}
	.loging input{
		border: 0;
		background-size: 400px;
		background-repeat :no-repeat;
		background-color: rgba(255,255,255,0);
		padding-left: 15%;
		position: relative;
		font-weight: 500;
		font-size: 16px;
	}
</style>