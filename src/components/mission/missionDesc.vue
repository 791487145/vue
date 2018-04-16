    <template>
        <div id="missionDesc">
            <div class="deschead">
                任务描述
            </div>
            <div class="desc">
                <slot name="desc"></slot>
                <slot name="time"></slot>
                <slot name="kuaidi"></slot>
                <slot name="kuaidinum"></slot>
            </div>
        </div>
    </template>
    <script>
    export default {
        name:'missionDesc',
        data(){
             return {

             }
        },
        components:{},
    }
    </script>
    <style scoped>
        #missionDesc{
            background-color: #f1f5fa;
            margin-bottom: .9375rem /* 15/16 */;
        }
        #missionDesc>div{
            padding: .9375rem /* 15/16 */;
        }
        .deschead{
            border-top: 1px solid #e6e6e6;
            border-bottom: 1px solid #e6e6e6;
            font-weight: 700;
        }
        .desc div{
            line-height: 1.2rem;
        }
    </style>