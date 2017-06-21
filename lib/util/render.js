/**
 * @file 模板渲染器引擎
 * @author
 */

const etpl = require('etpl');
const engine = new etpl.Engine({
    commandOpen: '{%',
    commandClose: '%}'
});

module.exports = {
    render: function (template, data) {
        const renderer = engine.compile(template);
        return renderer(data);
    }
};
