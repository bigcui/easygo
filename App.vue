<template>
  <div id="app">
   
        <easygo-cc></easygo-cc>
      
        <easygo-nav></easygo-nav>
      

  </div>
</template>

<script>

import easygoCc from './easygo-cc/easygo-cc.vue';

import easygoNav from './easygo-nav/easygo-nav.vue';

var component = {};


component.easygoCc=easygoCc;

component.easygoNav=easygoNav;

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
