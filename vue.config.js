let webpack = require('webpack');

module.exports = {
  devServer: {
    port: 8082,
    proxy: {
      '/api': {
        // target: 'http://localhost:10000',
        target: 'http://192.168.90.186:8082', //lc
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      },
      '/ecApi': {
        // target: 'http://localhost:10000',
        target: 'http://192.168.90.186:8082',
        pathRewrite: {
          '^/ecApi': ''
        },
        changeOrigin: true
      },
      '/lee': {
        // target: 'http://jcp.yilvbao.cn',
        // target: 'http://192.168.91.206:8082',
        target: 'http://192.168.90.186:8082',
        // target: 'http://localhost:10000',
        pathRewrite: {
          '^/lee': ''
        },
        changeOrigin: true
      },
      '/fm': {
        target: 'http://192.168.90.186:8082', //'http://192.168.91.211/186:8083',
        // target: 'http://192.168.91.211:8083',
        // target: 'http://localhost:10000',
        pathRewrite: {
          '^/fm': ''
        },
        changeOrigin: true
      }
    },
  },
  // configureWebpack: {
  // 	plugins: [
  // 		new webpack.ProvidePlugin({//引入外部类库
  // 			$: 'jquery',
  // 			jQuery: 'jquery',
  // 		})
  // 	]
  // }
};