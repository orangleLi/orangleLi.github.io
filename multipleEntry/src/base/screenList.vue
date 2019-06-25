<template>
    <div class="screenList-wrapper">
      <ul>
        <li class="lineBorderAfter" v-for="(item, index) in screenList.list" :key="item.id">
          <span :class="item.isSelect ? 'myicon-tick-checked' : 'myicon-tick-uncheck'" @click.prevent.stop="selectSpan(index)"></span>
          <span>{{item.title}}</span>
        </li>
      </ul>
      <div class="buttonGroup"><button class="cancel" @click.prevent.stop="cancelBtn">取消</button> <button class="confirm" @click.prevent.stop="confirmBtn">确定</button></div>
    </div>
</template>

<script>
export default {
  name: 'screenList',
  props: {
    screenListModalIsShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      screenList: {
        tag: 1,
        title: '筛选',
        list: [
          {
            title: '促销',
            isSelect: false,
            child: []
          },
          {
            title: '货到付款',
            isSelect: false,
            child: []
          }
        ]
      }
    };
  },
  methods: {
    selectSpan (index) {
      // this.isSelect = !this.isSelect;
      this.screenList.list[index].isSelect = !this.screenList.list[index].isSelect;
    },
    confirmBtn () {
      let data = [];
      this.screenList.list.forEach((item) => {
        if (item.isSelect) {
          data.push(item.title);
        }
      });
      this.$emit('transmitData', {
        screenList: true,
        data: data
      });
    },
    cancelBtn () {
      this.$emit('closeScreenListModal');
    }
  }
};
</script>

<style scoped>
  .screenList-wrapper{
    background-color: #fff;
    padding-bottom: 15px;
    width: 100%;
  }
  .screenList-wrapper li{
    height: 42px;
    line-height: 42px;
    position: relative;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content:space-between;
  }
  .buttonGroup{
    margin: 15px 15px 0 0;
    display: flex;
    justify-content: flex-end;
  }
  .buttonGroup button{
    width: 55px;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    height: 25px;
    border: 1px solid #eee;
  }
  .cancel{
    background-color: #fff;
    color: rgb(107, 107, 107);
  }
  .confirm{
    color: #fff;
    margin-left: 15px;
    background-color: rgb(255, 92, 30);
  }
  /**绿色勾*/
  .myicon-tick-checked {
    display: inline-block;
    position: relative;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: rgb(255, 92, 30);
  }
  /**灰色勾*/
  .myicon-tick-uncheck {
    display: inline-block;
    position: relative;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #eee;
  }
  .myicon-tick-checked:before, .myicon-tick-checked:after,.myicon-tick-uncheck:before,.myicon-tick-uncheck:after {
    content: '';
    pointer-events: none;
    position: absolute;
    color: white;
    border: 1px solid;
    background-color: white;
  }
  .myicon-tick-checked:before,.myicon-tick-uncheck:before {
    width: 1px;
    height: 1px;
    left: 25%;
    top: 50%;
    transform: skew(0deg,50deg);
  }
  .myicon-tick-checked:after,.myicon-tick-uncheck:after {
    width: 3px;
    height: 1px;
    left: 45%;
    top: 42%;
    transform: skew(0deg,-50deg);
  }
</style>
