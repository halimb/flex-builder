var path = require("path");
var webpack = require("webpack");

module.exports = {
	
	entry: "./src/index.js",
	
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js" 
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			},
			
			{ 
				test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
				loader: 'url-loader?limit=100000' 
			},

			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			}
		]
	},

	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 9000
	}

}