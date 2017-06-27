/**
 * @file: file
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-16 10:47:17
*/

const fs = require('fs');
const path = require('path');

function getConfigPath(name) {
    const home = process.env[
        require('os').platform() === 'win32'
            ? 'APPDATA'
            : 'HOME'
    ];
    return path.join(home, '.' + name + '.json');
}

/**
 * 按照名称获取当前配置
 *
 * @param {string} name 配置名称
 * @return {Object}
 */
exports.get = function (name) {
    const configPath = getConfigPath(name);
    if (fs.existsSync(configPath)) {
        return require(configPath);
    }

    return null;
};

/**
 * 获取当前程序的默认配置
 *
 * @return {Object}
 */
exports.getDefault = function () {
    return this.get('easygo-cli');
};

/**
 * 设置当前程序的配置
 *
 * @param {string} name 配置名称
 * @param {string} field 配置字段
 * @param {string} value 设置值
 * @return {Object}
 */
exports.set = function (name, field, value) {
    var config = this.get(name) || {};
    if (typeof field === 'object') {
        Object.assign(config, field);
    }
    else {
        config[field] = value;
    }
    const configPath = getConfigPath(name);
    fs.writeFileSync(configPath, JSON.stringify(config));
    return config;
};

/**
 * 设置当前程序的默认配置
 *
 * @param  {string} field 配置字段
 * @param  {string} value 设置值
 * @return {Object}
 */
exports.setDefault = function (field, value) {
    return this.set('easygo-cli', field, value);
};
