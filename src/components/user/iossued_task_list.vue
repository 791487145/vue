<template>
	<div id="tmpld">
		<div  id="iostasklist">
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
			<div class="time cssdiv">
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
		 <div class="people" v-if="list.grader">
			<div class="msg">猎人</div>
			<div class="con">
				<div class="left">
					<img :src="this.ImgUrl+'/'+list.grader.user_head_img" alt="">
				</div>
				<div class="right">
					<h2>{{list.grader.user_name || '---'}}</h2>
					<span>猎人等级</span>
					<span>Lv. {{list.grader.user_grade || '---'}}</span>
				</div>
				
			</div>
		</div>
		 <!-- 完成情况  -->
        <div class="taskover" v-if="list.status==5">
			<div class="msg">完成情况</div>
			<div class="con">
				
				
			</div>
		</div> 
		 <ul class="footer">
			<li>	
					<div class="btn" v-if="list.status==3">
						<span class="phone">
							<a :href="tel" id="release">
								 <img src="../../../statics/imgs/task_58.png" alt="">
								 <span>电话</span>
							</a>

						</span>
						<span class="call divcss">
								 已接受
						</span>
					</div>
					<div class="abandon divcss" @click="no_task" v-else-if="list.status==2">放弃任务</div>
			        <div class="examineing divcss" v-else-if="list.status==1">审核中...</div>
			        <div class="examine divcss" v-else-if="list.status==9">审核失败</div>
			        <div class="overtime" v-else-if="list.status==4">
						<div class="time" id="longtime">猎人申请延时{{this.time}}分钟</div>
			            <span class="phone">
							<a :href="tel">
								 <img src="../../../statics/imgs/task_58.png" alt="">
								 <span>电话</span>
							</a>

						</span>
						<div class="button divcss">
							<span class="nomore cssdiv" @click="no_delayed">拒接延时</span>
			            	<span class="agree" @click="yes_delayed">同意延时</span>
						</div>
						
			        </div>
			        <div class="rights" v-else-if="list.status==5">
			           <span class="phone">
							<a href="javascript:void(0);" @click="weiquan">
								 <img src="../../../statics/imgs/renwu_64.png" alt="">
								 <span>维权</span>
							</a>

						</span>
						<span class="call divcss" @click="confirm">
								 确认完成
						</span>
			        </div> 
			        <div class="file divcss" v-else-if="list.status==7">失败</div> 
			        <div class="rightsing divcss" v-else-if="list.status==8">维权中</div> 
			        <div class="paying" v-else-if="list.status==10">
			            <span class="phone">
							<a href="javascript:void(0);" @click="no_task">
								 <img src="../../../statics/imgs/renwu_61.png" alt="">
								 <span>放弃</span>
							</a>

						</span>
						<span class="call divcss" >
								<div @click="zhifu = true">去支付</div> 
						</span>
			        </div>
					<button class="file divcss"  v-else-if="list.status==6" @click="pingjia" :disabled="disabled">评价</button> 
			</li>
		</ul>
		<!-- 支付模态框 -->
			 <div class="pushtask" v-if="zhifu">
                        <div class="pmotai">
                            请输入支付密码: <input type="password" class="password" v-model.number="password" maxlength="6">
                            <button class="divcss" @click="payfor">确认</button>
                            <img @click="zhifu = false" src="../../../statics/imgs/xxx.png" alt="">
                        </div>
            </div>
            <div class="pushtask" v-if="zhifusuccess == 1000">
                <div class="pmotai">
                    支付成功
                    <button class="divcss" @click="back">确认</button>
                    <img @click="zhifusuccess = 0" src="../../../statics/imgs/xxx.png" alt="">
                </div>
            </div>
            
            <div class="pushtask" v-if="zhifusuccess == 1001">
                    <div class="pmotai">
                        支付失败<br>
                        <span>{{callzhifu}}</span>
                        <router-link to="/user/my_wallet/pay"  v-if="callzhifu == '您的余额不足，请充值'">
                            <button class="divcss" @click="zhifu = true;zhifusuccess = 0">前往充值</button>
                        </router-link>
                        <button class="divcss" @click="zhifu = true;zhifusuccess = 0"  v-if="callzhifu == '支付密码错误'">重输密码</button>
                        <img @click="zhifusuccess = 0" src="../../../statics/imgs/xxx.png" alt="">
                    </div>
            </div>
		<!-- 评价组件 -->
		<task-evaluate :isshow="isshow" @hide-picker="hidePicker"></task-evaluate>
		<!-- 维权组件 -->
        <task-weiquan :isweiquan="isweiquan" @hide-picker="hidePicker"></task-weiquan>
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
import taskweiquan from './task_weiquan.vue';//维权组件
 export default {
    
     props:{

	 },
	  components: {
				  ComHeader:comheader,
				   TaskEvaluate:taskevaluate,
				   TaskWeiquan:taskweiquan,
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
			 isweiquan:false,
			 zhifu :false,
			 password: null,
			 callzhifu: null,
			 zhifusuccess: null,
			 tel:'',
			 work_id:'',
			 disabled:false,
			 ImgUrl:common.apimain,
		 }
     },
     methods:{
		 //维权
		 weiquan(){
			 this.isweiquan  = !this.isweiquan;
		 },
		 //评价
		  pingjia(){
			 this.isshow  = !this.isshow;
		 },
		  hidePicker() {
				 this.isshow = false;
				 this.isweiquan = false;
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
							  //that.$router.push({path:'/mission'});
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
		 //延时同意
		 no_delayed(){
			 this.del = 0;
			 this.delayed();
		 },
		 yes_delayed(){
			 this.del = 1;
			 this.delayed();
		 },
		 delayed(){
			 let token =window.localStorage.getItem('token');
				var url = common.apimain + '/api/tasks/TaskDelayStepOne';
				var json = {
					 token:token,
					 task_id:this.$route.params.id,
					 attitude:this.del,
					 deplay_id:this.deplay_id,
				}
				var that = this;
			//console.log(json)
			that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
					var body = res.body;
					var data = body.data;
					//console.log(data)
					if(body.code == 1000){
								if(data.status == 2){
									Toast('您已同意延时')
									that.$router.push({path:'/user/iossued_task'});
								}else if(data.status == 4){
									MessageBox.confirm('放弃任务？',{
										confirmButtonText: '确定',
               							cancelButtonText: '重新发布'}
										).then(action => {

											 if (action == 'confirm') {
												 	let token =window.localStorage.getItem('token');
													var url = common.apimain + '/api/tasks/TaskDelayStepTwo';
													var json = {
													token:token,
													task_id:that.$route.params.id,
													deplay_id:that.deplay_id,
													choosen:'0',
													}
													that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
														var body = res.body;
														if(body.code == 1000){
															Toast("您已放弃任务")
															that.$router.push({path:'/user/iossued_task'});
														}
													},function(){
														Toast('网络连接超时，请检查后再试');
													})
                							}


										}).catch(err => {
											if (err == 'cancel') {
													let token =window.localStorage.getItem('token');
													var url = common.apimain + '/api/tasks/TaskDelayStepTwo';
													var json = {
													token:token,
													task_id:that.$route.params.id,
													deplay_id:that.deplay_id,
													choosen:'1',
													}
													that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
														var body = res.body;
														if(body.code == 1000){
															Toast("任务已重新发布")
															that.$router.push({path:'/user/iossued_task'});
														}
													},function(){
														Toast('网络连接超时，请检查后再试');
													})
											}
										});

								}
						
						
					}else{
						Toast(body.message)
					}
				},function(){
					//console.log('失败了');
					Toast('网络连接超时，请检查后再试');
				})
		 },
		 //确认完成任务
		 confirm(){
			  let token =window.localStorage.getItem('token');
				var url = common.apimain + '/api/work/deliveryAgree';
				var json = {
					 token:token,
					 task_id:this.$route.params.id,
					 work_id:this.work_id
				}
				var that = this;
			//console.log(json)
			that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
					var body = res.body;
					var data = body.data;
					
					if(body.code == 1000){					
						Toast('提交完成')
						this.isshow = true;
						
					}else{					
						Toast(body.message)
					}
				},function(){
					//console.log('失败了');

					Toast('网络连接超时，请检查后再试');
				})
		 },
		 //支付
		 payfor(){
				var that = this;
                let token = window.localStorage.getItem('token');
            
                // console.log(that.taskID);
                var data2 = {
                        task_id:this.$route.params.id,
                        token: token,
                        password: that.password,
                    };
                var url = common.apimain+'/api/pay/taskService';

                that.zhifu = false;
                    
                this.$http.post(url,data2,{emulateJSON: true},{timeout:15000}).then(function(resData){
                    that.callzhifu = resData.body.message;
                    //console.log(resData);
                    that.zhifusuccess = resData.body.code;
				});
		 },
		back(){
                window.history.back();
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
					//console.log(data)
					if(body.code == 1000){
						Indicator.close();
						that.list = data;
						if(that.list.status==6){//弹窗评价
							if(that.list.comment_status == 0){
								that.isshow = true;
								// console.log(that.$refs)
								}
							else{
								
								that.disabled  = true;
								//console.log(that.disabled )
							}
						}
						if(that.list.garder){
						var tel ="tel:"+ that.list.grader.user_mobile
					    that.tel = tel;
						}
						if(that.list.taskDelay){//是否有延时数组
							that.deplay_id = that.list.taskDelay.id;
							that.time = that.list.taskDelay.delay_time;
						}
						if(that.list.work_id){
							that.work_id = that.list.work_id;
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
#iostasklist{
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
	height: auto;
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
.btn{
	height: 3.125rem /* 50/16 */;
	display: block;
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
	display: block;
	width: 100%;
	height: 3.125rem /* 50/16 */;
	
	font-size: 1rem /* 16/16 */;
	text-align: center;
	line-height: 3.125rem /* 50/16 */;
	
}
.examineing{
   display: block;
	width: 100%;
	height: 3.125rem /* 50/16 */;

	font-size: 1rem /* 16/16 */;
	text-align: center;
	line-height: 3.125rem /* 50/16 */;
	
}
.examine{
    display: block;
	width: 100%;
	height: 3.125rem /* 50/16 */;

	font-size: 1rem /* 16/16 */;
	text-align: center;
	line-height: 3.125rem /* 50/16 */;

}
.overtime{
    display: block;
	width: 100%;
	height: 6.3125rem /* 101/16 */;
	font-size: 1rem /* 16/16 */;
	text-align: center;
	line-height: 3.125rem /* 50/16 */;
	color: #fff;
	border-top: 1px solid #E8E8E9;
}
.overtime .phone{
	display: block;
	height: 3.125rem /* 50/16 */;
	width: 4.6875rem /* 75/16 */;
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
.overtime .button{
	display: block;
	width: 100%;
	height: 3.125rem /* 50/16 */;
	padding-left: 4.6875rem /* 75/16 */;

	line-height: 3.125rem /* 50/16 */;
	text-align: center;

}
.overtime .nomore{
	display: inline-block;
	width: 50%;
	float: left;
}
.overtime .agree{
	display: inline-block;
	width: 50%;
	float: right;
}
.overtime .time{
	border-bottom: 1px solid #f8f8f8;
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
	padding-left: 4.6875rem /* 75/16 */;

	line-height: 3.125rem /* 50/16 */;
	text-align: center;
	
}

/* 完成情况部分 */
.taskover{
	height: auto;
	width: 100%;
	 background-color:rgba(255, 255, 255, 0.8);
	 border-top: 1px solid #E8E8E9;
	 margin-top: 1.25rem /* 20/16 */;
}
.taskover .msg{
	height: 3.125rem /* 50/16 */;
	border-bottom: 1px solid #E8E8E9;
	padding: 0 .625rem /* 10/16 */;
	font-size:.9375rem /* 15/16 */;
	line-height: 3.125rem /* 50/16 */;
	font-weight: bold;
}
.taskover .con{
	width: 100%;
	min-height: 5.125rem /* 82/16 */;
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
	height: 3.125rem /* 50/16 */;
	display: block;
}
.paying .phone{
	display: block;
	height: 3.125rem /* 50/16 */;
	width: 4.6875rem /* 75/16 */;
	float: left;
	background-color: #fff;
	padding: .3125rem /* 5/16 */ 0;
	position: relative;
}
.paying .phone img{
	width: 1.5625rem /* 25/16 */;
	height: 1.5625rem /* 25/16 */;
	margin: 0 1.5625rem /* 25/16 */;
}
.paying .phone span{
	color: #809BC4;
	font-size: .75rem /* 12/16 */;
	display: inline-block;
	width: 100%;
	text-align: center;
	position: absolute;
	left: 1px;
	top: 1.75rem /* 28/16 */;
}
.paying .call{
	display: block;
	width: 100%;
	height: 3.125rem /* 50/16 */;
	padding-left: 4.6875rem /* 75/16 */;

	line-height: 3.125rem /* 50/16 */;
	text-align: center;
	
}
.pushtask{
        position: fixed;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .42);
    }
.pmotai{
        width: 60vw;
        height: 52vw;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background-color: #fff;
        line-height: 15vw;
        border-radius: 10px;
        text-align: center;
}
.pmotai button{
        width: 22vw;
        text-align: center;
        padding: 0;
    }
.pmotai img{
        position: absolute;
        top: .5625rem /* 9/16 */;
        right: .5625rem /* 9/16 */;
	}
.password{
	font-size: 3.125rem /* 50/16 */;
	letter-spacing: 1.125rem /* 18/16 */;
	color: rgb(15, 15, 15);
}
/* 底部按钮 */
.footer{
	position: fixed;
	bottom: 0;
	width: 100%;
	max-width: 40rem /* 640/16 */;
	margin: 0 auto;
}
button{
      
        width: 80vw;
        height: 2.4rem /* 47/16 */;
        padding: 0 2.5625rem /* 41/16 */;
        margin: auto;
        margin-top: 1rem;
        display: block;
    
    }
</style>