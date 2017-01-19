<template>
  <el-card class="box-card">
    <div slot="header">
      <h1>组件库</h1>
    </div>
    <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
      <el-tab-pane label="容器" name="container">
        <draggable class="components" :list="components" :options="{group:{name:'component',pull:'clone',put:false},sort:false}">
          <div class="component" v-for="component in components">
            <h2>{{component.title}}</h2>
          </div>
        </draggable>
      </el-tab-pane>
      <el-tab-pane label="组件" name="component">组件</el-tab-pane>
      <el-tab-pane label="控件" name="control">控件</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  data () {
    return {
      activeTab: 'container',
      components: [
        {
          name: 'mt-range',
          title: 'range',
          props: {
            value: 10
          }
        },
        {
          name: 'mt-swipe',
          title: 'swipe',
          props: {
          }
        },
        {
          name: 'mt-radio',
          title: 'radio',
          props: {
            value: '选项B',
            options: ['选项A', '选项B', '选项C']
          }
        }
      ]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  components: {
    draggable
  }
}
</script>

<style>
.components {
  list-style: none;
  padding: 0 30px;
  margin: 0;
}

.component {
  display: inline-block;
  width: 25%;
  height: 100px;
  background-color: #ccc;
  cursor: pointer;
  border: 1px solid #fff;
}

.gu-mirror {
  padding: 10px;
  cursor: grabbing;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity 0.4s ease-in-out;
}
</style>

