 <template>
    <div id="" ref="tmpld">
         <com-header :title="title"></com-header>
        <section class="main">
            <section>
                <router-link to="/user/per_info/usermod">
                    <section class="list_style">
                        <h2>基本信息</h2>
                        <div class="headportrait-div">
                            <img  v-if="userInfo" src="" class="headportrait-div-top">
                        
                        </div>
                    </section>
                </router-link>
                <section class="bottom">
                    <router-link to="/user/per_info/authen_info">
                        <section class="list_style">
                            <h2>认证信息</h2>
                        </section>
                    </router-link>
                    <router-link to="/user/per_info/security_info">
                        <section class="list_style">
                            <h2>安全信息</h2>
                        </section>
                    </router-link>
                    <router-link to="/user/per_info/address">
                        <section class="list_style">
                            <h2>地址</h2>
                        </section>
                    </router-link>
                </section>
                
            </section>
        </section> 
    </div>
</template>

<script>
    import "../../kits/jquery.min.js"
    import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
    import comHeader from '../../kits/comheader';
    import common from '../../kits/common.js';//api
    export default {
        data(){
            return{
                title:'个人信息',
                content:'',    //用户名
                userInfo:''
            }
        },

        components: {
            "com-header":comHeader,
        },
        computed:{
         
        },
        methods: {
            
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
   .bottom{
       margin-top: .625rem /* 10/16 */;
   }
   .list_style,.img_style{
       display: flex;
       justify-content: space-between;
        height:3rem /* 42/16 */;
		border-bottom:1px solid #DCDBE2;
        line-height:3rem /* 42/16 */;
        padding: 0 5%;
        background: #fff;
        position: relative;
   }
   .list_style::after{
        border: 2px solid #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        right: 10px;
        position: absolute;
        width: 5px;
        height: 5px;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
   }
   .list_style h2,.img_style h2{
       line-height:3rem /* 42/16 */;
       font-size: 1rem /* 14/16 */;
       color:#484848;
   }
</style>
