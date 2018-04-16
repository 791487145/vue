<template>
	<div id="tmpl">
	<!-- 返回功能 -->
		<div id="back">
			<a href="javascript:void(0)" @click="backto">
				<img src="../../../statics/imgs/toback.png">
			</a>
		</div>
		<div class="loginbg" ref="logBg">
			<img src="../../../statics/imgs/SHOUYE_03.png">
			<header class="divcss">找回密码</header>
			<div class="loging">
				<input class="phone" type="number" placeholder="请输入常用手机号" v-model="phone">
					<span  id="code" class="divcss" @click="get">下一步</span>
			</div>
		</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import common from '../../kits/common.js';//api
import { Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				phone:'',
			}
		},
		methods:{
			//手机是否注册
			get:function(){
				var url = common.apimain+'/api/user/vertify/phone';
				var json = {
					phone:this.phone
				}
				Indicator.open();
				this.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){					
					var body =  res.body;		
					if(body.code == 1000){
						Indicator.close();
						MessageBox.confirm('您的手机还未注册，是否现在注册？').then(action => {
				 			  this.$router.push({path:'/register'});	 	 
				 		});
					}else if(body.code == 2000){
						Indicator.open();					
						 this.$router.push({path:'/setpwd'});						
					}else{
						Indicator.close();
						Toast(body.message)
					}
				},function(){
					//console.log('失败了');
					Indicator.close();
					Toast('网络连接错误');
				})
				
			},
			backto(){
				//利用路由对象中go（-1）实现
				this.$router.go(-1);
					
			}
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
		width: 28px;
		height: 16px;
		top: 8px;
		left: 0px;
	}
	header{
		width: 100%;
		position: absolute;
		top: 0;
		height: 50px;
		background-color: #4171AE;
		color: #F4F3F9;
		text-align: center;
		font-weight: normal;
		font-family: "Microsoft YaHei";
		line-height: 60px;
		font-size: 16px;
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
		top: 7.5rem /* 120/16 */;
		margin-left: 10%;
	}
	.loging span{
		display: inline-block;
		width: 100%;
		height:45px;
		background-color:#4171AE;
		line-height: 45px;
		text-align: center;
		margin-left: 0px;
		margin-top: 3%;
		color: #F4F3F9;
		font-weight: normal;
		font-family: "Microsoft YaHei";
		border-radius: 1px;
	}
	#code{
		position: absolute;
		width: 80%;
		height: 50px;
		background-color:  #4171AE;
		color: #F4F3F9;
		font-size: 16px;
		font-family: "Microsoft YaHei";
		line-height: 50px;
		top: 267%;
		left: 10%;
	}
		
	.loging .phone{
		background-image: url(../../../statics/imgs/SHOUYE_28.png);
		
	}
	.loging input{
		border: 0;
		background-size: 400px;
		background-repeat :no-repeat;
		background-color: rgba(255,255,255,0);
		padding-left: 15%;
	}
</style>