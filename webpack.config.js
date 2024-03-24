const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { resolve } = require('path');
const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
	...defaultConfig,
	plugins: [
		...defaultConfig.plugins,
		new CaseSensitivePathsPlugin(),
		new CleanWebpackPlugin(),
		new WebpackAssetsManifest({
			output: path.resolve(process.cwd(), 'public/build/manifest.json'),
			publicPath: true,
			writeToDisk: true,
		}),
		new MiniCSSExtractPlugin({ filename: '[name]-[chunkhash].css' }),
	],
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
            '@name': resolve(__dirname, 'src/name'),
		},
	},
    entry: {
		'name': './src/name/index.js',
	},
	output: {
		filename: '[name]-[chunkhash].js',
		path: resolve(process.cwd(), 'public/build'),
	},
};
