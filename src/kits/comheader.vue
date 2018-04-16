
<template>
  <div class="comheader divcss">      
        <img src="../../statics/imgs/jiantou-1.png" @click="toback">       
        <div class="content divcss">{{title}}</div>
        <div class="right" @click="saveName">{{save}}</div>
  </div>
</template>

<script>
export default {
  name: 'comheader',
  // 公共头部样式，左边返回键，引用<com-header :title="title"></com-header>
  data () {
    return {
     
    }
  },
  props:{
    title:String,
    save:String
  },
  methods:{
    toback:function(){
        // console.log(this.title)
      //this.$router.go(-1);
       this.$router.back(-1);
    },
    saveName() {
    	this.$emit('show_save') 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comheader{
    height: 3.125rem /* 50/16 */;
    width: 100%;
    max-width: 40rem /* 640/16 */;
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
  font-size: 1rem /* 16/16 */;
  text-align: center;
  line-height: 3.125rem /* 50/16 */;
  padding-right: 2.75rem /* 44/16 */;
}
.right {
	font-size: 1rem;
	position: absolute;
	right: 0;
	top:0;
	height: 3.125rem;
	line-height: 3.125rem;
	padding-right: .8rem;
	color: #fff;
}
</style>
