<template>
	<div id="tmpld"  ref="tmpld">
		<div class="top">
			<com-header :title="title"></com-header>
		
				<section class="employer_top">
					<dl class="hustsman_top divcss">
						<dt><img :src="hustsman_image+'/'+this.hunter_grade_logo" alt=""></dt>
						<dd>
							<p><span class="nickname">{{nickname}}</span><span class="dengji divcss">LV{{hunter_grade}}</span></p>
							<p class="empvalue"> 活跃度：
							<span>{{hunt_value || '0'}}/{{hunt_value || "0"}}</span>
						</p>
						</dd>
					</dl>
					<div class="hustsman_center">
						<dl>
							<dt><img src="../../../statics/imgs/PERSONNAL-CENTRAL_49.png" alt=""></dt>
							<dd>
								<p>我的排名</p>
								<span>{{ranking || "未上榜"}}</span>
							</dd>
						</dl>
						<dl>
							<dt><img src="../../../statics/imgs/PERSONNAL-CENTRAL_47.png" alt=""></dt>
							<dd>
								<p>任务赏金</p>
								<span class="money">{{moneyreward || '0.00'}}元</span>
							</dd>
						</dl>
					</div>
				
			</section>	
		</div>		 
			<section class="employer_list">
				<p class="list_top"><img src="../../../statics/imgs/PERSONNAL-CENTRAL_54.png" alt=""><span>已接任务</span></p>
				<ul class="iossued">
					<li class="iossued_list"  v-for="item in list" >
						<p class="iossued_list_top">
							<span>{{item.title}}</span>
							<span id="sss" class="state_style" v-if="item.status">
								{{item.state}}
							</span>
						</p>
						<p class="iossued_list_time">
							<img src="../../../statics/imgs/renwudating_36.png"/>
							<span id="">
								{{item.created_at}}
							</span>
						</p>
					</li>
				</ul>	
				<div class="no_content" v-if="no">
					还没有接受任务哦
				</div>		
			</section>
		 
		
	</div>
	
</template>

<script>

	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import common from '../../kits/common.js';//api
	import comHeader from '../../kits/comheader';
	export default{
		data(){
			return{
				title:"猎人",
				nickname:'fdkjgdbsjfhak',
				hunter_grade:'0',
				hunt_value: null,
				ranking:null,
				moneyreward:null,
				list:[],
				token:'',
				no:false,
				hustsman_image:common.apimain,
				hunter_grade_logo:'',
				
			}
		},
		components:{
			"com-header":comHeader,
		},

		computed:{
			
		},
		methods:{
            toback:function(){
//                console.log(this.title)
                this.$router.push({path:'/user'})
            },
            particular(){
				// this.$router.push({path:'/user/my_wallet/withdraw/withdraw_succeed'})
            },
          
		},
		mounted(){
			
			var _this=this;
			let token = window.localStorage.getItem('token');
			//console.log(token)
			var url = common.apimain + '/api/user/getUserInfo?token='+token;
			Indicator.open();
			_this.$http.get(url).then(res=>{
                //console.log(res.data);
                //console.log("------************-------------");
				if(res.data.code == 1000){
					Indicator.close();
					_this.nickname=res.data.data.nickname;
					_this.hunter_grade=res.data.data.hunter_grade;
					_this.hunt_value=res.data.data.hunt_value;
					_this.hunter_grade_logo=res.data.data.hunter_grade_logo;
				}else{
					Indicator.close();
				}
				
              
            },function(){
				//console.log('失败了');
				Indicator.close();
				Toast('网络连接错误');
			});
			
			let sss=document.getElementById("sss");
			let page=1;
			let per_page=1;
			var url = common.apimain + '/api/myTask/myAccept?token='+token+'&page='+page+'&per_page='+per_page;
			// console.log(token)
			// console.log(per_page)
			// console.log(page)	
			Indicator.open();	
			_this.$http.get(url).then(res=>{
                //console.log("------************-------------")
                //console.log(res.data);
                //console.log("------************-------------");
				
				if(res.data.code == 1000){
					Indicator.close();
					Toast({
						message: '加载完成',
						duration: 1000
					});
					_this.list=res.data.data.list;
//					console.log(_this.list)
					
				}else if(res.data.code == 2000){
					Indicator.close();
					Toast({
						message: '暂无数据',
						duration: 1000
					});
					_this.no=true
				}else{
					Indicator.close();
					Toast({
						message: res.data.message,
						duration: 1000
					});
				}
            },function(){
				//console.log('失败了');
				Indicator.close();
				Toast('网络连接错误');
			});

			this.$refs.tmpld.style.height = document.documentElement.clientHeight+"px";
		}
	}
</script>

