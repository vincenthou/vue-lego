import FormRadio from 'src/form/radio'

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  render (createElement) {
    let name = this.name.replace('mt-', '')
    if (!name) return
    return createElement('form-' + name, {
      data: this.data
    })
  },
  components: {
    FormRadio
  }
}

