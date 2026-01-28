const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  lintOnSave:false, //关闭语法检查
  // devServer: {    //开启代理服务器   方式一  优先找寻本地文件（public）中是否有所需文件，如果里面有与寻找文件重名的就会出问题 
  //   proxy: 'http://127.0.0.1:8081'
  // }
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        pathRewrite:{'^/api':''},
        ws: true,   //用于支持websocket
        changeOrgin: true   //用于控制请求头中的host值
      },
      '/foo': {
        target: 'http://127.0.0.1:5001',
        pathRewrite:{'^/foo':''},
      }
    }
  }

}
