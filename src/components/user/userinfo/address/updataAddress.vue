<template>
    <div id="newaddress" ref="tmpld">
        <div v-if="!state">
                <com-header :title="title"></com-header>
                <div class="address">
                        <ul>
                                <li><span>联系人 &nbsp;&nbsp;</span><input type="text" placeholder="请填写姓名" v-model="name"></li>
                                <li><span>手机号码</span><input type="number" placeholder="请填写手机号码" v-model="phone"></li>
                                <li @click="showadd = true"><span>所在地区</span>{{proviceID == null?'请选择省市区':provice+city+area }}</li>
                                <li @click="state = true"><span>详细地址</span>{{address == ''?'请填写详细地址':address | valuenum}}</li>
                                <li><span>邮政编码</span><input type="number" placeholder="请填写邮政编码" v-model="postcode"></li>
                        </ul>
                </div>
                <button @click="add" class="divcsss">修改</button>
                <button @click="clear" class="divcsss">删除</button>
                <!-- 地区选择 -->
                <address-three :showadd="showadd" @hide-picker="hidePicker" @getname="getname"></address-three> 
        </div>
        <address-content v-if="state" :addressc = "address"></address-content>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import { Indicator } from 'mint-ui';
    import { Cell } from 'mint-ui';
    import comHeader from '../../../../kits/comheader';
    import common from '../../../../kits/common.js';
    // import AddRess from  '../../../../kits/address.vue';//地址三级联动
    import addressThree from  './addressThree.vue';//地址三级联动
    import addressContent from './newAddressContent.vue'
    import bus from '../../../../kits/bus.js'
    export default {
        data(){
            return{
                title:'地址',
                phone: null,
                name: null,      // 收货人名
                provice: null,   // 省
                city: null,      // 市
                area: null,      // 区
                proviceID: null,
                cityID: null, 
                areaID: null,
                postcode: null,  // 邮编

                address: '',     // 详细地址

                showadd:false, // 三级地区显示
                state: false, // 填写详细地址显示
                add_id: null, // 地址ID
            }
        },
        components: {
            comHeader,addressThree,addressContent
        },
        computed:{
            
        },
        filters: {
            valuenum:function(value){
                if(value.length>10){
                    this.tvalue= value.substr(0,10) + "...";
                    return this.tvalue;
                }else{
                    this.tvalue= value;
                    return this.tvalue;
                }
            }.bind(this),
          },
        created(){
            bus.$on('success',(val,state)=>{
                this.address = val;
                // console.log(state)
                this.state = state;
                // console.log(this.task_message+'dx');
            });
            bus.$on('back',(val)=>{
                this.state = false;
            });
        },
        methods: {
            hidePicker() {
				this.showadd = false;
			},
			getname(val1,val2,val3,val4,val5,val6) {
                this.proviceID = val1;
                this.cityID = val2;
                this.areaID = val3;
                this.provice = val4;
                this.city = val5;
                this.area = val6;

				this.showadd = !this.showadd;
			},
            add(){
                var that = this;
                let token = window.localStorage.getItem('token');
                var data = {
                        add_id: that.add_id,
                        phone:that.phone,
                        name: that.name,
                        province: that.proviceID,
                        city: that.cityID,
                        area: that.areaID,
                        address: that.address,
                        token: token,
                        post_code : that.postcode,
                    };
                var url = common.apimain+'/api/address/update';
                    //console.log(url);
                    Indicator.open();
                this.$http.post(url,data,{emulateJSON: true},{timeout:15000}).then(function(resData){
                    console.log(resData);
                    if(resData.body.code == 1000){
                        Indicator.close();
                        Toast({
                			message: resData.body.message,
                			duration: 2000
                        });
                        this.$router.go(-1);
                	}else{
                		Indicator.close();
                		Toast({
                			message: resData.body.message,
                			duration: 3000
                		});
                	} 
                },function(){
                	//console.log('失败了');
                	Indicator.close();
                	Toast('网络连接错误');
                });
            },
            clear(){
                var that = this;
                let token = window.localStorage.getItem('token');
                var data = {
                        add_id: that.add_id,
                        token: token,
                    };
                var url = common.apimain+'/api/address/delete';
                    //console.log(url);
                Indicator.open();
                this.$http.post(url,data,{emulateJSON: true},{timeout:15000}).then(function(resData){
                    console.log(resData);
                    if(resData.body.code == 1000){
                        Indicator.close();
                        Toast({
                			message: resData.body.message,
                			duration: 2000
                        });
                        this.$router.go(-1);
                	}else{
                		Indicator.close();
                		Toast({
                			message: resData.body.message,
                			duration: 3000
                		});
                	} 
                },function(){
                	//console.log('失败了');
                	Indicator.close();
                	Toast('网络连接错误');
                });
            }
        },
        mounted(){
            var that = this;
            var id = this.$route.params.id;
            let token = window.localStorage.getItem('token');
            var url = common.apimain+'/api/address/detail?token='+token+'&add_id='+id;
            Indicator.open();
            this.$http.get(url).then(resData=>{
                Indicator.close();
                if(resData.body.code == 1000){
                    console.log(resData);
                    that.add_id = resData.body.data.id;
                    that.phone = resData.body.data.phone;
                    that.name = resData.body.data.name;
                    that.provice = resData.body.data.province_cn;
                    that.city = resData.body.data.city_cn;
                    that.area = resData.body.data.area_cn;
                    that.proviceID = resData.body.data.province;
                    that.cityID = resData.body.data.city;
                    that.areaID = resData.body.data.area;
                    that.address = resData.body.data.address;
                    that.postcode = resData.body.data.post_code;
				}else{
                    console.log(resData)
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
    #newaddress{
        margin-top: 1rem;
        padding-top: 3.265rem /* 18.24/16 */;
    }
    button{
        width: 80vw;
        height: 2.4rem /* 47/16 */;
        padding: 0 2.5625rem /* 41/16 */;
        margin: auto;
        margin-top: 1rem;
        display: block;
    }
    .address{
        padding: 0.8rem;
        background-color: #fff;
    }
    .address li{
        height: 3rem /* 37.44/16 */;
        line-height: 3rem;
        border-bottom: 1px solid #eff0f2;
    }
    .address li span{
        font-weight: 500;
        margin-right: 1.6rem;;
    }
    .address li input{
        border: none;
        width: 60vw;
        margin: 0;
        padding: 0;
    }
</style>
