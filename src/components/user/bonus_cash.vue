<template>
	<div id="tmpld" ref="tmpld">
		<com-header :title="title"></com-header>
		<section class="main">
			<section>
				<div class="bonus_main">
					<p>兑换码</p>
					<input type="text" name="" id="" value="" placeholder="请填写你的兑换码" v-model="code"/>
				</div>
				<button class="bonus_btn divcss" @click="convert">兑换</button>
			</section>
			<section class="employer_list">
				<p><img src="../../../statics/imgs/PERSONNAL-CENTRAL_54.png" alt=""><span>已兑换礼品</span></p>
				<ul class="iossued">
					

					<li class="iossued_list"  v-for="item in list" >
						<p class="iossued_list_top">
							<img :src="item.icon" alt="" srcset="">
							<span id="sss" class="state_style">
								{{item.name}}
							</span>
						</p>
						<p class="iossued_list_time">
							<span id="">
								{{item.created_at}}
							</span>
						</p>
					</li>
				</ul>	
				<div class="no_content" v-if="no">
					还没有奖品哦
				</div>		
			</section>	
		</section>
		
	</div>	
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import comHeader from '../../kits/comheader';
	import { Cell } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import common from '../../kits/common.js';//api
	export default{
		data(){
			return{
				title:'奖品兑换',
				name:'',
				code:'',
				created_at:'',
				list:[],
				no:false,
				
			}
		},
		components:{
			comHeader, 
		},
		methods:{
			 convert() {
				 Indicator.open();
				let token = window.localStorage.getItem('token');
				var url = common.apimain + '/api/gift/exchange';
				let code=this.code;
//				console.log(code)
//				console.log(token)
				this.$http.post(url,{token:token,code:code},{emulateJSON: true}).then(res=>{
//					console.log(res.data);
					if(res.data.code == 1000){
						if(res.data.success){
							Indicator.close();
							MessageBox({
									title: '兑换成功',
									message: '奖品已经放入您的奖品列表',
									confirmButtonText: '完成'
								}).then(action => {
									this.$router.push({ path: '/user/bonus_cash'});

								});
						}else{
							Indicator.close();
							MessageBox({
									title: '兑换失败',
									message: '您的兑换码错误',
									confirmButtonText: '确定'
								}).then(action => {
									this.$router.push({ path: '/user/bonus_cash'});
							
								});
						}
					}
					
            	},function(){
					//console.log('失败了');
					Indicator.close();
					Toast('网络连接错误');
				});								
			},
			
		},
		mounted(){
				
				let _this=this;
				let token = window.localStorage.getItem('token');
				let page=_this.page;
				let per_page=8;	
				var url = common.apimain + '/api/gift/exchangeRecord?token='+token+'&page='+page+'&per_page='+per_page;
				Indicator.open();
				_this.$http.get(url,{timeout:5000}).then(res=>{
//					console.log(res.data);
					
					if(res.data.code == 1000){
						Indicator.close();
						_this.list=res.data.data.list;
//						console.log(_this.list)
						
					}else if(res.data.code == 3000){
						Indicator.close();
						Toast({
							message: '暂无数据',
							duration: 1000
						});
						_this.no=true
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
	.bonus_main{
		margin-top:.9375rem /* 15/16 */;
		width:100%;
		height:2.625rem /* 42/16 */;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		justify-content: space-between;
		background-color:#FFF;
		border-bottom:1px solid #F3F3F3;
		padding:0 1rem /* 16/16 */;
		line-height: 2.625rem /* 42/16 */;
		font-size: .875rem /* 14/16 */;
	}
	.bonus_main input{
		width:50%;
		font-size: .875rem /* 14/16 */;
		border:none;
	}


	.bonus_btn{
		display:block;
		width:18.3125rem /* 293/16 */;
		height:2.9375rem /* 47/16 */;
		
		border:none;
		margin:2rem /* 32/16 */ auto;
		font-size:1rem /* 16/16 */;
		
	}

	 .experience_list{
        height:4rem /* 64/16 */;
		border-bottom:1px solid #DCDBE2;
        display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
        justify-content: space-between;
    }
    .experience{
        border-top:1px solid #DCDBE2;
        background:rgba(255,255,255,0.9);
        
    }
    .experience_list dl{
         display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
        margin:0;
        padding:0 1.125rem /* 18/16 */;
    }
    .experience_list dl dt img{
        width:1.5625rem /* 25/16 */;
        height:1.5625rem /* 25/16 */;
        margin-top:.9375rem /* 15/16 */
    }
    .experience_list dl dd{
        margin:.875rem /* 14/16 */ .875rem /* 14/16 */  0;
		 font-size:.875rem /* 14/16 */;
    }
    
    .experience_btn {
       
    }
    .experience_btn span{
		display:block;
        width:3.5rem /* 56/16 */;
		height:1.4375rem /* 23/16 */;
        line-height: 1;
        border-radius:8px;
        margin:1.25rem /* 20/16 */ .875rem /* 14/16 */ 0 0;
         color:#fff;
         font-size: .75rem /* 12/16 */;
	}
	/* 奖品兑换列表 */
	.employer_list{
		width:100%;	
		border-top: 1px solid #E5E5E5;
		margin-top: 1.125rem /* 18/16 */;
	}
	.employer_list>p{
		padding-left:.625rem /* 10/16 */;
		height:2.8125rem /* 45/16 */;
		line-height:2.8125rem /* 45/16 */;
		border-bottom: 1px solid #E5E5E5;
		background: #fff;
		display: -webkit-flex; /* Safari */
		display: flex;
		
	}
	.employer_list p img{
		display: block;
		width:1.25rem /* 20/16 */;
		height:1.25rem /* 20/16 */;
		margin-top: .75rem /* 12/16 */;
	}
	.employer_list p span{
		font-weight: bold;
		margin-left:.3125rem /* 5/16 */;
	}


	.iossued{
		width: 100%;
		height: auto;
		list-style: none;
		margin:0;
		padding:0;
	}
	.iossued_list{
		height: 3.875rem /* 62/16 */;
		background: #fff;
		margin-bottom: .3125rem /* 5/16 */;
		border-top: 1px solid #E5E5E5;
		border-bottom: 1px solid #E5E5E5;
		padding:0 .9375rem /* 15/16 */;
		 position:relative;
		 display: flex;
		 justify-content: space-between;
	}
	.iossued_list:after{
       border: 2px solid #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        right: .9375rem /* 15/16 */;
        position: absolute;
        width: .375rem /* 6/16 */;
        height: .375rem /* 6/16 */;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
	}

	.iossued_list_top{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
        justify-content: space-between;
		margin: .875rem /* 14/16 */ 0 0;
		font-size:.75rem /* 12/16 */;
		position: relative;
	}
	.iossued_list_top span{
		display: block;
	}

	.iossued_list_time{
		line-height: 3.875rem /* 62/16 */;
		padding-right: .625rem /* 10/16 */;
	}
	.iossued_list_time img{
		width:.75rem /* 12/16 */;
		height:.75rem /* 12/16 */;
		margin-right:.375rem /* 6/16 */;
	}
	.iossued_list_time span{
		font-size:12px; 
		-webkit-transform-origin-x: 0;
		-webkit-transform: scale(0.90);
		color:#787878;
	}
	.no_content{
		text-align:center;
		font-size:1.125rem /* 18/16 */;
		margin:20% 0;
		color:red;
	}

</style>