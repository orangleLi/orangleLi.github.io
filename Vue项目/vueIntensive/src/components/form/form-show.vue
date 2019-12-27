<template>
    <div>
      <i-form ref="form" :model="formValidate" :rules="rules">
        <i-form-item label="用户名" prop="name" class="test">
          <i-input v-model="formValidate.name"/>
        </i-form-item>
        <i-form-item label="邮箱" prop="email">
          <i-input v-model="formValidate.email"/>
        </i-form-item>
      </i-form>
      <button @click="submit">提交</button>
      <button @click="resetFields">重置</button>
    </div>
</template>

<script>
import IForm from './form'
import IFormItem from './form-item'
import IInput from './input'
export default {
  name: 'form-show',
  components: {IInput, IFormItem, IForm},
  data () {
    return {
      formValidate: {
        name: '',
        mail: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate((valid) => {
        let msg = valid ? '提交成功通过' : '表单校验失败'
        alert(msg)
      })
    },
    resetFields () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>

</style>
