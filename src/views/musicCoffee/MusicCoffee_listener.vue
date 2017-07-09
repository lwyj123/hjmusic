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
import api from 'api'
export default {
    data() {
        return {
            context: null,
            mediaBuffer: null,
            mediaSource: null,

            // room host's id
            to: null,
        };
    },
    methods: {
        initConnection() {
            
        },
        
    },
    mounted: function(){
        if (!window.chrome) {
            alert('This page needs Google Chrome to play correctly.');
        }
        this.to = this.$route.query.id
        
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
            window.onbeforeunload = function() {
                self.$socket.emit('logoff', { from: self.myId, to: self.to } )
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