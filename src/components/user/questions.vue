 <template>
    <div id="" ref="tmpld">
         <com-header :title="title"></com-header>
        <section class="main">
            <section class="list">
                <H3>如何发任务?</H3>
                <p>
                    1.1 赏金联盟所有权和运营权归山西XX信息科技有限公司所有。 </br>
                    1.2 用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与赏金联盟之间自动形成协议关系，用户应当受本协议的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。 </br>
                    1.3 本协议则可由赏金联盟随时更新，用户应当及时关注并同意本站不承担通知义务。本站的通知、公告、声明或其它类似内容是本协议的一部分。
                </p>        
            </section>
            <section class="list">
                <H3>如何发任务?</H3>
                <p>
                    1.1 赏金联盟所有权和运营权归山西XX信息科技有限公司所有。 </br>
                    1.2 用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与赏金联盟之间自动形成协议关系，用户应当受本协议的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。 </br>
                    1.3 本协议则可由赏金联盟随时更新，用户应当及时关注并同意本站不承担通知义务。本站的通知、公告、声明或其它类似内容是本协议的一部分。
                </p>        
            </section>
            <section class="list">
                <H3>如何发任务?</H3>
                <p>
                    1.1 赏金联盟所有权和运营权归山西XX信息科技有限公司所有。 </br>
                    1.2 用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与赏金联盟之间自动形成协议关系，用户应当受本协议的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。 </br>
                    1.3 本协议则可由赏金联盟随时更新，用户应当及时关注并同意本站不承担通知义务。本站的通知、公告、声明或其它类似内容是本协议的一部分。
                </p>        
            </section>
        </section> 
    </div>
</template>

<script>
    import comHeader from '../../kits/comheader';
    export default {
        data(){
            return{
                title:'常见问题',
            }
        },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        components: {
            comHeader,
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
       margin: 0 auto;
   }
   .list{
       width:96%;
       margin: 10px 2% 0;
       padding: 0 5% .9375rem /* 15/16 */;
       background-color: #fff;
   }
   .list h3{
       font-size: .875rem /* 14/16 */;
       color: #010101;
       line-height: 2.1875rem /* 35/16 */;
   }
   .list p{
       font-size: .75rem /* 12/16 */;
       color: #ABABAB;
   }
  
</style>
