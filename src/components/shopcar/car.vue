<template>
	<div id="tmpl">
		<div class="test"></div>
		<com-header :title="title"></com-header>
	</div>
</template>

<script>
import directives from '../../kits/directives.js';//api
import comheader from '../../kits/comheader.vue';
	export default{
		components: {
      			ComHeader:comheader
   		},
		data(){
			return{
				title:'我是头部'
			}
		},
		methods:{
				
		}
}
</script>

<style scoped>
	.test{
		width: 50px;
		height: 50px;
		background-color:pink;
		margin-top: 100px;
	}
</style>