ARA 扩展组件规范 - index.vue
==============
  
  ### vue模板 index.vue

在本文档中，使用的关键字会以中文+括号包含的关键字英文表示：必须(MUST)。关键字"MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL"被定义在rfc2119中。



文件
----

### package.json 文件 **必须(MUST)** 使用无 BOM 的 UTF-8 编码

`解释`: UTF-8 编码具有更广泛的适应性。[BOM](https://en.wikipedia.org/wiki/Byte_order_mark) 在使用程序或工具处理文件时可能造成不必要的干扰。

```html
<template>
    <a ref="jLabel" class="label" href="javascript:;" v-html="content" :style="{margin: margin, width: width, height: height, background: backgroundColor}" :class="{invisible: !isInIDE && visible === 'false'}">
    </a>
</template>

<script>
import util from '../common/util';
import config from './index.json';

import submit from '../common/submit';

let {json, props} = util.getDataProps(config);

export default {
    json: json,
    props: props,
    mixins: [submit],
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (this.isInIDE) {
                return;
            }
            let href = this.href;
            if (href.type === 'url') {
                $(this.$refs.jLabel).attr('href', href.url);
            } else if (href.type === 'page') {
                $(this.$refs.jLabel).click(this.clickLable.bind(this));
            } else if (href.type === 'phone') {
                $(this.$refs.jLabel).attr('href', 'tel:' + href.phone);
            } else if (href.type === 'message') {
                $(this.$refs.jLabel).attr('href', 'sms:' + href.phone);
            }
        },
        clickLable () {
            let href = this.jumpPage(this.href);
            if (href) {
                setTimeout(() => {
                    location.href = href;
                }, 0);
            }
        }
    }
}
</script>

<style lang="less">
    .label {
        display: block;
        color: inherit;
        text-decoration: none;
    }
</style>
```

## 由于项目使用了vue2.0，所以每个.vue文件主要分为三部分：

 1. template：组件的模板；
 2. script：将index.json中配置的properties传化为对象的形式，传入vue组件的props中，再利用vue的双向绑定，通过template渲染组件；（支持外链 index.js或者其他 ）
 3. style：组件的样式，使用less语法。 （支持外链 index.less ）
`解释`: common模块是组件开发公共能力  待续
