/**
 * @file: file 模板列表
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-16 15:42:51
*/

const fs = require('fs');
const path = require('path');

const TEMPLATE_DIR = path.resolve(__dirname, './tpl-list');


exports.TEMPLATE_DIR = TEMPLATE_DIR;

/**
 * 按相对路径读取模板文件内容
 *
 * @param  {string} filePath 文件相对路径
 * @return {string} 文件内容
 */
exports.readTemplate = function (filePath) {
    return fs.readFileSync(path.resolve(TEMPLATE_DIR, filePath), 'utf-8');
};
