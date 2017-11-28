/*eslint no-console: ["error", { allow: ["log", "error"] }] */
const webpack = require("webpack");
const config = require("./webpack.conf.js");

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8080;

const WebpackDevServer = require("webpack-dev-server");

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true
}).listen(port, host, error => {
  console.log(error || `Started WebpackDevServer on http://${host}:${port}`);
});