<style scoped>
.top{
	width: 100%;
	background:url(../../../statics/imgs/PERSONNAL-CENTRAL_38.png) no-repeat top left scroll;
	background-size:cover;
	background-color: #5B97D4;
}
	.header{
        height: 3.125rem /* 50/16 */;
        width: 100%;

         display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
    }

    .header>img{
        width: 100%;
        width: 1rem /* 16/16 */;
        height: 3.125rem /* 50/16 */;
        float: left;
        margin:0 .875rem /* 14/16 */;
        padding: .8125rem /* 13/16 */ 0;
        z-index: 110;
    }
    .content{
        width: 70%;
        height: 3.125rem /* 50/16 */;
        color: #fff;
        font-size: 1rem /* 16/16 */;
        text-align: center;
        line-height: 3.125rem /* 50/16 */;
       
    }
    .right{
        float: right;
        font-size: .75rem /* 12/16 */;
        color: #fff;
        line-height: 3.125rem /* 50/16 */;
	}
	.right>img{
		width: 100%;
        width: 1.25rem /* 20/16 */;
		height:1.25rem /* 20/16 */;
		margin:-2px 0.875rem /* 14/16 */;

        z-index: 110;
	}

	.main{
		padding-top: 3.125rem /* 50/16 */;
	}
	.hustsman_top{
		width:100%;
		display: -webkit-flex; /* Safari */
  		display: flex;
		padding:.9375rem /* 15/16 */ 10% 1.875rem /* 30/16 */;	
	}
	.empvalue{
		color: #fff;
		margin-top: .3125rem /* 5/16 */;
	}
	.hustsman_top dt img{
		width:2.8125rem /* 50/16 */;
		height:4.0625rem /* 50/16 */;
	}
	.hustsman_top dd{
		margin-left:.9375rem /* 15/16 */;
		margin-top: 0.8rem;
	}
	.nickname{
		font-size:1rem /* 16/16 */;
		color:#fff;
		font-weight: bold;
	}
	.dengji{
		display:inline-block;
		width:2.0625rem /* 33/16 */;
		height:1.25rem /* 20/16 */;
		border-radius:.5rem /* 8/16 */;
		font-size:.625rem /* 10/16 */ /* 12.5/16 */;
		text-align:center;
		margin-left:.3125rem /* 5/16 */;
	}
	.hustsman_center{
		width:100%;
		background: #fff;
		display: -webkit-flex; /* Safari */
  		display: flex;
		border-top: 1px solid #E5E5E5;
		border-bottom: 1px solid #E5E5E5;
	}
	.hustsman_center dl{
		margin:1rem /* 16/16 */ 0 ;
		height:2.0625rem /* 33/16 */;
		width:50%;
		background: #fff;
		display: -webkit-flex; /* Safari */
		  display: flex;
		 
	}
	.hustsman_center dl:first-child{
		border-right: 1px solid #E5E5E5;	
	}
	.hustsman_center dl dt img{
		width: 1.25rem /* 20/16 */;
		height: 1.25rem /* 20/16 */;
		 margin:.625rem /* 10/16 */ .375rem /* 6/16 */ 0 1rem /* 16/16 */;
	}
	.hustsman_center p{
		font-weight: bold;
		font-size:.75rem /* 12/16 */;
	}
	.hustsman_center span{
		display:block;
		font-size:.75rem /* 12/16 */;
		color:#828282;
	}
	.hustsman_center span.money{

		color:#F9AC2A;
	}
	.employer_list{
		width:100%;
		margin-top: 1.125rem /* 18/16 */;
		border-top: 1px solid #E5E5E5;
		position: absolute;
		top:12.5rem;
	}
	.list_top{
		padding-left:.625rem /* 10/16 */;
		height:2.8125rem /* 45/16 */;
		line-height:2.8125rem /* 45/16 */;
		border-bottom: 1px solid #E5E5E5;
		background: #fff;
		display: -webkit-flex; /* Safari */
  		display: flex;
	}
	.list_top img{
		display: block;
		width:1.25rem /* 20/16 */;
		height:1.25rem /* 20/16 */;
		margin-top: .75rem /* 12/16 */;
	}
	.list_top span{
		font-weight: bold;
		margin-left:.3125rem /* 5/16 */;
	}
	.iossued{
		width: 100%;
		height: auto;
		list-style: none;
		margin:0;
		padding:0;
	}
	.iossued{
		width: 100%;
		height: auto;
		list-style: none;
		margin:0;
		padding:0;
	}
	.iossued_list{
		height: 3.875rem /* 62/16 */;
		background: #fff;
		margin-bottom: .3125rem /* 5/16 */;
		border-top: 1px solid #E5E5E5;
		border-bottom: 1px solid #E5E5E5;
		padding:0 .9375rem /* 15/16 */;
		position: relative;
	}
	.iossued_list_top{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
        justify-content: space-between;
		margin: .875rem /* 14/16 */ 0 0;
		font-size:1rem /* 12/16 */;
	}
	.iossued_list_top span{
		display: block;
	}
	.iossued_list_time{
		font-size:12px; 
        -webkit-transform-origin-x: 0;
        -webkit-transform: scale(0.90);
	}
	.iossued_list_time img{
		width:.85rem /* 12/16 */;
		height:.85rem /* 12/16 */;
		margin-right:.375rem /* 6/16 */;
	}
	.iossued_list_time span{
		font-size:12px;
		-webkit-transform:scale(0.8);
		color:#787878;
	}
	.no_content{
		text-align:center;
		font-size:1.125rem /* 18/16 */;
		margin-top:20%;
		color:red;
	}
	.employer_top {
		position: absolute;
		top:2.5rem;
		width: 100%;
	}
</style>