<template>
  <div id="app">
    <router-view name="header"></router-view>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <music-player></music-player>
    <!--音频播放标签-->
    <audio src="" ref="audio" autoplay="autoplay" @ended="loopPlayback" @timeupdate="getcurrentTime" @canplay="getDuration"></audio>
  </div>
</template>

<script>
import MusicPlayer from '@/components/MusicPlayer'
export default {
  name: 'app',
  components:{
    MusicPlayer
  },
  data() {
    return {
      dialogTableVisible: false,
      gridData: [{
        date: '2016-05-02',
        bookname: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        bookname: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        bookname: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        bookname: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
    }
  },
  methods: {
    change() {
      this.dialogTableVisible = true
      console.log("fuck")
    }
  },
  mounted() {
  },

}
</script>

<style>
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; } 
body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; } 
h1, h2, h3, h4, h5, h6{ font-size:100%; } 
address, cite, dfn, em, var { font-style:normal; } 
code, kbd, pre, samp { font-family:couriernew, courier, monospace; } 
small{ font-size:12px; } 
ul, ol { list-style:none; } 
a { text-decoration:none; } 
a:hover { text-decoration:underline; } 
sup { vertical-align:text-top; } 
sub{ vertical-align:text-bottom; } 
legend { color:#000; } 
fieldset, img { border:0; } 
button, input, select, textarea { font-size:100%; } 
table { border-collapse:collapse; border-spacing:0; }


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.divider {
  width: 80%;
  margin:0 auto;
  border-bottom: 1px solid black;
}
.hjbook-tester {
    background-color: #58b7ff;
    position: fixed;
    right: 100px;
    bottom: 150px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    cursor: pointer;
    opacity: .4;
}
a {
  color: inherit;
  text-decoration: none;
}
ul, ol {
  list-style-type: none;
}
</style>
