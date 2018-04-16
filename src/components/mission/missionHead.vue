<template>
    <div id="missionhead">
            <ul class="missionhead">
                <li>
                    <slot name="title"></slot>
                </li>
                <li>
                    <slot name="bounty"></slot>
                </li>
                <li>
                    <slot name="time"></slot><slot name="address"></slot><slot name="kind"></slot>
                </li>
            </ul>
    </div>
</template>
<script>
export default {
    name:'missionhead',
    data(){
         return {
         }
    },
    components:{},
   
}
</script>
<style scoped>
    .missionhead{
        padding: .9375rem;
        padding-bottom: 0;
        border-bottom: 1px solid #e6e6e6;
        background-color: #f1f5fa;
    }
    .missionhead b{
        font-weight: 800;
    }
    .missionhead>li{
        padding-bottom: .9375rem /* 15/16 */
    }
    .missionhead span{
        display: inline-block;
        width: 23vw;
    }
    .missionhead span img{
        float: left;
    }
</style>