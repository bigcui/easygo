/**
 * @file: file
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-23 16:53:02
 */


'use strict';
const config = require('../util/config.js');
/**
 * 验证必填字段
 * @param {string} name 文件
 * @param {string} key  字段
 * @param {*} re  校验 [arr,string,json,num]
 */

function valideKey(name, key, value, re, reporter) {
    if (re && re === 'string') {
        if (typeof value !== 'string') {
            reporter.error(name, key + '类型must是字符串');
        }
    }
    if (re && re === 'arr') {
        if (!value instanceof Array) {
            reporter.error(name, key + '类型must是数组');
        }
    }

}
module.exports = {
    name: 'package-json',
    exec: function (context) {
        let file = context.getFile(context.name + '/index.json');
        if (!file) {
            this.reporter.error(file.path, '未解析到index.json文件!');
            return;
        }
        let pkg = {};
        try {
            pkg = JSON.parse(file.content);
        }
        catch (e) {
            this.reporter.error(file.path, '解析index.json文件错误!');
        }

        if (typeof pkg.name !== 'string' || !pkg.name.match(config.elementNameRegex)) {
            this.reporter.error(file.path, '`name`字段错误!');
        }

        if (pkg.name !== context.name) {
            this.reporter.error(file.path, '组件名称与index.json中的`name`字段不一致!');
            return false;
        }
        if (pkg.type !== context.name) {
            this.reporter.error(file.path, '组件名称与index.json中的`type`字段不一致!');
            return false;
        }

        if (!pkg.hasOwnProperty('group')) {
            this.reporter.error(file.path, '`group`是必填字段!');
        }
        else {
            valideKey(file.path, 'group', pkg.group, 'sting', this.reporter);
        }
        if (!pkg.hasOwnProperty('properties')) {
            this.reporter.error(file.path, '`properties`是必填字段!');
        }
        else {
            valideKey(file.path, 'properties', pkg.properties, 'arr', this.reporter);
        }
        if (!pkg.hasOwnProperty('propeditor')) {
            this.reporter.error(file.path, '`propeditor`是必填字段!');
        }
        else {
            valideKey(file.path, 'propeditor', pkg.propeditor, 'arr', this.reporter);
        }

    }
};
