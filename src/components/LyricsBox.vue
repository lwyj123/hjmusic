<template>
    <div class="hj-player">
        
    </div>
</template>
<script>
    import {mapActions,mapGetters} from 'vuex'
    export default{
        data(){
            return{
                
            }
        },
        components:{
            
        },
        methods: {
            ...mapActions(['toggleMusicList']),
            
        },
        computed: {
            ...mapGetters(['playBtnClass','currentTime','duration','songImg','songInfo']),
        }
    }
</script>
<style lang="scss" scoped>

</style>
