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
    // let self = this
    return createElem('el-form', {
      props: this.props
    })
  }
}

