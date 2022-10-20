const path = require('path');

// WARNING: Use this module only as an inspiration.
// Cherry-pick the parts you need and inline them in the webpack.config you need.
// This module isn't used to build the documentation. We use Next.js for that.
// This module is used by the visual regression tests to run the demos and by eslint-plugin-import.
module.exports = {
  context: path.resolve(__dirname),
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      '@material-ui/core': path.resolve(__dirname, './packages/material-ui/src'),
      '@material-ui/docs': path.resolve(__dirname, './packages/material-ui-docs/src'),
      '@material-ui/icons': path.resolve(__dirname, './packages/material-ui-icons/src'),
      '@material-ui/lab': path.resolve(__dirname, './packages/material-ui-lab/src'),
      '@material-ui/styled-engine': path.resolve(
        __dirname,
        './packages/material-ui-styled-engine/src',
      ),
      '@material-ui/styled-engine-sc': path.resolve(
        __dirname,
        './packages/material-ui-styled-engine-sc/src',
      ),
      '@material-ui/styles': path.resolve(__dirname, './packages/material-ui-styles/src'),
      '@material-ui/system': path.resolve(__dirname, './packages/material-ui-system/src'),
      '@material-ui/utils': path.resolve(__dirname, './packages/material-ui-utils/src'),
      'typescript-to-proptypes': path.resolve(__dirname, './packages/typescript-to-proptypes/src'),
      docs: path.resolve(__dirname, './docs'),
    },
    extensions: ['.js', '.ts', '.tsx', '.d.ts'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
    ],
  },
};
