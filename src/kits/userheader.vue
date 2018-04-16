// 公共头部样式，左边返回键，引用<com-header :title="title"></com-header>
<template>
  <div class="comheader">      
        <img src="../../statics/imgs/jiantou-1.png" alt="" @click="toback">       
        <div class="content">{{title}}</div>
        <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: 'comheader',
  
  data () {
    return {
     
    }
  },
  props:{
    title:String,
  },
  methods:{
    toback:function(){
        //console.log(this.title)
      this.$router.push({path:'/user'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comheader{
    height: 3.125rem /* 50/16 */;
    width: 100%;
    background:url(../../statics/imgs/PERSONNAL-CENTRAL_38.png) no-repeat top left scroll;
    background-color: #5B97D4;
    position: fixed;
    z-index: 100;
    top: 0;
}

.comheader img{
  width: 1rem /* 16/16 */;
  height: 3.125rem /* 50/16 */;
  float: left;
  margin:0 .875rem /* 14/16 */;
  padding: .8125rem /* 13/16 */ 0;
  z-index: 110;
}
.content{
  width: 100%;
  height: 3.125rem /* 50/16 */;
  color: #fff;
  font-size: 1rem /* 16/16 */;
  text-align: center;
  line-height: 3.125rem /* 50/16 */;
  padding-right: 2.75rem /* 44/16 */;
}
</style>
