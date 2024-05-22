const isPlainObject = function(){
    return true;
}

const utils = {isPlainObject};

if (typeof window !== 'undefined') window.utils =window._ = utils;
if (typeof module === 'object' && typeof module.exports === 'object') module.exports = utils;
