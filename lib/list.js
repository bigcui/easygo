/**
 * @file: file 生成导航页
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-21 13:29:49
 */

const cli = require('./cli');
const fs = require('fs');
const path = require('path');
const basePath = path.join(__dirname, '../dev/');
const content = fs.readdirSync(basePath);
const boilerplate = require('./boilerplate');

function exec(config) {
    let arr = [];
    let srr = ['common', 'LICENSE', 'README.md'];
    if (content) {
        content.forEach(element => {
            if (srr.indexOf(element) === -1 && element.charAt(0) !== '.') {
                arr.push(element);
            }
        });
    }

    const fileName = 'list.html';
    const files = boilerplate.list({
        name: fileName,
        list: arr
    });

    files.forEach(function (file) {
        file.save(basePath);
        cli.info('generate list file success:', cli.chalk.green(file.path));
    });
}


exports.exec = exec;
