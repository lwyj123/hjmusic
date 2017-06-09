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
            <li class="hj-playBar-main">
                <h1 class="songName">{{songInfo.name}}</h1>
                <div class="progress">
                    <div class="start-time">1:00</div>
                    <div @click="changeTime($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" ref="progressBar" class="progress-bar">
                        <div style="width: 10%" class="now"></div>
                    </div>
                    <div class="end-time">2:00</div>
                </div>
            </li>
            <li class="hj-playBar-funcbtns">
                <button id="playBar-showList" @click="toggleMusicList()">&#xe613;</button>                
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
            ...mapActions(['toggleMusicList']),
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
    flex-direction: column;
    align-items: center;
    position: fixed;
    bottom: 0;
    padding: 0;
    margin: auto;
    background-color: transparent;
    width: 100%;
    box-sizing: border-box;
    ul.hj-playbar {
        display: flex;
        box-sizing: border-box;
        padding: 10px 50px;
        align-items: center;
        width: 100%;
        margin: auto;
        background-color: #1d1d1d;
        li.hj-playBar-playbtns {
            flex:0 0 100px;
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
        li.hj-playBar-main {
            flex: 1;
            h1 {
                font-family: "Helvetica Neue","Hiragino Sans GB","Microsoft Yahei",Helvetica,Arial,sans-serif;
            }
            .progress {
                display: flex;
                justify-content: center;
                align-items: center;

                    color: #fff;
                    opacity: .3;
                .progress-bar {
                    position: relative;
                    width: 50%;
                    height: 5px;
                    background-color: hsla(0,0%,100%,.5);
                    border-radius: 3px;
                    margin: 0 20px;
                    cursor: pointer;
                }
                .now {
                    position: absolute;
                    left: 0;
                    display: inline-block;
                    max-width: 100%;
                    height: 5px;
                    background-color: #31c27c;  
                }
            }
        }
        li.hj-playBar-funcbtns {
            flex: 0 0 100px;
        }
    }
}

</style>
