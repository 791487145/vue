<template>
	<div id="tmpld" ref="tmpld">
		<com-header :title="title"></com-header>
			<section>
				<div class="no_content">
					还没有成就哦，赶快去完成任务吧
				</div>
			</section>
	</div>
	
</template>

<script>
	import comHeader from '../../kits/comheader';
	import { Cell } from 'mint-ui';
	
	export default{
		data(){
			return{
				title:'我的成就',	
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
	section{
		padding-top: 3.125rem /* 50/16 */;
	}
	.no_content{
		text-align:center;
		font-size:1.125rem /* 18/16 */;
		margin-top:60%;
		color:red;
	}

</style>