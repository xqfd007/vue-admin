const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const port = process.env.port || process.env.npm_config_port || 9528; // dev port
module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        "@": resolve("src"),
      },
    },
  },
  devServer: {
    port: port,
    // open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    //before: require('./mock/mock-server.js'),
    proxy: {
      "/dev-api": {
        // 匹配所有以 '/dev-api'开头的请求路径
        target: "http://localhost:3333", // 代理目标的基础路径
        // target: 'http://47.93.148.192',
        changeOrigin: true, // 支持跨域
        pathRewrite: {
          // 重写路径: 去掉路径中开头的'/dev-api'
          "^/dev-api": "",
        },
      },
    },
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial",
      },
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });
  },
};
