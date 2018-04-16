
<template>

	<div id="tmpld">
		<div>暂未开放</div>
		<!-- <div class="one divcss">
			<div class="left">
				<!-- <span>
					<img src="../../../statics/imgs/renwudating_06.png" alt="">
				</span> 
			</div>
			<div class="search">
				<span>
					<img src="../../../statics/imgs/icon01.png" alt="">
				</span>
				<input type="search" placeholder="请输入任务类型、名称" @keyup.enter="submit" v-model="title" class="divcsss">
			</div>
			
				<div class="right">
					<router-link to="/releaseTask">
				
						<img src="../../../statics/imgs/renwudating_08.png" alt="">
			
					</router-link>
				</div>
			
			
		</div>
		<div class="two">
			<span @click="place">地点
				<img src="../../../statics/imgs/renwudating_17.png" alt="">
			</span>
			<span @click="date">时间
				<img src="../../../statics/imgs/renwudating_17.png" alt="">
			</span>
			<span @click="leixin">类型
				<img src="../../../statics/imgs/renwudating_17.png" alt="">
			</span>
			<span @click="money">赏金
				<img src="../../../statics/imgs/renwudating_17.png" alt="">
			</span>
		</div> -->
		<!--任务列表-->
		
		
		<!-- <mission-list v-bind:newlist="list"></mission-list> -->
		
		
		<!-- 地点三级联动 -->
		<!-- <add-ress :showadd="showadd" @hide-picker="hidePicker" @getname="getname"></add-ress> -->
		<!-- 底部弹出 -->
		<!-- <mission-time :showTime="showTime" @saveTaskTime="saveTaskTime" @hide-picker="hidePicker"></mission-time>
		<mission-lx :showlx="showlx" @hide-picker="hidePicker" @getage="getage"></mission-lx>
		<mission-money :showmoney="showmoney"  @hide-picker="hidePicker" @savemoney="savemoney"></mission-money>		 -->
		<!-- 底部 -->
		<footer-click></footer-click>
    </div>

</template>

