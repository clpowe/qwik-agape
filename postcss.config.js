module.exports = {
	plugins: {
		'@unocss/postcss': {},
		autoprefixer: {},
		'postcss-preset-env': {
			stage: 3,
			features: {
				'nesting-rules': true
			}
		}
	}
}
