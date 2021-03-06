module.exports = Object.assign(require('./webpack.shared'), {
  entry: './dist/app',
  output: {filename: 'app.min.js', path: `${__dirname}/public`},
  performance: {hints: false},
  mode: 'production'
});
