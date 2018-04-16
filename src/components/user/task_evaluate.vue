<<<<<<< .mine

 
 <template>
 <!-- 评价模块 -->
    <div class="taskevaluate">
		<mt-popup  v-model="show"  position="bottom" :closeOnClickModal="true" >
           <div class="bigbox">
               <div class="header">评价
                   <img src="../../../statics/imgs/renwudating_41.png" @click="hidePicker">
               </div>
                <div class="speedbox">
                    <div class="speed">完成速度</div>
                     <p class="speedall" >
                        <input type="radio" name="a" value="0"  v-model="speed"/>
                        <span>★</span>
                        <input type="radio" name="a" value="1" v-model="speed" />
                        <span>★</span>
                        <input type="radio" name="a" value="2" v-model="speed" />
                        <span>★</span>
                        <input type="radio" name="a" value="3" v-model="speed" />
                        <span>★</span>
                        <input type="radio" name="a" value="4" v-model="speed" />
                        <span>★</span>
                        <input type="radio" name="a" value="5" v-model="speed" />
                        <span>★</span>
                    </p>
                </div>  
                <div class="qualitybox">
                    <div class="quality">完成质量</div>
                     <p class="qualityall" >
                        <input type="radio" name="b" value="0"  v-model="quality"/>
                        <span>★</span>
                        <input type="radio" name="b" value="1" v-model="quality" />
                        <span>★</span>
                        <input type="radio" name="b" value="2" v-model="quality" />
                        <span>★</span>
                        <input type="radio" name="b" value="3" v-model="quality" />
                        <span>★</span>
                        <input type="radio" name="b" value="4" v-model="quality" />
                        <span>★</span>
                        <input type="radio" name="b" value="5" v-model="quality" />
                        <span>★</span>
                    </p>
                </div> 
                <div class="servicebox">
                    <div class="service">服务态度</div>
                     <p class="serviceall" >
                        <input type="radio" name="c" value="0"  v-model="service"/>
                        <span>★</span>
                        <input type="radio" name="c" value="1" v-model="service" />
                        <span>★</span>
                        <input type="radio" name="c" value="2" v-model="service" />
                        <span>★</span>
                        <input type="radio" name="c" value="3" v-model="service" />
                        <span>★</span>
                        <input type="radio" name="c" value="4" v-model="service" />
                        <span>★</span>
                        <input type="radio" name="c" value="5" v-model="service" />
                        <span>★</span>
                    </p>
                </div> 
                <div class="con">
                    <textarea name="" placeholder="请输入您的评价（选填50字以内）" maxlength='50' v-model="comment"></textarea>
                </div>
                <button @click="get">提交评价</button>
           </div>
        </mt-popup>	
	</div>
	
  
</template>

<script>
import { Toast } from 'mint-ui';
import common from '../../kits/common.js';
import { Indicator } from 'mint-ui';//加载动画
    export default{
  
         name:'taskevaluate',
         props: {
           isshow: Boolean,
         },
        data(){
           return {
               quality:'5', //质量评分
               service:'5', //服务评分
               speed:'5', //速度评分
               show:false,
               comment:'',
           }
        },
        methods:{
            hidePicker() { // 取消选择
               this.$emit('hide-picker', false);
            },
            get(){
                
                let token =window.localStorage.getItem('token');
				var url = common.apimain + '/api/work/evaluate';
				var json = {
					 token:token,
                     task_id:this.$route.params.id,
                     comment:this.comment,
                     speed_score:this.speed,
                     quality_score:this.quality,
                     attitude_score:this.service,
				}
				var that = this;
                //console.log(json)
                this.show = false;
			    Indicator.open();
			    that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then(function(res){
					var body = res.body;
					//console.log(body)
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
            // speed(value) {
            //     console.log(value)
            // },
            //  quality(value) {
            //     console.log(value)
            // },
            //  service(value) {
            //     console.log(value)
            // },
          isshow(old, val) {
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
</style>||||||| .r0
=======

 
 <template>
 <!-- 评价模块 -->
    <div class="taskevaluate">
		<mt-popup  v-model="show"  position="bottom" :closeOnClickModal="true" >
           <div class="bigbox">
               <div class="header">评价
                   <img src="../../../statics/imgs/renwudating_41.png" @click="hidePicker">
               </div>
                <div class="speedbox">
                    <div class="speed">完成速度</div>
                     <p class="speedall" >
                        <input type="radio" name="a" value="0"  v-model="speed"/>
                        <span>★</span>
                        <input type="radio" name="a" value="1" v-model="speed" />
                        <span>★</span>
                        <input type="radio" name="a" value="2" v-model="speed" />
                        <span>★</span>
                        <input type="radio" name="a" value="3" v-model="speed" />
                        <span>★</span>
                        <input type="radio" name="a" value="4" v-model="speed" />
                        <span>★</span>
                        <input type="radio" name="a" value="5" v-model="speed" />
                        <span>★</span>
                    </p>
                </div>  
                <div class="qualitybox">
                    <div class="quality">完成质量</div>
                     <p class="qualityall" >
                        <input type="radio" name="b" value="0"  v-model="quality"/>
                        <span>★</span>
                        <input type="radio" name="b" value="1" v-model="quality" />
                        <span>★</span>
                        <input type="radio" name="b" value="2" v-model="quality" />
                        <span>★</span>
                        <input type="radio" name="b" value="3" v-model="quality" />
                        <span>★</span>
                        <input type="radio" name="b" value="4" v-model="quality" />
                        <span>★</span>
                        <input type="radio" name="b" value="5" v-model="quality" />
                        <span>★</span>
                    </p>
                </div> 
                <div class="servicebox">
                    <div class="service">服务态度</div>
                     <p class="serviceall" >
                        <input type="radio" name="c" value="0"  v-model="service"/>
                        <span>★</span>
                        <input type="radio" name="c" value="1" v-model="service" />
                        <span>★</span>
                        <input type="radio" name="c" value="2" v-model="service" />
                        <span>★</span>
                        <input type="radio" name="c" value="3" v-model="service" />
                        <span>★</span>
                        <input type="radio" name="c" value="4" v-model="service" />
                        <span>★</span>
                        <input type="radio" name="c" value="5" v-model="service" />
                        <span>★</span>
                    </p>
                </div> 
                <div class="con">
                    <textarea name="" placeholder="请输入您的评价（选填50字以内）" maxlength='50' v-model="comment"></textarea>
                </div>
                <button @click="get">提交评价</button>
           </div>
        </mt-popup>	
	</div>
	
  
</template>

<script>
import { Toast } from 'mint-ui';
import common from '../../kits/common.js';
import { Indicator } from 'mint-ui';//加载动画
    export default{
  
         name:'taskevaluate',
         props: {
           isshow: Boolean,
         },
        data(){
           return {
               quality:'5', //质量评分
               service:'5', //服务评分
               speed:'5', //速度评分
               show:false,
               comment:'',
           }
        },
        methods:{
            hidePicker() { // 取消选择
               this.$emit('hide-picker', false);
            },
            get(){
                
                let token =window.localStorage.getItem('token');
				var url = common.apimain + '/api/work/evaluate';
				var json = {
					 token:token,
                     task_id:this.$route.params.id,
                     comment:this.comment,
                     speed_score:this.speed,
                     quality_score:this.quality,
                     attitude_score:this.service,
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
            // speed(value) {
            //     console.log(value)
            // },
            //  quality(value) {
            //     console.log(value)
            // },
            //  service(value) {
            //     console.log(value)
            // },
          isshow(old, val) {
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
</style>>>>>>>> .r139
