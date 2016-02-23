cursorForEachChunked = function(collection,condition,callback,chunkSize){
    if(!chunkSize)
        chunkSize = 50000;
    var skip=0;
    while(true) {
        var models = collection.find(condition, {limit: chunkSize, skip: skip}).fetch();
        skip = skip+chunkSize;
        _.each(models,function(model){
            callback(model);
        });
        if(models.length==0)
            break;
    }
};

