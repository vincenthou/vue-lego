<template>
  <el-form :model="form">
    <el-form-item label="对齐">
      <el-input v-model="form.align"></el-input>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="选项">
      <multiple-input v-model="form.options"></multiple-input>
    </el-form-item>
  </el-form>
</template>

<script>
  import MultipleInput from 'components/multipleinput'
  export default {
    data () {
      return {
        form: {
          align: '',
          title: '',
          options: []
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    },
    components: {
      MultipleInput
    }
  }
</script>
