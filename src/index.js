/*
  Copyright (c) 2015 Shane O'Grady.
  Licensed under the MIT License (MIT), see
  http://seogrady.github.io/style-mixin
*/

(function() {

  let mixins = {};

  function parse(mixin) {
    let name, props;
    if (typeof mixin === 'string') {
      name = mixin;
      mixin = {};
      mixin[name] = null;
    }
    for (let prop in mixin) {
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
    let styles = [].slice.call(arguments);
    if (styles.length) {
      styles = styles.length > 1 ? styles.reduce(reduce) : reduce({}, styles[0]);
    }
    return styles;
  }

  function styleMixin(_mixins = {}) {
    Object.assign(mixins, _mixins);
    return mixin;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = styleMixin;
  } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return styleMixin;
    });
  } else {
    window.styleMixin = styleMixin;
  }
}());
