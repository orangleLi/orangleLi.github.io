export default {
  data () {
    return {
      userInfo: null
    }
  },
  methods: {
    getUserInfo () {
      this.userInfo = {
        name: 'zs',
        age: 18
      }
    }
  }
}
