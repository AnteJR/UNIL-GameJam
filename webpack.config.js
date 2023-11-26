const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './JS/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/main.js',
        clean: true,
        publicPath: '/sheepit/',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                '*.html',
                './CSS/*.css',
                './assets/images/**/*',
                './assets/sounds/*',
                './assets/fonts/*',
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
            new HtmlMinimizerPlugin()
        ],
    },
};
