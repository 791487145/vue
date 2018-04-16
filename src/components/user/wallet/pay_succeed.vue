<template>
	<div id="tmpld" ref="tmpld">
		<com-header :title="title"></com-header>
		<section class="succeed">	
			<dl>
                <dt>
                    <img src="../../../../statics/imgs/wallet_29.png" alt="">
                </dt>
                <dd>充值成功</dd>
            </dl>
            <router-link to="/user/my_wallet" class="succeed_btn">完成</router-link>
		</section>	
	</div>
	
</template>

<script>
	import comHeader from '../../../kits/comheader';
	export default{
		data(){
			return{
				title:"充值成功",
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
    .succeed dl{
        width: 100%;
        text-align: center;
        margin: 3.125rem /* 50/16 */ auto 0;
    }
	.succeed dl dt{
		width: 100%;
		 height: 6.375rem /* 102/16 */;
		 margin-bottom: .625rem /* 10/16 */;
	}
    .succeed dl dt img{
        width: 6.375rem /* 102/16 */;
        height: 6.375rem /* 102/16 */;
    }
	.succeed_btn{
        display: block;
        text-align: center;
        line-height: 3rem /* 48/16 */;
		color: #fff;
		width: 70%;
		margin: 1.875rem /* 30/16 */ auto 0;
		height: 3rem /* 48/16 */;
		background: #4171AE;
    }
</style>