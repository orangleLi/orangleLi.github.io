<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  <div class="main_container">
      <header class="clear">
          <h1 class="fl"><span>运营监控</span></h1>
      </header>
      <div class="monitor_data_container clear">
          <div class="pxp100 clear">
              <div class="function_card card_width890 fl">
                  <p class="function_card_title clear"><span class="fl"></span><span class="fl">在管项目情况</span></p>
                  <div class="cart_default" id="manage_project_cart" _echarts_instance_="ec_1539592307716" style="-webkit-tap-highlight-color: transparent; user-select: none; position: relative;"><div style="position: relative; overflow: hidden; width: 495px; height: 406px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;"><canvas data-zr-dom-id="zr_0" width="495" height="406" style="position: absolute; left: 0px; top: 0px; width: 495px; height: 406px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px/21px &quot;Microsoft YaHei&quot;; padding: 5px; left: 279px; top: 309px;">入驻三年以上 : 256 (41.22%)</div></div>
              </div>
              <div class="function_card card_width890 marl20px fl">
                  <p class="function_card_title clear"><span class="fl"></span><span class="fl">便利店数</span></p>
                  <div class="cart_default" id="eningStore_opened_amount_cart" _echarts_instance_="ec_1539592307717" style="-webkit-tap-highlight-color: transparent; user-select: none; position: relative;"><div style="position: relative; overflow: hidden; width: 495px; height: 406px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;"><canvas data-zr-dom-id="zr_0" width="495" height="406" style="position: absolute; left: 0px; top: 0px; width: 495px; height: 406px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px/21px &quot;Microsoft YaHei&quot;; padding: 5px; left: 277px; top: 171px;">2018年第一季度<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#d48265;"></span>累计: 425<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#61a0a8;"></span>季度增长: 49</div></div>
              </div>
          </div>
          <div class="pxp100 mart20px clear">
              <div class="function_card card_width890 fl ofh">
                  <p class="function_card_title clear"><span class="fl"></span><span class="fl">岗位在编数据</span></p>
                  <div id="post_serving_list" class="post_serving_list clear" style="overflow-x: auto;"><table cellspacing="0" cellpadding="0" class="fl"><tbody><tr><td>上月离职</td><td>845</td><td>实际在岗</td><td>9473</td></tr><tr><td>定编数</td><td>12666</td><td>缺编数</td><td>633</td></tr><tr><td>上月入职</td><td>647</td><td>缺编率</td><td>0.05</td></tr></tbody></table></div>
              </div>
              <div class="function_card card_width890 marl20px fr">
                  <p class="function_card_title clear"><span class="fl"></span><span class="fl">工种人数统计</span></p>
                  <div class="cart_default" id="trades_amount_cart" _echarts_instance_="ec_1539592307718" style="-webkit-tap-highlight-color: transparent; user-select: none; position: relative;"><div style="position: relative; overflow: hidden; width: 495px; height: 406px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;"><canvas data-zr-dom-id="zr_0" width="495" height="406" style="position: absolute; left: 0px; top: 0px; width: 495px; height: 406px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px/21px &quot;Microsoft YaHei&quot;; padding: 5px; left: 197px; top: 167px;">巡逻 : 725 (11.34%)</div></div>
              </div>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
