<template>
	<div id="tmpld">
		<com-header :title="title"></com-header>
		<div class="til">
			<h1>{{list.title || '...'}}</h1>
			<div class="money">赏金
				<span>￥{{list.bounty || '0.00'}}</span>
			</div>
			<span>
				<img src="../../../statics/imgs/renwudating_36.png" alt="">
				{{list.created_at || '00-00'}}</span>
			<span>
				<img src="../../../statics/imgs/renwudating_38.png" alt="">
				{{list.user_school || '---'}}</span>
			<span>
				<img src="../../../statics/imgs/task_46.png" alt="">
				{{list.task_cate_name || '任务类型'}}</span>
		</div>
		<div class="tip">
			<div class="time">
				<span>限定时间：</span>	
				{{list.work_time || '---'}}
			</div>
			<div class="place">
				<span>限定区域：</span>	
				{{list.regin_limit || '---'}}
			</div>
		</div>
		<div class="title">
			<div class="head">任务描述</div>
			<div class="content">{{list.desc || '---'}}</div>
		</div>
		<div class="people">
			<div class="msg">雇主</div>
			<div class="con">
				<div class="left">
					<img :src="ImgUrl+'/'+ImgHead" alt="">
				</div>
				<div class="right">
					<h2>{{list.user_name || '---'}}</h2>
					<span>雇主等级</span>
					<span>Lv. {{list.user_grade || '---'}}</span>
				</div>
				
			</div>
		</div>
		<div class="btn" id="other">
			<span class="phone">
				<a href="javascript:void(0);" id="phone">
					 <img src="../../../statics/imgs/task_58.png" alt="">
					 <span>电话</span>
				</a>
					
			</span>
			<span class="call divcss" @click="yes">
					 接受任务
			</span>
		</div>
		<div class="abandon divcss" id="mine" @click="no">放弃任务</div>
	</div>
	
</template>

<script>
import { Toast } from 'mint-ui';
import common from '../../kits/common.js';
import { Indicator } from 'mint-ui';//加载动画
import comheader from '../../kits/comheader.vue';
import { MessageBox } from 'mint-ui';//提示判断
import '../../kits/jquery.min.js';
 export default {
    
     props:{

     },
     data(){
		 return{
			 task_id:'',
			 title:"任务详情",
			 list:{},
			 identify:'',
			 ImgHead:'',
			 ImgUrl:common.apimain,
		 }
     },
     methods:{
		 yes:function(){
			 var that = this;
			// console.log(123)
			 MessageBox.confirm('是否接受任务？').then(action => {
					  var url = common.apimain + '/api/work/createWinBid';
					  let token =window.localStorage.getItem('token');
					  //console.log(that.idenify)
					  var json = {
						  task_id:that.$route.params.id,
						  token:token,
						  identify:that.identify,
					  }
					  Indicator.open();
					  //console.log(json)
					  that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
						  var body = res.body;
						  //console.log(body)
						  if(body.code == 1000){
							  Indicator.close();
							  
							  Toast({message: "您已接受任务",duration: 800});
							  that.$router.push({path:'/mission'});
						  }else{
						  Indicator.close();
						   Toast({message: body.message,duration: 800});
						   }
					  },function(){
					//console.log('失败了');
					Indicator.close();
				
					 Toast({message: '网络连接超时，请检查后再试',duration: 800});
				})
			});
			
		 },
		 no:function(){
			  var that = this;
			// console.log(123)
			 MessageBox.confirm('是否放弃任务？').then(action => {
					  var url = common.apimain + '/api/taskCancel';
					  let token =window.localStorage.getItem('token');
					  var json = {
						  task_id:this.$route.params.id,
						  token:token
					  }
					  Indicator.open();
					  that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
						  var body = res.body;
						 // console.log(body)
						  
						  if(body.code == 1000){
							  Indicator.close();
							 
							  Toast({message: "您已放弃任务",duration: 800});
							  that.$router.push({path:'/mission'});
						  }
						  Indicator.close();
						    Toast({message: body.message,duration: 800});
					  },function(){
					//console.log('失败了');
					Indicator.close();
					
					 Toast({message:'网络连接超时，请检查后再试',duration: 800});
				})
			});
		 },
     },
     components: {
				  ComHeader:comheader,
				 
   	},
	mounted:function(){
			let token =window.localStorage.getItem('token');
				var url = common.apimain + '/api/taskDetial';
				var json = {
					 token:token,
					 task_id:this.$route.params.id,
				}
				var that = this;
			//console.log(this.$route.params.id)
			Indicator.open();
			that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
					var body = res.body;
					var data = body.data;
					that.identify = data.identify;
					that.ImgHead = data.avatar
					//console.log(that.ImgHead)
					if(body.code == 1000){
						Indicator.close();
						that.idenify = data.idenify;
						if(data.idenify == 1){ //判断是否是本人
							//console.log(1)
							$("#mine").css('display','block');
							$("#other").css('display','none');
							this.list = data;
						}else{
							//console.log(2)
							$("#other").css('display','block');
							$("#mine").css('display','none');
							this.list = data;
							 var phone = "tel:"+data.phone;
			 				 $("#phone").attr('href',phone);
						}	 

					}else{
						Indicator.close();
						Toast({message: body.message,duration: 800});
					}
				},function(){
					//console.log('失败了');
					Indicator.close();
					
					Toast({message:'网络连接超时，请检查后再试',duration: 800});
				})
	}
 }
