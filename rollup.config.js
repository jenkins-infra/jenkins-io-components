// Import rollup plugins
import {readdirSync} from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import {getBabelOutputPlugin} from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import typescript from '@rollup/plugin-typescript';
import execute from 'rollup-plugin-execute'
import litcss from 'rollup-plugin-lit-css';
import postcss from 'postcss';

import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const processor = postcss(require('./postcss.config.cjs'));

export default {
  // Entry point for application build; can specify a glob to build multiple
  // HTML files for non-SPA app
  input: readdirSync('./src/').filter(file => file.endsWith('.ts')).map(file => `src/${file}`),
  plugins: [
    litcss({
      include: '/**/*.css',
      transform: (css, {filePath}) =>
        processor.process(css, {from: filePath})
          .css,
    }),
    typescript(),
    // Resolve bare module specifiers to relative paths
    resolve(),
    // Minify HTML template literals
    minifyHTML(),
    // Minify JS
    terser({module: true, warnings: true}),
    execute('npm run analyze'),
    // Print bundle summary
    summary(),
    // Optional: copy any static assets to build directory
    //copy({ patterns: ['data/**/*', 'images/**/*'] }),
  ],
  // Specifies two JS output configurations, modern and legacy, which the HTML plugin will
  // automatically choose between; the legacy build is compiled to ES5
  // and SystemJS modules
  output: [
    {
      // Modern JS bundles (no JS compilation, ES module output)
      format: 'es',
      chunkFileNames: '[name]-[hash].esm.js',
      entryFileNames: '[name].esm.js',
      dir: 'build',
      sourcemap: true,
    },
    {
      // Legacy JS bundles (ES5 compilation and SystemJS module output)
      format: 'esm',
      chunkFileNames: '[name]-[hash].cjs.js',
      entryFileNames: '[name].cjs.js',
      dir: 'build',
      sourcemap: true,
      plugins: [
        getBabelOutputPlugin({
          compact: true,
          presets: [
            [
              '@babel/preset-env',
              {
                modules: 'systemjs',
              },
            ],
          ],
        }),
      ],
    },
  ],
  preserveEntrySignatures: false,
};
