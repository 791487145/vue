<template>
	<div id="tmpld"  ref="tmpld">
		<com-header :title="title"></com-header>
		<section>
			<div class="setting_main">
				<div class="setting_main_list">
					<span>推广码</span>
					<span class="right">{{code}}</span>
				</div>
				<div class="setting_main_list">
					<span>分享二维码</span>
					<span class="clear_last">{{cache}}</span>
				</div>
				<div class="erwei">
						<img src="" alt="">
					</div>
				
			</div>
			<!-- <div class="setting_main">
				<router-link to="" class="setting_main_list">
					<span><img slot="icon" src="../../../statics/imgs/PERSONNAL-CENTRAL_56.png" width="24" height="24">历练</span>
					<span class="none">暂未开通</span>
				</router-link>
				<router-link to="/user/clothes/my_achievement" class="setting_main_list">
					<span><img slot="icon" src="../../../statics/imgs/PERSONNAL-CENTRAL_58.png" width="24" height="24">成就</span>
				</router-link>				
			</div> -->
		</section>
			


	</div>
	
</template>

<script>
import comHeader from '../../kits/comheader';
import common from '../../kits/common.js';//api
	import { Cell } from 'mint-ui';
	
	export default{
		data(){
			return{
				title:'个人专属',
				cache:'',
				code:'',
			}
		},
		components:{
			comHeader, 
		},
		methods:{
			 
		},
		mounted(){
			var that = this;
			that.$refs.tmpld.style.height = document.documentElement.clientHeight+"px";
			let token =window.localStorage.getItem('token');
	        		 //console.log(token);
	        		 //console.log(this.title);
	        		 var url = common.apimain + '/api/user/getPromoteCode';
	        		 var json = {
	        			 token:token,
	        			 }
	        		that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
	        				var body = res.body;
//	        				console.log(body)
	        				if(body.code == 1000){
								that.code = body.data
	        					//console.log(body);
	        					// console.log(body)
	        					// console.log(this.listDinmond)
	        					// console.log(this.listTop)
	        				}else{
	        					Toast(body.message)
	        				}
	        			},function(){
	        				//console.log('失败了');
	        				Toast('网络连接超时，请检查后再试');
	        			})
		}
	}
</script>

<style scoped>
section{
		padding-top: 3.125rem /* 50/16 */;
	}
	.setting_main{
		border-top:1px solid #DCDBE2;
		margin-top:.9375rem /* 15/16 */;
	}

	.setting_main_list{
        height:3.125rem /* 50/16 */;
		border-bottom:1px solid #DCDBE2;
        display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
        justify-content: space-between;
        position:relative;
		border-bottom:1px solid #DCDBE2;
        background:#fff;
		padding:0 1.25rem /* 20/16 */ 0 .9375rem /* 15/16 */;
		line-height:2.625rem /* 42/16 */
    }
	.setting_main_list span{
		display:block;
        margin:0;
        font-size:1rem /* 16/16 */;
		line-height: 3.125rem /* 50/16 */;
        color:#484848;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	.setting_main_list .right{
		color: #000;
	}
	.erwei{
		width: 12.5rem /* 200/16 */;
		height: 12.5rem /* 200/16 */;
		margin: 1.25rem /* 20/16 */ auto;
		background-color: #fff;
		border: 1px solid #f8f8f8;
		padding: 10px;
	}
	.erwei img{
		display: block;
		width: 100%;
		height: 100%;
		background-color: #f3e7e7;
		border: 1px solid #f3e7e7;

	}
</style>