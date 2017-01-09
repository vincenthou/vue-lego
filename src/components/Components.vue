<template>
  <el-card class="box-card">
    <div slot="header">
      <h1>组件库</h1>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="容器" name="container">容器</el-tab-pane>
      <el-tab-pane label="组件" name="component">组件</el-tab-pane>
      <el-tab-pane label="控件" name="control">控件</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'container'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style>
</style>
