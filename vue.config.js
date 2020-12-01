module.exports = {
  pluginOptions: {
    express: {
      shouldServeApp: false,
      serverDir: './server',
    }
  },
  configureWebpack:{
  }, 
  devServer:{
    host: 'localhost',
    hot:true,
    port: 8080,  
    open: 'Chrome',
    proxy: {
      '/*':{ //everything from root
        target: 'http://localhost:3000',
        secure: false,
        ws: false,
      },
      '/ws/': { //web sockets
        target: 'http://localhost:3000',
        secure: false,
        ws: true
      },
      '!/':{ //except root, which is served by webpack's devserver, to faciliate instant updates
        target: 'http://localhost:3000/',
        secure: false,
        ws: false
      },
    }
  }
}
