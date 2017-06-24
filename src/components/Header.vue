<template>
  <div id="header">

      <div id="header-logo" class="hjbook-header-col">
        <router-link :to="{ path: '/' }" replace>
          <div class="logo">
            <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1909982463,2705094677&fm=23&gp=0.jpg">
          </div>
        </router-link>
      </div>
      <el-menu id="header-nav" class="hjbook-header-col" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
          <router-link :to="{ path: '/mycollection' }" replace>
            <i class="iconfont icon-yinle"></i>
            My Music
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link :to="{ path: '/musiccoffee' }" replace>
            <i class="iconfont icon-yinle"></i>
            Music coffee
          </router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <a href="http://www.lwio.me" target="_blank">My homepage</a>
        </el-menu-item>
      </el-menu>
      <div id="header-search" class="hjbook-header-col">
        <el-input id="hjbook-header-search"
        placeholder="search the book name" 
        icon="search" 
        v-model="searchContent" 
        :on-icon-click="handleIconClick">
        </el-input>
      </div>
      <div id="header-profile" class="hjbook-header-col">
        <el-dropdown v-if="user.userInfo.user_id" class="hjbook-header-profile" trigger="hover">
          <span class="el-dropdown-link hjbook-header-profile-avatar">
            <img src="http://img1.imgtn.bdimg.com/it/u=4042190513,2070669060&fm=23&gp=0.jpg" /> 
            <p>{{user.userInfo.username}}</p>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>
              <router-link :to="{ path: '/personal' }" replace>设置</router-link>
            </el-dropdown-item>  
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div v-else class="hjbook-header-sign">
            <p><router-link :to="{ path: '/login' }" replace>signin </router-link></p>
            <p><router-link :to="{ path: '/signup' }" replace> or Signup</router-link></p>
        </div>
      </div>
   
    <div class="line"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import util from '@/util'
export default {
  name: 'header',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      searchContent: '',
    };
  },
  computed: {
    ...mapState([
      'user'
    ]),
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleIconClick() {

    },
    logout() {
        util.storeWithExpiration.set('user', {username: null})
        this.$store.dispatch("loadUserInfo")
    }
  },
  mounted() {
      this.$store.dispatch("loadUserInfo")
  }
}
</script>

<style style lang="scss" scoped>
#header {
  display: flex;
  #header-logo {
    flex: 0 0 250px;
    background-color: #14284a;
  }
  ul#header-nav {
    display: flex;
    background-color: #ffffff;
    li {
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
      color: #828d9d;
      a {
        cursor: pointer;
      }
      &:hover {
        color: #184d77; 
        background: inherit;
      }
    }
  }
  #header-search {
    flex: 1;
    margin-left: auto;
    max-width: 400px
  }
  #header-profile {
    flex: 0 0 300px;
  }
}

.logo {
  display: flex;
  margin:auto;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 60px;
  img {
    height: 50px;
    width: 100%;
  }
}
.hjbook-header-col {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}
#hjbook-header-search {
  box-sizing: border-box;
}
.hjbook-header-profile {
  .hjbook-header-profile-avatar {
    display: flex;
    img {
      height: 36px;
      width: 36px;
      align-self: center;
      padding: 8px;
      border-radius: 23px;
    }

    p {
      display: inline-block;
    }
  }
}
a {
  color: #999;
  text-decoration: none;
  display: flex;
}
.hjbook-header-sign {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
    p {
        color: #aaa;
        a {
            &:hover {
                color: red;
            }
        }
    }
}
</style>
