import util from '@/util'
import { NEXTSONG } from '@/vuex/mutation-types'
import { PREVSONG } from '@/vuex/mutation-types'
import { PLAYSONG } from '@/vuex/mutation-types'
import { PAUSESONG } from '@/vuex/mutation-types'
import { TOGGLEMUSICLIST } from '@/vuex/mutation-types'
import { SETCURRENTTIME } from '@/vuex/mutation-types'

const state = {
    musicList: [],
    musicNow: {},
    isPlaying:false,
    currentTime:0,//音乐播放进度
    duration:0,//音乐长度
    showList:false,//播放列表状态
}
const getters = {
    getUserInfo: state => state.userInfo,
    showList: state => state.showList,
    currentTime: state => state.currentTime,
    duration: state => state.duration,
}
const mutations = {
    [PLAYSONG]: (state, music) => {
        state.musicNow = music
        isPlaying = true
    },
    [PAUSESONG]: (state) => {
        state.musicNow = {}
        isPlaying = false
    },
    [TOGGLEMUSICLIST]: (state) => {
        state.showList = !state.showList
    },
    [SETCURRENTTIME]: (state, time) => {
        state.currentTime = time
    },
}
const actions = {
    toggleMusicList:({ commit }) => {commit(TOGGLEMUSICLIST)},
    /*
    setUserInfo: ({ commit }, user) => {commit(SET_USER_INFO, user)},
    loadUserInfo({ commit }){
        let user = util.storeWithExpiration.get('user');
        if(!user){
            commit(SET_USER_INFO, {})
        } else {
            commit(SET_USER_INFO, user);
        }
    }
    */
}  

export default {
    state,
    getters,
    actions,
    mutations
};