<script>
import common from '../../kits/common.js';//api
import { Toast } from 'mint-ui';
import { Popup } from 'mint-ui';//底部弹出
import { Indicator } from 'mint-ui';//加载动画
import AddRess from  '../../kits/address.vue';//地址三级联动
import MissionTime from './missiontime.vue';//时间筛选
import MissionLx from './missionlx.vue';//时间筛选
import MissionMoney from './missionmoney.vue';//赏金筛选
import MissionList from './mission_list.vue';//任务列表子组件
import '../../kits/jquery.min.js';
import footer from '../../kits/common/footer';

	export default{
		
    	components: {
				AddRess,
				MissionTime,
				MissionLx,
				MissionMoney,
				MissionList,
				"footer-click":footer
   		 },
		data(){
			return{
				token:'',
				page:'1',
				area:'',
				cate:'',
				start:'1',
				time:'1',
				title:'',
				listTop:[],
				list:[],
				listDinmond:[],
				showadd:false,
				showTime:false,
				publicity_at: '1',
				showlx:false,
				showmoney:false,
				money_at:'1',
				getaddress_at:'',
				getage_at:'',
				limit:'8',
			}
		},
		methods:{
			submit(){//搜索任务
					let token =window.localStorage.getItem('token');
	        		 //console.log(token);
	        		 //console.log(this.title);
	        		 var url = common.apimain + '/api/tasks';
	        		 var json = {
	        			 token:token,
	        			 page_num:this.page,
						 title:this.title,
						 limit: this.limit
	        			 }
						 console.log(json);
	        		Indicator.open();
	        		this.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
	        				var body = res.body;
	        				var data = body.data;
	        				//console.log(body)
	        				if(body.code == 1000){
	        					Indicator.close();
	        					//console.log(body);
	        					this.listDinmond = data.taskDinmond;
	        					this.list = data.taskPubs;
	        					this.listTop =  data.taskTops;
	        					// console.log(body)
	        					// console.log(this.listDinmond)
	        					// console.log(this.listTop)
	        				}else{
	        					Indicator.close();
	        					 Toast({message: body.message,duration: 800});
	        				}
	        			},function(){
	        				//console.log('失败了');
	        				Indicator.close();
							
							 Toast({message: '网络连接超时，请检查后再试',duration: 800});
	        			})
			},
			//dx
			hidePicker() {
				this.showTime = false;
				this.showadd = false;
				this.showlx = false;
				this.showmoney = false;
			},
			saveTaskTime(val) {
				// 从子组件接受返回所选值 val
				this.publicity_at = val;
				// console.log(val);
				//console.log(this.publicity_at);
				this.showTime = !this.showTime
			},
			savemoney(val) {
				this.money_at = val;
				this.showmoney = !this.showmoney;
			},
			getage(val) {
				this.getage_at = val;
				this.showlx = !this.showlx;
			},
			getname(val) {
				this.getaddress_at = val;
				this.showadd = !this.showadd;
			},
			place:function(){
				this.showadd = !this.showadd;
				//console.log(this.show)	
			},
			date:function(){
				 this.showTime = !this.showTime
				 //console.log(123)
			},
			leixin:function(){
				 //this.lxshow = !this.lxshow;
				 //this.showlx = !this.showlx;
				 //console.log(123)
			},
			money:function(){
				 this.showmoney = !this.showmoney
				 // console.log(123)
			},
			//关闭广告
			close:function() {
				//console.log(this.$refs.close.style)
				//this.$refs.close.style.display = "none";
			},

			newlist:function(){
	        		let token =window.localStorage.getItem('token');
	        		 //console.log(token);
	        		 //console.log(123);
	        		 var url = common.apimain + '/api/tasks';
	        		 var json = {
	        			 token:token,
	        			 page_num:this.page,
	        			 area:this.getaddress_at,
	        			 cate_id:this.getage_at,
	        			 bounty_start:this.money_at,
						 time:this.publicity_at,
						  limit: this.limit,
	        			 }
						 console.log(json)
	        		Indicator.open();
	        		this.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
	        				var body = res.body;
	        				var data = body.data;
	        				//console.log(body)
	        				if(body.code == 1000){
	        					Indicator.close();
	        					//console.log(body);
	        					this.listDinmond = data.taskDinmond;
	        					this.list = data.taskPubs;
	        					this.listTop =  data.taskTops;
	        					// console.log(body)
	        					// console.log(this.listDinmond)
	        					// console.log(this.listTop)
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
		},
		watch: {
            publicity_at(curVal,oldVal) {
			  //console.log(curVal)
			  var that = this;
			  if(curVal != oldVal ){
				  that.newlist()
			  }			  
			},
			money_at(curVal,oldVal){
			  //console.log(curVal)
			   var that = this;
			  if(curVal != oldVal ){
				  that.newlist()
			  }
			},
			getaddress_at(curVal,oldVal){
			  //console.log(curVal)
			   var that = this;
			  if(curVal != oldVal ){
				  that.newlist()
			  }
			},
			getage_at(curVal,oldVal){
			  //console.log(curVal)
			   var that = this;
			  if(curVal != oldVal ){
				  that.newlist()
			  }
			},
          },
	}
</script>

