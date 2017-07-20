import store from 'store'

var storeWithExpiration = {
    set: function(key, val, exp){
        // unit of exp is ms
        store.set(key, {val: val, exp: exp, time: new Date().getTime()})
    },
    get: function(key){
        var info = store.get(key);
        if(!info) { return {} }
        if(new Date().getTime() - info.time > info.exp){
            return null;
        }
        return info.val
    }
}

export default {
    storeWithExpiration,
}