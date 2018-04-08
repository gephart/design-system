let path = require("path");
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let autoprefixer = require('autoprefixer');


function createWebpackConfig() {
    let outputDir = 'dist';
    let publicDir = 'dist';
    let watchMode = true;

    const WebpackConfig = {
        entry: [
            "./sass/main.sass",
            "./js/main.js"
        ],
        output: {
            path: path.resolve(__dirname, outputDir),
            filename: "gds.min.js",
            publicPath: publicDir
        },
        watch: watchMode,
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ['babel-preset-env'],
                                plugins: ["transform-object-rest-spread"]
                            }
                        }
                    ]
                },


                {
                    test: /\.(sass)$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: true,
                                    minimize: true
                                }
                            },
                            {
                                loader: "postcss-loader",
                                options: {
                                    plugins: () => [
                                        autoprefixer({browsers: ['last 3 versions']})
                                    ],
                                },
                            },
                            {
                                loader: "sass-loader"
                            }
                        ]
                    })
                }
            ]
        },

        plugins: [
            new ExtractTextPlugin({
                filename: "gds.min.css",
                allChunks: true
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                "window.$": "jquery"
            }),
        ]
    };

    return WebpackConfig;
}

module.exports = createWebpackConfig;