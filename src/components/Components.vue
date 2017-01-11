<template>
  <el-card class="box-card">
    <div slot="header">
      <h1>组件库</h1>
    </div>
    <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
      <el-tab-pane label="容器" name="container">
        <ul class="components" v-dragula="components" drake="first">
          <li class="component" v-for="component in components">
            <h2>{{component.title}}</h2>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="组件" name="component">组件</el-tab-pane>
      <el-tab-pane label="控件" name="control">控件</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeTab: 'container',
      components: [
        {
          name: 'icon',
          title: 'cpt'
        },
        {
          name: 'icon',
          title: 'cpt'
        },
        {
          name: 'icon',
          title: 'cpt'
        },
        {
          name: 'icon',
          title: 'cpt'
        },
        {
          name: 'icon',
          title: 'cpt'
        },
        {
          name: 'icon',
          title: 'cpt'
        },
        {
          name: 'icon',
          title: 'cpt'
        },
        {
          name: 'icon',
          title: 'cpt'
        }
      ]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  created () {

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

