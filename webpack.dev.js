module.exports = Object.assign(require('./webpack.shared'), {
  devtool: 'eval',
  devServer: {contentBase: __dirname + '/public', host: '0.0.0.0', port: 6567},
  entry: './dist/app',
  output: {filename: 'app.min.js', path: `${__dirname}/public`},
  performance: {hints: false},
  mode: 'development'
});
