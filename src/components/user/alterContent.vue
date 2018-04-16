<template>
	<div id="tmpld" ref="tmpld">
			<com-header :title="title"></com-header>
			
			<section>
				<div class="modifyName">
                    <input id="nickname" class="inputname"  maxlength="11" name="nickname" :value="nickname" />
                    <div style="padding: 0 5%;" @click="saveName()">
                        <span  id="save" class="btn">保存</span>
                    </div>
                    <div style="padding: 0 5%;" @click="cancleName()">
                        <router-link  to="/user/usermod" id="cancle" class="btn">取消</router-link>
                    </div>
                </div>
			</section>
	</div>
	
</template>

<script>
	import comHeader from '../../kits/comheader';
	import { Cell } from 'mint-ui';
	export default{
		data(){
			return{
				title:'修改昵称',
				nickname:'',
			}
		},
		components:{
			comHeader, 
		},
        props:['nickname'],
		methods:{
			saveName () { 
				this.$emit("saveName",this.nickname,"this nickname from child");
            },
            cancleName () {
                 this.$router.push({path:'/user/usermod'})
            },
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
    .modifyName input{
        width:100%;
        margin:10px 0;
        height:2.5rem /* 40/16 */;
        border:none;
    }
    .btn{
        display:block;
        width:60%;
        height:1.875rem /* 30/16 */;
        line-height:1.875rem /* 30/16 */;
        text-align:center;
        margin:10px auto;
        background:red;
    }
	.no_content{
		text-align:center;
		font-size:1.125rem /* 18/16 */;
		margin-top:60%;
		color:red;
	}

</style>