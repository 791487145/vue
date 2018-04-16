<template>
    <div id="" ref="tmpld">
        <com-header :title="title"></com-header>
        <section class="main">
            <section>
                <section class="main_main">
                    <router-link to="/user/userinfo/securitycode">
                        <section class="list_style">
                            <h2>实名认证</h2>
                        </section>
                    </router-link>
                    <router-link to="/user/userinfo/studentcode">
                        <section class="list_style">
                            <h2>学生身份认证</h2>
                        </section>
                    </router-link>
                </section>
               
            </section>
        </section> 
    </div>
</template>

<script>
    import comHeader from '../../../kits/comheader';
    export default {
        data(){
            return{
                title:'认证信息',
            }
        },

        components: {
           "com-header":comHeader,
        },
        computed:{
         
        },
        created(){
           
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
