/**
 * @file: file 监听函数
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-21 13:27:11
*/

let path = require('path');
let webpack = require('webpack');
const chokidar = require('chokidar');
const srcDir = path.resolve('./');
const shell = require('shelljs');


exports.exec = function (argument) {
    // body...
    // argument+'/**'
    function filterRefresh(paths) {
        shell.cp('-R', argument + '/**', path.resolve(__dirname, '../../dev'));
    }
    chokidar.watch(argument, {
            ignoreInitial: true,
            ignored: [/\\.git\//, /\\.svn\//, /\\.hg\//],
            usePolling: false
        })
        .on('add', filterRefresh)
        .on('change', filterRefresh)
        .on('unlink', filterRefresh);
};
