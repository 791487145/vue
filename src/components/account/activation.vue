<template>
	
	<div id="tmpl">
		
		<div class="loginbg" ref="logBg">
			<img src="../../../statics/imgs/SHOUYE_03.png">
			<header>
				<!-- 返回功能 -->
		<div id="back">
			<a href="javascript:void(0)" @click="backto">
				<img src="../../../statics/imgs/jiantou-1.png">
			</a>
		</div>
				账号激活
			</header>
		
					
					<div class="activation">
						<div class="on" v-if="ishidden">
							<span class="left">激活费用</span>
							<span class="right money" style="color:#4171AE ">￥ 10.00</span>
						</div>
						<div class="under" v-if="isshow">
							<span class="left">激活码</span>
							<input type="text" placeholder="请输入激活码" class="key"  v-model="code">
						</div>
					</div>

					<span  id="code"  @click="get">激活</span>
					<span  id="code02"  @click="over">放弃激活</span>	
				
					<div class="pay">
						<span class="payfor">选择支付方式</span>
						<div>
							<span  class="left">还需支付</span>
							<span class="right money" style="color:#F76740" id="ispay">￥ 0.00</span>
						</div>
						<div @click="active02" >
							<img src="../../../statics/imgs/jihuo-1.png">
							<span class="weixin">微信支付</span>
							<a href="javascript:void(0)" ref="active02" ></a>
						</div>
						<div @click="active03">
							<img src="../../../statics/imgs/jihuo-3.png">
							<span class="weixin">支付宝支付</span>
							<a href="javascript:void(0)" ref="active03"></a>
						</div>
						<div @click="active01" >
							<span class="weixin">激活码激活</span>
							<a href="javascript:void(0)" ref="active01" class="active"></a>
						</div>
					</div>
		</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import common from '../../kits/common.js';
