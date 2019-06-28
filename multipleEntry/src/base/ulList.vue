<template>
    <div class="list">
      <ul class="content lineBorderRight" :style="childIsShow? '' : 'width: 50%'">
        <li class="lineBorderAfter" v-for="(item, index) in list" :key="item.id" @click.prevent.stop="showChild(index, item.child)">
          <span>{{item.title}}</span>
          <span class="allSumChild">{{item.child.length ? item.child.length : ""}}</span>
          <div class="toChild" v-if="item.child.length > 0"></div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'ulList',
  props: {
    childId: {
      type: Number,
      default: 0
    },
    childIsShow: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  methods: {
    showChild (index, child) {
      console.log(child);
      let that = this;
      that.$emit('showChild', {
        index: index,
        childId: that.childId,
        len: child.length
      });
    }
  }
};
</script>

<style scoped>
  .list{
    background-color: #eee;
    width: 100%;
  }
  .content{
    background-color: #fff;
    font-size: 15px;
    min-height: 6rem;
    position: relative;
    max-height: 8.4rem;
    overflow-y: scroll;
  }
  li{
    height: 42px;
    line-height: 42px;
    position: relative;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content:space-between;
  }
  .toChild{
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid rgb(154, 154, 154);
  }
</style>
