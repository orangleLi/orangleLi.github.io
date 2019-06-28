<template>
    <div class="filter-container">
      <div class="titleGroup" @click.prevent.stop="showFilterModal">
        <img class="leftImg" :src="listInfo.icon"/>
        <span class="title">{{listInfo.title}}</span>
        <div class="rightImg"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'listFilter',
  props: {
    listInfo: {}
  },
  data () {
    return {
      showInfo: {},
      filterModalIsShow: false
    };
  },
  mounted () {
    // this.showInfo = this.listInfo.list;
  },
  methods: {
    showFilterModal () {
      let that = this;
      that.filterModalIsShow = true;
      console.log({
        tag: that.listInfo.tag,
        filterModalIsShow: that.filterModalIsShow
      });
      that.$emit('showFilterModal', {
        tag: that.listInfo.tag,
        filterModalIsShow: that.filterModalIsShow
      });
    }
  },
  components: {
  }
};
</script>

<style scoped>
  .filter-container:after{
    content: '';
    position: absolute;
    left: auto;
    bottom: auto;
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: rgb(229,229,230);
    display: block;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
  }
  .filter-container{
    color: rgb(107, 107, 107);
    display: flex;
    justify-content: center;
    flex: 1;
    position: relative;
  }
  .titleGroup{
    display: flex;
    align-items: center;
    background-color: #fff;
    /*padding: 0 15px;*/
    position: relative;
  }
  .title{
    margin: 12px 5px 12px 0;
  }
  .leftImg{
    margin-right: 10px;
    width: 0.3rem;
    height: 0.3rem;
  }
  .rightImg{
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgb(154, 154, 154);
  }
</style>
