<template>
    <div id="message">
		<mhead></mhead>
		<div class="ls">
			<img src="../../../statics/lsimgs/t4.png" alt="">
		</div>
		<!-- 底部 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon">
					<img src="../../../statics/imgs/iconhome.png">
				</span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/message/action">
				<span class="mui-icon">
					<span class="mui-badge">0</span>
					<img src="../../../statics/imgs/icon03.png">
				</span>
				<span class="mui-tab-label">任务大厅</span>
			</router-link>
			<router-link class="mui-tab-item" id="zhuye" to="">
					
					<span class="mui-icon" id="money" >
						<img src="../../../statics/imgs/zhuye_35.png">
					</span>
					
			</router-link>
			<router-link class="mui-tab-item" to="/message">
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
import Mhead from './Mhead.vue'
 export default {
     name:'message',
     data(){
         return {
         }
     },
     components:{Mhead}
 }
</script>
<style scoped>
    #message{
        font-family:"微软雅黑";
        width: 100%;
		max-width: 40rem /* 640/16 */;
		min-width: 20rem /* 320/16 */;
		margin: 0 auto;
		background-image: url(../../../statics/imgs/SHOUYE_03.png);
		background-size: cover;
		background-repeat: no-repeat;
        min-height: 100vh;
    }
    li{
        height: 2.8rem;
        line-height: 2.8rem;
        border-bottom: 1px solid #ccc;
        width: 19vw;
        float: left;
        text-align: center;
        cursor: pointer;
    }
    li:active{
        background-color: gold;
    }
	/* ls */
	.ls>img:nth-of-type(1){
		width: 100vw;
		height: 93vw;
	}
	/* lss */
</style>