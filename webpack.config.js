// webpack.config.js
module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  devtool: 'source-map'
};