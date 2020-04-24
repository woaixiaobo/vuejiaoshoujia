//引入node内置的路径处理模块
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');
//封装一个处理绝对路径的方法
function resolve(relative) {
    //参数是传进来的相对路径
    return path.resolve(__dirname, relative)
}

module.exports = {
    //入口,
    entry: './src/index.js',
    //输出  开发模式不用输出文件到本地
    output: {
        path: undefined,
        filename: 'built.js'
    },
    //加载器
    module: {
        rules: [
            //js
            {
            test: /\.js$/,
            // exclude: /node_modules/, 
            include: [resolve('src')],
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: [],
                },
            },
        },
        //css
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.css$/,
            include: [resolve("src")],
            use: [
            "vue-style-loader",
            // "style-loader",
            "css-loader",
            ],
        },
        //image
        {
            test: /\.(png|gif|jpe?g|webp)$/,
            include: [resolve("src")],
            use: {
            loader: "url-loader",
            options: {
              limit: 10 * 1024,
                name: "static/media/[hash:10].[ext]",
                /*
                默认情况下 url-loader 对图片解析时ES6模块化
                ES6模块化识别不了 [object module]
                关闭ES6模块化，使用commonjs模块化就能识别了~
            */
            esModule: false,
            },
            },
        },
        //字体图标
        {
            exclude: [/\.js$/, /\.css$/, /\.html$/, /\.(png|gif|jpe?g|webp)$/, /\.vue$/],
            use: {
            loader: "file-loader",
            options: {
            name: "static/media/[hash:10].[ext]",
            },
        },
        },
    ]
    },
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve("public/index.html"),
        }),
        new VueLoaderPlugin(),
        new CopyPlugin([
            { 
                from: resolve('public'), 
                to: resolve('dist'),
                ignore: ['index.html']
            },
        ]),
    ],
    //模式
    mode: 'development',
    devServer: {
        contentBase: resolve("dist"),
        port: 9527, 
        host: "localhost", 
        compress: true,
        open: true, 
        hot: true,
        quiet: true, 
        clientLogLevel: "none", 
        // quiet: true, // 启用静默模式，在终端不打印多余信息
        clientLogLevel: "none", // 在浏览器控制台不打印多余内容
    },
    devtool: "cheap-module-source-map", // 开发环境
    resolve:{
        //别名路径
        alias:{
            "@":resolve("src"),
            "@copms":resolve("src/components")
        },
        extensions:[".js",".vue",".json"],
    }
}