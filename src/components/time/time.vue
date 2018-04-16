<template>
        <div class="time">
          <!--地址选择组件-->
          <mt-popup v-model="show" position="bottom" :closeOnClickModal="closeOnClickModal">
            <section style="width:100%; height: 100%;">
              <div class="padding">
                <span @click="hidePicker">取消</span>
                <span @click="saveTime" class="float-right">完成</span>
              </div>
              <div class="selecttime">
                <div>
                  1小时: <input type="radio" name="time" value="1小时" v-model="inTimeVal">
                </div>
                <div>
                  不&nbsp;&nbsp;限<input type="radio" name="time" value="不限" v-model="inTimeVal">
                </div>
              </div>
            </section>
          </mt-popup>
        </div>
      </template>
      
      <script>
        export default {
          name: 'time',
          props: {
            showTime: Boolean,
            intime: String
          },
          created() {
            if (this.intime) {
              this.inTimeVal = this.intime
            }
          },
          mounted() {
            let vm = this
            vm.show = vm.showTime
          },
          data() {
            return {
              show: true,
              inTimeVal: '1小时',
              closeOnClickModal: false
            }
          },
          watch: {
            showTime(old, val) {
              this.show = !val
            },
            inTimeVal(val){
              console.log(val);
            }
          },
          methods: {
            saveTime() { //保存所选地区
              let vm = this
              vm.show = false
              vm.$emit('saveTime', vm.inTimeVal);
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
        }
        
        .float-right {
          float: right;
        }
        .selecttime{
          display: flex;
          justify-content: space-around;
        }
      </style>
      