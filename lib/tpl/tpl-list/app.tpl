<template>
  <div id="app">

  {%for: ${components} as  ${file} , ${index}%}
    ${index}
        <div ref="${index}f"></div>
      {%/for%}

  </div>
</template>
<script>
import Vue from 'vue';
{%for: ${components} as  ${file} , ${index}%}
import ${index} from './dev/${file}/index.vue';
{%/for%}

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

    mounted() {
      {%for: ${components} as ${file} , ${index}%}
          let comp${index} = ${index};
          comp${index}.propsData = comp${index}.json.props
          let newComp${index} = new Vue(comp${index});
          newComp${index}.$mount(this.$refs.${index}f)
      {%/for%}
    }
}
</script>
<style lang="less">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
