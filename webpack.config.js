module.exports = {
    entry: '...',
    module: {
      rules: [
        {
            "no-undef": "off",
            "no-console": "off",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            emitWarning: true,
          },
        },
      ],
    },
  };