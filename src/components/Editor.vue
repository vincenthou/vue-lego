<template>
  <el-card class="box-card">
    <div slot="header">
      <h1>编辑器</h1>
    </div>
    <dynamic-form></dynamic-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style>
</style>
