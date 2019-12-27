<template>
    <div>
      <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{label}}</label>
      <div>
        <slot></slot>
        <div v-if="validateState === 'error'" class="i-form-item-message">{{validateMessage}}</div>
      </div>
    </div>
</template>

<script>
import AsyncValidator from 'async-validator'
export default {
  name: 'iFormItem',
  inject: ['form'],
  // inheritAttrs：默认值true,继承所有的父组件属性（除props的特定绑定）作为普通的HTML特性应用在子组件的根元素上，
  // 如果你不希望组件的根元素继承特性设置inheritAttrs: false, 但是class属性会继承
  // （简单的说，inheritAttrs：true 继承除props之外的所有属性；inheritAttrs：false 只继承class属性）
  inheritAttrs: false,
  // props: {
  //   label: {
  //     type: String,
  //     value: ''
  //   },
  //   prop: {
  //     type: String,
  //     value: ''
  //   }
  // },
  data () {
    return {
      isRequired: false, // 是否必填
      validateState: '', // 校验状态
      validateMessage: '' // 校验不通过时的提示信息
    }
  },
  computed: {
    filedValue () {
      return this.form.model[this.prop]
    },
    label () {
      return this.$attrs.label
    },
    prop () {
      return this.$attrs.prop
    }
  },
  methods: {
    setRules () {
      let rules = this.getRules()
      if (rules.length) {
        rules.forEach(item => {
          if (item.required) {
            this.isRequired = item.required
          }
        })
      }
      this.$bus.$on('i-blur', this.onFieldBlur)
      this.$bus.$on('i-change', this.onFieldChange)
    },
    getRules () {
      let rules = this.form.rules
      return rules ? [].concat(rules[this.prop]) : []
    },
    // 只支持 blur 和 change 所以过滤去符合规则的rule规则
    getFilteredRule (trigger) {
      let rules = this.getRules()
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    validate (trigger, callback = function () {}) {
      let rules = this.getFilteredRule(trigger)
      if (!rules || rules.length === 0) {
        return true
      }

      this.validateState = 'validating'

      // 以下为 async-validator 库的调用方法
      let descriptor = {}
      descriptor[this.prop] = rules

      let model = {}
      model[this.prop] = this.filedValue
      let validator = new AsyncValidator(descriptor)
      validator.validate(model, {firstFields: true}, errors => {
        this.validateState = errors ? 'error' : 'success'
        this.validateMessage = errors ? errors[0].message : ''

        callback(this.validateMessage)
      })
    },
    onFieldBlur () {
      this.validate('blur')
    },
    onFieldChange () {
      this.validate('change')
    },
    resetField () {
      this.form.model[this.prop] = this.initValue
    }
  },
  // 组件渲染是，将实例缓存在Form中
  mounted () {
    // 如果没有传入prop 无需缓存，也无需校验
    if (this.prop) {
      this.$bus.$emit('form-item-add', this)

      // 设置初始值，以便在重置是恢复
      this.initValue = this.filedValue

      this.setRules()
    }
  },
  beforeDestroy () {
    this.$bus.$emit('form-item-remove', this)
    this.$bus.$off('i-blur')
    this.$bus.$off('i-change')
  }
}
</script>

<style scoped>
  .i-form-item-label-required:before {
    content: '*';
    color: red;
  }
  .i-form-item-message {
    color: red;
  }
</style>
