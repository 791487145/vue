<template>
	<div id="tmpld" ref="tmpld">
		<com-header :title="title"></com-header>
		
		<section class="main">
			<section class="list">
				<div class="today">
					<div class="list_head" v-if="today_top"><h3>{{data || "今天"}}</h3></div>
					<ul class="list_one">
						<li class="list_main" v-for="item in today">
							<div class="one">
								<p class="title">{{item.title}}</p>
								<div class="time">
									<p class="iossued_list_time">
										<img src="../../../statics/imgs/renwudating_36.png"/>
										<span id="">
											{{item.created_at}}
										</span>
									</p>
									<p class="iossued_list_time">
										<img src="../../../statics/imgs/renwudating_38.png"/>
										<span id="">
											{{item.area}}
										</span>
									</p>
								</div>		
							</div>
							<div class="two">
								<h4>￥{{item.show_cash}}</h4>
								<p>{{item.add_time}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="today">
					<div class="list_head" v-if="yestoday_top"><h3>昨天</h3></div>
					<ul class="list_one">
						<li class="list_main" v-for="items in yestoday">
							<div class="one">
								<p class="title">{{items.title}}</p>
								<div class="time">
									<p class="iossued_list_time">
										<img src="../../../statics/imgs/renwudating_36.png"/>
										<span id="">
											{{items.created_at}}
										</span>
									</p>
									<p class="iossued_list_time">
										<img src="../../../statics/imgs/renwudating_38.png"/>
										<span id="">
											{{items.area}}
										</span>
									</p>
								</div>		
							</div>
							<div class="two">
								<h4>￥{{items.show_cash}}</h4>
								<p>{{items.add_time}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="today">
					<div class="list_head" v-if="more_top"><h3>更早</h3></div>
					<ul class="list_one">
						<li class="list_main" v-for="itemm in more">
							<div class="one">
								<p class="title">{{itemm.title}}</p>
								<div class="time">
									<p class="iossued_list_time">
										<img src="../../../statics/imgs/renwudating_36.png"/>
										<span id="">
											{{itemm.created_at}}
										</span>
									</p>
									<p class="iossued_list_time">
										<img src="../../../statics/imgs/renwudating_38.png"/>
										<span id="">
											{{itemm.area}}
										</span>
									</p>
								</div>		
							</div>
							<div class="two">
								<h4>￥{{itemm.show_cash}}</h4>
								<p>{{itemm.add_time}}</p>
							</div>
						</li>
					</ul>
				</div>
			</section>
			<div class="no_content" v-if="no">
					还没有足记哦！赶快去看看吧
			</div>
		</section>
	</div>
	
</template>

<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import { Cell } from 'mint-ui';
	import comHeader from '../../kits/comheader';
	import common from '../../kits/common.js';//api
	export default{
		data(){
			return{
				title:'我的足记',
				no:false,
				today:[],
				yestoday:[],
				more:[],
				data:'',
				today_top:false,
				yestoday_top:false,
				more_top:false,
			}
		},
		components:{
			comHeader, 
		},
		methods:{
			
		},
		mounted(){
			let token = window.localStorage.getItem('token');
//			console.log(token)
			var _this=this;
			let page=this.page;
			let per_page=6;
			var url = common.apimain + '/api/browes/list?token='+token+'&page='+page+'&per_page='+per_page;
			Indicator.open();
			_this.$http.get(url).then(res=>{
                // console.log("------************-------------")
//                console.log(res.data);
                // console.log("------************-------------");
				
				if(res.data.code == 1000){
					Indicator.close();
					_this.today=res.data.data.today;
					_this.today.length=res.data.data.today.length;
					_this.yestoday=res.data.data.yestoday;
					_this.more=res.data.data.more;
//					console.log(_this.more.length);
					if(_this.today.length !== "0"){
						_this.today_top=true;
					}
					
					if(_this.more.length !== '0'){
						_this.more_top=true;
					}
					if(_this.yestoday.length !== '0'){
						_this.yestoday_top=true;
					}
				}else if(res.data.code == 2000){
					Indicator.close();
					Toast({
						message: '暂无数据',
						duration: 1000
					});
					_this.no=true
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
			this.$refs.tmpld.style.height = document.documentElement.clientHeight+"px";
		}
	}
</script>

<style scoped>
	.main{
		padding-top: 3.125rem /* 50/16 */;
	}
	/* 足记列表 */
	.today{
		width: 100%;
		height: auto;
	}
	.list_head{
		width: 100%;
		border-top: 1px solid #E5E5E5;
		border-bottom: 1px solid #E5E5E5;
		background: #F3F2F4;
		height: 2.5rem /* 24/16 */;
		line-height: 2.5rem /* 24/16 */;
		
	}
	.list_head h3{
		font-size: 1.2rem /* 12/16 */;
		font-weight: 500;
		transform:scale(0.9);
		line-height: 2.5rem /* 24/16 */;
	}
	.list_one{
		width: 100%;
	}
	.list_main{
		height: 4.6875rem /* 75/16 */;
		display: flex;
		justify-content:space-between;
		background: #fff;
		border-bottom: 1px solid #E5E5E5;
	}
	.one{
		padding-left: .875rem /* 14/16 */;
	}
	.title{
		margin: .75rem .75rem .2rem .75rem/* 12/16 */;
		font-size: 1rem /* 12/16 */;
		font-weight: 500;
		color: #232323;
	}
	.time{
		display: flex;
	}
	.iossued_list_time{
		font-size:12px; 
		-webkit-transform-origin-x: 0;
		-webkit-transform: scale(0.90);
	}
	.iossued_list_time img{
		width:.75rem /* 12/16 */;
		height:.75rem /* 12/16 */;
		margin-right:.375rem /* 6/16 */;
	}
	.iossued_list_time span{
		font-size:18px;
		-webkit-transform:scale(0.8);
		color:#787878;
	}
	.two{
		text-align: right;
		padding-right: 1.875rem /* 30/16 */;
	}
	.two h4{
		color: #F5532A;
		font-weight: 800;
		font-size: 1rem /* 14/16 */;
		font-weight: 500;
		margin: .75rem /* 12/16 */ .75rem .2rem 1.25rem /* 20/16 */;
	}
	.two p{
		font-size:20px;
		-webkit-transform:scale(0.8);
		color:#787878;
		margin-top: .1.3125rem /* 5/16 */;
	}
	.no_content{
		text-align:center;
		font-size:1.125rem /* 18/16 */;
		font-weight: 500;
		margin-top:60%;
		color:red;
	}

</style>