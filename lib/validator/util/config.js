/**
 * @file: file验证器配置
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-23 11:16:15
*/


module.exports = {

    // mip组件名称校验
    elementNameRegex: /^easygo-[\w\-]+$/,

    // 最大的文件层级
    maxFileDepth: 2,

    // mip扩展验证器
    extensionValidateRules: [
        'element-name',
        'json',
        'less',
        'js',
        'vue'
    ]
};
