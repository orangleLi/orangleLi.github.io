<template>
    <div :class="[isHidden?'ishidden':'']">
      <div class="navbar navbar-fixed-top">
        <div class="hidden-lg hidden-md nav-log">
          <img src="../../static/images/logo.png">
        </div>
        <div class="container">
          <ul class="nav navbar-nav col-lg-10 col-md-12" role="navigation" >
            <li class="col-lg-2 col-xs-3 col-sm-3 col-md-2">
              <a href="javascript:void(0)" @click="secondNavListFun">Our range</a>
            </li>
            <li class="col-lg-2 col-xs-3 col-sm-3 col-md-2">
              <a href="javascript:void(0)" @click="aboutUs">About us</a>
            </li>
            <li class="col-lg-3 col-sm-4 hidden-xs hidden-sm">
              <div class="nav-log">
                  <img src="../../static/images/logo.png">
              </div>
            </li>
            <li class="col-lg-2 col-xs-3 col-sm-3 col-md-2">
              <a href="javascript:void(0)">Where to buy</a>
            </li>
            <li class="col-lg-2 col-xs-3 col-sm-3 col-md-2">
              <a href="javascript:void(0)">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="slide-show">
        <slide-show></slide-show>
      </div>

      <div class="product">
        <div class="product1" v-for="(pro,index) in products">
          <img :src="pro.img" class="productImg">
          <div class="content container">
            <p class="title">
              {{pro.title}}
            </p>
            <div class="row">
              <p :class="(index==0?'col-xs-3 col-md-2 col-sm-2 suit': 'col-xs-3 nosuit')"></p>
              <p :class="['col-md-4 col-sm-4 suit',(index==0?'mdFourHidden': '')]"></p>
              <p class="col-xs-3 col-md-2 col-sm-2 productIcon" v-for="i in pro.icon">
                <span><img :src="i.src"></span>
                <span>{{i.content}}</span>
              </p>
              <p :class="(index==0?'col-md-2 suit': 'col-xs-3 nosuit')"></p>
            </div>
            <div class="moreInfo" @click="showProductDialog(pro.dialogShowInfo,index)"><span>more info</span></div>
          </div>
        </div>
      </div>

      <div class="footer clearfix" v-for="foot in footer">
        <p class="title">
          {{foot.title}}
        </p>
        <p v-for="i in foot.icon" class="col-xs-3 col-md-3 productImg">
          <span><img :src="i.src"> </span>
          <span>{{i.content}}</span>
        </p>
      </div>


      <!--二级导航-->
      <div class="secondNavList sticky">
        <ul class="row">
          <li class="col-lg-3 col-sm-2">
            <a href="javascript:void(0)" @click="toCombHoney">Comb Honey</a>
          </li>
          <li class="col-lg-3 col-sm-2">
            <a href="javascript:void(0)" @click="toHandmadeSoap" >Handmade Soap</a>
          </li>
        </ul>
      </div>

      <a href="#" class="cd-top">Top</a>


      <about-us :about-us-show="aboutUsShow" :about-us-info="info" @close-about-us="closeDialog('aboutUsShow')"></about-us>
      <product-one :product-one-show="productOneShow" :product-one-info="info" @close-product-one="closeDialog('productOneShow')"></product-one>
      <product-two :product-two-show="productTwoShow" :product-two-info="info" @close-product-two="closeDialog('productTwoShow')"></product-two>

    </div>
</template>

<script>
    import SlideShow from './slideShow'
    import AboutUs from './aboutUs'
    import ProductOne from './productOne'
    import ProductTwo from './productTwo'
    import myDialog from './myDialog'

    import _ from 'lodash'
    export default {
        name:'honey',
        data() {
            return {
              info:[],
              isHidden: false,
              aboutUsShow: false,
              productOneShow: false,
              productTwoShow: false,
              products:[],
              footer:[],
              aboutUsInfo:[],
              ua: window.navigator.userAgent,
            }
        },
        created(){
            this.$http.post('getProducts')
              .then((res) =>{
                var strImgPlatform='pc_';
                if(this.ua.indexOf('Mobile')>=0) strImgPlatform='m_';
                $.each(res.data, function (item) {
                  res.data[item].img = './static/images/' + strImgPlatform + res.data[item].img;
                });
                this.products = res.data;
              },(err)=>{
                console.log(err)
              })

          this.$http.post('getFooter')
            .then((res) =>{
              this.footer = res.data;
            },(err)=>{
              console.log(err)
            })

          this.$http.post('getAboutUsInfo')
            .then((res) =>{
              this.aboutUsInfo = res.data;
            },(err)=>{
              console.log(err)
            })

        },
        methods:{
          aboutUs(){
            this.productOneShow = false;
            this.productTwoShow = false;
            this.aboutUsShow = true;
            this.isHidden = true;
            this.info = this.aboutUsInfo;
            // $('#dialogId').modal('show');
          },
          secondNavListFun(){
            $(".secondNavList").show();
            $(".secondNavList").css('top',$(".navbar-fixed-top").height());
          },
          closeDialog(attr){
            this[attr] = false;
            this.isHidden = false;
          },
          showProductDialog(info,index){
            if(index){
              this.productTwoShow = true;
              this.productOneShow = false;
            }
            else{
              this.productOneShow = true;
              this.productTwoShow = false;
            }
            this.aboutUsShow = false;
            this.isHidden = true;
            this.info = info;
            // $('#dialogId').modal('show');
          },
          toCombHoney(){
            $(".secondNavList").css('display','none');
            //$(".product1:nth-of-type(1)").offset().top  获取div距离浏览器顶部的高度
            $('html,body').animate({ scrollTop: parseFloat($(".product1:nth-of-type(1)").offset().top) - parseFloat($('.navbar-fixed-top').height())},1000)
          },
          toHandmadeSoap(){
            $(".secondNavList").css('display','none');
            $('html,body').animate({ scrollTop: parseFloat($(".product1:nth-of-type(2)").offset().top) - parseFloat($('.navbar-fixed-top').height())},1000)
          },
        },
      mounted(){
        $(document).on('mousewheel DOMMouseScroll', onMouseScroll);
        function onMouseScroll(e){
          // e.preventDefault();
          var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
          var delta = Math.max(-1, Math.min(1, wheel) );
          if(delta<0){//向下滚动
            $('.returnTop').show();
            if(window.navigator.userAgent.indexOf('Mobile')>=0){
              $(".navbar-nav").css('display','none');
            }
            $(".secondNavList").css('display','none');
          }else{//向上滚动
            $(".navbar-nav").fadeIn();
          }
        }
      },
        components: {
          SlideShow,
          AboutUs,
          ProductOne,
          ProductTwo,
          myDialog
        }
    }
