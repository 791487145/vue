<!-- 以后项目的根组件 -->
<template>
	<div id="app">
		<!-- 2.0 利用vue-route的<router-view>进行占位 -->
		<!-- <router-view>	
		</router-view> -->
	<keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
     
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"></router-view>
   
	</div>
</template>

<script>
import bgimg from '../statics/imgs/SHOUYE_03.png';
import "./kits/jquery.min.js";
	export default{  // es6的导出对象的写法
		data(){  //等价于 es5的 data:function(){
			return {
				bgimg:bgimg,
			}
		},
		watch:{
		},
		methods:{
			bl: function() {
					alert("blur")
  				}
		},
		created(){
			//console.log(123);
			//var bgimg = this.bgimg;
			//console.log(bgimg);
			//$("#tmpld").css('background-image','url('+bgimg+')');
		
		}
	}
</script>

<style scoped>
/*当前页面的css样式写到这里，其中scoped表示这个里面写的css代码只是在当前组件页面上有效，不会去影响到其他组件页面*/
	/* #tmpld{
		background-image: url(../statics/imgs/SHOUYE_03.png);
	} */
</style>