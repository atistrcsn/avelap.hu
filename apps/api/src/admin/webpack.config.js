'use strict';

/* eslint-disable no-unused-vars */
const path = require('path');

module.exports = (config, webpack) => {
  // Handle JSX syntax in .js files from @retikolo/drag-drop-content-types plugin
  config.module.rules.push({
    test: /\.js$/,
    include: /node_modules.*@retikolo\/drag-drop-content-types/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react'],
      },
    },
  });

  // Add resolve configuration for problematic imports
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve?.alias,
      '@strapi/icons/symbols': path.resolve(__dirname, '../../symbols.js'),
    },
    fallback: {
      ...config.resolve?.fallback,
      path: false,
      crypto: false,
    },
  };

  // Exclude problematic dependencies from optimization
  config.optimization = {
    ...config.optimization,
    splitChunks: {
      ...config.optimization.splitChunks,
      cacheGroups: {
        ...config.optimization.splitChunks?.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
      },
    },
  };

  // Important: return the modified config
  return config;
};