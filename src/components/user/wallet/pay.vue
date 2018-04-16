<template>
	<div id="tmpld" ref="tmpld">
		<com-header :title="title"></com-header>
		<section>	
			<div class="pay_top">
				<p>请选择充值金额</p>
				<div class="input_type">
					<p>{{ picked || '请选择你要充入的金额'}}</p>
					<p>元</p>
				</div>
				<div class="maney">
					<div class="list_maney">
						<input type="radio" id="one" value="10" v-model="picked" class="check">
						<label for="one">10</label>
					</div>
					<div class="list_maney">
						<input type="radio" id="two" value="30" v-model="picked" class="check">
						<label for="two">30</label>
					</div>
					<div class="list_maney">
						<input type="radio" id="twoq" value="50" v-model="picked" class="check">
						<label for="twoq">50</label>
					</div>
					<div class="list_maney">
						<input type="radio" id="twow" value="100" v-model="picked" class="check">
						<label for="twow">100</label>
					</div>
					<div class="list_maney">
						<input type="radio" id="twovw" value="200" v-model="picked" class="check">
						<label for="twovw">200</label>
					</div>

				</div>
				
			</div>

			<div class="pay">
				<span class="payfor">选择支付方式</span>
				<div @click="active01" >
					<dl class="weixin">
						<dt><img src="../../../../statics/imgs/wallet_34.png"></dt>
						<dd>
							<p>微信支付</p>  
								<span>推荐已安装微信的用户使用</span>
						</dd>
					</dl>
					<a href="javascript:void(0)" ref="active01" class="active"></a>
				</div>
				<div @click="active02" >
					<dl class="weixin">
						<dt><img src="../../../../statics/imgs/wallet_41.png"></dt>
						<dd>
							<p>支付宝支付</p>  
							<span>推荐已安装支付宝的用户使用</span>
						</dd>
					</dl>
					<a href="javascript:void(0)" ref="active02"></a>
				</div>
				<!-- <div @click="active03" >
					<dl class="weixin">
						<dt><img src="../../../../statics/imgs/jihuo-3.png"></dt>
						<dd>
							<p>银行卡支付</p>  
							<span>推荐已安装微信的用户使用</span>
						</dd>
					</dl>
					<a href="javascript:void(0)" ref="active03"></a>
				</div> -->
			</div>
			<button class="btn divcssss" @click="pay">立即充值</button>
		</section>	
	</div>
	
</template>

