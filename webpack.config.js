const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const { mode } = argv;
  const config = {
    entry: "./src/index.js",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/i,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.html$/i,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true },
            },
          ],
        },
        {
          test: /\.(css|scss|sass)$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          type: "asset",
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".json"],
    },
    plugins: [
      new CleanWebpackPlugin({}),
      new htmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
      }),
    ],

    devServer: {
      open: true,
      port: 3000,
      compress: true,
    },

    output: {
      path: path.resolve(__dirname, "dist"),
    },
  };

  if (mode === "production") {
    config.output.filename = "[name].[contenthash].js";
    config.devtool = false;
    config.plugins = [new MiniCssExtractPlugin({ filename: "main.css"}), ...config.plugins]
    config.module.rules[2].use[0] = MiniCssExtractPlugin.loader
  }
  else  {
    config.output.filename = "main.js";
    config.devtool = "source-map";
  }

  return config;
};
