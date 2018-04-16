<template>
	<div id="three">
        <div class="bottom">
            <!-- 省份选择 -->
            <div class="padding">
                <span @click="hidePicker">取消</span>
                <span @click="saveAddress" class="float-right">完成</span>
            </div>
            <div class="slide">
                <ul class="currentP">
                    <li v-for="(p,i) in provinces" v-bind:value="i">{{p.name}}</li>
                </ul>
                <!-- 市 -->
                <ul class="currentC">
                    <li v-for="(c,i) in provinces[currentP].citys" v-bind:value="i">{{c.name}}</li>
                </ul>
                <!-- 县 -->
                <ul class="currentA">
                    <li v-for="(a,i) in provinces[currentP].citys[currentC].areas" v-bind:value="i">{{a}}</li>
                </ul>
            </div>
            
        </div>
            <br />
		<!-- 展示 -->
		<p>您选择了：{{provinces[currentP].name}}
			{{provinces[currentP].citys[currentC].name}}
			{{provinces[currentP].citys[currentC].areas[currentA]}}
		</p>
	</div>
</template>

<script>
    import "../../kits/jquery.min.js"
    export default {
          name: 'three',
          props: {
          },
          created() {
            
          },
          mounted() {
                var that = this;
                that.cP = $(".currentP li").eq(0).html();
                that.cC = $(".currentC li").eq(0).html();
                that.cA = $(".currentA li").eq(0).html();
                $(".bottom").animate({ 
                    bottom: -10,
                }, 600 );
                // var clickP = false;
                $(".currentP li").eq(0).css("background",'grey');
                $(".currentC li").eq(0).css("background",'grey');
                $(".currentA li").eq(0).css("background",'grey');
                $(".currentP li").each(function(i,e){
                    $(e).click(function(){
                        $(this).css("background",'grey').siblings().css("background",'#fff');
                        $(".currentC li").eq(0).css("background",'grey').siblings().css("background",'#fff');
                        $(".currentA li").eq(0).css("background",'grey').siblings().css("background",'#fff');
                        that.currentP = i;
                        that.cP = $(this).html();
                            
                        // clickP = true;
                    })
                });
                $(".currentC li").each(function(i,e){
                    $(e).click(function(){
                        $(this).css("background",'grey').siblings().css("background",'#fff');
                        $(".currentA li").eq(0).css("background",'grey').siblings().css("background",'#fff');
                        that.currentC = i;
                        // if(clickP){
                        //     that.cP = that.provinces[0].name;
                        //     that.cA = that.provinces[0].citys;
                        // }
                        that.cC = $(this).html();
                    })
                });
                $(".currentA li").each(function(i,e){
                    $(e).click(function(){
                        $(this).css("background",'grey').siblings().css("background",'#fff');
                        that.currentA = i;
                        that.cA = $(this).html();
                    })
                });
                var a1 = 0;
                var a2 = 0;
                var a3 = 0;
                var page1y = null;
                var page2y = null;
                var page3y = null;
                // $("ul").on('mousemove',function(event){
                //     if(pagey<event.pageY){
                //         a=a+3;
                //     }else{
                //         a=a-3;
                //     }
                //     pagey = event.pageY;
                //     $(this).css('top',a)
                // });
                var ul1 = document.getElementsByClassName('currentP')[0];
                var ul2 = document.getElementsByClassName('currentC')[0];
                var ul3 = document.getElementsByClassName('currentA')[0];
                ul1.addEventListener("touchmove",function(evt){
                    evt.preventDefault();
                    var touch=evt.touches[0];
                    // console.log(touch.pageY);

                    if(page1y<touch.pageY){
                        a1=a1+3;
                    }else{
                        a1=a1-3;
                    }
                    page1y=touch.pageY;
                    $(".currentP").css('top',a1);
                },false);
                ul2.addEventListener("touchmove",function(evt){
                    evt.preventDefault();
                    var touch=evt.touches[0];
                    // console.log(touch.pageY);

                    if(page2y<touch.pageY){
                        a2=a2+3;
                    }else{
                        a2=a2-3;
                    }
                    page2y=touch.pageY;
                    $(".currentC").css('top',a2);
                },false);
                ul3.addEventListener("touchmove",function(evt){
                    evt.preventDefault();
                    var touch=evt.touches[0];
                    // console.log(touch.pageY);

                    if(page3y<touch.pageY){
                        a3=a3+3;
                    }else{
                        a3=a3-3;
                    }
                    page3y=touch.pageY;
                    $(".currentA").css('top',a3);
                },false);

          },
          data() {
            return {
                addressValue: '',
                // 省份,城市,地区
                cP: '',
                cC: '',
                cA: '',
                // 当前选择哪个省份,城市,地区的数字编号
                currentP: 0,
                currentC: 0,
                currentA: 0,
                provinces: [
                    {
                        name: "河南省",
                        citys: [
                            {
                                name: "郑州市",
                                areas:["经开区","二七区","金水区","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "南阳市",
                                areas:["镇平县","新野县","内乡县","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "开封市",
                                areas:["兰考县","尉氏县","经开区","二七区","金水区","经开区","二七区","金水区","经开区"]
                            },
                            {
                                name: "郑州市",
                                areas:["经开区","二七区","金水区","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "南阳市",
                                areas:["镇平县","新野县","内乡县","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "开封市",
                                areas:["兰考县","尉氏县","经开区","二七区","金水区","经开区","二七区","金水区","经开区"]
                            },
                            {
                                name: "郑州市",
                                areas:["经开区","二七区","金水区","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "南阳市",
                                areas:["镇平县","新野县","内乡县","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "开封市",
                                areas:["兰考县","尉氏县","经开区","二七区","金水区","经开区","二七区","金水区","经开区"]
                            }
                        ]
                    },
                    {
                        name: "山西省",
                        citys: [
                            {
                                name: "太原市",
                                areas:["尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区"]
                            },
                            {
                                name: "大同市",
                                areas:["矿区","开发区","大同县","矿区","开发区","大同县","矿区","开发区","大同县"]
                            },
                            {
                                name: "晋中市",
                                areas:["晋中1","晋中2","晋中3","晋中1","晋中2","晋中3",,"晋中1","晋中2","晋中3"]
                            },
                            {
                                name: "太原市",
                                areas:["尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区"]
                            },
                            {
                                name: "大同市",
                                areas:["矿区","开发区","大同县","矿区","开发区","大同县","矿区","开发区","大同县"]
                            },
                            {
                                name: "晋中市",
                                areas:["晋中1","晋中2","晋中3","晋中1","晋中2","晋中3",,"晋中1","晋中2","晋中3"]
                            },
                            {
                                name: "太原市",
                                areas:["尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区"]
                            },
                            {
                                name: "大同市",
                                areas:["矿区","开发区","大同县","矿区","开发区","大同县","矿区","开发区","大同县"]
                            },
                            {
                                name: "晋中市",
                                areas:["晋中1","晋中2","晋中3","晋中1","晋中2","晋中3",,"晋中1","晋中2","晋中3"]
                            },
                        ]
                    },
                    {
                        name: "山东省",
                        citys: [
                            {
                                name: "济南市",
                                areas:["济南1区","济南2区","济南3区","济南1区","济南2区","济南3区","济南1区","济南2区","济南3区"]
                            },
                            {
                                name: "青岛市",
                                areas:["1区","2区","3区","1区","2区","3区","1区","2区","3区"]
                            },
                            {
                                name: "白洋淀",
                                areas:["白1区","白2区","白3区","白1区","白2区","白3区","白1区","白2区","白3区"]
                            },
                            {
                                name: "济南市",
                                areas:["济南1区","济南2区","济南3区","济南1区","济南2区","济南3区","济南1区","济南2区","济南3区"]
                            },
                            {
                                name: "青岛市",
                                areas:["1区","2区","3区","1区","2区","3区","1区","2区","3区"]
                            },
                            {
                                name: "白洋淀",
                                areas:["白1区","白2区","白3区","白1区","白2区","白3区","白1区","白2区","白3区"]
                            },
                            {
                                name: "济南市",
                                areas:["济南1区","济南2区","济南3区","济南1区","济南2区","济南3区","济南1区","济南2区","济南3区"]
                            },
                            {
                                name: "青岛市",
                                areas:["1区","2区","3区","1区","2区","3区","1区","2区","3区"]
                            },
                            {
                                name: "白洋淀",
                                areas:["白1区","白2区","白3区","白1区","白2区","白3区","白1区","白2区","白3区"]
                            }
                        ]
                    },
                    {
                        name: "河南省",
                        citys: [
                            {
                                name: "郑州市",
                                areas:["经开区","二七区","金水区","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "南阳市",
                                areas:["镇平县","新野县","内乡县","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "开封市",
                                areas:["兰考县","尉氏县","经开区","二七区","金水区","经开区","二七区","金水区","经开区"]
                            },
                            {
                                name: "郑州市",
                                areas:["经开区","二七区","金水区","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "南阳市",
                                areas:["镇平县","新野县","内乡县","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "开封市",
                                areas:["兰考县","尉氏县","经开区","二七区","金水区","经开区","二七区","金水区","经开区"]
                            },
                            {
                                name: "郑州市",
                                areas:["经开区","二七区","金水区","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "南阳市",
                                areas:["镇平县","新野县","内乡县","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "开封市",
                                areas:["兰考县","尉氏县","经开区","二七区","金水区","经开区","二七区","金水区","经开区"]
                            }
                        ]
                    },
                    {
                        name: "山西省",
                        citys: [
                            {
                                name: "太原市",
                                areas:["尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区"]
                            },
                            {
                                name: "大同市",
                                areas:["矿区","开发区","大同县","矿区","开发区","大同县","矿区","开发区","大同县"]
                            },
                            {
                                name: "晋中市",
                                areas:["晋中1","晋中2","晋中3","晋中1","晋中2","晋中3",,"晋中1","晋中2","晋中3"]
                            },
                            {
                                name: "太原市",
                                areas:["尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区"]
                            },
                            {
                                name: "大同市",
                                areas:["矿区","开发区","大同县","矿区","开发区","大同县","矿区","开发区","大同县"]
                            },
                            {
                                name: "晋中市",
                                areas:["晋中1","晋中2","晋中3","晋中1","晋中2","晋中3",,"晋中1","晋中2","晋中3"]
                            },
                            {
                                name: "太原市",
                                areas:["尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区"]
                            },
                            {
                                name: "大同市",
                                areas:["矿区","开发区","大同县","矿区","开发区","大同县","矿区","开发区","大同县"]
                            },
                            {
                                name: "晋中市",
                                areas:["晋中1","晋中2","晋中3","晋中1","晋中2","晋中3",,"晋中1","晋中2","晋中3"]
                            },
                        ]
                    },
                    {
                        name: "山东省",
                        citys: [
                        {
                            name: "济南市",
                            areas:["济南1区","济南2区","济南3区","济南1区","济南2区","济南3区","济南1区","济南2区","济南3区"]
                        },
                        {
                            name: "青岛市",
                            areas:["1区","2区","3区","1区","2区","3区","1区","2区","3区"]
                        },
                        {
                            name: "白洋淀",
                            areas:["白1区","白2区","白3区","白1区","白2区","白3区","白1区","白2区","白3区"]
                        },
                        {
                            name: "济南市",
                            areas:["济南1区","济南2区","济南3区","济南1区","济南2区","济南3区","济南1区","济南2区","济南3区"]
                        },
                        {
                            name: "青岛市",
                            areas:["1区","2区","3区","1区","2区","3区","1区","2区","3区"]
                        },
                        {
                            name: "白洋淀",
                            areas:["白1区","白2区","白3区","白1区","白2区","白3区","白1区","白2区","白3区"]
                        },
                        {
                            name: "济南市",
                            areas:["济南1区","济南2区","济南3区","济南1区","济南2区","济南3区","济南1区","济南2区","济南3区"]
                        },
                        {
                            name: "青岛市",
                            areas:["1区","2区","3区","1区","2区","3区","1区","2区","3区"]
                        },
                        {
                            name: "白洋淀",
                            areas:["白1区","白2区","白3区","白1区","白2区","白3区","白1区","白2区","白3区"]
                        }
                        ]
                    },{
                        name: "河南省",
                        citys: [
                            {
                                name: "郑州市",
                                areas:["经开区","二七区","金水区","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "南阳市",
                                areas:["镇平县","新野县","内乡县","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "开封市",
                                areas:["兰考县","尉氏县","经开区","二七区","金水区","经开区","二七区","金水区","经开区"]
                            },
                            {
                                name: "郑州市",
                                areas:["经开区","二七区","金水区","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "南阳市",
                                areas:["镇平县","新野县","内乡县","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "开封市",
                                areas:["兰考县","尉氏县","经开区","二七区","金水区","经开区","二七区","金水区","经开区"]
                            },
                            {
                                name: "郑州市",
                                areas:["经开区","二七区","金水区","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "南阳市",
                                areas:["镇平县","新野县","内乡县","经开区","二七区","金水区","经开区","二七区","金水区"]
                            },
                            {
                                name: "开封市",
                                areas:["兰考县","尉氏县","经开区","二七区","金水区","经开区","二七区","金水区","经开区"]
                            }
                        ]
                    },
                    {
                        name: "山西省",
                        citys: [
                            {
                                name: "太原市",
                                areas:["尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区"]
                            },
                            {
                                name: "大同市",
                                areas:["矿区","开发区","大同县","矿区","开发区","大同县","矿区","开发区","大同县"]
                            },
                            {
                                name: "晋中市",
                                areas:["晋中1","晋中2","晋中3","晋中1","晋中2","晋中3",,"晋中1","晋中2","晋中3"]
                            },
                            {
                                name: "太原市",
                                areas:["尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区"]
                            },
                            {
                                name: "大同市",
                                areas:["矿区","开发区","大同县","矿区","开发区","大同县","矿区","开发区","大同县"]
                            },
                            {
                                name: "晋中市",
                                areas:["晋中1","晋中2","晋中3","晋中1","晋中2","晋中3",,"晋中1","晋中2","晋中3"]
                            },
                            {
                                name: "太原市",
                                areas:["尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区","尖草坪","小店区","高新开发区"]
                            },
                            {
                                name: "大同市",
                                areas:["矿区","开发区","大同县","矿区","开发区","大同县","矿区","开发区","大同县"]
                            },
                            {
                                name: "晋中市",
                                areas:["晋中1","晋中2","晋中3","晋中1","晋中2","晋中3",,"晋中1","晋中2","晋中3"]
                            },
                        ]
                    },
                    {
                        name: "山东省",
                        citys: [
                        {
                            name: "济南市",
                            areas:["济南1区","济南2区","济南3区","济南1区","济南2区","济南3区","济南1区","济南2区","济南3区"]
                        },
                        {
                            name: "青岛市",
                            areas:["1区","2区","3区","1区","2区","3区","1区","2区","3区"]
                        },
                        {
                            name: "白洋淀",
                            areas:["白1区","白2区","白3区","白1区","白2区","白3区","白1区","白2区","白3区"]
                        },
                        {
                            name: "济南市",
                            areas:["济南1区","济南2区","济南3区","济南1区","济南2区","济南3区","济南1区","济南2区","济南3区"]
                        },
                        {
                            name: "青岛市",
                            areas:["1区","2区","3区","1区","2区","3区","1区","2区","3区"]
                        },
                        {
                            name: "白洋淀",
                            areas:["白1区","白2区","白3区","白1区","白2区","白3区","白1区","白2区","白3区"]
                        },
                        {
                            name: "济南市",
                            areas:["济南1区","济南2区","济南3区","济南1区","济南2区","济南3区","济南1区","济南2区","济南3区"]
                        },
                        {
                            name: "青岛市",
                            areas:["1区","2区","3区","1区","2区","3区","1区","2区","3区"]
                        },
                        {
                            name: "白洋淀",
                            areas:["白1区","白2区","白3区","白1区","白2区","白3区","白1区","白2区","白3区"]
                        }
                        ]
                    },
                    
                    
                ]
            }
          },
          methods: {
            saveAddress() { //保存所选地区
                let vm = this
                vm.$emit('ceshi',vm.cP,vm.cC,vm.cA);
            },
            hidePicker() { // 取消选择
                this.$emit('abandon');
            },
          },
          watch: {
            // 当省份变化了，默认选择第一个城市和区
			currentP: function(){
                var that = this;
				that.currentC = that.currentA = 0;
                // 因为当前被选中的城市和地区是上一个被选中的省份的,点击时获取的是上省份数据,所以延时一点点,就能获取
                // 现在的省份的数据,下面的同理
                setTimeout(function(){
                    that.cC = $(".currentC li").eq(0).html();
                    that.cA = $(".currentA li").eq(0).html();
                    console.log(that.cP);
                    console.log(that.cC);
                    console.log(that.cA);
                },1);
                
			},
			// 当区域变化了，默认选择第一个区
			currentC: function(){
                var that = this;
				that.currentA = 0;
                setTimeout(function(){
                    that.cA = $(".currentA li").eq(0).html();
                    console.log(that.cP);
                    console.log(that.cC);
                    console.log(that.cA);
                },1);
			},
            currentA: function(){
                var that = this;
				that.currentA = 0;
                console.log(that.cP);
                console.log(that.cC);
                console.log(that.cA);
			}
          },
        }
</script>

<style scoped>
    #three{
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .6);
        position: fixed;
        top: 0;
        z-index: 1001;
    }
    .slide{
        display: flex;
        justify-content: space-around;
        overflow: hidden;
    }
    .slide ul{
        position: relative;
    }
    .padding {
        padding: 15px;
    }
    .float-right {
        float: right;
    }
    .bottom{
        position: absolute;
        width: 100vw;
        bottom: -50vh;
        background-color: #fff;
    }
</style>