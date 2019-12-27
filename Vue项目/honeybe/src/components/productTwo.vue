<template>
    <div>
      <my-dialog @close-dialog="closeDialog" :dialog-is-show="productTwoShow">
        <div class="closePC hidden-xs hidden-sm" @click="closeDialog">
          <img src="../../static/images/close.png">
        </div>
        <div class="main" v-if="productTwoShow">
          <div class="title"><img :src="productTwoInfo[0].title"></div>
          <p class="weight">{{productTwoInfo[0].weight}}</p>
          <div class="content">
            <p class="col-md-4 col-xs-12 con" v-for="im in productTwoInfo[0].img"><img :src="im.src"></p>
          </div>
        </div>
        <!--这里也要加 v-if="productTwoShow" ，由于此页面加载完成时，父组件还并未调用此组件，productTwoInfo是没有值的，就会报content没有定义的异常-->
        <div class="footer" v-if="productTwoShow">
          <p v-for="content in productTwoInfo[0].content">
            <span>{{content.paragraph}}</span>
          </p>
        </div>
      </my-dialog>
    </div>
</template>

<script>
    import MyDialog from './myDialog'
    export default {
        props: {
          productTwoInfo: {
            type: Array,
            default: []
          },
          productTwoShow: {
            type: Boolean,
            default: false
          }
        },
        methods:{
          closeDialog(){
            this.$emit('close-product-two');
          }
        },
        data() {
            return {
                msg: "Hello Vue.js"
            }
        },
        components: {
          MyDialog
        }
    }
</script>

<style scoped lang="less">
  .closePC{
    position: absolute;
    top: 2rem;
    right: 1.3rem;
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
  .main {
    padding: 1rem;
    .title {
      padding: 2rem;
      img{
        width: 90%;
      }
    }
    .weight{
      text-align: left;
      padding-left: 2rem;
    }
    .content{
      text-align: center;
      p{
        float: left;
        padding-left: 2rem;
        font-size: 1.5rem;
        img{
          float: none;
          margin: 3rem 3rem;
          padding: 0;
          width: 70%;
        }
      }
    }
  }
  .footer {
    padding-bottom: 4rem;
    p {
      margin-top: 2rem;
      font-size: 1.5rem;
      color: #262626;
      padding: 0 1rem;
      text-align: justify; //两端对齐
      text-indent: 2em; //首行缩进
      word-break: break-all;

    }
    p:last-child{
      margin: 0;
    }
  }
  @media (min-width: 768px) {
    .main {
      height: 40%;
      .title {
        img {
          width: auto;
        }
      }
    }
    .footer{
      margin-top: 5rem;
    }
  }
</style>
