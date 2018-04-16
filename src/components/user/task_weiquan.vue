
 
 <template>
 <!-- 评价模块 -->
    <div class="taskeweiquan">
		<mt-popup  v-model="show"  position="bottom" :closeOnClickModal="true" >
           <div class="bigbox">
               <div class="header">内容
                   <img src="../../../statics/imgs/renwudating_41.png" @click="hidePicker">
               </div>
               
                <div class="con">
                    <textarea name="" placeholder="详细情况（选填150字以内）" maxlength='150' v-model="comment"></textarea>
                </div>
                <up-img @getlist="list"></up-img>
                <button @click="get">提交</button>
                 
           </div>
          
        </mt-popup>	
	</div>
	
  
</template>

<script>
import { Toast } from 'mint-ui';
import common from '../../kits/common.js';
import { Indicator } from 'mint-ui';//加载动画
import UpImg from './upimg.vue';
    export default{
  
         name:'taskeweiquan',
         props: {
           isweiquan: Boolean,
         },
          components: {
				   UpImg,
   	    },
        data(){
           return {
               show:false,
               comment:'',
               image:[] 
           }
        },
        watch:{
            image(val){
//                console.log(val)
            }
        },
        methods:{
            list(list){
                this.image = list
 //               console.log(this.image)
            },
            hidePicker() { // 取消选择
               this.$emit('hide-picker', false);
            },
            get(){
                
                let token =window.localStorage.getItem('token');
				var url = common.apimain + '/api/work/deliveryRight';
				var json = {
					 token:token,
                     task_id:this.$route.params.id,
                     desc:this.comment,
                     image:this.image,
				}
				var that = this;
//                console.log(json)
                this.show = false;
			    Indicator.open();
			    that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
					var body = res.body;
//					console.log(body)
					if(body.code == 1000){
						Indicator.close();
                        Toast(body.message)

					}else{
                        Indicator.close();
						Toast(body.message)
					}
				},function(){
					//console.log('失败了');
					Indicator.close();
					Toast('网络连接超时，请检查后再试');
				});
            }
        },
        watch: {
          
          isweiquan(old, val) {
            this.show = !val
           },    
        }
    }
</script> 

<style scoped>
    .mint-popup{
        width: 100%;
        height: 53%;
    }
    .bigbox{
        width: 100%;
        height: 100%;
    }
    .header{
        width: 100%;
        height: 3.125rem /* 50/16 */;
        border-bottom: 1px solid #f3f3f3;
        font-size: 1rem /* 16/16 */;
        font-weight: 500;
        line-height: 3.125rem /* 50/16 */;
        text-align: center;
        letter-spacing:5px;
        padding: 0 .625rem /* 10/16 */;
    }
    .header img{
        width: 1.25rem /* 20/16 */;
        height:1.25rem /* 20/16 */;
        float: left;
        margin-top: .9375rem /* 15/16 */;
    }
    /* 星星评价 */
    .quality{
        float: left;
        font-size: 16px;
        height: 1.6875rem /* 27/16 */;
        line-height: 1.6875rem /* 27/16 */;
        width: 30%;
        text-align: center;
    }
    .speed{
        float: left;
        font-size: 16px;
        height: 1.6875rem /* 27/16 */;
        line-height: 1.6875rem /* 27/16 */;
        width: 30%;
        text-align: center;
    }
    .service{
        float: left;
        font-size: 16px;
        height: 1.6875rem /* 27/16 */;
        line-height: 1.6875rem /* 27/16 */;
        width: 30%;
        text-align: center;
    }
    .qualitybox,.servicebox,.speedbox{
        width: 90%;
        margin: .625rem /* 10/16 */ auto;
        height: 1.6875rem /* 27/16 */;
    }
    .qualityall{
        width: 70%;
        float: right;
    }
    .qualityall>input{opacity:0;position:absolute;width:2em;height:2em;margin:0;}
    .qualityall>input:nth-of-type(1),
    .qualityall>span:nth-of-type(1){display:none;}
    .qualityall>span{font-size:2em;color:gold;
        -webkit-transition:color .2s;
        transition:color .2s;
        margin: 0  5px;
    }
    .qualityall>input:checked~span{color:#666;}
    .qualityall>input:checked+span{color:gold;}

    .speedall{
        width: 70%;
        float: right;
    }
    .speedall>input{opacity:0;position:absolute;width:2em;height:2em;margin:0;}
    .speedall>input:nth-of-type(1),
    .speedall>span:nth-of-type(1){display:none;}
    .speedall>span{font-size:2em;color:gold;
        -webkit-transition:color .2s;
        transition:color .2s;
        margin: 0  5px;
    }
    .speedall>input:checked~span{color:#666;}
    .speedall>input:checked+span{color:gold;}

     .serviceall{
        width: 70%;
        float: right;
    }
    .serviceall>input{opacity:0;position:absolute;width:2em;height:2em;margin:0;}
    .serviceall>input:nth-of-type(1),
    .serviceall>span:nth-of-type(1){display:none;}
    .serviceall>span{font-size:2em;color:gold;
        -webkit-transition:color .2s;
        transition:color .2s;
        margin: 0  5px;
    }
    .serviceall>input:checked~span{color:#666;}
    .serviceall>input:checked+span{color:gold;}

    /* 输入框 */
    .con{
        width: 80%;
        height: 6.25rem /* 100/16 */;
        margin: 0 auto;
    }
    .con textarea{
        width: 100%;
        height: 6.25rem /* 100/16 */;
        font-size: .9375rem /* 15/16 */;
        
    }
    .bigbox button{
        width: 70%;
        height: 3.125rem /* 50/16 */;
        color: #fff;
        background-color: #4171AE;
        font-weight: 500;
        font-size: 1rem /* 16/16 */;
        margin-left: 15%;
        margin-top: .9375rem /* 15/16 */;
    }
</style>