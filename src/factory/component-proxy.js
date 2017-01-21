export default {
  props: {
    name: {
      type: String,
      required: true
    },
    props: {
      type: Object,
      required: true
    }
  },
  render (createElem) {
    let self = this
    return createElem(this.name, {
      props: this.props,
      on: {
        change (value) {
          self.value = value
        }
      }
    })
  }
}
