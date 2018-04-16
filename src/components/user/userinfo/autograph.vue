<template>
	<div id="" ref="tmpld">
            <com-header :title="title" :save="save" @show_save="saveName"></com-header>
			<section class="autograph_in">
				<div class="modifyName">
                    <input type="text" id="nickname" placeholder="输入个性签名" v-model="autograph"/>
                </div>
			</section>
	</div>
	
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { Cell } from 'mint-ui';
	import common from '../../../kits/common.js';//api
	import bus from '../../../kits/bus.js';
	import comHeader from '../../../kits/comheader';
	export default{
		data(){
			return{
				title:'个性签名',
				save:'保存',
				autograph:'',
			}
		},
		components:{
			"com-header":comHeader,
		},
		methods:{
			 toback:function(){
 //               console.log(this.title)
                this.$router.go(-1);
			},
			// 更新信息
			saveName () {
				var _this=this; 
				let token = window.localStorage.getItem('token');
				//console.log(token)
				var url = common.apimain + '/api/user/updateSingleInfo';
				var json = {
					token:token,
					method:'3',
					content:this.autograph,
				}
				var _this=this;
				Indicator.open();
				_this.$http.post(url,json,{emulateJSON: true},{timeout:5000}).then(res=>{
//					console.log(res.data);
					var body=res.data.data;
					if(res.data.code==1000){
							Indicator.close();
							 _this.autograph=body.autograph;
							this.$router.push({path:'/user/per_info/usermod'})
							
					}else if(res.data.code==1013){
							Indicator.close();
							Toast({
								message: '登录过期',
								duration: 1000
							});
							this.$router.push({path:'/loginuser'})
					}else{
							Indicator.close();
							Toast({
								message: '加载失败',
								duration: 1000
							});
					}				
					
				},function(){
					//console.log('失败了');
					Indicator.close();
					Toast('网络连接错误');
				});

            },
            cancleName () {
				
                 this.$router.push({path:'/user/per_info/usermod'})
            },
		},
		mounted(){
				// 获取单个信息
				var _this=this;
				let token = window.localStorage.getItem('token');
//				console.log(token)
				var urla = common.apimain + '/api/user/getSingleInfo';
				var json2 = {
					token:token,
					method:'3'
				}
				Indicator.open();
				_this.$http.post(urla,json2,{emulateJSON: true},{timeout:5000}).then(res=>{
//					console.log(res.data);
					var body=res.data.data;
					if(res.data.code==1000){
							Indicator.close();
							_this.autograph=body.autograph;
							
					}else if(res.data.code==1013){
							Indicator.close();
							Toast({
								message: '登录过期',
								duration: 1000
							});
							this.$router.push({path:'/loginuser'})
					}else{
							Indicator.close();
							Toast({
								message: '加载失败',
								duration: 1000
							});
					}				
					
				},function(){
					//console.log('失败了');
					Indicator.close();
					Toast('网络连接错误');
				});
			// this.$refs.tmpld.style.height = document.documentElement.clientHeight+"px";
		}
	}
</script>

<style scoped>
    .header{
        height: 3.125rem /* 50/16 */;   
        width: 100%;
	    background:#5B97D4;
	    background-size:cover;
        display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
    }

    .left{
        font-size: 1rem /* 12/16 */;
        color: #fff;
        line-height: 3.125rem /* 50/16 */;
        float: left;
        margin-left: 1.375rem /* 22/16 */;
        z-index: 110;
    }
    .content{
        width: 70%;
        height: 3.125rem /* 50/16 */;
        color: #fff;
        font-size: 1.2rem /* 16/16 */;
        text-align: center;
        line-height: 3.125rem /* 50/16 */;
       
    }
    .right{
        float: right;
        font-size: 1rem /* 12/16 */;
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
    /* 内容区 */
	section{
		position: absolute;
		top:2.5rem;
		width:100%;
    }
    .modifyName {
    	width:100%;
    }
    .modifyName input{
        width:100%;
        margin:10px 0;
        height:2.5rem /* 40/16 */;
        border:none;
		padding-left: .625rem /* 10/16 */;
		font-size: 1rem;
    }
	.no_content{
		text-align:center;
		font-size:1.125rem /* 18/16 */;
		margin-top:60%;
		color:red;
	}
	#nickname {
		outline: none;
	}
</style>