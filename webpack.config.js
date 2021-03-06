const path = require('path');
const DIST_DIR = path.join(__dirname, "dist");
const CLIENT_DIR = path.join(__dirname, "src");

module.exports = {
	entry: {
		controller_bundle: [
			"./src/controller/index.js"
		],
		game_bundle: [
			"./src/game/index.js"
		]
	},
	output: {
		filename: "[name].js",
		publicPath: "/",
		path: DIST_DIR
	},
	devtool: 'eval-source-map',
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			query: {
				presets: ["react", "es2015"]
			}
		}, {
			test: /\.(less|css)$/,
			loader: [
				'style-loader',
				'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:4]',
				'less-loader'
			  ].join('!')
		}]
	}
};