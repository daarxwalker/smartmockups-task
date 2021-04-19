module.exports = {
	purge: {
		enabled: process.env.NODE_ENV === 'production',
		content: ['./src/**/*.tsx'],
	},
	darkMode: false,
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
