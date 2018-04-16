<template>
	<div id="tmpld">
		<div id="usertasklist">
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
        <!-- 雇主信息 -->
		 <div class="people">
			<div class="msg">雇主</div>
			<div class="con">
				<div class="left">
					<img :src="this.ImgUrl+'/'+list.user_head_img" alt="">
				</div>
				<div class="right">
					<h2>{{list.user_name || '---'}}</h2>
					<span>雇主等级</span>
					<span>Lv. {{list.user_grade || '---'}}</span>
				</div>
				
			</div>
		</div>
       
		 <ul class="footer">
			<li>	
			        <div class="overtime" v-if="list.status==3 || list.status==4 ">
			            <div class="phone">
							<a :href="tel" id="delayed">
								 <img src="../../../statics/imgs/task_58.png" alt="">
								 <span>电话</span>
							</a>

						</div>
					
                            <div class="notask divcss" @click="no_task">放弃</div>
							<div class="nomore divcss" @click="delayed">申请延时</div>
			            	<div class="agree divcss" @click="yes_task">完成</div>
					
						
			        </div>
					<div class="file divcss"  v-else-if="list.status==6" @click="pingjia" :disabled="disabled">评价</div> 
			        <div class="file divcss"  v-else-if="list.status==7">失败</div> 
			        <div class="rightsing divcss"  v-else-if="list.status==8">维权中</div> 
					<!-- 上传图片 -->
					<up-img v-if="list.status==5"></up-img>
			        <div class="paying divcss" v-if="list.status==5 ">
						
								等待雇主确认
						
			        </div>
			</li>
		</ul>
        <!-- 底部弹出 -->
		<task-time :showTime="showTime" @saveTaskTime="saveTaskTime" @hide-picker="hidePicker"></task-time>
		<!-- 评价 -->
		<task-evaluate :isshow="isshow" @hide-picker="hidePicker"></task-evaluate>
		
		
		</div>

	</div>
	
</template>

<script>
import { Toast } from 'mint-ui';
import common from '../../kits/common.js';
import { Indicator } from 'mint-ui';//加载动画
import comheader from '../../kits/comheader.vue';
import { MessageBox } from 'mint-ui';//提示判断
import '../../kits/jquery.min.js';
import { Popup } from 'mint-ui';//弹出子组件
import taskevaluate from './task_evaluate.vue';//评价子组件
import tasktime from './user_tasktime.vue';//延时时间选择组件
import UpImg from "./upimg.vue";
 export default {
    
     props:{

	 },
	  components: {
				  ComHeader:comheader,
                   TaskEvaluate:taskevaluate,
				   TaskTime:tasktime,
				   UpImg,
   	 },
     data(){
		 return{
			 task_id:'',
			 title:"任务详情",
			 list:{},
			 del:'',//延时同意1，不同意0
			 deplay_id:'',
			 time:'',
			 isshow:false,
			 showTime:false,
			 tel:'',
			 confirm:false,//显示等待雇主确认按钮
			 disabled:false,//评价按钮
			 ImgUrl:common.apimain
		 }
     },
     methods:{
		 //上传头像
		 upimg(){
			this.showimg = true;
		 },
         //延时
         delayed:function(){
				 this.showTime = !this.showTime
				 //console.log(123)
			},
         saveTaskTime(val) {
				// 从子组件接受返回所选值 val
				this.publicity_at = val;
				// console.log(val);
				//console.log(this.publicity_at);
				this.showTime = !this.showTime
				var that = this;
				var url = common.apimain + '/api/tasks/createTaskDelay';
					  let token =window.localStorage.getItem('token');
					  var json = {
						  task_id:that.$route.params.id,
						  token:token,
						  time:that.publicity_at
					  }
					  Indicator.open();
					  that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
						  var body = res.body;
						  //console.log(body)
						  if(body.code == 1000){
							  Indicator.close();
							  Toast("您已申请延时")
							//   that.$router.push({path:'/mission'});
						  }else{
						  Indicator.close();
						   Toast(body.message)
						  }
					  },function(){
					//console.log('失败了');
					Indicator.close();
					Toast('网络连接超时，请检查后再试');
				})
			},
		 //评价
		 pingjia(){
			 this.isshow = true;
		 },
		 hidePicker() {
                 this.isshow = false;
				 this.showTime = false;
				 this.showimg = false;
		 },
		// 	saveTaskTime(val) {
		// 		// 从子组件接受返回所选值 val
		// 		this.publicity_at = val;
		// 		// console.log(val);
		// 		//console.log(this.publicity_at);
		// 		this.isshow = !this.isshow
		// 	},
		 //放弃任务
		 no_task(){
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
						  //console.log(body)
						  if(body.code == 1000){
							  Indicator.close();
							  Toast("您已放弃任务")
							//   that.$router.push({path:'/mission'});
						  }
						  Indicator.close();
						   Toast(body.message)
					  },function(){
					//console.log('失败了');
					Indicator.close();
					Toast('网络连接超时，请检查后再试');
				})
			});
         },
         yes_task(){//猎人提交完成任务
            var that = this;
			// console.log(123)
			 MessageBox.confirm('是否提交完成任务？').then(action => {
					  var url = common.apimain + '/api/work/createDelivery';
					  let token =window.localStorage.getItem('token');
					  var json = {
						  task_id:this.$route.params.id,
						  token:token
					  }
					  Indicator.open();
					  that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
						  var body = res.body;
						  //console.log(body)
						  if(body.code == 1000){
							  Indicator.close();
							  Toast("您已提交完成任务，等待雇主确认")
							 
							
						  }else{
						  Indicator.close();
						   Toast(body.message)
						  }
					  },function(){
					//console.log('失败了');
					Indicator.close();
					Toast('网络连接超时，请检查后再试');
				})
			});
         },
		
     },
	mounted:function(){
			
			let token =window.localStorage.getItem('token');
				var url = common.apimain + '/api/taskDetial';
				var json = {
					 token:token,
					 task_id:this.$route.params.id,
				}
				var that = this;
			//console.log(json)
			Indicator.open();
			that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
					var body = res.body;
					var data = body.data;
//					console.log(body)
					if(body.code == 1000){
						Indicator.close();
                        that.list = data;
                         //console.log(that.list.phone)	
                        var tel ="tel:"+ that.list.phone;
                       // console.log(tel)
						that.tel = tel;
						
						if(that.list.taskDelay){//是否有延时数组
							that.deplay_id = that.list.taskDelay.id;
                            that.time = that.list.taskDelay.delay_time;
                           
						}

						if(that.list.status == 6){//弹窗评价
							if(that.list.comment_status == 0){
								that.isshow = true;
								// console.log(that.$refs)
								}
							else{
								
								that.disabled  = true;
								//console.log(that.disabled )
							}
						}
					}else{
						Indicator.close();
						Toast(body.message)
					}
				},function(){
					//console.log('失败了');
					Indicator.close();
					Toast('网络连接超时，请检查后再试');
				});
	
	}
 }
