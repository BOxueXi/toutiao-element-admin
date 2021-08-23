module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    // proxy: {
    //   '/': {
    //     target: 'http://be-toutiao-web.itheima.net',
    //     // ws: true,
    //     changeOrigin: true,
    //     // pathRewrite: {
    //     //   '/': '/'
    //     // }
    //   }
    // }
  }
}
