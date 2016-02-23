var asyncSleep = function(ms, callback) {
    Meteor.setTimeout(function() {
        callback(null);
    }, ms);
};

var asyncSleepUntil = function(date, callback) {
    if (typeof date === "function") {
        throw new Error("Missing parameter `date'");
    }

    var now = Date.now();
    var then = +date;
    var ms = Math.max(0, then - now);
    asyncSleep(ms, callback);
};



if (typeof Meteor.wrapAsync !== "undefined") {
    Meteor.sleep = Meteor.wrapAsync(asyncSleep);
    Meteor.sleepUntil = Meteor.wrapAsync(asyncSleepUntil);
} else {
    Meteor.sleep = Meteor._wrapAsync(asyncSleep);
    Meteor.sleepUntil = Meteor._wrapAsync(asyncSleepUntil);
}

throttle = function(fn, timeout, ctx) {
    var timer, args, needInvoke;
    return function() {
        args = arguments;
        needInvoke = true;
        ctx = ctx || this;

        if(!timer) {
            (function() {
                if(needInvoke) {
                    needInvoke = false;
                    fn.apply(ctx, args);
                    timer = Meteor.setTimeout(arguments.callee, timeout);
                }
                else {
                    timer = null;
                }
            })();
        }

    };

};