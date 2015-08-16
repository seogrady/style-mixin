StyleMixin
===========

Inline style mixins for JavaScript. Ideally used with ReactJS [inline styles](https://facebook.github.io/react/tips/inline-styles.html)

Install with npm or Bower.

```sh
npm install style-mixin
```

Use with node.js, browserify or webpack. Alternatively, you can simply include `index.js` on your page with a standalone `<script>` tag and it will export a global `styleMixin` method, or define the module if you are using RequireJS.

Example:
```js
var s = require('style-mixin/mixins'),
    m = require('style-mixin')(s);

var styles = m({
  background:'blue',
  $borderRadius:'3px'
}); // => {background: "blue", WebkitBorderRadius: "3px", borderRadius: "3px", backgroundClip: "padding-box"}
```

The utility helper comes with a few mixins that can be included via `require('style-mixin/mixins')`.  Please have a look at [src/mixins.js](src/mixins.js) for examples of mixin functions. Please feel free to contribute by converting existing less/sass mixins over to JavaScript.

## Usage

The `m` function gets initialized by passing a collection of mixins to `mixin`.  The `m` function takes any number of arguments which can be a string or object. The argument `'$mixin'` is short for `{ $mixin: null }`. Keys that start with `$` will resolve a corresponding mixin.

```js
import mixin from 'style-mixin';

let m = mixin({
  borderRadius: function($radius = '3px') {
    return {
      WebkitBorderRadius: $radius,
      borderRadius: $radius,
      backgroundClip: 'padding-box' /* stops bg color from leaking outside the border: */
    }
  }
});

var styles = m({
  background:'red'
}, '$borderRadius'); // => {background: "red", WebkitBorderRadius: "3px", borderRadius: "3px", backgroundClip: "padding-box"}
```

Style properties will be overridden from right to left.  If you pass in a mixin name or style object, the last object properties will take precendence.

```js
import mixin from 'style-mixin';
import mixins from 'style-mixin/mixins';

Object.assign(mixins, {
  button: function($fontsize = '12px') {
    return {
      fontSize: $fontsize,
      color: 'white',
      background: 'blue',
      $borderRadius: '3px'
    }
  }
});

let m = mixin(mixins);

var styles = m('$button', { background:'red' }); // => {background: "red", fontSize: "12px", color: "white", WebkitBorderRadius: "3px", borderRadius: "3px", backgroundClip: "padding-box"}
```

If you pass an array of properties to a mixin function they will passed as arguments.

```js
Object.assign(mixins, {
  absPos: function($top = 0, $right = 0, $bottom = 0, $left = 0) {
    return {
      top: $top,
      right: $right,
      bottom: $bottom,
      left: $left,
      position: absolute
    }
  }
});

let m = mixin(mixins);

var styles = m({
  background:'red',
  $absPos:['23px', '43px', '3px', '-33px']
}); // => {background: "red", top: "23px", right: "43px", bottom: "3px", left: "-33px", position: "absolute"}
```

## Polyfills needed to support older browsers

`Object.assign`: see [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

`Array.isArray`: see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

## Contribute

Would you like to take part of the discussion? Open up an issue or pull request.

## License

[MIT](LICENSE)
