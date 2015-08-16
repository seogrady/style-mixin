/*
  Copyright (c) 2015 Shane O'Grady.
  Licensed under the MIT License (MIT), see
  http://seogrady.github.io/style-mixin
*/

'use strict';

(function () {

  var mixins = {};

  function parse(mixin) {
    var name = undefined,
        props = undefined;
    if (typeof mixin === 'string') {
      name = mixin;
      mixin = {};
      mixin[name] = null;
    }
    for (var prop in mixin) {
      if (prop[0] === '$') {
        name = prop.substr(1);
        if (mixins.hasOwnProperty(name) && mixins[name]) {
          props = Array.isArray(mixin[prop]) ? mixin[prop] : [mixin[prop]];
          Object.assign(mixin, parse(mixins[name].apply(null, props)));
          delete mixin[prop];
        }
      }
    }
    return mixin;
  }

  function reduce(a, b, index) {
    return Object.assign(index === 1 ? parse(a) : a, parse(b));
  }

  function mixin() {
    var styles = [].slice.call(arguments);
    if (styles.length) {
      styles = styles.length > 1 ? styles.reduce(reduce) : reduce({}, styles[0]);
    }
    return styles;
  }

  function styleMixin() {
    var _mixins = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    Object.assign(mixins, _mixins);
    return mixin;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = styleMixin;
  } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function () {
      return styleMixin;
    });
  } else {
    window.styleMixin = styleMixin;
  }
})();