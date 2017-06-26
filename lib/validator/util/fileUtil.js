/**
 * @file: file 遍历目录中的文件
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-23 10:38:22
*/

const fs = require('fs');

/**
 * 循环读取一个目录，同步方式
 *
 * @param  {string} dirPath     目录路径
 * @param  {Function} fileHandler 文件处理函数
 * @param  {Function=} dirHandler  目录处理函数
 */
exports.walkDir = function (dirPath, fileHandler, dirHandler) {
    const walk = function (path, depth) {
        dirHandler && dirHandler(path, depth);
        depth++;
        const files = fs.readdirSync(path);

        files.forEach(file => {
            if (file.indexOf('..') === 0) {
                return;
            }

            const tmpPath = path + '/' + file;
            const stats = fs.statSync(tmpPath);
            if (stats.isDirectory()) {
                walk(tmpPath, depth);
            }
            else {
                fileHandler(tmpPath, depth);
            }
        });
    };

    walk(dirPath, 0);
};

/**
 * 判断是否文本文件
 *
 * @param  {string}  path 文件路径
 * @return {boolean}
 */
exports.isPlainText = function (path) {
    return !!String(path).match(/\.(?:txt|vue|text|html|mustache|tpl|etpl|md|js|less|css|json|es6|preset)$/i);
};

