<template>
	<header>
			<a href="javascript:;" @click="backto" class="header_button">
                <img src="../../../statics/imgs/jiantou-1.png" alt="">
            </a>			
			<h3>{{msg}}</h3>
	</header>
	
</template>

<script>
 export default {
     name:'addHeader',
     data(){
         return{
             msg:"任务详情",
         }
     },
     methods:{
         backto(){
				//利用路由对象中go（-1）实现
				this.$router.go(-1);		
			}
     }
 }
</script>

<style scoped>
	header{
		width:100%;
		height:2.8125rem /* 45/16 */;
		background-color:#4171AE;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		color: #fff;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		font-size: 1rem /* 16/16 */;
		line-height: 1;
		padding: 0 10px;
		position: relative;
		text-align: center;
		white-space: nowrap;
	}
	.header_button{
		-webkit-box-flex: .5;
		-ms-flex: .5;
		flex: .5;
		text-align: left;
	}
	.header_button>img{
		width:.9375rem /* 15/16 */;
		height:1.0625rem /* 17/16 */;
	}
	header h3{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: inherit;
		font-weight: 400;
		text-align: center;
	}
</style>