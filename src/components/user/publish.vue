<template>
    <div id="remember">
        <ul>
            <li @click="openPicker">选择时间</li>
        </ul>

        <mt-datetime-picker ref="picker" type="date" v-model="pickerValue"></mt-datetime-picker>

    </div>
</template>
<script>
    export default {
        data(){
            return{
                pickerValue:new Date("January 12,1980 22:19:35")
            }
        },
        watch:{
            pickerValue () {
//                console.log(this.pickerValue)
            }
        },
        methods: {
            openPicker() {
                this.$refs.picker.open();
//                console.log(this.$refs.picker.open())
            }
        }
    };
</script>