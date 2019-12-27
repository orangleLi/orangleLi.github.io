<template>
    <scroll class="listview"
            :data="data"
            ref="listview"
            :listenScroll="listenScroll"
            :probeType = 'probeType'
            @scroll="scroll"
    >

      <ul>
        <li v-for="group in data" class="list-group" ref="listGroup">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
              <!--v-lazy 是 vue-lazyload 这个插件的指令，用于图片懒加载-->
              <img v-lazy="item.avatar" class="avatar">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>

      <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
        <ul>
          <li v-for="(item, index) in shortcutList"
              class="item"
              :class="{'current': currentIndex === index}"
              :data-index="index">
            {{item}}
          </li>
        </ul>
      </div>

      <div class="list-fixed" v-show="fixedTitle" ref="fixed">
        <h1 class="fixed-title">{{fixedTitle}}</h1>
      </div>
    </scroll>
</template>

<script>
  import Scroll from '@/base/scroll/scroll'
  import {getData} from '@/common/js/dom'
// 锚点（热 A B C...）每一个的高度 height+padding
  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30
    export default {
        created() {
          this.touch = {},
          this.listenScroll = true,
          this.listHeight = [],
          this.probeType = 3
        },
        data() {
          return {
            // 实时滚动的位置
            scrollY: -1,
            currentIndex: 0,
            diff: -1
          }
        },
        props: {
          data: {
            type: Array,
            default: []
          }
        },
        computed: {
          shortcutList() {
            // map遍历 map可以改变当前循环的值，
            // 返回一个新的被改变过值之后的数组（map需return），一般用来处理需要修改某一个数组的值。
            return this.data.map((group) => {
              return group.title.substr(0, 1)
            })
          },
          fixedTitle() {
            if(this.scrollY > 0) {
              return ""
            }
            return this.data[this.currentIndex]?this.data[this.currentIndex].title:""
          }
        },
        methods: {
          selectItem(item) {
            this.$emit('select', item)
          },
          onShortcutTouchStart(e) {
            // 获得元素对应属性值  此处获得data-index的值
            let anchorIndex = getData(e.target, 'index')
            let firstTouch = e.touches[0] // 获取手指的位置
            this.touch.y1 = firstTouch.pageY
            this.touch.anchorIndex = anchorIndex
            this._scrollTo(anchorIndex)
          },
          onShortcutTouchMove(e) {
            let firstTouch = e.touches[0]
            this.touch.y2 = firstTouch.pageY
            // 偏移了几个锚点
            let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0  // |0 相当于向下取整
            let anchorIndex = parseInt(this.touch.anchorIndex) + delta
            this._scrollTo(anchorIndex)
          },
          refresh() {
            this.$refs.listview.refresh()
          },
          scroll(pos) {
            this.scrollY = pos.y
          },
          _scrollTo(index) {
            if(!index && index !== 0) {
              return
            }
            if (index < 0) {
              index = 0
            } else if(index > this.listHeight - 2) {
              index = this.listHeight - 2
            }
            this.scrollY = - this.listHeight[index]
            // scrollToElement 滚动到指定的目标元素。 第二个参数表示动画时间
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
          },
          // 计算 热 A B C ... Z每一个块距离顶部的高度
          _calculateHeight() {
            this.listHeight = []
            const list = this.$refs.listGroup
            let height = 0
            this.listHeight.push(height)
            for(let i=0; i<list.length;i++) {
              let item = list[i]
              height += item.clientHeight
              this.listHeight.push(height)
            }
          }
        },
        watch: {
            data() {
              setTimeout(() => {
                this._calculateHeight()
              }, 20)
            },
            // newY 为scrollY变化的值
            scrollY(newY) {
              const listHeight = this.listHeight
              // 当滚动到顶部，newY>0
              if(newY>0) {
                this.currentIndex = 0
                return
              }
              // 在中间部分滚动
              for (let i = 0;i < listHeight.length - 1; i++) {
                let height1 = listHeight[i]
                let height2 = listHeight[i + 1]
                if((-newY)>= height1 && -newY < height2) {
                  this.currentIndex = i
                  this.diff = height2 + newY
                  return
                }
              }
              // 滚动到底部，且-newY大于最后一个元素的上限
              this.currentIndex = listHeight.length - 2
            },
            diff(newVal) {
              let fixedTop = (newVal > 0 && newVal<TITLE_HEIGHT) ? newVal-TITLE_HEIGHT:0
              if(this.fixedTop === fixedTop) {
                return
              }
              this.fixedTop = fixedTop
              // translate3d(x,y,z) 基于原来的位置,沿X轴平移，长度为x,沿Y轴平移，长度为y,沿Z轴平移，长度为z
              this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
            }
        },
        components: {
          Scroll
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