<script>
 import common from '../../../kits/common.js';//api
 import comheader from '../../../kits/comheader.vue'
 import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				title:"充值",
				picked:'',
				aliChannel:'',
				wxChannel:'',
				payfor:'wxpay',
				ALIPAYSERVER:'http://pay.zfy0351.cn/Home/Pay/alipay',
				WXPAYSERVER:'http://pay.zfy0351.cn/Home/Pay/wxpay',
				uid:'',
				pay_id:'',
			}
		},
		components:{
			ComHeader:comheader
		},
		methods:{
			// 头部返回
			 toback:function(){
                //console.log(this.title)
                this.$router.go(-1);
            },
			// 支付选择
			active01:function(){
				this.$refs.active01.className="active";
				this.$refs.active02.className="";
				// this.$refs.active03.className="";
				this.payfor = 'wxpay';
			},
			active02:function(){
				this.$refs.active02.className="active";
				this.$refs.active01.className="";
				//this.$refs.active03.className="";
				this.payfor = 'alipay';
			},
			// active03:function(){
			// 	this.$refs.active03.className="active";
			// 	this.$refs.active01.className="";
			// 	this.$refs.active02.className="";
			// },
			// 跳转充值记录
			// 
			
				//支付
			pay(){
					
					var that = this;
					//console.log(that.picked)
					if(that.picked != ''){
							var id = that.payfor;
							var channel = null;
							// 从服务器请求支付订单
							var PAYSERVER='';
    						if(id=='alipay'){
       							PAYSERVER=that.ALIPAYSERVER+"/uid/"+that.uid+"/pay_id/"+that.pay_id;
       							channel = that.aliChannel;
   	 						}else if(id=='wxpay'){
        						PAYSERVER=that.WXPAYSERVER+"/uid/"+that.uid+"/pay_id/"+that.pay_id;
        						channel = that.wxChannel;
    						}
							//console.log(PAYSERVER)
							//console.log(channel)
    						var xhr=new XMLHttpRequest();
    						xhr.onreadystatechange=function(){
        						switch(xhr.readyState){
        	    					case 4:
        	    					if(xhr.status==200){
        	    		    			plus.payment.request(channel,xhr.responseText,function(result){
        	    		        			plus.nativeUI.alert("充值成功！",function(){
        	    		           	 		back();
        	    		       	 		});
        	    		    			},function(error){
											plus.nativeUI.alert("充值失败");
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
				
					}else{
					alert("请选择金额");
					}
						
				},
				

			},

	
		mounted(){
			var that = this;
			that.$refs.tmpld.style.height = document.documentElement.clientHeight+"px";

			//获取uid
				
				 var token = window.localStorage.getItem('token');
				 var url = common.apimain + '/api/user/getUid?token='+token;
				//console.log(json)
        	    that.$http.get(url,{emulateJSON: true},{timeout:15000}).then((response) => {
					var body = response.body;
					//console.log(body)
					if(body.code==1000){
						var data = body.data;
						that.uid = data
						//console.log(that.uid)

					}
	
        	    }, (response) => {
        	            //console.log('网络连接错误，请稍后重试');
        	    });

			//支付
				
				plus.payment.getChannels(function(channels){
    			that.aliChannel=channels[0];
				that.wxChannel=channels[1];
				//console.log(123)  
       			//console.log(that.aliChannel)
       			//console.log(that.wxChannel)
    			},function(e){
       			 alert("获取支付通道失败："+e.message);
    			});
			
		},
		watch:{
			payfor(newval){
				//console.log(newval);
			},
			picked(newval){
				var that = this;
				if(newval == 10){
					that.pay_id = '2'
					
				}
				else if(newval == 30){
					that.pay_id = '3'
				}
				else if(newval == 50){
					that.pay_id = '4'
				}
				else if(newval == 100){
					that.pay_id = '5'
				}
				else if(newval == 200){
					that.pay_id = '6'
				}
			},
		},
	}
</script>

<style scoped>
/* 头部 */
	.header{
        height: 3.125rem /* 50/16 */;
        width: 100%;
        background-color: #4171AE;
        position: fixed;
        z-index: 100;
        top: 0;
         display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
    }

    .header img{
        width: 100%;
        width: 1rem /* 16/16 */;
        height: 3.125rem /* 50/16 */;
        float: left;
        margin:0 .875rem /* 14/16 */;
        padding: .8125rem /* 13/16 */ 0;
        z-index: 110;
    }
    .content{
        width: 70%;
        height: 3.125rem /* 50/16 */;
        color: #fff;
        font-size: 1rem /* 16/16 */;
        text-align: center;
        line-height: 3.125rem /* 50/16 */;
       
    }
    .right{
        float: right;
        font-size: .75rem /* 12/16 */;
        color: #fff;
        line-height: 3.125rem /* 50/16 */;
    }
/* 内容区 */
	section{
		padding-top: 3.125rem /* 50/16 */;
	}
	.pay_top{
		background: #fff;
		padding: 1.5625rem /* 25/16 */ 0;
	}
	.pay_top>p{
		font-size: .75rem /* 12/16 */;
		color: #585858;
		padding:   0 .9375rem /* 15/16 */ .9375rem /* 15/16 */;
	}
	.input_type{
		width: 90%;
		height: 2.375rem /* 38/16 */;
		line-height: 2.375rem /* 38/16 */;
		background: #fff;
		border: 1px solid #E4E4E4;
		border-radius: .3125rem /* 5/16 */;
		margin: 0 auto;
		overflow: hidden;
		padding: 0 .625rem /* 10/16 */;
		display: flex;
		justify-content: space-between;
	}
	.input_type p{
		font-size: .875rem /* 14/16 */;
		color: #121212;
	}
	.maney{
		display: flex;
		width: 100%;
		padding: 0 5%;
		margin-top: .9375rem /* 15/16 */;
	}
	.list_maney{
		width: 4.6875rem /* 75/16 */;
		margin-right: .9375rem /* 15/16 */;
		background: #F5F5F5;
		height: 1.875rem /* 30/16 */;
		padding-left: .3125rem /* 5/16 */;
		border-radius: .3125rem /* 5/16 */;
		text-align: center;
	}
	.list_maney:last-child{
		margin: 0
	}
	.check[type=radio]{
		position: absolute;
		left: 0;
		-webkit-appearance: none;
		opacity: 0;
		margin-bottom: 30px;
		width: 0px;
	}
	.check[type=radio]:checked label{
		color: #fff;
	}
	.check[type=radio]+label{
		line-height: 1.875rem /* 30/16 */;
	}
	.pay{
		width: 100%;
		margin-top: 1.25rem /* 20/16 */;
	}
	.pay>div{
		width: 100%; 
		height: 4rem /* 64/16 */;
		background-color: #fff;
		border-top: 1px solid #E5E5E5;
		padding: 0 1.25rem /* 20/16 */;
	}
	
	
	.pay img{
		width: 2rem /* 32/16 */;
		height: 2rem /* 32/16 */;
		margin-top: 1rem /* 16/16 */;
	}
	.pay .payfor{
		padding-left: 1.5625rem /* 25/16 */;
		font-size: .75rem /* 12/16 */;
		color: #B4B3B5;
		height: 1.25rem /* 20/16 */;
		line-height: 1.25rem /* 20/16 */;
	}
	.pay .weixin{
		float: left;
	}
	.weixin{
		 display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	.weixin p{
		margin-left: 1.125rem /* 18/16 */;
		color: #292929;
		margin-top:.625rem /* 10/16 */;
	}
	.weixin span{
		display:block;
		font-size: .75rem /* 12/16 */;
		-webkit-transform:scale(0.8); 
		transform:scale(0.8); 
		color: #585858; 

		font-size: .875rem /* 14/16 */;
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
		margin-top: 1.25rem /* 20/16 */;
		-webkit-background-size: .625rem /* 10/16 */;
		background-size: 1.125rem /* 18/16 */;
	}
	.pay .active{
		background-image: url(../../../../statics/imgs/jihuo-2.png);
	}
	.btn{
		display: block;
	
		width: 70%;
		margin: 5.75rem /* 92/16 */ auto 0;
		height: 3rem /* 48/16 */;
	
	}
	
</style>