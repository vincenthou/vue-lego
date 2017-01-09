<template>
  <div id="app">
    <components></components>
    <mobile></mobile>
    <editor></editor>
  </div>
</template>

<script>
import Components from 'components/Components'
import Mobile from 'components/Mobile'
import Editor from 'components/Editor'

export default {
  name: 'app',
  components: {
    Components,
    Mobile,
    Editor
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
}

.box-card {
  flex: 1;
}

.box-card h1 {
  margin: 0;
}

.el-card__header {
  border-bottom: none;
}

.el-card__body {
  padding: 0;
}
</style>
