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
    <div class="playlist-content">
      <el-table
        :data="tableData"
        :stripe="true"
        border
        style="width: 100%">
        <el-table-column
          label=" "
          width="90">
          <template scope="scope">
            <span>{{ scope.row.id }}</span>
            <icon-svg iconClass="quanxian" @click.native="playMusic(scope.$index, scope.row)"></icon-svg>
          </template>
        </el-table-column>
        <el-table-column label="Music Title">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="duration"
          width="100">
          <template scope="scope">
            <span>8:21</span>
          </template>
        </el-table-column>
        <el-table-column 
          label="singer/musician"
          width="150">
          <template scope="scope">
            <span>scope.row.singer.name</span>
          </template>
        </el-table-column>
        <el-table-column 
          label="album"
          width="120">
          <template scope="scope">
            <span>scope.row.album.name</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import utils from 'utils'
  import {mapActions,mapGetters} from 'vuex'
  export default {
    name: 'musician',
    components: { 
    },
    data() {
      return {
        tableData: [{
          id: '123',
          name: "fuck",
          avatar_url: "",
          singer: {
              id: '1',
              name: 'adyden'
          },
          composer: {
              id: '3',
              name: 'fuck'
          },
          lyricist: {
              id: '3',
              name: 'fuck',
          },
          lyrics_url: "https://api.darlin.me/music/lyric/12/",
          album: {
              id: '5',
              name: 'album test',
              avatar_url: "",
              songs: 12,
          },
          src: "http://data.5sing.kgimg.com/G076/M06/1B/08/jA0DAFgfIK2AMyUrAHbW0BlymFg674.mp3",
          published_at: "2009-01-17T20:14:40Z"
        }, {
          id: '123',
          name: "miaomiao",
          avatar_url: "",
          singer: {
              id: '1',
              name: 'adyden'
          },
          composer: {
              id: '3',
              name: 'fuck'
          },
          lyricist: {
              id: '3',
              name: 'fuck',
          },
          lyrics_url: "https://api.darlin.me/music/lyric/15/",
          album: {
              id: '5',
              name: 'album test',
              avatar_url: "",
              songs: 12,
          },
          src: "http://data.5sing.kgimg.com/G112/M03/1F/01/UJQEAFliTsWACRTxAEC2iJqFNRI680.mp3",
        }],
      }
    },
    computed: {
      
    },
    created() {
      
    },
    methods: {
      ...mapActions(['addSongToList']),
      playMusic(index, row) {
        console.log(index, row);
        this.addSongToList(utils.getPureObj(row))
      },
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
    .playlist-content {
      
    }
  }
</style>