const path = require("path");
const _ = require("lodash");

const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// eslint-disable-next-line import/no-unresolved
const UnpluginVueComponentsPlugin = require("unplugin-vue-components/webpack");

const webpack = require("webpack");

const uniqueFileName = "[contenthash:7]";
const uniqueFileChunkName = `${uniqueFileName}.chunk`;

const getFilenameForUnplugin = (name, prefix) => _.kebabCase(name.slice(prefix.length));

module.exports = () => ({
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        filename: `js/${uniqueFileName}.js`,
        chunkFilename: `js/${uniqueFileChunkName}.js`,
        path: path.join(__dirname, "dist"),
        publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
        clean: true
    },
    resolve: {
        alias: {
            app: path.resolve(__dirname),
            src: path.join(__dirname, "src")
        },
        extensions: [".js", ".vue", ".scss"]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheCompression: false,
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.(?:gif|png|svg|woff|woff2|ttf|eot)$/i,
                type: "asset/inline"
            }
        ]
    },
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "dist")
        },
        open: true,
        compress: true,
        port: "auto",
        hot: false
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
            "import.meta.env": JSON.stringify({
                packageVersion: process.env.npm_package_version,
                fetchRetries: {
                    count: 2,
                    intervalMs: 50
                },
                productionAbsoluteUrl: "//github.com/cakkypamucm"
            })
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, "public"),
                    to: path.join(__dirname, "dist"),
                    toType: "dir",
                    noErrorOnMissing: true,
                    globOptions: {
                        dot: true,
                        ignore: ["**/public/index.html"]
                    }
                }
            ]
        }),

        new HtmlWebpackPlugin({
            favicon: path.join(__dirname, "src", "assets", "img", "favicon.ico"),
            inject: "body",
            template: path.join(__dirname, "public", "index.html")
        }),
        new VueLoaderPlugin(),

        new MiniCssExtractPlugin({
            filename: `css/${uniqueFileName}.css`,
            chunkFilename: `css/${uniqueFileChunkName}.css`
        }),

        // TODO добавить поддержку поддиректорий
        // @see https://github.com/antfu/unplugin-vue-components#configuration (deep: true)
        UnpluginVueComponentsPlugin({
            directives: true,
            resolvers: [
                {
                    type: "directive",
                    resolve(name) {
                        if (name.startsWith("App")) {
                            return {
                                name: "default",
                                from: `src/plugins/directives/${getFilenameForUnplugin(name, "App")}`
                            };
                        }
                    }
                },
                (name) => {
                    if (name.startsWith("AppLayout")) {
                        return { name: "default", from: `src/layouts/${getFilenameForUnplugin(name, "AppLayout")}` };
                    }
                    if (name.startsWith("App")) {
                        return { name: "default", from: `src/components/${getFilenameForUnplugin(name, "App")}` };
                    }
                }
            ]
        })
    ],
    optimization: {
        minimize: process.env.NODE_ENV === "production",
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendors: {
                    test: /[/\\]node_modules[/\\]/,
                    name: "vendors"
                },
                default: {
                    minChunks: 2
                }
            }
        }
    },
    cache: {
        type: "filesystem"
    },
    stats: {
        errorDetails: true
    }
});
