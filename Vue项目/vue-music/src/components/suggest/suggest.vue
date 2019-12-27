<template>
    <scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore">
      <div>
        <ul class="suggest-list">
          <li class="suggest-item" v-for="(item, index) in result" @click="selectItem(item, index)">
            <div class="icon">
              <i :class="getIconCls(item)"></i>
            </div>
            <div class="name">
              <p class="text" v-html="getDisplayName(item)"></p>
            </div>
          </li>
        </ul>
        <div class="loading-container" v-show="hasMore && !result.length">
          <loading></loading>
        </div>
      </div>
    </scroll>
</template>

<script>
  import {searchByKey} from '@/api/search'
  import {ERR_OK} from "@/api/config";
  import {filterSinger} from '@/common/js/song'
  import Loading from "@/base/loading/loading";
  import Scroll from '@/base/scroll/scroll'
  import {createSong} from "@/common/js/song";
  import {mapMutations, mapActions} from 'vuex'

  const TYPE_SINGER = 'singer'
  const perPage = 20
  export default {
    components: {Loading,Scroll},
    props: {
          query: {
            type: String,
            default: ''
          },
          showSinger: {
            type: Boolean,
            default: true
          }
        },
        created() {
          this.touch = {}
        },
        data() {
          return{
            page: 1,
            result: [],
            pullup: true,
            hasMore: true
          }
        },
        methods: {
          selectItem(item, index) {
            this.selectPlay({
              list: this.result,
              index
            })
          },
          searchMore() {
            if (!this.hasMore)return
            this.page ++
            searchByKey(this.query, this.page, perPage).then((res) => {
              if (res.code === ERR_OK) {
                this.result = this.result.concat(this._genResult(res.data))
                this._checkMore(res.data)
              }
            })
          },
          search() {
            this.hasMore = true
            if (this.query.length === 0)return
            searchByKey(this.query, this.page, perPage).then((res) => {
              if (res.code === ERR_OK) {
                this.result = this._genResult(res.data)
                this._checkMore(res.data)
              }
            })
          },
          getDisplayName(item) {
            if (item.type === TYPE_SINGER) {
              return item.singername
            } else {
              return `${item.name}-${item.singer}`
            }
          },
          getIconCls(item) {
            if (item.type === TYPE_SINGER) {
              return 'icon-mine'
            } else {
              return 'icon-music'
            }
          },
          _genResult(data) {
            let ret = []
            if (data.zhida && data.zhida.singerid) {
              ret.push({...data.zhida, ...{type: TYPE_SINGER}})
            }
            if (data.song) {
              ret = ret.concat(this._normalizeSongs(data.song.list))
            }
            return ret
          },
          _normalizeSongs(list) {
            let ret = []
            list.forEach((musicData) => {
              if (musicData.songid && musicData.albummid) {
                ret.push(createSong(musicData))
              }
            })
            return ret
          },
          _checkMore(data) {
            // console.log(data)
            const song = data.song
            if (!song.list.length || (song.curnum + song.curpge * 20) > song.totalnum) {
              this.hasMore = false
            }
          },
          ...mapMutations({
            setSinger: 'SET_SINGER'
          }),
          ...mapActions([
            'selectPlay',
            'randomPlay'
          ])
        },
        watch: {
            query() {
              this.search()
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
