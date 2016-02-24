var fs = Npm.require('fs');
var mkdirp = Npm.require('mkdirp');

fileExists = function(fileName) {
    try {
        var stats = fs.lstatSync(fileName);
        return  (stats.isFile());
    }
    catch (e) {
        return false;
    }
};

dirExists = function(dirName) {
    try {
        var stats = fs.lstatSync(fileName);
        return  (stats.isDirectory());
    }
    catch (e) {
        return false;
    }
};

mkdir = function(dirName){
    return mkdirp.sync(dirName);
};
