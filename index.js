'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var compileStylus = _interopDefault(require('stylus'));
var rollupPluginutils = require('rollup-pluginutils');

/**
 * rollup-plugin-stylus
 * @param {Object} options
 *   @param {Array || String} include, exclude - A minimatch pattern, or an array of minimatch patterns of including ID, or excluding ID (optional)
 *   @param {Boolean} sourceMap - If true is specified, source map to be embedded in the output CSS (default is true)
 *   @param {Function} fn - A function invoked with the Stylus renderer (it will be passed to use() function of the Stylus)
 * @return {Object} rollup plugin with transform function
 */
function rollupPluginStylus(options = {}) {
  const filter = rollupPluginutils.createFilter(options.include, options.exclude);
  const fn = options.fn;

  return {
    transform: async (code, id) => {
      if (!filter(id) || path.extname(id) !== '.styl') return null

      // console.log("code", code)

      /* compile stylus syntax to css */
      const style = compileStylus(code);

      /* help @import & @require statements with relative paths */
      style.set('paths', [ path.dirname(id), __dirname ]);

      if (fn) style.use(fn);

      const css = await style.render();

      return {
        code: `export default ${JSON.stringify(css.toString())}`,
        map: { mappings: '' },
      }
    },
  }
}

module.exports = rollupPluginStylus;
