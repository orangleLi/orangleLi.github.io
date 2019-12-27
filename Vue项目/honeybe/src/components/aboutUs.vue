<template>
    <div>
      <my-dialog @close-dialog="closeDialog" :dialog-is-show="aboutUsShow">
          <div class="closePC hidden-xs hidden-sm" @click="closeDialog">
            <img src="../../static/images/close.png">
          </div>
          <div class="content">
            <div class="main col-md-9" v-if="aboutUsShow">
              <div class="title"><img :src="aboutUsInfo[0].title"></div>
              <div class="content">
                <p v-for="content in aboutUsInfo[0].content">{{content.paragraph}}</p>
              </div>
            </div>
            <div class="footer col-md-3" v-if="aboutUsShow">
              <div class="logo">
                <img :src="aboutUsInfo[0].logo">
              </div>
              <p v-for="i in aboutUsInfo[0].footer" class="iconItem col-md-8 col-xs-4">
                <img :src="i.src">
                <span>{{i.content}}</span>
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
            aboutUsInfo: {
              type: Array,
              default: []
            },
            aboutUsShow: {
              type: Boolean,
              default: true
            }
          },
          data() {
            return {
              msg: "Hello Vue.js"
            }
          },
          methods:{
            closeDialog(){
              this.$emit('close-about-us');
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
    top: 1rem;
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
      }
      .content {
        p {
          font-size: 1.5rem;
          color: #262626;
          padding: 0 1rem;
          text-align: justify; //两端对齐
          text-indent: 2em; //首行缩进
          word-break: break-all;
        }
      }

    }
  .footer{
       .logo{
         width: 60%;
         padding: 1% 10%;
         img{
           width: 100%;
           height: auto;
         }
       }
       .iconItem{
         img{
           margin: 0;
           width: 100%;
           transition: all linear 0.5s;
           &:hover{
             -webkit-transform: scale(1.2);
             -moz-transform: scale(1.2);
             -ms-transform: scale(1.2);
             -o-transform: scale(1.2);
             transform: scale(1.2);
           }
         }
       }
       span:last-child{
         padding-bottom: 4rem;
       }
     }
  @media (min-width: 768px) {
    .content{
      padding: 15px;
      height: 100%
    }
    .main {
      .title {
        text-align: left;
      }
    }
      .footer{
        text-align: center;
      }
  }
  @media (min-width: 992px) {
    .footer {
      padding-top: 5%;
      .logo {
        width: 100%;
      }
    }
  }
</style>