</script>

<style scoped>
.til{
	width: 100%;
	min-height: 6.4375rem /* 103/16 */;
	background-color:rgba(255, 255, 255, 0.8);
	padding: .625rem /* 10/16 */;
	border-bottom: 1px solid #E8E8E9;
	margin-top: 3.125rem /* 50/16 */;
	overflow: hidden;
}
.til h1{
	width: 80%;
	font-weight: bold;
	font-size: 1rem /* 16/16 */;
}
.til .money{
	padding-top: 8px;
	font-size: .875rem /* 14/16 */;
	color: red;
}
.til .money span{
	font-weight: bold;
	font-size: 1rem /* 16/16 */;
	color: red;
}
.til span{
	display: inline-block;
	margin-top: .5rem /* 8/16 */;
	font-size: .875rem /* 14/16 */;
	margin-right: .625rem /* 10/16 */;
	padding-left: 18px;
	position: relative;
}
.til span img{
	position: absolute;
	width: .9375rem /* 15/16 */;
	height: .9375rem /* 15/16 */;
	top: .1875rem /* 3/16 */;
	left: 0px;
}
.tip{
	width: 100%;
	height: 4.375rem /* 70/16 */;
   background-color:rgba(255, 255, 255, 0.8);
	padding: .625rem /* 10/16 */;
	border-bottom: 1px solid #E8E8E9;
}
.tip span{
	display: inline-block;
	font-size: .875rem /* 14/16 */;
	color: #585858;
}
.tip div{
	font-size: .875rem /* 14/16 */;
}
.title{
	width: 100%;
	height: auto;
	background-color: rgba(255, 255, 255, 0.8);
	border-bottom: 1px solid #E8E8E9;
	border-top: 1px solid #E8E8E9;
	margin-top: 1.25rem /* 20/16 */;
}
.title .head{
	width: 100%;
	height: 3.125rem /* 50/16 */;
	border-bottom: 1px solid #E8E8E9;
	font-size:.9375rem /* 15/16 */;
	line-height: 3.125rem /* 50/16 */;
	font-weight: bold;
	padding: 0 .625rem /* 10/16 */;
}
.title .content{
	width: 100%;
	height: auto;
	min-height: 6.25rem /* 100/16 */;
	padding: .625rem /* 10/16 */;
	font-size: .875rem /* 14/16 */;
	color: #585858;
}
.people{
	height: auto;
	width: 100%;
	 background-color:rgba(255, 255, 255, 0.8);
	 border-top: 1px solid #E8E8E9;
	 margin-top: 1.25rem /* 20/16 */;
	 margin-bottom: 3.1875rem /* 51/16 */;
}
.msg{
	height: 3.125rem /* 50/16 */;
	border-bottom: 1px solid #E8E8E9;
	padding: 0 .625rem /* 10/16 */;
	font-size:.9375rem /* 15/16 */;
	line-height: 3.125rem /* 50/16 */;
	font-weight: bold;
}
.people .con{
	width: 100%;
	height: 5.125rem /* 82/16 */;
}
.people .con .left{
	width: 4.6875rem /* 75/16 */;
	height: 5rem /* 80/16 */;
	float: left;
	z-index: 100;
	padding: 1.25rem /* 20/16 */;
}
.people .con .left img{
	width: 3.125rem /* 50/16 */;
	height: 3.125rem /* 50/16 */;
	border-radius: 1.5625rem /* 25/16 */;
}
.people .con .right{
	padding: .625rem  .625rem /* 10/16 */;
}
.people .con .right span{
	font-size: .875rem /* 14/16 */;
	color: #585858;
}
.people .con .right h2{
	font-size: .9375rem /* 15/16 */;
	margin-top: 20px;
}
.btn{
	height: 3.125rem /* 50/16 */;
	position: fixed;
	bottom: 0;
	width: 100%;
}
.btn .phone{
	display: block;
	height: 3.125rem /* 50/16 */;
	width: 4.6875rem /* 75/16 */;
	float: left;
	background-color: #fff;
	padding: .3125rem /* 5/16 */ 0;
	position: relative;
}
.btn .phone img{
	width: 1.25rem /* 20/16 */;
	height: 1.5625rem /* 25/16 */;
	margin: 0 1.5625rem /* 25/16 */;
}
.btn .phone span{
	color: #809BC4;
	font-size: .75rem /* 12/16 */;
	display: inline-block;
	width: 100%;
	text-align: center;
	position: absolute;
	left: 1px;
	top: 1.75rem /* 28/16 */;
}
.btn .call{
	display: block;
	width: 100%;
	height: 3.125rem /* 50/16 */;
	padding-left: 4.6875rem /* 75/16 */;

	line-height: 3.125rem /* 50/16 */;
	text-align: center;

}
.abandon{
	display: none;
	width: 100%;
	height: 3.125rem /* 50/16 */;

	font-size: 1rem /* 16/16 */;
	text-align: center;
	line-height: 3.125rem /* 50/16 */;
	
	position: fixed;
	bottom: 0;
}
</style>