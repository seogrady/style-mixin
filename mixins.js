/*
  Copyright (c) 2015 Shane O'Grady.
  Licensed under the MIT License (MIT), see
  http://seogrady.github.io/style-mixin
*/

/* Border Radius
  ========================================================================== */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.borderRadius = borderRadius;
exports.boxSizing = boxSizing;
exports.opacity = opacity;
exports.absPos = absPos;
exports.lineHeight = lineHeight;
exports.inlineBlock = inlineBlock;

function borderRadius($radius) {
  return {
    WebkitBorderRadius: $radius,
    borderRadius: $radius,
    backgroundClip: 'padding-box' /* stops bg color from leaking outside the border: */
  };
}

/* Box Model
  ========================================================================== */

function boxSizing($boxModel) {
  return {
    WebkitBoxSizing: $boxModel, // Safari <= 5
    MozBoxSizing: $boxModel, // Firefox <= 19
    boxSizing: $boxModel
  };
}

/* Opacity
  ========================================================================== */

function opacity($opacity) {
  var ieOpacity = $opacity * 100;
  return {
    opacity: $opacity,
    // IE8 filter
    filter: 'alpha(opacity=' + ieOpacity + ')'
  };
}

/* Absolute positioned
  ========================================================================== */

function absPos() {
  var $top = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var $right = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  var $bottom = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
  var $left = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

  return {
    top: $top,
    right: $right,
    bottom: $bottom,
    left: $left,
    position: absolute
  };
}

/* Line Height
  ========================================================================== */

function lineHeight() {
  var $heightValue = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];

  return {
    lineHeight: $heightValue + 'px; ' + 0.125 * $heightValue + 'rem' // includes fallback for old browsers
  };
}

/* Cross browser inline block
  ========================================================================== */

function inlineBlock() {
  return {
    display: 'inline-block; display:-moz-inline-stack',
    verticalAlign: 'top',
    zoom: 1,
    '*display': 'inline'
  };
}