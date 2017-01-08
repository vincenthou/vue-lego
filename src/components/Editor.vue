<template>
  <div class="editor">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'editor'
    }
  }
}
</script>

<style>
.editor {
  flex: 1;
}
</style>
