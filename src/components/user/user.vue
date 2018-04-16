<template>
	<div id="tmpld" ref="tmpld">
		<section>
			<!--头部-->
		<div class="setone divcss">
			<div class="chilun">
				<router-link to="/user/setting_up">
					<span class="left">
						<img src="../../../statics/imgs/centralofme_13.png" alt="">
					</span>
				</router-link>
<!--				<router-link to="/message">	-->
					<!--<span class="right">
						<img src="../../../statics/imgs/centralofme_15.png" alt="">
					</span>-->
<!--				</router-link>-->
			</div>
			<div>
				<router-link to="/user/per_info" class="userinfo">	
					<dl>
						<dt class="userinfo-icon">
							<img :src="this.headurl+'/'+this.head_img">
						</dt>
						<dd class="userinfo-tab">
							<p class="userinfo-tab_top">
								<span>{{nickname || "未设置昵称"}}</span>
								<!-- <img src="../../../statics/imgs/centralofme_27.png">
								<img src="../../../statics/imgs/centralofme_29.png"> -->
							</p>
							<p class="userinfo-tab_center">
								<span>{{school || "未完善学校信息"}}</span>
								<span>{{system}}</span>
							</p>
							<div class="userinfo-tab_bottom">
								<span class="divcssss">LV{{grade || "0"}}</span>
								<p class="divcssss">
									<span><img src="../../../statics/imgs/centralofme_38.png"><i>￥{{balance || "0"}}</i></span>	
									&nbsp;&nbsp;<span><img src="../../../statics/imgs/centralofme_40.png"><i>{{act_value || "0"}}</i></span>	
								</p>
							</div>
						</dd>
					</dl>
					<div class="userinfo_img"><img src="../../../statics/imgs/centralofme_35.png"></div>
				</router-link>
			</div>
		</div>
		<div class="settwo">
			<router-link class="settwo-tab-item" to="/releaseTask">
				<dl>
					<dt class="settwo-icon"><img src="../../../statics/imgs/centralofme_06.png"></dt>
					<dd class="settwo-tab-label">发布</dd>
				</dl>
			</router-link>
			<router-link class="settwo-tab-item" to="/user/iossued_task">
				<dl>
					<dt class="settwo-icon">
						<span class="settwo-badge iossued">{{create_task_num}}</span>
						<img src="../../../statics/imgs/centralofme_08.png">
					</dt>
					<dd class="settwo-tab-label">已发任务</dd>
				</dl>
			</router-link>
			<router-link class="settwo-tab-item" to="/user/user_tasks">
				<dl>
					<dt class="settwo-icon">
						<span class="settwo-badge tasks">{{work_task_num}}</span>
						<img src="../../../statics/imgs/centralofme_10.png">
					</dt>
					<dd class="settwo-tab-label">已接任务</dd>                     								
				</dl>
			</router-link>
			<router-link class="settwo-tab-item" to="/user/FotoPlace">
				<dl>
					<dt class="settwo-icon last-img"><img src="../../../statics/imgs/centralofme_03.png"></dt>
					<dd class="settwo-tab-label">足迹</dd>
				</dl>
			</router-link>
		</div> 

		<div class="setting_main">
				<router-link to="/user/my_wallet" class="setting_main_list">
					<span><img slot="icon" src="../../../statics/imgs/centralofme_56.png" width="24" height="24">我的钱包</span>
				</router-link>
				<!--<router-link to="/user/my_red_packets" class="setting_main_list">
					<span><img slot="icon" src="../../../statics/imgs/centralofme_58.png" width="24" height="24">我的红包</span>
				</router-link>-->
				<router-link to="/user/employer" class="setting_main_list">
					<span><img slot="icon" src="../../../statics/imgs/centralofme_50.png" width="24" height="24">雇主</span>
					<span class="employer">{{employer_grade}}</span>
				</router-link>
				<router-link to="/user/huntsman" class="setting_main_list">
					<span><img slot="icon" src="../../../statics/imgs/centralofme_64.png" width="24" height="24">猎人</span>
					<span>{{hunter_grade}}</span>			
				</router-link>
				 <!--<router-link to="/user/signin" class="setting_main_list">
					<span><img slot="icon" src="../../../statics/imgs/PERSONNAL-CENTRAL_25.png" width="20" height="20">签到奖励</span>
				</router-link> -->
				<router-link to="/user/bonus_cash" class="setting_main_list">
					<span><img slot="icon" src="../../../statics/imgs/centralofme_53.png" width="24" height="24">奖品兑换</span>
				</router-link>
				<router-link to="/user/clothes" class="setting_main_list">
					<span><img slot="icon" src="../../../statics/imgs/centralofme_61.png" width="24" height="24">个人专属</span>
				</router-link>				

			</div>

		</section>
		
		
       <!--  底部 -->
       <footer-click></footer-click>
	</div>
		
		
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { Cell } from 'mint-ui';
	import common from '../../kits/common.js';//api
	import bus from '../../kits/bus.js';
	import footer from '../../kits/common/footer';
	export default{
		data(){
			return{
				nickname: null,
				head_img:'',
				school:'',
				system:'',
				grade:null,
				balance:null,
				act_value:null,
				create_task_num:null,
				work_task_num:null,
				hunter_grade:null,
				employer_grade:null,
				token:'',
				headurl:common.apimain,
			}
		},
		computed:{
			
		},
		components:{
			"footer-click":footer
		},
		methods:{
			getlist(){
			let token = window.localStorage.getItem('token');
			var url = common.apimain + '/api/user/getUserInfo?token='+token;
			//console.log(token)
			var _this=this;
			_this.$http.get(url,{ emulateJSON: true },{timeout:5000}).then(res=>{
                //console.log("------************-------------")
 //                 console.log(res.data);
                //console.log("------************-------------");
				if(res.data.code == 1000){
					Indicator.close();
					_this.nickname=res.data.data.nickname;
					_this.head_img=res.data.data.head_img;
					this.school = res.data.data.school;
					_this.system=res.data.data.system;
					_this.grade=res.data.data.grade;
					_this.balance=res.data.data.balance;
					_this.act_value=res.data.data.act_value;
					_this.create_task_num=res.data.data.create_task_num;
					if(_this.create_task_num !==0){
						$('.iossued').css("display","inline");
					}
					_this.work_task_num=res.data.data.work_task_num;
					if(_this.work_task_num !==0){
						$('.tasks').css("display","inline");
					}
					_this.employer_grade=res.data.data.employer_grade;
					_this.hunter_grade=res.data.data.hunter_grade;
					
				}else if(res.data.code == 1013){
					Toast({
						message: '登录过期，重新登录',
						duration: 2000
					});
					this.$router.push({path:'/loginuser'})
				}else{
					Indicator.close();
					Toast({
						message: '加载失败',
						duration: 1000
					});
				} 
            },function(){
				//console.log('失败了');
				Indicator.close();
				Toast('网络连接错误');
			});
			}
		},
		create() {
		this.school = window.localStorage.schoolInfo;
		},
		mounted(){
			this.getlist();
			 this.$refs.tmpld.style.height = document.documentElement.clientHeight+"px";
		},
		activated() {
    			this.getlist();
  		}
	}
