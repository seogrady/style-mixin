/*
  Copyright (c) 2015 Shane O'Grady.
  Licensed under the MIT License (MIT), see
  http://seogrady.github.io/style-mixin
*/

/* Border Radius
  ========================================================================== */
export function borderRadius($radius) {
  return {
    WebkitBorderRadius: $radius,
    borderRadius: $radius,
    backgroundClip: 'padding-box' /* stops bg color from leaking outside the border: */
  }
}

/* Box Model
  ========================================================================== */
export function boxSizing($boxModel) {
  return {
    WebkitBoxSizing: $boxModel, // Safari <= 5
    MozBoxSizing: $boxModel, // Firefox <= 19
    boxSizing: $boxModel
  }
}

/* Opacity
  ========================================================================== */
export function opacity($opacity) {
  let ieOpacity = $opacity * 100;
  return {
    opacity: $opacity,
    // IE8 filter
    filter: `alpha(opacity=${ieOpacity})`
  }
}

/* Absolute positioned
  ========================================================================== */
export function absPos($top = 0, $right = 0, $bottom = 0, $left = 0) {
  return {
    top: $top,
    right: $right,
    bottom: $bottom,
    left: $left,
    position: absolute
  }
}

/* Line Height
  ========================================================================== */
export function lineHeight($heightValue = 12){
  return {
    lineHeight: `${$heightValue}px; ${0.125 * $heightValue}rem` // includes fallback for old browsers
  }
}

/* Cross browser inline block
  ========================================================================== */
export function inlineBlock() {
  return {
    display: '-moz-inline-stack',
    display: 'inline-block',
    verticalAlign: 'top',
    zoom: 1,
    '*display': 'inline'
  }
}
