<template>
  <div>
    <div class="container" v-if="dialogIsShow">
      <!--<transition name="drop">-->
        <div class="frame" v-if="dialogIsShow">
          <div class="close hidden-lg hidden-md nav-log" @click="closeDialog">
            <img src="../../static/images/close.png">
          </div>
          <slot></slot>
        </div>
      <!--</transition>-->
    </div>
  </div>
</template>

<script>
    export default {
        props: {
          dialogIsShow: {
            type: Boolean,
            default: false
          }
        },
        data() {
            return {
              scroll: ""
            }
        },
        components: {
        },
        methods:{
          closeDialog(){
            this.$emit('close-dialog');
          }
        },
    }
</script>

<style scoped lang="less">
  .drop-enter-active {
    transition: all .5s;
  }
  .drop-leave-active {
    transition: all .3s;
  }
  .drop-enter {
    transform: translateY(-500px);
  }
  .drop-leave-active {
    transform: translateY(-500px);
  }
  .container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(0,0,0,0.75);
    padding: 0;
    margin: 0;
    display: block;
    width: 100%;

    .frame {
      -webkit-transition: myfirst 1s;
      position: fixed;
      top: 6%;
      bottom: 6%;
      margin: 0 13%;
      background-color: #FFF;
      border: 1px solid #404040;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
      height: 80%;
      overflow: auto;
    }
    @keyframes myfirst
    {
      from {
        top: 0;
      }
      to {
        top: 4%;
      }
    }
  }
  .close{
    float: right;
    opacity: 1;
    line-height: 1rem;
    position: fixed;
    top: 1.5rem;
    right: 1rem;
    transition: all linear 0.5s;
    z-index: 9999;
    &:hover{
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  
  @media (min-width: 768px) {
    .container{
     .frame{
       margin-left: 0;
       margin-right: 0;
       margin-top: 3%;
       left: 50%;
       transform:translateX(-50%); //居中
       .content{
         p{
           font-size: 17px;
           color: #262626;
         }
       }
     }
    }
  }
  .drop-test-enter-active {
    transition: all 1s;
    -moz-transition: all 1s; /* Firefox 4 */
    -webkit-transition: all 1s; /* Safari 和 Chrome */
    -o-transition: all 1s; /* Opera */
  }
  .drop-test-leave-active {
    transition: all 1s;
    -moz-transition: all 1s; /* Firefox 4 */
    -webkit-transition: all 1s; /* Safari 和 Chrome */
    -o-transition: all 1s; /* Opera */
  }
  .drop-test-enter {
    transform: translateY(10%)!important;
    -moz-transform:translateY(10%)!important; /* Firefox 4 */
    -webkit-transform: translateY(10%)!important; /* Safari 和 Chrome */
    -o-transform: translateY(10%)!important; /* Opera */
  }
  .drop-test-leave-active {
    transform: translateY(-10%)!important;
    -moz-transform:translateY(-10%)!important; /* Firefox 4 */
    -webkit-transform: translateY(-10%)!important; /* Safari 和 Chrome */
    -o-transform: translateY(-10%)!important; /* Opera */
  }
</style>
