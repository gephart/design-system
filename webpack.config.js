let path = require("path");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let autoprefixer = require('autoprefixer');


function createWebpackConfig() {
    let outputDir = 'dist';
    let publicDir = 'dist';
    let watchMode = true;

    const WebpackConfig = {
        entry: [
            "./sass/main.sass"
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
        ]

    };

    return WebpackConfig;
}

module.exports = createWebpackConfig;