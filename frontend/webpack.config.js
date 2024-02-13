const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [
    nodeExternals({
      modulesFromFile: true,
    }),
  ],
  resolve: {
    fallback: {
      "crypto": false
    }
  }
};
