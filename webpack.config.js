var path = require('path');



module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'index.bundle.js'
  },
  target: 'electron-main'
};