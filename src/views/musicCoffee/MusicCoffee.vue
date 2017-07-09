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

// webrtc connection configuration
var pc_config = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

function failed(code) {
    console.log("Failure callback: " + code);
}
export default {
    data() {
        return {
            context: null,
            isdragging: false,
            mediaBuffer: null,
            mediaSource: null,

            myId: null,
            peers: {},
            remoteDestination: null,
            mediaDescription: null,
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
            this.remoteDestination = this.context.createMediaStreamDestination();
            this.mediaSource.connect(this.remoteDestination);

            // 向所有节点添加流(播放)
            for (var peer in this.peers) {
                startPlayingIfPossible(peer);
            }
        },
        // checks if media is present and starts streaming media to a connected listener if possible
        startPlayingIfPossible(from) {
            var self = this;
            // add the stream to the peerconnection for this connection
            if (this.mediaSource && this.remoteDestination) {
                var constraints = { mandatory: {}, optional: [] };
                // constraints.optional[0] = { 'bandwidth' : 100 }; // does not seem to influence quality
                this.peers[from].peerconnection.addStream(remoteDestination.stream, constraints);
                this.peers[from].stream = remoteDestination.stream;
                this.peers[from].peerconnection.createOffer(function(desc) {
                    self.gotDescription(from, desc);
                }, failed);

                this.sendMediaDescription(this.peers[from].dataChannel);
            }
        },
        // Sends media meta information over a rtc data channel to a connected listener
        sendMediaDescription(channel) {
            if (this.mediaDescription && channel.readyState === 'open') {
                var data = JSON.stringify(this.mediaDescription);
                channel.send(data);
            }
        },
        // is called when SDP is received from a connected listener
        gotDescription(from, desc) {
            this.peers[from].peerconnection.setLocalDescription(desc);
            this.$socket.emit('message', { from: this.myId, to: from, data: { type: 'sdp', sdp: desc } });
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
                console.log(`peers is ${JSON.stringify(self.peers)}`);
            },2000)
            window.onbeforeunload = function() {

            }
        },
        // when a listener logs on to the sessions we'll setup webrtc signalling for the session and check if we can start
        logon(message) {
            var self = this;
            var pc = new RTCPeerConnection(pc_config, { optional: [ { RtpDataChannels: true } ]});

            pc.onicecandidate = function(event) {
                self.$socket.emit('message', { from: this.myId, to: message.from, data: { type: 'candidate', candidate: event.candidate } } );
            }

            var from = message.from;
            this.peers[from] = { peerconnection: pc, stream: undefined };

            // create a data channel for sending the media description
            this.peers[from].dataChannel = this.peers[from].peerconnection.createDataChannel('mediaDescription', { reliable: true });
            this.peers[from].dataChannel.onopen = function() {
                startPlayingIfPossible(from);
            };

            this.peers[from].peerconnection.createOffer(function(desc) {
                self.gotDescription(from, desc);
            }, failed);

        },
        // when a listener leaves remove the rtc stream for that peer
        logoff(message) {
            try {
                this.peers[message.from].peerconnection.removeStream(this.peers[message.from].stream);
            } catch (err) {

            }

            this.peers[message.from].stream = undefined;
            delete this.peers[message.from]
        },
        error(error) {
            alert(error)
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