</script>

<style scoped>
#usertasklist{
	padding-bottom: 3.125rem /* 50/16 */;
}
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
	margin-bottom: 1.875rem /* 30/16 */;
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
	height: 12.5rem /* 200/16 */;
	width: 100%;
	 background-color:rgba(255, 255, 255, 0.8);
	 border-top: 1px solid #E8E8E9;
	 margin-top: 1.25rem /* 20/16 */;
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



.overtime{
    display: block;
	width: 100%;
	height: 3.1875rem /* 51/16 */;
	font-size: 1rem /* 16/16 */;
	text-align: center;
	line-height: 3.125rem /* 50/16 */;
	color: #fff;
	border-top: 1px solid #E8E8E9;
	position: relative;
}
.overtime .phone{
	display: inline-block;
	height: 3.125rem /* 50/16 */;
	width: 25%;
	float: left;
	background-color: #fff;
	padding: .3125rem /* 5/16 */ 0;
	position: relative;
}
.overtime .phone img{
	width: 1.25rem /* 20/16 */;
	height: 1.5625rem /* 25/16 */;
	margin: 0 1.5625rem /* 25/16 */;
}
.overtime .phone span{
	color: #809BC4;
	font-size: .75rem /* 12/16 */;
	display: inline-block;
	width: 100%;
	text-align: center;
	position: absolute;
	left: 1px;
	top: 1.125rem /* 18/16 */;
	height: 20px;
}

.overtime .nomore{
	display: inline-block;
	width: 25%;
	height: 3.125rem /* 50/16 */;
	position: absolute;
	left: 25%;
	border-left: 1px solid #E6E6E6;
}
.overtime .agree{
	display: inline-block;
	width: 25%;
	height: 3.125rem /* 50/16 */;
	position: absolute;
	left: 50%;
	border-left: 1px solid #E6E6E6;
}
.overtime .notask{
	display: inline-block;
	width: 25%;
	height: 3.125rem /* 50/16 */;
	position: absolute;
	left: 75%;
	border-left: 1px solid #E6E6E6;
}
.rights{
	height: 3.125rem /* 50/16 */;
	display: block;
}
.rights .phone{
	display: block;
	height: 3.125rem /* 50/16 */;
	width: 4.6875rem /* 75/16 */;
	float: left;
	background-color: #fff;
	padding: .3125rem /* 5/16 */ 0;
	position: relative;
}
.rights .phone img{
	width: 1.5625rem /* 25/16 */;
	height: 1.5625rem /* 25/16 */;
	margin: 0 1.5625rem /* 25/16 */;
}
.rights .phone span{
	color: #809BC4;
	font-size: .75rem /* 12/16 */;
	display: inline-block;
	width: 100%;
	text-align: center;
	position: absolute;
	left: 1px;
	top: 1.75rem /* 28/16 */;
}
.rights .call{
	display: block;
	width: 100%;
	height: 3.125rem /* 50/16 */;
	line-height: 3.125rem /* 50/16 */;
	text-align: center;
}

/* 任务失败 */
.file{
     display: block;
	width: 100%;
	height: 3.125rem /* 50/16 */;
	font-size: 1rem /* 16/16 */;
	text-align: center;
	line-height: 3.125rem /* 50/16 */;
}
.rightsing{
     display: block;
	width: 100%;
	height: 3.125rem /* 50/16 */;

	font-size: 1rem /* 16/16 */;
	text-align: center;
	line-height: 3.125rem /* 50/16 */;
}
.paying{
	width: 100%;
	height: 3.125rem /* 50/16 */;

	display: block;
	text-align: center;
	line-height: 3.125rem /* 50/16 */;
	
}
/* 底部按钮 */
.footer{
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 200;
	max-width: 40rem /* 640/16 */;
	margin: 0 auto;
}

</style>