import { Indicator } from 'mint-ui';//加载动画
import '../../kits/jquery.min.js';
	export default{
		data(){
			return{
				phone:'', 
				code:'',
				isshow:true,
				ishidden:false,
				aliChannel:'',
				wxChannel:'',
				payfor:'code',
				ALIPAYSERVER:'',
				WXPAYSERVER:'',
				uid:'',
				uuid:'',
			}
		},
		
		methods:{
			get:function(){
				var that = this;
				if(that.payfor == 'code'){
						var url = common.apimain+'/api/user/activite/invitationcode';
						var json = {
							invitation_code:that.code,
							user:that.$route.params.id,
							uuid:that.uuid,
						}
						Indicator.open();
						that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
							var body = res.body;
							//console.log(body);
							if(body.code == 1000){
								Indicator.close();
								Toast({message: '激活成功,请重新登录',duration: 800});
								var token = body.data.token;
     							localStorage.setItem('token', token);
								that.$router.push({path:'/loginuser'});

							}else{
								Indicator.close();
								Toast({message: body.message,duration: 800});
							}
						},function(){
							Indicator.close();
							Toast('网络连接超时，请检查后再试');
						})
				}else {
					var id = that.payfor;
					var channel = null;
					// 从服务器请求支付订单
    				var PAYSERVER='';
    				if(id=='alipay'){
       					PAYSERVER='http://pay.zfy0351.cn/Home/Pay/aliActivation/mobile/'+that.$route.params.id+'/pay_id/1';
       					channel = that.aliChannel;
   	 				}else if(id=='wxpay'){
        				PAYSERVER='http://pay.zfy0351.cn/Home/Pay/wxActivation/mobile/'+that.$route.params.id+'/pay_id/1';
        				channel = that.wxChannel;
					}
					console.log(PAYSERVER)

					//console.log(channel)
    				var xhr=new XMLHttpRequest();
    				xhr.onreadystatechange=function(){
        				switch(xhr.readyState){
        	    			case 4:
        	    			if(xhr.status==200){
        	        			plus.payment.request(channel,xhr.responseText,function(result){
        	            			plus.nativeUI.alert("支付成功！",function(){
										
										var url = common.apimain+'/api/user/getToken';
										var json = {
												mobile:that.$route.params.id,
												uuid:that.uuid,
										}
										that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
												var body = res.body;
												//console.log(body);
												if(body.code == 1000){
													Toast({message: '激活成功,请重新登录',duration: 800});
													var token = body.data.token;
													localStorage.setItem('token', token);
													that.$router.push({path:'/loginuser'});

												}else{
													Toast({message: body.message,duration: 800});
												}
											},function(){
												Toast({message:'网络连接超时，请检查后再试',duration: 800});
											})
									back();
        	           	 		});
        	        			},function(error){
									plus.nativeUI.alert("支付失败");
									console.log("支付失败"+error.code)
        	        			});
        	    			}else{
        	        			alert("获取订单信息失败！");
        	    			}
        	    			break;
        	    		default:
        	    		break;
        				}
   			 		}
    			xhr.open('GET',PAYSERVER);
    			xhr.send();
				}
								
			},
			over:function(){				
				this.$router.push({path:'/loginuser'});				
			},
			active01:function(){
				this.$refs.active01.className="active";
				this.$refs.active02.className="";
				this.$refs.active03.className="";
				this.isshow =  true;
				this.ishidden = false;
				$("#ispay").text("￥ 0.00");
				this.payfor = 'code';
			},
			active02:function(){
				this.$refs.active02.className="active";
				this.$refs.active01.className="";
				this.$refs.active03.className="";
				this.isshow =  false;
				this.ishidden = true;
				$("#ispay").text("￥ 10.00");
				this.payfor = 'wxpay';
			},
			active03:function(){
				this.$refs.active03.className="active";
				this.$refs.active02.className="";
				this.$refs.active01.className="";
				this.isshow =  false;
				this.ishidden = true;
				$("#ispay").text("￥ 10.00");
				this.payfor = 'alipay';
			},
			backto(){
				//利用路由对象中go（-1）实现
				this.$router.go(-1);
			},
		},
		mounted(){			
			var that = this;
			//that.$refs.tmpld.style.height = document.documentElement.clientHeight+"px";
			//支付
				that.uuid= plus.device.uuid;
				plus.payment.getChannels(function(channels){
    			that.aliChannel=channels[0];
				that.wxChannel=channels[1];
				//console.log(123)  
       			//console.log(that.aliChannel)
       			//console.log(that.wxChannel)
    			},function(e){
       			 alert("获取支付通道失败："+e.message);
				});
				
				// //获取uid
				// var url = common.apimain + '';
 				// var json = {
				// 	phone:that.$route.params.id
				// }
				// //console.log(json)
        	    // that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then((response) => {
				// 	var body = response.body;
				// 	//console.log(body)
				// 	if(body.code==1000){
				// 		var data = body.data;
				// 		that.uid = data
				// 		//console.log(data)

				// 	}
	
        	    // }, (response) => {
        	    //         console.log('网络连接错误，请稍后重试');
        	    // });
		},
		watch:{
			payfor(newval){
				//console.log(newval);
			},
		},
	}
</script>

