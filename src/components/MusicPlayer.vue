<template>
    <div class="hj-player">
        <music-list></music-list>
        <ul class="hj-playbar">
            <li class="hj-playBar-playbtns">
                <button id="playBar-prevBtn"></button>
                <button id="playBar-playBtn" v-if="!playbarState.isPlaying" @click="play()"></button>
                <button id="playBar-stopBtn" v-else @click="stop()"></button>
                <button id="playBar-nextBtn"></button>
            </li>
            <li class="playBar_m">
                <h1 class="songName">{{songInfo.name}}</h1>
                <p class="singerName">{{songInfo.singer}}</p>
            </li>
            <li class="playBar_r">
                
            </li>
        </ul>
    </div>
</template>
<script>
    import MusicList from '@/components/MusicList'
    import {mapActions,mapGetters} from 'vuex'
    export default{
        data(){
            return{
                playbarState: {
                    isPlaying: false,
                },
                songInfo: {
                    name: "fuck",
                    singer: "fuckyou"
                }
            }
        },
        methods: {
            play() {
                this.playbarState.isPlaying = true
                console.log("now playing")
            },
            stop() {
                this.playbarState.isPlaying = false
                console.log("now stop")
            }
        },
        computed:mapGetters(['playBtnClass','currentTime','duration','songImg','songInfo']),
        components:{
            MusicList
        }
    }
</script>
<style lang="scss" scoped>
.hj-player {
    display: flex;
    position: fixed;
    bottom: 0;
    padding: 0;
    margin: auto;
    background-color: #1d1d1d;
    width: 100%;
    box-sizing: border-box;
    ul.hj-playbar {
        display: flex;
        padding: 10px 0;
        align-items: center;
        width: 980px;
        margin: auto;
        li.hj-playBar-playbtns {
            button {
                width: 30px;
                height: 30px;
                border: none;
                background-image: url(http://gtms03.alicdn.com/tps/i3/T1bMh.FxNXXXb_r3IF-72-730.png);
                background-color: transparent;
                cursor: pointer;

                &:focus {
                    outline: none;
                }
            }
            #playBar-prevBtn {
                background-position: 0 -90px;
            }
            #playBar-playBtn {

            }
            #playBar-stopBtn {
                background-position: 0 -30px;
            }
            #playBar-nextBtn {
                background-position: 0 -60px;
            }
        }
    }
}
    .playBar_box{
        display: flex;
        align-items: center;
        height: 14vh;
        overflow: hidden;
        padding-left: 1.5rem;
    }
    .playBar_l{
        height:16vw;
        width: 16vw;
        border: 2px #ccc solid;
        max-width: 90px;
        max-height: 90px;
    }
    .playBar_l img{
        width: 15vw;
        max-width: 86px;
        max-height: 86px;
    }
    .playBar_m{
        flex: 1;
        padding-left: 1.5rem;
    }
    .playBar_r button{
        font-size: 3rem;
        margin-right: 1.2rem;
    }
</style>
