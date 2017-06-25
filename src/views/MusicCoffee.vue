<template>
    <div id="mc">
        <div class="mc-playboard" >
            <div class='mc-playboard-header'>
                <p class="marquee">
                    <span>The adhoahdiwa</span>
                </p>
            </div>
            <div
                class="mc-playboard-uploadbox"
                :class="{hover:isdragging}"
                @drop.prevent="uploadMusic($event)"
                @dragover.prevent="dragover($event)"
                @dragend="dragend()">
            </div>
        </div>
        <div class="mc-chatboard">
            
        </div>
        <audio id="player" autoplay/>
        </audio>
    </div>
</template>

<script>
import api from 'api'
export default {
    data() {
        return {
            context: null,
            isdragging: false,
            mediaBuffer: null,
            mediaSource: null,
        };
    },
    methods: {
        initConnection() {
            
        },
        dragover(event) {
            this.isdragging = true;
        },
        dragend() {
            this.isdragging = false;
        },
        uploadMusic(event) {
            let self = this

            // webrtc connection configuration
            var pc_config = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

            // keep track of peers and the id of this session
            var peers = {};
            var myId;



            // releasing the system audio resources
            this.context.close();
            this.context = new AudioContext();

            let file = event.dataTransfer.files[0]
            if (file.type.match('audio*')) {
                var reader = new FileReader()
                // read the mp3 and decode the audio.
                reader.onload = function(readEvent) {
                    self.context.decodeAudioData(readEvent.target.result)
                        .then(function(buffer) {
                            self.mediaBuffer = buffer;
                            self.playStream();
                        })
                };

                reader.readAsArrayBuffer(file);
            }
        },
        playStream(offset) {
            offset = offset ? offset : 0;
            this.mediaSource = this.context.createBufferSource();
            this.mediaSource.buffer = this.mediaBuffer;
            //this.mediaSource.start(0, offset / 1000);
            this.mediaSource.connect(this.context.destination);
            this.mediaSource.start();
            // setup remote stream
            //remoteDestination = context.createMediaStreamDestination();
            //this.mediaSource.connect(remoteDestination);

            /*for (var peer in peers) {
                startPlayingIfPossible(peer);
            }*/
        }
    },
    mounted: function(){
        this.initConnection();
        this.context = new AudioContext();
    },
    sockets: {
        connect() {
            console.log('connect')
            this.$socket.emit('getId');
        },
        disconnect() {
            console.log('disconnect')
        },
        yourId(id) {
            let self = this;
            this.myId = id;
            console.log('id = ' + id);
            setInterval(function() {
                self.$socket.emit('heartbeat', self.myId)
            },2000)
        },
    },

};
</script>


<style lang="scss" scoped>
// marquee waiting for modify
.marquee {
    width: 100%;
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    box-sizing: border-box;
    span {
        display: inline-block;
        padding-left: 100%;
        text-indent: 0;
        animation: marquee 15s linear infinite;
        &:hover {
            animation-play-state: paused;
        }   
    }
}
@keyframes marquee {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
}



#mc {
    display: flex;

}
.mc-playboard {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100%;
    background-color: #fff;
    .mc-playboard-header {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 140px;
        p.marquee {
            width: 130px;
            margin:auto;
        }

    }
    .mc-playboard-uploadbox {
        flex: 1;
        &.hover {
        background-color: green;
        }
    }
}
.mc-chatboard {
    flex: 1;
    height: 100%;
    background-color: #f2f7fa;
    border: solid 1px #d8e2e7;
}
button {
    width: 200px;
    height: 100px;
}
</style>