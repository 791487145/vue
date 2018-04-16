<template>
        <div class="lunboone">
          <mt-popup v-model="show" position="right" :closeOnClickModal="closeOnClickModal">
            <div class="swipe" ref="swipe">
            <mt-swipe :auto="0">
               <mt-swipe-item>
                <img src="../../../statics/imgs/guidepage1.png"  >
              </mt-swipe-item>
               <mt-swipe-item>
                <img src="../../../statics/imgs/guidepage2.png"  >
              </mt-swipe-item>
              <mt-swipe-item>
                <img src="../../../statics/imgs/guidepage3.png"  >
              </mt-swipe-item>
              <mt-swipe-item>
                  <img src="../../../statics/imgs/guidepage4.png"  >
                <div class="nowuse" @click="goHome">立即体验</div>
              </mt-swipe-item>
            </mt-swipe>
            </div>
          </mt-popup>
        </div>
</template>
      
<script>
import { Swipe, SwipeItem } from "mint-ui";

export default {
  name: "lunboone",
  props: {
    iframe: Boolean,
    openurl: String
  },
  created() {
    let vm = this;
    vm.show = vm.iframe;
  },
  mounted() {
    // let vm = this;
    // vm.show = vm.iframe;
    // vm.src = vm.openurl;
    this.$refs.swipe.style.height = document.documentElement.clientHeight+"px";
     this.$refs.swipe.style.width = document.documentElement.clientWidth+"px";
  },
  data() {
    return {
      show: false,
      closeOnClickModal: false,
      src: ""
    };
  },
  watch: {
    iframe(old, val) {
      this.show = !val;
    },
    openurl(old, val) {
      //console.log(this.openurl)
    }
  },
  methods: {
    hidePicker() {
      // 取消选择
      this.$emit("hide-picker", false);
    },
    goHome(){
      this.$router.push({path:'/loginuser'});
    }
  }
};
</script>
      
<style scoped>
.mint-popup {
  width: 100%;
  height: 100%;
}
.swipe{
  height: 100%;
}
.swipe .mint-swipe .mint-swipe-indicators{
  bottom: 60px!important;
}
.swipe img{
  width: 100%;
  height: 100%;
}
.nowuse{
  width: 46%;
  height: 50px;
  text-align: center;
  line-height: 46px;
  font-size: 18px;
  font-weight: 600;
  position: absolute;
  bottom: 7.2%;
  left: 27%;
  bottom: 50px;
  border: 2px solid #D5EAFE;
  border-radius: 25px;
  color: #7FBEFF;
  letter-spacing: 1px;
}
</style>
      