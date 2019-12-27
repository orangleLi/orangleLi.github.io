<template>
    <transition name="slide">123
      <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
    import MusicList from "@/components/music-list/music-list";
    import {ERR_OK} from "@/api/config";
    import {getTopSongList} from '@/api/rank'
    import {mapGetters} from 'vuex'
    import {createSong} from "@/common/js/song";
    export default {
      data() {
        return {
          songs: []
        }
      },
      created() {
        this._getTopSongList()
      },
      computed: {
        title() {
          return this.topList.topTitle
        },
        bgImage() {
          return this.topList.picUrl
        },
        ...mapGetters([
          'topList'
        ])
      },
      methods: {
        _getTopSongList() {
          if (!this.topList.id) {
            this.$router.push('/rank')
          } else {
            getTopSongList(this.topList.id).then((res) => {
              if(res.code === ERR_OK) {}
              this.songs = this._normalizeSongs(res.songlist)
            })
          }
        },
        _normalizeSongs(list) {
          let ret = []
          list.forEach((musicData) => {
            var song = musicData.data
            if(song.songid && song.albumid) {
              ret.push(createSong(song))
            }
          })
          return ret
        }
      },
      components: {MusicList}
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
