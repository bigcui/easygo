/**
 * @file: filevue 文件生成
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-16 09:51:48
 */

const fs = require('fs');
const path = require('path');
const cli = require('./cli');
const render = require('./util/render.js');
const File = require('./boilerplate/File');
const boilerplate = require('./tpl');
const chokidar = require('chokidar');
const tplBox = require('./boilerplate');
const srcDir = path.resolve('./');
const shell = require('shelljs');
const baseDir = path.resolve(__dirname, '../');
const fss = require('fs-extra');
let data = {
    path: srcDir
};

// 每次启动服务前 先把脏数据清楚
function rmPre(argument) {
    shell.cd(baseDir + '/dev/');
    shell.exec('rm -fr easy**t');
    shell.exec('rm -fr easygo** ');
    shell.exec('ls |grep -v common |xargs rm -rf');

}

function filterRefresh(path) {
    rmPre();
    // 同步数据问题
    try {
        fss.copySync(srcDir, baseDir + '/dev');
    } catch (err) {
        cli.error('read extensions dir error', err);
    }
}
//  生成开发目录路径文件 方便编译调用的
function createPath(argument) {

    fs.writeFile(baseDir + '/lib/path.json', JSON.stringify(data), err => {
        if (err) {}

    });
}

function createComp(options) {
    const tpl = boilerplate.readTemplate('app.tpl');

    const content = render.render(tpl, options);

    return [new File(options.name, content)];
}

// 生成首页入口
function createIndex(argument) {
    // body...

    const files = tplBox.index({

    });
    files.forEach(function (file) {
        file.save(baseDir);
        cli.info('generate file success:', cli.chalk.green(file.path));
    });
}
createPath();
filterRefresh();

module.exports = function () {
    return new Promise(function (resolve, reject) {

        fs.readdir(process.cwd(), (err, files) => {
            if (err) {
                cli.error('read extensions dir error', err);
                return;
            }

            let list = [];
            files.forEach(file => {
                let stat = fs.statSync(path.join(process.cwd(), file));

                if (file.match(/^easygo-[\w-]+$/gi) && stat.isDirectory()) {
                    list.push({
                        name: file,
                        mtime: stat.mtime
                    });
                }

            });
            if (list.length === 0) {
                cli.warn('目录内没有easygo组件');
            }

            let sComs = {};
            list.forEach(file => {
                let big = file.name.split('-')[1].substring(0, 1).toUpperCase();
                let name = file.name.split('-')[0] + big + file.name.split('-')[1].substring(1);
                sComs[name] = file.name;
            });

            let ffs = createComp({
                name: 'App.vue',
                files: list,
                components: sComs
            });

            ffs.forEach(function (file) {
                file.save(baseDir);
            });

            resolve('ok');
        });
    });
};
