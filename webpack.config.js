var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var ENTRY_PATH = path.resolve(ROOT_PATH, 'src/main.ts');
var POLY_PATH = path.resolve(ROOT_PATH, 'src/polyfills.ts');
var VENDOR_PATH = path.resolve(ROOT_PATH, 'src/vendor.ts');
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var JS_PATH = path.resolve(ROOT_PATH, 'src/js');
var TEMPLATE_PATH = path.resolve(ROOT_PATH, 'src/index.html');
var SHADER_PATH = path.resolve(ROOT_PATH, 'src/shaders');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

var debug = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: 
    {
        main: ENTRY_PATH,
        // polyfills: POLY_PATH,
        // vendor: VENDOR_PATH
    },

    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },

    resolve: {
        roots: [JS_PATH, SRC_PATH]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: JS_PATH,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    preset: ['es2018']
                }
            },
            {
                test: /\.glsl$/,
                include: SHADER_PATH,
                loader: 'webpack-glsl'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'to-string-loader',
                    { 
                        loader: 'css-loader', 
                        options: { 
                            sourceMap: true 
                        } 
                    },
                    { 
                        loader: 'sass-loader', 
                        options: { 
                            sourceMap: true 
                        } 
                    }
                ],
                include: SRC_PATH
            }
        ]
    },
    devtool: debug ? 'eval-source-map' : 'source-map'
};