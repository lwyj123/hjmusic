<template>
  <div id="app">
    <router-view class="header" name="header"></router-view>
    <transition name="fade" mode="out-in">
      <router-view class="body"></router-view>
    </transition>
    <music-player class="player"></music-player>
    <!--音频播放标签-->
    <audio src="" ref="audio" autoplay="autoplay" @ended="" @timeupdate="syncCurrentTime" @canplay=""></audio>
  </div>
</template>

<script>
import MusicPlayer from '@/components/MusicPlayer'
import {mapActions,mapGetters} from 'vuex'//使用状态管理里的mapActions来传递方法，mapGetters来展示数据
export default {
  name: 'app',
  components:{
    MusicPlayer
  },
  data() {
    return {
      
    }
  },
  methods: {
    ...mapActions([
        'setPlayerDOM',
        'syncCurrentTime',//循环播放（自动下一曲）
    ]),
    change() {
      this.dialogTableVisible = true
      console.log("fuck")
    }
  },
  mounted() {
    this.$store.dispatch('setPlayerDOM',this.$refs.audio);
  },

}
</script>

<style lang="scss">
@import "../static/style/public.scss";
#app {
  display: flex;
  flex-direction: column;
  .header {

  }
  .body {
    flex: 1;
  }
  .player {

  }
}
</style>
