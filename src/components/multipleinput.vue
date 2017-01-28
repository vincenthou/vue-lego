<template>
  <section class="mutiple-input">
    <el-tag
      v-for="(tag, index) in tags"
      :closable="true"
      :key="index"
      :close-transition="false"
      @close="deleteTag(tag)"
    >{{tag}}</el-tag>
    <input
      type="text"
      placeholder="输入并且回车确认"
      v-model="tag"
      @keyup.enter="addTag"
      class="transparent-input"
      autofocus="true"
    ></input>
  </section>
</template>

<script>
  export default {
    props: {
      value: Array
    },
    data () {
      return {
        tag: '',
        tags: this.value
      }
    },
    watch: {
      value (val) {
        console.log(val)
        this.tags = val
      },
      tags (val) {
        console.log(val)
        this.$emit('input', val)
      }
    },
    methods: {
      addTag () {
        this.tags.push(this.tag)
        this.tag = ''
      },
      deleteTag (tag) {
        this.tags.splice(this.tags.indexOf(tag), 1)
      }
    }
  }
</script>

<style>
  .mutiple-input {
    text-align: left;
  }
  .mutiple-input .el-tag {
    margin-right: 10px;
  }
  .transparent-input {
    border: none;
    height: 24px;
    outline: none;
  }
</style>
