<template>
  <div id="nav">
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>3</li>
      <li>4</li>
      {{msg}}
    </ul>
  </div>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<!-- <style lang="less" src="./nav.less"></style> -->
<style lang="less">
#nav {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  li{
     height: 20px;

  }
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
