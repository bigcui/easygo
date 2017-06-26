/**
 * @file: file
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-21 17:32:51
*/

export default {
    getDataProps(json) {
        let properties = json.properties;
        let props = [];
        let propsObj = {};
        for (let i = 0; i < properties.length; i++) {
            props.push(properties[i].name);
            propsObj[properties[i].name] = properties[i].value;
        }
        json.props = propsObj;
        return {json, props};
    },

    /**
     * 简易渲染 Mustache 语法模板
     *
     * @param {string} tpl 模板
     * @param {Object} opts 数据
     * @return {string} value
     */
    renderMustache(tpl, opts) {
        let reg = /{{\s*(\w+(\[(\d+)?\])?)\s*}}/mg;
        let result;
        let tempTpl = tpl;
        while ((result = reg.exec(tpl)) !== null) {
            if (result[3] !== undefined) {
                let value = opts[result[1].replace(result[2], '')];
                if (value && (Object.prototype.toString.call(value) === '[object Object]'
                    || Object.prototype.toString.call(value) === '[object Array]')
                    && typeof value[result[3]] !== 'undefined') {
                    tempTpl = tempTpl.replace(result[0], value[result[3]]);
                }
            } else if (typeof opts[result[1]] !== 'undefined') {
                tempTpl = tempTpl.replace(result[0], opts[result[1]]);
            }
        }
        return tempTpl;
    },

    /**
     * 构建 url
     *
     * @param {string} url 用户输入的 url
     * @return {string} url 最终 url
     */
    buildUrl(url) {
        let reg = /^\//;
        if (reg.test(url)) {
            url = window.DOMAIN + url;
        }
        return this.replaceVariable(url);
    },

    requestArrayToObject(paramsList) {
        if (!paramsList || !paramsList.length) {
            return {};
        }
        let inputReg = /{{\w+}}/g;
        let paramsObj = {};
        for (let i = 0; i < paramsList.length; i++) {
            if (paramsList[i].name && paramsList[i].value) {
                let matchArr = paramsList[i].value.match(inputReg);
                if (/*!global.isInIDE && */matchArr !== null) {
                    // 在 dom 中查找 name 为 match 的表单项元素
                    let value = paramsList[i].value;
                    for (let j = 0; j < matchArr.length; j++) {
                        let inputName = matchArr[j].replace('{{', '').replace('}}', '');
                        let strRegex = matchArr[j];
                        // 按照优先级，每次都全量替换
                        let reg = new RegExp(strRegex, 'g');
                        // 从本页表单项中替换
                        value = value.replace(reg, this.findInputValue(inputName));
                        // 从 localStorage 和 location search 中替换
                        let totalData = this.findPreviewValue();
                        for (let key in totalData) {
                            if (totalData.hasOwnProperty(key)) {
                                if (inputName === key) {
                                    value = value.replace(reg, totalData[key]);
                                }
                            }
                        }
                    }
                    paramsObj[paramsList[i].name] = value;
                } else {
                    paramsObj[paramsList[i].name] = paramsList[i].value;
                }
            }
        }
        return paramsObj;
    },
    replaceVariable(str) {
        if (!str/* || global.isInIDE*/) {
            return null;
        }
        let inputReg = /{{\w+}}/g;
        let matchArr = str.match(inputReg);
        let value = str;
        if (matchArr !== null) {
            let inputName = '';
            for (let i = 0; i < matchArr.length; i++) {
                inputName = matchArr[i].replace('{{', '').replace('}}', '');
                let strRegex = matchArr[i];
                // 按照优先级，每次都全量替换
                let reg = new RegExp(strRegex, 'g');
                // 从本页表单项中替换
                value = value.replace(reg, this.findInputValue(inputName));
                // 从 localStorage 和 location search 中替换
                let totalData = this.findPreviewValue();
                for (let key in totalData) {
                    if (totalData.hasOwnProperty(key)) {
                        if (inputName === key) {
                            value = value.replace(reg, totalData[key]);
                        }
                    }
                }
            }
        }
        return value;
    },
    findInputValue(name) {
        let value = '';
        let eleType = '';
        let inputType = '';

        let inputs = $('input[name="' + name + '"], textarea[name="'
            + name + '"], select[name="' + name + '"]', $('#app'));

        if (inputs.length === 1) {
            eleType = inputs.get(0).tagName.toLowerCase();
            if (eleType === 'input') {
                inputType = inputs.attr('type');
                switch (inputType) {
                    case 'text':
                    case 'hidden':
                    case 'password':
                    case 'number':
                    case 'email':
                    case 'tel':
                    case 'url':
                        value = inputs.val();
                        break;
                    case 'radio':
                    case 'checkbox':
                        if (inputs.is(':checked')) {
                            value = inputs.data('checkedvalue');
                        } else {
                            value = inputs.data('uncheckedvalue');
                        }
                        break;
                    default:
                        break;
                }
            } else if (eleType === 'select' || eleType === 'textarea') {
                value = inputs.val();
            }
        }
        else if (inputs.length > 1) {
            // 先取最后一个判断是什么类型
            let tempEle = $(inputs.get(inputs.length - 1));
            eleType = tempEle.get(0).tagName.toLowerCase();
            if (eleType === 'input') {
                inputType = tempEle.attr('type');
                switch (inputType) {
                    case 'text':
                    case 'hidden':
                    case 'password':
                    case 'number':
                    case 'email':
                    case 'tel':
                    case 'url':
                        value = tempEle.val();
                        break;
                    case 'radio':
                        inputs.each((i, e) => {
                            if ($(e).is(':checked')) {
                                value = $(e).data('checkedvalue');
                                return false;
                            }
                        });
                        break;
                    case 'checkbox':
                        value = [];
                        inputs.each((i, e) => {
                            if ($(e).is(':checked')) {
                                value.push($(e).data('checkedvalue'));
                            }
                        });
                        value = JSON.stringify(value);
                        break;
                    default:
                        break;
                }
            }
            else if (eleType === 'select' || eleType === 'textarea') {
                value = tempEle.val();
            }
        }
        return value;
    },
    findAllInputValue() {
        let obj = {};

        let inputs = $('input[name], textarea[name], select[name]', $('#app'));

        for (let i = 0; i < inputs.length; i++) {
            let item = $(inputs[i]);
            let name = item.attr('name');
            let value = this.getInputValue(item);
            obj[name] = value;
        }
        return obj;
    },
    getInputValue(inputs) {
        let value = '';
        let eleType = '';
        let inputType = '';

        if (inputs.length === 1) {
            eleType = inputs.get(0).tagName.toLowerCase();
            if (eleType === 'input') {
                inputType = inputs.attr('type');
                switch (inputType) {
                    case 'text':
                    case 'hidden':
                    case 'password':
                    case 'number':
                    case 'email':
                    case 'tel':
                    case 'url':
                        value = inputs.val();
                        break;
                    case 'radio':
                    case 'checkbox':
                        if (inputs.is(':checked')) {
                            value = inputs.data('checkedvalue');
                        } else {
                            value = inputs.data('uncheckedvalue');
                        }
                        break;
                    default:
                        break;
                }
            } else if (eleType === 'select' || eleType === 'textarea') {
                value = inputs.val();
            }
        }
        else if (inputs.length > 1) {
            // 先取最后一个判断是什么类型
            let tempEle = $(inputs.get(inputs.length - 1));
            eleType = tempEle.get(0).tagName.toLowerCase();
            if (eleType === 'input') {
                inputType = tempEle.attr('type');
                switch (inputType) {
                    case 'text':
                    case 'hidden':
                    case 'password':
                    case 'number':
                    case 'email':
                    case 'tel':
                    case 'url':
                        value = tempEle.val();
                        break;
                    case 'radio':
                        inputs.each((i, e) => {
                            if ($(e).is(':checked')) {
                                value = $(e).data('checkedvalue');
                                return false;
                            }
                        });
                        break;
                    case 'checkbox':
                        value = [];
                        inputs.each((i, e) => {
                            if ($(e).is(':checked')) {
                                value.push($(e).data('checkedvalue'));
                            }
                        });
                        value = JSON.stringify(value);
                        break;
                    default:
                        break;
                }
            } else if (eleType === 'select' || eleType === 'textarea') {
                value = tempEle.val();
            }
        }
        return value;
    },
    validate(type, value, vm) {
        let reg = null;
        switch (type) {
            case 'url':
                let strRegex = '(https?:\\/\\/)?(www\\.)?([-a-zA-Z0-9@:%._\\+~#=]'
                    + '{2,256})?(\\.[a-z0-9]{2,6})?\\b((\\/)?[-a-zA-Z0-9@:%_\\+.~#?&//=]*)';
                reg = new RegExp(strRegex, 'i');
                if (!reg.test(value)) {
                    vm.$alert('url 格式不正确', '提示');
                    return false;
                }
                break;
            case 'phone':
                reg = /1[3,5,8]\d{9}/;
                if (!reg.test(value)) {
                    vm.$alert('联系电话格式不正确', '提示');
                    return false;
                }
                break;
            case 'js':
                break;
            default:
                // default
        }
        return true;
    },
    findPreviewValue() {
        let val = localStorage.getItem(global.APPKEY || '');
        let data = {};
        if (val) {
            data = JSON.parse(val);
        }
        let queryObject = this.getQueryObj();
        let totalData = $.extend(data, queryObject);
        return totalData;
    },
    // 将查询字符串组装成对象
    getQueryObj() {
        let url = location.href;
        let searchStr = url.substr(url.lastIndexOf('?') + 1);
        let reg = /([^?&=]+)=([^?&=]+)/g;
        let obj = {};
        searchStr.replace(reg, function (rs, $1, $2) {
            let name = decodeURIComponent($1);
            let value = decodeURIComponent($2);
            obj[name] = value;
            return rs;
        });
        return obj;
    }
};
