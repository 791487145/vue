<template>
	 <!--三级联动选项-->
     <div class="missionlx">
        <mt-popup v-model="show" position="bottom" :closeOnClickModal="closeOnClickModal">
            <section class="showChose">
            <section class="address">
            <section class="title">
            <h4 @click="closeadd" >取消</h4>
            <span @click="getage">完成</span>
            </section>
            <section class="title">
            <div class="area" @click="provinceSelected()">{{Province?Province:info[province-1].name}}</div>
            <div class="area" @click="citySelected()" :class="City?'':'active'">{{City?City:'请选择'}}</div>
            <div id="xuexiao" class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</div>
            </section>
            <ul>
            <li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.id, v.name, k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.name}}</li>
            <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.id, v.name, k)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.name}}</li>
            <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.id, v.name, k)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.name}}</li>
            </ul>
            </section>
            </section>
        </mt-popup>
     </div>
    
   
</template>

<script>
import missionlx from './missionlx.js';
import { MessageBox } from 'mint-ui';//提示判断
export default {
  name: 'missionlx',
   props: {
        showlx: Boolean,        
    },
   created() {
           
    },
    mounted() {
        let vm = this
        vm.show = vm.showlx
    },
    watch: {
            showlx(old, val) {
              this.show = !val
            },
    },
  data () {
    return {
        closeOnClickModal: false,
        show: false,
      showProvince: true,
      showCity: false,
      showDistrict: false,
      showCityList: false,
      showDistrictList: false,
      province: 5,
      city: 3,
      district: '',
      GetProvinceId: 2,
      District: false,
      Province: false,
      City: false,
      // v-for循环判断是否为当前
      selected: false,
      info:[]
    }
  },
  created:function(){
       var citylist = missionlx.info;
       this.info = citylist
  },
  methods: {
      getage:function(){
        if(this.District != false){
            this.show = false
             this.$emit('getage', this.district);
             //console.log(this.District)
             //console.log(this.district)
        }else{
            MessageBox('提示', '请选择完整地址');
        }
      },
    closeadd:function() {
      //this.show  = false;
      this.$emit('hide-picker', false);
    },
    _filter(add,name,code) {
      let result = [];
      for(let i=0;i<add.length;i++) {
        if(code == add[i].id){
          result = add[i][name];
        }
      }
      return result;
    },
    getProvinceId: function(code,input,index) {
      this.province = code;
      this.Province = input;
      this.showProvince=false;
      this.showCity=true;
      this.showDistrict = false;
      this.showCityList = this._filter(this.info,'city',this.province);
      // 点击选择当前
      this.info.map( a => a.selected = false );
      this.info[index].selected = true;
    },
    provinceSelected: function() {
      // 清除市级和区级列表
      this.showCityList = false;
      this.showDistrictList = false;
      // 清除市级和区级选项
      this.City = false;
      this.District = false;
      // 选项页面的切换
      this.showProvince = true;
      this.showCity = false;
      this.showDistrict = false;
    },
    getCityId: function(code, input, index) {
      this.city = code;
      this.City = input;
      this.showProvince=false;
      this.showCity=false;
      this.showDistrict = true;
      this.showDistrictList = this._filter(this.showCityList,'district',this.city);
      // 选择当前添加active
      this.showCityList.map( a => a.selected = false );
      this.showCityList[index].selected = true;
    },
    citySelected: function() {
      this.showProvince=false;
      this.showCity=true;
      this.showDistrict = false;
    },
    getDistrictId: function(code, input, index) {
      this.district = code;
      this.District = input;
      // 选择当前添加active
      this.showDistrictList.map( a => a.selected = false );
      this.showDistrictList[index].selected = true;
      // 选取市区选项之后关闭弹层
      //this.showChose = false;
    },
    districtSelected: function() {
      this.showProvince=false;
      this.showCity=false;
      this.showDistrict = true;
    }
  }
}
</script>

<style scoped>
 .mint-popup {
     width: 100%;
     height: 16.25rem /* 260/16 */;
 }
        
.footer-btn {
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  z-index: 2;
  left: 0;
  bottom: 3rem;
}
.showChose{
  width:100%;
  height:100%;
  position:fixed;
  top:0;
  left:0;
  z-index:120;
  background:rgba(77,82,113,0.8);
}
.address{
  position:absolute;
  bottom:0;
  left:0;
  z-index:121;
  background:#fff;
  width:100%;
}
.title h4{
  display:inline-block;
  margin-left:15px;
  font-size:1rem /* 16/16 */;
  line-height:1.875rem /* 30/16 */;
  font-weight:normal;
  color:#999;
  height: 1.875rem /* 30/16 */;
}
.title span{
  font-size:1rem /* 16/16 */;
  line-height:1.875rem /* 30/16 */;
  color:#999;
  height: 1.875rem /* 30/16 */;
  float: right;
  margin-right: .9375rem /* 15/16 */;
}
.area{
  display:inline-block;
  font-size:1rem /* 16/16 */;
  line-height:1.875rem /* 30/16 */;
  margin-left:0.42rem;
  color:#333;
  height: 1.875rem /* 30/16 */;
}
.addList{
  width:100%;
  padding-left:0.32rem;
  font-size:1rem /* 16/16 */;
  line-height:1.875rem /* 30/16 */;
  color:#333;
  height: 1.875rem /* 30/16 */;
}
/* 修改的格式 */
.address ul{
  width:95%;
  height:12.5rem /* 200/16 */;
  overflow:auto;
}
.address ul li{
  margin-left:5%;
}
.address .title .active{
  color:#0071B8;
  border-bottom:0.02rem solid #0071B8;
}
.address ul .active{
  color:#0071B8;
}
</style>