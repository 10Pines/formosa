import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'formosa',
      sourcemap: true,
      globals: {
        "react": 'React',
        "react-dom": 'ReactDOM',
        "prop-types": 'propTypes',
        "mobx": 'mobx',
        "mobx-react": 'mobxReact',
      },
    },
    {
      file: pkg.main,
      name: 'formosa',
      format: 'iife',
      sourcemap: true,
      globals: {
        "react": 'React',
        "react-dom": 'ReactDOM',
        "prop-types": 'propTypes',
        "mobx": 'mobx',
        "mobx-react": 'mobxReact',
      },
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: [
    'react',
    'react-dom',
    'prop-types',
    'mobx',
    'mobx-react',
  ],
  plugins: [
    localResolve(),
    resolve({
      extensions: [ '.mjs', '.js', '.jsx', '.json' ],
    }), // so Rollup can find `ms`
    babel({
      exclude: ['node_modules/**']
    }),
    commonjs(), // so Rollup can convert `ms` to an ES module
    terser(),
  ]
};
