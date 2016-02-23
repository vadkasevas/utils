md5 = function(s){
    return CryptoJS.MD5(s).toString();
};

isset = function(obj){
    return obj===null || typeof(obj)!=='undefined';
};

objectSize = function (obj) {
    var size = 0, key;
    for (key in obj) {
        size++;
    }
    return size;
};

randKey = function(object){
    var keys = [];
    for(var key in object){
        keys.push(key);
    }
    if(keys.length>0){
        return  keys[Math.floor(Math.random() * keys.length)];
    }else
        return null;
};

randValue = function(object){
    var _randKey = randKey(object);
    if(_randKey&&typeof (object[_randKey]) !='undefined'){
        return object[_randKey];
    }
    return null;
};

eachObjectField = function(obj,callback){
    for(var field in obj){
        callback(obj[field],field);
    }
};

generateRandomHash = function() {
    return md5(rndInt(100000000) + '_' + rndInt(100000000) + '_' + new Date().getTime() );
};

