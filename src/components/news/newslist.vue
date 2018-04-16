<template>
    <div id="tmpld">
    <!-- 头部 -->
	<div class="one">
			<span>信息中心</span>
	</div>
	
    <!-- 底部 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon">
					<img src="../../../statics/imgs/iconhome.png">
				</span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/mission">
				<span class="mui-icon">
					<span class="mui-badge">0</span>
					<img src="../../../statics/imgs/icon03.png">
				</span>
				<span class="mui-tab-label">任务大厅</span>
			</router-link>
			<router-link class="mui-tab-item" id="zhuye" to="/home">
					
					<span class="mui-icon" id="money" >
						<img src="../../../statics/imgs/zhuye_35.png">
					</span>
					
			</router-link>
			<router-link class="mui-tab-item" to="/news/newslist">
				<span class="mui-icon">
					
					<img src="../../../statics/imgs/icon06.png">
				</span>
				<span class="mui-tab-label">信息中心</span>
			</router-link>
			<router-link class="mui-tab-item" to="/user">
				<span class="mui-icon">
					<img src="../../../statics/imgs/iconuser.png">
				</span>
				<span class="mui-tab-label">个人中心</span>
			</router-link>
		</nav>
    </div>
</template>

<script>
    export default{

    }
</script>

<style scoped>
  	.one{
		max-width: 40rem /* 640/16 */;
	 	min-width: 20rem /* 320/16 */;
		position: fixed;
		top: 0;
		width: 100%;
		height: 3.125rem /* 50/16 */;
		background-color: #4171AE;
		z-index: 100;
	}
	.one span{
		display: inline-block;
		height: 3.125rem /* 50/16 */;
		width: 100%;
		text-align: center;
		line-height: 50px;
		color: white;
	}
	
</style>