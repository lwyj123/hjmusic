<template>
  <div class="playlist">
    <header>
      <div class="brief-wrap">
        <img class="cover" src="#">
        <div class="brief-container">
          <div class="title">
            <i class="el-icon-caret-right"></i>
            <h2>my like</h2>
          </div>
          <div class="user">
            <img src="#">
            <span><a href="/user/1">lwio</a></span>
            <span>created at 2015-02-24</span>
          </div>
          <div class="btns">
            <el-button type="primary" icon="caret-right">Play</el-button>
          </div>
        </div>
      </div>
      <div class="brief-footer">
        <h3>music list</h3>
        <span class="music-count">20 music</span>
        <span class="play-count">played: 10 times</span>
      </div>
    </header>
  </div>
</template>

<script>

  export default {
    name: 'musician',
    components: { 
    },
    data() {
      return {
        
      }
    },
    computed: {
      
    },
    created() {
      
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  .playlist {
    header {
      .brief-wrap {
        display: flex;
        padding: 0 40px;
        margin-bottom: 40px;
        img.cover {
          width: 200px;
          height: 200px;
          outline: 1px solid black;
          border: 4px solid transparent;
        }
        .brief-container {
          margin-left: 30px;
          text-align: initial;
          img {
            
          }
          .title {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }
          .user {
            margin-bottom: 20px;

          }
          .btns {
            margin-bottom: 20px;

          }
        }
      }
      .brief-footer {
        display: flex;
        align-items: center;
        border-bottom: 2px solid #c20c0c;
        h3 {
          margin-right: 20px;

          font-size: 20px;
          line-height: 28px;
        }
        span.music-count {
          font-size: 12px;

        }
        span.play-count {
          margin-left: auto;

          font-size: 12px;
        }
      }
    }
  }
</style>