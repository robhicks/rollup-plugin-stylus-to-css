# rollup-plugin-stylus

A Rollup.js plugin to compile and load Stylus with [CSS Modules](https://github.com/css-modules/css-modules).
Powered by [rollup-plugin-stylus-css-modules](https://github.com/mtojo/rollup-plugin-stylus-css-modules)!

## Installation

```bash
npm install --save-dev rollup-plugin-stylus
```

## Usage

Add the following code to your project's `rollup.config.js`:

```js
import stylus from 'rollup-plugin-stylus';

export default {
  entry: 'index.js',
  plugins: [
    stylus({
      output: 'styles.css'
    }),
  ]
};
```

### in Stylus

```stylus
.container
  height 100%
```

### in JS

```js
import styles from './styles.styl';
const container = `<div class="${styles.container}">...</div>`;
```

## Options

* `include`, `exclude`: A minimatch pattern, or an array of minimatch patterns of including ID, or excluding ID (optional).
* `output`: Output destination (optional).
  * If you specify a `string`, it will be the path to write the generated CSS.
  * If you specify a `function`, call it passing the generated CSS as an argument.
* `sourceMap`: If `true` is specified, source map to be embedded in the output CSS (default is `true`).
* `identName`: A `function` then return current class name, like `.app__container` (optional)
* `fn`: A `function` invoked with the Stylus renderer (it will be passed to `use()` function of the Stylus).

## External tools

Combination with external tools, such as [PostCSS](http://postcss.org/) works perfectly.

```js
stylusCssModules({
  sourceMap: true,
  identName: (processCwd, id, customObject) => path.relative(processCwd, id),
  output: (css) => {
    return postcss([
      // postcss' plugins...
    ]).process(css, {
      map: true
    }).then((result) => {
      fs.writeFileSync('styles.css', result.css);
    });
  }
});
```

## License

MIT
