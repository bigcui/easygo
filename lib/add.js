/**
 * @file: 生成vue页面
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-16 10:55:04
*/

const cli = require('./cli');
const fs = require('fs');
const path = require('path');
const boilerplate = require('./boilerplate');
const string = require('./util/string');


function exec(config) {
    const fileName = config.fileName;
    const baseDir = config.baseDir || process.cwd();
    const modules = config.modules || [];

    if (fs.existsSync(path.join(baseDir, fileName)) && !config.force) {
        cli.error('存在同名页面!');
        return;
    }

    if (config.custom) {
        boilerplate.mipcustom({
            name: fileName
        }).forEach(file => {
            file.save(baseDir);
            cli.info('generate config success:', cli.chalk.green(file.path));
        });
    }
    else {
        // 获取引用元素路径，过滤掉内置元素
        const files = boilerplate.page({
            name: fileName,
            elements: {}
        });

        files.forEach(function (file) {
            file.save(baseDir);
            cli.info('generate file success:', cli.chalk.green(file.path));
        });
    }
}

exports.exec = exec;
