import utils from 'utils'

const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  //permission_routers: state => state.permission.routers,
  //addRouters: state => state.permission.addRouters
  currentMusic: state => state.music.musicNow,
  playerDOM: state => state.music.dom,
  musicList: state => state.music.musicList,
  currentSecond: state => state.music.currentSecond,
  currentTimeFormat: state => utils.secondsToFormat(state.music.currentSecond), 
  durationSecond: state => state.music.duration,
  durationTimeFormat: state => utils.secondsToFormat(state.music.duration),
  nextSong: state => {
    let now = state.music.musicList.indexOf(state.musicNow)
    if(now == -1) {
      return state.music.musicList[0]
    }
    if(now+1 >= state.music.musicList.length) {
      return state.music.musicList[0]
    }
    return state.music.musicList[now+1]
  },
  prevSong: state => {
    let now = state.music.musicList.indexOf(state.musicNow)
    if(now == -1 || now == 0) {
      return state.music.musicList[0]
    }
    return state.music.musicList[now-1]
  },
  isShowMusicList: state => state.music.showList,
  getMusicPlace: state => state.music.musicList.indexOf(state.music.musicNow)
};
export default getters
