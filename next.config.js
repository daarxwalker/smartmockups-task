module.exports = {
	future: {
		webpack5: true,
	},
	env: {
		apiEndpoint: 'https://5lt31zvq40.execute-api.us-east-1.amazonaws.com/dev',
	},
	onDemandEntries: {
		maxInactiveAge: 1000 * 60 * 60,
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/all',
				permanent: true,
			},
		]
	},
}
