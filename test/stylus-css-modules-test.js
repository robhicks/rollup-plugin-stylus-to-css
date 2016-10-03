const fs     = require('fs')
const assert = require('assert')
const rollup = require('rollup').rollup

const runInNewContext    = require('vm').runInNewContext
const rollupPluginStylus = require('../lib/rollup-plugin-stylus.cjs')

describe('rollup-plugin-stylus', () => {
  it('should export tokens', () => rollup({
    entry: 'test/example/main.js',
    plugins: [
      rollupPluginStylus(),
    ],
  }).then(bundle => {
    const result  = bundle.generate({format: 'cjs'})
    const exports = {}
    const module  = { exports }

    runInNewContext(result.code, { module, exports })
    assert(module.exports.styles.hasOwnProperty('container'))
  }))

  it('should output css', () => rollup({
    entry: 'test/example/main.js',
    plugins: [
      rollupPluginStylus({
        output: 'test/example/styles.css',
      }),
    ],
  }).then(bundle => {
    const result  = bundle.generate({ format: 'cjs' })
    const exports = {}
    const module  = { exports }

    runInNewContext(result.code, { module, exports })
    assert(module.exports.styles.hasOwnProperty('container'))
    assert(fs.existsSync('test/example/styles.css'))
    fs.unlinkSync('test/example/styles.css')
  }))

  it('should call function', () => {
    let output = null

    return rollup({
      entry: 'test/example/main.js',
      plugins: [
        rollupPluginStylus({
          output: (css) => {
            output = css
          }
        }),
      ],
    }).then(bundle => {
      const result  = bundle.generate({ format: 'cjs' })
      const exports = {}
      const module  = { exports }

      runInNewContext(result.code, { module, exports })
      assert(output !== null)
    })
  })
})
