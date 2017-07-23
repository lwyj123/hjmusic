<template>
  <div class="mymusic-container">
    <!-- <component v-bind:is="currentRole"> </component> -->
    <el-row>
      <el-col class="menu-container" :span="8">
        <el-menu :router="true" :default-active="$route.path" @open="handleOpen" @close="handleClose">
          <el-menu-item index="/my/music/musician" :route="{path: '/my/music/musician'}">
            <i class="el-icon-setting"></i>Musician
          </el-menu-item>
          <el-submenu index="/my/music/playlist">
            <template slot="title"><i class="el-icon-message"></i>Playlist</template>
            <el-menu-item-group>
              <el-menu-item v-for="list of lists" 
                :index="'playlist-' + list.id"
                :route="{path: '/my/music/playlist?id='+list.id}">
                {{list.name}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col class="content-container" :span="16">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    name: 'dashboard',
    components: { },
    data() {
      return {
        lists: [{
          id: 3,
          name: 'keke',
        }, {
          id: 4,
          name: 'wanse',
        }]
      }
    },
    computed: {
      
    },
    created() {
      
    },
    
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  .mymusic-container {
    max-width: 1280px;
    margin: auto;
    padding-bottom: 100px;
    min-height: calc(100vh - 101px);
    .el-row {
      .el-col.menu-container .el-menu {
      }
      .el-col.content-container > div {
        padding-top: 40px;
      }
    }
  }
</style>