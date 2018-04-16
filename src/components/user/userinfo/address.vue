 <template>
    <div id="address">
        <com-header :title="title"></com-header>
        <div class="addressbox" v-for="a in addressList">
            <router-link v-bind="{to:'/user/per_info/address/updataaddress/'+a.id}">
                <div class="name">
                    {{a.name}}
                </div>
                <div class="address">
                    {{a.province_cn}} {{a.city_cn}} {{a.area_cn}} {{a.address}}
                </div>
                <img  class="updataaddress" src="../../../../statics/imgs/centralofme_35.png" alt="">
            </router-link>
        </div>
        <router-link to="/user/per_info/address/newaddress">
            <div class="add">
                <img src="../../../../statics/imgs/xinxixiugai_32.png" alt="">新增地址
            </div>
        </router-link>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import { Indicator } from 'mint-ui';
    import { Cell } from 'mint-ui';
    import comHeader from '../../../kits/comheader';
    import publish from '../publish';
    import common from '../../../kits/common.js';
    export default {
        data(){
            return{
                title:'地址',
                addressList: null,
            }
        },

        components: {
            comHeader,
            publish
        },
        computed:{
         
        },
        created(){
           
        },
        methods: {
            
        },
        mounted(){
            var that = this;
            let token = window.localStorage.getItem('token');
            var url = common.apimain+'/api/address/list?token='+token;
            this.$http.get(url).then(resData=>{
                if(resData.body.code == 1000){
//                    console.log(resData);
                    that.addressList = resData.body.data;
				}else{
//                    console.log(resData)
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
    #address{
        padding-top: 4rem;
    }
    .addressbox{
        padding: 0.6rem 1rem;
        background-color: #fff;
        border-bottom: 1px solid #eff0f2;
        position: relative;
    }
    .name{
        font-size: 1rem;
        font-weight: 600;
        color: #1e1f21;
        padding-bottom: 0.3rem;
    }
    .address{
        font-size:.875rem /* 14/16 */;
        color: #6f6f6f; 
    }
    .updataaddress{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 1rem;
        margin: auto;
        display: block;
    }
    .add{
        height: 2.58125rem /* 41.3/16 */;
        line-height: 2.58125rem /* 41.3/16 */;
        padding: 0 0.6rem;
        color: #1e1f21;
        font-size: 1rem;
        font-weight: 600;
        background-color: #fff;
    }
    .add img{
        width: 1rem;
        margin-right: 1rem;
    }
</style>
