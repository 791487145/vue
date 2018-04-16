<template>
	<div id="tmpld"  ref="tmpld">
        <com-header :title="title"></com-header>
    
        <section>
                    <div class="experience_day">
                <h5 class="experience_top">每日历练</h5>
                <div class="experience">
                    <div class="experience_list">
                        <dl>
                            <dt><img src="../../../statics/imgs/centralofme_06.png"></dt>
                            <dd>
                                <p>邀请一位好友</p>
                                <span><b>+2</b>积分</span>
                            </dd>
                        </dl>
                        <div class="experience_btn">
                            <button class="to_complete">去完成</button>
                            <button class="completed">已完成</button>
                        </div>
                    </div>
                    <div class="experience_list">
                        <dl>
                            <dt><img src="../../../statics/imgs/centralofme_06.png"></dt>
                            <dd>
                                <p>每日签到</p>
                                <span><b>+2</b>积分</span>
                            </dd>
                        </dl>
                        <div class="experience_btn">
                            <button class="to_complete">去完成</button>
                            <button class="completed">已完成</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="experience_day">
                <h5 class="experience_top">历练列表</h5>
                <div class="experience">
                    <div class="experience_list">
                        <dl>
                            <dt><img src="../../../statics/imgs/centralofme_06.png"></dt>
                            <dd>
                                <p>实名认证</p>
                                <span><b>+2</b>积分</span>
                            </dd>
                        </dl>
                        <div class="experience_btn">
                            <button class="to_complete">去完成</button>
                            <button class="completed">已完成</button>
                        </div>
                    </div>
                    <div class="experience_list">
                        <dl>
                            <dt><img src="../../../statics/imgs/centralofme_06.png"></dt>
                            <dd>
                                <p>邀请十位好友</p>
                                <span><b>+2</b>积分</span>
                            </dd>
                        </dl>
                        <div class="experience_btn">
                            <button class="to_complete">去完成</button>
                            <button class="completed">已完成</button>
                        </div>
                    </div>
                    <div class="experience_list">
                        <dl>
                            <dt><img src="../../../statics/imgs/centralofme_06.png"></dt>
                            <dd>
                                <p>完善详细资料</p>
                                <span><b>+2</b>积分</span>
                            </dd>
                        </dl>
                        <div class="experience_btn">
                            <button class="to_complete">去完成</button>
                            <button class="completed">已完成</button>
                        </div>
                    </div>
                    <div class="experience_list">
                        <dl>
                            <dt><img src="../../../statics/imgs/centralofme_06.png"></dt>
                            <dd>
                                <p>购买商品一次</p>
                                <span><b>+2</b>积分</span>
                            </dd>
                        </dl>
                        <div class="experience_btn">
                            <button class="to_complete">去完成</button>
                            <button class="completed">已完成</button>
                        </div>
                    </div>
                    <div class="experience_list">
                        <dl>
                            <dt><img src="../../../statics/imgs/centralofme_06.png"></dt>
                            <dd>
                                <p>上传真实照片</p>
                                <span><b>+2</b>积分</span>
                            </dd>
                        </dl>
                        <div class="experience_btn">
                            <button class="to_complete">去完成</button>
                            <button class="completed">已完成</button>
                        </div>
                    </div>
                    <div class="experience_list">
                        <dl>
                            <dt><img src="../../../statics/imgs/centralofme_06.png"></dt>
                            <dd>
                                <p>首次充值</p>
                                <span><b>+2</b>积分</span>
                            </dd>
                        </dl>
                        <div class="experience_btn">
                            <button class="to_complete">去完成</button>
                            <button class="completed">已完成</button>
                        </div>
                    </div>
                </div>
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
				title:'我的历练',
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
	.experience_day{
        width:100%;
        
    }
    .experience_top{
        width:5.3125rem /* 85/16 */;
        height:1.25rem /* 20/16 */;
        background-color:#4171AE;
        text-align: center;
        line-height: 1.25rem /* 20/16 */;
        color:#F7F8FB;
        font-size: .75rem /* 12/16 */;
        position:relative;
        margin:1.375rem /* 22/16 */ 0 .625rem /* 10/16 */ 0;
    }
    .experience_top:after{
        border-bottom: 10px solid transparent;  
        border-right: 10px solid #EFF0F2;  
        border-left: 10px solid transparent;  
        border-top: 10px solid transparent;  
        content: "";    
        width: 0;  
        /* 定位 */
        position:absolute;
        right:0;
        top:0;
    }
    .experience_list{
        height:4rem /* 64/16 */;
		border-bottom:1px solid #DCDBE2;
        display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
        justify-content: space-between;
        position:relative;
    }

    .experience{
        border-top:1px solid #DCDBE2;
        background:rgba(255,255,255,0.9);
        
    }
    .experience_list dl{
         display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
        margin:0;
        padding:0 1.125rem /* 18/16 */;
    }
    .experience_list dl dt img{
        width:1.5625rem /* 25/16 */;
        height:1.5625rem /* 25/16 */;
        margin-top:.9375rem /* 15/16 */
    }
    .experience_list dl dd{
        margin:.875rem /* 14/16 */ .875rem /* 14/16 */  0
    }
    .experience_list dd p{
        font-size:.875rem /* 14/16 */;
        margin:0;
    }
    .experience_list dd span{
        display:block;
        margin:0;
        font-size:.75rem /* 12/16 */;
        color:#D9D9D9;
    }
    .experience_list dd span b{
        color:#4171AE;
        margin-right:.3125rem /* 5/16 */;
    }
    .experience_btn {
       
    }
    .experience_btn button{
        width:3.5rem /* 56/16 */;
		height:1.4375rem /* 23/16 */;
        line-height: 1;
        border-radius:8px;
        margin:1.25rem /* 20/16 */ .875rem /* 14/16 */ 0 0;
         color:#fff;
         font-size: .75rem /* 12/16 */;
         border:none;
    }
    .to_complete{
        background-color:#4C89CD;
    }
    .completed{
        display:none;
        background-color:#D9D9D9;
    }

</style>