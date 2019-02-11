const resolve = require('rollup-plugin-node-resolve');
const { terser } = require("rollup-plugin-terser");
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const localResolve = require('rollup-plugin-local-resolve');

const { getPkgJson } = require('./lib/npm-package');

const pkg = getPkgJson();

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: pkg.build.name,
      sourcemap: true,
      globals: pkg.build.globals,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: Object.keys(pkg.build.globals),
  plugins: [
    localResolve(),
    resolve({
      extensions: [ '.mjs', '.js', '.jsx', '.json' ],
    }), // so Rollup can find `ms`
    babel({
      exclude: ['node_modules/**']
    }),
    commonjs(), // so Rollup can convert `ms` to an ES module
  ]
};
