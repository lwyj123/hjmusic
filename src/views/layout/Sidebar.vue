<template>
	<el-menu mode="vertical" theme="dark" :default-active="$route.path">
		<sidebar-item :routes='permission_routers'></sidebar-item>
	</el-menu>
</template>

<script>
  import { mapGetters } from 'vuex';
  import SidebarItem from './SidebarItem';
  export default {
    components: { SidebarItem },
    data() {
      return {
        permission_routers: [
          {
            path: '',
            name: 'Index',
            icon: 'quanxian',
            noDropdown: true,
            children: [{ path: 'dashboard', name: 'index'}]
          },
          {
            path: '/my',
            name: 'My',
            icon: 'quanxian',
            noDropdown: true,
            children: [
              { 
                path: 'music', 
                name: 'my',
                redirect: '/my/music/musician',
              },
            ]
          },
        ]
      }
    },
    computed: {
      /*...mapGetters([
        'permission_routers'
      ])*/
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-menu {
			min-height: 100%;
	}
</style>
