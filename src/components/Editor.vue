<template>
  <el-card class="box-card">
    <div slot="header">
      <h1>编辑器</h1>
    </div>
    <dynamic-form :name="form.name" :props="form.props"></dynamic-form>
  </el-card>
</template>

<script>
import DynamicForm from 'src/factory/form-builder'

export default {
  data () {
    return {
      form: {
        name: 'test',
        props: {}
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  },
  components: {
    DynamicForm
  }
}
</script>

<style>
</style>
