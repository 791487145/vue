<template>
	<div id="tmpld" ref="tmpld">
		<com-header :title="title"></com-header>
		<section class="usermod_top">	
			<div class="about_top">
				<img src="../../../statics/imgs/SHOUYE_31.png" alt="">
				<p>
					赏金联盟是一款大学生互助的C2C任务平台，包含文学、快递、游戏等各类任务服务，同时提供兼职、校招等工作推荐。同时官方还会推出很多集体类运动，例如篮球、足球、电子竞技比赛。
				</p>
			</div>
			<!--<div class="setting_main">
				<div class="setting_main_list">
					<span>欢迎页</span>
				</div>
				<div class="setting_main_list">
					<span>版权信息</span>
				</div>
				
			</div>-->
		</section>	
	</div>
	
</template>

<script>
	import comHeader from '../../kits/comheader';
	export default{
		data(){
			return{
				title:"关于我们",
			}
		},
		components:{
			comHeader, 
		},
		methods:{
		

		},
		mounted(){
			
			this.$refs.tmpld.style.height = document.documentElement.clientHeight+"px";
		}
	}
</script>

<style scoped>
	.usermod_top{
		padding-top: 3.125rem /* 50/16 */;
	}
	.about_top{
		width: 100%;
		background-color: rgba(255,255,255,.8);
		padding:.9375rem /* 15/16 */ 0 3.4375rem /* 55/16 */;
		
	}
	.about_top img{
		display:block;
		width: 30%;
		height:0 auto;
		margin: 0 auto 1.875rem /* 30/16 */;
	}
	.about_top p{
		width: 80%;
		margin: 0 auto;
		text-indent: 2em;
		color: #4171AE;
		font-size: .75rem /* 12/16 */;
	}
	.setting_main{
		margin-top:2.0625rem /* 33/16 */;
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
		padding:0 1.25rem /* 20/16 */ 5%;
		line-height:2.625rem /* 42/16 */;
		
    }
    .setting_main_list:after{
       	border: 2px solid #4171AE;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        right: 5%;
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
        color:#4171AE;
	}
</style>