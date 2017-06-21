<template>
    <a ref="jLabel" class="${name}" href="javascript:;" v-html="content" :style="{margin: margin, width: width, height: height, background: backgroundColor}" :class="{invisible: !isInIDE && visible === 'false'}">
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
            }
            else if (href.type === 'page') {
                $(this.$refs.jLabel).click(this.clickLable.bind(this));
            }
            else if (href.type === 'phone') {
                $(this.$refs.jLabel).attr('href', 'tel:' + href.phone);
            }
            else if (href.type === 'message') {
                $(this.$refs.jLabel).attr('href', 'sms:' + href.phone);
            }

        },
        clickLable() {
            let href = this.jumpPage(this.href);
            if (href) {
                setTimeout(() => {
                    location.href = href;
                }, 0);
            }

        }
    }
};

</script>
<style lang="less">
.${name} {
    display: block;
    color: inherit;
    text-decoration: none;
}
</style>
