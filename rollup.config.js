const external = [
	'fs',
	'path',
	'stylus',
	'rollup-pluginutils'
];
const path = require('path');
const root = process.cwd();

const input = path.resolve(root, 'src', 'index.js');

export default [
  {
		external,
    input,
    plugins: [],
    output: {
      file: path.resolve(root, 'index.js'),
      format: 'cjs'
    }
  },
	{
		external,
    input,
    plugins: [],
    output: {
      file: path.resolve(root, 'lib', 'rollup-plugin-stylus-to-css.mjs'),
      format: 'es'
    }
  }
];
