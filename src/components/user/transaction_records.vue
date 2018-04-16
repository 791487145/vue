<template>
	<div id="tmpld">
		<com-header :title="title"></com-header>
		<p class="head_records" >
			<span @click="handleMoneyRecord" ref="active01" class="active">充值记录</span>
			<span  @click="handlePayRecord" ref="active02">消费记录</span>
			<span  @click="handstiffLog" ref="active03">提现记录</span>
		</p>
		<div class="cont">
			<ul>
				<li v-for="item in list">
					<span class="money">{{item.action_name}}</span>
					<span class="time">{{item.created_at}}</span>
					<span class="price">￥{{item.cash}}</span>
					<span class="code">订单编号 :{{item.code}}</span>
				</li>
			</ul>
		</div>
		<div class="footer">
			<button class="divcss" @click="more">点击加载更多</button>
		</div>
	</div>
</template>

<script>
	import "../../kits/jquery.min.js"
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import common from '../../kits/common.js'; //api
	import comheader from '../../kits/comheader.vue'
	export default {
		props: {
		},
		data() {
			return {
				title: '交易记录',
				isActive:true,
				limit:'8',
				pageNum:'1',
				list:[],
				urltype:'/api/setting/rechargeList',//充值记录(默认) 消费记录接口地址
			}
		},

		components: {
			ComHeader:comheader
		},
		computed: {

		},
		created() {

		},
		methods: {
			handstiffLog(){
				this.pageNum = '1';
				this.urltype = '/fincial/stiffLog';
				this.$refs.active03.className="active";
				this.$refs.active02.className="";
				this.$refs.active01.className="";

			},
    		handleMoneyRecord() {
				this.pageNum = '1';
				this.urltype = '/api/setting/rechargeList';
				this.$refs.active01.className="active";
				this.$refs.active02.className="";
				this.$refs.active03.className="";
				
    		},
    		handlePayRecord() {
				this.pageNum = '1';
				this.urltype = '/api/setting/consumeList';
				this.$refs.active02.className="active";
				this.$refs.active01.className="";
				this.$refs.active03.className="";
				
			},
			more(){
				this.pageNum++;
			},
			getlist(){
				let that = this;
				let token =window.localStorage.getItem('token');
				var url = common.apimain + that.urltype;
 				var json = {
					token:token,
					limit:that.limit,
					pageNum:that.pageNum
				}
				//console.log(json)
        	    that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then((response) => {
					var body = response.body;
					//console.log(body)
					if(body.code==1000){
						var data = body.data;
						that.list = data;
						console.log(that.list)

					}else if(body.code==2000){
						//Toast(body.message)
						Toast({message: body.message,position: 'bottom',duration: 800});
					}
	
        	    }, (response) => {
//        	            console.log('网络连接错误，请稍后重试');
        	    });
			},
		},

		mounted() {
			this.getlist();
		},
		watch:{
			pageNum(newval){
//				console.log(newval)
				var that  = this;
				let token =window.localStorage.getItem('token');
				var url = common.apimain + '/api/setting/rechargeList';
 				var json = {
					token:token,
					limit:that.limit,
					pageNum:that.pageNum
				}
				//console.log(json)
    	        that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then((response) => {
					var body = response.body;
					//console.log(body.data)
					if(body.code==1000){
						var arr = body.data;
					
							for(var i=0;i<arr.length;i++){
								let obj = {};
								//console.log(arr[i])
								obj['action']= arr[i].action;
								obj['action_name']= arr[i].action_name;
								obj['cash']= arr[i].cash;
								obj['created_at']= arr[i].created_at;
								obj['id']= arr[i].id;						
								that.list.push(obj);
								//console.log(obj)
								return;
							}
						
					}else if(body.code==2000){
						Toast({message: body.message,position: 'bottom',duration: 800});
					}

    	        }, (response) => {
    	                console.log('网络连接错误，请稍后重试');
    	        });
			},
			urltype(){
				this.list = [];
				this.getlist()
			}
		}
	}
</script>

<style scoped>

	.head_records {
		height:2.56rem;
		background: #fff;
		width: 100%;
		margin-top: 3.125rem;
		line-height: 2.56rem;
		font-size: 1rem;
		display: flex;
		justify-content: space-around;
		
	}
	.active {
		border-bottom: 3px solid #e3e3e3;
	}
	.cont {
		width: 100%;
		border-top: 1px solid #f0f0f0;
		background-color: #fff;
		padding-bottom: 3.125rem /* 50/16 */;
	}
	.cont li{
		width: 100%;
		height: 6.25rem /* 100/16 */;
		border-top:1px solid #f8f8f8;
		padding: .625rem /* 10/16 */;
		position: relative;
	}
	.cont li:last-child{
		border-bottom: 1px solid #f8f8f8;
	}
	.cont .money{
		margin: 10px;
		display: block;
		width: 50%;
		overflow: hidden;
		font-size: 1rem /* 16/16 */;
		color: #367aed;
	}
	.cont .time{
		margin: 10px;
		font-size: .875rem /* 14/16 */;
		color: #9e9e9e;
	}
    .cont .price{
		font-size: 16px;
		color: #367aed;
		position: absolute;
		top:2rem /* 32/16 */;
		right: 1.25rem /* 20/16 */;
	}
	.cont li .code{
		width: 100%;
		text-align: right;
		font-size: .875rem /* 14/16 */;
		font-weight: 500;
		color: #9e9e9e;
		position: absolute;
		bottom: 0px;
		display: block;
		padding-right: 20px;
	}
	.footer{
		width: 100%;
		max-width: 40rem /* 640/16 */;
		min-width: 20rem /* 320/16 */;
		height: 3.125rem /* 50/16 */;
		position: fixed;
		bottom: 0;
	}
	.footer button{
		width: 100%;
		height: 3.125rem /* 50/16 */;
	}
</style>