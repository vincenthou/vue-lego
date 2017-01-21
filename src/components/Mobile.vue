<template>
  <section class="mobile">
    <draggable class="screen"
      :list="sections"
      :options="{group:'component'}"
      @change="onComponentsChanged">
      <div class="section" v-for="section in sections">
        <component-proxy :name="section.name" :props="section.props"></component-proxy>
      </div>
    </draggable>
  </section>
</template>

<script>
import {SET_CUR_COMPONENT} from 'src/constants/mutations'
import draggable from 'vuedraggable'
import ComponentProxy from 'src/factory/component-proxy'

export default {
  data () {
    return {
      sections: []
    }
  },
  methods: {
    onComponentsChanged (e) {
      if (e.added) {
        this.$store.commit(SET_CUR_COMPONENT, e.added.element)
        console.log(e.added.newIndex)
      }
      if (e.moved) {
        this.$store.commit(SET_CUR_COMPONENT, e.moved.element)
        console.log(e.moved.oldIndex)
        console.log(e.moved.newIndex)
      }
      if (e.removed) {
        this.$store.commit(SET_CUR_COMPONENT, null)
        console.log(e.removed.oldIndex)
      }
    }
  },
  components: {
    draggable,
    ComponentProxy
  }
}
</script>

<style>
.mobile {
  position: relative;
  border-radius: 15px;
  padding: 20px;
  padding-top: 50px;
  padding-bottom: 80px;
  border: 2px solid #ccc;
  margin: 0 20px;
}

.screen {
  overflow: auto;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 375px;
  height: 667px;
}

.screen:before {
  content: "";
  position: absolute;
  top: 25px;
  width: 50px;
  height: 5px;
  background-color: #ccc;
  margin-left: -25px;
  border-radius: 2px;
}

.screen:after {
  content: "";
  position: absolute;
  bottom: 10px;
  width: 50px;
  height: 50px;
  margin-left: -25px;
  border-radius: 50%;
  border: 4px solid #ccc;
}
</style>
