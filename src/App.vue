<template>
  <div id="app">
    <router-view class="header" name="header"></router-view>
    <div class="body">
      <router-view class="leftnav" name="leftnav"></router-view>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <router-view class="footer" name="footer"></router-view>
    
    <!--音频播放标签-->
    <audio src="" ref="audio" autoplay="autoplay" @ended="" @timeupdate="syncCurrentTime" @canplay=""></audio>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  name: 'app',
  components:{
    
  },
  data() {
    return {
      
    }
  },
  methods: {

  },
  mounted() {
  },

}
</script>

<style lang="scss">
@import "../static/style/public.scss";
@import './common/style/index.scss'; // 全局自定义的css样式`
#app {
  
}
</style>
