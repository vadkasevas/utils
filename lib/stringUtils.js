trim = function(str){
    if(str==null||str.length==0)
        return str;
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    return str.replace(rtrim, '');
};