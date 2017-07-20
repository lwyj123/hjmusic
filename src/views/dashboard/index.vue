<template>
  <div class="dashboard-container">
    <component v-bind:is="currentRole"> </component>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import AdminDashboard from './admin/index';
  import DefaultDashboard from './default/index';

  export default {
    name: 'dashboard',
    components: { AdminDashboard, DefaultDashboard },
    data() {
      return {
        currentRole: 'AdminDashboard'
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'email',
        'introduction',
        'roles'
      ])
    },
    created() {
      if (this.roles.indexOf('admin') >= 0) {
        return;
      }
      this.currentRole = 'DefaultDashboard';
    }
  }
</script>
