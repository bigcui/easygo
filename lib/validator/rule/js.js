/**
 * @file:  vuefile
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-23 13:49:42
*/

module.exports = {
    name: 'js',
    exec: function (context) {
        let file = context.getFile(context.name + '/' +  'index.js');
        if (!file) {
            return;
        }

        // let regex = new RegExp('(^|\s)' + context.name + '\\s*\\{', 'm');
        // if (!file.content.match(regex)) {
        //     this.reporter.error(file.path, 'less 文件中没有包含组件样式');
        // }
    }
};
