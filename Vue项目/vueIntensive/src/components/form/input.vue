<template>
    <input
      type="text"
      :value="currentValue"
      @input="onInput"
      @blur="onBlur"
      />
</template>

<script>
export default {
  name: 'iInput',
  props: {
    value: {
      type: String,
      value: ''
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  methods: {
    onInput (event) {
      const val = event.target.value
      this.currentValue = val
      this.$emit('input', val)
      this.$bus.$emit('i-change', val)
    },
    onBlur () {
      this.$bus.$emit('i-blur', this.currentValue)
    }
  }
}
</script>

<style scoped>

</style>
