<template>
	<div>
		<div class="footer_back" ref="footer_background">
			<ul class="footer_box" >
				<router-link to="/home">
					<li class="footer_boxs" ref="handleClickOne">
						<img id='0' :src="footerUrl+'/'+this.footer0" class="footer_boxs_pic" ref="handleChangeImg"/>
						<!--<p class="iconfont icon-home1" ref="handleChangeImg"></p>-->
						
						<span class="footer_font" ref="footerColorOne">{{name}}</span>
					</li>
				</router-link>
				<router-link to="/mission">
					<li class="footer_boxs" ref="handleClickTwo">
						<img id='1' :src="footerUrl+'/'+this.footer1" class="footer_boxs_pic" ref="handleChangeImgTwo"/>
						
						<span class="footer_font" ref="footerColorTwo">{{task}}</span>
					</li>
				</router-link>
					<li class="footer_boxs">
						<img src="../../../statics/imgs/SJLM_tabbar_icon_add.png" class="footer_boxs_pics"/>
					</li>
				<router-link to="/message/action" ref="handleClickThree">
					<li class="footer_boxs">
						<img id='2' :src="footerUrl+'/'+this.footer2" class="footer_boxs_pic" ref="handleChangeImgThree"/>
						
						<span class="footer_font" ref="footerColorThree">{{message_center}}</span>
					</li>
				</router-link>
				<router-link to="/user">
					<li class="footer_boxs" ref="handleClickFour">
						<img id='3' :src="footerUrl+'/'+this.footer3" class="footer_boxs_pic" ref="handleChangeImgFour"/>
						
						<span class="footer_font" ref="footerColorFour">{{person_center}}</span>
					</li>
				</router-link>
			</ul>
		</div>	
	</div>
</template>

