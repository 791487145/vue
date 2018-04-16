<template>
	<div id="tmpld" ref="tmpld">
			<com-header :title="title"></com-header>
			<section>
				<div class="setting_main">
					<div class="setting_main_list" style="display: none;">
						<span>推送设置</span>
						<span class="none">暂未开通</span>
					</div>
					<div  @click="clear" class="setting_main_list">
						<span>清理缓存</span>
						<span class="clear_last">{{cache}}</span>
					</div>
					
				</div>
				<div class="setting_main">
					<router-link class="setting_main_list" to="/user/setting_up/questions">
						<span>常见问题</span>
					</router-link>
					<router-link to="/agree">
						<div class="setting_main_list">
							<span>用户协议</span>
						</div>
					</router-link>
					<div class="setting_main_list" style="display: none;">
						<span>意见反馈</span>
						<span class="none">暂未开通</span>
					</div>
					
				</div>
				<div class="setting_main">
					<div class="setting_main_list" style="display: none;">
						<span>给个好评</span>
						<span class="none">暂未开通</span>
					</div>
					<router-link class="setting_main_list" to="/user/setting_up/about_us" >
						<span>关于</span>
					</router-link>
				
				</div>
				<div class="setting_bottom setting_main" @click="secede">
					退出当前账号
				</div>
			</section>
			
	</div>
	
</template>

<script>
	import comHeader from '../../kits/comheader';
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				title:'设置',
				cache:null,
			}
		},
		components:{
			comHeader, 
		},
		methods:{
			//var cache=window.localStorage.length;
			clear(){
				// MessageBox({
				// 	title: '提示',
				// 	message: '确定清除本地缓存?',
				// 	showCancelButton: true
				// }).then(action => {
				// 	localStorage.clear();
				// });
				MessageBox.confirm('确定清除本地缓存?').then(action => {
						  localStorage.clear();
						  this.$router.push({ path: '/loginuser'});
				});
			},
			secede(){
				// MessageBox({
				// 	title: '提示',
				// 	message: '确定退出当前账号?',
				// 	showCancelButton: true
				// }).then(action => {
				// 	this.$router.push({ path: '/loginuser'});
				// });
				MessageBox.confirm('确定退出当前账号?').then(action => {
  						this.$router.push({ path: '/loginuser'});
				});
			}
		},
		mounted(){
			
//			console.log(window.localStorage)
			
			this.$refs.tmpld.style.height = document.documentElement.clientHeight+"px";
		}
	}
</script>

<style scoped>
	a {
    	text-decoraction: none;
	}
	a:hover, a:visited, a:link, a:active {
     	color:#DCDBE2;
	}
	section{
		padding-top: 3.125rem /* 50/16 */;
	}
	.setting_main{
		border-top:1px solid #DCDBE2;
		margin-top:.9375rem /* 15/16 */;
	}

	.setting_main_list{
        height:2.625rem /* 42/16 */;
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
	}
	.clear_last{
        font-size:.75rem /* 12/16 */;
        color:#797979;
	}
	.setting_bottom{
		width:100%;
		height:2.5rem /* 40/16 */;
		border-bottom:1px solid #CDCFD4;
		background:#FAFAFB;
		line-height:2.5rem;
		text-align:center;
		color:#DD3F25;
		font-size:.875rem /* 14/16 */;
	}
	.setting_main_list span.none{
		font-size: .75rem /* 12/16 */;
		color: red
	}
</style>