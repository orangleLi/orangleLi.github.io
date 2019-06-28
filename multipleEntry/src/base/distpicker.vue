<template>
  <div data-v-34e22156="" class="distpicker-address-wrapper">
    <div class="address-header">
      <ul>
        <li class="active" @click.prevent.stop="transProvince">{{province}}</li>
        <li :class="city!==''?'active':''" @click.prevent.stop="transCity">{{city}}</li>
        <li :class="area!==''?'active':''">{{area}}</li>
      </ul>
    </div>
    <div class="address-container">
      <ul v-if="showData.length>0">
          <li class="" @click.prevent.stop="getData(item.Id, item.name, item.Name)" v-for="item in showData" :key="item.id">{{item.name || item.Name}}</li>
      </ul>
    </div>
    <loading ref="loading"></loading>
  </div>
</template>

<script>
export default {
  name: 'distpicker',
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
    // provinceArr: {
    //   type: Array,
    //   default: function () {
    //     return [];
    //   }
    // }
    // cityArr: {
    //   type: Array,
    //   default: function () {
    //     return [];
    //   }
    // },
    // areaArr: {
    //   type: Array,
    //   default: function () {
    //     return [];
    //   }
    // }
  },
  data () {
    return {
      provinceArr: [],
      cityArr: [],
      areaArr: [],
      showData: [],
      province: '省',
      city: '',
      area: '',
      // 0 1 2 省市区
      tag: 0
    };
  },
  mounted () {
    if (this.$refs.loading) {
      this.$refs.loading.showLoading({
        title: '正在加载...'
      });
    }
    this.getProvinceList();
  },
  methods: {
    transProvince () {
      this.showData = this.provinceArr;
      this.tag = 0;
      this.city = '';
      this.area = '';
    },
    transCity () {
      this.showData = this.cityArr;
      this.tag = 1;
      this.area = '';
    },
    getData (id, name, na) {
      if (this.$refs.loading) {
        this.$refs.loading.showLoading({
          title: ''
        });
      }
      if (this.tag === 0) {
        this.province = name;
        this.onChangeProvince1({
          id: id,
          value: name
        });
        this.getCityArr(id);
      } else if (this.tag === 1) {
        this.city = name;
        this.onChangeCity({
          id: id,
          value: name
        });
        this.getAreaArr(id);
      } else if (this.tag === 2) {
        this.area = name || na;
        this.onChangeArea({
          id: id,
          value: name || na
        });
      }
    },
    getProvinceList: function () {
      let that = this;
      this.$get('api/AppCommunity/GetProvinceList', {}).then(res => {
        // console.log(res);
        if (this.$refs.loading) {
          this.$refs.loading.hideLoading();
        }
        if (res.resultCode === '1') {
          that.provinceArr = res.resultValue;
          that.showData = res.resultValue;
        }
      });
    },
    getCityArr: function f (provinceId) {
      let that = this;
      let paramData = {
        param: {
          provinceId: provinceId
        }
      };
      this.$get('api/AppCommunity/GetCityList', paramData).then(res => {
        // console.log(res);
        if (this.$refs.loading) {
          this.$refs.loading.hideLoading();
        }
        if (res.resultCode === '1') {
          that.cityArr = res.resultValue;
          that.showData = res.resultValue;
          that.tag = 1;
        }
      });
    },
    getAreaArr: function f (cityId) {
      let that = this;
      let paramData = {
        param: {
          cityId: cityId
        }
      };
      this.$get('api/AppCommunity/GetDistrictList', paramData).then(res => {
        if (this.$refs.loading) {
          this.$refs.loading.hideLoading();
        }
        if (res.resultCode === '1') {
          that.areaArr = res.resultValue;
          that.showData = res.resultValue;
          console.log(that.showData);
          that.tag = 2;
        }
      });
    },
    onChangeProvince1: function (a) {
      console.log(a);
      this.$emit('onChangeProvince1', a);
    },
    onChangeCity: function (a) {
      console.log(a);
      this.$emit('onChangeCity', a);
    },
    onChangeArea: function (a) {
      console.log(a);
      this.$emit('onChangeArea', a);
    }
  }
};
</script>

<style scoped>
  .distpicker-address-wrapper{
    position: fixed;
    bottom: 0;
    width: 100%;
    color: rgb(153, 153, 153);
    z-index: 1002;
  }
  .distpicker-address-wrapper .address-header{
    background-color: #fff;
  }
  .distpicker-address-wrapper ul {
    margin: 0;
    padding: 0;
  }
  .distpicker-address-wrapper .address-header ul{
    display: flex;
    justify-content: space-around;
    align-items: stretch;
  }
  .distpicker-address-wrapper .address-header ul li {
    padding: 8px 0.3rem;
    color: #000;
  }
  .distpicker-address-wrapper .address-header .active {
    border-bottom: rgb(255, 92, 31) solid 3px;
    color: rgb(255, 92, 31);
  }
  .distpicker-address-wrapper .address-container {
    background-color: #fff;
  }
  .distpicker-address-wrapper .address-container {
    max-height: 6.8rem;
    overflow: scroll;
  }
  .distpicker-address-wrapper .address-container ul {
    height: 100%;
    overflow: auto;
  }
  .distpicker-address-wrapper .address-container ul li {
    padding: 8px 10px;
    border-top: 1px solid #f6f6f6;
  }
</style>
