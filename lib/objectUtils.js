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

randArrValue = function(arr){
    if(!arr||arr.length==0)
        return null;

    var key = Math.floor(Math.random() * arr.length);
    if(isset(arr[key]))
        return arr[key];
    else {
        var keys = [];
        _.each(arr, function (value, key) {
            keys.push(key);
        });
        if(keys.length>0){
            return  arr[Math.floor(Math.random() * keys.length)];
        }
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

formatRuBoolean = function (val) {
    if(val)
        return 'Да';
    else
        return 'Нет';
};

safeGet = function safeGet (obj, props, defaultValue) {
    if (obj === undefined || obj === null) {
        return defaultValue;
    }
    if(typeof props=='string'){
        props = props.split('.');
    }

    if (!props||props.length === 0) {
        return obj;
    }
    var foundSoFar = obj[props[0]];
    var remainingProps = props.slice(1);

    return safeGet(foundSoFar, remainingProps, defaultValue);
};

Object.equals = function( x, y ) {
    if ( x === y ) return true;
    // if both x and y are null or undefined and exactly the same

    if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
    // if they are not strictly equal, they both need to be Objects

    //if ( x.constructor !== y.constructor ) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for ( var p in x ) {
        if ( ! x.hasOwnProperty( p ) ) continue;
        // other properties were tested using x.constructor === y.constructor

        if ( ! y.hasOwnProperty( p ) ) return false;
        // allows to compare x[ p ] and y[ p ] when set to undefined

        if ( x[ p ] === y[ p ] ) continue;
        // if they have the same strict value or identity then they are equal

        if ( typeof( x[ p ] ) !== "object" ) return false;
        // Numbers, Strings, Functions, Booleans must be strictly equal

        if ( ! Object.equals( x[ p ],  y[ p ] ) ) return false;
        // Objects and Arrays must be tested recursively
    }

    for ( p in y ) {
        if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
        // allows x[ p ] to be set to undefined
    }
    return true;
};

deserializeDate = function(dateS){
    if (typeof dateS === 'string') {
        var a = deserializeDate.reISO.exec(dateS);
        if (a) {
            return new Date(dateS);
        }
    }
    return dateS;
};
deserializeDate.reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

deserializeDates = function(obj){
    if(obj instanceof Date)
        return obj;

    if(Array.isArray(obj)){
        var clone = [];
        _.each(obj,function(val,index){
            clone[index] =  deserializeDates(val);
        });
        return clone;
    }else if(typeof obj === 'string'){
        return deserializeDate(obj);
    }
    else if( (obj instanceof Object) ) {
        var clone = {};
        for (var key in obj) {
            clone[key] = deserializeDates(obj[key]);
        }
        return clone;
    }
    return obj;
};

keyValueChunks = function(objOrArray,key,size){
    size = size || 10;
    var result = [];
    if(Array.isArray(objOrArray)){
        for (var i = 0, j = objOrArray.length; i < j; i += size) {
            var chunk = objOrArray.slice(i, i + size);
            var assockChunk = {};
            _.each(chunk,function(item){
                assockChunk[item[key]] = item;
            });
            result.push(assockChunk);
        }
    }else{
        var assockChunk = {};
        for(var propKey in objOrArray){
            assockChunk[objOrArray[propKey][key]] = objOrArray[propKey];
            if(objectSize(assockChunk)>=size){
                result.push(assockChunk);
                assockChunk = {};
            }
        }
        if(objectSize(assockChunk)>0&&objectSize(assockChunk)<size){
            result.push(assockChunk);
        }
    }
    return result;
};