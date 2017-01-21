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
  render (createElement) {
    return createElement('el-form', {
      props: this.props
    }, [
      createElement('p', {}, this.name)
    ])
  }
}

