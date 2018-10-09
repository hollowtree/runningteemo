import babel from 'rollup-plugin-babel';
export default {
    entry: 'app/main.js',
    dest: 'dist/js/index.js',
    format: 'iife',
    sourceMap: false,
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  };