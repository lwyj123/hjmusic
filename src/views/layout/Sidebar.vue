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
            path: '/permission',
            redirect: '/permission/index',
            name: '权限测试',
            icon: 'quanxian',
            meta: { role: ['admin'] },
            noDropdown: false,
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
