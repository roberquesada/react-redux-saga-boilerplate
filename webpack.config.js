const path              = require('path');
const merge             = require('webpack-merge');
const webpack           = require('webpack');
const NpmInstallPluging = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS  = {
  app:   path.join(__dirname, 'src'),
  build: path.join(__dirname, 'public')
}

process.env.BABEL_ENV = TARGET;

const common = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        include: PATHS.app,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: 3000
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPluging({
        save: true // --save
      })
    ]
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {});
}