<style scoped>
	#tmpl{
		margin-top: 0;
		margin-bottom: 0;
	}
	/* 返回样式 */
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
		left: -1.375rem /* 22/16 */;
	}
	header{
		width: 100%;
		position: fixed;
		top: 0;
		height: 3.125rem /* 50/16 */;
		background-color: #4171AE;
		color: #F4F3F9;
		text-align: center;
		font-weight: normal;
		font-family: "Microsoft YaHei";
		line-height:3.125rem /* 50/16 */;
		font-size: 1rem /* 16/16 */;
		min-width: 320px;
		max-width: 640px;
		margin: 0 auto;
		z-index: 110;
	}
	
	.loginbg img{
		width: 100%;
		height: 100%;
		vertical-align:bottom;
	}
	.loginbg{
		position: relative;
		min-width: 320px;
		max-width: 640px;
		margin: 0 auto;
	}
	
	.activation{
		width: 100%;
		height: 6.25rem /* 100/16 */;
		position: absolute;
		top:4.375rem /* 70/16 */;
		
	}
	.activation div{
		width: 100%; 
		height: 3.125rem /* 50/16 */;
		background-color: #F6F7FA;
		border-top: 1px solid #E5E5E5;
		padding:0 1.25rem /* 20/16 */;
	}
	.activation span{
		display:block;
		height: 3.125rem /* 50/16 */; 
		line-height: 3.125rem /* 50/16 */;
		color: #B4B3B5; 
		font-family: "Microsoft YaHei";
		font-size: .875rem /* 14/16 */;
	}
	.activation .key{
		border:none;
		background-color: rgba(255,255,255,0);
		width: 80%;
		height: 3.125rem /* 50/16 */;
		float: right;
		text-align: right;
		font-size: 1rem /* 16/16 */;
		font-weight: 500;
	}
	.activation .left{
		float: left;
		color: #4171AE;
	}
	.activation .right{
		float: right;
	}
	.pay{
		width: 100%;
		height: 9.375rem /* 150/16 */;
		position: absolute;
		top: 9.375rem /* 150/16 */;
	}
	.pay div{
		width: 100%; 
		height: 3.125rem /* 50/16 */;
		background-color: #F6F7FA;
		border-top: 1px solid #E5E5E5;
		padding: 0 1.25rem /* 20/16 */;
	}
	.pay span{
		display:block;
		height: 3.125rem /* 50/16 */;
		line-height: 3.125rem /* 50/16 */;
		color: #4171AE; 
		font-family: "Microsoft YaHei";
		font-size: .875rem /* 14/16 */;
	}
	.pay img{
		width: 2rem /* 32/16 */;
		height: 2rem /* 32/16 */;
		float: left;
		margin-top: .5625rem /* 9/16 */;
	}
	.pay .payfor{
		padding-left: 1.5625rem /* 25/16 */;
		font-size: .75rem /* 12/16 */;
		color: #B4B3B5;
		height: 1.25rem /* 20/16 */;
		line-height: 1.25rem /* 20/16 */;
	}
	.pay .weixin{
		margin-left: .75rem /* 12/16 */;
		float: left;
	}
	.pay .right{
		float: right;
	}
	.pay .left{
		float: left;
	}
	.money{
		font-weight: bold;
	}
	.pay a{
		display: block;
		float: right;
		width: 1.25rem /* 20/16 */;
		height: 1.25rem /* 20/16 */;
		border: 1px solid #4171AE;
		border-radius: .625rem /* 10/16 */;
		margin-top: .9375rem /* 15/16 */;
		-webkit-background-size: .625rem /* 10/16 */;
		background-size: 1.125rem /* 18/16 */;
	}
	.pay .active{
		background-image: url(../../../statics/imgs/jihuo-2.png);
	}
	#code{
		position: absolute;
		width: 76%;
		height: 3.125rem /* 50/16 */;
		background-color:  #4171AE;
		color: #F4F3F9;
		font-size: 1rem /* 16/16 */;
		font-family: "Microsoft YaHei";
		line-height: 3.125rem /* 50/16 */;
		top: 25rem /* 400/16 */;
		left: 12%;
		border-radius: 1px;
		text-align: center;
	}
	#code02{
		position: absolute;
		width: 76%;
		height: 3.125rem /* 50/16 */;
		background-color:  #F4F3F9;
		color: #4171AE;
		font-size: 1rem /* 16/16 */;
		font-family: "Microsoft YaHei";
		line-height: 3.125rem /* 50/16 */;
		top: 29.375rem /* 470/16 */;
		left: 12%;
		border-radius: 1px;
		text-align: center;
	}
</style>