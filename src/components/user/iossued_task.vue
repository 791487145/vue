<template>
	<div id="tmpld" ref="tmpld">
		<com-header :title="title"></com-header>
			<section>
				<div>
					<ul class="iossued">
						
						<li v-for="item in list" class="iossued_list" :key="item.created_at">
							<router-link v-bind="{to:'/user/iossued_task/iossued_task_list/'+item.id+'&'+item.identify}">
								<p class="iossued_list_top">
									<span>{{item.title}}</span>
								</p>
								<p id="" class="state_style" v-if="item.status==1">
									<img src="../../../statics/imgs/PERSONNAL-CENTRAL_07.png"/>
								</p>
								<p id="" class="state_style" v-else-if="item.status==2">
									<img src="../../../statics/imgs/wallet_49.png"/>
								</p>
								<p id="" class="state_style" v-else-if="item.status==3">
									<img src="../../../statics/imgs/PERSONNAL-CENTRAL_03.png"/>
								</p>
								<p id="" class="state_style" v-else-if="item.status==4">
									<img src="../../../statics/imgs/PERSONNAL-CENTRAL_17.png"/>
								</p>
								<p id="" class="state_style" v-else-if="item.status==5">
									<img src="../../../statics/imgs/PERSONNAL-CENTRAL_12.png"/>
								</p>
								<p id="" class="state_style" v-else-if="item.status==6">
									<img src="../../../statics/imgs/PERSONNAL-CENTRAL_12.png"/>
								</p>
							 	<p id="" class="state_style" v-else-if="item.status==7">
								<img src="../../../statics/imgs/PERSONNAL-CENTRAL_09.png"/>
								</p> 
								<p id="" class="state_style" v-else-if="item.status==8">
								<img src="../../../statics/imgs/wallet_36.png"/>
								</p>
								<p id="" class="state_style" v-else-if="item.status==9">
								<img src="../../../statics/imgs/wallet_24.png"/>
								</p>
								
								<p id="" class="state_style" v-else-if="item.status==10">
								<img src="../../../statics/imgs/PERSONNAL-CENTRAL_05.png"/>
								</p> 
								<p class="iossued_list_time">
									<img src="../../../statics/imgs/renwudating_36.png"/>
									<span id="">
										{{item.created_at}}
									</span>
								</p>
								</router-link>
						</li>
						
					</ul>
				</div>
				<div class="no_content" v-if="isno">
					还没有发布任务哦
				</div>
			</section>
		
	</div>
	
</template>

<script>
	import comHeader from '../../kits/comheader';
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import common from '../../kits/common.js';//api
	export default{
		data(){
			return{
				title:'已发任务',
				list:[],
				token:'',
				isno:false,
			}
		},
		components:{
			comHeader, 
		},
		computed:{
			
		},
		mounted(){
			
			var _this=this;
			let token = window.localStorage.getItem('token');
			let page=1;
			let per_page=8;
			var url = common.apimain + '/api/myTask/index?token='+token+'&page='+page+'&per_page='+per_page;
			
			_this.$http.get(url).then(res=>{

					if(res.data.code == 1000){
					_this.list=res.data.data.list; 
					console.log(_this.list);
				}else if(res.data.code == 2000){
			
					Toast({
						message: '暂无数据',
						duration: 1000
					});
					_this.isno=true
				}else{
					
					Toast({
						message: '加载失败',
						duration: 1000
					});
				}
            },function(){
				//console.log('失败了');
		
				Toast('网络连接错误');
			});

		}
	}
</script>

<style scoped>
	section{
		padding-top: 3.125rem /* 50/16 */;
	}
	/*内容区 */
	.iossued{
		width: 100%;
		height: auto;
		list-style: none;
		margin:0;
		padding:0;
	}
	.iossued_list{
		height: 6.25rem /* 100/16 */;
		background: #fff;
		margin-bottom: .3125rem /* 5/16 */;
		border-top: 1px solid #E5E5E5;
		border-bottom: 1px solid #E5E5E5;
		padding:0 .9375rem /* 15/16 */;
		 position:relative;
	}
	.iossued_list:after{
       border: 2px solid #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        right: .9375rem /* 15/16 */;
        position: absolute;
        width: .75rem /* 12/16 */;
        height: .75rem /* 12/16 */;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
	}
	.state_style{
		position: absolute;
		right: 0;
		top: -.0625rem /* 1/16 */;
	}
	.state_style img{
		width: 3.125rem /* 50/16 */;
		height: 3.125rem /* 50/16 */;
	}
	.iossued_list_top{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
        justify-content: space-between;
		margin: .875rem /* 14/16 */ 0 0;
		font-size:1rem /* 16/16 */;
		position: relative;
	}
	.iossued_list_top span{
		display: block;
	}

	.iossued_list_time{
		font-size:1rem /* 16/16 */; 
		-webkit-transform-origin-x: 0;
		-webkit-transform: scale(0.90);
		margin-top: 1.25rem /* 20/16 */;
	}
	.iossued_list_time img{
		width:.9375rem /* 15/16 */;
		height:.9375rem /* 15/16 */;
		margin-right:.375rem /* 6/16 */;
	}
	.iossued_list_time span{
		font-size:.875rem /* 14/16 */;
		-webkit-transform:scale(0.8);
		color:#787878;
	}
	.no_content{
		text-align:center;
		font-size:1.25rem /* 20/16 */;
		margin-top:60%;
		color:red;
	}
</style>