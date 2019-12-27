import {playMode} from '@/common/js/config'
// 状态管理
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],  // 顺序播放
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {}
}

export default state
