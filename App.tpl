<template>
  <div id="app">
   {%for: ${files} as ${file}%}
        <${file.name}></${file.name}>
      {%/for%}

  </div>
</template>

<script>
{%for: ${components} as  ${file} , ${index}%}
import ${index} from './${file}/${file}.vue';
{%/for%}
var component = {};

{%for: ${components} as ${file} , ${index}%}
component.${index}=${index};
{%/for%}
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
    components:component,
    mounted() {
    }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
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
