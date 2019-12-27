<template>
    <div>
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'iForm',
  provide () {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  data () {
    return {
      fields: []
    }
  },
  methods: {
    resetFields () {
      this.fields.forEach(field => {
        field.resetField()
      })
    },
    validate (callback) {
      return new Promise(resolve => {
        let valid = true
        let count = 0
        this.fields.forEach(field => {
          field.validate('', (errors) => {
            if (errors) {
              valid = false
            }
            if (++count === this.fields.length) {
              // 全部完成
              resolve(valid)
              callback && callback(valid)
            }
          })
        })
      })
    }
  },
  created () {
    this.$bus.$on('form-item-add', (field) => {
      if (field) {
        this.fields.push(field)
      }
    })
    this.$bus.$on('form-item-remove', (field) => {
      if (field.prop) {
        this.fields = this.fields.filter(item => field.prop !== item.prop)
      }
    })
  },
  beforeDestroy () {
    this.$bus.$off('form-item-add')
    this.$bus.$off('form-item-remove')
  }
}
</script>

<style scoped>

</style>
