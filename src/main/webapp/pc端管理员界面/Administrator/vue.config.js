module.exports = {
  assetsDir: 'assets',
  lintOnSave: false,
  publicPath: './',
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: {//配置跨域
        '/api': {
            target: 'https://easypoint.club/administrator/',
            ws: true,
            changOrigin: true,//允许跨域
            pathRewrite: {
                '^/api': ''
            }
        }
        
    }
  }
}