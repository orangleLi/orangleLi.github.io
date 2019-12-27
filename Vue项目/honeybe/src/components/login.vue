<template>
    <div class="hello">
      <input v-model="username" /><br>
      <input v-model="pwd" /><br>
      <button v-on="login">登录</button>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
              username: '',
              pwd: '',
            }
        },
      methods:{
        login(){

        },
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
