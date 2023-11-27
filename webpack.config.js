const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
        clean: true,
        publicPath: '/sheepit/',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                '*.html',
                './css/*.css',
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
            new HtmlMinimizerPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization
                        plugins: [
                            ['optipng', { optimizationLevel: 5 }],
                        ]
                    }
                }
            }),
        ],
    },
};
