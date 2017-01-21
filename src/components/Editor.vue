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
    return {}
  },
  computed: {
    form () {
      let formObj = {name: '', props: {}}
      let currentComponent = this.$store.state.currentComponent
      // TODO: change the component data structure
      if (currentComponent) {
        formObj.name = currentComponent.name
        formObj.props = currentComponent.props
      }
      return formObj
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
