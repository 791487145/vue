    <template>
        <div class="money">
          <!--赏金选择组件-->
          <mt-popup v-model="show" position="bottom" :closeOnClickModal="closeOnClickModal">
            <section style="width:100%; height: 100%;">
              <div class="padding">
                <span @click="hidePicker">取消</span>
                <span @click="savemoney" class="float-right">完成</span>
              </div>
              <div class="selecttime">
                <div>
                  10元以下<input type="radio" name="money" value="1" v-model="moneyval">
                </div>
                <div>
                  10 ~ 50元<input type="radio" name="money" value="10" v-model="moneyval">
                </div>
                <div>
                  50 ~ 100元<input type="radio" name="money" value="50" v-model="moneyval">
                </div>
                <div>
                  100元以上<input type="radio" name="money" value="100" v-model="moneyval">
                </div>
              </div>
            </section>
          </mt-popup>
        </div>
      </template>
      
      <script>
        export default {
          name: 'missionmoney',
          props: {
            showmoney: Boolean,
          },
          created() {
            
          },
          mounted() {
            let vm = this
            vm.show = vm.showmoney
          },
          data() {
            return {
              show: false,
              closeOnClickModal: false,
              moneyval:'1',
            }
          },
          watch: {
            showmoney(old, val) {
              this.show = !val
            },
          },
          methods: {
            savemoney() { //保存所选
              let vm = this
              vm.show = false
              vm.$emit('savemoney',vm.moneyval);
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
      