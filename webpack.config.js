const webpack = require('webpack');

const env = process.env.NODE_ENV;

const config = {
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel-loader'], exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    library: 'MobxForms',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    })
  );
}

module.exports = config;
