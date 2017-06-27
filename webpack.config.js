/**
 * @file: file
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-15 00:56:57
 */
let path = require('path');
let webpack = require('webpack');
const ips = require('./lib/util/get-ip-address.js');
const srcDir = path.resolve('./');
const targetpath = require('./lib/path.json');
const watchbox = require('./lib/util/watch.js');
var node_dir = __dirname + '/node_modules';
// watch 开发路由
watchbox.exec(targetpath.path);
module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, './dev'),
        publicPath: '/dev/',
        filename: 'build.js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                        less: 'vue-style-loader!css-loader!less-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader', exclude: /node_modules/}, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jQuery",
            "windows.jQuery": "jquery"
        })

    ],
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            'jquery': node_dir + '/jquery/dist/jquery.js',
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        host: ips(),
        contentBase: path.join(__dirname, '/')
    },
    performance: {
        hints: false
    },

    devtool: '#eval-source-map'
};

