/**
 * @file: file
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-16 10:37:58
*/

const cli = require('./cli');
const boilerplate = require('./boilerplate');
const fs = require('fs');
const path = require('path');

function exec(config) {

    const baseDir = config.baseDir || process.cwd();
    const easygoConfigPath = path.join(baseDir, 'index.config');

    if (fs.existsSync(easygoConfigPath) && !config.force) {
        cli.error('已存在ara配置!');
        return;
    }

    boilerplate.config({isCustom: config.custom}).forEach(file => {
        file.save(baseDir);
        cli.info('generate ara config success:', cli.chalk.green(file.path));
    });
}


exports.exec = exec;
