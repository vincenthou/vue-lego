<template>
  <div class="container">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'components'
    }
  }
}
</script>

<style>
.container {
  flex: 1;
}
</style>
