const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const defaultSettings = require('./src/config/index.js')
// page title
const name = defaultSettings.title || 'uni app template'
// 生产环境，测试和正式
const IS_PROD = ['production'].includes(process.env.NODE_ENV)
const devServerPort = 9527
const proxyTarget = process.env.NODE_ENV === "development" ? 'http://localhost:10900/' : '/';
module.exports = {
	lintOnSave: !IS_PROD,
	productionSourceMap: false,

	devServer: {
		port: devServerPort,
		open: false,
		overlay: {
			warnings: false,
			errors: true
		},
		proxy: {
			'/rest': {
				target: proxyTarget, // 后端接口测试环境地址  配nginx 时使用
				changeOrigin: true, // 是否允许跨越
				pathRewrite: {
					'^/rest': '/rest', // 重写 不配nginx 时使用
				}
			}
		}
	},
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [
				path.resolve(__dirname, 'src/styles/_variables.less'),
				path.resolve(__dirname, 'src/styles/_mixins.less'),
				path.resolve(__dirname, 'src/styles/_class_template.less'),
			]
		}
	},
	configureWebpack: config =>  {
		config.externals = {
			name: name,
			resolve: {
				alias: {
					'@': resolve('src')
				}
			}
		};
		if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
			config.optimization.minimizer[0].options.terserOptions.compress.drop_console = IS_PROD;
    } else {
      // 为开发环境修改配置...
    }
	}
};
