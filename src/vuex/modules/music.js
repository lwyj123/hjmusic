import utils from '@/utils'

// divider
const music = {
  state: {
    musicList: [],
    dom: null, // audio dom element
    musicNow: {},
    lyricNow: '',
    isPlaying:false,
    currentSecond:0,//音乐播放进度
    duration:0,//音乐长度
    showList:false,//播放列表状态
  },
  mutations: {
    SETPLAYERDOM: (state, audio) => {
        state.dom = audio
    },
    INITSONG: (state, music) => {
      // whether music is undefined
      if(!music) {
          return
      }
      state.musicNow = music
      state.currentSecond = 0
      state.isPlaying = true
      state.dom.src= state.musicNow.src
      state.dom.onloadedmetadata = () => {
          state.duration = state.dom.duration
      }
      state.dom.load()
    },
    PLAYSONG: (state) => {
      if(state.isPlaying) {
          return;
      }
      state.isPlaying = true
      state.dom.play()
    },
    PAUSESONG: (state) => {
      if(!state.isPlaying) {
          return;
      }
      state.isPlaying = false
      state.dom.pause()
    },
    TOGGLEMUSICLIST: (state) => {
      state.showList = !state.showList
    },
    SETCURRENTTIME: (state, time) => {
      state.currentSecond = time
    },
    SYNCCURRENTTIME: (state) => {
      state.currentSecond = state.dom.currentTime
    },
    ADDSONGTOLIST: (state, music) => {
      state.musicList.push(music)
    },
    DELSONG: (state, music_index) => {
      state.musicList.splice(music_index, 1)
    },
    GETLYRIC: (state, lyric_obj) => {
      state.lyricNow = lyric_obj
    }
  },
  actions: {
    toggleMusicList:({ commit }) => {commit('TOGGLEMUSICLIST')},
    setPlayerDOM:({ commit, state }, audio) => {commit('SETPLAYERDOM', audio)},
    syncCurrentTime: ({ commit }) => {commit('SYNCCURRENTTIME')},
    playSong: ({ commit }) => {
      commit('PLAYSONG')
    },
    pauseSong: ({ commit }) => {
      commit('PAUSESONG')
    },
    initSong: ({ commit }, music) => {
      commit('INITSONG', music)
    },
    addSongToList: ({ commit }, music) => {
      commit('ADDSONGTOLIST', music)
    },
    delSong: ({ commit }, music_index) => {
      commit('DELSONG', music_index)
    },
    getLyric_url: ({ commit }, lyric_url) => {
      api.getLyrics_url(lyric_url).then(function(response) {
          commit('GETLYRIC', response)
      }).catch(function(error) {
          console.log(error);
      })
    },
  }
};

export default music;
