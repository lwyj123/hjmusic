<template>
  <div id="leftnav">
    <p>1231</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import util from '@/util'
export default {
  name: 'leftnav',
  data() {
    return {
      
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
  },
  mounted() {
    
  }
}
</script>

<style style lang="scss" scoped>
#leftnav {
  flex: 0 0 250px;
}
</style>
