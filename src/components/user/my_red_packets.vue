<template>
	<div id="tmpld" ref="tmpld">
		<com-header :title="title"></com-header>
		<section>
			<div class="no_content">
				还没有红包哦
			</div>
		</section>
	</div>
	
</template>

<script>
	import { Cell } from 'mint-ui';
	import comHeader from '../../kits/comheader';
	export default{
		data(){
			return{
				title:'我的红包',
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