

const fs = require('fs');

const path = require('path');
const boilerplate = require('./lib/boilerplate');
const cli = require('./lib/cli');
const render = require('./lib/util/render.js');
const File = require('./lib/boilerplate/File');

function createComp(options) {

    const tpl = fs.readFileSync(path.join(process.cwd(), 'App.tpl'), 'utf8');

    const content = render.render(tpl, options);

    return [new File(options.name, content)];
}
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
                url: '/local-extension-debug/' + file,
                mtime: stat.mtime
            });
            console.log(list, '77==');
        }

    });

    var s = {};
    list.forEach(file => {
        var big = file.name.split('-')[1].substring(0, 1).toUpperCase();
        var name = file.name.split('-')[0] + big + file.name.split('-')[1].substring(1);
        s[name] = file.name;

    });
    console.log(list, s);

    const ffs = createComp({
        name: 'App.vue',
        files: list,
        components: s
    });

    ffs.forEach(function (file) {
        file.save(process.cwd());
        cli.info('generate file success:', cli.chalk.green(file.path));
    });

});
