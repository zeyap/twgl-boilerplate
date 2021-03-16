const path = require('path');

module.exports = {
  mode:"development",
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(vert|frag)$/i,
        use: 'raw-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ],
  },
};