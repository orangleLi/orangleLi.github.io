<template>
  <div class="mask" v-if="isShow" @click.stop.prevent="showFilterModal">
    <div class="listGroup" v-if="showModalTag===1">
      <ul-list @showChild="showChild" :childId="childIdArr[0]" :list="showInfo" :childIsShow="childIsShow"></ul-list>
      <ul-list @showChild="showChild" :childId="childIdArr[1]" v-if="childIsShow" :childIsShow="childIsShow" :list="showInfo[nowIndex].child"></ul-list>
    </div>
    <div class="listGroup" v-if="showModalTag===2">
      <screen-list @closeScreenListModal.prevent.stop="closeScreenListModal" @transmitData="transmitData"></screen-list>
    </div>
  </div>
</template>

<script>
import ulList from '@/base/ulList';
import screenList from '@/base/screenList';
export default {
  name: 'childListFilter',
  props: {
    showModalTag: {
      type: Number,
      default: 1
    },
    showInfo: {
      type: Array,
      default: function () {
        return [];
      }
    },
    isShow: false
  },
  data () {
    return {
      nowIndex: 0,
      childIdArr: [1, 2],
      childIsShow: false
    };
  },
  methods: {
    showFilterModal () {
      this.$emit('showFilterModal', {
        tag: -1,
        filterModalIsShow: false
      });
    },
    closeScreenListModal () {
      this.$emit('closeScreenListModal');
    },
    showChild (obj) {
      let index = obj.index;
      let childId = obj.childId;
      let len = obj.len;
      if (childId === 1) {
        if (!len) {
          this.selectData(index);
        } else {
          if (!this.childIsShow) {
            this.childIsShow = true;
          }
          if (index !== this.nowIndex) {
            this.nowIndex = index;
          }
        }
      } else {
        this.selectData(index, childId);
      }
    },
    selectData (index, childId) {
      console.log(childId);
      var data = '';
      if (childId === 2) {
        data = this.showInfo[this.nowIndex].child[index].title;
        // console.log(this.nowIndex);
        // console.log(this.showInfo[this.nowIndex].child[index].title);
      } else {
        data = this.showInfo[index].title;
        // console.log(data);
      }
      this.$emit('selectData', {
        data: data
      });
    },
    transmitData (res) {
      this.$emit('selectData', res);
    }
  },
  components: {
    ulList,
    screenList
  }
};
</script>

<style scoped>
  .mask{
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    color: rgb(107, 107, 107);
    z-index: 1003;
  }
  .listGroup{
    display: flex;
  }
</style>
