fs = Npm.require('fs');

var fileExists = function(fileName) {
    try {
        var stats = fs.lstatSync(fileName);
        return  (stats.isFile());
    }
    catch (e) {
        return false;
    }
};

var dirExists = function(dirName) {
    try {
        var stats = fs.lstatSync(fileName);
        return  (stats.isDirectory());
    }
    catch (e) {
        return false;
    }
};
