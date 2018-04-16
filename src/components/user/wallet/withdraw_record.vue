<template>
	<div id="" ref="tmpld">
		<com-header :title="title"></com-header>
        <section class="main">
            <!-- <section class="succeed">	
                <div class="record">
                    <p class="left">
                        <span class="state">{{state}}</span>
                        <span class="time">{{time}}</span>
                    </p>
                    <h3 class="right">+45</h3>
                </div>
                <div class="record">
                    <p class="left">
                        <span class="state">{{state}}</span>
                        <span class="time">{{time}}</span>
                    </p>
                    <h3 class="right">+45</h3>
                </div>
                <div class="record">
                    <p class="left">
                        <span class="state">{{state}}</span>
                        <span class="time">{{time}}</span>
                    </p>
                    <h3 class="right">+45</h3>
                </div>
                <div class="record">
                    <p class="left">
                        <span class="state">{{state}}</span>
                        <span class="time">{{time}}</span>
                    </p>
                    <h3 class="right">+45</h3>
                </div>
            </section>
             <p class="bottom">没有更多提现记录了</p>	 -->
             <div class="no_content" v-if="no">
					您还没有进行提现哦！
			  </div>
        </section>
		
        
	</div>
	
</template>

<script>
	import comHeader from '../../../kits/twoheader';
	export default{
		data(){
			return{
                title:"提现记录",
                state:'处理中',
                time:'2017-10-20',
                no:true,
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
	.main{
		padding-top: 3.125rem /* 50/16 */;
	}
    .succeed{
        background: #fff;
        width: 100%;
        padding: 0 5%;
        border-top:1px solid #DCDBE2;
        border-bottom:1px solid #DCDBE2;
         margin-top: .9375rem /* 15/16 */;
       
    }
    .record{
        display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
        justify-content:space-between;
        padding: 0 5%;
        height: 4rem /* 64/16 */;
        background: #fff;
        border-bottom:1px solid #DCDBE2;
       
    }
    .record:last-child{
        border: none;
    }
    .record span{
        display: block;
        margin: 0
    }
    .left{
        margin-top: 1rem /* 16/16 */;
    }
    .state{
        display: block;
        font-size: .875rem /* 14/16 */;
        color: #1E1F21;
    }
    .time{
        display: block;
        font-size: .75rem /* 12/16 */;
        color: #A5A5A5;
    }
    .right{
        font-weight: 800;
        font-size: 1.125rem /* 18/16 */;
        line-height: 4rem /* 64/16 */;
        color: #FD8413;
    }
    .bottom{
        width: 100%;
        text-align: center;
        color: #DFDDDD;
        font-size: .75rem /* 12/16 */;
        margin-top: .9375rem /* 15/16 */;
    }
	
    .no_content{
		text-align:center;
		font-size:1.125rem /* 18/16 */;
		margin-top:50%;
		color:red;
	}
</style>