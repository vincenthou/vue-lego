<template>
  <el-card class="box-card">
    <div slot="header">
      <h1>编辑器</h1>
    </div>
    <dynamic-form
      :name="form.name"
      :data="{form:form.props}"
      @change="onPropsChanged">
    </dynamic-form>
  </el-card>
</template>

<script>
// import {SET_COMPONENT_PROPS} from 'src/constants/mutations'
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
    },
    onPropsChanged () {
      console.log(arguments)
    }
  },
  components: {
    DynamicForm
  }
}
</script>

<style>
.el-form {
  margin: 20px;
}
.el-form-item__label {
  width: 40px;
}
.el-form-item__content {
  margin-left: 40px;
}
</style>
