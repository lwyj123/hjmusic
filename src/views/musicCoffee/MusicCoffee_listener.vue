<template>
    <div id="mc">
        <div class="mc-playboard" >
            <div class='mc-playboard-header'>
                <p class="marquee">
                    <span>The adhoahdiwa</span>
                </p>
            </div>
            <div
                class="mc-playboard-uploadbox">
            </div>
        </div>
        <div class="mc-chatboard">
            
        </div>
        <audio id="player" autoplay/>
        </audio>
    </div>
</template>

<script>
window.AudioContext = window.AudioContext || window.webkitAudioContext;
// configuration for peer connections
var pc_config = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
function failedSetRemoteDescription(error) {
    console.log("Failure callback from setRemoteDescription: " + JSON.stringify(error));
}
function failedCreateAnswer(error) {
    console.log("Failure callback from createAnswer: " + JSON.stringify(error));
}
// Attach a media stream to an element.
function attachMediaStream(element, stream) {
    if (typeof element.srcObject !== 'undefined') {
      element.srcObject = stream;
    } else if (typeof element.mozSrcObject !== 'undefined') {
      element.mozSrcObject = stream;
    } else if (typeof element.src !== 'undefined') {
      element.src = URL.createObjectURL(stream);
    } else {
      console.log('Error attaching stream to element.');
    }
  };

function reattachMediaStream(to, from) {
  to.src = from.src;
};

export default {
    data() {
        return {
            context: null,
            mediaBuffer: null,
            mediaSource: null,

            // room host's id
            to: null,
            // my id
            myId: null,
            // this client peerconnection
            pc: null,
        };
    },
    methods: {
        initConnection() {
            
        },
        
    },
    mounted: function(){
        let self = this;
        if (!window.chrome) {
            alert('This page needs Google Chrome to play correctly.');
        }
        this.to = this.$route.query.id

        this.context = new AudioContext()
        // check for required APIs
        if (RTCPeerConnection) {
        } else {
            alert('The required APIs are not fully supported in this browser.');
        }
        // creates a peer connection
        this.pc = new RTCPeerConnection(pc_config, { optional: [ { RtpDataChannels: true } ]});

        // creates a data channel to receive meta data 
        var dataChannel = this.pc.createDataChannel('mediaDescription', { reliable: false });
        dataChannel.onmessage = function (event) {
            try {
                var mediaDescription = JSON.parse(event.data);
                console.log('Listening to ' + mediaDescription.title + ' by ' + mediaDescription.artist);
            } catch (err) {
                console.log(err);
            }
        }
        this.pc.onicecandidate = function(event) {
            self.$socket.emit('message', { from: this.myId, to: this.to, data: { type: 'candidate', candidate: event.candidate } });
        }


        this.pc.onaddstream = gotRemoteStream;
        // when a media stream is received attach it to the media element.
        function gotRemoteStream(event) {
            console.log('Got remote stream.');
            attachMediaStream(player, event.stream);
            player.play();
            monitorBitrate();
            player.onloadeddata = function (event) {
                console.log(event);
            }

            player.onprogress = function (event) {
                console.log(event);
            }
        }
        function monitorBitrate() {
            /*if (monitorInterval) {
                timestampPrev = 0;
                bytesPrev = 0;
                //clearInterval(monitorInterval);
            }

            monitorInterval = setInterval(function() {
                if (pc.getRemoteStreams()[0]) {
                    pc.getStats(function(stats) {
                        var bitrateTxt = 'No bitrate stats';
                        var results = stats.result();
                        for (var i in results) {
                            var result = results[i];
                            if (!result.local || result.local === result) {
                                if (result.type === 'ssrc') {
                                    var bytesNow = result.stat('bytesReceived');
                                    if (timestampPrev > 0) {
                                        var bitrate = Math.round((bytesNow - bytesPrev) * 8 / (result.timestamp - timestampPrev));

                                        if (bitrate > 0) {
                                            var bitrateTxt = 'Received in ' + bitrate + ' kbits/sec';
                                        }   
                                    }

                                    timestampPrev = result.timestamp;
                                    bytesPrev = bytesNow;
                                }
                            }

                            rate.innerHTML = bitrateTxt;
                        }
                    });
                }
            }, 1000);*/
        }
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
            let self = this
            this.myId = id
            console.log('id = ' + id)
            setInterval(function() {
                self.$socket.emit('heartbeat', self.myId)
            },2000)
            this.$socket.emit('logon', { from: this.myId, to: this.to } )
            // logoff when refresh
            window.onbeforeunload = function() {
                self.$socket.emit('logoff', { from: self.myId, to: self.to } )
            }
        },
        message(message) {
            let self = this;
            console.log('Received message: ' + JSON.stringify(message.data));
            
            if (message.data.type === 'candidate') {
                if (message.data.candidate) {
                    console.log('adding an ice candidate');
                    this.pc.addIceCandidate(new RTCIceCandidate(message.data.candidate));
                }
            } else if (message.data.type === 'sdp') {
                console.log('setting remote description and creating answer.')
                this.pc.setRemoteDescription(new RTCSessionDescription(message.data.sdp), function() {
                    self.pc.createAnswer(function(desc) {
                        self.pc.setLocalDescription(desc);
                        self.$socket.emit('message', { from: self.myId, to: message.from, data: { type: 'sdp', sdp: desc} } );
                    }, failedCreateAnswer);
                }, failedSetRemoteDescription);
            }
        },
        error(error) {
            alert(error)
        }
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