<template>
    <div>
      <my-dialog @close-dialog="closeDialog" :dialog-is-show="productOneShow">
        <div class="closePC hidden-xs hidden-sm" @click="closeDialog">
          <img src="../../static/images/close.png">
        </div>
        <div class="main" v-if="productOneShow">
          <div class="title"><img :src="productOneInfo[0].title"></div>
          <div class="content">
            <p>{{productOneInfo[0].weight}}</p>
            <div class="introduce">
              <p class="col-md-4 col-xs-12" v-for="im in productOneInfo[0].img"><img :src="im.src"></p>
            </div>
          </div>
          <div class="footer">
            <p v-for="content in productOneInfo[0].content">
              <span>{{content.paragraph}}</span>
            </p>
          </div>
        </div>
      </my-dialog>

    </div>
</template>

<script>
    import MyDialog from './myDialog'
    export default {
        props: {
          productOneInfo: {
            type: Array,
            default: []
          },
          productOneShow: {
            type: Boolean,
            default: false
          }
        },
        methods:{
          closeDialog(){
            this.$emit('close-product-one');
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
    .content{
      padding-left: 1rem;
      p{
        text-align: left;
        padding-left: 2rem;
        font-size: 1.5rem;
        font-size: 1.5rem;
        width: 100%;
      }
      img{
        padding: 0;
        width: 80%;
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
  }
  @media (min-width: 768px) {
    .content{
      .introduce{
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        margin: 0;
      }
    }
    .main {
      p{
        font-size: 17rem;
      }
      .title {
        img {
          width: auto;
        }
      }
    }
  }
</style>
