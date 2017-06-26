/**
 * @file: file
 * @author: cuihonglei(cuihonglei2xj@gmail.com)
 * @Date: 2017-06-21 17:32:44
*/


import util from './util';

export default {
    data() {
        return {
            isInIDE: global.isInIDE
        };
    },
    methods: {
        submitAndRender(param) {
            this.submit(param).then(res => {
                if (this.isInIDE) {
                    return;
                }
                let allComps = global.allComps;
                for (let name of Object.keys(allComps)) {
                    let widget = allComps[name];
                    if (widget.vm.renderData && typeof widget.vm.renderData === 'function') {
                        widget.vm.renderData(res.data.data);
                    }
                }
            }, res => {
                if (res.data && res.data.msg) {
                    let alert = this.$alert || window.alert;
                    alert(res.data.msg, '提示');
                }
            });
        },

        submit(param) {
            let headerObj = util.requestArrayToObject(param.headerList);
            let paramsObj = util.requestArrayToObject(param.paramList);
            let url = util.buildUrl(param.url);

            let content = util.replaceVariable(param.body.content);
            let body = '';
            if (param.body.type === 'JSON') {
                try {
                    body = JSON.parse(content);
                }
                catch (e) {
                    return Promise.reject({
                        data: {
                            msg: '请求体中 JSON 格式有误'
                        }
                    });
                }
            }
            else {
                body = content;
            }

            let options = {
                headers: headerObj,
                params: paramsObj
            };
            if (param.method !== 'post') {
                body = $.extend({}, options);
                options = null;
            }

            return this.$http[param.method](url, body, options);
        },
        jumpPage(param) {
            let href = '';
            let search = param.page;
            if (search && param.pageParams && param.pageParams.length > 0) {
                // 查找列表容器中的 data
                let row = this.getParentListContainer();
                // 查找所有 input 中的 输入值
                let infos = util.findAllInputValue();
                let allData = $.extend(infos, row);
                param.pageParams.forEach(item => {
                    if (item.name) {
                        search += '&' + item.name + '=' + util.renderMustache(item.value, allData);
                    }
                });
                search = search + '&t=' + new Date().getTime();
                let reg = /\?[\w&=_]+/;
                if (reg.test(location.href)) {
                    href = location.href.replace(reg, '?' + search);
                }
                else {
                    // 第一次无 search
                    href = location.href + '?' + search;
                }
            }
            return href;
        },
        getParentListContainer() {
            let listComp = this.$el.closest('[data-comp="list-container"]');
            let indexEl = this.$el.closest('[data-list-index]');
            if (!listComp || !listComp.__vue__ || !indexEl) {
                return null;
            }
            let data = listComp.__vue__.data;
            let index = indexEl.getAttribute('data-list-index');
            if (+index >= 0 && +index < data.length) {
                return data[index];
            }
            return null;
        },
        renderData(data) {
            let placeholderPropsName = [
                'content', 'width', 'height', 'backgroundColor',
                'visible', 'plain', 'name', 'type', 'readonly', 'value', 'checkedValue',
                'uncheckedValue', 'checked', 'src'];
            let propsData = this.$options.propsData;
            for (let i = 0; i < placeholderPropsName.length; i++) {
                let key = placeholderPropsName[i];
                if (propsData.hasOwnProperty(key)) {
                    this[key] = util.renderMustache(this[key], data);
                }
            }
        }
    }
};
