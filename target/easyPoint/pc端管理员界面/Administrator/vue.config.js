module.exports = {
  publicPath: './',
  outputDir: 'Administrator',
  //lintOnSave: false, //是否开启eslint
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: '8080',
    https: false, //是否使用https协议
    hotOnly: false, //是否开启热更新
    proxy: null,
  },

}