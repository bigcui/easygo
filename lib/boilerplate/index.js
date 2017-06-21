/**
 * @file 组件生成模板
 * @author cuihonglei(cuihonglei2xj@gmail.com)
 */

'use strict';
const boilerplate = require('../tpl');

const render = require('../util/render');
const string = require('../util/string');
const File = require('./File');

module.exports = {

    page: function (options) {

        const content = render.render(boilerplate.readTemplate('index.html'), options);
        return [new File(options.name, content)];
    },
    index: function (options) {

        let fileName = 'index.tpl';
        const content = render.render(boilerplate.readTemplate(fileName), options);
        return [new File('index.html', content)];
    },
    element: function (options) {
        // 模板生成映射
        const templateMap = {
            'index.vue': '${name}/index.vue',
            'index.json': '${name}/index.json'
        };
        if (options.custom) {
            templateMap['index.less'] = '${name}/index.less';

        }

        let ret = [];
        Object.keys(templateMap).forEach(function (templatePath) {
            let content = render.render(boilerplate.readTemplate(templatePath), options);
            let fileName = string.format(templateMap[templatePath], options);
            ret.push(new File(fileName, content));
        });

        return ret;
    },
    list: function (options) {
        let fileName = 'list.tpl';
        const content = render.render(boilerplate.readTemplate(fileName), options);
        return [new File('list.html', content)];
    },
    config: function (options) {
        let fileName = 'index.config';
        if (options && options.isCustom) {
            fileName = 'easygocustom.config';
        }

        const content = render.render(boilerplate.readTemplate(fileName), options);
        return [new File('easygo.config', content)];
    },
    easygocustom: function (options) {
        const content = render.render(boilerplate.readTemplate('easygocustom.html'), options);
        return [new File(options.name, content)];
    },
    easygomain: function (options) {

        return render.render(boilerplate.readTemplate('easygomain.tpl'), options);
    }
};
