'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const express = require('express')
const app = express()
const axios = require('axios')
const apiRoutes = express.Router()
app.use('/api', apiRoutes)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {
      app.get('/api/getDiscList', (req, res) => {
        const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        // req.query.data= escape(req.query.data)

        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            cookie: 'pgv_pvi=4094738432; RK=yxp10i8QMs; ptcz=d5fc151b0b9b8b788b9419736df40755da0e127b0873ed40f4335abab6153dab; pgv_pvid=6928384923; ts_uid=374577700; yq_index=0; pgv_si=s8040570880; pgv_info=ssid=s6934300936; ts_refer=ADTAGmyqq; yqq_stat=0; ts_last=y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }),
      app.get('/api/lyric', (req, res) => {
        const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_yqq.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/portal/player.html',
            cookie: 'pgv_pvi=4094738432; RK=yxp10i8QMs; ptcz=d5fc151b0b9b8b788b9419736df40755da0e127b0873ed40f4335abab6153dab; pgv_pvid=6928384923; ts_uid=374577700; ts_refer=ADTAGnewyqq.singer; pgv_si=s9237313536; pgv_info=ssid=s4329133038; yqq_stat=0; qqmusic_fromtag=66; player_exist=1; yq_playschange=0; yq_playdata=; ts_last=y.qq.com/portal/player.html; yplayer_open=1; yq_index=0',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          var ret = response.data
          if(typeof ret === 'string') {
            var reg = /^\w+\(({[^()]+})\)/
            var matches = ret.match(reg)
            if(matches) {
              ret = JSON.parse(matches[1])
            }
          }
          res.json(ret)
        }).catch((e) => {
          console.log(e)
        })
      }),
      app.get('/api/songlist', (req, res) => {
        const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/n/yqq/playlist/' + req.query.disstid + '.html',
            cookie: 'pgv_pvi=4094738432; RK=yxp10i8QMs; ptcz=d5fc151b0b9b8b788b9419736df40755da0e127b0873ed40f4335abab6153dab; pgv_pvid=6928384923; ts_uid=374577700; yq_index=0; pgv_si=s8040570880; pgv_info=ssid=s6934300936; ts_refer=ADTAGmyqq; ts_last=y.qq.com/; yqq_stat=0',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          var ret = response.data
          if(typeof ret === 'string') {
            var reg = /^\w+\(({[^()]+})\)/
            var matches = ret.match(reg)
            if(matches) {
              ret = JSON.parse(matches[1])
            }
          }
          res.json(ret)
        }).catch((e) => {
          console.log(e)
        })
      }),
      app.get('/api/toplist', (req, res) => {
        const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/m/index.html',
            cookie: 'pgv_pvi=4094738432; RK=yxp10i8QMs; ptcz=d5fc151b0b9b8b788b9419736df40755da0e127b0873ed40f4335abab6153dab; pgv_pvid=6928384923; ts_uid=374577700; yq_index=0; checkmask=3; pgv_info=ssid=s5776921410; ts_refer=localhost/; yqq_stat=0; pgv_si=s5663607808; ts_last=y.qq.com/m/index.html',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }),
      app.get('/api/search', (req, res) => {
        const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/m/index.html',
            cookie: 'pgv_pvi=4094738432; RK=yxp10i8QMs; ptcz=d5fc151b0b9b8b788b9419736df40755da0e127b0873ed40f4335abab6153dab; pgv_pvid=6928384923; ts_uid=374577700; yq_index=0; yqq_stat=0; pgv_si=s7892081664; pgv_info=ssid=s8786683972; ts_refer=ADTAGmyqq',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
