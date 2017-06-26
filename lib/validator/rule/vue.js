/**
 * @file:  vuefile
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-23 13:49:42
 */
/**
 * @file index.js
 * @author tangciwei(tangciwei@qq.com)
 *
 * @since 2017-05-18
 */

let exec = require('child_process').exec;
let fecs = require('fecs');
let chalk = require('chalk');
let co = require('co');
const esprima = require('esprima');
const estraverse = require('estraverse');
const SYNTAX = estraverse.Syntax;
module.exports = {
    name: 'vue',
    valide(options) {
        fecs.check(options, (err, data) => {
            if (err) {
                // return console.log(err);
            }
            //  console.log(chalk.red('【强制性错误有】'));

            let fileCount = 0;
            let errNum = 0;
            data.forEach(item => {
                let filename = item.relative;
                let errors = item.errors;

            });


        });
    },

    validateModule(file) {
        const self = this;
        let data = file.content;

        let template = data.match(/\<template(.*)\>([\s\S]+)\<\/template\>/);
        let script = data.match(/\<script(.*)\>([\s\S]+)\<\/script\>/);
        let style = data.match(/\<style(.*)\>([\s\S]+)\<\/style\>/);
        if (!template) {
            self.reporter.error(file.path, '找不到，template部分');
        }
        if (!style) {
            self.reporter.error(file.path, '找不到，style部分');
        }
        if (!script) {
            self.reporter.error(file.path, '找不到，script部分');
        }


    },
    exec(context) {
        let file = context.getFile(context.name + '/' + 'index.vue');
        if (!file) {
            return;
        }
        let path = process.cwd() + '/' + context.name + '/' + 'index.vue';
        let command = '';
        command = '--type=vue';
        this.validateModule(file);
    }
};