<script>
	import common from '../../kits/common.js';//api
	import { Toast } from "mint-ui";
	export default {
		data() {
			return {
				flug:true,
				show:true,
				footer:[],
				footers:[],
				name:'',
				task:'',
				footer0:'',
				footer1:'',
				footer2:'',
				footer3:'',
				footer0s:'',
				footer1s:'',
				footer2s:'',
				footer3s:'',
				message_center:'',
				person_center:'',
				footerUrl:common.apimain,
				
			}
			
		},
		
		methods: {
			isTab() {
				if(this.$route.path==='/home') {
					 setTimeout( ()=> {
							this.$refs.handleChangeImg.src = this.footerUrl+'/'+this.footer0s;
					 },0 ) 
					this.$refs.handleChangeImg.src = this.footerUrl+'/'+this.footer0s;
					this.$refs.handleChangeImgTwo.src = this.footerUrl+'/'+this.footer1;
					this.$refs.handleChangeImgThree.src = this.footerUrl+'/'+this.footer2;
					this.$refs.handleChangeImgFour.src = this.footerUrl+'/'+this.footer3;		
				}
				else if(this.$route.path==='/mission') {
					setTimeout( ()=> {
							this.$refs.handleChangeImgTwo.src = this.footerUrl+'/'+this.footer1s;
					       },0 ) 
					//this.$refs.handleChangeImgTwo.src = this.footerUrl+'/'+this.footer1s;
					this.$refs.handleChangeImg.src = this.footerUrl+'/'+this.footer0;
					this.$refs.handleChangeImgThree.src = this.footerUrl+'/'+this.footer2;
					this.$refs.handleChangeImgFour.src = this.footerUrl+'/'+this.footer3;
					
				}else if(this.$route.path==='/message/action' )  {
					setTimeout( ()=> {
							this.$refs.handleChangeImgThree.src = this.footerUrl+'/'+this.footer2s;
					       },0 ) 
					//this.$refs.handleChangeImgThree.src = this.footerUrl+'/'+this.footer2s;
					this.$refs.handleChangeImgTwo.src = this.footerUrl+'/'+this.footer1;
					this.$refs.handleChangeImg.src = this.footerUrl+'/'+this.footer0;
					this.$refs.handleChangeImgFour.src = this.footerUrl+'/'+this.footer3;
					
				}else if(this.$route.path==='/user') {
					setTimeout( ()=> {
							this.$refs.handleChangeImgFour.src = this.footerUrl+'/'+this.footer3s;
					       },0 ) 
					//this.$refs.handleChangeImgFour.src = this.footerUrl+'/'+this.footer3s;
					this.$refs.handleChangeImg.src = this.footerUrl+'/'+this.footer0;
					this.$refs.handleChangeImgTwo.src = this.footerUrl+'/'+this.footer1;
					this.$refs.handleChangeImgThree.src = this.footerUrl+'/'+this.footer2;
					
				}
			},
		},
		
		mounted() {
				var _this=this; 
				let token = window.localStorage.getItem('token');
				var url = common.apimain + '/api/function?token='+token;
				_this.$http.get(url,{timeout:5000}).then(res=>{	
					//console.log(res.data)
					if(res.data.code==1000){
						_this.$refs.footer_background.style.background = res.data.data.background;
						//console.log(_this.$refs.footer_background.style.borderTop)
						_this.$refs.footer_background.style.borderTop = "1px solid"+ res.data.data.line;
						_this.$refs.footerColorOne.style.color =res.data.data.word;
						_this.$refs.footerColorTwo.style.color =res.data.data.word;
						_this.$refs.footerColorThree.style.color =res.data.data.word;
						_this.$refs.footerColorFour.style.color =res.data.data.word;
						_this.footer0 = window.localStorage.footer0 || res.data.data.menu[0].img;
						//console.log(_this.footer0)
						window.localStorage.footer0 = res.data.data.menu[0].img;
						
						_this.footer1 = window.localStorage.footer1 || res.data.data.menu[1].img;
						window.localStorage.footer1 = res.data.data.menu[1].img;
						
						_this.footer2 = window.localStorage.footer2 || res.data.data.menu[2].img;
						window.localStorage.footer2 = res.data.data.menu[2].img;
						
						_this.footer3 = window.localStorage.footer3 || res.data.data.menu[3].img;
						window.localStorage.footer3 = res.data.data.menu[3].img;
						
						_this.footer0s = window.localStorage.footer0s || res.data.data.menu[0].selected;
						window.localStorage.footer0s = res.data.data.menu[0].selected;
						
						_this.footer1s = window.localStorage.footer1s || res.data.data.menu[1].selected;
						window.localStorage.footer1s = res.data.data.menu[1].selected;
						
						_this.footer2s = window.localStorage.footer2s || res.data.data.menu[2].selected;
						window.localStorage.footer2s = res.data.data.menu[2].selected;
						
						_this.footer3s = window.localStorage.footer3s || res.data.data.menu[3].selected;
						window.localStorage.footer3s = res.data.data.menu[3].selected;
						
						_this.name = res.data.data.menu[0].name;
						_this.task = res.data.data.menu[1].name;
						_this.message_center = res.data.data.menu[2].name;
						_this.person_center = res.data.data.menu[3].name;
						if(this.$route.path==='/message/rank' || this.$route.path==='/message/schoolzp' )  {
					       setTimeout( ()=> {
							this.$refs.handleChangeImgThree.src = this.footerUrl+'/'+this.footer2s;
					       },0 ) 
							this.$refs.handleChangeImgTwo.src = this.footerUrl+'/'+this.footer1;
							this.$refs.handleChangeImg.src = this.footerUrl+'/'+this.footer0;
							this.$refs.handleChangeImgFour.src = this.footerUrl+'/'+this.footer3;
					
						}
						if(this.$route.path==='/home') {
					 setTimeout( ()=> {
							this.$refs.handleChangeImg.src = this.footerUrl+'/'+this.footer0s;
					       },0 ) 
					this.$refs.handleChangeImgTwo.src = this.footerUrl+'/'+this.footer1;
					this.$refs.handleChangeImgThree.src = this.footerUrl+'/'+this.footer2;
					this.$refs.handleChangeImgFour.src = this.footerUrl+'/'+this.footer3;
					
				}else if(this.$route.path==='/mission') {
					setTimeout( ()=> {
							this.$refs.handleChangeImgTwo.src = this.footerUrl+'/'+this.footer1s;
					       },0 ) 
					this.$refs.handleChangeImg.src = this.footerUrl+'/'+this.footer0;
					this.$refs.handleChangeImgThree.src = this.footerUrl+'/'+this.footer2;
					this.$refs.handleChangeImgFour.src = this.footerUrl+'/'+this.footer3;
					
				}else if(this.$route.path==='/message/action' )  {
					setTimeout( ()=> {
							this.$refs.handleChangeImgThree.src = this.footerUrl+'/'+this.footer2s;
					       },0 ) 
					this.$refs.handleChangeImgTwo.src = this.footerUrl+'/'+this.footer1;
					this.$refs.handleChangeImg.src = this.footerUrl+'/'+this.footer0;
					this.$refs.handleChangeImgFour.src = this.footerUrl+'/'+this.footer3;
					
				}else if(this.$route.path==='/user') {
					setTimeout( ()=> {
							this.$refs.handleChangeImgFour.src = this.footerUrl+'/'+this.footer3s;
					       },0 ) 
					this.$refs.handleChangeImg.src = this.footerUrl+'/'+this.footer0;
					this.$refs.handleChangeImgTwo.src = this.footerUrl+'/'+this.footer1;
					this.$refs.handleChangeImgThree.src = this.footerUrl+'/'+this.footer2;
					
				}
					}else if(res.data.code==1013){
							
							Toast({
								message: '登录过期',
								duration: 1000
							});
							
					}else{
							
							Toast({
								message: res.message,
								duration: 1000
							});
							_this.$refs.footer_background.style.display = none;
					}				
					
				},function(){
					Toast('网络连接错误');
					
				});
		
		},
		watch: {
			 '$route':'isTab'
		}
	}
	
	
</script>

<style scoped>
	a {
		text-decoration: none;
		/*color:#929292;*/
	}
	.footer_back {
		height:4rem;
		padding-bottom: 0/* 5/16 */;
    	z-index: 100;
    	min-width: 20rem/* 320/16 */;
    	max-width: 40rem/* 640/16 */;
   		margin: 0 auto;
   		position: fixed;
   		bottom:0;
   		width: 100%;
   		right:0;
   		left: 0;
	}
	.footer_box {
		display: flex;
   	 	padding-top: 0.6rem;
    	padding-bottom: 0.04rem;
    	justify-content: space-around;
	}
	.footer_boxs {
		display: flex;
    	flex-direction: column;
    	align-items: center;
	}
	.footer_boxs_pics {
		width:3rem;
		height:3rem;
	}
	.footer_boxs_pic {
		width:1.09375rem;
		height:1.28125rem;
	}
	.footer_font {
		font-size: 12px;
		padding-top: 0.3rem;
		font-weight: 500;
	}
</style>