<style scoped>
	/*头部样式*/
	.one{
		max-width: 40rem /* 640/16 */;
	 	min-width: 20rem /* 320/16 */;
		position: fixed;
		top: 0;
		width: 100%;
		height: 3.125rem /* 50/16 */;
		z-index: 100;
	}
	.one .left{
		height: 2rem /* 32/16 */;
		width: 10%;
		float: left;
		padding: .9375rem /* 15/16 */ .625rem /* 10/16 */;
	}
	.one .right{
		width: 10%;
		position: relative;
		height: 2rem /* 32/16 */;
		float: right;
		right: .75rem /* 12/16 */;
		top: .5rem /* 8/16 */;
	}
	.one .search{
		position: relative;
		height: 2rem /* 32/16 */;
		width: 80%;
		display: inline-block;
		padding: .5rem /* 8/16 */ 5px;
		left: -1.25rem /* 20/16 */;
	}
	.one .search input{
		width: 100%;
		height: 2rem /* 32/16 */;
		border: none;
		border-radius:1rem /* 16/16 */; 
		font-size: 16px;
		font-family: "Microsoft Yahei";
		padding-left: 2.125rem /* 34/16 */;
		text-align: left;
	}
	.one img{
		width: 30px;
		height: 30px;
	}
	.one .search img{
		width: 1.1875rem /* 19/16 */;
		height: 1.1875rem /* 19/16 */;
		position: absolute;
		top:.875rem /* 14/16 */;
		left: .875rem /* 14/16 */;
	}
	/*bar*/
	.two{
		max-width: 40rem /* 640/16 */;
	 	min-width: 20rem /* 320/16 */;
		position: fixed;
		top: 3.125rem /* 50/16 */;
		width: 100%;
		height: 3.0625rem /* 49/16 */;
		background-color: #FDFDFE;
		padding-top: .75rem /* 12/16 */;
		padding-left:.625rem /* 10/16 */;
		border-top:1px solid #CBCBCD;
		border-bottom:1px solid #CBCBCD;
		z-index: 100;
	}
	.two span{
		display: inline-block;
		width: 23%;
		text-align: center;
		font-family: "Microsoft Yahei";
		font-size: .875rem /* 14/16 */;
		font-weight: bold;
		color: #000;
		border-right: 1px solid #C8C8C8;
		position: relative;
	}
	.two span:last-child{
		border: none;
	}
	/* 任务列表 */
	.list{
		padding-top:6.125rem /* 98/16 */;
	}
	.list .mission:last-child{
		border-bottom:1px solid #CBCBCD;
	}
	.list .mission:first-child{
		background-color: rgba(255,255, 255, 0.4);
	}
	.mission{
		width: 100%;
		height:80px;
		background-color: rgba(255,255, 255, 0.5);
		position: relative;
		border-top:1px solid #CBCBCD;
	}
	.mission .touxiang{
		width: 5rem /* 80/16 */;
		height: 5rem /* 80/16 */;
		padding: .8125rem /* 13/16 */ .8125rem /* 13/16 */;
		float: left;
	}
	.mission .touxiang img{
		width:3.125rem /* 50/16 */;
		height:3.125rem /* 50/16 */;
	}
	.touxiang .img{
		width:3.375rem /* 54/16 */ ;
		height: 3.375rem /* 54/16 */;
		border: 2px solid #FDB434;
		border-radius: 1.6875rem /* 27/16 */;
	}
	.mission .putong .img{
		border: none;
	}
	.mission .title{
		display: inline-block;
		width: 40%;
		height: 2rem /* 32/16 */;
		margin-left: .625rem /* 10/16 */;
		line-height: 2.625rem /* 42/16 */;
		font-family: "Microsoft Yahei";
		font-size: .875rem /* 14/16 */;
		color: #000;
		text-overflow:ellipsis; 
		white-space:nowrap; 
		overflow:hidden;
		margin-top: -3px;
	}
	.mission .title img{
		width: 1rem /* 16/16 */;
		height: .6875rem /* 11/16 */;

	}
	.mission .tip{
		display: inline-block;
		width: 40%;
		height: 1.1875rem /* 19/16 */;
		margin-left: .625rem /* 10/16 */;
		font-family: "Microsoft Yahei";
		font-size: .625rem /* 10/16 */;
		color: #9C9C9E;
		text-overflow:ellipsis; 
		white-space:nowrap; 
		overflow:hidden;
		margin-top: -3px;
	}
	.mission .time{
		display: inline-block;
		width: 40%;
		height: 1.1875rem /* 19/16 */;
		margin-left: .625rem /* 10/16 */;
		margin-right: .625rem /* 10/16 */;
		font-family: "Microsoft Yahei";
		font-size: .625rem /* 10/16 */;
		color: #9C9C9E;
		text-overflow:ellipsis; 
		white-space:nowrap; 
		overflow:hidden;
		margin-top: -3px;
	}
	.mission .time img{
		height: .875rem /* 14/16 */;
	}
	.mission .time .left{
		float: left;
	}
	.mission .time  .right{
		float: right;
	}
	.mission .price{
		width: 5.625rem /* 90/16 */;
		height: 5rem;
		float: right;
		padding-top: 1.625rem /* 26/16 */;
	}
	.mission .price span{
		font-family: "Microsoft Yahei";
		font-size: 1rem /* 16/16 */;
		color: #F5532A;
		font-weight: bold;
	}
	.mission .after img{
		width: 1.8125rem /* 29/16 */;
		height: 1.5625rem /* 25/16 */;
		position: absolute;
		top:0;
		right: .75rem /* 12/16 */;
	}

	/*广告*/
	.guanggao{
		width: 100%;
		height:4.9375rem /* 79/16 */;
		background-color: rgba(255,255, 255, 0.8);
		position: relative;
		padding-left: .125rem;
		border-top:1px solid #CBCBCD;
		padding-top: .125rem /* 2/16 */;
		background-color: rgba(255,255, 255, 0.4);
	}
	.guanggao .in{
		width: 90%;
		position: relative;
		margin-left: 5%;
	}
	.guanggao .in  img{
		width: 100%;
		height: 4.625rem /* 74/16 */;
	}
	.guanggao .close img{
		position: absolute;
		width: 1.125rem /* 18/16 */;
		height: 1.125rem /* 18/16 */;
		top: 5px;
		right: 10px;
	}
	
	
</style>