</script>

<style scoped>
	section{
		margin-top: 0;
		padding-bottom: 3.75rem /* 60/16 */;
	}

	#tmpld .test{
		height: 80px;
	}
	.setone{
		width: 100%;
		padding:.9375rem .9375rem  0/* 15/16 */ /* 15/16 */;
		height: 10rem /* 144/16 */;
	}
	.chilun{
		height:1.25rem /* 20/16 */;
		display: flex;
		justify-content:space-between;
	}
	.chilun img{
		width:1.125rem /* 18/16 */;
		height:1.125rem /* 18/16 */;
	}
	
	.userinfo{
		width:100%;
		height:6.25rem /* 100/16 */;
		display: -webkit-flex; /* Safari */
  		display: flex;
		justify-content:space-between;
		margin-top: 1.125rem /* 18/16 */;
	}
	.userinfo dl{
		display: -webkit-flex; /* Safari */
  		display: flex;
		  margin:0;
		  justify-content:space-between;
	}
	.userinfo dl dt{
		width:6rem /* 64/16 */;
		height:6rem /* 64/16 */;
		background-color: rgba(255,255, 255, 0.5);
		border-radius:4rem /* 18/16 */;
		
		overflow: hidden;
		padding:0;
	}
	.userinfo dl dt img{
		width:100%;
		height:100%;
	}
	.userinfo dl dd{
		margin:.4375rem /* 7/16 */ 5px 0 .5rem /* 8/16 */;
	}
	.userinfo dl dd>p{
		margin:0
	}
	.userinfo dl dd>p:nth-child(2){
		width:100%;
		height:1.4rem /* 16/16 */;
		margin:.375rem /* 6/16 */ 0 ;
		text-overflow:ellipsis;
	}
	.userinfo-tab_top{
		font-size:1rem /* 14/16 */;
		color:#fff;
		font-weight: bold;
	}
	.userinfo-tab_top span{
		display:inline-block;
		margin-right:10px;
	}
	.userinfo-tab_top>img{
		width:1rem /* 16/16 */;
		height:1rem /* 16/16 */;
	}
	.userinfo-tab_center{
		font-size:1rem /* 10/16 */ /* 12.5/16 */;
		color:#EAEAEA;
		
	}

	.settwo{
		height:5rem /* 67.5/16 */;
		border-bottom:1px solid #DCDBE2;
		background:rgba(255,255,255,0.8);
		margin-bottom:.4375rem /* 7/16 */;
	}
	.settwo dl{
		width:25%;
		height:2.625rem /* 42/16 */;
		float:left;
		margin:.78125rem /* 12.5/16 */ 0 0;
		border-right:1px solid #F3F3F3;
		text-align:center;
	}
	.userinfo_img{
		width:10%;
		
	}
	.userinfo_img img{
		display:block;
		float:right;
		margin-top:1.375rem /* 22/16 */;
	}
	.userinfo-tab_bottom{
		display: -webkit-flex; /* Safari */
  		display: flex;
	}
	.userinfo-tab_bottom>span{
		display:block;
		width:3.0625rem /* 33/16 */;
		height:1.5rem /* 20/16 */;
		
		border-radius:12px /* 10/16 */;
		font-size:.625rem /* 10/16 */ /* 12.5/16 */;
		
		text-align:center;
		line-height: 1.5rem;
	}
	.userinfo-tab_bottom p{
		min-width:7.3125rem /* 117/16 */;
		height:1.5rem /* 20/16 */;
		line-height: 1.5rem;
		border-radius:12px /* 10/16 */;
		padding:0 .625rem /* 10/16 */;
		font-size:.625rem /* 10/16 */ /* 12.5/16 */;
		
		margin-left:.4375rem /* 7/16 */;
		display: -webkit-flex; /* Safari */
  		display: flex;
		justify-content:space-between;
	}
	.userinfo-tab_bottom p span{
		display:block;
		display: -webkit-flex; /* Safari */
  		display: flex;
		color:#fff;
		  
	}
	.userinfo-tab_bottom p img{
		display:inline-block;
		width:.8rem /* 10/16 */;
		height:.8rem /* 10/16 */;
		margin:.43rem .25rem /* 4/16 */ 0 0;
	}
	.userinfo-tab_bottom p i{
		font-style:normal;
		font-size: 1rem;

	}
	.settwo dl dt{
		position: relative;
	}
	.settwo dl dd{
		margin:0;
		font-size:.78125rem /* 12.5/16 */;
		color:#363636;
	}
	.settwo-tab-item img{
		width:1.8rem /* 22.5/16 */;
		height:1.8rem /* 22.5/16 */;
	}
	.last-img img{
		width:1.4rem /* 20/16 */;
		height:1.7rem /* 26/16 */;
		margin:0 auto;
	}
	
	.settwo-badge{
		width:1rem /* 16/16 */;
		height:1rem /* 18/16 */;
		font-size: 10px;
		line-height:1rem /* 18/16 */;
		position: absolute;
		top: -5px;
		left: 50%;
		color: white;
		border-radius:1rem /* 18/16 */;
		background: red;
		text-align:center;
	}
	.iossued{
		display: none;
	}
	.tasks{
		display: none;
	}
	.setthree_list span{
		font-size:.75rem /* 12/16 */;
	}

	.setting_main{
		border-top:1px solid #DCDBE2;
		margin-top:.9375rem /* 15/16 */;
		overflow-y: auto;
	}

	.setting_main_list{
        height:3rem /* 42/16 */;
        display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
        justify-content: space-between;
        position:relative;
		border-bottom:1px solid #DCDBE2;
        background:#fff;
		padding:0 1.25rem /* 20/16 */ 0 .9375rem /* 15/16 */;
		line-height:3rem /* 42/16 */
    }
    .setting_main_list:after{
       border: 2px solid #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        right: 10px;
        position: absolute;
        width: 5px;
        height: 5px;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
    }
	.setting_main_list span{
		display:block;
        margin:0;
        font-size:.875rem /* 14/16 */;
        color:#484848;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	.setting_main_list span img{
		display:block;
		margin:.6rem /* 10/16 */ 0.4rem 0 0;
	} 
	.employer{
		color:#000;
	}

</style>