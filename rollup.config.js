import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import copy from 'rollup-plugin-copy'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import pkg from './package.json'

export default {
  input: 'src/index.jsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    copy({
      targets: [
        {
          src: '../iframe-resizer/example/frame.*',
          dest: 'example/public/html',
        },
        {
          src: 'node_modules/iframe-resizer/js/iframeResizer.*',
          dest: 'example/public/js',
        },
        {
          src: 'src/index.d.ts',
          dest: 'dist',
        },
      ],
    }),
  ],
}
