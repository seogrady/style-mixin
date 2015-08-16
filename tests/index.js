/* global describe, it */
require("babel/polyfill");

var assert = require("assert");
var mixins = require('../mixins.js');
var mixin = require('../index.js');

Object.assign(mixins, {
  mixin1: function() {
    return {
      textAlign: 'center'
    }
  },
  mixin2: function() {
    return {
      display: 'block',
      $mixin1: true
    }
  },
  mixin3: function() {
    return {
      display: 'table'
    }
  },
  button: function($fontsize) {
    return {
      fontSize: $fontsize || '12px',
      color: 'white',
      background: 'blue',
      $borderRadius: '3px'
    }
  }
})
var m = mixin(mixins);

describe('styleMixin', function() {

  it('deletes mixin keys from returned object', function() {
    var styles = m({
      width: 10,
      height: 6,
      $borderRadius: '3px'
    });
    assert.equal(styles.$borderRadius, undefined);
  });

  it('resolves mixins defined within mixins', function() {
    var styles = m({
      fontSize: 12,
      $mixin2: true
    });
    assert.equal(styles.$mixin2, undefined);
    assert.equal(styles.display, 'block');
    assert.equal(styles.textAlign, 'center');
  });

  it('allows assign of multiple style objects', function() {
    var styles = m({
      fontSize: 12
    }, {
      height: 120
    });
    assert.equal(styles.fontSize, 12);
    assert.equal(styles.height, 120);
  });

  it('ensures props get overridden from right to left', function() {
    var styles = m({
      fontSize: 12
    }, {
      fontSize: 24
    });
    assert.equal(styles.fontSize, 24);
  });

  it('allows style object to inherit mixin props by passing name as strings', function() {
    var styles = m({
      display: 'block'
    }, '$mixin1', '$mixin3');
    assert.equal(styles.textAlign, 'center');
    assert.equal(styles.display, 'table');
  });

  it('overrides mixin properties with new values', function() {
    var styles = m('$button', {
      background: 'red'
    });
    assert.equal(styles.fontSize, '12px');
    assert.equal(styles.color, 'white');
    assert.equal(styles.WebkitBorderRadius, '3px');
    assert.equal(styles.background, 'red');
  });

});
