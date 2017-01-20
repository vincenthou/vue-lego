<template>
  <el-card class="box-card">
    <div slot="header">
      <h1>组件库</h1>
    </div>
    <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name">
        <draggable class="components" :list="tab.components" :options="{group:{name:'component',pull:'clone',put:false},sort:false}">
          <div class="component" v-for="component in tab.components">
            <h2>{{component.title}}</h2>
          </div>
        </draggable>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import tabs from '../config/components/tabs.json'
import draggable from 'vuedraggable'

tabs.forEach(tab => {
  let components = require(`../config/components/${tab.name}.json`)
  tab.components = components
})

export default {
  data () {
    return {
      activeTab: 'container',
      tabs: tabs
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

