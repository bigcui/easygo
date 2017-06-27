/**
 * @file:  vuefile
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-23 13:49:42
 */


let exec = require('child_process').exec;
let chalk = require('chalk');

module.exports = {
    name: 'vue',
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
