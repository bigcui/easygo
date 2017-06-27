/**
 * @file: file
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-27 14:43:52
*/


'use strict';

module.exports = {
    name: 'less',
    exec: function (context) {
        let file = context.getFile(context.name + '/'  + 'index.less');
        if (!file) {
            return;
        }

        let regex = new RegExp('(^|\s)' + context.name + '\\s*\\{', 'm');
        if (!file.content.match(regex)) {
            this.reporter.error(file.path, 'less 文件中没有包含组件样式');
        }
    }
};
