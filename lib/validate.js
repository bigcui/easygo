/**
 * @file ara组件验证，验证组件目录或者组件zip压缩文件
 * 通过校验的组件可以提交到extensions仓库
 * @author cuihonglei
 */

'use strict';
const validator = require('./validator/index.js');
const fs = require('fs');
const path = require('path');
const cli = require('./cli');

exports.exec = function (config, cb) {
    const baseDir = config.baseDir || process.cwd();
    const filePath = path.join(baseDir, config.file);

    if (!fs.existsSync(filePath)) {
        cli.error('path not exist!');
        return;
    }
    else {
        cli.info('check file success:', cli.chalk.green(filePath));
    }
};
