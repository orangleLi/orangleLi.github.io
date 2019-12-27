<template>
    <div ref="wrapper">
      <slot></slot>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
      props: {
        probeType: {
          type: Number,
          default: 1
        },
        click: {
          type: Boolean,
          default: true,
        },
        data: {
          type: Array,
          default: null
        },
        //是否监听scroll事件
        listenScroll: {
          type: Boolean,
          default: false
        },
        // 是否开启上拉刷新
        pullup: {
          type: Boolean,
          default: false
        }
      },
      mounted() {
          setTimeout(() => {
            this._initScroll();
          }, 20)
      },
      methods: {
        _initScroll() {
          if(!this.$refs.wrapper) {
            return;
          }
          this.scroll = new BScroll(this.$refs.wrapper, {
            // 有时候我们需要知道滚动的位置。
            // 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
            // 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
            // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
            probeType: this.probeType,
            click: this.click
          })

          if(this.listenScroll) {
            let me = this
            this.scroll.on('scroll', (ops) => {
              // ops.y 值为负数
              me.$emit('scroll', ops)
            })
          }

          if(this.pullup) {
            this.scroll.on('scrollEnd', () => {
              if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                this.$emit('scrollToEnd')
              }
            })
          }
        },
        // 启用 better-scroll, 默认 开启。
        enable() {
            this.scroll && this.scroll.enable()
        },
        // 禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。
        disable() {
            this.scroll && this.scroll.disable()
        },
        // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        // 滚动到指定的位置
        scrollTo() {
          this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        // 滚动到指定的目标元素。
        scrollToElement() {
          this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
      },
      watch: {
          data() {
            setTimeout(() => {
              this.refresh()
            })
          }
      }
    }
</script>

<style scoped>

</style>
