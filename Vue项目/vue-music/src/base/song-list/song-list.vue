<template>
    <div class="song-list">
      <ul>
        <li @click="selectItem(song, index)" v-for="(song, index) in songs" class="item">
          <div class="content">
            <h2 class="name">{{song.name}}</h2>
            <p class="desc">{{getDesc(song)}}</p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        props: {
          songs: {
            type: Array,
            default: []
          }
        },
      methods: {
          getDesc(song) {
            return `${song.singer} - ${song.album}`
          },
          selectItem(item, index) {
            this.$emit('select', item, index)
          }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      -webkit-box-sizing: border-box
      -moz-box-sizing: border-box
      box-sizing: border-box
      height:64px
      font-size:$font-size-medium
    .content
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #fff;
      .desc
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 4px;
        color: hsla(0,0%,100%,.3);

</style>