</script>

<style scoped lang="less">
  .mdFourHidden{
    display: none;
  }
  .navbar-fixed-top{
    background-color: #fff;
    width: 100%;
    margin: 0;
  }
  .ishidden{
    /*position: fixed;*/
    overflow: hidden;
  }
    .hidden-lg{
      display: block;
      margin-top: 1.5rem;
      text-align: center;
      margin-bottom: 1rem;
      width: 100%;
      height: 5rem;
      img{
        height: 100%;
      }
    }
    .navbar-fixed-top{
      .navbar-nav{
        width: 100%;
        margin: 0 auto;
        padding: 0 0 0.4rem;
        text-align: center;
        li{
          padding: 1rem 0;
          min-height: 3rem;
          a{
            padding: 0;
            font-size: 1.3rem;
            color: #000;
            background-color: transparent;
          }
        }
      }
    }

    .slide-show{
      position: relative;
      top: 11.5rem;
      width: 100%;
    }

    .product{
      position: relative;
      top: 11.5rem;
      .product1{
        .productImg{
          width: 100%;
        }
        .content{
          background-color:  #fcc800;
          padding: 0;
          margin: 0;
          width: 100%;
          .title{
            font-size: 1.5456rem;
            color: #404040;
            text-align: center;
            padding: 2rem 2.208rem;
          }
        }
        .row{
          text-align: center;
          margin: 0;
          float: none;
          .productIcon{
            img{
              display: inline-block;
              background-color: #FFF;
              border-radius: 50%;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              width: 100%;
            }
            span{
              display: block;
              text-align: center;
            }
            span:last-of-type{
              margin-top: 1rem;
            }
          }
        }
        .moreInfo{
          border: solid 1px #404040;
          margin-bottom: 3.5rem;
          width: 46%;
          height: 3.9744rem;
          margin-left: 28%;
          line-height: 3.9744rem;
          text-align: center;
          span{
            font-size: 1.7664rem;
          }
        }
      }
      .product1:last-child .content{
        background-color: #fde57b;
        .productImg{
          padding-top:0;
        }
      }
    }

    .footer{
      position: relative;
      top: 12.4743rem;
      margin: 0;
      .title{
        font-size: 1.5456rem;
        color: #404040;
        text-align: center;
        padding: 0 2.208rem;
      }
      .productImg{
        margin-bottom: 2rem;
        text-align: center;
        span:nth-child(1){
          padding-right: 1rem;
        }
      }
    }
    .secondNavList{
      background-color: #FCC800;
      display: none;
      position: fixed;
      z-index: 9999;
      width: 100%;
      ul{
        list-style: none;
        padding: 1% 0;
        margin: 0;
        li{
          float: left;
          width: 50%;
          a{
            color: #fff;
            text-decoration: none;
          }
        }
      }
    }

  /*}*/
  @media (max-width: 760px) {
    .suit {
      display: none;
    }
  }
  @media (min-width: 768px) {
    .nosuit {
      display: none;
    }
  }
  @media (min-width: 991px) {
    .nav-log{
      width: 15rem;
      margin: auto;
      img{
        width: 100%;
      }
    }
  }

  @media (min-width: 1024px) {
    .navbar-fixed-top{
      .container{
        .navbar-nav{
          padding: 0;
          float: none;
          padding-top: 2rem;
          li{
            a{
              color: #000;
              font-size: 17px!important;
              background-color: transparent;
              &:hover{
                color: #80501c;
                font-weight: bold;
              }
            }
            .nav-log{
              transform:translateY(-1rem);
            }
          }
        }
      }
    }
    .slide-show{
      top: 9rem;
    }
    .product{
      top: 9rem;
      .title{
        margin: 0 10%;
      }
      .row{
        .productIcon{
          span{
            padding: 0 26%;
          }
          img:hover{
            transition: all 1s;
            background-color: #fff;
            border-radius: 50%;
            transform: scale(1.2);
            -webkit-transform: scale(1.2);
          }
        }
      }
      .moreInfo{
        width: 20%!important;
        margin: 2rem 30% 3.5rem 40%!important;
        cursor: default;
      }
      .moreInfo:hover{
        transition: all 1s;
        background-color: #fff;
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
      }
      .productImg{
        width: auto!important;
      }
      p,span{
        font-size: 2rem!important;
      }
    }
    .footer{
      top: 10.5rem;
      margin: 0 10%;
      p,span{
        font-size: 2rem!important;
      }
      .productImg{
        img{
          transition: all linear 0.5s ;
          &:hover{
            transform: scale(1.2) rotate(360deg);
            -webkit-transform: scale(1.2) rotate(360deg);
          }
        }
      }
    }
  }
</style>
