<template>
    <div class="tasktime">
      <!--时间选择组件-->
      <mt-popup v-model="show" position="bottom" :closeOnClickModal="closeOnClickModal">
        <section style="width:100%; height: 100%;">
          <div class="padding">
            <span @click="hidePicker">取消</span>
            <span @click="saveTaskTime" class="float-right">完成</span>
          </div>
          <div class="selecttime">
            <div>
              30分钟<input type="radio" name="time" value="30" v-model="inTimeVal">
            </div>
            <div>
              60分钟<input type="radio" name="time" value="60" v-model="inTimeVal">
            </div>
            <div>
              90分钟<input type="radio" name="time" value="90" v-model="inTimeVal">
            </div>
            <div>
              120分钟<input type="radio" name="time" value="120" v-model="inTimeVal">
            </div>
           
          </div>
        </section>
      </mt-popup>
    </div>
  </template>
  
<script>
    export default {
      name: 'tasktime',
      props: {
        showTime: Boolean,
      },
      created() {
       
      },
      mounted() {
        let vm = this
        vm.show = vm.showTime
      },
      data() {
        return {
          show: false,
          inTimeVal: '1',
          closeOnClickModal: false,
        }
      },
      watch: {
        showTime(old, val) {
          this.show = !val
        },
      },
      methods: {
        saveTaskTime() { //保存所选
          let vm = this
          vm.show = false
          vm.$emit('saveTaskTime', vm.inTimeVal);
        },
        hidePicker() { // 取消选择
          this.$emit('hide-picker', false);
        },
      }
    }
  
  </script>
  
  <style scoped>
    .mint-popup {
      width: 100%;
    }
    
    .footer-btn {
      box-sizing: border-box;
      position: fixed;
      width: 100%;
      z-index: 2;
      left: 0;
      bottom: 3rem;
    }
    
    .input {
      border: none;
    }
    
    .padding {
      padding: 15px;
      font-size: 1rem /* 16/16 */;
      color: #999;
    }
    
    .float-right {
      float: right;
    }
    .selecttime{
      padding: 0 1rem;
    }
    .selecttime div{
       height: 2.215rem;
      font-size: 1rem /* 16/16 */;
    }
    .selecttime input{
      float: right;
    }
  </style>
  