'use strict';

function _callMethod(that, key, args) {
  var fn = that[key];
  switch (!fn && Object.prototype.toString.call(that)) {
    case '[object Array]':
      return _core.Array[key].apply(null, [that].concat(args));
    case '[object String]':
      return _core.String[key].apply(null, [that].concat(args));
  }return fn.apply(that, args);
}