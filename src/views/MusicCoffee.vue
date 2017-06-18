<template>
    <div>
        <div id="holder" 
            :class="{hover:isdragging}"
            @drop.prevent="uploadMusic($event)"
            @dragover.prevent="dragover($event)"
            @dragend="dragend()">
        </div>
        <button @click="uploadMusic()">uploadMusic</button>
        <audio controls id="player" autoplay/>
            Your browser does not support the audio element.
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
        dragover(event) {
            this.isdragging = true;
        },
        dragend() {
            this.isdragging = false;
        },
        uploadMusic(event) {
            let self = this
            let file = event.dataTransfer.files[0]
            if (file.type.match('audio*')) {
                var reader = new FileReader()

                // read the mp3 and decode the audio.

                reader.onload = (function(readEvent) {
                    self.context.decodeAudioData(readEvent.target.result, function(buffer) {
                        self.mediaBuffer = buffer;
                        self.playStream();
                    });
                });

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
        this.context = new AudioContext();
    },
    socket: {
        connect() {
            console.log('connect')
        },
        disconnect() {
            console.log('disconnect')
        }
    },

};
</script>


<style lang="scss" scoped>
#holder {
    width: 300px;
    height: 300px;
    background-color: red;
    &.hover {
        background-color: green;
    }
}
button {
    width: 200px;
    height: 100px;
}
</style>